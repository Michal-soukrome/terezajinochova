"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "./Loading";
import { type Locale, locales } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSwitching, setIsSwitching] = useState(false);

  const switchLanguage = async (newLocale: Locale) => {
    if (newLocale === currentLocale || isSwitching) return;

    setIsSwitching(true);

    try {
      // Replace the current locale in the pathname with the new locale
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      await router.push(newPath);
    } finally {
      // Reset loading state after a short delay to ensure smooth transition
      setTimeout(() => setIsSwitching(false), 500);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          disabled={isSwitching}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
            currentLocale === locale
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          }`}
        >
          {locale.toUpperCase()}
          {isSwitching && currentLocale !== locale && (
            <LoadingSpinner size="sm" className="text-current" />
          )}
        </button>
      ))}
    </div>
  );
}
