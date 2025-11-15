import { cs } from "./cs";
import { en } from "./en";
import { routes, RouteKey } from "../routes";

export const dictionaries = {
  cs,
  en,
} as const;

export type Dictionary = typeof en;
export type Locale = keyof typeof dictionaries;

export const locales = ["cs", "en"] as const;
export const defaultLocale: Locale = "cs";

// Helper function for generating localized links
export const getLink = (locale: Locale, page: RouteKey): string => {
  return `/${locale}/${routes[page][locale]}`;
};

// Helper to return a dictionary by locale (sync) for server components
export const getDictionary = (locale: Locale) => {
  if (locale !== "cs" && locale !== "en") {
    // default fallback
    return dictionaries[defaultLocale];
  }
  return dictionaries[locale];
};
