"use client";
import Link from "next/link";
import { useState } from "react";

const PLANS = [
  {
    key: "single",
    name: "Gara Singola",
    price: "€29",
    period: "/evento",
    desc: "Ideale per provare Repliq su una singola gara o evento.",
    color: "#64748b",
    badge: null,
    highlight: false,
    features: [
      { label: "Chatbot AI su FAQ e regolamento", ok: true },
      { label: "Carica PDF documenti", ok: true },
      { label: "Pagina pubblica + QR code", ok: true },
      { label: "Mappe e parcheggi", ok: true },
      { label: "Widget embed", ok: true },
      { label: "Statistiche base", ok: true },
      { label: "Gare illimitate", ok: false },
      { label: "Upload traccia GPX", ok: false },
      { label: "Ristori strutturati", ok: false },
      { label: "Ticketing integrato", ok: false },
      { label: "Email automatiche", ok: false },
      { label: "Analytics avanzate + export CSV", ok: false },
    ],
  },
  {
    key: "base",
    name: "Stagione Base",
    price: "€79",
    period: "/anno",
    desc: "Gare illimitate per tutta la stagione. Il piano più scelto dagli organizzatori.",
    color: "#0891b2",
    badge: "Più scelto",
    highlight: false,
    features: [
      { label: "Chatbot AI su FAQ e regolamento", ok: true },
      { label: "Carica PDF documenti", ok: true },
      { label: "Pagina pubblica + QR code", ok: true },
      { label: "Mappe e parcheggi", ok: true },
      { label: "Widget embed", ok: true },
      { label: "Statistiche base", ok: true },
      { label: "Gare illimitate", ok: true },
      { label: "Upload traccia GPX", ok: true },
      { label: "Ristori strutturati", ok: true },
      { label: "Ticketing integrato", ok: false },
      { label: "Email automatiche", ok: false },
      { label: "Analytics avanzate + export CSV", ok: false },
    ],
  },
  {
    key: "pro",
    name: "Stagione Pro",
    price: "€149",
    period: "/anno",
    desc: "Ticketing, email automatiche, analytics avanzate. Tutto incluso.",
    color: "#7c3aed",
    badge: "⚡ Pro",
    highlight: true,
    features: [
      { label: "Chatbot AI su FAQ e regolamento", ok: true },
      { label: "Carica PDF documenti", ok: true },
      { label: "Pagina pubblica + QR code", ok: true },
      { label: "Mappe e parcheggi", ok: true },
      { label: "Widget embed", ok: true },
      { label: "Statistiche base", ok: true },
      { label: "Gare illimitate", ok: true },
      { label: "Upload traccia GPX", ok: true },
      { label: "Ristori strutturati", ok: true },
      { label: "Ticketing integrato", ok: true },
      { label: "Email automatiche", ok: true },
      { label: "Analytics avanzate + export CSV", ok: true },
      { label: "Notifiche real-time", ok: true },
      { label: "Multilingua automatico", ok: true },
      { label: "Previsioni meteo gara", ok: true },
      { label: "Generatore FAQ/comunicati AI", ok: true },
    ],
  },
  {
    key: "federation",
    name: "Federazione",
    price: "€299",
    period: "/anno",
    desc: "Multi-organizzazione, white label, API access e account manager dedicato.",
    color: "#b45309",
    badge: "Enterprise",
    highlight: false,
    features: [
      { label: "Tutto di Stagione Pro", ok: true },
      { label: "Multi-organizzazione", ok: true },
      { label: "White label (logo + colori custom)", ok: true },
      { label: "API access", ok: true },
      { label: "Account manager dedicato", ok: true },
      { label: "SLA garantito", ok: true },
      { label: "Onboarding personalizzato", ok: true },
    ],
  },
];

