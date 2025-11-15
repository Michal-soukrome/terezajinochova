// Product definitions with comprehensive metadata
// This is the single source of truth for product information

export interface Product {
  readonly id: string;
  readonly slugs: {
    cs: string;
    en: string;
  };
  readonly stripePriceId: string;

  // Pricing (display only - actual charge comes from Stripe)
  readonly pricing: {
    amount: number;
    currency: "CZK"; // ISO 4217 for Stripe compatibility
    display: string;
  };

  // Localized content
  readonly names: {
    cs: string;
    en: string;
  };
  readonly descriptions: {
    cs: string;
    en: string;
  };

  // Assets
  readonly image: string;
  readonly pdfFile: string; // Filename in private/products/

  // Metadata
  readonly version: string;
  readonly createdAt: string;
}

export const PRODUCTS = {
  basic: {
    id: "basic",
    slugs: {
      cs: "zakladni",
      en: "basic",
    },
    stripePriceId: "price_1ST6XmEZ9QJo6JyeKEHn4qSm",
    pricing: {
      amount: 990,
      currency: "CZK",
      display: "990 Kč",
    },
    names: {
      cs: "Svatební Deník - Základní",
      en: "Wedding Diary - Basic",
    },
    descriptions: {
      cs: "Kompletní průvodce plánováním svatby",
      en: "Complete guide to planning your wedding",
    },
    image: "/assets/thumbnail_IMG_5264.png",
    pdfFile: "svatebni-denik-basic-v1.pdf",
    version: "1.0",
    createdAt: "2025-01-15",
  },
  premium: {
    id: "premium",
    slugs: {
      cs: "premium",
      en: "premium",
    },
    stripePriceId: "price_1ST6lJEZ9QJo6Jyey7YROR26",
    pricing: {
      amount: 1490,
      currency: "CZK",
      display: "1490 Kč",
    },
    names: {
      cs: "Svatební Deník - Prémiový",
      en: "Wedding Diary - Premium",
    },
    descriptions: {
      cs: "Luxusní verze s bonusovým obsahem",
      en: "Luxury version with bonus content",
    },
    image: "/assets/thumbnail_IMG_5264.png",
    pdfFile: "svatebni-denik-premium-v1.pdf",
    version: "1.0",
    createdAt: "2025-01-15",
  },
} as const satisfies Record<string, Product>;

// Type helpers
export type ProductId = keyof typeof PRODUCTS;
export type ProductData = (typeof PRODUCTS)[ProductId];

// Legacy exports for backward compatibility
export const BASIC_PRODUCT = PRODUCTS.basic;
export const PREMIUM_PRODUCT = PRODUCTS.premium;
export const PRODUCT_PRICE_ID = PRODUCTS.basic.stripePriceId;
