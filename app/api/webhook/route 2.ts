import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sendOrderConfirmation, sendAdminNotification } from "@/lib/resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const shippingAddress = (session as any).shipping_details?.address;
    const orderId = session.id;
    const amount = session.amount_total! / 100; // Convert from cents

    if (customerEmail) {
      // Send PDF download link to customer
      await sendOrderConfirmation({
        to: customerEmail,
        customerName: customerName || "Zákazník",
        orderId: orderId,
        amount: amount,
        downloadLink: `${process.env.NEXT_PUBLIC_BASE_URL}/download/${orderId}`,
      });

      // Notify admin to ship physical product
      await sendAdminNotification({
        customerName: customerName || "N/A",
        customerEmail: customerEmail,
        shippingAddress: shippingAddress,
        orderId: orderId,
        amount: amount,
      });
    }
  }

  return NextResponse.json({ received: true });
}
