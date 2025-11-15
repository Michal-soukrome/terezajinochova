import { dictionaries } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getLink } from "@/lib/i18n";

export default async function CancelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== "cs" && locale !== "en") {
    notFound();
  }

  const dict = dictionaries[locale as "cs" | "en"];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
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
        <h1 className="text-4xl font-bold mb-4">{dict.cancel.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{dict.cancel.description}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <p className="text-gray-700 mb-4">{dict.cancel.message}</p>
        
        <div className="space-y-4">
          <div className="text-left">
            <h3 className="font-medium mb-2">
              {locale === "cs" ? "Vybrat jiný plán" : "Choose a different plan"}
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              {locale === "cs" 
                ? "Můžete si vybrat základní nebo prémiový balíček podle vašich potřeb."
                : "You can choose between basic or premium packages based on your needs."
              }
            </p>
            <a
              href={getLink(locale, "premium")}
              className="inline-block bg-black text-white px-4 py-2 rounded font-medium hover:bg-gray-800 transition text-sm"
            >
              {locale === "cs" ? "Zobrazit plány" : "View plans"}
            </a>
          </div>

          <div className="text-left">
            <h3 className="font-medium mb-2">
              {locale === "cs" ? "Máte otázky?" : "Have questions?"}
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              {locale === "cs" 
                ? "Neváhejte nás kontaktovat, rádi vám pomůžeme."
                : "Don't hesitate to contact us, we're here to help."
              }
            </p>
            <a
              href={getLink(locale, "contact")}
              className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium hover:bg-gray-300 transition text-sm"
            >
              {locale === "cs" ? "Kontaktovat" : "Contact us"}
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <a
          href={`/${locale}`}
          className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {dict.cancel.backToProducts}
        </a>
        <p className="text-sm text-gray-500">
          {locale === "cs"
            ? "Potřebujete pomoc? Napište nám na info@svatebnidenik.cz"
            : "Need help? Write to us at info@svatebnidenik.cz"
          }
        </p>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: "cs" }, { locale: "en" }];
}
