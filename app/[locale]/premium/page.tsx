import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import BuyButton from "@/components/BuyButton";
import { getDictionary } from "@/lib/dictionaries";

interface PremiumPageProps {
  params: Promise<{ locale: string }>;
}

export default async function PremiumDiaryPage({ params }: PremiumPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "cs" | "en");
  const product = PRODUCTS.premium;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <a href={`/${locale}`} className="hover:text-black">
              {dict.products.premium.breadcrumb.home}
            </a>
          </li>
          <li>/</li>
          <li>
            <a href={`/${locale}/denik`} className="hover:text-black">
              {dict.products.premium.breadcrumb.diary}
            </a>
          </li>
          <li>/</li>
          <li className="text-black font-medium">
            {dict.products.premium.breadcrumb.premium}
          </li>
        </ol>
      </nav>

      {/* Product Header */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="relative">
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Premium badge */}
          <div className="absolute -top-4 -right-4 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            {dict.products.premium.badge}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
              {dict.products.premium.popularChoice}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-black">
            {dict.products.premium.name}
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            {dict.products.premium.description}
          </p>

          <div className="mb-8">
            <div className="text-5xl font-bold text-black mb-2">
              {dict.products.premium.price}
            </div>
            <p className="text-gray-600">
              {dict.products.premium.oneTimePayment}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {dict.products.premium.perfectGift}
            </p>
          </div>

          <div className="mb-8">
            <BuyButton priceId={product.priceId} />
          </div>

          {/* Key Features */}
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h3 className="font-semibold mb-4 text-black">
              {dict.products.premium.premiumPackageIncludes}
            </h3>
            <ul className="space-y-3">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-black mr-3 text-lg">★</span>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Premium Features */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">
          {dict.products.premium.whyChoosePremium}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-semibold mb-4 text-black">
              {dict.products.premium.luxuryGiftPackaging}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.premium.luxuryGiftPackagingDesc}
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• {dict.products.premium.premiumBox}</li>
              <li>• {dict.products.premium.goldenRibbon}</li>
              <li>• {dict.products.premium.dedicationCard}</li>
              <li>• {dict.products.premium.goldenFoil}</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-semibold mb-4 text-black">
              {dict.products.premium.everythingFromBasic}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.premium.everythingFromBasicDesc}
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• {dict.products.premium.pagesPlanning}</li>
              <li>• {dict.products.premium.premiumBinding}</li>
              <li>• {dict.products.premium.goldenDetails}</li>
              <li>• {dict.products.premium.digitalPhysical}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">
          {dict.products.premium.completeGuide}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-black">
              {dict.products.premium.structuredPlanning}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.premium.structuredPlanningDesc}
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              {dict.products.premium.budgetCalculator}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.premium.budgetCalculatorDesc}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-black">
              {dict.products.premium.guestList}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.premium.guestListDesc}
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              {dict.products.premium.weddingDayTimeline}
            </h3>
            <p className="text-gray-700 mb-6">
              {dict.products.premium.weddingDayTimelineDesc}
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
          <div className="text-center bg-white p-6 rounded-xl shadow-lg border-2 border-gray-300">
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

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border-2 border-gray-300">
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

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border-2 border-gray-300">
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

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border-2 border-gray-300">
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

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border-2 border-gray-300">
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

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border-2 border-gray-300">
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

      {/* Gift Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 md:p-12 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">
            {dict.products.premium.perfectWeddingGift}
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            {dict.products.premium.perfectWeddingGiftDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BuyButton priceId={product.priceId} />
            <a
              href={`/${locale}/kontakt`}
              className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-lg transition"
            >
              {dict.products.premium.giftAsPresent}
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-black">
          {dict.products.premium.readyToStart}
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          {dict.products.premium.readyToStartDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <BuyButton priceId={product.priceId} />
          <a
            href={`/${locale}/kontakt`}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-lg transition"
          >
            {dict.products.premium.haveQuestions}
          </a>
        </div>
      </div>
    </div>
  );
}
