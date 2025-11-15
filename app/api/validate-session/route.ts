import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { SecureLogger } from "@/lib/secure-logger";

export async function POST(request: NextRequest) {
  // Get client IP for logging
  const clientIP =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }

    // Return session details for validation
    return NextResponse.json({
      valid: true,
      status: session.status,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email,
    });
  } catch (error) {
    console.error("Error validating session:", error);
    return NextResponse.json(
      { error: "Failed to validate session" },
      { status: 500 }
    );
  }
}
