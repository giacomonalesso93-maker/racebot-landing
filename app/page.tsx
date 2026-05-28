"use client";
import { useState } from "react";

const CHAT_MESSAGES = [
  { from: "user", text: "A che ora parte la gara?" },
  { from: "bot", text: "La gara parte alle 9:00 da Piazza Centrale. Ricorda di ritirare il pettorale entro le 8:30! 🏁" },
  { from: "user", text: "Dove posso parcheggiare?" },
  { from: "bot", text: "Sono disponibili 3 aree parcheggio: P1 in Via Roma (gratuito), P2 allo stadio (€2/h), P3 al centro sportivo. 🅿️" },
  { from: "user", text: "Come faccio il rimborso iscrizione?" },
  { from: "bot", text: "Ho inoltrato la tua domanda alla segreteria — riceverai una risposta via email entro 24h. 📧" },
];

const STEPS = [
  { icon: "📄", title: "Carica il regolamento", desc: "Carica il PDF della tua gara. Repliq lo legge e lo memorizza automaticamente." },
  { icon: "🤖", title: "Il chatbot impara", desc: "L'intelligenza artificiale analizza ogni dettaglio: orari, percorso, logistica, regole." },
  { icon: "🔗", title: "Condividi il link", desc: "Ottieni un link diretto o un codice embed da aggiungere al tuo sito in 30 secondi." },
  { icon: "💬", title: "I partecipanti chiedono", desc: "Il chatbot risponde H24 in italiano. Le domande senza risposta diventano ticket per te." },
];

const FEATURES_BASE = [
  "Chatbot AI sul regolamento PDF",
  "Link diretto alla chat",
  "Risposta in italiano H24",
  "Pannello organizzatore",
  "Mappa posizioni GPS",
  "Statistiche domande",
];

const FEATURES_PRO = [
  ...FEATURES_BASE,
  "Ticketing automatico",
  "Email notifiche organizzatore",
  "Email risposta al partecipante",
  "Widget embed per il tuo sito",
  "Branding personalizzato",
  "Supporto prioritario",
];

const PLANS = [
  { name: "Gara Singola", price: "€19", period: "/evento", desc: "Perfetto per provare Repliq su una singola gara.", color: "border-gray-200", badge: "" },
  { name: "Stagione Base", price: "€79", period: "/anno", desc: "Gare illimitate per tutta la stagione sportiva.", color: "border-blue-500", badge: "Più scelto" },
  { name: "Stagione Pro", price: "€149", period: "/anno", desc: "Include ticketing e widget embed personalizzato.", color: "border-blue-700", badge: "Pro" },
  { name: "Federazione", price: "€299", period: "/anno", desc: "Multi-organizzazione, white label e supporto dedicato.", color: "border-gray-800", badge: "Enterprise" },
];

const FAQS = [
  { q: "Funziona anche per sport diversi dalla corsa?", a: "Sì — Repliq funziona per qualsiasi evento sportivo: ciclismo, triathlon, nuoto, sci, equitazione e molto altro. Se hai un regolamento in PDF, Repliq lo legge." },
  { q: "Devo installare qualcosa?", a: "No. Repliq è completamente online. Accedi dal browser, carichi il PDF e in pochi minuti il chatbot è attivo." },
  { q: "Cosa succede se il chatbot non sa rispondere?", a: "Con il piano Pro, le domande senza risposta diventano automaticamente ticket. Ricevi una notifica email e puoi rispondere dal pannello. La risposta arriva al partecipante via email." },
  { q: "I dati dei miei partecipanti sono al sicuro?", a: "Sì. I dati sono conservati su server europei e non vengono condivisi con terze parti. Puoi richiedere la cancellazione in qualsiasi momento." },
  { q: "Posso personalizzare il chatbot con il logo della mia gara?", a: "Con il piano Pro e Federazione puoi personalizzare colori, logo e nome del chatbot." },
  { q: "Posso disdire quando voglio?", a: "Sì, non ci sono vincoli. Puoi disdire il piano annuale entro 30 giorni dal rinnovo." },
];

