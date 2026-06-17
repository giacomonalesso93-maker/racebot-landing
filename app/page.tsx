"use client";
import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Animation helpers
// ---------------------------------------------------------------------------
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } as object },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } as object },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } as object },
};
const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } as object },
};
const vp = { once: true, margin: "-60px" } as const;

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const FAQS = [
  { q: "Funziona anche per sport diversi dalla corsa?", a: "Sì — Repliq funziona per qualsiasi evento sportivo: ciclismo, triathlon, nuoto, sci, equitazione e molto altro. Se hai un regolamento in PDF, Repliq lo legge." },
  { q: "Devo installare qualcosa?", a: "No. Repliq è completamente online. Accedi dal browser, carichi il PDF e in pochi minuti il chatbot è attivo." },
  { q: "Cosa succede se il chatbot non sa rispondere?", a: "Con il piano Pro, le domande senza risposta diventano automaticamente ticket. Ricevi una notifica email e puoi rispondere dal pannello. La risposta arriva al partecipante via email." },
  { q: "I dati dei miei partecipanti sono al sicuro?", a: "Sì. I dati sono conservati su server europei (GDPR compliant) e non vengono condivisi con terze parti." },
  { q: "Posso personalizzare il chatbot con il logo della mia gara?", a: "Con il piano Pro e Federazione puoi personalizzare colori, logo e nome del chatbot." },
  { q: "Posso disdire quando voglio?", a: "Sì, non ci sono vincoli. Puoi disdire il piano annuale entro 30 giorni dal rinnovo." },
];

const FEATURES = [
  { icon: "📄", title: "Risponde dal regolamento", desc: "Carica PDF o testo libero. Repliq indicizza tutto e risponde con precisione, citando sempre la fonte.", tag: "Base", violet: false },
  { icon: "🗺️", title: "Mappa interattiva percorso", desc: "Importa il file GPX e i partecipanti vedono il percorso completo con ristori, km e dislivello.", tag: "Base", violet: false },
  { icon: "📍", title: "Guida logistica completa", desc: "Parcheggi, partenza, arrivo, bagni, deposito sacche: ogni punto con link diretto alle mappe.", tag: "Base", violet: false },
  { icon: "🥤", title: "Ristori strutturati", desc: "Ogni ristoro con posizione GPS, dotazione completa (acqua, sali, frutta, gel) e orari di apertura.", tag: "Base", violet: false },
  { icon: "🎟️", title: "Ticketing automatico", desc: "Quando non sa rispondere, crea un ticket, ti notifica e invia la risposta al partecipante.", tag: "Pro", violet: true },
  { icon: "🌍", title: "Multilingua automatico", desc: "Risponde nella lingua del partecipante. Italiano, inglese, francese, tedesco e altro.", tag: "Pro", violet: true },
];

const SPORTS = ["🏃 Trail Running", "🚴 Ciclismo", "🏊 Triathlon", "⛷️ Sci", "🏊‍♂️ Nuoto", "🏇 Equitazione", "🧗 Arrampicata", "🎽 Atletica", "🚵 MTB"];

const QA_CATEGORIES = [
  {
    icon: "📋", title: "Prima della gara",
    messages: [
      { from: "user", text: "Dove ritiro il pettorale?" },
      { from: "bot", text: "Il pettorale si ritira il venerdì 14–19 e sabato mattina 7–8:30 in segreteria gara, tensostruttura bianca in zona partenza. 📋" },
      { from: "user", text: "Posso farmi ritirare il pettorale da qualcuno?" },
      { from: "bot", text: "Sì, è possibile con delega scritta + copia documento. Il modulo è allegato al regolamento. ✅" },
    ],
  },
  {
    icon: "🚗", title: "Logistica",
    messages: [
      { from: "user", text: "Dove parcheggio?" },
      { from: "bot", text: "3 aree disponibili: P1 Via Roma (gratuito, 200 posti), P2 Stadio (€2/h, 500m a piedi), P3 Centro sportivo (gratuito, navetta). 🅿️" },
      { from: "user", text: "C'è la navetta?" },
      { from: "bot", text: "Sì, navetta P3→partenza ogni 20 minuti dalle 6:30 all'8:30. Gratis per tutti gli iscritti. 🚌" },
    ],
  },
  {
    icon: "🗺️", title: "Percorso e ristori",
    messages: [
      { from: "user", text: "Quanti ristori ci sono?" },
      { from: "bot", text: "3 ristori: km 10 (acqua, frutta), km 18 (acqua, Coca-Cola, sali, brodo), km 25 (acqua, gel). 🥤" },
      { from: "user", text: "C'è un drop bag?" },
      { from: "bot", text: "Sì, drop bag al ristoro km 18. Lascia il sacchetto in segreteria entro le 8:15 la mattina della gara. 🎒" },
    ],
  },
  {
    icon: "🎽", title: "Materiale e regole",
    messages: [
      { from: "user", text: "Qual è il materiale obbligatorio?" },
      { from: "bot", text: "Fischietto, giacca impermeabile, kit pronto soccorso, 500ml acqua, coperta termica. Controlli random in partenza. 🎒" },
      { from: "user", text: "I bastoncini sono permessi?" },
      { from: "bot", text: "Sì, i bastoncini sono consentiti su tutto il percorso. Nessuna restrizione. ✅" },
    ],
  },
  {
    icon: "📸", title: "Dopo la gara",
    messages: [
      { from: "user", text: "Quando escono i risultati?" },
      { from: "bot", text: "I risultati ufficiali vengono pubblicati entro 2 ore dall'arrivo dell'ultimo concorrente sul sito della gara. 🏆" },
      { from: "user", text: "Come chiedo il rimborso iscrizione?" },
      { from: "bot", text: "Inoltro la tua richiesta alla segreteria — riceverai risposta via email entro 24h. 📧", ticket: true },
    ],
  },
];

