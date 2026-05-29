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
  { icon: "📄", title: "Carica i tuoi contenuti", desc: "PDF del regolamento, testo libero, risposte personalizzate. Repliq legge e indicizza tutto con tecnologia RAG." },
  { icon: "🧠", title: "L'AI elabora e impara", desc: "Il sistema RAG (Retrieval-Augmented Generation) recupera solo le informazioni rilevanti per ogni domanda — risposte precise, mai inventate." },
  { icon: "🔗", title: "Scegli come condividere", desc: "Pagina pubblica dedicata con il tuo logo, widget da embed nel tuo sito, o QR code per il giorno della gara." },
  { icon: "💬", title: "I partecipanti chiedono", desc: "Il chatbot risponde H24 in qualsiasi lingua. Le domande senza risposta diventano ticket per te." },
];

const FEATURES = [
  { icon: "📄", title: "Risponde dal regolamento", desc: "Carica PDF o testo libero. Repliq indicizza tutto e risponde con precisione, citando sempre la fonte.", tag: "Base", color: "blue" },
  { icon: "🗺️", title: "Mappa interattiva del percorso", desc: "Importa il file GPX e i partecipanti vedono il percorso completo con ristori, km e dislivello.", tag: "Base", color: "blue" },
  { icon: "📍", title: "Guida logistica completa", desc: "Parcheggi, partenza, arrivo, bagni, deposito sacche: ogni punto con link diretto alle mappe.", tag: "Base", color: "blue" },
  { icon: "🥤", title: "Ristori strutturati", desc: "Ogni ristoro con posizione GPS, dotazione (acqua, sali, frutta, gel) e orari di apertura.", tag: "Base", color: "blue" },
  { icon: "🎟️", title: "Ticketing automatico", desc: "Quando non sa rispondere, crea un ticket, ti notifica e invia la risposta al partecipante.", tag: "Pro", color: "violet" },
  { icon: "🌍", title: "Multilingua automatico", desc: "Risponde nella lingua del partecipante. Italiano, inglese, francese, tedesco e altro.", tag: "Pro", color: "violet" },
];

const FAQS = [
  { q: "Funziona anche per sport diversi dalla corsa?", a: "Sì — Repliq funziona per qualsiasi evento sportivo: ciclismo, triathlon, nuoto, sci, equitazione e molto altro. Se hai un regolamento in PDF, Repliq lo legge." },
  { q: "Devo installare qualcosa?", a: "No. Repliq è completamente online. Accedi dal browser, carichi il PDF e in pochi minuti il chatbot è attivo." },
  { q: "Cosa succede se il chatbot non sa rispondere?", a: "Con il piano Pro, le domande senza risposta diventano automaticamente ticket. Ricevi una notifica email e puoi rispondere dal pannello. La risposta arriva al partecipante via email." },
  { q: "I dati dei miei partecipanti sono al sicuro?", a: "Sì. I dati sono conservati su server europei (GDPR compliant) e non vengono condivisi con terze parti." },
  { q: "Posso personalizzare il chatbot con il logo della mia gara?", a: "Con il piano Pro e Federazione puoi personalizzare colori, logo e nome del chatbot." },
  { q: "Posso disdire quando voglio?", a: "Sì, non ci sono vincoli. Puoi disdire il piano annuale entro 30 giorni dal rinnovo." },
];

