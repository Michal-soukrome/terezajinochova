"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

function CancelContent() {
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

      // For cancel page, we check for session_id first, but also allow access
      // if user came from Stripe checkout (referrer check)
      const hasSessionId = !!sessionId;
      const referrer = document.referrer;
      const isFromStripe = referrer.includes("checkout.stripe.com");

      if (!hasSessionId && !isFromStripe) {
        // No indication of coming from checkout - redirect to home
        const locale = (params as any).locale || "cs";
        router.replace(`/${locale}`);
        return;
      }

      // If we have a session ID, validate it
      if (hasSessionId) {
        try {
          const response = await fetch("/api/validate-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
          });

          if (response.ok) {
            // Valid session exists - allow access
            setIsValidAccess(true);
          } else {
            // Invalid session but came from Stripe - still allow access
            if (isFromStripe) {
              setIsValidAccess(true);
            } else {
              const locale = (params as any).locale || "cs";
              router.replace(`/${locale}`);
            }
          }
        } catch (error) {
          console.error("Session validation failed:", error);
          // If validation fails but came from Stripe, still allow access
          if (isFromStripe) {
            setIsValidAccess(true);
          } else {
            const locale = (params as any).locale || "cs";
            router.replace(`/${locale}`);
          }
        }
      } else if (isFromStripe) {
        // Came from Stripe but no session ID - allow access
        setIsValidAccess(true);
      } else {
        // Should not reach here due to earlier check, but redirect anyway
        const locale = (params as any).locale || "cs";
        router.replace(`/${locale}`);
      }

      setIsValidating(false);
    };

    if (dict) {
      validateSession();
    }
  }, [searchParams, router, params, dict]);

  if (!dict) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">
            {dict.cancel?.validating || "Validating..."}
          </p>
        </div>
      </div>
    );
  }

  if (!isValidAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {dict.cancel?.title || "Payment was cancelled"}
          </h1>
          <p className="text-gray-600">
            {dict.cancel?.description ||
              "No problem! Your order was not completed."}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            {dict.cancel?.changedMind ||
              "If you changed your mind, you can go back and try again."}
          </p>
          <Link
            href={`/${(params as any).locale || "cs"}`}
            className="inline-block bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {dict.cancel?.back || "Back to products"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CancelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-black border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <CancelContent />
    </Suspense>
  );
}
