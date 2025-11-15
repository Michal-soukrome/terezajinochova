// lib/env.ts
// Centralized environment variable validation
// This file should be imported early in the application lifecycle

const requiredEnvVars = {
  // Stripe configuration
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
} as const;

const optionalEnvVars = {
  // Application URLs (have defaults)
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  VERCEL_URL: process.env.VERCEL_URL,
} as const;

// Validate required environment variables
function validateEnv() {
  const missing: string[] = [];

  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing
        .map((key) => `  - ${key}`)
        .join("\n")}\n\n` + `Please check your .env.local file.`
    );
  }
}

// Run validation immediately when this module is imported
validateEnv();

// Export validated environment variables with proper types
export const env = {
  STRIPE_SECRET_KEY: requiredEnvVars.STRIPE_SECRET_KEY!,
  STRIPE_WEBHOOK_SECRET: requiredEnvVars.STRIPE_WEBHOOK_SECRET!,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    requiredEnvVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  NEXT_PUBLIC_APP_URL: optionalEnvVars.NEXT_PUBLIC_APP_URL,
  VERCEL_URL: optionalEnvVars.VERCEL_URL,
} as const;

// Helper to get base URL for redirects
export function getBaseUrl(): string {
  if (env.NEXT_PUBLIC_APP_URL) {
    return env.NEXT_PUBLIC_APP_URL;
  }

  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