const SPORTS = ["🏃 Trail Running", "🚴 Ciclismo", "🏊 Triathlon", "⛷️ Sci", "🏊‍♂️ Nuoto", "🏇 Equitazione", "🧗 Arrampicata", "🎽 Atletica", "🚵 MTB"];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleMessages, setVisibleMessages] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-white text-gray-900 font-sans overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/">
            <span className="text-2xl font-black text-blue-600 tracking-tight">Repliq</span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#come-funziona" className="hover:text-blue-600 transition-colors">Come funziona</a>
            <a href="#funzionalita" className="hover:text-blue-600 transition-colors">Funzionalità</a>
            <a href="/pricing" className="hover:text-blue-600 transition-colors font-semibold">Prezzi</a>
            <a href="#chi-siamo" className="hover:text-blue-600 transition-colors">Chi siamo</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="http://app.repliq.it/login" className="text-sm border border-blue-200 text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Accedi
            </a>
            <a href="http://app.repliq.it/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
              Inizia gratis →
            </a>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a href="http://app.repliq.it/login" className="text-sm border border-blue-200 text-blue-600 px-3 py-1.5 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              Accedi
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menu"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`h-0.5 bg-gray-700 rounded transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} style={{display:"block"}}></span>
                <span className={`h-0.5 bg-gray-700 rounded transition-all ${menuOpen ? "opacity-0" : ""}`} style={{display:"block"}}></span>
                <span className={`h-0.5 bg-gray-700 rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} style={{display:"block"}}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
            <a href="#come-funziona" onClick={() => setMenuOpen(false)} className="text-sm text-gray-600 font-medium hover:text-blue-600 transition-colors py-1">Come funziona</a>
            <a href="#funzionalita" onClick={() => setMenuOpen(false)} className="text-sm text-gray-600 font-medium hover:text-blue-600 transition-colors py-1">Funzionalità</a>
            <a href="/pricing" onClick={() => setMenuOpen(false)} className="text-sm text-gray-600 font-semibold hover:text-blue-600 transition-colors py-1">Prezzi</a>
            <a href="#chi-siamo" onClick={() => setMenuOpen(false)} className="text-sm text-gray-600 font-medium hover:text-blue-600 transition-colors py-1">Chi siamo</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-sm text-gray-600 font-medium hover:text-blue-600 transition-colors py-1">FAQ</a>
            <div className="pt-2 border-t border-gray-100">
              <a href="http://app.repliq.it/register" className="block text-center bg-blue-600 text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                Inizia gratis →
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-28 px-6 overflow-hidden">
        {/* Gradient background blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-100">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Il primo assistente AI per eventi sportivi in Italia
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              Il tuo assistente<br />
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">che risponde H24</span>
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-md">
              Repliq non risponde solo alle domande — guida ogni partecipante nella logistica della gara: percorso GPX, ristori, parcheggi, partenza e arrivo. H24, in qualsiasi lingua.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a href="http://app.repliq.it/register" className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                Prova gratis 14 giorni →
              </a>
              <a href="#come-funziona" className="border border-gray-200 text-gray-600 px-8 py-3.5 rounded-full font-semibold text-base hover:border-blue-300 hover:text-blue-600 transition-colors">
                Come funziona
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Nessuna carta di credito</span>
              <span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Attivo in 5 minuti</span>
            </div>
          </div>

          {/* Chat demo */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl" />
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Chat header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">🏔️</div>
                <div>
                  <p className="text-white font-bold text-sm">Trail del Bosco Sacro</p>
                  <p className="text-blue-200 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    Assistente virtuale attivo
                  </p>
                </div>
              </div>
              {/* Messages */}
              <div className="p-4 flex flex-col gap-3 min-h-[220px] bg-gray-50/50">
                {CHAT_MESSAGES.slice(0, visibleMessages).map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              {visibleMessages < CHAT_MESSAGES.length && (
                <div className="px-4 pb-4 bg-gray-50/50">
                  <button
                    onClick={() => setVisibleMessages(v => Math.min(v + 2, CHAT_MESSAGES.length))}
                    className="w-full text-xs text-blue-500 hover:text-blue-700 transition-colors py-2 border border-blue-100 rounded-xl bg-white hover:bg-blue-50"
                  >
                    Continua la demo →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* NUMERI */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { number: "8+ ore", label: "perse per evento a rispondere messaggi" },
            { number: "80%", label: "delle domande sono sempre le stesse 10" },
            { number: "200+", label: "messaggi WhatsApp prima di ogni gara" },
            { number: "0 min", label: "di attesa con Repliq attivo" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-extrabold mb-2">{stat.number}</div>
              <div className="text-blue-200 text-sm leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Il problema</p>
          <h2 className="text-4xl font-extrabold mb-5 tracking-tight">Ogni organizzatore conosce questo scenario</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
            Hai passato mesi a organizzare la gara. Il regolamento è online. Eppure i messaggi continuano ad arrivare — sempre le stesse domande, a qualsiasi ora.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📱", title: "200+ messaggi WhatsApp", desc: "Prima di ogni gara, il telefono non smette di squillare con le stesse domande." },
              { icon: "🔁", title: "Sempre le stesse 10 domande", desc: "Orari, parcheggi, ritiro pettorali, rimborsi. Ogni volta, da capo." },
              { icon: "😴", title: "Di notte, nei weekend", desc: "I partecipanti chiedono quando tu non puoi rispondere. Repliq sì." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section id="come-funziona" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Come funziona</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Attivo in 5 minuti</h2>
            <p className="text-gray-500 text-lg">Nessuna competenza tecnica richiesta.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-5 border border-blue-100 relative z-10">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="font-bold text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGISTICA */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Molto più di un chatbot</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">La guida logistica<br />di ogni partecipante</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Dal momento in cui si iscrive fino al traguardo, ogni atleta ha tutte le informazioni a portata di tap — senza chiamarti.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-4">
              {[
                { icon: "🗺️", title: "Percorso GPX interattivo", desc: "Importa il file GPX e i partecipanti vedono il tracciato completo con dislivello, km progressivi e punti di interesse direttamente nella chat." },
                { icon: "🥤", title: "Ristori con dotazione dettagliata", desc: "Ogni ristoro ha la sua posizione GPS, l'elenco di cosa troveranno (acqua, sali, frutta, gel, brodo) e gli orari. L'atleta sa già cosa aspettarsi prima di arrivare." },
                { icon: "🅿️", title: "Parcheggi con link diretto", desc: "Aggiungi le aree parcheggio con link a Google Maps. Il partecipante clicca e parte il navigatore — zero confusione il giorno della gara." },
                { icon: "📍", title: "Tutti i punti chiave", desc: "Partenza, arrivo, deposito sacche, bagni, pronto soccorso, zona cambio: ogni posizione raggiungibile con un tap." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">🏔️</div>
                  <div>
                    <p className="text-white font-bold text-sm">Trail delle Dolomiti</p>
                    <p className="text-blue-200 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Assistente attivo</p>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-3 bg-gray-50/50">
                  <div className="flex justify-end"><div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">Dove trovo il deposito sacche?</div></div>
                  <div className="flex justify-start"><div className="bg-white text-gray-800 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 max-w-[80%]">Il deposito sacche è in zona partenza, vicino al tendone blu. Apre alle 7:00. 📍 <span className="text-blue-600 underline">Vedi su mappa</span></div></div>
                  <div className="flex justify-end"><div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">Cosa c'è al ristoro del km 18?</div></div>
                  <div className="flex justify-start"><div className="bg-white text-gray-800 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 max-w-[80%]">Al km 18 trovi: acqua, Coca-Cola, sali minerali, frutta fresca e brodo caldo. Il ristoro è aperto dalle 9:00 alle 16:00. 🥤</div></div>
                  <div className="flex justify-end"><div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">Dove parcheggio?</div></div>
                  <div className="flex justify-start"><div className="bg-white text-gray-800 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 max-w-[80%]">Hai 3 parcheggi disponibili: P1 gratuito in Via Roma (500m dalla partenza), P2 allo stadio (navetta inclusa), P3 al centro sportivo. 🅿️ <span className="text-blue-600 underline">Apri in Maps</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FUNZIONALITÀ */}
      <section id="funzionalita" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Funzionalità</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Un assistente completo</h2>
            <p className="text-gray-500 text-lg">Non solo un chatbot — tutta la comunicazione con i partecipanti.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-base">{f.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    f.color === "violet" ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700"
                  }`}>{f.tag}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKETING */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-violet-50 text-violet-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-violet-100">Solo su Repliq Pro</div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Nessuna domanda<br />rimane senza risposta</h2>
            <p className="text-gray-500 leading-relaxed mb-8">Quando il chatbot non trova la risposta, non lascia il partecipante nel vuoto. Crea un ticket, ti avvisa via email e ti permette di rispondere in un click.</p>
            <div className="flex flex-col gap-3">
              {[
                "Domanda senza risposta → ticket automatico",
                "Email immediata all'organizzatore",
                "Risposta dal pannello in un click",
                "Email automatica al partecipante",
                "Storico completo di tutte le richieste",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-7 h-7 bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-sm font-semibold text-gray-500 ml-2">Pannello Ticket</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { q: "Come faccio il rimborso?", status: "Risolto", color: "text-green-700 bg-green-50 border-green-100" },
                { q: "Posso cambiare categoria?", status: "In risposta", color: "text-yellow-700 bg-yellow-50 border-yellow-100" },
                { q: "C'è assistenza medica al km 15?", status: "Aperto", color: "text-red-600 bg-red-50 border-red-100" },
              ].map((t, i) => (
                <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-between border border-gray-100 shadow-sm">
                  <span className="text-sm text-gray-700 font-medium">{t.q}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${t.color}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECNOLOGIA RAG */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-blue-100">Tecnologia</div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Non è un chatbot qualsiasi.<br /><span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">È RAG.</span></h2>
            <p className="text-gray-500 leading-relaxed mb-6">Repliq usa la tecnologia <strong className="text-gray-700">RAG — Retrieval-Augmented Generation</strong>: prima recupera le informazioni esatte dai tuoi documenti, poi genera la risposta. Il risultato è un chatbot che non inventa nulla e cita sempre fonti reali.</p>
            <div className="flex flex-col gap-4">
              {[
                { icon: "📄", title: "PDF del regolamento", desc: "Carica il documento ufficiale — viene indicizzato automaticamente." },
                { icon: "✍️", title: "Testo libero", desc: "Aggiungi informazioni extra in formato testo, senza bisogno di un PDF." },
                { icon: "💬", title: "Risposte personalizzate", desc: "Scrivi le tue risposte precise a domande frequenti specifiche della tua gara." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{item.title}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl" />
            <div className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Come funziona il RAG</p>
              <div className="flex flex-col gap-3">
                {[
                  { step: "1", label: "Domanda del partecipante", desc: "\"Ci sono ristori al km 25?\"", color: "bg-blue-50 border-blue-100" },
                  { step: "2", label: "Ricerca semantica", desc: "Il sistema recupera i paragrafi rilevanti dai tuoi documenti", color: "bg-violet-50 border-violet-100" },
                  { step: "3", label: "Risposta precisa", desc: "\"Sì, al km 25 c'è un ristoro con acqua, sali e frutta. GPS: 45.123, 11.456\"", color: "bg-green-50 border-green-100" },
                ].map((item, i) => (
                  <div key={i} className={`rounded-xl p-4 border ${item.color}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0">{item.step}</span>
                      <p className="font-bold text-sm text-gray-700">{item.label}</p>
                    </div>
                    <p className="text-gray-500 text-xs ml-7">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section id="chi-siamo" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Chi siamo</p>
            <h2 className="text-4xl font-extrabold tracking-tight">Nato da un atleta,<br />costruito per gli organizzatori</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🏔️</div>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Mi chiamo <strong className="text-gray-900">Giacomo Nalesso</strong>. Sono un trail runner da 6 anni e appassionato di tecnologia. Ho partecipato a decine di gare e da ogni lato — come atleta — ho visto quanto la comunicazione tra organizzatori e partecipanti sia caotica.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Messaggi WhatsApp a tutte le ore, stesse domande ripetute mille volte, informazioni difficili da trovare. Ho costruito Repliq per risolvere esattamente questo problema — perché lo conosco dall&apos;interno.
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">🏃 Trail runner da 6 anni</span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">💻 Dev & AI enthusiast</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-8 border border-blue-100">
              <p className="text-blue-700 font-bold text-sm uppercase tracking-widest mb-4">La visione</p>
              <p className="text-gray-700 leading-relaxed text-lg font-medium mb-6">
                &ldquo;Ogni organizzatore merita uno strumento professionale per comunicare con i propri atleti. Non un foglio Google, non un gruppo WhatsApp — un assistente AI che lavora al posto tuo.&rdquo;
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Risponde in qualsiasi lingua, H24",
                  "Conosce ogni dettaglio della tua gara",
                  "Non lascia nessuna domanda senza risposta",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-blue-500 font-bold">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPORT SUPPORTATI */}
      <section className="py-16 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400 mb-6 font-bold uppercase tracking-widest">Funziona per tutti gli sport</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SPORTS.map((s, i) => (
              <span key={i} className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PREZZI */}
      <section id="prezzi" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Prezzi</p>
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Semplice e trasparente</h2>
          <p className="text-gray-500 mb-4">Nessun costo nascosto. Paghi solo quello che usi.</p>
          <div className="mb-10">
            <a href="/pricing" className="text-blue-600 font-semibold hover:underline text-sm">Vedi il confronto completo →</a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "Gara Singola", price: "€29", period: "/evento", desc: "Perfetto per provare Repliq su una singola gara.", highlight: false },
              { name: "Stagione Base", price: "€79", period: "/anno", desc: "Gare illimitate per tutta la stagione sportiva.", highlight: false },
              { name: "Stagione Pro", price: "€149", period: "/anno", desc: "Ticketing, email, analytics. Tutto incluso.", highlight: true },
              { name: "Federazione", price: "€299", period: "/anno", desc: "Multi-organizzazione, white label e supporto dedicato.", highlight: false },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl p-6 flex flex-col relative border-2 transition-transform ${
                plan.highlight
                  ? "border-violet-500 shadow-xl shadow-violet-100 scale-[1.03] bg-white"
                  : "border-gray-100 bg-white shadow-sm"
              }`}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    ⚡ Più scelto
                  </div>
                )}
                <h3 className="font-bold text-base mb-1">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-500 text-sm mb-5 flex-1 leading-relaxed">{plan.desc}</p>
                <a href="http://app.repliq.it/register" className={`block text-center py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  plan.highlight
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>
                  Inizia ora →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Testimonial</p>
          <h2 className="text-4xl font-extrabold mb-16 tracking-tight">Chi lo usa già</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Marco R.", role: "Organizzatore Trail Running", text: "Ho azzerato i messaggi WhatsApp prima della gara. I partecipanti trovano tutto da soli." },
              { name: "Lucia F.", role: "Direttrice Sportiva ASD", text: "Setup in 10 minuti. Caricato il regolamento e il chatbot era già pronto a rispondere." },
              { name: "Giorgio M.", role: "Organizzatore Granfondo", text: "Usato per la prima granfondo. Zero chiamate il giorno prima. Consigliatissimo." },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-extrabold tracking-tight">Domande frequenti</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 font-semibold text-sm flex justify-between items-center hover:bg-gray-50 transition-colors gap-4"
                >
                  <span>{faq.q}</span>
                  <span className={`text-blue-500 flex-shrink-0 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-700" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative text-center text-white max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Pronto a liberarti dai messaggi?</h2>
          <p className="text-blue-200 text-lg mb-10">Configura Repliq in 5 minuti. La prossima gara, i partecipanti trovano tutto da soli.</p>
          <a href="http://app.repliq.it/register" className="inline-block bg-white text-blue-700 px-10 py-4 rounded-full font-extrabold text-lg hover:bg-blue-50 transition-colors shadow-2xl">
            Inizia gratis 14 giorni →
          </a>
          <p className="text-blue-300 text-sm mt-4">Nessuna carta di credito richiesta</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-black text-gray-700 tracking-tight">Repliq</span>
            <p className="text-gray-400 text-sm">Il chatbot AI per organizzatori di eventi sportivi</p>
          </div>
          <div className="flex items-center gap-8 text-sm text-gray-400">
            <a href="#come-funziona" className="hover:text-blue-600 transition-colors">Come funziona</a>
            <a href="/pricing" className="hover:text-blue-600 transition-colors">Prezzi</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>
          <p className="text-gray-400 text-sm">© 2025 Repliq · <a href="#" className="hover:text-blue-500">Privacy</a> · <a href="#" className="hover:text-blue-500">Termini</a></p>
        </div>
      </footer>

    </main>
  );
}
