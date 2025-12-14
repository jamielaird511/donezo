import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Required environment variables:
// STRIPE_SECRET_KEY - Your Stripe secret key (starts with sk_)
// STRIPE_WEBHOOK_SECRET - Your Stripe webhook signing secret (starts with whsec_)

export const runtime = "nodejs"; // IMPORTANT

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(req: NextRequest) {
  let body: string;

  try {
    body = await req.text(); // raw body
  } catch (err) {
    return NextResponse.json({ error: "Failed to read body" }, { status: 400 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET is not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  // Debug logs before signature verification
  console.log("[stripe webhook] has sig header:", !!sig);
  console.log("[stripe webhook] sig starts:", sig?.slice(0, 12));
  console.log("[stripe webhook] body length:", body.length);
  console.log("[stripe webhook] secret length:", webhookSecret?.length);
  console.log("[stripe webhook] secret starts:", webhookSecret?.slice(0, 6));
  console.log("[stripe webhook] secret ends:", webhookSecret?.slice(-6));
  console.log("[stripe webhook] secret starts/ends:", webhookSecret.slice(0, 6), webhookSecret.slice(-6));
  console.log("[stripe webhook] sig starts:", sig.slice(0, 20));

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    );
  }

  console.log("✅ Stripe webhook verified:", event.type);

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const sessionData = event.data.object as Stripe.Checkout.Session;
      const sessionId = sessionData.id;

      try {
        // Retrieve full session with expanded data
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items", "customer_details"],
        });

        // Log clean JSON block
        const logData = {
          session_id: session.id,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_details?.email || session.customer_email,
          metadata: session.metadata,
          line_items: session.line_items?.data?.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            amount_total: item.amount_total,
          })),
        };

        console.log("Checkout session completed:");
        console.log(JSON.stringify(logData, null, 2));

        // TODO: Store booking to database here
      } catch (error: any) {
        console.error("Error retrieving session details:", error.message);
        // Fallback to basic logging
        console.log("Checkout session completed (basic info):");
        console.log("  Session ID:", sessionId);
        console.log("  Amount total:", sessionData.amount_total);
        console.log("  Currency:", sessionData.currency);
        console.log("  Customer email:", sessionData.customer_email);
        console.log("  Metadata:", sessionData.metadata);
      }

      return NextResponse.json({ received: true });
    }

    default:
      // Log unhandled event types
      console.log(`Unhandled event type: ${event.type}`);
      return NextResponse.json({ received: true });
  }
}

