import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products";
import { checkoutRateLimiter } from "@/lib/rate-limit";
import { SecureLogger } from "@/lib/secure-logger";

export async function POST(request: NextRequest) {
  // Get client IP for rate limiting
  const clientIP =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  try {
    // Check rate limit
    if (checkoutRateLimiter.isRateLimited(clientIP)) {
      SecureLogger.security("Rate limit exceeded for checkout", { clientIP });
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const { priceId } = await request.json();

    if (!priceId) {
      SecureLogger.warn("Price ID is required but not provided", { clientIP });
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    // Validate priceId against canonical product list
    const validPriceIds = Object.values(PRODUCTS).map(
      (product) => product.priceId
    );
    if (!validPriceIds.includes(priceId)) {
      SecureLogger.security("Invalid priceId attempted", { clientIP, priceId });
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `https://svatebnidenik.cz/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://svatebnidenik.cz/cancel?session_id={CHECKOUT_SESSION_ID}`,
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
