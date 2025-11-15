// components/HtmlTag.tsx
"use client";

import { usePathname } from "next/navigation";
import { locales } from "@/lib/i18n";

export default function HtmlTag({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] as (typeof locales)[number];

  // Default to 'cs' if locale not found
  const lang = locales.includes(locale) ? locale : "cs";

  return <html lang={lang}>{children}</html>;
}
