"use client";

import { useRouter, usePathname } from "next/navigation";

type Locale = "cs" | "en";
const locales = ["cs", "en"] as const;

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: Locale) => {
    // Replace the current locale in the pathname with the new locale
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.replace(newPath);
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
