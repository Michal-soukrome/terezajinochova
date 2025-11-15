import { getDictionary } from "@/lib/i18n";
import { getLocalizedPath } from "@/lib/routes";
import { notFound } from "next/navigation";
import { getLink } from "@/lib/i18n";

export default async function ZakladniPage({
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
        <h1 className="text-5xl font-bold mb-4">{dict.basic.title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {dict.basic.description}
        </p>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-lg p-8 mb-8">
        <div className="text-center mb-8">
          <div className="text-4xl font-bold mb-2">{dict.basic.price}</div>
          <p className="text-gray-600">{dict.basic.priceNote}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {dict.basic.includes.title}
            </h2>
            <ul className="space-y-3">
              {dict.basic.includes.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">
              {dict.basic.benefits.title}
            </h2>
            <ul className="space-y-3">
              {dict.basic.benefits.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition">
            {dict.basic.cta}
          </button>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">
          {dict.basic.moreOptions.title}
        </h2>
        <p className="text-gray-600 mb-6">
          {dict.basic.moreOptions.description}
        </p>
        <a
          href={getLocalizedPath("premium", locale)}
          className="inline-block bg-gray-200 text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          {dict.basic.moreOptions.button}
        </a>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: "cs" }, { locale: "en" }];
}
