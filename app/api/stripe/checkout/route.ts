import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Required environment variables:
// STRIPE_SECRET_KEY - Your Stripe secret key (starts with sk_)
// NEXT_PUBLIC_SITE_URL - Your site URL (e.g. http://localhost:3000 locally, your Vercel domain in prod)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// Server-side pricing logic
const basePricing: Record<string, number> = {
  "1-2": 129,
  "3": 149,
  "4": 169,
  "5+": 189,
};

function calculatePrice(beds: string | null, storeys: string | null): number | null {
  if (!beds || !storeys) return null;
  const basePrice = basePricing[beds];
  if (!basePrice) return null;
  return storeys === "double" ? basePrice + 100 : basePrice;
}

function getServiceName(service: string): string {
  if (service === "gutter_cleaning") return "Gutter cleaning";
  return service;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, beds, storeys, customerEmail, metadata, jobId } = body;

    // Validate required fields
    if (!service || !beds || !storeys || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields: service, beds, storeys, or customerEmail" },
        { status: 400 }
      );
    }

    if (!jobId || typeof jobId !== "string") {
      return NextResponse.json(
        { error: "Missing required field: jobId" },
        { status: 400 }
      );
    }

    // Calculate price server-side
    const amountNZD = calculatePrice(beds, storeys);
    if (amountNZD === null) {
      return NextResponse.json(
        { error: `Invalid pricing combination: beds=${beds}, storeys=${storeys}` },
        { status: 400 }
      );
    }

    // Validate service
    if (service !== "gutter_cleaning") {
      return NextResponse.json(
        { error: `Unknown service: ${service}` },
        { status: 400 }
      );
    }

    const serviceName = getServiceName(service);

    // Get origin from request headers
    const origin = request.headers.get("origin") ?? "http://localhost:3000";

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,
      client_reference_id: jobId,
      line_items: [
        {
          price_data: {
            currency: "nzd",
            product_data: {
              name: `Donezo — ${serviceName}`,
              description: "Fixed price • No quotes • Queenstown",
              // Optional: add a public image URL (must be publicly accessible)
              // images: [`${origin}/images/services/gutter-cleaning.jpg`],
            },
            unit_amount: Math.round(amountNZD * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          ...(metadata || {}),
          service,
          beds,
          storeys,
          amountNZD: amountNZD.toString(),
          jobId: typeof jobId === "string" ? jobId : "",
        },
      },
      metadata: {
        ...(metadata || {}),
        jobId,
        service,
        beds,
        storeys,
        amountNZD: amountNZD.toString(),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

