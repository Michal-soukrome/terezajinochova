// components/BuyButton.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { LoadingSpinner } from "./Loading";
import { type Locale } from "@/i18n";

interface BuyButtonProps {
  priceId: string;
  dict: {
    common: {
      buyNow: string;
      loading: string;
    };
  };
  className?: string;
  onCheckout?: () => void;
}

export default function BuyButton({
  priceId,
  dict,
  className = "",
  onCheckout,
}: BuyButtonProps) {
  const params = useParams();
  const locale = (params?.locale as Locale) || "cs";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);

    try {
      onCheckout?.();

      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, locale }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error("No checkout URL received");
      }

      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={loading}
        className={`bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center gap-2 min-w-[140px] ${className}`}
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" />
            <span>{dict.common.loading}</span>
          </>
        ) : (
          dict.common.buyNow
        )}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
