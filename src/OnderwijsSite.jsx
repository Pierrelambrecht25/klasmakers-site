import React, { useMemo, useState } from "react";

/**
 * KlasMakers – Voorbeeldsite (single file React component)
 * Pagina’s: Home, Over ons, Missie & Visie, Producten & Cursussen, Artikels, Contact
 * Styling met Tailwind (zorg dat Tailwind is ingesteld)
 * Mailto-adres: info@klasmakers.be (pas aan indien nodig)
 */

const CURRENCY = new Intl.NumberFormat("nl-BE", {
  style: "currency",
  currency: "EUR",
});

const PRODUCTS = [
  {
    id: "t1",
    name: "Template – Lesfiche Lagere School",
    price: 9.99,
    category: "Templates",
    image: "https://picsum.photos/seed/lesfiche/800/600",
  },
  {
    id: "t2",
    name: "Kijkwijzers – Speelplaats Spelletjes",
    price: 6.99,
    category: "Templates",
    image: "https://picsum.photos/seed/kijkwijzer/800/600",
  },
  {
    id: "c1",
    name: "Cursus – Digitale Didactiek (start)",
    price: 39.0,
    category: "Cursussen",
    image: "https://picsum.photos/seed/didactiek/800/600",
  },
  {
    id: "c2",
    name: "Cursus – Klasorganisatie & Tijdswinst",
    price: 49.0,
    category: "Cursussen",
    image: "https://picsum.photos/seed/organisatie/800/600",
  },
];

const POSTS = [
  {
    id: "a1",
    title: "5 snelle tijdsbespaarders voor je lesvoorbereiding",
    excerpt: "Kleine tweaks met grote impact: van checklist tot sjabloon.",
    image: "https://picsum.photos/seed/blog1/800/500",
  },
  {
    id: "a2",
    title: "Digitale tools die echt werken in de klas",
    excerpt: "Concrete tips die meteen inzetbaar zijn.",
    image: "https://picsum.photos/seed/blog2/800/500",
  },
  {
    id: "a3",
    title: "Bewegingsactiviteiten koppelen aan leerdoelen",
    excerpt: "Van opwarming tot slot: structuur die werkt.",
    image: "https://picsum.photos/seed/blog3/800/500",
  },
];

export default function OnderwijsSite() {
  const [tab, setTab] = useState("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alles");

  const categories = useMemo(
    () => ["Alles", ...new Set(PRODUCTS.map((p) => p.category))],
    []
  );

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (category === "Alles" || p.category === category) &&
          p.name.toLowerCase().includes(query.toLowerCase())
      ),
    [query, category]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-indigo-50 to-sky-50 text-gray-900">
      <Header tab={tab} onNav={setTab} />
      {tab === "home" && (
        <Home
          onPrimary={() => setTab("shop")}
          onSecondary={() => setTab("blog")}
        />
      )}
      {tab === "about" && <About />}
      {tab === "mission" && <Mission />}
      {tab === "shop" && (
        <Shop
          categories={categories}
          products={filtered}
          rawProducts={PRODUCTS}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
        />
      )}
      {tab === "blog" && <Blog posts={POSTS} />}
      {tab === "contact" && <Contact />}
      {tab === "privacy" && <Privacy />}
{tab === "terms" && <Terms />}
      <Footer onNav={setTab} />
    </div>
  );
}

