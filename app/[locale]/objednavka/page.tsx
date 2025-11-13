import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import BuyButton from "@/components/BuyButton";
import { getDictionary } from "@/lib/dictionaries";

interface OrderPageProps {
  params: Promise<{ locale: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "cs" | "en");
  const product = PRODUCTS.premium;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-black">
          {dict.order.title}
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          {dict.order.subtitle}
        </p>
      </div>

      {/* Product Comparison */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Basic Version */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-black">
              {PRODUCTS.basic.name}
            </h2>
            <p className="text-gray-600">{PRODUCTS.basic.description}</p>
          </div>

          <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={PRODUCTS.basic.image}
              alt={PRODUCTS.basic.name}
              fill
              className="object-cover"
            />
          </div>

          <ul className="space-y-3 mb-8">
            {PRODUCTS.basic.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-black mr-2">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 pt-6">
            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-black">
                {PRODUCTS.basic.price} Kč
              </span>
              <p className="text-sm text-gray-600 mt-1">
                {dict.order.includingVatShipping}
              </p>
            </div>
            <div className="space-y-3">
              <BuyButton priceId={PRODUCTS.basic.priceId} />
              <a
                href={`/${locale}/zakladni`}
                className="block w-full text-center border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition"
              >
                {dict.order.viewDetails}
              </a>
            </div>
          </div>
        </div>

        {/* Premium Version */}
        <div className="bg-gray-50 rounded-2xl shadow-xl p-8 border-2 border-gray-300 relative">
          {/* Popular badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-semibold">
            {dict.order.popular}
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-black">
              {PRODUCTS.premium.name}
            </h2>
            <p className="text-gray-600">{PRODUCTS.premium.description}</p>
          </div>

          <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
            <Image
              src={PRODUCTS.premium.image}
              alt={PRODUCTS.premium.name}
              fill
              className="object-cover"
            />
          </div>

          <ul className="space-y-3 mb-8">
            {PRODUCTS.premium.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-black mr-2">★</span>
                <span className="text-gray-700 font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-300 pt-6">
            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-black">
                {PRODUCTS.premium.price} Kč
              </span>
              <p className="text-sm text-gray-600 mt-1">
                {dict.order.perfectAsGift}
              </p>
            </div>
            <div className="space-y-3">
              <BuyButton priceId={PRODUCTS.premium.priceId} />
              <a
                href={`/${locale}/premium`}
                className="block w-full text-center border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition"
              >
                {dict.order.viewDetails}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping & Payment Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          {dict.order.shippingAndPayment}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="font-semibold mb-2 text-black">
              {dict.order.cardPayment}
            </h3>
            <p className="text-gray-700 text-sm">
              {dict.order.cardPaymentDesc}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="font-semibold mb-2 text-black">
              {dict.order.delivery}
            </h3>
            <p className="text-gray-700 text-sm">{dict.order.deliveryDesc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎁</span>
            </div>
            <h3 className="font-semibold mb-2 text-black">
              {dict.order.giftPackaging}
            </h3>
            <p className="text-gray-700 text-sm">
              {dict.order.giftPackagingDesc}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border-t border-gray-200 pt-8">
          <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-black mb-2">
                {dict.order.deliveryTimes}
              </h4>
              <ul className="space-y-1">
                <li>• {dict.order.digitalVersion}</li>
                <li>• {dict.order.physicalCopy}</li>
                <li>• {dict.order.premiumVersion}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-2">
                {dict.order.returns}
              </h4>
              <ul className="space-y-1">
                <li>• {dict.order.thirtyDaysReturn}</li>
                <li>• {dict.order.satisfactionGuarantee}</li>
                <li>• {dict.order.contactUsForHelp}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
