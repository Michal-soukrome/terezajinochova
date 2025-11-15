import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Diary Photo */}
      <section className="relative min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
              Svatební Deník
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Váš osobní průvodce dokonalou svatbou. Profesionální nástroje a
              tipy pro nezapomenutelný svatební den bez stresu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <Link
                href="/denik"
                className="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition shadow-lg hover:shadow-xl"
              >
                Prohlédnout Deník
              </Link>
              <Link
                href="/kontakt"
                className="border-2 border-black text-black hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg transition"
              >
                Kontaktovat
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-black">✓</span>
                Okamžité doručení PDF
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black">✓</span>
                Fyzická kopie do 2-3 dnů
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black">✓</span>
                Záruka spokojenosti
              </div>
            </div>
          </div>

          {/* Diary Image */}
          <div className="relative">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/denik-hero.jpg"
                alt="Svatební Deník"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating price badge */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-gray-200 rounded-full shadow-lg px-6 py-3">
              <div className="text-center">
                <div className="text-sm text-gray-700">od</div>
                <div className="text-2xl font-bold text-black">990 Kč</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Co v deníku najdete</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-semibold mb-2 text-black">
                Plánovací šablony
              </h3>
              <p className="text-gray-700 text-sm">
                Kompletní checklisty pro každý měsíc příprav
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold mb-2 text-black">Budget tracker</h3>
              <p className="text-gray-700 text-sm">
                Přehledné sledování výdajů s grafy
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold mb-2 text-black">Seznam hostů</h3>
              <p className="text-gray-700 text-sm">
                RSVP sledování a kontaktní informace
              </p>
            </div>
          </div>

          <Link
            href="/denik"
            className="inline-block bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg transition shadow-lg"
          >
            Zobrazit všechny funkce
          </Link>
        </div>
      </section>

      {/* About Tereza Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">O mně</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-lg text-gray-700 mb-6">
                Svatby plánovám už několik let a vím, jak náročné může být mít
                všechno pod kontrolou. Proto jsem vytvořila tento deník - abych
                vám pomohla užít si cestu k vašemu velkému dni.
              </p>
              <Link
                href="/ja"
                className="inline-block bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Přečíst více
              </Link>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="/images/tereza-portrait.jpg"
                alt="tereza jinochová"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Připraveni naplánovat svou svatbu?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Získejte profesionální nástroje pro nezapomenutelný svatební den.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/objednavka"
              className="bg-white text-black hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition shadow-lg"
            >
              Prohlédnout produkty
            </Link>
            <Link
              href="/kontakt"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-lg transition"
            >
              Kontaktovat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
