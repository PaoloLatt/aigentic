import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — AgentForge",
  description:
    "Informativa sulla privacy e sul trattamento dei dati personali di AgentForge, conforme al GDPR e alla normativa italiana.",
  robots: { index: true, follow: true },
};

const sections = [
  { id: "titolare", label: "Titolare del trattamento" },
  { id: "dati", label: "Tipologie di dati raccolti" },
  { id: "finalita", label: "Finalità del trattamento" },
  { id: "base-giuridica", label: "Base giuridica" },
  { id: "cookie", label: "Cookie utilizzati" },
  { id: "condivisione", label: "Condivisione dei dati" },
  { id: "conservazione", label: "Periodo di conservazione" },
  { id: "diritti", label: "Diritti dell'interessato" },
  { id: "sicurezza", label: "Sicurezza" },
  { id: "modifiche", label: "Modifiche alla Privacy Policy" },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-12">
      <h2 className="text-xl font-bold text-text-primary mb-4 pb-3 border-b border-border">
        {title}
      </h2>
      <div className="space-y-4 text-text-secondary leading-[1.8] text-[15px]">
        {children}
      </div>
    </section>
  );
}

function CookieTable({
  cookies,
}: {
  cookies: {
    name: string;
    provider: string;
    purpose: string;
    duration: string;
    type: string;
  }[];
}) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-surface-alt">
            <th className="text-left px-4 py-2.5 text-text-tertiary font-mono text-xs uppercase tracking-wider border border-border">
              Cookie
            </th>
            <th className="text-left px-4 py-2.5 text-text-tertiary font-mono text-xs uppercase tracking-wider border border-border">
              Provider
            </th>
            <th className="text-left px-4 py-2.5 text-text-tertiary font-mono text-xs uppercase tracking-wider border border-border">
              Finalità
            </th>
            <th className="text-left px-4 py-2.5 text-text-tertiary font-mono text-xs uppercase tracking-wider border border-border">
              Durata
            </th>
            <th className="text-left px-4 py-2.5 text-text-tertiary font-mono text-xs uppercase tracking-wider border border-border">
              Tipo
            </th>
          </tr>
        </thead>
        <tbody>
          {cookies.map((c, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-surface" : "bg-surface-alt"}>
              <td className="px-4 py-2.5 font-mono text-xs text-text-primary border border-border">
                {c.name}
              </td>
              <td className="px-4 py-2.5 text-xs text-text-secondary border border-border">
                {c.provider}
              </td>
              <td className="px-4 py-2.5 text-xs text-text-secondary border border-border">
                {c.purpose}
              </td>
              <td className="px-4 py-2.5 text-xs text-text-secondary border border-border whitespace-nowrap">
                {c.duration}
              </td>
              <td className="px-4 py-2.5 text-xs text-text-secondary border border-border">
                {c.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-section-alt">
        <div className="max-w-[900px] mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-text-primary font-bold hover:text-accent-blue transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            AgentForge
          </Link>
          <Link
            href="/"
            className="text-text-secondary text-sm hover:text-text-primary transition-colors"
          >
            ← Torna al sito
          </Link>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <span className="text-accent-blue font-mono text-sm uppercase tracking-wider">
            Legale
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-3">
            Privacy Policy
          </h1>
          <p className="text-text-secondary">
            Ultima modifica: 29 aprile 2026 · Versione 1.0
          </p>
        </div>

        <div className="lg:flex lg:gap-12">
          {/* Table of contents — sticky sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-8">
              <p className="text-text-tertiary text-xs font-mono uppercase tracking-wider mb-3">
                Indice
              </p>
              <nav className="space-y-1">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-start gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors py-1"
                  >
                    <span className="text-text-tertiary font-mono text-xs mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* 1 */}
            <Section id="titolare" title="1. Titolare del trattamento">
              <p>
                Il titolare del trattamento dei dati personali è{" "}
                <strong className="text-text-primary">AgentForge</strong>, con
                sede in <em>[Indirizzo]</em>, P.IVA{" "}
                <em>[P.IVA]</em>.
              </p>
              <p>
                Per qualsiasi richiesta relativa alla privacy:{" "}
                <a
                  href="mailto:privacy@agentforge.it"
                  className="text-accent-blue hover:underline"
                >
                  privacy@agentforge.it
                </a>
              </p>
            </Section>

            {/* 2 */}
            <Section id="dati" title="2. Tipologie di dati raccolti">
              <p>
                <strong className="text-text-primary">
                  Dati forniti volontariamente
                </strong>{" "}
                — quando compili il modulo di contatto raccogliamo: nome e
                cognome, indirizzo email aziendale, nome dell'azienda, area di
                interesse, messaggio libero.
              </p>
              <p>
                <strong className="text-text-primary">
                  Dati raccolti automaticamente
                </strong>{" "}
                — durante la navigazione raccogliamo: indirizzo IP (anonimizzato
                dopo 90 giorni), pagine visitate, durata sessione, tipo di
                dispositivo e browser, fonte di traffico (UTM). Questi dati
                vengono raccolti solo previo consenso esplicito.
              </p>
              <p>
                <strong className="text-text-primary">
                  Cookie e tecnologie simili
                </strong>{" "}
                — utilizziamo cookie tecnici (necessari) e, previo consenso,
                cookie di analisi, marketing e funzionali. Vedi la{" "}
                <a href="#cookie" className="text-accent-blue hover:underline">
                  sezione Cookie
                </a>{" "}
                per i dettagli.
              </p>
            </Section>

            {/* 3 */}
            <Section id="finalita" title="3. Finalità del trattamento">
              <div className="space-y-3">
                <div>
                  <p className="text-text-primary font-medium mb-1">
                    a) Erogazione del servizio
                  </p>
                  <p>
                    Rispondere alle richieste di contatto, gestire la consulenza
                    preliminare, inviare preventivi e materiali informativi
                    richiesti dall'utente.
                  </p>
                </div>
                <div>
                  <p className="text-text-primary font-medium mb-1">
                    b) Analisi e miglioramento del sito
                  </p>
                  <p>
                    Analizzare il comportamento degli utenti per migliorare
                    l'esperienza di navigazione e l'efficacia dei contenuti.
                    Solo previo consenso esplicito.
                  </p>
                </div>
                <div>
                  <p className="text-text-primary font-medium mb-1">
                    c) Marketing e pubblicità
                  </p>
                  <p>
                    Mostrare annunci pertinenti su piattaforme terze (Google,
                    Meta, LinkedIn) e misurare le conversioni. Solo previo
                    consenso esplicito.
                  </p>
                </div>
                <div>
                  <p className="text-text-primary font-medium mb-1">
                    d) Adempimenti di legge
                  </p>
                  <p>
                    Rispettare obblighi normativi, fiscali e contabili previsti
                    dalla legge italiana e dall'ordinamento UE.
                  </p>
                </div>
              </div>
            </Section>

            {/* 4 */}
            <Section id="base-giuridica" title="4. Base giuridica">
              <ul className="space-y-2 list-none">
                {[
                  [
                    "Consenso (Art. 6(1)(a) GDPR)",
                    "cookie non essenziali, comunicazioni di marketing, analisi comportamentale.",
                  ],
                  [
                    "Esecuzione contrattuale (Art. 6(1)(b) GDPR)",
                    "rispondere a richieste di contatto e gestire la relazione precontrattuale.",
                  ],
                  [
                    "Legittimo interesse (Art. 6(1)(f) GDPR)",
                    "sicurezza del sito, prevenzione frodi, analisi aggregata anonima.",
                  ],
                  [
                    "Obbligo legale (Art. 6(1)(c) GDPR)",
                    "adempimenti fiscali, normativi e contabili.",
                  ],
                ].map(([base, desc]) => (
                  <li key={base} className="flex gap-2">
                    <span className="text-accent-blue mt-1.5 flex-shrink-0">›</span>
                    <span>
                      <strong className="text-text-primary">{base}</strong> —{" "}
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* 5 */}
            <Section id="cookie" title="5. Cookie utilizzati">
              <p>
                Puoi modificare le tue preferenze cookie in qualsiasi momento
                cliccando su &quot;Gestisci cookie&quot; nel footer del sito.
              </p>

              <div className="space-y-6 mt-2">
                <div>
                  <h3 className="text-text-primary font-semibold mb-1">
                    Cookie necessari
                  </h3>
                  <p className="text-sm mb-2">
                    Indispensabili per il funzionamento del sito. Non possono
                    essere disattivati.
                  </p>
                  <CookieTable
                    cookies={[
                      {
                        name: "cookie_consent",
                        provider: "AgentForge",
                        purpose: "Salva le preferenze cookie",
                        duration: "365 giorni",
                        type: "First party",
                      },
                      {
                        name: "admin_auth",
                        provider: "AgentForge",
                        purpose: "Sessione autenticata admin",
                        duration: "7 giorni",
                        type: "First party",
                      },
                    ]}
                  />
                </div>

                <div>
                  <h3 className="text-text-primary font-semibold mb-1">
                    Cookie di analisi
                  </h3>
                  <p className="text-sm mb-2">
                    Utilizzati per comprendere come gli utenti navigano il sito
                    (Google Analytics 4 via GTM). I dati sono anonimi.
                  </p>
                  <CookieTable
                    cookies={[
                      {
                        name: "_ga",
                        provider: "Google Analytics",
                        purpose: "Distingue utenti unici",
                        duration: "2 anni",
                        type: "First party",
                      },
                      {
                        name: "_ga_*",
                        provider: "Google Analytics",
                        purpose: "Mantiene lo stato della sessione GA4",
                        duration: "2 anni",
                        type: "First party",
                      },
                      {
                        name: "_gid",
                        provider: "Google Analytics",
                        purpose: "Distingue gli utenti durante la giornata",
                        duration: "24 ore",
                        type: "First party",
                      },
                    ]}
                  />
                </div>

                <div>
                  <h3 className="text-text-primary font-semibold mb-1">
                    Cookie di marketing
                  </h3>
                  <p className="text-sm mb-2">
                    Utilizzati per mostrare annunci pertinenti e misurare le
                    conversioni su piattaforme pubblicitarie.
                  </p>
                  <CookieTable
                    cookies={[
                      {
                        name: "_fbp",
                        provider: "Meta (Facebook)",
                        purpose: "Traccia visite per Facebook Ads",
                        duration: "3 mesi",
                        type: "Third party",
                      },
                      {
                        name: "_fbc",
                        provider: "Meta (Facebook)",
                        purpose: "Memorizza il click identifier",
                        duration: "3 mesi",
                        type: "Third party",
                      },
                      {
                        name: "_gcl_au",
                        provider: "Google Ads",
                        purpose: "Traccia conversioni Google Ads",
                        duration: "3 mesi",
                        type: "Third party",
                      },
                      {
                        name: "li_sugr",
                        provider: "LinkedIn",
                        purpose: "Tracciamento per LinkedIn Ads",
                        duration: "3 mesi",
                        type: "Third party",
                      },
                    ]}
                  />
                </div>

                <div>
                  <h3 className="text-text-primary font-semibold mb-1">
                    Cookie funzionali
                  </h3>
                  <p className="text-sm mb-2">
                    Abilitano funzionalità aggiuntive come la chat e il booking.
                  </p>
                  <CookieTable
                    cookies={[
                      {
                        name: "__hs*",
                        provider: "HubSpot",
                        purpose: "Tracciamento e analisi HubSpot CRM",
                        duration: "vari",
                        type: "Third party",
                      },
                      {
                        name: "__cfruid",
                        provider: "Calendly",
                        purpose: "Identifica la sessione Calendly",
                        duration: "Sessione",
                        type: "Third party",
                      },
                    ]}
                  />
                </div>
              </div>
            </Section>

            {/* 6 */}
            <Section id="condivisione" title="6. Condivisione dei dati">
              <p>
                I dati personali non vengono venduti. Vengono condivisi
                esclusivamente con i seguenti fornitori di servizi, nell'ambito
                delle finalità indicate:
              </p>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface-alt">
                      {["Fornitore", "Finalità", "Paese", "Base trasferimento"].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left px-4 py-2.5 text-text-tertiary font-mono text-xs uppercase tracking-wider border border-border"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Google (Analytics, Ads, GTM)", "Analisi, advertising", "USA", "EU-US DPF"],
                      ["Meta (Facebook Pixel)", "Advertising", "USA", "EU-US DPF"],
                      ["LinkedIn", "Advertising B2B", "USA", "EU-US DPF"],
                      ["HubSpot", "CRM, email marketing", "USA", "EU-US DPF"],
                      ["Supabase", "Database", "UE (Frankfurt)", "Art. 45 GDPR"],
                      ["Resend", "Email transazionali", "USA", "EU-US DPF"],
                      ["Calendly", "Prenotazioni", "USA", "EU-US DPF"],
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-surface" : "bg-surface-alt"}
                      >
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className="px-4 py-2.5 text-xs text-text-secondary border border-border"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-3">
                I trasferimenti di dati verso gli USA avvengono sulla base del
                EU-US Data Privacy Framework (DPF), riconosciuto adeguato dalla
                Commissione Europea con decisione del 10 luglio 2023.
              </p>
            </Section>

            {/* 7 */}
            <Section id="conservazione" title="7. Periodo di conservazione">
              <ul className="space-y-2 list-none">
                {[
                  ["Dati di contatto (lead)", "24 mesi dall'ultimo contatto, poi anonimizzati"],
                  ["Cookie di analisi", "Massimo 26 mesi (Google Analytics)"],
                  ["Cookie di marketing", "Massimo 13 mesi"],
                  ["Log dei consensi cookie", "5 anni (obbligo di prova del consenso GDPR)"],
                  ["Dati di fatturazione", "10 anni (obbligo fiscale)"],
                ].map(([item, period]) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent-blue mt-1.5 flex-shrink-0">›</span>
                    <span>
                      <strong className="text-text-primary">{item}</strong>:{" "}
                      {period}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* 8 */}
            <Section id="diritti" title="8. Diritti dell'interessato">
              <p>
                In conformità agli articoli 15-22 del GDPR, hai il diritto di:
              </p>
              <ul className="space-y-1.5 list-none mt-2">
                {[
                  ["Accesso (Art. 15)", "ottenere conferma se trattiamo tuoi dati e richiederne copia"],
                  ["Rettifica (Art. 16)", "correggere dati inesatti o incompleti"],
                  ["Cancellazione (Art. 17)", "richiedere la cancellazione dei dati ('diritto all'oblio')"],
                  ["Portabilità (Art. 20)", "ricevere i tuoi dati in formato strutturato e machine-readable"],
                  ["Limitazione (Art. 18)", "limitare il trattamento in determinati casi"],
                  ["Opposizione (Art. 21)", "opporti al trattamento basato su legittimo interesse"],
                  ["Revoca del consenso", "in qualsiasi momento, senza pregiudizio per il trattamento precedente"],
                ].map(([right, desc]) => (
                  <li key={right} className="flex gap-2">
                    <span className="text-accent-blue mt-1.5 flex-shrink-0">›</span>
                    <span>
                      <strong className="text-text-primary">{right}</strong>:{" "}
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Per esercitare i tuoi diritti, scrivi a{" "}
                <a
                  href="mailto:privacy@agentforge.it"
                  className="text-accent-blue hover:underline"
                >
                  privacy@agentforge.it
                </a>
                . Risponderemo entro 30 giorni.
              </p>
              <p>
                Hai il diritto di presentare reclamo al{" "}
                <strong className="text-text-primary">
                  Garante per la Protezione dei Dati Personali
                </strong>{" "}
                (
                <a
                  href="https://www.garanteprivacy.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-blue hover:underline"
                >
                  www.garanteprivacy.it
                </a>
                ) se ritieni che il trattamento violi il GDPR.
              </p>
            </Section>

            {/* 9 */}
            <Section id="sicurezza" title="9. Sicurezza">
              <p>
                Adottiamo misure tecniche e organizzative adeguate per proteggere
                i dati personali da accesso non autorizzato, perdita o
                distruzione:
              </p>
              <ul className="space-y-1.5 list-none mt-2">
                {[
                  "Trasmissione cifrata HTTPS/TLS su tutte le pagine",
                  "Database ospitato in UE (Supabase Frankfurt) con crittografia at-rest",
                  "Accesso ai dati limitato al personale autorizzato",
                  "Autenticazione admin tramite cookie httpOnly + password sicura",
                  "Nessuna password degli utenti memorizzata in chiaro",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent-green mt-1.5 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            {/* 10 */}
            <Section id="modifiche" title="10. Modifiche alla Privacy Policy">
              <p>
                Ci riserviamo il diritto di aggiornare questa Privacy Policy per
                riflettere cambiamenti normativi, tecnologici o operativi. Le
                modifiche vengono comunicate tramite aggiornamento di questa
                pagina con indicazione della data di ultima revisione.
              </p>
              <p>
                Ti invitiamo a consultare periodicamente questa pagina.
                L&apos;utilizzo continuato del sito dopo la pubblicazione di
                modifiche costituisce accettazione della policy aggiornata.
              </p>
              <p className="text-text-tertiary text-sm mt-4">
                Ultima modifica: 29 aprile 2026 · Versione 1.0
              </p>
            </Section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-section-alt mt-10 py-8 px-6">
        <div className="max-w-[900px] mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-text-tertiary">
          <span>© 2026 AgentForge. Tutti i diritti riservati.</span>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-text-primary transition-colors">
              Home
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/privacy-policy#cookie"
              className="hover:text-text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
