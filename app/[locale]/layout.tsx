import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import { getDictionary } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "cs") {
    return {
      title: "Svatební Deník - Průvodce plánováním svatby",
      description:
        "Kompletní nástroje a tipy pro plánování dokonalé svatby. Profesionální svatební deníky a plánovače.",
      keywords: "svatba, plánování, deník, průvodce, tipy, svatební plánovač",
      authors: [{ name: "Svatební Deník" }],
      creator: "Svatební Deník",
      publisher: "Svatební Deník",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
      },
      openGraph: {
        title: "Svatební Deník - Průvodce plánováním svatby",
        description: "Kompletní nástroje a tipy pro plánování dokonalé svatby.",
        type: "website",
        locale: "cs_CZ",
        siteName: "Svatební Deník",
      },
      twitter: {
        card: "summary_large_image",
        title: "Svatební Deník",
        description: "Kompletní nástroje a tipy pro plánování dokonalé svatby.",
        creator: "@svatebnidenik",
      },
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
    };
  } else {
    return {
      title: "Wedding Diary - Wedding Planning Guide",
      description:
        "Complete tools and tips for planning the perfect wedding. Professional wedding diaries and planners.",
      keywords: "wedding, planning, diary, guide, tips, wedding planner",
      authors: [{ name: "Wedding Diary" }],
      creator: "Wedding Diary",
      publisher: "Wedding Diary",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
      },
      openGraph: {
        title: "Wedding Diary - Wedding Planning Guide",
        description:
          "Complete tools and tips for planning the perfect wedding.",
        type: "website",
        locale: "en_US",
        siteName: "Wedding Diary",
      },
      twitter: {
        card: "summary_large_image",
        title: "Wedding Diary",
        description:
          "Complete tools and tips for planning the perfect wedding.",
        creator: "@weddingdiary",
      },
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
    };
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (locale !== "cs" && locale !== "en") {
    notFound();
  }

  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <Header locale={locale} dict={dict} />

        <main>{children}</main>

        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-400">
                {locale === "cs"
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
