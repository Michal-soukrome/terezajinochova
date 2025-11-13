"use client";

import { useRouter } from "next/navigation";
import { Locale, locales } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();

  const switchLanguage = (newLocale: Locale) => {
    const newPath = newLocale === "cs" ? "/cs" : "/en";
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            currentLocale === locale
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
