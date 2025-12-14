import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config({ path: ".env.local" });

// Test script to verify Stripe secret key connectivity
// Run with: npx tsx scripts/stripe-test.ts (or ts-node if available)

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("❌ Error: STRIPE_SECRET_KEY environment variable is not set");
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey);

async function testStripeConnection() {
  try {
    console.log("🔍 Testing Stripe connection...");
    
    // Simple API call to verify connectivity and authentication
    await stripe.prices.list({ limit: 1 });
    
    console.log("✅ Success: Stripe connection is working correctly!");
    console.log("   Your STRIPE_SECRET_KEY is valid and authenticated.");
  } catch (error: any) {
    console.error("❌ Error: Failed to connect to Stripe");
    console.error("   Error message:", error.message);
    if (error.type) {
      console.error("   Error type:", error.type);
    }
    throw error;
  }
}

testStripeConnection()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    process.exit(1);
  });

