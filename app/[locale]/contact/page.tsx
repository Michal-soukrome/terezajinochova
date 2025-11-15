import { dictionaries } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== "cs" && locale !== "en") {
    notFound();
  }

  const dict = dictionaries[locale as "cs" | "en"];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">{dict.contact.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{dict.contact.description}</p>

      <form className="space-y-6">
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

export function generateStaticParams() {
  return [{ locale: "cs" }, { locale: "en" }];
}
