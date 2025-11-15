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
}

export default function BuyButton({ priceId, dict }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center gap-2 min-w-[140px]"
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
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