const FAQS = [
  {
    q: "Posso cambiare piano in qualsiasi momento?",
    a: "Sì. Puoi fare upgrade o downgrade quando vuoi. Il credito residuo viene proporzionalmente applicato al nuovo piano.",
  },
  {
    q: "Cosa succede a fine anno con il piano annuale?",
    a: "Ricevi un'email di promemoria 30 giorni prima. Il rinnovo non è automatico senza tuo consenso.",
  },
  {
    q: "La Gara Singola include tutte le gare di un evento multi-distanza?",
    a: "Il piano Gara Singola include un solo chatbot. Per eventi con più distanze (es. 10km + 25km + 50km) ti consigliamo Stagione Base o Pro.",
  },
  {
    q: "C'è un periodo di prova gratuito?",
    a: "Sì, puoi testare Repliq gratuitamente per 14 giorni con tutte le funzionalità Pro. Nessuna carta di credito richiesta.",
  },
  {
    q: "I dati dei miei partecipanti sono al sicuro?",
    a: "Sì. I dati sono conservati su server europei (GDPR compliant) e non vengono mai condivisi con terze parti.",
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-[family-name:var(--font-geist-sans)]">

      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-gray-900">
          <span className="text-xl font-black text-blue-600 tracking-tight">Repliq</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
          <a href="http://app.repliq.it/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Accedi</a>
          <a href="http://app.repliq.it/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Inizia gratis
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center pt-16 pb-12 px-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          💳 Piani e prezzi
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Semplice. Trasparente.<br />
          <span className="text-blue-600">Senza sorprese.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Scegli il piano più adatto alla tua stagione sportiva. Parti gratis, scala quando vuoi.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-full">
          ✅ 14 giorni di prova gratuita — nessuna carta richiesta
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl border-2 p-6 flex flex-col ${
                plan.highlight
                  ? "border-violet-500 shadow-xl shadow-violet-100 scale-[1.02]"
                  : "border-gray-200"
              }`}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                  style={{ background: plan.color }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="mb-4">
                <h2 className="text-base font-bold text-gray-900">{plan.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-gray-400 text-sm ml-1">{plan.period}</span>
              </div>

              <a
                href="http://app.repliq.it/register"
                className="block text-center text-sm font-bold py-2.5 rounded-xl mb-6 transition-colors"
                style={
                  plan.highlight
                    ? { background: plan.color, color: "white" }
                    : { background: "#f1f5f9", color: "#334155" }
                }
              >
                Inizia ora →
              </a>

              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className={f.ok ? "text-green-500 mt-0.5 flex-shrink-0" : "text-gray-300 mt-0.5 flex-shrink-0"}>
                      {f.ok ? "✓" : "✗"}
                    </span>
                    <span className={f.ok ? "text-gray-700" : "text-gray-400"}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Feature table — desktop */}
        <div className="mt-20 hidden lg:block">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Confronto completo funzionalità</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-semibold text-gray-500 w-1/3">Funzionalità</th>
                  {PLANS.map(p => (
                    <th key={p.key} className="px-4 py-4 text-center font-bold" style={{ color: p.color }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Chatbot AI FAQ", vals: [true, true, true, true] },
                  { label: "Carica PDF documenti", vals: [true, true, true, true] },
                  { label: "Pagina hosted + QR code", vals: [true, true, true, true] },
                  { label: "Mappe e parcheggi", vals: [true, true, true, true] },
                  { label: "Widget embed", vals: [true, true, true, true] },
                  { label: "Statistiche base", vals: [true, true, true, true] },
                  { label: "Gare illimitate", vals: [false, true, true, true] },
                  { label: "Upload GPX percorso", vals: [false, true, true, true] },
                  { label: "Ristori strutturati", vals: [false, true, true, true] },
                  { label: "Personalizzazione colori", vals: [false, true, true, true] },
                  { label: "Ticketing integrato", vals: [false, false, true, true] },
                  { label: "Email automatiche", vals: [false, false, true, true] },
                  { label: "Notifiche real-time", vals: [false, false, true, true] },
                  { label: "Previsioni meteo gara", vals: [false, false, true, true] },
                  { label: "Analytics avanzate + report", vals: [false, false, true, true] },
                  { label: "Export CSV dati", vals: [false, false, true, true] },
                  { label: "Multilingua automatico", vals: [false, false, true, true] },
                  { label: "Generatore FAQ/comunicati AI", vals: [false, false, true, true] },
                  { label: "Multi-organizzazione", vals: [false, false, false, true] },
                  { label: "White label", vals: [false, false, false, true] },
                  { label: "API access", vals: [false, false, false, true] },
                  { label: "Account manager dedicato", vals: [false, false, false, true] },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="px-6 py-3 text-gray-700 font-medium">{row.label}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} className="px-4 py-3 text-center">
                        {v
                          ? <span className="text-green-500 font-bold">✓</span>
                          : <span className="text-gray-300">—</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Domande frequenti</h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                  <span className="text-gray-400 flex-shrink-0 text-lg">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA bottom */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12">
          <h2 className="text-2xl font-extrabold text-white mb-3">Pronto a iniziare?</h2>
          <p className="text-blue-100 mb-6">14 giorni gratis, nessuna carta di credito richiesta.</p>
          <a
            href="http://app.repliq.it/register"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Inizia la prova gratuita →
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        © 2025 Repliq · <Link href="/" className="hover:text-gray-600">Home</Link> ·{" "}
        <a href="http://app.repliq.it/register" className="hover:text-gray-600">info@racebot.ai</a>
      </footer>
    </div>
  );
}
