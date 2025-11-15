// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";
import RouteChangeLoader from "@/components/RouteChangeLoader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
  display: "swap",
});

// Static base metadata
const baseMetadata = {
  formatDetection: { email: false, address: false, telephone: false },
  icons: { icon: "/favicon.ico" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
} as const;

// Locale metadata
const metadataByLocale = {
  cs: {
    title: "Svatební Deník - Průvodce plánováním svatby",
    description:
      "Kompletní nástroje a tipy pro plánování dokonalé svatby. Profesionální svatební deníky a plánovače.",
    keywords: "svatba, plánování, deník, průvodce, svatební plánovač",
    siteName: "Svatební Deník",
    creator: "@svatebnidenik",
    locale: "cs_CZ",
  },
  en: {
    title: "Wedding Diary - Wedding Planning Guide",
    description:
      "Complete tools and tips for planning the perfect wedding. Professional wedding diaries and planners.",
    keywords: "wedding, planning, diary, guide, tips, wedding planner",
    siteName: "Wedding Diary",
    creator: "@weddingdiary",
    locale: "en_US",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = metadataByLocale[locale as keyof typeof metadataByLocale];

  if (!meta) return metadataByLocale["cs"];

  return {
    ...baseMetadata,
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: meta.locale,
      siteName: meta.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: meta.creator,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  if (!locales.includes(typedLocale)) {
    notFound();
  }

  return (
    <html lang={typedLocale}>
      <body className="font-sans antialiased">
        <Header locale={typedLocale} />
        <main className="relative">
          <RouteChangeLoader />
          {children}
        </main>

        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-400">
                {typedLocale === "cs"
                  ? "© 2024 Svatební Deník. Všechna práva vyhrazena."
                  : "© 2024 Wedding Diary. All rights reserved."}
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