type TabId = "overview" | "questions" | "tickets" | "analytics";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-white text-slate-900 font-sans overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/"><span style={{ fontFamily: "var(--font-plus-jakarta, sans-serif)" }} className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Repliq</span></a>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-500 font-medium">
            <a href="#come-funziona" className="hover:text-slate-900 transition-colors">Come funziona</a>
            <a href="#funzionalita" className="hover:text-slate-900 transition-colors">Funzionalità</a>
            <a href="/pricing" className="hover:text-slate-900 transition-colors">Prezzi</a>
            <a href="#chi-siamo" className="hover:text-slate-900 transition-colors">Chi siamo</a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://app.repliq.it/login" className="text-sm text-slate-600 px-4 py-2 rounded-full font-semibold hover:text-slate-900 transition-colors">Accedi</a>
            <a href="https://app.repliq.it/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">Inizia gratis →</a>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <a href="https://app.repliq.it/login" className="text-sm text-slate-600 px-3 py-1.5 rounded-full font-semibold">Accedi</a>
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
            <a href="#come-funziona" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 font-medium py-1">Come funziona</a>
            <a href="#funzionalita" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 font-medium py-1">Funzionalità</a>
            <a href="/pricing" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 font-semibold py-1">Prezzi</a>
            <a href="#chi-siamo" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 font-medium py-1">Chi siamo</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-sm text-slate-600 font-medium py-1">FAQ</a>
            <div className="pt-2 border-t border-slate-100">
              <a href="https://app.repliq.it/register" className="block text-center bg-blue-600 text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-blue-700">Inizia gratis →</a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-0 px-6 overflow-hidden min-h-screen flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-blue-50/60 to-white pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[80px] pointer-events-none animate-blob" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-[80px] pointer-events-none animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] bg-sky-200/40 rounded-full blur-[80px] pointer-events-none animate-blob animation-delay-4000" />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50 Q360 10 720 40 Q1080 70 1440 20 L1440 80 L0 80 Z" fill="white"/>
          </svg>
        </div>
        <motion.div className="relative text-center max-w-4xl mx-auto pt-8" variants={stagger} initial="hidden" animate="visible">
          {/* Eyebrow */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-xs font-semibold px-4 py-2 rounded-full mb-8 shadow-sm">
            <span>🏔️</span> Nato sul campo, per chi organizza eventi sportivi
          </motion.div>
          {/* Title */}
          <motion.h1 variants={fadeInUp} className="mb-6 leading-[1.1] tracking-tight">
            <span className="block text-5xl md:text-7xl font-extrabold text-slate-900">Smetti di rispondere</span>
            <span className="block text-5xl md:text-7xl font-extrabold text-slate-900">agli stessi messaggi</span>
            <span className="font-serif-italic text-5xl md:text-7xl text-blue-600">prima di ogni gara.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Repliq risponde ai tuoi partecipanti H24 — più chiaro e veloce di qualsiasi regolamento. Loro trovano subito tutto: percorso, ristori, parcheggi, pettorali, rimborsi. Tu non rispondi più alle stesse domande su WhatsApp, email e social.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-4">
            <a href="https://app.repliq.it/register" className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Prova gratis 14 giorni →</a>
            <a href="#come-funziona" className="bg-white border border-slate-200 text-slate-700 px-8 py-3.5 rounded-full font-semibold text-base hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm">Guarda come funziona</a>
          </motion.div>
          <motion.div variants={fadeIn} className="flex items-center justify-center gap-5 text-sm text-slate-400 mb-14">
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Nessuna carta</span>
            <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Attivo in 5 minuti</span>
          </motion.div>
          {/* Dashboard mockup */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } as object } }}
            className="relative animate-float max-w-3xl mx-auto"
            style={{ willChange: "opacity, transform" }}
          >
            <div className="absolute -inset-4 bg-gradient-to-b from-blue-100/50 to-transparent rounded-3xl blur-xl pointer-events-none" />
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-blue-100 border border-slate-200 overflow-hidden">
              {/* Anteprima badge */}
              <div className="absolute top-3 right-3 z-10 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">🔍 Anteprima</div>
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-yellow-400"/><div className="w-3 h-3 rounded-full bg-emerald-400"/></div>
                <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs text-slate-400 text-center">app.repliq.it/dashboard</div>
              </div>
              <div className="p-5 bg-slate-50/50">
                <div className="flex items-center justify-between mb-5">
                  <div><div className="font-bold text-slate-800 text-sm">Ciao Giacomo 👋</div><div className="text-xs text-slate-400">3 gare attive questa stagione</div></div>
                  <button className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold">+ Nuova gara</button>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { v: "847", l: "Domande totali", c: "text-blue-600", bg: "bg-blue-50" },
                    { v: "94%", l: "Risposte auto.", c: "text-emerald-600", bg: "bg-emerald-50" },
                    { v: "52", l: "Ticket aperti", c: "text-amber-600", bg: "bg-amber-50" },
                    { v: "0", l: "Messaggi persi", c: "text-violet-600", bg: "bg-violet-50" },
                  ].map((s, i) => (
                    <div key={i} className={`${s.bg} rounded-xl p-2.5`}>
                      <div className={`text-lg font-extrabold ${s.c}`}>{s.v}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-tight">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { name: "Trail del Bosco Sacro", date: "15 Jun", questions: 234, active: true, icon: "🏔️" },
                    { name: "Tenno Trail 30km", date: "22 Jun", questions: 156, active: true, icon: "🚴" },
                    { name: "Granfondo Dolomiti", date: "8 Jul", questions: 89, active: false, icon: "⛵" },
                  ].map((r, i) => (
                    <div key={i} className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm flex items-center gap-2">
                      <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-sm flex-shrink-0">{r.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-800 text-xs leading-tight truncate">{r.name}</div>
                        <div className="text-xs text-slate-400">{r.date} · {r.questions} dom.</div>
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0 ${r.active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{r.active ? "✓" : "…"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── COME FUNZIONA ───────────────────────────────────────────────── */}
      <section id="come-funziona" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Come funziona</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Attivo in 5 minuti</h2>
            <p className="text-slate-500 text-lg">Nessuna competenza tecnica richiesta.</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-4 gap-8 relative" variants={stagger} initial="hidden" whileInView="visible" viewport={vp}>
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            {[
              { icon: "📄", title: "Carica i contenuti", desc: "PDF del regolamento, GPX, testo libero. Repliq indicizza tutto con tecnologia RAG." },
              { icon: "🧠", title: "L'AI elabora", desc: "Il sistema RAG recupera solo le informazioni rilevanti — risposte precise, mai inventate." },
              { icon: "🔗", title: "Scegli come condividere", desc: "Pagina pubblica, widget embed sul tuo sito, o QR code per il giorno della gara." },
              { icon: "💬", title: "I partecipanti chiedono H24", desc: "Il chatbot risponde in qualsiasi lingua. Le domande senza risposta diventano ticket per te." },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeInUp} className="flex flex-col items-center text-center relative">
                <div className="w-20 h-20 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-5 relative z-10">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center justify-center">{i + 1}</span>
                </div>
                <h3 className="font-bold text-base mb-2 text-slate-900">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MAPPA GPX ───────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),_transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
            <span className="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-blue-500/30">Differenziatore verticale</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight">Il percorso che parla<br />ai tuoi atleti</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">Non solo risposte testuali. Repliq mostra la mappa interattiva del percorso con ogni ristoro e punto chiave georeferenziato. Una cosa che nessun chatbot generico può fare.</p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Mappa SVG */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                <div className="bg-slate-700/50 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-200">🗺️ Tenno Trail 30km</span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block animate-pulse"></span>
                  </div>
                  <div className="flex gap-2 text-xs text-slate-400">
                    <span className="bg-slate-700 px-2 py-1 rounded">↑ 1.840m</span>
                    <span className="bg-slate-700 px-2 py-1 rounded">30 km</span>
                  </div>
                </div>
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-2">
                  <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" className="w-full rounded-lg">
                    <defs>
                      <linearGradient id="terrain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6"/>
                        <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9"/>
                      </linearGradient>
                    </defs>
                    <rect width="500" height="300" fill="url(#terrain)" rx="8"/>
                    <g stroke="#334155" strokeWidth="0.5" opacity="0.4">
                      <line x1="0" y1="60" x2="500" y2="60"/><line x1="0" y1="120" x2="500" y2="120"/>
                      <line x1="0" y1="180" x2="500" y2="180"/><line x1="0" y1="240" x2="500" y2="240"/>
                      <line x1="100" y1="0" x2="100" y2="300"/><line x1="200" y1="0" x2="200" y2="300"/>
                      <line x1="300" y1="0" x2="300" y2="300"/><line x1="400" y1="0" x2="400" y2="300"/>
                    </g>
                    {/* Track shadow */}
                    <path d="M 40 220 C 70 200 90 160 120 140 C 150 120 160 100 190 90 C 220 80 230 70 260 80 C 290 90 300 110 320 100 C 340 90 360 110 390 130 C 420 150 440 170 460 200" stroke="#1d4ed8" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.3"/>
                    {/* Animated GPX track */}
                    <motion.path
                      d="M 40 220 C 70 200 90 160 120 140 C 150 120 160 100 190 90 C 220 80 230 70 260 80 C 290 90 300 110 320 100 C 340 90 360 110 390 130 C 420 150 440 170 460 200"
                      stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }} transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
                    />
                    {/* Start */}
                    <circle cx="40" cy="220" r="8" fill="#10b981" stroke="white" strokeWidth="2"/>
                    <text x="52" y="225" fill="white" fontSize="9" fontWeight="bold">PARTENZA</text>
                    {/* Ristoro km 10 */}
                    <circle cx="160" cy="105" r="7" fill="#f59e0b" stroke="white" strokeWidth="2"/>
                    <text x="170" y="100" fill="#fbbf24" fontSize="8" fontWeight="bold">🥤 km 10</text>
                    {/* Ristoro km 18 */}
                    <circle cx="280" cy="75" r="7" fill="#f59e0b" stroke="white" strokeWidth="2"/>
                    <text x="290" y="70" fill="#fbbf24" fontSize="8" fontWeight="bold">🥤 km 18</text>
                    {/* Medical */}
                    <circle cx="370" cy="118" r="6" fill="#ef4444" stroke="white" strokeWidth="2"/>
                    <text x="380" y="113" fill="#fca5a5" fontSize="8">⚕️ km 25</text>
                    {/* Finish */}
                    <circle cx="460" cy="200" r="8" fill="#8b5cf6" stroke="white" strokeWidth="2"/>
                    <text x="440" y="215" fill="white" fontSize="9" fontWeight="bold">ARRIVO</text>
                    {/* Elevation mini-chart */}
                    <rect x="10" y="250" width="480" height="40" fill="#0f172a" rx="4"/>
                    <polyline points="10,285 60,270 100,255 140,248 180,242 220,238 260,244 290,252 320,248 360,258 400,268 440,275 480,278" stroke="#3b82f6" strokeWidth="2" fill="none"/>
                    <polyline points="10,285 60,270 100,255 140,248 180,242 220,238 260,244 290,252 320,248 360,258 400,268 440,275 480,278 480,290 10,290" fill="#1d4ed8" opacity="0.3"/>
                    <text x="15" y="288" fontSize="7" fill="#475569">Profilo altimetrico</text>
                  </svg>
                </div>
                <div className="px-4 py-3 flex flex-wrap gap-4 text-xs text-slate-400 border-t border-slate-700/50">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> Partenza</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span> Ristori (2)</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Pronto soccorso</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-violet-500 inline-block"></span> Arrivo</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: "🗺️", title: "Traccia GPX", sub: "con dislivello e km progressivi" },
                  { icon: "🥤", title: "Ristori", sub: "con dotazione e orari" },
                  { icon: "📍", title: "Punti chiave", sub: "georeferenziati, apertura Maps" },
                  { icon: "📊", title: "Profilo altimetrico", sub: "interattivo nella chat" },
                ].map((f, i) => (
                  <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 flex items-start gap-2">
                    <span className="text-lg">{f.icon}</span>
                    <div><p className="text-sm font-semibold text-white">{f.title}</p><p className="text-xs text-slate-400">{f.sub}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>
            {/* Chat demo */}
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden text-slate-900">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">🏔️</div>
                  <div>
                    <p className="text-white font-bold text-sm">Trail delle Dolomiti</p>
                    <p className="text-blue-200 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"></span> Assistente attivo</p>
                  </div>
                </div>
                <motion.div className="p-4 flex flex-col gap-3 bg-slate-50/50 min-h-[320px]" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  {[
                    { from: "user", text: "Dove trovo il ristoro al km 18?" },
                    { from: "bot", text: "Al km 18 (Malga Tovre, 1.640m) trovi: acqua, Coca-Cola, sali minerali, frutta fresca e brodo caldo. Apre alle 8:30. 🥤", link: "📍 Vedi sulla mappa" },
                    { from: "user", text: "Quanto dislivello c'è tra il km 10 e 20?" },
                    { from: "bot", text: "Tra il km 10 e il km 20 il dislivello positivo è di circa 680m — il tratto più impegnativo del percorso. 📊" },
                    { from: "user", text: "C'è assistenza medica sul percorso?" },
                    { from: "bot", text: "Sì — presidio medico al km 25 (Bivio Altissimo) con medico sportivo e defibrillatore. In zona partenza/arrivo c'è ambulanza H24. ⚕️" },
                  ].map((msg, i) => (
                    <motion.div key={i} variants={fadeInUp} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`text-sm px-4 py-2.5 rounded-2xl max-w-[85%] ${msg.from === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-sm"}`}>
                        {msg.text}
                        {"link" in msg && <div className="text-blue-600 text-xs underline mt-1">{msg.link}</div>}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <div className="mt-5 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5">
                <p className="text-blue-300 font-bold text-sm mb-1">🎯 Questo è il differenziatore</p>
                <p className="text-slate-300 text-sm leading-relaxed">Un chatbot generico non conosce i tuoi ristori, il tuo tracciato GPX, i tuoi parcheggi. Repliq è costruito verticalmente per lo sport — e si vede.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD INTERATTIVA ───────────────────────────────────────── */}
      <section id="dashboard" className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">La tua dashboard</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Tutto sotto controllo,<br />in un colpo d&apos;occhio</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Esplora la dashboard — dati di esempio, aggiornati ogni edizione.</p>
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp} className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-5 py-3 flex items-center justify-between">
              <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-400"/><div className="w-3 h-3 rounded-full bg-yellow-400"/><div className="w-3 h-3 rounded-full bg-emerald-400"/></div>
              <span className="text-slate-400 text-xs font-medium hidden sm:inline">app.repliq.it/dashboard — Tenno Trail 2026</span>
              <span className="text-slate-400 text-xs font-medium sm:hidden">Tenno Trail 2026</span>
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">🔍 Anteprima</span>
            </div>
            {/* Tabs */}
            <div className="border-b border-slate-100 px-6 flex gap-6 overflow-x-auto">
              {(["overview", "questions", "tickets", "analytics"] as TabId[]).map((tab) => {
                const labels: Record<TabId, string> = { overview: "Panoramica", questions: "Domande", tickets: "Ticket", analytics: "Analytics AI" };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 text-sm font-semibold border-b-2 -mb-px whitespace-nowrap transition-colors ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-700"}`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>
            {/* Tab panels */}
            <div className="p-6">
              {activeTab === "overview" && (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { v: "847", l: "Domande totali", c: "text-blue-600", bg: "bg-blue-50" },
                      { v: "94%", l: "Risolte in autonomia", c: "text-emerald-600", bg: "bg-emerald-50" },
                      { v: "52", l: "Ticket aperti", c: "text-amber-600", bg: "bg-amber-50" },
                      { v: "4.2s", l: "Tempo medio risposta", c: "text-violet-600", bg: "bg-violet-50" },
                    ].map((s, i) => (
                      <div key={i} className={`${s.bg} rounded-xl p-4 text-center`}>
                        <div className={`text-3xl font-extrabold ${s.c} mb-1`}>{s.v}</div>
                        <div className="text-xs text-slate-500">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Attività ultimi 7 giorni</p>
                    <div className="flex items-end gap-2 h-20">
                      {[40, 65, 50, 90, 75, 100, 60].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <motion.div
                            className="bg-blue-500 rounded-t w-full"
                            initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07 }}
                          />
                          <span className="text-xs text-slate-400">{["Lun","Mar","Mer","Gio","Ven","Sab","Dom"][i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "questions" && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Domande più frequenti</p>
                  <div className="flex flex-col gap-3">
                    {[
                      { q: "Dove parcheggio?", n: 142, pct: 100, c: "bg-blue-500" },
                      { q: "Orario partenza?", n: 98, pct: 69, c: "bg-blue-400" },
                      { q: "Materiale obbligatorio?", n: 87, pct: 61, c: "bg-violet-500" },
                      { q: "Ritiro pettorale?", n: 71, pct: 50, c: "bg-violet-400" },
                      { q: "Ristori km 18?", n: 54, pct: 38, c: "bg-indigo-400" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-sm text-slate-700 font-medium w-48 flex-shrink-0">{item.q}</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full">
                          <motion.div className={`h-2 ${item.c} rounded-full`} initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }} />
                        </div>
                        <span className="text-xs text-slate-400 w-8 text-right">{item.n}x</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "tickets" && (
                <div className="flex flex-col gap-3">
                  {[
                    { q: "Come faccio il rimborso?", status: "Risolto", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                    { q: "Posso cambiare categoria?", status: "In risposta", color: "bg-amber-50 text-amber-700 border-amber-100" },
                    { q: "Assistenza medica al km 15?", status: "Aperto", color: "bg-red-50 text-red-600 border-red-100" },
                    { q: "Dove lascio la bici?", status: "Risolto", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                  ].map((t, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 flex items-center justify-between border border-slate-100 shadow-sm">
                      <span className="text-sm text-slate-700 font-medium">{t.q}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${t.color}`}>{t.status}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "analytics" && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">⚠️ Lacune nel regolamento</p>
                    <div className="flex flex-col gap-2">
                      {[
                        "Come si fa il rimborso iscrizione?",
                        "C'è assistenza medica al km 20?",
                        "Parcheggio per camper?",
                      ].map((q, i) => (
                        <div key={i} className="bg-red-50 border border-red-100 rounded-lg px-3 py-2.5 text-sm text-slate-700 flex items-center justify-between">
                          <span>{q}</span><span className="text-xs text-red-500 font-bold ml-2 whitespace-nowrap">Non nel reg.</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-3">🧠 Domande frequenti</p>
                    <div className="flex flex-col gap-2">
                      {["Posso cambiare categoria?", "Dove lascio la bici?"].map((q, i) => (
                        <div key={i} className="bg-violet-50 border border-violet-100 rounded-lg px-3 py-2.5 text-sm text-slate-700 flex items-center justify-between">
                          <span>{q}</span><span className="text-xs text-violet-600 font-bold ml-2 whitespace-nowrap">Domanda freq.</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mt-4">
                      <p className="text-xs font-bold text-emerald-700 mb-1">✅ Ogni edizione miglioramento automatico</p>
                      <p className="text-xs text-emerald-600 leading-relaxed">I ticket di questa edizione diventano risposte pronte alla prossima. Meno WhatsApp, meno email, organizzazione sempre più fluida.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COSA POSSONO CHIEDERE ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Per i partecipanti</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Cosa possono chiedere<br />i tuoi partecipanti</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Tutto ciò che normalmente ti arriva su WhatsApp, email e social — risposto in automatico, H24.</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-5" variants={stagger} initial="hidden" whileInView="visible" viewport={vp}>
            {QA_CATEGORIES.map((cat, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-bold text-slate-900">{cat.title}</h3>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  {cat.messages.map((msg, j) => (
                    <div key={j} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`px-3 py-1.5 rounded-xl max-w-[90%] leading-snug ${"ticket" in msg && msg.ticket ? "bg-amber-50 border border-amber-100 text-slate-700" : msg.from === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-slate-100 text-slate-700 rounded-bl-sm"}`}>
                        {msg.text}
                        {"ticket" in msg && msg.ticket && <span className="text-amber-600 font-semibold"> → Ticket aperto</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
            {/* Callout chiusura */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-5 border border-blue-100 flex flex-col justify-center">
              <p className="font-bold text-slate-900 text-base mb-3">E se non sa rispondere?</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Diventa un ticket. L&apos;organizzatore risponde in un click. Dall&apos;edizione successiva, Repliq saprà rispondere da solo.</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">→</span>
                <span>Zero domande perse, ogni edizione più autonomo</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FUNZIONALITÀ ────────────────────────────────────────────────── */}
      <section id="funzionalita" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Funzionalità</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Un assistente completo</h2>
            <p className="text-slate-500 text-lg">Non solo un chatbot — tutta la comunicazione con i partecipanti.</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-6" variants={staggerFast} initial="hidden" whileInView="visible" viewport={vp}>
            {FEATURES.map((f, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{f.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-base text-slate-900">{f.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${f.violet ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700"}`}>{f.tag}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DISTRIBUZIONE ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Distribuzione</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">3 modi per raggiungere<br />i tuoi partecipanti</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Scegli come condividere il chatbot — o usali tutti e tre insieme.</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={vp}>
            {[
              { gradient: "from-indigo-500 to-violet-600", icon: "💬", title: "Widget bolla", sub: "Sul tuo sito web", desc: "Aggiungi una riga di codice al tuo sito. Appare una bolla nell'angolo — i visitatori la cliccano e chattano senza uscire dalla pagina.", tags: [], code: true, tagStyle: "" },
              { gradient: "from-blue-500 to-blue-700", icon: "📱", title: "QR Code", sub: "Stampa ovunque", desc: "Scarica il QR code e stampalo sulla locandina, mappa cartacea, pettorale o banner. I partecipanti lo scansionano e sono subito nel chatbot.", tags: ["📄 Locandina", "🗺️ Mappa gara", "🏃 Pettorale", "📢 Banner"], code: false, tagStyle: "bg-blue-50 text-blue-700" },
              { gradient: "from-emerald-500 to-teal-600", icon: "🔗", title: "Link diretto", sub: "Ovunque tu voglia", desc: "Copia il link e incollalo nell'email di conferma iscrizione, WhatsApp, Telegram, Instagram bio o sito della gara.", tags: ["📧 Email iscrizione", "💬 WhatsApp", "📸 Instagram", "🌐 Sito gara"], code: false, tagStyle: "bg-emerald-50 text-emerald-700" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`bg-gradient-to-br ${item.gradient} p-6 relative overflow-hidden`}>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-3">{item.icon}</div>
                    <div className="text-white font-bold text-lg">{item.title}</div>
                    <div className="text-white/70 text-sm mt-1">{item.sub}</div>
                  </div>
                  {i === 1 && (
                    <div className="mt-4 flex justify-center">
                      <div className="bg-white rounded-xl p-2 w-16 h-16 grid grid-cols-3 gap-0.5">
                        {[1,1,1,1,0,1,1,1,1].map((v, j) => <div key={j} className={`rounded-sm ${v ? "bg-gray-900" : "bg-white"}`}/>)}
                      </div>
                    </div>
                  )}
                  {i === 2 && <div className="mt-4 bg-white/15 rounded-xl p-2 font-mono text-xs text-white/90 truncate">app.repliq.it/chat/tenno-trail</div>}
                </div>
                <div className="p-5">
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                  {item.code ? (
                    <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-emerald-400">
                      <span className="text-slate-500">&lt;!-- Repliq Widget --&gt;</span><br/>
                      <span className="text-blue-400">&lt;script</span> <span className="text-yellow-400">src=</span><span className="text-emerald-400">&quot;repliq.it/widget.js&quot;</span><span className="text-blue-400">/&gt;</span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((t, j) => <span key={j} className={`text-xs px-2 py-1 rounded-full font-medium ${item.tagStyle}`}>{t}</span>)}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CHI SIAMO ───────────────────────────────────────────────────── */}
      <section id="chi-siamo" className="py-24 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Chi siamo</p>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-slate-900">Nato sul campo,<br />costruito per chi organizza</h2>
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp} className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-10 border border-blue-100 max-w-2xl mx-auto">
            <p className="text-slate-700 leading-relaxed text-base mb-6">
              Repliq nasce da chi le gare le ha vissute dall&apos;interno — come atleta e appassionato di sport e tecnologia. Conosciamo il caos della comunicazione pre-gara. Abbiamo costruito Repliq per risolverlo.
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              Oggi siamo all&apos;inizio, con una visione chiara: diventare lo strumento di riferimento per la comunicazione negli eventi sportivi in Italia. Strumento concreto, non fumoso — costruito con chi organizza, non solo per chi organizza.
            </p>
            <div className="flex flex-wrap gap-2">
              {SPORTS.map((s, i) => (
                <span key={i} className="bg-white text-slate-600 text-xs px-3 py-1.5 rounded-full border border-blue-100 font-medium hover:border-blue-300 hover:text-blue-700 transition-colors cursor-default">{s}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PREZZI ──────────────────────────────────────────────────────── */}
      <section id="prezzi" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">Prezzi</p>
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-slate-900">Semplice e trasparente</h2>
            <p className="text-slate-500 mb-4">Nessun costo nascosto. Paghi solo quello che usi.</p>
            <div className="mb-10"><a href="/pricing" className="text-blue-600 font-semibold hover:underline text-sm">Vedi il confronto completo →</a></div>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" variants={stagger} initial="hidden" whileInView="visible" viewport={vp}>
            {[
              { name: "Gara Singola", price: "€19", period: "/evento", desc: "Perfetto per provare Repliq su una singola gara.", highlight: false, cta: "Inizia ora →" },
              { name: "Stagione Base", price: "€79", period: "/anno", desc: "Gare illimitate per tutta la stagione sportiva.", highlight: false, cta: "Inizia ora →" },
              { name: "Stagione Pro", price: "€149", period: "/anno", desc: "Ticketing, email, analytics AI. Tutto incluso.", highlight: true, cta: "Inizia ora →" },
              { name: "Federazione", price: "€299", period: "/anno", desc: "Multi-organizzazione, white label e supporto dedicato.", highlight: false, cta: "Contattaci →" },
            ].map((plan, i) => (
              <motion.div key={i} variants={fadeInUp} className={`rounded-2xl p-6 flex flex-col relative border-2 transition-transform ${plan.highlight ? "border-blue-500 shadow-xl shadow-blue-100 scale-[1.03] bg-white" : "border-slate-100 bg-white shadow-sm"}`}>
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">⚡ Più scelto</div>
                )}
                <h3 className="font-bold text-base mb-1 text-slate-900">{plan.name}</h3>
                <div className="mb-2"><span className="text-3xl font-extrabold text-slate-900">{plan.price}</span><span className="text-slate-400 text-sm">{plan.period}</span></div>
                <p className="text-slate-500 text-sm mb-5 flex-1 leading-relaxed">{plan.desc}</p>
                <a href="https://app.repliq.it/register" className={`block text-center py-2.5 rounded-xl text-sm font-bold transition-colors ${plan.highlight ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{plan.cta}</a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EARLY ACCESS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 via-violet-50/40 to-white">
        <motion.div className="max-w-2xl mx-auto text-center" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
          <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-emerald-200">🌱 Early stage — selezione aperta</span>
          <h2 className="text-4xl font-extrabold tracking-tight mb-5 text-slate-900">Stiamo cercando i primi organizzatori</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Repliq è appena nato. Stiamo selezionando i primi <strong className="text-slate-900">10 organizzatori in Italia</strong> che vogliono provarlo gratis sulla prossima gara, in cambio di un feedback onesto.
          </p>
          <p className="text-slate-500 mb-10 leading-relaxed">Se organizzi una gara di trail, corsa, ciclismo o triathlon, scrivici. Non promettiamo la luna — promettiamo di lavorare insieme per rendere la tua gara più fluida.</p>
          <a href="mailto:info@repliq.it?subject=Early tester Repliq" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Candidati come early tester →</a>
          <p className="text-slate-400 text-sm mt-4">Nessun impegno. Solo una gara di test e il tuo feedback onesto.</p>
        </motion.div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div className="text-center mb-12" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Domande frequenti</h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-4 font-semibold text-sm flex justify-between items-center hover:bg-slate-50 transition-colors gap-4 text-slate-900">
                  <span>{faq.q}</span>
                  <span className={`text-blue-500 flex-shrink-0 text-xl transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-100/80 to-violet-50 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/50 rounded-full blur-[80px] pointer-events-none animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-200/40 rounded-full blur-[80px] pointer-events-none animate-blob animation-delay-2000" />
        <motion.div className="relative text-center max-w-2xl mx-auto" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={vp}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-slate-900">La tua prossima gara,</h2>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight"><span className="font-serif-italic text-blue-600">senza il caos dei messaggi.</span></h2>
          <p className="text-slate-500 text-lg mb-10">Configura Repliq in 5 minuti. I tuoi partecipanti trovano tutto da soli — tu pensi alla gara.</p>
          <motion.a href="https://app.repliq.it/register" className="inline-block bg-blue-600 text-white px-10 py-4 rounded-full font-extrabold text-lg hover:bg-blue-700 transition-colors shadow-xl shadow-blue-200" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            Inizia gratis 14 giorni →
          </motion.a>
          <p className="text-slate-400 text-sm mt-4">Nessuna carta di credito richiesta</p>
        </motion.div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span style={{ fontFamily: "var(--font-plus-jakarta, sans-serif)" }} className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Repliq</span>
            <p className="text-slate-400 text-sm">Il chatbot AI per organizzatori di eventi sportivi</p>
          </div>
          <div className="flex items-center gap-8 text-sm text-slate-400">
            <a href="#come-funziona" className="hover:text-blue-600 transition-colors">Come funziona</a>
            <a href="/pricing" className="hover:text-blue-600 transition-colors">Prezzi</a>
            <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Repliq · <a href="/privacy" className="hover:text-blue-500 transition-colors">Privacy</a> · <a href="/termini" className="hover:text-blue-500 transition-colors">Termini</a></p>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ───────────────────────────────────────────────── */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Torna su"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-200 flex items-center justify-center hover:bg-blue-700 transition-colors"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8, pointerEvents: showScrollTop ? "auto" : "none" }}
        transition={{ duration: 0.2 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>

    </main>
  );
}
