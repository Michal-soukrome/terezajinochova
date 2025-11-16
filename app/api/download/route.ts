// app/api/download/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products";
import { SecureLogger } from "@/lib/secure-logger";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get("product");
  const sessionId = searchParams.get("session");

  const clientIP =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Validate inputs
  if (!productId || !sessionId) {
    SecureLogger.warn("Missing product or session ID", { clientIP });
    return NextResponse.json(
      { error: "Invalid download link" },
      { status: 400 }
    );
  }

  // Validate product exists
  if (!(productId in PRODUCTS)) {
    SecureLogger.security("Invalid product ID in download", {
      clientIP,
      productId,
    });
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  try {
    // Verify session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if payment was successful
    if (session.payment_status !== "paid") {
      SecureLogger.security("Attempted download with unpaid session", {
        clientIP,
        sessionId,
      });
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 403 }
      );
    }

    // Verify product matches
    const sessionProductId = session.metadata?.productId;
    if (sessionProductId !== productId) {
      SecureLogger.security("Product mismatch in download", {
        clientIP,
        sessionId,
        requestedProduct: productId,
        sessionProduct: sessionProductId,
      });
      return NextResponse.json({ error: "Invalid product" }, { status: 403 });
    }

    // TODO: Generate or retrieve actual PDF file
    // For now, redirect to a placeholder or stored file
    const fileUrl = `/products/${productId}-wedding-diary.pdf`;

    SecureLogger.info("Download initiated", {
      sessionId,
      productId,
      email: session.customer_email,
    });

    // Redirect to file (or serve file directly)
    return NextResponse.redirect(new URL(fileUrl, request.url));
  } catch (error) {
    SecureLogger.error("Download error", error, { clientIP, sessionId });
    return NextResponse.json(
      { error: "Failed to process download" },
      { status: 500 }
    );
  }
}
