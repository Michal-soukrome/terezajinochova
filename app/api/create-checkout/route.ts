import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products";
import { SecureLogger } from "@/lib/secure-logger";
import { getBaseUrl } from "@/lib/env";
import { locales } from "@/i18n";

export async function POST(request: NextRequest) {
  // Get client IP for logging
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIP = forwardedFor
    ? forwardedFor.split(",")[0].trim()
    : request.headers.get("x-real-ip") || "unknown";

  try {
    const { priceId, locale = "cs" } = await request.json();

    if (!priceId) {
      SecureLogger.warn("Price ID is required but not provided", { clientIP });
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // Validate priceId against canonical product list
    const validPriceIds = Object.values(PRODUCTS).map(
      (product) => product.stripePriceId
    );
    if (!validPriceIds.includes(priceId)) {
      SecureLogger.security("Invalid priceId attempted", { clientIP, priceId });
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    // Strict locale validation - don't trust client input
    const safeLocale = locales.includes(locale) ? locale : "cs";

    const baseUrl = getBaseUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/${safeLocale}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${safeLocale}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    SecureLogger.error("Error creating checkout session", error, { clientIP });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
