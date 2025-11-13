"use client";

import { useState, useEffect } from "react";
import { getDictionary } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default function ContactPage({ params }: ContactPageProps) {
  const [locale, setLocale] = useState<string>("");
  const [dict, setDict] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  // Load dictionary on client side
  useEffect(() => {
    params.then(async ({ locale: loc }) => {
      setLocale(loc);
      if (loc !== "cs" && loc !== "en") {
        notFound();
      }
      const dictionary = await getDictionary(loc as "cs" | "en");
      setDict(dictionary);
    });
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For MVP: Just show success message
    // In production, connect to Formspree, Netlify Forms, or your email service
    setSubmitted(true);
  };

  if (!dict) {
    return <div>Loading...</div>;
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">{dict.success.title}</h1>
        <p className="text-lg text-gray-600">{dict.contact.description}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{dict.contact.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{dict.contact.description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {dict.contact.form.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {dict.contact.form.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {dict.contact.form.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {dict.contact.form.send}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
        <p>
          {locale === "cs"
            ? "Nebo mi napište přímo na:"
            : "Or write to me directly at:"}
        </p>
        <a
          href="mailto:info@svatebnidenik.cz"
          className="text-black hover:underline text-lg font-medium"
        >
          info@svatebnidenik.cz
        </a>
      </div>
    </div>
  );
}
