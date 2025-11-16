// middleware/index.ts
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "../i18n";
import { routes } from "../lib/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname contains a valid locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale, redirect to default locale
  if (!hasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  // Extract locale and path segment
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] as "cs" | "en";
  const pathSegment = segments[1];

  // If no path segment (just locale), allow through
  if (!pathSegment) return NextResponse.next();

  // Check if this is a localized route that needs rewriting
  for (const [routeKey, localeMap] of Object.entries(routes)) {
    if (localeMap[locale] === pathSegment) {
      const canonicalPath = `/${locale}/${routeKey}`;
      if (pathname !== canonicalPath) {
        const url = request.nextUrl.clone();
        url.pathname = canonicalPath;
        return NextResponse.rewrite(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|assets|images|products|robots.txt|sitemap.xml|favicon.ico|.*\\..*).*)",
  ],
};