function Header({ tab, onNav }) {
  const NavBtn = ({ id, label }) => (
    <button
      onClick={() => onNav(id)}
      className={`px-3 py-2 rounded-xl text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70 ${
        tab === id
          ? "bg-gray-900 text-white shadow-sm"
          : "hover:bg-white/70 border backdrop-blur"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gray-900 text-white grid place-items-center font-bold">
            KM
          </div>
          <div>
            <h1 className="text-xl font-semibold leading-none">KlasMakers</h1>
            <p className="text-xs text-gray-500">
              Samen bouwen aan beter onderwijs
            </p>
          </div>
        </div>
        <nav className="flex gap-2">
          <NavBtn id="home" label="Home" />
          <NavBtn id="about" label="Over ons" />
          <NavBtn id="mission" label="Missie & Visie" />
          <NavBtn id="shop" label="Producten & Cursussen" />
          <NavBtn id="blog" label="Artikels" />
          <NavBtn id="contact" label="Contact" />
        </nav>
      </div>
    </header>
  );
}

function Home({ onPrimary, onSecondary }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
          Praktische templates, cursussen en inspiratie voor leerkrachten.
        </h2>
        <p className="mt-4 text-gray-700">
          Wij zijn Pierre en Lore. Vanuit de klaspraktijk bouwen we tools die je
          vandaag al kunt gebruiken. Geen rompslomp, wel tijdswinst en rust.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onPrimary}
            className="px-5 py-3 rounded-xl bg-gray-900 text-white text-sm hover:bg-black active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70"
          >
            Ontdek onze producten
          </button>
          <button
            onClick={onSecondary}
            className="px-5 py-3 rounded-xl border text-sm hover:bg-white/70 backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70"
          >
            Lees onze artikels
          </button>
        </div>
        <ul className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
          <li className="bg-white/80 backdrop-blur border rounded-2xl p-4">
            ⚡ Snel inzetbaar
          </li>
          <li className="bg-white/80 backdrop-blur border rounded-2xl p-4">
            🧩 Doelgericht
          </li>
          <li className="bg-white/80 backdrop-blur border rounded-2xl p-4">
            🧠 Uit de klaspraktijk
          </li>
        </ul>
      </div>
      <div className="bg-white/80 border rounded-3xl p-2 shadow-sm backdrop-blur">
        <img
          src="https://picsum.photos/seed/onderwijs/1200/900"
          alt="Onderwijs"
          className="rounded-2xl object-cover w-full h-full"
        />
      </div>
    </main>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <div className="bg-white/80 backdrop-blur border rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">Over ons</h2>
        <p className="mt-4 text-gray-700">
          Wij zijn Pierre en Lore, twee leerkrachten met een hart voor
          onderwijs. We bundelen onze ervaring om collega’s te helpen met
          praktische, direct inzetbare materialen en cursussen.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <article className="bg-white/80 backdrop-blur border rounded-2xl p-6">
            <h3 className="font-semibold">Pierre</h3>
            <p className="text-sm text-gray-600 mt-2">
              [Korte bio – expertise, interesses, ervaring]
            </p>
          </article>
          <article className="bg-white/80 backdrop-blur border rounded-2xl p-6">
            <h3 className="font-semibold">Lore</h3>
            <p className="text-sm text-gray-600 mt-2">
              [Korte bio – expertise, interesses, ervaring]
            </p>
          </article>
        </div>
        <blockquote className="mt-8 bg-white/80 backdrop-blur border rounded-2xl p-6 text-gray-700">
          “Goed onderwijs maak je niet alleen, maar samen. Daarom delen we onze
          kennis en materialen.”
        </blockquote>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <div className="bg-white/80 backdrop-blur border rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">Onze missie & visie</h2>
        <p className="mt-4 text-gray-700">
          We ondersteunen leerkrachten met praktische tools en inspirerende
          cursussen die meteen inzetbaar zijn in de klas.
        </p>
        <ul className="mt-6 grid sm:grid-cols-2 gap-4">
          <li className="bg-white/80 backdrop-blur border rounded-2xl p-5">
            <b>Toegankelijk:</b> eenvoudig te gebruiken en betaalbaar.
          </li>
          <li className="bg-white/80 backdrop-blur border rounded-2xl p-5">
            <b>Praktisch:</b> direct inzetbaar in de klaspraktijk.
          </li>
          <li className="bg-white/80 backdrop-blur border rounded-2xl p-5">
            <b>Inspirerend:</b> materialen die energie geven.
          </li>
          <li className="bg-white/80 backdrop-blur border rounded-2xl p-5">
            <b>Duurzaam:</b> bruikbaar jaar na jaar.
          </li>
        </ul>
      </div>
    </section>
  );
}

function Shop({
  categories,
  products,
  rawProducts,
  query,
  setQuery,
  category,
  setCategory,
}) {
  const handleBuy = (id) => {
    const item = rawProducts.find((p) => p.id === id);
    if (!item) return;
    const subject = encodeURIComponent(
      `Bestelling via KlasMakers – ${item.name}`
    );
    const body = encodeURIComponent(
      `Hallo KlasMakers,\n\nIk wil graag dit item bestellen:\n- ${item.name} (${CURRENCY.format(
        item.price
      )})\n\nNaam: \nFactuurgegevens: \nOpmerkingen: `
    );
    window.open(
      `mailto:info@klasmakers.be?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="bg-white/80 backdrop-blur border rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Producten & Cursussen</h2>
            <p className="text-gray-600 mt-1">
              Kies een categorie of zoek op naam.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek..."
              className="rounded-xl border px-3 py-2 text-sm w-56 bg-white/80"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border px-3 py-2 text-sm bg-white/80"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <article
              key={p.id}
              className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border overflow-hidden"
            >
              <div className="aspect-video bg-gray-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-medium leading-tight min-h-[3rem]">
                  {p.name}
                </h3>
                <div className="mt-1 text-xs text-gray-500">{p.category}</div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-base font-semibold">
                    {CURRENCY.format(p.price)}
                  </span>
                  <button
                    onClick={() => handleBuy(p.id)}
                    className="px-3 py-2 rounded-xl bg-gray-900 text-white text-sm hover:bg-black active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70"
                  >
                    Bestel
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Tip: wil je directe betalingen? Koppel Stripe Payment Links of bouw
          een eenvoudige Checkout.
        </p>
      </div>
    </section>
  );
}

function Blog({ posts }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="bg-white/80 backdrop-blur border rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Inspiratie & artikels</h2>
        <p className="text-gray-600 mt-1">
          Korte tips en ideeën die je meteen kunt inzetten.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white/80 backdrop-blur border rounded-2xl overflow-hidden"
            >
              <div className="aspect-video bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-medium leading-tight">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{post.excerpt}</p>
                <button className="mt-4 text-sm underline">Lees meer</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const submit = () => {
    const subject = encodeURIComponent("Contact – KlasMakers");
    const body = encodeURIComponent(
      `Naam: ${form.name}\nE-mail: ${form.email}\n\nBericht:\n${form.msg}`
    );
    window.open(
      `mailto:info@klasmakers.be?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <section className="mx-auto max-w-md px-4 py-14">
      <div className="bg-white/80 backdrop-blur border rounded-3xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-gray-600 mt-1">
          Heb je een vraag of idee? Stuur ons gerust een bericht.
        </p>
        <div className="mt-6 space-y-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Naam"
            className="w-full rounded-xl border px-3 py-2 text-sm bg-white/80"
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="E-mail"
            className="w-full rounded-xl border px-3 py-2 text-sm bg-white/80"
          />
          <textarea
            value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
            placeholder="Bericht"
            rows={6}
            className="w-full rounded-xl border px-3 py-2 text-sm bg-white/80"
          />
          <button
            onClick={submit}
            className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm hover:bg-black active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70"
          >
            Versturen
          </button>
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <div className="bg-white/80 backdrop-blur border rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">Privacybeleid</h2>
        <p className="mt-4 text-gray-700">
          Dit privacybeleid beschrijft hoe KlasMakers (Pierre & Lore) persoonsgegevens verwerkt.
        </p>

        <h3 className="mt-8 font-semibold">Welke gegevens verzamelen we?</h3>
        <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
          <li>Contactgegevens die je zelf invult (naam, e-mail, bericht).</li>
          <li>Aankoopgegevens wanneer je een product bestelt.</li>
          <li>Bezoekgegevens (anoniem) voor statistiek via analytics.</li>
        </ul>

        <h3 className="mt-6 font-semibold">Waarom verwerken we die gegevens?</h3>
        <p className="text-gray-700 mt-2">
          Om je bestelling/aanvraag te behandelen, support te bieden en onze site te verbeteren.
        </p>

        <h3 className="mt-6 font-semibold">Bewaartermijn</h3>
        <p className="text-gray-700 mt-2">
          We bewaren gegevens niet langer dan nodig voor de doelen hierboven of wettelijk vereist.
        </p>

        <h3 className="mt-6 font-semibold">Jouw rechten</h3>
        <p className="text-gray-700 mt-2">
          Je hebt recht op inzage, correctie, beperking, bezwaar en verwijdering. Mail ons via{" "}
          <a className="underline" href="mailto:info@klasmakers.be">info@klasmakers.be</a>.
        </p>

        <h3 className="mt-6 font-semibold">Verantwoordelijke</h3>
        <p className="text-gray-700 mt-2">
          KlasMakers – Pierre & Lore, België. Contact:{" "}
          <a className="underline" href="mailto:info@klasmakers.be">info@klasmakers.be</a>.
        </p>

        <p className="text-xs text-gray-500 mt-8">
          Versie: {new Date().toLocaleDateString("nl-BE")} – Sjabloon; vul aan met jullie details.
        </p>
      </div>
    </section>
  );
}

function Terms() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <div className="bg-white/80 backdrop-blur border rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-semibold">Algemene voorwaarden</h2>

        <h3 className="mt-4 font-semibold">1. Identiteit</h3>
        <p className="text-gray-700 mt-2">
          KlasMakers (Pierre & Lore), België. E-mail:{" "}
          <a className="underline" href="mailto:info@klasmakers.be">info@klasmakers.be</a>.
        </p>

        <h3 className="mt-4 font-semibold">2. Producten</h3>
        <p className="text-gray-700 mt-2">
          Digitale producten (templates, cursussen) en eventuele fysieke materialen.
        </p>

        <h3 className="mt-4 font-semibold">3. Bestellen & betalen</h3>
        <p className="text-gray-700 mt-2">
          Na bestelling ontvang je bevestiging en eventueel een factuur.
          Digitale producten leveren we via download of e-mail.
        </p>

        <h3 className="mt-4 font-semibold">4. Herroepingsrecht</h3>
        <p className="text-gray-700 mt-2">
          Voor digitale downloads vervalt het herroepingsrecht zodra de download/link is geleverd.
        </p>

        <h3 className="mt-4 font-semibold">5. Licentie & gebruik</h3>
        <p className="text-gray-700 mt-2">
          Materiaal is voor eigen (school/klas)gebruik en mag niet worden doorverkocht of openbaar gedeeld.
        </p>

        <h3 className="mt-4 font-semibold">6. Aansprakelijkheid</h3>
        <p className="text-gray-700 mt-2">
          We streven naar kwaliteit; KlasMakers is niet aansprakelijk voor indirecte schade of verkeerd gebruik.
        </p>

        <h3 className="mt-4 font-semibold">7. Intellectuele eigendom</h3>
        <p className="text-gray-700 mt-2">
          Alle materialen blijven eigendom van KlasMakers, tenzij anders vermeld.
        </p>

        <h3 className="mt-4 font-semibold">8. Contact & klachten</h3>
        <p className="text-gray-700 mt-2">
          Vragen of klachten? Mail ons via{" "}
          <a className="underline" href="mailto:info@klasmakers.be">info@klasmakers.be</a>.
        </p>

        <p className="text-xs text-gray-500 mt-8">
          Versie: {new Date().toLocaleDateString("nl-BE")} – Sjabloon; vul jullie gegevens aan (btw/ondernemingsnr., adres).
        </p>
      </div>
    </section>
  );
}

function Footer({ onNav }) {
  return (
    <footer className="border-t bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-6 text-sm text-gray-700">
        <div>
          <div className="font-medium text-gray-900">KlasMakers</div>
          <p className="mt-2">Templates, cursussen en inspiratie voor leerkrachten.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ul className="space-y-2">
            <li><button onClick={() => onNav("terms")} className="hover:underline">Algemene voorwaarden</button></li>
            <li><button onClick={() => onNav("privacy")} className="hover:underline">Privacybeleid</button></li>
            <li><a href="#" className="hover:underline" onClick={(e)=>e.preventDefault()}>Verzending & retour</a></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline" onClick={(e)=>e.preventDefault()}>Instagram</a></li>
            <li><a href="#" className="hover:underline" onClick={(e)=>e.preventDefault()}>Facebook</a></li>
            <li><a href="#" className="hover:underline" onClick={(e)=>e.preventDefault()}>LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="text-xs text-gray-500 text-center pb-8">
        © {new Date().getFullYear()} KlasMakers – Alle rechten voorbehouden.
      </div>
    </footer>
  );
}

