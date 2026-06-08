export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-24">
      <a href="/" className="text-sm text-blue-600 hover:underline mb-8 inline-block">← Torna alla home</a>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-slate-400 text-sm mb-10">Ultimo aggiornamento: Giugno 2026</p>

      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
        <p>
          Repliq (<strong>repliq.it</strong>) è un servizio SaaS fornito da Giacomo Nalesso. Questa pagina descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali in conformità al Regolamento (UE) 2016/679 (GDPR).
        </p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Titolare del trattamento</h2>
        <p>Giacomo Nalesso · giacomonalesso93@gmail.com</p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Dati raccolti</h2>
        <p>Raccogliamo i dati necessari per erogare il servizio: nome, email, dati di accesso degli organizzatori; testo delle domande inviate dai partecipanti al chatbot (non associato a dati identificativi).</p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Finalità del trattamento</h2>
        <p>I dati sono trattati per: erogare il servizio Repliq, inviare comunicazioni operative (conferma registrazione, ticket), migliorare il prodotto tramite analytics aggregate.</p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Conservazione dei dati</h2>
        <p>I dati sono conservati su server europei (Supabase EU). Non vengono ceduti a terze parti, salvo fornitori tecnici strettamente necessari all&apos;erogazione del servizio (Anthropic per l&apos;elaborazione AI, OpenAI per gli embeddings).</p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Diritti dell&apos;utente</h2>
        <p>Hai diritto di accedere, rettificare, cancellare i tuoi dati e opporti al trattamento. Scrivi a giacomonalesso93@gmail.com per esercitare questi diritti.</p>

        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-3">Cookie</h2>
        <p>Repliq utilizza cookie tecnici essenziali per il funzionamento del servizio. Non utilizziamo cookie di profilazione o advertising.</p>
      </div>
    </main>
  );
}
