// app/[locale]/success/page.tsx
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAlternatePaths, getLocalizedPath } from "@/lib/routes";
import { getDictionary } from "@/lib/i18n";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products";

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
  const alternates = getAlternatePaths("success");

  return {
    title: `${t.success?.title || "Success"} | ${t.common.weddingDiary}`,
    description: t.success?.checkEmail || "Payment successful",
    alternates: {
      canonical: alternates[locale],
      languages: {
        cs: alternates.cs,
        en: alternates.en,
      },
    },
    robots: "noindex", // Don't index success pages
  };
}

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "cs" | "en" }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  const { session_id } = await searchParams;
  const t = getDictionary(locale);

  // Redirect if no session_id
  if (!session_id) {
    redirect(getLocalizedPath("cancel", locale));
  }

  // Validate session with Stripe
  let session;
  let productInfo;

  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    // Check if payment was successful
    if (session.payment_status !== "paid") {
      redirect(getLocalizedPath("cancel", locale));
    }

    // Get product info from metadata
    const productId = session.metadata?.productId;
    if (productId && productId in PRODUCTS) {
      productInfo = PRODUCTS[productId as keyof typeof PRODUCTS];
    }
  } catch (error) {
    console.error("Error retrieving session:", error);
    redirect(getLocalizedPath("cancel", locale));
  }

  // Generate download link (temporary - valid for 1 hour)
  const downloadUrl = productInfo
    ? `/api/download?product=${productInfo.id}&session=${session_id}`
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Success Icon */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-600"
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.success.title}
        </h1>
        <p className="text-xl text-gray-600">{t.success.checkEmail}</p>
      </div>

      {/* Order Details */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {locale === "cs" ? "Detaily objednávky" : "Order Details"}
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">
              {locale === "cs" ? "Číslo objednávky:" : "Order ID:"}
            </span>
            <span className="font-mono text-gray-900">{session.id}</span>
          </div>
          {productInfo && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {locale === "cs" ? "Produkt:" : "Product:"}
                </span>
                <span className="font-medium text-gray-900">
                  {productInfo.names[locale]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {locale === "cs" ? "Cena:" : "Amount:"}
                </span>
                <span className="font-medium text-gray-900">
                  {productInfo.pricing.display}
                </span>
              </div>
            </>
          )}
          {session.customer_email && (
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-900">{session.customer_email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Email Confirmation */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-blue-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              {t.success.checkEmail}
            </h3>
            <p className="text-blue-800 text-sm">
              {t.success.emailDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Download Section */}
      {downloadUrl && (
        <div className="bg-linear-to-r from-pink-500 to-purple-600 rounded-xl p-6 mb-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            {t.success.digitalVersion}
          </h2>
          <p className="text-pink-100 mb-6">{t.success.digitalDescription}</p>
          <a
            href={downloadUrl}
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            {t.success.downloadButton}
          </a>
        </div>
      )}

      {/* Important Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h4 className="font-semibold text-yellow-900 mb-1">
              {t.success.importantNote}
            </h4>
            <p className="text-yellow-800 text-sm">{t.success.downloadNote}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="text-center space-y-4">
        <a
          href={`/${locale}`}
          className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          {t.success.continue}
        </a>
        <p className="text-sm text-gray-500">
          {t.success.questions}{" "}
          <a
            href="mailto:info@svatebnidenik.cz"
            className="text-purple-600 hover:underline"
          >
            info@svatebnidenik.cz
          </a>
        </p>
      </div>
    </div>
  );
}
