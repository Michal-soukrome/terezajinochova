"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { type Locale } from "@/i18n";

interface HeaderProps {
  locale: Locale;
}

// Client-side translations (for header navigation)
const translations = {
  cs: {
    home: "Domů",
    basic: "Základní",
    premium: "Prémiový",
    contact: "Kontakt",
  },
  en: {
    home: "Home",
    basic: "Basic",
    premium: "Premium",
    contact: "Contact",
  },
};

export default function Header({ locale }: HeaderProps) {
  const t = translations[locale];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold font-playfair text-gray-900">
            {locale === "cs" ? "Svatební Deník" : "Wedding Diary"}
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-8">
              <Link
                href={`/${locale}`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t.home}
              </Link>
              <Link
                href={`/${locale}/zakladni`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t.basic}
              </Link>
              <Link
                href={`/${locale}/premium`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t.premium}
              </Link>
              <Link
                href={`/${locale}/kontakt`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t.contact}
              </Link>
            </nav>
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <div className="px-4 py-6 space-y-4">
            <Link
              href={`/${locale}`}
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={closeMenu}
            >
              {t.home}
            </Link>
            <Link
              href={`/${locale}/zakladni`}
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={closeMenu}
            >
              {t.basic}
            </Link>
            <Link
              href={`/${locale}/premium`}
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={closeMenu}
            >
              {t.premium}
            </Link>
            <Link
              href={`/${locale}/kontakt`}
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={closeMenu}
            >
              {t.contact}
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
