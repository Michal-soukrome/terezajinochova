// middleware/index.ts
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "../i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale from pathname
  const pathnameLocale = pathname.split("/")[1] as Locale;

  // Check if the pathname contains a valid locale
  const hasValidLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname has a valid locale, allow it through
  if (hasValidLocale) {
    return NextResponse.next();
  }

  // Check if pathname has an invalid locale (exists but not in our list)
  const hasInvalidLocale =
    pathname.startsWith("/") &&
    pathname.split("/")[1] &&
    pathname.split("/")[1].length === 2 &&
    !locales.includes(pathnameLocale);

  // If invalid locale detected, redirect to default locale
  if (hasInvalidLocale) {
    const pathWithoutLocale = pathname.split("/").slice(2).join("/");
    const newUrl = new URL(
      `/${defaultLocale}/${pathWithoutLocale}`,
      request.url
    );
    return NextResponse.redirect(newUrl);
  }

  // No locale in pathname, redirect to default locale
  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, assets)
    "/((?!api|_next|_vercel|assets|images|products|robots.txt|sitemap.xml|favicon.ico|.*\\..*).*)",
  ],
};
