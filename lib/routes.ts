// lib/routes.ts
export const routes = {
  contact: { cs: "kontakt", en: "contact" },
  basic: { cs: "zakladni", en: "basic" },
  premium: { cs: "premium", en: "premium" },
  success: { cs: "uspech", en: "success" },
  cancel: { cs: "zruseno", en: "cancel" },
} as const;

export type RouteKey = keyof typeof routes;
export type Locale = "cs" | "en";

/**
 * Get the localized path for a route
 * @example getLocalizedPath("contact", "cs") // "/cs/kontakt"
 */
export function getLocalizedPath(route: RouteKey, locale: Locale): string {
  return `/${locale}/${routes[route][locale]}`;
}

/**
 * Find the canonical route key from a localized slug
 * @example getCanonicalRoute("kontakt", "cs") // "contact"
 */
export function getCanonicalRoute(
  localizedSlug: string,
  locale: Locale
): RouteKey | null {
  for (const [canonical, localized] of Object.entries(routes)) {
    if (localized[locale] === localizedSlug) {
      return canonical as RouteKey;
    }
  }
  return null;
}

/**
 * Get all localized paths for a route (for alternate links)
 * @example getAlternatePaths("contact") // { cs: "/cs/kontakt", en: "/en/contact" }
 */
export function getAlternatePaths(route: RouteKey) {
  return {
    cs: getLocalizedPath(route, "cs"),
    en: getLocalizedPath(route, "en"),
  };
}
