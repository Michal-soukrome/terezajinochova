// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { routes, getCanonicalRoute } from "@/lib/routes";

const locales = ["cs", "en"] as const;
const defaultLocale = "cs";

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const languages = acceptLanguage.split(",").map((lang) => {
      const [locale, quality = "1"] = lang.trim().split(";q=");
      return { locale: locale.split("-")[0], quality: parseFloat(quality) };
    });

    languages.sort((a, b) => b.quality - a.quality);
    for (const { locale } of languages) {
      if (locales.includes(locale as (typeof locales)[number])) {
        return locale;
      }
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, static files, etc.
  if (
    pathname.includes("/_next") ||
    pathname.includes("/api") ||
    pathname.includes(".") // files with extensions
  ) {
    return NextResponse.next();
  }

  // Check if pathname contains a valid locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale, redirect to preferred or default locale
  if (!hasLocale) {
    const preferredLocale = getPreferredLocale(request);
    return NextResponse.redirect(
      new URL(`/${preferredLocale}${pathname}`, request.url)
    );
  }

  // Extract locale and slug
  const pathParts = pathname.split("/").filter(Boolean);
  const locale = pathParts[0] as "cs" | "en";
  const slug = pathParts[1];

  // Homepage - no rewrite needed
  if (!slug) {
    return NextResponse.next();
  }

  // Check if this slug needs rewriting to canonical
  const canonicalRoute = getCanonicalRoute(slug, locale);

  if (canonicalRoute) {
    const canonicalSlug = routes[canonicalRoute].en; // English is always canonical

    // If not already canonical, rewrite to canonical path
    if (slug !== canonicalSlug) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/${canonicalSlug}`;

      // Store the original localized path for reference
      const response = NextResponse.rewrite(url);
      response.headers.set("x-locale-slug", slug);
      response.headers.set("x-canonical-route", canonicalRoute);

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|assets|images|products|robots.txt|sitemap.xml|favicon.ico|.*\\..*).*)",
  ],
};
