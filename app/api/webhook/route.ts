import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { webhookRateLimiter } from "@/lib/rate-limit";
import { SecureLogger } from "@/lib/secure-logger";
import { stripe, webhookSecret } from "@/lib/stripe";

// Stripe webhook signature verification
async function verifyStripeSignature(
  body: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const crypto = await import("crypto");

    // Extract timestamp and signatures from header
    const elements = signature.split(",");
    const sigElements: { [key: string]: string } = {};

    for (const element of elements) {
      const [key, value] = element.split("=");
      sigElements[key] = value;
    }

    const timestamp = sigElements.t;
    const signatures = sigElements.v1?.split(",") || [];

    // Create the signed payload
    const signedPayload = `${timestamp}.${body}`;

    // Verify against each signature
    for (const sig of signatures) {
      try {
        const expectedSignature = crypto
          .createHmac("sha256", secret)
          .update(signedPayload, "utf8")
          .digest("hex");

        if (
          crypto.timingSafeEqual(
            Buffer.from(sig),
            Buffer.from(expectedSignature)
          )
        ) {
          return true;
        }
      } catch {
        // Continue to next signature
      }
    }

    return false;
  } catch (error) {
    console.error("Error verifying Stripe signature:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit for webhook requests
    if (webhookRateLimiter.isRateLimited(clientIP)) {
      console.warn(`Webhook rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      SecureLogger.security("No Stripe signature provided", { clientIP });
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    if (!webhookSecret) {
      SecureLogger.error("STRIPE_WEBHOOK_SECRET not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify the webhook signature
    const isValidSignature = await verifyStripeSignature(
      body,
      signature,
      webhookSecret
    );

    if (!isValidSignature) {
      SecureLogger.security("Invalid Stripe signature", { clientIP });
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Log the event type (without sensitive data)
    SecureLogger.info(`Received Stripe webhook: ${event.type}`, {
      eventId: event.id,
    });

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;

        // Validate that the session contains expected data
        if (!session.id || !session.customer_email) {
          SecureLogger.security("Invalid session data in webhook", {
            sessionId: session.id,
          });
          return NextResponse.json(
            { error: "Invalid session data" },
            { status: 400 }
          );
        }

        // Here you would typically:
        // 1. Update order status in database
        // 2. Send confirmation email
        // 3. Fulfill the digital product
        // 4. Log the successful payment

        SecureLogger.info(`Payment successful for session: ${session.id}`, {
          sessionId: session.id,
          amount: session.amount_total,
          currency: session.currency,
        });

        // TODO: Implement order fulfillment logic here
        // This should be done asynchronously to avoid webhook timeouts

        break;

      case "payment_intent.payment_failed":
        const paymentIntent = event.data.object;
        SecureLogger.warn(
          `Payment failed for payment intent: ${paymentIntent.id}`,
          {
            paymentIntentId: paymentIntent.id,
            lastPaymentError: paymentIntent.last_payment_error,
          }
        );

        // TODO: Handle failed payments
        // Could notify customer, update order status, etc.

        break;

      default:
        SecureLogger.info(`Unhandled event type: ${event.type}`, {
          eventId: event.id,
        });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    SecureLogger.error("Webhook error", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
