export const routes = {
  contact: { cs: "kontakt", en: "contact" },
  zakladni: { cs: "zakladni", en: "basic" },
  premium: { cs: "premium", en: "premium" },
  success: { cs: "uspech", en: "success" },
  cancel: { cs: "zruseno", en: "cancel" },
} as const;

export type RouteKey = keyof typeof routes;

export function getLocalizedPath(route: RouteKey, locale: "cs" | "en") {
  return `/${locale}/${routes[route][locale]}`;
}

export function getCanonicalRoute(
  localizedSlug: string,
  locale: "cs" | "en"
): RouteKey | null {
  for (const [canonical, localized] of Object.entries(routes)) {
    if (localized[locale] === localizedSlug) {
      return canonical as RouteKey;
    }
  }
  return null;
}
