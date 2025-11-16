// app/sitemap.ts
import { MetadataRoute } from "next";
import { routes, getLocalizedPath, type RouteKey } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://terezajinochova.cz";
  const locales = ["cs", "en"] as const;

  const staticRoutes: RouteKey[] = [
    "contact",
    "basic",
    "premium",
    "success",
    "cancel",
  ];

  const urls: MetadataRoute.Sitemap = [];

  // Homepage for each locale
  locales.forEach((locale) => {
    urls.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          cs: `${baseUrl}/cs`,
          en: `${baseUrl}/en`,
        },
      },
    });
  });

  // All routes for each locale
  staticRoutes.forEach((route) => {
    locales.forEach((locale) => {
      const path = getLocalizedPath(route, locale);
      urls.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            cs: `${baseUrl}${getLocalizedPath(route, "cs")}`,
            en: `${baseUrl}${getLocalizedPath(route, "en")}`,
          },
        },
      });
    });
  });

  return urls;
}
