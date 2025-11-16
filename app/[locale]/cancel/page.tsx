// app/[locale]/cancel/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { getLocalizedPath, getAlternatePaths } from "@/lib/routes";
import { getDictionary } from "@/lib/i18n";

// Generate static params for both locales
export function generateStaticParams() {
  return [{ locale: "cs" as const }, { locale: "en" as const }];
}

// Dynamic metadata per locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "cs" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale);
  const alternates = getAlternatePaths("cancel");

  return {
    title: `${t.cancel.title} | ${t.common.weddingDiary}`,
    description: t.cancel.description,
    alternates: {
      canonical: alternates[locale],
      languages: {
        cs: alternates.cs,
        en: alternates.en,
      },
    },
    robots: "noindex", // Don't index cancel pages
  };
}

export default async function CancelPage({
  params,
}: {
  params: Promise<{ locale: "cs" | "en" }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Cancel Icon */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.cancel.title}
        </h1>
        <p className="text-xl text-gray-600">{t.cancel.description}</p>
      </div>

      {/* Message */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8 text-center">
        <p className="text-gray-700 text-lg">{t.cancel.message}</p>
      </div>

      {/* Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Try Different Plan */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">
            {locale === "cs" ? "Vybrat jiný plán" : "Choose a different plan"}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {locale === "cs"
              ? "Možná by vám lépe vyhovoval jiný balíček"
              : "Maybe a different package would suit you better"}
          </p>
          <Link
            href={getLocalizedPath("premium", locale)}
            className="inline-block bg-black text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
          >
            {locale === "cs" ? "Zobrazit plány" : "View plans"}
          </Link>
        </div>

        {/* Contact Us */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">
            {locale === "cs" ? "Máte otázky?" : "Have questions?"}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {locale === "cs"
              ? "Rádi vám pomůžeme s výběrem nebo odpovíme na dotazy"
              : "We're happy to help with your choice or answer questions"}
          </p>
          <Link
            href={getLocalizedPath("contact", locale)}
            className="inline-block bg-purple-100 text-purple-700 px-6 py-2.5 rounded-lg font-medium hover:bg-purple-200 transition-colors text-sm"
          >
            {locale === "cs" ? "Kontaktovat" : "Contact us"}
          </Link>
        </div>
      </div>

      {/* Back to Home */}
      <div className="text-center">
        <Link
          href={`/${locale}`}
          className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          {t.cancel.backToProducts}
        </Link>
      </div>
    </div>
  );
}
