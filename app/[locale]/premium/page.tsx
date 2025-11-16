// app/[locale]/premium/page.tsx
import { Metadata } from "next";
import BuyButton from "@/components/BuyButton";
import { getAlternatePaths } from "@/lib/routes";
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
  const alternates = getAlternatePaths("premium");

  return {
    title: `${t.products.premium.name} | ${t.common.weddingDiary}`,
    description: t.products.premium.description,
    alternates: {
      canonical: alternates[locale],
      languages: {
        cs: alternates.cs,
        en: alternates.en,
      },
    },
  };
}

export default async function PremiumPage({
  params,
}: {
  params: Promise<{ locale: "cs" | "en" }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t.products.premium.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.products.premium.description}
          </p>
        </div>

        {/* Price Comparison */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t.products.basic.name}
              </h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {t.products.basic.price}
              </div>
              <p className="text-gray-600 mb-6">
                {t.products.basic.description}
              </p>

              <ul className="space-y-3 mb-8">
                {Object.values(t.products.basic.features)
                  .slice(0, 4)
                  .map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 shrink-0"></span>
                      {(feature as string).substring(
                        (feature as string).indexOf(" ") + 1
                      )}
                    </li>
                  ))}
              </ul>

              <BuyButton
                priceId="basic"
                dict={t}
                locale={locale}
                className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
              />
            </div>

            {/* Premium Plan */}
            <div className="bg-linear-to-r from-purple-500 to-pink-600 rounded-2xl p-8 shadow-xl text-white relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold">
                  {locale === "cs" ? "Nejprodávanější" : "Best Seller"}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {t.products.premium.name}
              </h3>
              <div className="text-4xl font-bold mb-2">
                {t.products.premium.price}
              </div>
              <p className="opacity-90 mb-6">
                {t.products.premium.description}
              </p>

              <ul className="space-y-3 mb-8">
                {Object.values(t.products.premium.features)
                  .slice(0, 4)
                  .map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 shrink-0"></span>
                      {(feature as string).substring(
                        (feature as string).indexOf(" ") + 1
                      )}
                    </li>
                  ))}
              </ul>

              <BuyButton
                priceId="premium"
                dict={t}
                locale={locale}
                className="w-full bg-white text-purple-600 hover:bg-gray-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Premium Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {locale === "cs" ? "Prémiové funkce" : "Premium Features"}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(t.products.premium.features).map(
              ([key, feature]) => (
                <div
                  key={key}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="text-2xl mb-3">
                    {(feature as string).split(" ")[0]}
                  </div>
                  <div className="text-gray-700 font-medium">
                    {(feature as string).substring(
                      (feature as string).indexOf(" ") + 1
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
