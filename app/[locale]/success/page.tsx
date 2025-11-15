"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [isValidAccess, setIsValidAccess] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [dict, setDict] = useState<any>(null);

  // Load dictionary
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const locale = (params as any).locale || "cs";
        const response = await fetch(`/api/dictionary?locale=${locale}`);
        if (response.ok) {
          const dictionary = await response.json();
          setDict(dictionary);
        }
      } catch (error) {
        console.error("Failed to load dictionary:", error);
      }
    };

    loadDictionary();
  }, [params]);

  useEffect(() => {
    const validateSession = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        // No session ID means direct access - redirect to home
        const locale = (params as any).locale || "cs";
        router.replace(`/${locale}`);
        return;
      }

      try {
        // Validate the session with our API
        const response = await fetch("/api/validate-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          throw new Error("Invalid session");
        }

        const data = await response.json();

        // Check if payment was successful
        if (data.status === "complete" && data.paymentStatus === "paid") {
          setIsValidAccess(true);
        } else {
          // Payment not completed - redirect to home
          const locale = (params as any).locale || "cs";
          router.replace(`/${locale}`);
        }
      } catch (error) {
        console.error("Session validation failed:", error);
        // Invalid session - redirect to home
        const locale = (params as any).locale || "cs";
        router.replace(`/${locale}`);
      } finally {
        setIsValidating(false);
      }
    };

    if (dict) {
      validateSession();
    }
  }, [searchParams, router, params, dict]);

  if (!dict) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">
            {dict.success?.validatingPayment || "Validating payment..."}
          </p>
        </div>
      </div>
    );
  }

  if (!isValidAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {dict.success?.title || "Thank you for your order!"}
          </h1>
        </div>

        <div className="space-y-4 text-left bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-gray-700">
            <strong>✉️ {dict.success?.checkEmail || "Check your email"}</strong>
            <br />
            {dict.success?.emailDescription ||
              "Payment confirmation from Stripe can be found in your email inbox."}
          </p>
          <p className="text-gray-700">
            <strong>
              📥 {dict.success?.digitalVersion || "Download your PDF"}
            </strong>
            <br />
            {dict.success?.digitalDescription ||
              "You can download your PDF immediately using the link below. The download link is valid for 30 days."}
          </p>
        </div>

        <a
          href={`/api/download?session=${searchParams.get("session_id")}`}
          className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition mb-6 w-full text-center"
          download
        >
          ⬇️ {dict.success?.downloadButton || "Download PDF"}
        </a>

        <div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
          <strong>📌 {dict.success?.importantNote || "Important:"}</strong>{" "}
          {dict.success?.downloadNote ||
            "Save this link or download the PDF now. The download link expires after 30 days. If you need help, contact us."}
        </div>

        <div className="text-sm text-gray-500 mb-6">
          {dict.success?.questions || "Have questions? Write to us at"}{" "}
          <a
            href="mailto:info@svatebnidenik.cz"
            className="text-black hover:underline"
          >
            info@svatebnidenik.cz
          </a>
        </div>

        <a
          href={`/${(params as any).locale || "cs"}`}
          className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {dict.success?.continue || "Back to main page"}
        </a>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
