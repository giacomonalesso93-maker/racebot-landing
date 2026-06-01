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

      {/* 3 MODI DI DISTRIBUZIONE */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Distribuzione</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">3 modi per raggiungere<br />i tuoi partecipanti</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Scegli come condividere il chatbot — o usali tutti e tre insieme.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* BOLLA WIDGET */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-6 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="relative">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-3">💬</div>
                  <div className="text-white font-bold text-lg">Widget bolla</div>
                  <div className="text-white/70 text-sm mt-1">Sul tuo sito web</div>
                </div>
                {/* Mockup bolla */}
                <div className="mt-4 flex justify-end">
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl">💬</div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">Aggiungi una riga di codice al tuo sito. Appare una bolla nell&apos;angolo — i visitatori la cliccano e chattano senza uscire dalla pagina.</p>
                <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-green-400 overflow-hidden">
                  <span className="text-gray-500">&lt;!-- Repliq Widget --&gt;</span><br/>
                  <span className="text-blue-400">&lt;iframe</span> <span className="text-yellow-400">src=</span><span className="text-green-400">&quot;repliq.it/widget/...&quot;</span><span className="text-blue-400">/&gt;</span>
                </div>
              </div>
            </div>

            {/* QR CODE */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="relative">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-3">📱</div>
                  <div className="text-white font-bold text-lg">QR Code</div>
                  <div className="text-white/70 text-sm mt-1">Stampa ovunque</div>
                </div>
                {/* Mockup QR */}
                <div className="mt-4 flex justify-center">
                  <div className="bg-white rounded-xl p-2 w-16 h-16 grid grid-cols-3 gap-0.5">
                    {[1,1,1,1,0,1,1,1,1].map((v,i)=><div key={i} className={`rounded-sm ${v ? 'bg-gray-900' : 'bg-white'}`}/>)}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">Scarica il QR code e stampalo sulla locandina, mappa cartacea, pettorale o banner. I partecipanti lo scansionano e sono subito nel chatbot.</p>
                <div className="flex flex-wrap gap-2">
                  {["📄 Locandina", "🗺️ Mappa gara", "🏃 Pettorale", "📢 Banner"].map((t,i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* LINK DIRETTO */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="relative">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-3">🔗</div>
                  <div className="text-white font-bold text-lg">Link diretto</div>
                  <div className="text-white/70 text-sm mt-1">Ovunque tu voglia</div>
                </div>
                <div className="mt-4 bg-white/15 rounded-xl p-2 font-mono text-xs text-white/90 truncate">
                  app.repliq.it/chat/tenno-trail
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">Copia il link e incollalo nell&apos;email di conferma iscrizione, WhatsApp, Telegram, Instagram bio o sito della gara.</p>
                <div className="flex flex-wrap gap-2">
                  {["📧 Email iscrizione", "💬 WhatsApp", "📸 Instagram", "🌐 Sito gara"].map((t,i) => (
                    <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-medium">{t}</span>
                  ))}
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

      {/* GPX NEL CHATBOT */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-green-100">Percorso interattivo</div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight">Il percorso GPX<br />dentro la chat</h2>
            <p className="text-gray-500 leading-relaxed mb-6">Carica il file GPX e i partecipanti vedono il tracciato reale direttamente nel chatbot — con mappa interattiva, km progressivi, dislivello e tutti i punti di interesse sovrapposti.</p>
            <div className="flex flex-col gap-3">
              {[
                { icon: "🗺️", text: "Mappa del percorso con tracciato blu" },
                { icon: "🏁", text: "Partenza e arrivo evidenziati" },
                { icon: "🥤", text: "Ristori, punti medici e depositi sulla mappa" },
                { icon: "🅿️", text: "Parcheggi con link diretto a Google Maps" },
                { icon: "💬", text: "Fanno domande sul percorso e ricevono risposte precise" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="text-lg">{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
          </div>
          {/* Mockup chat con mappa */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">🏔️</div>
                <div>
                  <div className="text-white text-xs font-bold">Tenno Trail 30km</div>
                  <div className="text-blue-200 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span> Attivo</div>
                </div>
              </div>
              <button className="bg-white/15 text-white text-xs px-3 py-1 rounded-full font-semibold">📍 Mappa</button>
            </div>
            {/* Finta mappa */}
            <div className="bg-slate-100 h-36 relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 150">
                <rect width="400" height="150" fill="#e2e8f0"/>
                <path d="M20,120 Q60,80 100,90 Q140,100 180,60 Q220,20 260,40 Q300,60 340,30 Q360,20 380,35" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <circle cx="20" cy="120" r="5" fill="#16a34a"/>
                <circle cx="380" cy="35" r="5" fill="#dc2626"/>
                <circle cx="100" cy="90" r="6" fill="#f59e0b"/>
                <circle cx="220" cy="25" r="6" fill="#f59e0b"/>
                <circle cx="320" cy="55" r="6" fill="#f59e0b"/>
                <text x="26" y="118" fontSize="10" fill="#16a34a" fontWeight="bold">P</text>
                <text x="97" y="105" fontSize="8" fill="#92400e">🥤</text>
                <text x="217" y="40" fontSize="8" fill="#92400e">🥤</text>
              </svg>
            </div>
            <div className="p-4 flex flex-col gap-3 bg-gray-50/50">
              <div className="flex justify-end"><div className="bg-blue-600 text-white text-xs px-3 py-2 rounded-2xl rounded-br-sm max-w-[75%]">Al km 15 c&apos;è qualcosa?</div></div>
              <div className="flex justify-start gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-xs flex-shrink-0">🏔️</div>
                <div className="bg-white text-gray-800 text-xs px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 max-w-[75%]">Al km 15 c&apos;è un <strong>ristoro</strong> con acqua, sali e frutta. C&apos;è anche un punto medico 200m dopo. 🥤</div>
              </div>
              <div className="flex justify-end"><div className="bg-blue-600 text-white text-xs px-3 py-2 rounded-2xl rounded-br-sm max-w-[75%]">Quanto dislivello positivo?</div></div>
              <div className="flex justify-start gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-xs flex-shrink-0">🏔️</div>
                <div className="bg-white text-gray-800 text-xs px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 max-w-[75%]">Il percorso ha <strong>1.600m</strong> di dislivello positivo su 30km. Il tratto più impegnativo è tra km 8 e km 18. ⛰️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD STATISTICHE */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Analytics</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Capisci cosa non funziona.<br /><span className="text-blue-600">Prima della gara.</span></h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">La dashboard ti mostra quante domande riceve il chatbot, quali sono le più frequenti e — soprattutto — distingue tra <strong className="text-gray-700">lacune reali nel regolamento</strong> e <strong className="text-gray-700">domande frequenti</strong> che i partecipanti fanno comunque. Due problemi diversi, due soluzioni diverse.</p>
          </div>
          {/* Mockup dashboard stats */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-3xl mx-auto">
            <div className="bg-gray-900 px-5 py-3 flex items-center gap-2">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-yellow-400"/><div className="w-3 h-3 rounded-full bg-green-400"/></div>
              <span className="text-gray-400 text-xs ml-2 font-medium">Repliq — Statistiche · Tenno Trail 2026</span>
            </div>
            <div className="p-6">
              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  {v:"847", l:"Domande totali", c:"text-blue-600", bg:"bg-blue-50"},
                  {v:"94%", l:"Risposte auto.", c:"text-green-600", bg:"bg-green-50"},
                  {v:"52", l:"Ticket creati", c:"text-amber-600", bg:"bg-amber-50"},
                  {v:"8", l:"Lacune trovate", c:"text-red-500", bg:"bg-red-50"},
                ].map((s,i)=>(
                  <div key={i} className={`${s.bg} rounded-xl p-3 text-center`}>
                    <div className={`text-2xl font-extrabold ${s.c}`}>{s.v}</div>
                    <div className="text-xs text-gray-500 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Top domande */}
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Domande più frequenti</div>
                  {[
                    {q:"Dove parcheggio?", n:142, pct:100, c:"bg-blue-500"},
                    {q:"Orario partenza?", n:98, pct:69, c:"bg-blue-400"},
                    {q:"Materiale obbligatorio?", n:87, pct:61, c:"bg-violet-500"},
                    {q:"Ritiro pettorale?", n:71, pct:50, c:"bg-violet-400"},
                    {q:"Ristori km 15?", n:54, pct:38, c:"bg-indigo-400"},
                  ].map((item,i)=>(
                    <div key={i} className="mb-2.5">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700 font-medium">{item.q}</span>
                        <span className="text-gray-400">{item.n}x</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className={`h-2 ${item.c} rounded-full transition-all`} style={{width:`${item.pct}%`}}/>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Insights domande */}
                <div>
                  <div className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-3">🧠 Cosa vogliono sapere</div>
                  <div className="flex flex-col gap-2 mb-4">
                    {[
                      {q:"Come si fa il rimborso iscrizione?", type:"gap", label:"Non nel reg."},
                      {q:"C'è assistenza medica al km 20?", type:"gap", label:"Non nel reg."},
                      {q:"Posso cambiare categoria?", type:"question", label:"Domanda freq."},
                      {q:"Dove posso lasciare la bici?", type:"question", label:"Domanda freq."},
                    ].map((item,i)=>(
                      <div key={i} className={`flex items-center justify-between text-xs rounded-lg px-3 py-2 border ${item.type === 'gap' ? 'bg-red-50 border-red-100 text-gray-700' : 'bg-violet-50 border-violet-100 text-gray-700'}`}>
                        <span>{item.q}</span>
                        <span className={`font-bold ml-2 whitespace-nowrap ${item.type === 'gap' ? 'text-red-500' : 'text-violet-500'}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-2">
                    <div className="text-xs font-bold text-blue-700 mb-1">💡 Repliq distingue due casi</div>
                    <div className="text-xs text-blue-600 leading-relaxed space-y-1">
                      <div><span className="text-red-500 font-bold">● Lacuna</span> — domanda senza risposta nel regolamento → aggiungila</div>
                      <div><span className="text-violet-500 font-bold">● Domanda frequente</span> — risposta c&apos;è ma i partecipanti chiedono comunque → mettila in evidenza</div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                    <div className="text-xs font-bold text-green-700 mb-1">✅ Risultato</div>
                    <div className="text-xs text-green-600 leading-relaxed">Ogni edizione il chatbot risponde a più domande in autonomia. Meno ticket, meno WhatsApp, organizzazione più fluida.</div>
                  </div>
                </div>
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
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Nato da un atleta,<br />costruito per gli organizzatori</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Repliq nasce dall&apos;esperienza diretta sul campo — non da una startup che ha letto di sport, ma da chi lo vive ogni settimana.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-10 border border-blue-100 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">GN</div>
              <div>
                <p className="font-bold text-lg text-gray-900">Giacomo Nalesso</p>
                <p className="text-sm text-gray-500">Fondatore · Trail runner da 6 anni · Dev & AI enthusiast</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-base mb-6 italic">
              &ldquo;Ho partecipato a decine di gare e ho visto dall&apos;interno quanto la comunicazione tra organizzatori e partecipanti sia caotica. Messaggi WhatsApp a tutte le ore, stesse domande ripetute mille volte, informazioni difficili da trovare. Ho costruito Repliq per risolvere esattamente questo — perché conosco il problema dall&apos;interno.&rdquo;
            </p>
            <div className="flex flex-wrap gap-2">
              {["🏃 Trail running", "🚵 MTB", "💻 Software developer", "🤖 AI & tecnologia"].map((tag, i) => (
                <span key={i} className="bg-white text-gray-600 text-xs px-3 py-1.5 rounded-full border border-blue-100 font-medium">{tag}</span>
              ))}
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
