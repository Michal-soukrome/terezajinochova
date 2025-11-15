import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { getDictionary } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/routes";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (locale !== "cs" && locale !== "en") {
    notFound();
  }

  const dict = getDictionary(locale as "cs" | "en");
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-black">
          {dict.home.title}
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          {dict.home.description}
        </p>
      </div>

      {/* Product Comparison */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Basic Version */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-black">
              {dict.products.basic.name}
            </h2>
            <p className="text-gray-600">{dict.products.basic.description}</p>
          </div>

          <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={PRODUCTS.basic.image}
              alt={dict.products.basic.name}
              fill
              className="object-cover"
            />
          </div>

          <ul className="space-y-3 mb-8">
            {Object.values(dict.products.basic.features).map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-black mr-2">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 pt-6">
            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-black">
                {dict.products.basic.price}
              </span>
            </div>
            <div className="space-y-3">
              <a
                href={getLocalizedPath("zakladni", locale as "cs" | "en")}
                className="block w-full text-center border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition"
              >
                {dict.common.viewDetails}
              </a>
            </div>
          </div>
        </div>

        {/* Premium Version */}
        <div className="bg-gray-50 rounded-2xl shadow-xl p-8 border-2 border-gray-300 relative">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-black">
              {dict.products.premium.name}
            </h2>
            <p className="text-gray-600">{dict.products.premium.description}</p>
          </div>

          <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={PRODUCTS.premium.image}
              alt={dict.products.premium.name}
              fill
              className="object-cover"
            />
          </div>

          <ul className="space-y-3 mb-8">
            {Object.values(dict.products.premium.features).map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-black mr-2">★</span>
                <span className="text-gray-700 font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-300 pt-6">
            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-black">
                {dict.products.premium.price}
              </span>
            </div>
            <div className="space-y-3">
              <a
                href={getLocalizedPath("premium", locale as "cs" | "en")}
                className="block w-full text-center border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition"
              >
                {dict.common.viewDetails}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          {dict.products.basic.whatYouFind}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Měsíční plány</h3>
            <p className="text-gray-700">
              {dict.products.basic.checklistsDesc}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Budget tracker</h3>
            <p className="text-gray-700">{dict.products.basic.budgetDesc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Seznam hostů</h3>
            <p className="text-gray-700">{dict.products.basic.guestsDesc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Harmonogram dne D</h3>
            <p className="text-gray-700">{dict.products.basic.timelineDesc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Tipy a triky</h3>
            <p className="text-gray-700">{dict.products.basic.tipsDesc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Poznámky</h3>
            <p className="text-gray-700">{dict.products.basic.notesDesc}</p>
          </div>
        </div>
      </div>

      {/* Detail Photos */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Podívejte se blíže
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/thumbnail_IMG_5264.png"
              alt="Detail stránky deníku"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/thumbnail_IMG_5264.png"
              alt="Rozpočtové tabulky"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/thumbnail_IMG_5264.png"
              alt="Checklists a plány"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-black">
          {dict.contact.title}
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          {dict.contact.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={getLocalizedPath("contact", locale as "cs" | "en")}
            className="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition shadow-lg"
          >
            {dict.common.contact}
          </a>
        </div>
      </div>
    </div>
  );
}
