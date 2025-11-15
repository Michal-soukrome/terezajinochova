// Product definitions with basic and premium variants
export const PRODUCTS = {
  basic: {
    id: "basic",
    price: 990,
    priceId: "price_1ST6XmEZ9QJo6JyeKEHn4qSm", // ← Your REAL basic Price ID
    image: "/assets/thumbnail_IMG_5264.png",
  },
  premium: {
    id: "premium",
    price: 1490,
    priceId: "price_1ST6lJEZ9QJo6Jyey7YROR26", // ← Your REAL premium Price ID (DIFFERENT!)
    image: "/assets/thumbnail_IMG_5264.png",
  },
};

// Export both for easy access
export const BASIC_PRODUCT = PRODUCTS.basic;
export const PREMIUM_PRODUCT = PRODUCTS.premium;

// Backward compatibility
export const PRODUCT_PRICE_ID = PRODUCTS.basic.priceId;
