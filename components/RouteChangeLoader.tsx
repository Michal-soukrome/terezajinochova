"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "./Loading";

/**
 * Route change loader that shows only during actual navigation transitions.
 * Uses React's useTransition to detect when navigation is pending.
 * Always present in DOM to prevent layout shifts.
 */
export default function RouteChangeLoader() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const anchor = target?.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip external links, anchors, mailto, tel
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        (href.startsWith("http") && !href.startsWith(window.location.origin))
      ) {
        return;
      }

      // For internal links, wrap navigation in transition
      e.preventDefault();
      startTransition(() => {
        router.push(href);
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200 ${
        isPending
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
    >
      <LoadingSpinner size="lg" />
    </div>
  );
}
