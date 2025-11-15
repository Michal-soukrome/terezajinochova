import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { getLocalizedPath } from "@/lib/routes";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale as "cs" | "en");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-6">{dict.aboutMe.title}</h1>
          <div className="prose prose-lg text-gray-700 space-y-4">
            <p>{dict.aboutMe.subtitle}</p>
            <p>{dict.aboutMe.description1}</p>
            <p>{dict.aboutMe.description2}</p>
          </div>
        </div>
        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/images/tereza-portrait.jpg"
            alt={dict.aboutMe.imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          {dict.aboutMe.professionalHelp}
        </h2>
        <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
          {dict.aboutMe.professionalHelpDesc}
        </p>
        <div className="text-center">
          <Link
            href={getLocalizedPath("contact", locale as "cs" | "en")}
            className="inline-block bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition shadow-lg"
          >
            {dict.aboutMe.bookConsultation}
          </Link>
        </div>
      </div>
    </div>
  );
}
