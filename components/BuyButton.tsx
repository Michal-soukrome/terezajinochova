// components/BuyButton.tsx
"use client";

import { useState } from "react";
import { LoadingSpinner } from "./Loading";

interface BuyButtonProps {
  priceId: string;
  dict: {
    common: {
      buyNow: string;
      loading: string;
    };
  };
  locale: "cs" | "en";
  className?: string;
  onCheckout?: () => void;
}

export default function BuyButton({
  priceId,
  dict,
  locale,
  className = "",
  onCheckout,
}: BuyButtonProps) {
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

      // Redirect to Stripe checkout
      window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePurchase}
        disabled={loading}
        className={`disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
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
        <p className="text-red-600 text-sm mt-2 text-center" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
