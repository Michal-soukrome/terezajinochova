import { getDictionary } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/routes";
import { notFound } from "next/navigation";
import { getLink } from "@/lib/i18n";

export default async function PremiumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== "cs" && locale !== "en") {
    notFound();
  }

  const dict = getDictionary(locale as "cs" | "en");

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">{dict.premium.title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {dict.premium.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            {dict.premium.basic.title}
          </h2>
          <div className="text-3xl font-bold mb-2">
            {dict.premium.basic.price}
          </div>
          <p className="text-gray-600 mb-6">{dict.premium.basic.description}</p>

          <ul className="space-y-3 mb-8">
            {dict.premium.basic.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>

          <a
            href={getLocalizedPath("zakladni", locale)}
            className="w-full bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold hover:bg-gray-300 transition block text-center"
          >
            {dict.premium.basic.button}
          </a>
        </div>

        <div className="bg-black text-white rounded-lg p-8 relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              {dict.premium.premium.badge}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-4">
            {dict.premium.premium.title}
          </h2>
          <div className="text-3xl font-bold mb-2">
            {dict.premium.premium.price}
          </div>
          <p className="text-gray-300 mb-6">
            {dict.premium.premium.description}
          </p>

          <ul className="space-y-3 mb-8">
            {dict.premium.premium.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>

          <a
            href={getLocalizedPath("premium", locale)}
            className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-100 transition block text-center"
          >
            {dict.premium.premium.button}
          </a>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">{dict.premium.faq.title}</h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {dict.premium.faq.questions.map((faq, index) => (
            <div key={index} className="text-left bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: "cs" }, { locale: "en" }];
}
