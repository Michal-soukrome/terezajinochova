#!/usr/bin/env tsx
/**
 * Stripe Price Verification Script
 *
 * Validates that product prices in code match Stripe Price objects
 * Run before deployment: npm run verify-prices
 *
 * Checks:
 * - Price amounts match
 * - Currency matches
 * - Price IDs exist in Stripe
 * - Products are active
 */

import Stripe from "stripe";
import { PRODUCTS } from "../lib/products";
import { env } from "../lib/env";

// Skip verification for dummy/test keys
if (
  env.STRIPE_SECRET_KEY.includes("dummy") ||
  env.STRIPE_SECRET_KEY.includes("test_dummy")
) {
  console.log("🔍 Skipping Stripe price verification for dummy/test keys");
  console.log("✅ Verification skipped - using test environment");
  process.exit(0);
}

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
});

interface ValidationError {
  productId: string;
  field: string;
  expected: any;
  actual: any;
}

async function verifyPrices() {
  console.log("🔍 Verifying Stripe prices against product definitions...\n");

  const errors: ValidationError[] = [];
  let successCount = 0;

  for (const [id, product] of Object.entries(PRODUCTS)) {
    try {
      console.log(`Checking ${id}...`);

      // Retrieve price from Stripe
      const stripePrice = await stripe.prices.retrieve(product.stripePriceId);

      // Check if price is active
      if (!stripePrice.active) {
        console.error(`  ❌ Price is inactive in Stripe`);
        errors.push({
          productId: id,
          field: "active",
          expected: true,
          actual: false,
        });
        continue;
      }

      // Convert local price to cents (Stripe uses smallest currency unit)
      const expectedAmount = product.pricing.amount * 100;
      const actualAmount = stripePrice.unit_amount || 0;

      // Check amount
      if (expectedAmount !== actualAmount) {
        console.error(`  ❌ AMOUNT MISMATCH`);
        console.error(
          `     Code:   ${product.pricing.amount} ${product.pricing.currency}`
        );
        console.error(
          `     Stripe: ${actualAmount / 100} ${stripePrice.currency}`
        );
        errors.push({
          productId: id,
          field: "amount",
          expected: expectedAmount,
          actual: actualAmount,
        });
      }

      // Check currency
      if (product.pricing.currency !== stripePrice.currency) {
        console.error(`  ❌ CURRENCY MISMATCH`);
        console.error(`     Code:   ${product.pricing.currency}`);
        console.error(`     Stripe: ${stripePrice.currency}`);
        errors.push({
          productId: id,
          field: "currency",
          expected: product.pricing.currency,
          actual: stripePrice.currency,
        });
      }

      if (
        expectedAmount === actualAmount &&
        product.pricing.currency === stripePrice.currency
      ) {
        console.log(`  ✅ ${product.pricing.display} matches Stripe`);
        successCount++;
      }

      // Additional info
      console.log(`     Stripe Price ID: ${stripePrice.id}`);
      console.log(`     Product ID: ${stripePrice.product}`);
      console.log("");
    } catch (error) {
      if (error instanceof Stripe.errors.StripeInvalidRequestError) {
        console.error(`  ❌ PRICE NOT FOUND IN STRIPE`);
        console.error(`     ${product.stripePriceId} does not exist`);
        errors.push({
          productId: id,
          field: "exists",
          expected: "found",
          actual: "not found",
        });
      } else {
        console.error(`  ❌ ERROR: ${error}`);
        errors.push({
          productId: id,
          field: "error",
          expected: "success",
          actual: String(error),
        });
      }
      console.log("");
    }
  }

  // Summary
  console.log("━".repeat(60));
  console.log(`\n📊 Verification Summary:\n`);
  console.log(`✅ Passed: ${successCount}/${Object.keys(PRODUCTS).length}`);
  console.log(`❌ Failed: ${errors.length}`);

  if (errors.length > 0) {
    console.log(`\n❌ VALIDATION FAILED\n`);
    console.log("Errors found:");
    errors.forEach((err) => {
      console.log(
        `  • ${err.productId}.${err.field}: expected "${err.expected}", got "${err.actual}"`
      );
    });
    console.log("\n⚠️  Fix these issues before deploying!");
    process.exit(1);
  }

  console.log(`\n✅ ALL PRICES VERIFIED\n`);
  console.log("Safe to deploy!");
  process.exit(0);
}

// Run verification
verifyPrices().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
