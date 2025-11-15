// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { routes, getCanonicalRoute } from "@/lib/routes";

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

  // Extract locale and path
  const pathParts = pathname.split("/").filter(Boolean);
  const locale = pathParts[0] as "cs" | "en";
  const slug = pathParts[1];

  // If we have a slug, check if it needs to be redirected to canonical path
  if (slug) {
    const canonicalRoute = getCanonicalRoute(slug, locale);
    if (canonicalRoute) {
      // Get the canonical slug for this route
      const canonicalSlug = routes[canonicalRoute][locale];
      if (canonicalSlug !== slug) {
        // Redirect to canonical path
        const canonicalPath = `/${locale}/${canonicalSlug}`;
        return NextResponse.redirect(new URL(canonicalPath, request.url));
      }
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|assets|images|products|robots.txt|sitemap.xml|favicon.ico|.*\\..*).*)",
  ],
};
