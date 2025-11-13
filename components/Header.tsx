"use client";

import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type Locale = "cs" | "en";

interface HeaderProps {
  locale: Locale;
  dict: {
    common: {
      home: string;
      weddingDiary: string;
      contact: string;
    };
  };
}

export default function Header({ locale, dict }: HeaderProps) {
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
              <a
                href={`/${locale}`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {dict.common.home}
              </a>
              <a
                href={`/${locale}/zakladni`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {dict.common.weddingDiary}
              </a>
              <a
                href={`/${locale}/kontakt`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {dict.common.contact}
              </a>
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
            <a
              href={`/${locale}`}
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={closeMenu}
            >
              {dict.common.home}
            </a>
            <a
              href={`/${locale}/zakladni`}
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={closeMenu}
            >
              {dict.common.weddingDiary}
            </a>
            <a
              href={`/${locale}/kontakt`}
              className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={closeMenu}
            >
              {dict.common.contact}
            </a>{" "}
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
