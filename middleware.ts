// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const locales = ["cs", "en"] as const;
const defaultLocale = "cs";

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

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|assets|images|products|robots.txt|sitemap.xml|favicon.ico|.*\\..*).*)",
  ],
};
