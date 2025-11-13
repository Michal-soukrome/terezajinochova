// Product definitions with basic and premium variants
export const PRODUCTS = {
  basic: {
    id: "basic",
    name: "Svatební Deník - Základní",
    price: 990,
    priceId: "price_1ST6XmEZ9QJo6JyeKEHn4qSm", // ← Your REAL basic Price ID
    description: "Kompletní průvodce plánováním svatby",
    image: "/assets/thumbnail_IMG_5264.png",
    features: [
      "120 stran plánování",
      "Checklists a timeline",
      "Budget calculator",
      "Fyzická + digitální kopie",
      "Dodání do 3 dnů",
    ],
  },
  premium: {
    id: "premium",
    name: "Svatební Deník - Prémiový",
    price: 1490,
    priceId: "price_1ST6lJEZ9QJo6Jyey7YROR26", // ← Your REAL premium Price ID (DIFFERENT!)
    description: "Luxusní verze v dárkovém balení",
    image: "/assets/thumbnail_IMG_5264.png",
    features: [
      "Vše ze základní verze",
      "Luxusní dárkové balení",
      "Kartička s osobním věnováním",
      "Prémiová vazba",
      "Zlatá fólie",
      "Dodání do 3 dnů",
    ],
  },
};

// Export both for easy access
export const BASIC_PRODUCT = PRODUCTS.basic;
export const PREMIUM_PRODUCT = PRODUCTS.premium;

// Backward compatibility
export const PRODUCT_PRICE_ID = PRODUCTS.basic.priceId;
