// app/[locale]/basic/page.tsx
import { Metadata } from "next";
import BuyButton from "@/components/BuyButton";
import { getAlternatePaths } from "@/lib/routes";
import { getDictionary } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "cs" as const }, { locale: "en" as const }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "cs" | "en" }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale); // ✅ Use helper

  const alternates = getAlternatePaths("basic");

  return {
    title: `${t.products.basic.name} | ${t.common.weddingDiary}`,
    description: t.products.basic.description,
    alternates: {
      canonical: alternates[locale],
      languages: {
        cs: alternates.cs,
        en: alternates.en,
      },
    },
  };
}

export default async function BasicPage({
  params,
}: {
  params: Promise<{ locale: "cs" | "en" }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale); // ✅ Use helper

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50">
      {" "}
      {/* ✅ Fixed */}
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t.products.basic.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.products.basic.description}
          </p>
        </div>

        {/* Price Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
            <div className="text-6xl font-bold text-gray-900 mb-2">
              {t.products.basic.price}
            </div>
            <p className="text-gray-600 mb-8">
              {locale === "cs" ? "Jednorázová platba" : "One-time payment"}
            </p>

            <BuyButton
              priceId="basic"
              dict={t}
              locale={locale}
              className="w-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t.products.basic.whatYouGet}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(t.products.basic.features).map(([key, feature]) => {
              const featureText = feature as string;
              const emoji = featureText.split(" ")[0];
              const text = featureText.substring(featureText.indexOf(" ") + 1);

              return (
                <div
                  key={key}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="text-2xl mb-3">{emoji}</div>
                  <div className="text-gray-700 font-medium">{text}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Descriptions */}
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t.products.basic.whatYouFind}
            </h3>
            <div className="space-y-6">
              {[
                { title: t.products.basic.checklistsDesc },
                { title: t.products.basic.budgetDesc },
                { title: t.products.basic.guestsDesc },
              ].map((item, idx) => {
                const [heading, ...rest] = item.title.split(".");
                return (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {heading}.
                    </h4>
                    <p className="text-gray-600">{rest.join(".").trim()}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-linear-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
            {" "}
            {/* ✅ Fixed */}
            <h3 className="text-3xl font-bold mb-4">
              {locale === "cs"
                ? "Začněte plánovat svou svatbu"
                : "Start Planning Your Wedding"}
            </h3>
            <p className="text-xl mb-8 opacity-90">
              {locale === "cs"
                ? "Váš dokonalý svatební deník čeká"
                : "Your perfect wedding diary awaits"}
            </p>
            <BuyButton
              priceId="basic"
              dict={t}
              locale={locale}
              className="bg-white text-purple-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
