import { getDictionary } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function SuccessPage({
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
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">{dict.success.title}</h1>
        <p className="text-lg text-gray-600 mb-8">
          {dict.success.emailDescription}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {dict.success.checkEmail}
        </h2>
        <div className="space-y-4">
          <div className="text-left">
            <p className="text-gray-700 mb-4">
              {dict.success.emailDescription}
            </p>
          </div>

          <div className="text-left">
            <h3 className="font-medium mb-2">{dict.success.digitalVersion}</h3>
            <p className="text-gray-700 text-sm mb-3">
              {dict.success.digitalDescription}
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
              {dict.success.downloadButton}
            </button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">
              {dict.success.importantNote}
            </h4>
            <p className="text-yellow-700 text-sm">
              {dict.success.downloadNote}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <a
          href={`/${locale}`}
          className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {dict.success.continue}
        </a>
        <p className="text-sm text-gray-500">
          {dict.success.questions} info@svatebnidenik.cz
        </p>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [{ locale: "cs" }, { locale: "en" }];
}
