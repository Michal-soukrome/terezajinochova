import { cache } from "react";
import { dictionary as csDictionary } from "./cs";
import { dictionary as enDictionary } from "./en";

export type Locale = "cs" | "en";

const dictionaries = {
  cs: csDictionary,
  en: enDictionary,
} as const;

export const getDictionary = cache(async (locale: Locale) => {
  return dictionaries[locale];
});

export type Dictionary = typeof csDictionary;
