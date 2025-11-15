import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import BuyButton from "@/components/BuyButton";
import { getDictionary } from "@/lib/dictionaries";
import { getLocalizedPath } from "@/lib/routes";
import { notFound } from "next/navigation";

export default async function BasicDiaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (locale !== "cs" && locale !== "en") {
    notFound();
  }

  const dict = await getDictionary(locale);
  const product = PRODUCTS.basic;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Product Header */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={product.image}
            alt={dict.products.basic.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-black">
            💍 {dict.home.title}
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            {dict.products.basic.description}
          </p>

          <div className="mb-8">
            <div className="text-5xl font-bold text-black mb-2">
              {dict.products.basic.price} {locale === "cs" ? "Kč" : "€"}
            </div>
            <p className="text-gray-600">
              {locale === "cs"
                ? "Jednorázová platba • Okamžité stažení"
                : "One-time payment • Instant download"}
            </p>
          </div>

          <div className="mb-8">
            <BuyButton priceId={product.stripePriceId} dict={dict} />
          </div>

          {/* Key Features */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-black">
              {dict.products.basic.whatYouGet}
            </h3>
            <ul className="space-y-2">
              {Object.values(dict.products.basic.features).map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-black mr-3">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* What You'll Find */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">
          📝 {dict.products.basic.whatYouFind}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-black">
              📋 {dict.products.basic.features.checklists}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.basic.checklistsDesc}
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              💰 {dict.products.basic.features.budget}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.basic.budgetDesc}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-black">
              👥 {dict.products.basic.features.guests}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.basic.guestsDesc}
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              ⏰ {dict.products.basic.features.timeline}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.basic.timelineDesc}
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              💡 {dict.products.basic.features.tips}
            </h3>
            <p className="text-gray-700 mb-6">{dict.products.basic.tipsDesc}</p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              📝 {dict.products.basic.features.notes}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.basic.notesDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          {dict.products.premium.everythingYouNeed}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">
              {dict.products.premium.monthlyPlans}
            </h3>
            <p className="text-gray-700 text-sm">
              {dict.products.premium.monthlyPlansDesc}
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">
              {dict.products.premium.budgetTracker}
            </h3>
            <p className="text-gray-700 text-sm">
              {dict.products.premium.budgetTrackerDesc}
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">
              {dict.products.premium.guestManagement}
            </h3>
            <p className="text-gray-700 text-sm">
              {dict.products.premium.guestManagementDesc}
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">
              {dict.products.premium.timeline}
            </h3>
            <p className="text-gray-700 text-sm">
              {dict.products.premium.timelineDesc}
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">
              {dict.products.premium.professionalTips}
            </h3>
            <p className="text-gray-700 text-sm">
              {dict.products.premium.professionalTipsDesc}
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">
              {dict.products.premium.personalNotes}
            </h3>
            <p className="text-gray-700 text-sm">
              {dict.products.premium.personalNotesDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Sample Images */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          {dict.products.premium.seeSamples}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/thumbnail_IMG_5264.png"
              alt={dict.products.premium.samplePage}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/thumbnail_IMG_5264.png"
              alt={dict.products.premium.budgetTables}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/thumbnail_IMG_5264.png"
              alt={dict.products.premium.checklists}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Why Have It */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-black text-center">
          🌟 {dict.benefits.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-black">
              😌 {dict.benefits.stressFree.title}
            </h3>
            <p className="text-gray-700">{dict.benefits.stressFree.desc}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-black">
              💎 {dict.benefits.elegantDesign.title}
            </h3>
            <p className="text-gray-700">{dict.benefits.elegantDesign.desc}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-black">
              💕 {dict.benefits.lifetimeMemory.title}
            </h3>
            <p className="text-gray-700">{dict.benefits.lifetimeMemory.desc}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-black">
              🎁 {dict.benefits.perfectGift.title}
            </h3>
            <p className="text-gray-700">{dict.benefits.perfectGift.desc}</p>
          </div>
        </div>
      </div>

      {/* Parameters */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">
          📋 {dict.parameters.title}
        </h2>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-2xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-black">
                {dict.parameters.format}:
              </span>
              <span className="text-gray-700">
                {dict.parameters.formatValue}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-black">
                {dict.parameters.pages}:
              </span>
              <span className="text-gray-700">
                {dict.parameters.pagesValue}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-black">
                {dict.parameters.binding}:
              </span>
              <span className="text-gray-700">
                {dict.parameters.bindingValue}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-black">
                {dict.parameters.paper}:
              </span>
              <span className="text-gray-700">
                {dict.parameters.paperValue}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-black">
                {dict.parameters.language}:
              </span>
              <span className="text-gray-700">
                {locale === "cs" ? "Čeština" : "English"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-black">
                {dict.parameters.shipping}:
              </span>
              <span className="text-gray-700">
                {locale === "cs" ? "Zdarma po ČR" : "Free shipping in EU"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-black">{dict.cta.ready}</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          {dict.cta.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <BuyButton priceId={product.stripePriceId} dict={dict} />
          <a
            href={getLocalizedPath("contact", locale as "cs" | "en")}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-lg transition"
          >
            {dict.common.questions}
          </a>
        </div>
      </div>
    </div>
  );
}
