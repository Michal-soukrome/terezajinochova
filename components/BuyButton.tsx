"use client";

import { useState } from "react";
import { Dictionary } from "@/lib/dictionaries";

interface BuyButtonProps {
  priceId: string;
}

export default function BuyButton({ priceId }: BuyButtonProps) {
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
        className="bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-3 px-8 rounded-lg text-lg transition-colors duration-200"
      >
        {loading ? "Načítání..." : "Koupit nyní"}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
