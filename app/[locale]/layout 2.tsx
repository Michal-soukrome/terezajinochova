import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Locale, getTranslations } from "@/lib/i18n";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
});

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = params;
  const t = getTranslations(locale);

  return {
    title: locale === 'cs' ? "Svatební Deník - Průvodce plánováním svatby" : "Wedding Diary - Wedding Planning Guide",
    description: locale === 'cs'
      ? "Kompletní nástroje a tipy pro plánování dokonalé svatby. Profesionální svatební deníky a plánovače."
      : "Complete tools and tips for planning the perfect wedding. Professional wedding diaries and planners.",
    keywords: locale === 'cs'
      ? "svatba, plánování, deník, průvodce, tipy, svatební plánovač"
      : "wedding, planning, diary, guide, tips, wedding planner",
    authors: [{ name: locale === 'cs' ? "Svatební Deník" : "Wedding Diary" }],
    creator: locale === 'cs' ? "Svatební Deník" : "Wedding Diary",
    publisher: locale === 'cs' ? "Svatební Deník" : "Wedding Diary",
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
      title: locale === 'cs' ? "Svatební Deník - Průvodce plánováním svatby" : "Wedding Diary - Wedding Planning Guide",
      description: locale === 'cs'
        ? "Kompletní nástroje a tipy pro plánování dokonalé svatby."
        : "Complete tools and tips for planning the perfect wedding.",
      type: "website",
      locale: locale === 'cs' ? "cs_CZ" : "en_US",
      siteName: locale === 'cs' ? "Svatební Deník" : "Wedding Diary",
    },
    twitter: {
      card: "summary_large_image",
      title: locale === 'cs' ? "Svatební Deník" : "Wedding Diary",
      description: locale === 'cs'
        ? "Kompletní nástroje a tipy pro plánování dokonalé svatby."
        : "Complete tools and tips for planning the perfect wedding.",
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

export default function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = params;
  const t = getTranslations(locale);

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold font-playfair text-gray-900">
                {locale === 'cs' ? 'Svatební Deník' : 'Wedding Diary'}
              </h1>
              <div className="flex items-center space-x-6">
                <nav className="hidden md:flex space-x-8">
                  <a href={`/${locale}`} className="text-gray-600 hover:text-gray-900">
                    {t.common.home}
                  </a>
                  <a href={`/${locale}/denik`} className="text-gray-600 hover:text-gray-900">
                    {t.common.weddingDiary}
                  </a>
                  <a href={`/${locale}/objednavka`} className="text-gray-600 hover:text-gray-900">
                    {t.common.order}
                  </a>
                  <a href={`/${locale}/o-deniku`} className="text-gray-600 hover:text-gray-900">
                    {t.common.aboutDiary}
                  </a>
                  <a href={`/${locale}/kontakt`} className="text-gray-600 hover:text-gray-900">
                    {t.common.contact}
                  </a>
                </nav>
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-400">
                © 2024 {locale === 'cs' ? 'Svatební Deník' : 'Wedding Diary'}. {locale === 'cs' ? 'Všechna práva vyhrazena.' : 'All rights reserved.'}
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
