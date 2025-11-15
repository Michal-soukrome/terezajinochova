// lib/routes.ts
export const routes = {
  contact: { cs: "kontakt", en: "contact" },
  about: { cs: "o-nas", en: "about" },
  basic: { cs: "zakladni", en: "basic" },
  premium: { cs: "premium", en: "premium" },
  success: { cs: "uspech", en: "success" },
  cancel: { cs: "zruseno", en: "cancel" },
} as const;

export function getLocalizedPath(
  route: keyof typeof routes,
  locale: "cs" | "en"
) {
  return `/${locale}/${routes[route][locale]}`;
}

export function getCanonicalRoute(
  localizedPath: string
): { route: string; locale: "cs" | "en" } | null {
  const segments = localizedPath.split("/").filter(Boolean);
  if (segments.length < 2) return null;

  const locale = segments[0] as "cs" | "en";
  const pathSegment = segments[1];

  for (const [routeKey, localeMap] of Object.entries(routes)) {
    if (localeMap[locale] === pathSegment) {
      return { route: routeKey, locale };
    }
  }

  return null;
}
