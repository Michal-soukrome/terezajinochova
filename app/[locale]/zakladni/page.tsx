import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import BuyButton from "@/components/BuyButton";
import { getDictionary } from "@/lib/dictionaries";
import { notFound } from "next/navigation";

export default async function BasicDiaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (locale !== "cs" && locale !== "en") {
    notFound();
  }

  const dict = await getDictionary(locale);
  const product = PRODUCTS.basic;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <a href={`/${locale}`} className="hover:text-black">
              {dict.common.home}
            </a>
          </li>
          <li>/</li>
          <li>
            <a href={`/${locale}/zakladni`} className="hover:text-black">
              {dict.common.weddingDiary}
            </a>
          </li>
          <li>/</li>
          <li className="text-black font-medium">{dict.products.basic.name}</li>
        </ol>
      </nav>

      {/* Product Header */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-black">
            💍 {dict.home.title}
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            {dict.products.basic.description}
          </p>

          <div className="mb-8">
            <div className="text-5xl font-bold text-black mb-2">
              {dict.products.basic.price} {locale === "cs" ? "Kč" : "€"}
            </div>
            <p className="text-gray-600">
              {locale === "cs"
                ? "Jednorázová platba • Okamžité stažení"
                : "One-time payment • Instant download"}
            </p>
          </div>

          <div className="mb-8">
            <BuyButton priceId={product.priceId} />
          </div>

          {/* Key Features */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-black">Co dostanete:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-black mr-3">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* What You'll Find */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">
          📝 {dict.products.basic.whatYouFind}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-black">
              📋 Měsíční checklists
            </h3>
            <p className="text-gray-700 mb-6">
              Strukturované seznamy úkolů pro každý měsíc příprav. Nikdy
              nezapomenete na důležité termíny, rezervace nebo nákupy.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              💰 Budgetové tabulky
            </h3>
            <p className="text-gray-700 mb-6">
              Přehledné sledování výdajů podle kategorií s grafy a tipy na
              úspory. Mějte vždy přehled o svém rozpočtu.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-black">
              👥 Seznam hostů a RSVP
            </h3>
            <p className="text-gray-700 mb-6">
              Kompletní systém pro správu pozvánek, sledování odpovědí a
              speciálních požadavků hostů.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              ⏰ Harmonogram svatebního dne
            </h3>
            <p className="text-gray-700 mb-6">
              Detailní timeline celého dne s časovými rezervami a prostorem pro
              poznámky. Profesionální tipy pro hladký průběh.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              💡 Profesionální tipy a rady
            </h3>
            <p className="text-gray-700 mb-6">
              Rady od wedding plannerů pro řešení běžných situací a krizových
              scénářů během příprav i samotného dne.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-black">
              📝 Poznámky a nápady
            </h3>
            <p className="text-gray-700 mb-6">
              Prostor pro vaše osobní poznámky, nápady a inspiraci během celého
              procesu plánování svatby.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Všechno, co potřebujete pro dokonalou svatbu
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Měsíční plány</h3>
            <p className="text-gray-700 text-sm">
              Strukturované checklists pro každý měsíc příprav
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Budget tracker</h3>
            <p className="text-gray-700 text-sm">
              Přehledné sledování výdajů s grafy
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Seznam hostů</h3>
            <p className="text-gray-700 text-sm">
              RSVP sledování a kontaktní informace
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Harmonogram</h3>
            <p className="text-gray-700 text-sm">
              Detailní timeline svatebního dne
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">
              Profesionální tipy
            </h3>
            <p className="text-gray-700 text-sm">
              Rady pro řešení běžných situací
            </p>
          </div>

          <div className="text-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="font-semibold mb-3 text-black">Osobní poznámky</h3>
            <p className="text-gray-700 text-sm">
              Prostor pro vaše myšlenky a nápady
            </p>
          </div>
        </div>
      </div>

      {/* Sample Images */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Podívejte se na ukázky
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/thumbnail_IMG_5264.png"
              alt="Ukázka stránky deníku"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/thumbnail_IMG_5264.png"
              alt="Rozpočtové tabulky"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/thumbnail_IMG_5264.png"
              alt="Checklists a plány"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Why Have It */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-black text-center">
          🌟 {dict.benefits.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-black">
              😌 Bez stresu
            </h3>
            <p className="text-gray-700">
              Mějte všechno pod kontrolou. S naším deníkem nikdy nezapomenete na
              důležité termíny nebo úkoly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-black">
              💎 Elegantní design
            </h3>
            <p className="text-gray-700">
              Profesionálně navržený deník, který vypadá skvěle a je radost ho
              používat během plánování.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-black">
              💕 Celoživotní vzpomínka
            </h3>
            <p className="text-gray-700">
              Uchovejte si všechny vzpomínky z příprav vaší svatby v krásném a
              praktickém deníku.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-black">
              🎁 Dokonalý dárek
            </h3>
            <p className="text-gray-700">
              Ideální dárek pro nevěstu nebo ženicha, který jim pomůže
              zorganizovat jejich speciální den.
            </p>
          </div>
        </div>
      </div>

      {/* Parameters */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-black text-center">
          📋 {dict.parameters.title}
        </h2>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-2xl mx-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-black">Formát:</span>
              <span className="text-gray-700">A5 (148 × 210 mm)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-black">Počet stran:</span>
              <span className="text-gray-700">120 stran</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-black">Vazba:</span>
              <span className="text-gray-700">Kvalitní lepená vazba</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-black">Papír:</span>
              <span className="text-gray-700">100g matný papír</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-black">Jazyk:</span>
              <span className="text-gray-700">Čeština</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-black">Doprava:</span>
              <span className="text-gray-700">Zdarma po ČR</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-black">{dict.cta.ready}</h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          {dict.cta.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <BuyButton priceId={product.priceId} />
          <a
            href={`/${locale}/kontakt`}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-4 px-8 rounded-lg transition"
          >
            Mám dotazy
          </a>
        </div>
      </div>
    </div>
  );
}
