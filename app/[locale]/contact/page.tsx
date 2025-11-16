// app/[locale]/contact/page.tsx
import { Metadata } from "next";
import { getAlternatePaths } from "@/lib/routes";

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
  const translations = await import(`@/lib/i18n/${locale}`);
  const t = translations[locale];

  const alternates = getAlternatePaths("contact");

  return {
    title: `${t.contact.title} | ${t.common.weddingDiary}`,
    description: t.contact.description,
    alternates: {
      canonical: alternates[locale], // Use localized URL as canonical
      languages: {
        cs: alternates.cs, // /cs/kontakt
        en: alternates.en, // /en/contact
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: "cs" | "en" }>;
}) {
  const { locale } = await params;
  const translations = await import(`@/lib/i18n/${locale}`);
  const t = translations[locale];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{t.contact.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{t.contact.description}</p>

      <form className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.contact.form?.name || "Name"}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.contact.form?.email || "Email"}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {t.contact.form?.message || "Message"}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {t.contact.form?.send || "Send"}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>
          {locale === "cs"
            ? "Nebo mi napište přímo na:"
            : "Or write to me directly at:"}
        </p>
        <a
          href="mailto:info@svatebnidenik.cz"
          className="text-black hover:underline text-lg font-medium"
        >
          info@svatebnidenik.cz
        </a>
      </div>
    </div>
  );
}
