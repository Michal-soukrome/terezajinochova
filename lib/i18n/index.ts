import cs from "./cs.json";
import en from "./en.json";

export type Locale = "cs" | "en";

export const locales = ["cs", "en"] as const;
export const defaultLocale: Locale = "cs";

const translations = {
  cs,
  en,
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split(".");
  let value: unknown = translations[locale];

  for (const k of keys) {
    if (value && typeof value === "object") {
      value = (value as Record<string, unknown>)[k];
    } else {
      value = undefined;
    }
  }

  return typeof value === "string" ? value : key;
}

export type TranslationKeys = keyof typeof cs;
