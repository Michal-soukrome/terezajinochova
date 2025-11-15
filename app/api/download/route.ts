import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products";
import { SecureLogger } from "@/lib/secure-logger";

/**
 * Secure download endpoint for purchased digital products
 *
 * Usage: /api/download?session=cs_test_xxx
 *
 * Security:
 * - Validates Stripe session payment status
 * - Enforces 30-day download window
 * - Serves files from private directory
 * - Logs all access attempts
 */
export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session");
  const clientIP =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!sessionId) {
    SecureLogger.warn("Download attempt without session ID", { clientIP });
    return NextResponse.json(
      { error: "Missing session parameter" },
      { status: 400 }
    );
  }

  try {
    // Retrieve and validate Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    // Verify payment was completed
    if (session.payment_status !== "paid") {
      SecureLogger.security("Download attempt with unpaid session", {
        clientIP,
        sessionId,
        paymentStatus: session.payment_status,
      });
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 403 }
      );
    }

    // Check download expiration (30 days after purchase)
    const purchaseDate = new Date(session.created * 1000);
    const expirationDate = new Date(
      purchaseDate.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    if (new Date() > expirationDate) {
      SecureLogger.warn("Download attempt with expired session", {
        clientIP,
        sessionId,
        purchaseDate: purchaseDate.toISOString(),
        expirationDate: expirationDate.toISOString(),
      });
      return NextResponse.json(
        {
          error: "Download link expired",
          message:
            "Download links are valid for 30 days after purchase. Please contact support.",
        },
        { status: 403 }
      );
    }

    // Determine which product was purchased
    const lineItem = session.line_items?.data[0];
    const purchasedPriceId = lineItem?.price?.id;

    if (!purchasedPriceId) {
      SecureLogger.error("Session missing line items", { clientIP, sessionId });
      return NextResponse.json(
        { error: "Invalid session data" },
        { status: 500 }
      );
    }

    // Find matching product
    const product = Object.values(PRODUCTS).find(
      (p) => p.stripePriceId === purchasedPriceId
    );

    if (!product) {
      SecureLogger.security("Unknown product in session", {
        clientIP,
        sessionId,
        priceId: purchasedPriceId,
      });
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Read file from private directory
    const filePath = join(
      process.cwd(),
      "private",
      "products",
      product.pdfFile
    );

    try {
      const fileBuffer = await readFile(filePath);

      SecureLogger.info("Successful product download", {
        productId: product.id,
        sessionId,
        fileSize: fileBuffer.length,
        customerEmail: session.customer_details?.email,
      });

      // Return file with secure headers
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${product.pdfFile}"`,
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "X-Robots-Tag": "noindex, nofollow",
        },
      });
    } catch (fileError) {
      SecureLogger.error("File not found", fileError, {
        productId: product.id,
        filePath: product.pdfFile,
      });
      return NextResponse.json(
        { error: "Product file not available" },
        { status: 500 }
      );
    }
  } catch (error) {
    SecureLogger.error("Download error", error, { clientIP, sessionId });

    if (error instanceof Error && error.message.includes("No such checkout")) {
      return NextResponse.json(
        { error: "Invalid or expired session" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process download" },
      { status: 500 }
    );
  }
}
