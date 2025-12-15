export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Required environment variables:
// STRIPE_SECRET_KEY - Your Stripe secret key (starts with sk_)
// STRIPE_WEBHOOK_SECRET - Your Stripe webhook signing secret (starts with whsec_)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
  }

  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  let buf: Buffer;

  try {
    buf = Buffer.from(await req.arrayBuffer());
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

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
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

        // Only process if payment is actually paid
        if (session.payment_status !== "paid") {
          console.log(`[${event.type}] Session ${session.id} payment_status: ${session.payment_status}, skipping`);
          return NextResponse.json({ received: true });
        }

        // Extract jobId from metadata first, then client_reference_id
        const jobId =
          (session.metadata?.jobId as string | undefined) ||
          (session.client_reference_id as string | null) ||
          undefined;

        if (!jobId) {
          console.error(`[${event.type}] No jobId found on session ${session.id}`);
          return NextResponse.json({ received: true });
        }

        const supabase = getSupabaseAdmin();

        // Check current job status first (idempotent check)
        const { data: currentJob } = await supabase
          .from("jobs")
          .select("status, paid_at")
          .eq("id", jobId)
          .single();

        // Only update if not already paid
        if (currentJob?.status === "paid" && currentJob?.paid_at) {
          console.log(`[${event.type}] Job ${jobId} already paid, skipping update (session ${session.id})`);
          return NextResponse.json({ received: true });
        }

        // Update job to paid
        const { error: updateErr } = await supabase
          .from("jobs")
          .update({
            status: "paid",
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent
              ? String(session.payment_intent)
              : null,
            paid_at: new Date().toISOString(),
          })
          .eq("id", jobId);

        if (updateErr) {
          console.error(`[${event.type}] Failed to update job ${jobId} (session ${session.id}):`, updateErr);
        } else {
          console.log(`[${event.type}] ✅ Updated job ${jobId} -> paid (session ${session.id})`);
        }
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

