"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { type Locale, locales } from "@/lib/i18n";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    startTransition(() => {
      // Simple: just replace locale prefix in pathname
      // Middleware handles rewriting to canonical routes
      const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
      router.push(newPath);
    });
  };

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((locale) => {
        const isActive = currentLocale === locale;

        return (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            disabled={isPending || isActive}
            aria-current={isActive ? "true" : undefined}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-md transition-colors
              ${
                isActive
                  ? "bg-black text-white cursor-default"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
              disabled:opacity-50 disabled:cursor-wait
            `}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
