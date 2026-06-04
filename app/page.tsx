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
  { icon: "📄", title: "Carica i tuoi contenuti", desc: "PDF del regolamento, testo libero, risposte personalizzate. Repliq indicizza tutto con tecnologia RAG." },
  { icon: "🧠", title: "L'AI elabora e impara", desc: "Il sistema RAG recupera solo le informazioni rilevanti per ogni domanda — risposte precise, mai inventate." },
  { icon: "🔗", title: "Scegli come condividere", desc: "Pagina pubblica dedicata con il tuo logo, widget da embed nel tuo sito, o QR code per il giorno della gara." },
  { icon: "💬", title: "I partecipanti chiedono", desc: "Il chatbot risponde H24 in qualsiasi lingua. Le domande senza risposta diventano ticket per te." },
];

const FEATURES = [
  { icon: "📄", title: "Risponde dal regolamento", desc: "Carica PDF o testo libero. Repliq indicizza tutto e risponde con precisione, citando sempre la fonte.", tag: "Base", violet: false },
  { icon: "🗺️", title: "Mappa interattiva del percorso", desc: "Importa il file GPX e i partecipanti vedono il percorso completo con ristori, km e dislivello.", tag: "Base", violet: false },
  { icon: "📍", title: "Guida logistica completa", desc: "Parcheggi, partenza, arrivo, bagni, deposito sacche: ogni punto con link diretto alle mappe.", tag: "Base", violet: false },
  { icon: "🥤", title: "Ristori strutturati", desc: "Ogni ristoro con posizione GPS, dotazione (acqua, sali, frutta, gel) e orari di apertura.", tag: "Base", violet: false },
  { icon: "🎟️", title: "Ticketing automatico", desc: "Quando non sa rispondere, crea un ticket, ti notifica e invia la risposta al partecipante.", tag: "Pro", violet: true },
  { icon: "🌍", title: "Multilingua automatico", desc: "Risponde nella lingua del partecipante. Italiano, inglese, francese, tedesco e altro.", tag: "Pro", violet: true },
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
    <main className="bg-white text-slate-900 font-sans overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <span className="text-2xl font-black tracking-tight text-blue-600">Repliq</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-500 font-medium">
            <a href="#come-funziona" className="hover:text-slate-900 transition-colors">Come funziona</a>
            <a href="#funzionalita" className="hover:text-slate-900 transition-colors">Funzionalità</a>
            <a href="/pricing" className="hover:text-slate-900 transition-colors">Prezzi</a>
            <a href="#chi-siamo" className="hover:text-slate-900 transition-colors">Chi siamo</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="http://app.repliq.it/login" className="text-sm text-slate-600 px-4 py-2 rounded-full font-semibold hover:text-slate-900 transition-colors">
              Accedi
            </a>
            <a href="http://app.repliq.it/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
              Inizia gratis →
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <a href="http://app.repliq.it/login" className="text-sm text-slate-600 px-3 py-1.5 rounded-full font-semibold">
              Accedi
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Menu">
              <div className="w-5 flex flex-col gap-1">
                <span className={`h-0.5 bg-slate-700 rounded transition-all block ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
                <span className={`h-0.5 bg-slate-700 rounded transition-all block ${menuOpen ? "opacity-0" : ""}`}></span>
                <span className={`h-0.5 bg-slate-700 rounded transition-all block ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
            <a href="#come-funziona" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors py-1">Come funziona</a>
            <a href="#funzionalita" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors py-1">Funzionalità</a>
            <a href="/pricing" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 font-semibold hover:text-blue-600 transition-colors py-1">Prezzi</a>
            <a href="#chi-siamo" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors py-1">Chi siamo</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 font-medium hover:text-blue-600 transition-colors py-1">FAQ</a>
            <div className="pt-2 border-t border-slate-100">
              <a href="http://app.repliq.it/register" className="block text-center bg-blue-600 text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-blue-700">
                Inizia gratis →
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-0 px-6 overflow-hidden min-h-screen flex flex-col items-center">
        {/* Wavy fluid background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-blue-50/60 to-white pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[80px] pointer-events-none animate-blob" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-[80px] pointer-events-none animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] bg-sky-200/40 rounded-full blur-[80px] pointer-events-none animate-blob animation-delay-4000" />

        {/* Wave shape at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80 Q360 20 720 60 Q1080 100 1440 40 L1440 120 L0 120 Z" fill="white"/>
          </svg>
        </div>

        {/* Content */}
        <div className="relative text-center max-w-4xl mx-auto pt-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-slate-200 text-slate-600 text-xs font-semibold px-4 py-2 rounded-full mb-10 shadow-sm">
            <span className="text-yellow-500">★</span>
            Il primo assistente AI per eventi sportivi in Italia
          </div>

          {/* Mixed typography headline */}
          <h1 className="mb-6 leading-[1.1] tracking-tight">
            <span className="block text-5xl md:text-7xl font-extrabold text-slate-900">
              Il tuo assistente
            </span>
            <span className="block text-5xl md:text-7xl font-extrabold text-slate-900">
              H24 che
            </span>
            <span className="font-serif-italic text-5xl md:text-7xl text-blue-600">
              non sbaglia mai.
            </span>
          </h1>

          <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto leading-relaxed">
            Repliq guida ogni partecipante nella logistica della gara: percorso GPX, ristori, parcheggi, partenza e arrivo. H24, in qualsiasi lingua.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-5">
            <a href="http://app.repliq.it/register" className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2">
              Prova gratis 14 giorni <span>→</span>
            </a>
            <a href="#come-funziona" className="bg-white border border-slate-200 text-slate-700 px-8 py-3.5 rounded-full font-semibold text-base hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm">
              Come funziona
            </a>
          </div>

          <div className="flex items-center justify-center gap-5 text-sm text-slate-400 mb-16">
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Nessuna carta di credito</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Attivo in 5 minuti</span>
          </div>

          {/* Floating product mockup */}
          <div className="relative animate-float max-w-3xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-b from-blue-100/50 to-transparent rounded-3xl blur-xl pointer-events-none" />
            {/* Browser chrome */}
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-blue-100 border border-slate-200 overflow-hidden">
              {/* Browser top bar */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"/>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"/>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"/>
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-400 text-center">
                  app.repliq.it/dashboard
                </div>
              </div>
              {/* Dashboard content */}
              <div className="p-5 bg-slate-50/50">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Ciao Giacomo 👋</div>
                    <div className="text-xs text-slate-400">3 gare attive questa stagione</div>
                  </div>
                  <a href="http://app.repliq.it/register" className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold">+ Nuova gara</a>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {[
                    {v:"847", l:"Domande totali", c:"text-blue-600", bg:"bg-blue-50"},
                    {v:"94%", l:"Risposte auto.", c:"text-emerald-600", bg:"bg-emerald-50"},
                    {v:"52", l:"Ticket aperti", c:"text-amber-600", bg:"bg-amber-50"},
                    {v:"0", l:"Messaggi WhatsApp", c:"text-violet-600", bg:"bg-violet-50"},
                  ].map((s,i)=>(
                    <div key={i} className={`${s.bg} rounded-xl p-3`}>
                      <div className={`text-xl font-extrabold ${s.c}`}>{s.v}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-tight">{s.l}</div>
                    </div>
                  ))}
                </div>
                {/* Race cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {name:"Trail del Bosco Sacro", date:"15 Jun", questions:234, active:true},
                    {name:"Tenno Trail 30km", date:"22 Jun", questions:156, active:true},
                    {name:"Granfondo Dolomiti", date:"8 Jul", questions:89, active:false},
                  ].map((r,i)=>(
                    <div key={i} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-base">🏔️</div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                          {r.active ? 'Attivo' : 'Presto'}
                        </span>
                      </div>
                      <div className="font-semibold text-slate-800 text-xs leading-tight mb-1">{r.name}</div>
                      <div className="text-xs text-slate-400">{r.date} · {r.questions} domande</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUMERI */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "8+ ore", label: "perse per evento a rispondere messaggi" },
            { number: "80%", label: "delle domande sono sempre le stesse 10" },
            { number: "200+", label: "messaggi WhatsApp prima di ogni gara" },
            { number: "0 min", label: "di attesa con Repliq attivo" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-extrabold mb-2 text-blue-600">{stat.number}</div>
              <div className="text-slate-500 text-sm leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Il problema</p>
          <h2 className="text-4xl font-extrabold mb-5 tracking-tight text-slate-900">
            Ogni organizzatore conosce<br />questo scenario
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-14 max-w-2xl mx-auto">
            Hai passato mesi a organizzare la gara. Il regolamento è online. Eppure i messaggi continuano ad arrivare — sempre le stesse domande, a qualsiasi ora.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📱", title: "200+ messaggi WhatsApp", desc: "Prima di ogni gara, il telefono non smette di squillare con le stesse domande." },
              { icon: "🔁", title: "Sempre le stesse 10 domande", desc: "Orari, parcheggi, ritiro pettorali, rimborsi. Ogni volta, da capo." },
              { icon: "😴", title: "Di notte, nei weekend", desc: "I partecipanti chiedono quando tu non puoi rispondere. Repliq sì." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section id="come-funziona" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Come funziona</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Attivo in 5 minuti</h2>
            <p className="text-slate-500 text-lg">Nessuna competenza tecnica richiesta.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-5 relative z-10">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="font-bold text-base mb-2 text-slate-900">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGISTICA */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Molto più di un chatbot</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">La guida logistica<br />di ogni partecipante</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Dal momento in cui si iscrive fino al traguardo, ogni atleta ha tutte le informazioni a portata di tap — senza chiamarti.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-4">
              {[
                { icon: "🗺️", title: "Percorso GPX interattivo", desc: "Importa il file GPX e i partecipanti vedono il tracciato completo con dislivello, km progressivi e punti di interesse direttamente nella chat." },
                { icon: "🥤", title: "Ristori con dotazione dettagliata", desc: "Ogni ristoro ha la sua posizione GPS, l'elenco di cosa troveranno (acqua, sali, frutta, gel, brodo) e gli orari. L'atleta sa già cosa aspettarsi prima di arrivare." },
                { icon: "🅿️", title: "Parcheggi con link diretto", desc: "Aggiungi le aree parcheggio con link a Google Maps. Il partecipante clicca e parte il navigatore — zero confusione il giorno della gara." },
                { icon: "📍", title: "Tutti i punti chiave", desc: "Partenza, arrivo, deposito sacche, bagni, pronto soccorso, zona cambio: ogni posizione raggiungibile con un tap." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-base mb-1 text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">🏔️</div>
                  <div>
                    <p className="text-white font-bold text-sm">Trail delle Dolomiti</p>
                    <p className="text-blue-200 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Assistente attivo</p>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-3 bg-slate-50/50">
                  <div className="flex justify-end"><div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">Dove trovo il deposito sacche?</div></div>
                  <div className="flex justify-start"><div className="bg-white text-slate-800 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100 max-w-[80%]">Il deposito sacche è in zona partenza, vicino al tendone blu. Apre alle 7:00. 📍 <span className="text-blue-600 underline">Vedi su mappa</span></div></div>
                  <div className="flex justify-end"><div className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">Cosa c&apos;è al ristoro del km 18?</div></div>
                  <div className="flex justify-start"><div className="bg-white text-slate-800 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm border border-slate-100 max-w-[80%]">Al km 18 trovi: acqua, Coca-Cola, sali minerali, frutta fresca e brodo caldo. 🥤</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 MODI DI DISTRIBUZIONE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Distribuzione</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">3 modi per raggiungere<br />i tuoi partecipanti</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Scegli come condividere il chatbot — o usali tutti e tre insieme.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-6 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="relative">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-3">💬</div>
                  <div className="text-white font-bold text-lg">Widget bolla</div>
                  <div className="text-white/70 text-sm mt-1">Sul tuo sito web</div>
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl">💬</div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-slate-500 text-sm leading-relaxed mb-4">Aggiungi una riga di codice al tuo sito. Appare una bolla nell&apos;angolo — i visitatori la cliccano e chattano senza uscire dalla pagina.</p>
                <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-emerald-400 overflow-hidden">
                  <span className="text-slate-500">&lt;!-- Repliq Widget --&gt;</span><br/>
                  <span className="text-blue-400">&lt;iframe</span> <span className="text-yellow-400">src=</span><span className="text-emerald-400">&quot;repliq.it/widget/...&quot;</span><span className="text-blue-400">/&gt;</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="relative">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-3">📱</div>
                  <div className="text-white font-bold text-lg">QR Code</div>
                  <div className="text-white/70 text-sm mt-1">Stampa ovunque</div>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="bg-white rounded-xl p-2 w-16 h-16 grid grid-cols-3 gap-0.5">
                    {[1,1,1,1,0,1,1,1,1].map((v,i)=><div key={i} className={`rounded-sm ${v ? 'bg-gray-900' : 'bg-white'}`}/>)}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-slate-500 text-sm leading-relaxed mb-4">Scarica il QR code e stampalo sulla locandina, mappa cartacea, pettorale o banner. I partecipanti lo scansionano e sono subito nel chatbot.</p>
                <div className="flex flex-wrap gap-2">
                  {["📄 Locandina", "🗺️ Mappa gara", "🏃 Pettorale", "📢 Banner"].map((t,i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
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
                <p className="text-slate-500 text-sm leading-relaxed mb-4">Copia il link e incollalo nell&apos;email di conferma iscrizione, WhatsApp, Telegram, Instagram bio o sito della gara.</p>
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
      <section id="funzionalita" className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Funzionalità</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Un assistente completo</h2>
            <p className="text-slate-500 text-lg">Non solo un chatbot — tutta la comunicazione con i partecipanti.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-base text-slate-900">{f.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    f.violet ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700"
                  }`}>{f.tag}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKETING */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-violet-50 text-violet-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-violet-100">Solo su Repliq Pro</div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-slate-900">Nessuna domanda<br />rimane senza risposta</h2>
            <p className="text-slate-500 leading-relaxed mb-8">Quando il chatbot non trova la risposta, non lascia il partecipante nel vuoto. Crea un ticket, ti avvisa via email e ti permette di rispondere in un click.</p>
            <div className="flex flex-col gap-3">
              {[
                "Domanda senza risposta → ticket automatico",
                "Email immediata all'organizzatore",
                "Risposta dal pannello in un click",
                "Email automatica al partecipante",
                "Storico completo di tutte le richieste",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-7 h-7 bg-gradient-to-br from-blue-600 to-violet-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span className="text-sm font-semibold text-slate-400 ml-2">Pannello Ticket</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { q: "Come faccio il rimborso?", status: "Risolto", color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
                { q: "Posso cambiare categoria?", status: "In risposta", color: "text-amber-700 bg-amber-50 border-amber-100" },
                { q: "C'è assistenza medica al km 15?", status: "Aperto", color: "text-red-600 bg-red-50 border-red-100" },
              ].map((t, i) => (
                <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-between border border-slate-100 shadow-sm">
                  <span className="text-sm text-slate-700 font-medium">{t.q}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${t.color}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECNOLOGIA RAG */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-blue-100">Tecnologia</div>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-slate-900">
              Non è un chatbot qualsiasi.<br />
              <span className="font-serif-italic text-blue-600">È RAG.</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">Repliq usa la tecnologia <strong className="text-slate-900">RAG — Retrieval-Augmented Generation</strong>: prima recupera le informazioni esatte dai tuoi documenti, poi genera la risposta. Non inventa nulla e cita sempre fonti reali.</p>
            <div className="flex flex-col gap-4">
              {[
                { icon: "📄", title: "PDF del regolamento", desc: "Carica il documento ufficiale — viene indicizzato automaticamente." },
                { icon: "✍️", title: "Testo libero", desc: "Aggiungi informazioni extra in formato testo, senza bisogno di un PDF." },
                { icon: "💬", title: "Risposte personalizzate", desc: "Scrivi le tue risposte precise a domande frequenti specifiche della tua gara." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{item.title}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl" />
            <div className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-lg">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Come funziona il RAG</p>
              <div className="flex flex-col gap-3">
                {[
                  { step: "1", label: "Domanda del partecipante", desc: "\"Ci sono ristori al km 25?\"", color: "bg-blue-50 border-blue-100" },
                  { step: "2", label: "Ricerca semantica", desc: "Il sistema recupera i paragrafi rilevanti dai tuoi documenti", color: "bg-violet-50 border-violet-100" },
                  { step: "3", label: "Risposta precisa", desc: "\"Sì, al km 25 c'è un ristoro con acqua, sali e frutta. GPS: 45.123, 11.456\"", color: "bg-emerald-50 border-emerald-100" },
                ].map((item, i) => (
                  <div key={i} className={`rounded-xl p-4 border ${item.color}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0">{item.step}</span>
                      <p className="font-bold text-sm text-slate-700">{item.label}</p>
                    </div>
                    <p className="text-slate-500 text-xs ml-7">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Analytics</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">
              Capisci cosa non funziona.<br />
              <span className="font-serif-italic text-blue-600">Prima della gara.</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">La dashboard distingue tra <strong className="text-slate-700">lacune reali nel regolamento</strong> e <strong className="text-slate-700">domande frequenti</strong> — due problemi diversi, due soluzioni diverse.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden max-w-3xl mx-auto">
            <div className="bg-slate-900 px-5 py-3 flex items-center gap-2">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-yellow-400"/><div className="w-3 h-3 rounded-full bg-emerald-400"/></div>
              <span className="text-slate-400 text-xs ml-2 font-medium">Repliq — Statistiche · Tenno Trail 2026</span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  {v:"847", l:"Domande totali", c:"text-blue-600", bg:"bg-blue-50"},
                  {v:"94%", l:"Risposte auto.", c:"text-emerald-600", bg:"bg-emerald-50"},
                  {v:"52", l:"Ticket creati", c:"text-amber-600", bg:"bg-amber-50"},
                  {v:"8", l:"Lacune trovate", c:"text-red-500", bg:"bg-red-50"},
                ].map((s,i)=>(
                  <div key={i} className={`${s.bg} rounded-xl p-3 text-center`}>
                    <div className={`text-2xl font-extrabold ${s.c}`}>{s.v}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Domande più frequenti</div>
                  {[
                    {q:"Dove parcheggio?", n:142, pct:100, c:"bg-blue-500"},
                    {q:"Orario partenza?", n:98, pct:69, c:"bg-blue-400"},
                    {q:"Materiale obbligatorio?", n:87, pct:61, c:"bg-violet-500"},
                    {q:"Ritiro pettorale?", n:71, pct:50, c:"bg-violet-400"},
                    {q:"Ristori km 15?", n:54, pct:38, c:"bg-indigo-400"},
                  ].map((item,i)=>(
                    <div key={i} className="mb-2.5">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-700 font-medium">{item.q}</span>
                        <span className="text-slate-400">{item.n}x</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full">
                        <div className={`h-2 ${item.c} rounded-full`} style={{width:`${item.pct}%`}}/>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-3">🧠 Insights AI</div>
                  <div className="flex flex-col gap-2 mb-4">
                    {[
                      {q:"Come si fa il rimborso iscrizione?", type:"gap", label:"Non nel reg."},
                      {q:"C'è assistenza medica al km 20?", type:"gap", label:"Non nel reg."},
                      {q:"Posso cambiare categoria?", type:"question", label:"Domanda freq."},
                      {q:"Dove posso lasciare la bici?", type:"question", label:"Domanda freq."},
                    ].map((item,i)=>(
                      <div key={i} className={`flex items-center justify-between text-xs rounded-lg px-3 py-2 border ${item.type === 'gap' ? 'bg-red-50 border-red-100 text-slate-700' : 'bg-violet-50 border-violet-100 text-slate-700'}`}>
                        <span>{item.q}</span>
                        <span className={`font-bold ml-2 whitespace-nowrap ${item.type === 'gap' ? 'text-red-500' : 'text-violet-500'}`}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                    <div className="text-xs font-bold text-emerald-700 mb-1">✅ Risultato</div>
                    <div className="text-xs text-emerald-600 leading-relaxed">Ogni edizione il chatbot risponde a più domande in autonomia. Meno ticket, meno WhatsApp, organizzazione più fluida.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section id="chi-siamo" className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Chi siamo</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Nato da un atleta,<br />costruito per gli organizzatori</h2>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-10 border border-blue-100 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center text-white text-lg font-black flex-shrink-0">GN</div>
              <div>
                <p className="font-bold text-lg text-slate-900">Giacomo Nalesso</p>
                <p className="text-sm text-slate-500">Fondatore · Trail runner da 6 anni · Dev & AI enthusiast</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base mb-6 italic">
              &ldquo;Ho partecipato a decine di gare e ho visto dall&apos;interno quanto la comunicazione tra organizzatori e partecipanti sia caotica. Messaggi WhatsApp a tutte le ore, stesse domande ripetute mille volte, informazioni difficili da trovare. Ho costruito Repliq per risolvere esattamente questo — perché conosco il problema dall&apos;interno.&rdquo;
            </p>
            <div className="flex flex-wrap gap-2">
              {["🏃 Trail running", "🚵 MTB", "💻 Software developer", "🤖 AI & tecnologia"].map((tag, i) => (
                <span key={i} className="bg-white text-slate-600 text-xs px-3 py-1.5 rounded-full border border-blue-100 font-medium">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPORT SUPPORTATI */}
      <section className="py-16 px-6 border-y border-slate-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-400 mb-6 font-bold uppercase tracking-widest">Funziona per tutti gli sport</p>
          <div className="flex flex-wrap justify-center gap-3">
            {SPORTS.map((s, i) => (
              <span key={i} className="bg-white px-4 py-2 rounded-full text-sm font-medium text-slate-700 border border-slate-200 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors cursor-default">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PREZZI */}
      <section id="prezzi" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Prezzi</p>
          <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-slate-900">Semplice e trasparente</h2>
          <p className="text-slate-500 mb-4">Nessun costo nascosto. Paghi solo quello che usi.</p>
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
                  ? "border-blue-500 shadow-xl shadow-blue-100 scale-[1.03] bg-white"
                  : "border-slate-100 bg-white shadow-sm"
              }`}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    ⚡ Più scelto
                  </div>
                )}
                <h3 className="font-bold text-base mb-1 text-slate-900">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-slate-500 text-sm mb-5 flex-1 leading-relaxed">{plan.desc}</p>
                <a href="http://app.repliq.it/register" className={`block text-center py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  plan.highlight
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}>
                  Inizia ora →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Testimonial</p>
          <h2 className="text-4xl font-extrabold mb-16 tracking-tight text-slate-900">Chi lo usa già</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Marco R.", role: "Organizzatore Trail Running", text: "Ho azzerato i messaggi WhatsApp prima della gara. I partecipanti trovano tutto da soli." },
              { name: "Lucia F.", role: "Direttrice Sportiva ASD", text: "Setup in 10 minuti. Caricato il regolamento e il chatbot era già pronto a rispondere." },
              { name: "Giorgio M.", role: "Organizzatore Granfondo", text: "Usato per la prima granfondo. Zero chiamate il giorno prima. Consigliatissimo." },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-left hover:shadow-md transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="text-slate-600 text-sm mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Domande frequenti</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-4 font-semibold text-sm flex justify-between items-center hover:bg-slate-50 transition-colors gap-4 text-slate-900"
                >
                  <span>{faq.q}</span>
                  <span className={`text-blue-500 flex-shrink-0 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
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
        {/* Wavy blue background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-100/80 to-violet-50 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/50 rounded-full blur-[80px] pointer-events-none animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-200/40 rounded-full blur-[80px] pointer-events-none animate-blob animation-delay-2000" />

        <div className="relative text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-slate-900">
            Pronto a liberarti
          </h2>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            <span className="font-serif-italic text-blue-600">dai messaggi?</span>
          </h2>
          <p className="text-slate-500 text-lg mb-10">Configura Repliq in 5 minuti. La prossima gara, i partecipanti trovano tutto da soli.</p>
          <a href="http://app.repliq.it/register" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-extrabold text-lg hover:bg-blue-700 transition-colors shadow-xl shadow-blue-200">
            Inizia gratis 14 giorni →
          </a>
          <p className="text-slate-400 text-sm mt-4">Nessuna carta di credito richiesta</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-black text-blue-600 tracking-tight">Repliq</span>
            <p className="text-slate-400 text-sm">Il chatbot AI per organizzatori di eventi sportivi</p>
          </div>
          <div className="flex items-center gap-8 text-sm text-slate-400">
            <a href="#come-funziona" className="hover:text-blue-600 transition-colors">Come funziona</a>
            <a href="/pricing" className="hover:text-blue-600 transition-colors">Prezzi</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>
          <p className="text-slate-400 text-sm">© 2025 Repliq · <a href="#" className="hover:text-blue-500">Privacy</a> · <a href="#" className="hover:text-blue-500">Termini</a></p>
        </div>
      </footer>

    </main>
  );
}
