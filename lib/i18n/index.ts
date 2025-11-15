import { cs } from "./cs";
import { en } from "./en";

export const dictionaries = {
  cs,
  en,
} as const;

export type Dictionary = typeof en;
export type Locale = keyof typeof dictionaries;

export const locales = ["cs", "en"] as const;
export const defaultLocale: Locale = "cs";

export const localizedSlugs = {
  cs: {
    contact: "contact",
    success: "success",
    cancel: "cancel",
    basic: "zakladni",
    premium: "premium",
  },
  en: {
    contact: "contact",
    success: "success",
    cancel: "cancel",
    basic: "basic",
    premium: "premium",
  },
} as const;

export type PageKey = keyof typeof localizedSlugs.cs;

// Helper function for generating localized links
export const getLink = (locale: Locale, page: PageKey): string => {
  return `/${locale}/${localizedSlugs[locale][page]}`;
};