export default function LandingPage() {
  const [activePlan, setActivePlan] = useState<"base" | "pro">("pro");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleMessages, setVisibleMessages] = useState(2);

  return (
    <main className="bg-white text-gray-900 font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-blue-600">⚡ Repliq</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#come-funziona" className="hover:text-blue-600 transition">Come funziona</a>
            <a href="#funzionalita" className="hover:text-blue-600 transition">Funzionalità</a>
            <a href="/pricing" className="hover:text-blue-600 transition font-semibold">Prezzi</a>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
          </div>
          <a href="http://app.repliq.it/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
            Inizia gratis
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6">
              ⚡ Il primo assistente AI per eventi sportivi in Italia
            </div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Il tuo assistente personale<br />
              <span className="text-blue-600">che risponde al posto tuo</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Repliq gestisce tutte le domande dei partecipanti H24 — dal regolamento alle info logistiche, fino alle richieste complesse con ticketing automatico. Tu organizzi la gara, lui pensa al resto.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="http://app.repliq.it/register" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                Prova gratis →
              </a>
              <a href="#come-funziona" className="border border-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold text-lg hover:border-blue-300 transition">
                Come funziona
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-4">Nessuna carta di credito. Attivo in 5 minuti.</p>
          </div>

          {/* Chat demo */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow-xl border border-gray-100">
            <div className="bg-blue-600 rounded-xl p-4 mb-4">
              <p className="text-white font-bold text-sm">🏃 Trail del Bosco Sacro</p>
              <p className="text-blue-200 text-xs">Assistente virtuale della gara</p>
            </div>
            <div className="flex flex-col gap-3 mb-4 min-h-[200px]">
              {CHAT_MESSAGES.slice(0, visibleMessages).map((msg, i) => (
                <div key={i} className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${msg.from === "user" ? "bg-blue-600 text-white self-end rounded-br-sm" : "bg-white text-gray-800 self-start rounded-bl-sm shadow-sm"}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            {visibleMessages < CHAT_MESSAGES.length && (
              <button
                onClick={() => setVisibleMessages(v => Math.min(v + 2, CHAT_MESSAGES.length))}
                className="w-full text-xs text-blue-500 hover:text-blue-700 transition"
              >
                Continua la demo →
              </button>
            )}
          </div>
        </div>
      </section>

      {/* NUMERI */}
      <section className="bg-blue-600 py-16 px-6 text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { number: "8+ ore", label: "perse per evento a rispondere messaggi" },
            { number: "80%", label: "delle domande sono sempre le stesse 10" },
            { number: "200+", label: "messaggi WhatsApp prima di ogni gara" },
            { number: "0 minuti", label: "di risposta con Repliq attivo" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-extrabold mb-2">{stat.number}</div>
              <div className="text-blue-200 text-sm leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-6">Ogni organizzatore conosce questo problema</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-10">
            Hai passato mesi a organizzare la gara. Il regolamento è online. Eppure i messaggi continuano ad arrivare — sempre le stesse domande, a qualsiasi ora, anche la sera prima della partenza.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📱", title: "200+ messaggi WhatsApp", desc: "Prima di ogni gara, il telefono non smette di squillare con le stesse domande." },
              { icon: "🔁", title: "Sempre le stesse 10 domande", desc: "Orari, parcheggi, ritiro pettorali, rimborsi. Ogni volta, da capo." },
              { icon: "😴", title: "Di notte, nei weekend", desc: "I partecipanti chiedono quando tu non puoi rispondere. Repliq sì." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section id="come-funziona" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Come funziona</h2>
          <p className="text-gray-500 mb-16">Attivo in 5 minuti, senza competenze tecniche.</p>
          <div className="grid md:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl mb-4">{step.icon}</div>
                <div className="text-xs font-bold text-blue-500 mb-1">Step {i + 1}</div>
                <h3 className="font-bold mb-2 text-sm">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COSA GESTISCE */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Un assistente completo, non solo un chatbot</h2>
          <p className="text-gray-500 text-lg mb-14">Repliq non si limita a rispondere dal regolamento. Gestisce l&apos;intera comunicazione con i partecipanti.</p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: "📄",
                title: "Risponde dal regolamento",
                desc: "Carica il PDF e Repliq risponde a tutte le domande basandosi sui contenuti ufficiali della gara.",
                tag: "Base"
              },
              {
                icon: "✍️",
                title: "Risponde con le tue parole",
                desc: "Aggiungi direttamente le tue risposte personalizzate. Repliq le usa per rispondere esattamente come faresti tu.",
                tag: "Base"
              },
              {
                icon: "🎟️",
                title: "Apre ticket automaticamente",
                desc: "Quando non sa rispondere, crea un ticket, ti notifica via email e invia la risposta al partecipante quando sei pronto.",
                tag: "Pro"
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold">{item.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.tag === "Pro" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>{item.tag}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKETING */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">Solo su Repliq Pro</div>
            <h2 className="text-3xl font-extrabold mb-4">Nessuna domanda rimane senza risposta</h2>
            <p className="text-gray-500 leading-relaxed mb-6">Quando il chatbot non trova la risposta nel regolamento, non lascia il partecipante nel vuoto. Crea automaticamente un ticket, ti avvisa via email e ti permette di rispondere dal pannello. La risposta arriva direttamente al partecipante.</p>
            <div className="flex flex-col gap-3">
              {[
                "Domanda senza risposta → ticket automatico",
                "Email immediata all'organizzatore",
                "Risposta dal pannello in un click",
                "Email automatica al partecipante",
                "Storico completo di tutte le richieste",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span className="text-sm font-semibold text-gray-600">Pannello Ticket</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { q: "Come faccio il rimborso?", status: "risolto", color: "text-green-600 bg-green-50" },
                { q: "Posso cambiare categoria?", status: "in risposta", color: "text-yellow-600 bg-yellow-50" },
                { q: "C'è assistenza medica al km 15?", status: "aperto", color: "text-red-600 bg-red-50" },
              ].map((t, i) => (
                <div key={i} className="bg-white rounded-lg p-3 flex items-center justify-between border border-gray-100">
                  <span className="text-sm text-gray-700">{t.q}</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.color}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FUNZIONALITÀ */}
      <section id="funzionalita" className="bg-gray-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Funzionalità</h2>
          <p className="text-gray-500 mb-10">Tutto quello che ti serve, niente di superfluo.</p>
          <div className="flex justify-center gap-2 mb-12">
            <button onClick={() => setActivePlan("base")} className={`px-6 py-2 rounded-full text-sm font-semibold transition ${activePlan === "base" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>Piano Base</button>
            <button onClick={() => setActivePlan("pro")} className={`px-6 py-2 rounded-full text-sm font-semibold transition ${activePlan === "pro" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>Piano Pro</button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {(activePlan === "base" ? FEATURES_BASE : FEATURES_PRO).map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100 text-sm text-left">
                <span className="text-green-500 font-bold">✓</span> {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPORT SUPPORTATI */}
      <section className="py-16 px-6 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400 mb-6 font-semibold uppercase tracking-widest">Funziona per tutti gli sport</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["🏃 Trail Running", "🚴 Ciclismo", "🏊 Triathlon", "⛷️ Sci", "🏊‍♂️ Nuoto", "🏇 Equitazione", "🧗 Arrampicata", "🎽 Atletica"].map((s, i) => (
              <span key={i} className="bg-gray-50 px-4 py-2 rounded-full text-sm font-medium text-gray-700">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PREZZI */}
      <section id="prezzi" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">Prezzi semplici e trasparenti</h2>
          <p className="text-gray-500 mb-16">Nessun costo nascosto. Paghi solo quello che usi.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {PLANS.map((plan, i) => (
              <div key={i} className={`border-2 ${plan.color} rounded-2xl p-6 flex flex-col relative`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">{plan.badge}</div>
                )}
                <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                <div className="text-3xl font-extrabold text-blue-600 mb-1">{plan.price}<span className="text-sm text-gray-400 font-normal">{plan.period}</span></div>
                <p className="text-gray-500 text-sm mb-6 flex-1">{plan.desc}</p>
                <a href="http://app.repliq.it/register" className="bg-blue-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition text-center">Inizia ora</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-16">Chi lo usa già</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Marco R.", role: "Organizzatore Trail Running", text: "Ho azzerato i messaggi WhatsApp prima della gara. I partecipanti trovano tutto da soli." },
              { name: "Lucia F.", role: "Direttrice Sportiva ASD", text: "Setup in 10 minuti. Caricato il regolamento e il chatbot era già pronto a rispondere." },
              { name: "Giorgio M.", role: "Organizzatore Granfondo", text: "Usato per la prima granfondo. Zero chiamate il giorno prima. Consigliatissimo." },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-left">
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <p className="font-bold text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-12 text-center">Domande frequenti</h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-4 font-semibold text-sm flex justify-between items-center hover:bg-gray-50 transition">
                  {faq.q}
                  <span className="text-blue-500 ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="bg-blue-600 py-24 px-6 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-4">Pronto a liberarti dai messaggi?</h2>
        <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">Configura Repliq in 5 minuti. La prossima gara, i partecipanti trovano tutto da soli.</p>
        <a href="http://app.repliq.it/register" className="bg-white text-blue-600 px-10 py-4 rounded-full font-extrabold text-lg hover:bg-blue-50 transition shadow-xl">
          Inizia gratis →
        </a>
        <p className="text-blue-300 text-sm mt-4">Nessuna carta di credito richiesta</p>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-gray-100 text-center text-sm text-gray-400">
        <p className="font-bold text-gray-700 mb-2">⚡ Repliq</p>
        <p>Il chatbot AI per organizzatori di eventi sportivi</p>
        <p className="mt-4">© 2025 Repliq · <a href="#" className="hover:text-blue-500">Privacy</a> · <a href="#" className="hover:text-blue-500">Termini</a></p>
      </footer>

    </main>
  );
}
