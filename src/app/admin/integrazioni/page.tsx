"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

// ── Integration definitions ───────────────────────────────────────────────────

interface EnvVar {
  name: string;
  placeholder: string;
  description: string;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  statusKey: keyof IntegrationStatus | null;
  envVars: EnvVar[];
  setupSteps: string[];
  docsUrl?: string;
}

interface Group {
  label: string;
  items: Integration[];
}

interface IntegrationStatus {
  hubspot_crm: boolean;
  slack: boolean;
  resend: boolean;
  gtm: boolean;
  google_ads: boolean;
  meta_pixel: boolean;
  hubspot_tracking: boolean;
}

const GROUPS: Group[] = [
  {
    label: "CRM",
    items: [
      {
        id: "hubspot_crm",
        name: "HubSpot CRM",
        description: "Crea automaticamente un contatto in HubSpot per ogni lead ricevuto.",
        statusKey: "hubspot_crm",
        envVars: [
          {
            name: "HUBSPOT_ACCESS_TOKEN",
            placeholder: "pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            description: "Private App Token di HubSpot",
          },
        ],
        setupSteps: [
          "Vai su app.hubspot.com → Settings → Integrations → Private Apps",
          'Clicca "Create a private app"',
          "Dai un nome (es. AgentForge) e imposta gli scope: crm.objects.contacts.write",
          'Clicca "Create app" e copia il token generato',
          "Aggiungi il token come HUBSPOT_ACCESS_TOKEN in .env.local",
        ],
        docsUrl: "https://developers.hubspot.com/docs/api/private-apps",
      },
    ],
  },
  {
    label: "Notifiche",
    items: [
      {
        id: "slack",
        name: "Slack",
        description: "Ricevi una notifica Slack per ogni nuovo lead (con nome, azienda, score).",
        statusKey: "slack",
        envVars: [
          {
            name: "SLACK_WEBHOOK_URL",
            placeholder: "https://hooks.slack.com/services/T.../B.../...",
            description: "Incoming Webhook URL del canale Slack",
          },
        ],
        setupSteps: [
          "Vai su api.slack.com/apps → Create New App → From scratch",
          "Seleziona il tuo workspace",
          'Nel menu laterale clicca "Incoming Webhooks" e attivali',
          'Clicca "Add New Webhook to Workspace" e scegli il canale',
          "Copia la Webhook URL e aggiungila come SLACK_WEBHOOK_URL in .env.local",
        ],
        docsUrl: "https://api.slack.com/messaging/webhooks",
      },
      {
        id: "resend",
        name: "Resend (Email)",
        description: "Invia email di conferma al lead e notifica al team per ogni richiesta.",
        statusKey: "resend",
        envVars: [
          {
            name: "RESEND_API_KEY",
            placeholder: "re_xxxxxxxxxxxxxxxxxxxx",
            description: "API Key di Resend",
          },
          {
            name: "RESEND_TEAM_EMAIL",
            placeholder: "team@agentforge.it",
            description: "Email del team che riceve le notifiche lead (opzionale)",
          },
        ],
        setupSteps: [
          "Crea un account su resend.com",
          "Vai su API Keys → Create API Key",
          "Copia la chiave e aggiungila come RESEND_API_KEY in .env.local",
          "Verifica il tuo dominio in Resend (Domains → Add Domain)",
          "Opzionale: aggiungi RESEND_TEAM_EMAIL con l'email del tuo team",
        ],
        docsUrl: "https://resend.com/docs/introduction",
      },
    ],
  },
  {
    label: "Analytics",
    items: [
      {
        id: "gtm",
        name: "Google Tag Manager",
        description: "Gestisci tutti i tag di tracking (GA4, Ads, Pixel) da un'unica interfaccia. Si carica solo dopo il consenso cookie.",
        statusKey: "gtm",
        envVars: [
          {
            name: "NEXT_PUBLIC_GTM_ID",
            placeholder: "GTM-XXXXXXX",
            description: "Container ID di Google Tag Manager",
          },
        ],
        setupSteps: [
          "Vai su tagmanager.google.com",
          "Crea un account e un container (tipo: Web)",
          "Il Container ID è nel formato GTM-XXXXXXX (visibile in alto a destra)",
          "Aggiungilo come NEXT_PUBLIC_GTM_ID in .env.local",
          "Configura GA4 e altri tag direttamente in GTM",
        ],
        docsUrl: "https://support.google.com/tagmanager/answer/6103696",
      },
    ],
  },
  {
    label: "Advertising",
    items: [
      {
        id: "google_ads",
        name: "Google Ads",
        description: "Traccia conversioni e ottimizza le campagne. Si carica solo se l'utente accetta i cookie di marketing.",
        statusKey: "google_ads",
        envVars: [
          {
            name: "NEXT_PUBLIC_GOOGLE_ADS_ID",
            placeholder: "AW-XXXXXXXXXX",
            description: "Conversion ID di Google Ads",
          },
        ],
        setupSteps: [
          "Vai su ads.google.com → Tools → Conversions",
          "Crea una nuova conversione (tipo: Website)",
          "Scegli 'Use Google Tag' e copia il tag ID (formato AW-XXXXXXXXXX)",
          "Aggiungilo come NEXT_PUBLIC_GOOGLE_ADS_ID in .env.local",
        ],
        docsUrl: "https://support.google.com/google-ads/answer/6095821",
      },
      {
        id: "meta_pixel",
        name: "Meta Pixel",
        description: "Traccia visite e conversioni per Facebook e Instagram Ads. Si carica solo se l'utente accetta i cookie di marketing.",
        statusKey: "meta_pixel",
        envVars: [
          {
            name: "NEXT_PUBLIC_META_PIXEL_ID",
            placeholder: "123456789012345",
            description: "ID del Meta Pixel",
          },
        ],
        setupSteps: [
          "Vai su business.facebook.com → Events Manager",
          "Crea un nuovo Pixel (Connect Data Sources → Web → Meta Pixel)",
          "Copia il Pixel ID (numero a 15 cifre)",
          "Aggiungilo come NEXT_PUBLIC_META_PIXEL_ID in .env.local",
        ],
        docsUrl: "https://developers.facebook.com/docs/meta-pixel/get-started",
      },
    ],
  },
  {
    label: "Funzionali",
    items: [
      {
        id: "hubspot_tracking",
        name: "HubSpot Tracking",
        description: "Script di tracking HubSpot per analytics e chat widget. Si carica solo se l'utente accetta i cookie funzionali.",
        statusKey: "hubspot_tracking",
        envVars: [
          {
            name: "NEXT_PUBLIC_HUBSPOT_ID",
            placeholder: "12345678",
            description: "Portal ID di HubSpot (numero)",
          },
        ],
        setupSteps: [
          "Vai su app.hubspot.com → Settings → Account Setup → Account Defaults",
          "Il Portal ID è il numero visibile nell'URL o in alto a destra",
          "Aggiungilo come NEXT_PUBLIC_HUBSPOT_ID in .env.local",
        ],
        docsUrl: "https://knowledge.hubspot.com/reports/where-do-i-find-my-hub-id",
      },
    ],
  },
  {
    label: "Scheduling",
    items: [
      {
        id: "calendly",
        name: "Calendly",
        description: "Aggiungi un link Calendly nella sezione contatti per permettere ai lead di prenotare una call.",
        statusKey: null,
        envVars: [],
        setupSteps: [
          "Crea un account su calendly.com",
          "Configura la tua disponibilità e crea un evento (es. '30 min - Discovery Call')",
          "Copia il link personale (es. calendly.com/tuonome/discovery)",
          "Inseriscilo nella sezione Contatti del sito modificando il componente contact-section.tsx",
        ],
        docsUrl: "https://help.calendly.com/hc/en-us/articles/223195488",
      },
    ],
  },
  {
    label: "Automation",
    items: [
      {
        id: "make",
        name: "Make / n8n",
        description: "Collega i lead ad altri workflow automatizzati (es. Google Sheets, Notion, email custom).",
        statusKey: null,
        envVars: [],
        setupSteps: [
          "Crea un scenario in Make (make.com) o un workflow in n8n",
          "Aggiungi un trigger Webhook",
          "Copia il Webhook URL generato",
          "Usalo nell'API route /api/leads/route.ts come destinazione aggiuntiva",
          "In alternativa, usa Zapier con il trigger 'Webhooks by Zapier'",
        ],
        docsUrl: "https://www.make.com/en/help/tools/webhooks",
      },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function IntegrazioniPage() {
  const [status, setStatus] = useState<IntegrationStatus | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/integrations")
      .then((r) => r.json())
      .then((d) => setStatus(d.status ?? null))
      .finally(() => setLoading(false));
  }, []);

  const isConnected = (item: Integration): boolean => {
    if (!item.statusKey || !status) return false;
    return status[item.statusKey] === true;
  };

  const allItems = GROUPS.flatMap((g) => g.items);
  const connectedCount = allItems.filter(isConnected).length;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Integrazioni</h1>
          <p className="text-text-secondary mt-1">
            Connetti AgentForge ai tuoi strumenti configurando le variabili d'ambiente.
          </p>
        </div>
        <span className="font-mono text-sm text-text-tertiary bg-surface border border-border px-3 py-1.5 rounded-lg">
          {loading ? "…" : connectedCount} / {allItems.filter((i) => i.statusKey).length} attive
        </span>
      </div>

      {/* Info banner */}
      <div className="mb-8 bg-surface border border-accent-blue/20 rounded-xl px-5 py-4 text-sm text-text-secondary">
        Le integrazioni si attivano aggiungendo le variabili d'ambiente in{" "}
        <code className="font-mono text-accent-blue text-xs">.env.local</code>
        {" "}(locale) oppure in{" "}
        <strong className="text-text-primary">Vercel → Project Settings → Environment Variables</strong>
        {" "}(produzione). Clicca su ogni integrazione per vedere le istruzioni.
      </div>

      <div className="space-y-8">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3 px-1">
              {group.label}
            </h2>
            <div className="bg-surface border border-border rounded-xl overflow-hidden divide-y divide-border">
              {group.items.map((item) => {
                const connected = isConnected(item);
                const isOpen = expanded === item.id;

                return (
                  <div key={item.id}>
                    {/* Row */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : item.id)}
                      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-surface-alt transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-text-primary text-sm font-medium">
                            {item.name}
                          </p>
                          {item.statusKey !== null && (
                            <span
                              className={`px-2 py-0.5 text-xs rounded-full font-mono ${
                                loading
                                  ? "bg-surface-alt text-text-tertiary"
                                  : connected
                                  ? "bg-accent-green/10 text-accent-green"
                                  : "bg-surface-alt text-text-tertiary"
                              }`}
                            >
                              {loading ? "…" : connected ? "Attiva" : "Non configurata"}
                            </span>
                          )}
                          {item.statusKey === null && (
                            <span className="px-2 py-0.5 text-xs rounded-full font-mono bg-accent-yellow/10 text-accent-yellow">
                              Manuale
                            </span>
                          )}
                        </div>
                        <p className="text-text-tertiary text-sm">{item.description}</p>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                      )}
                    </button>

                    {/* Expanded setup panel */}
                    {isOpen && (
                      <div className="border-t border-border px-5 py-5 bg-section-alt space-y-5">
                        {/* Env vars */}
                        {item.envVars.length > 0 && (
                          <div>
                            <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3">
                              Variabili d'ambiente richieste
                            </p>
                            <div className="space-y-2">
                              {item.envVars.map((env) => (
                                <div
                                  key={env.name}
                                  className="bg-background border border-border rounded-lg px-4 py-3"
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <code className="text-xs font-mono text-accent-blue">
                                      {env.name}
                                    </code>
                                    {status && item.statusKey && status[item.statusKey] && env === item.envVars[0] && (
                                      <span className="text-xs text-accent-green font-mono">✓ configurata</span>
                                    )}
                                  </div>
                                  <code className="text-xs text-text-tertiary font-mono">
                                    {env.placeholder}
                                  </code>
                                  <p className="text-xs text-text-secondary mt-1">{env.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Setup steps */}
                        <div>
                          <p className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3">
                            Come configurarla
                          </p>
                          <ol className="space-y-2">
                            {item.setupSteps.map((step, i) => (
                              <li key={i} className="flex gap-3 text-sm text-text-secondary">
                                <span className="text-text-tertiary font-mono text-xs mt-0.5 flex-shrink-0 w-5">
                                  {i + 1}.
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Docs link */}
                        {item.docsUrl && (
                          <a
                            href={item.docsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-accent-blue hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Documentazione ufficiale
                          </a>
                        )}

                        {/* Restart reminder */}
                        {item.envVars.length > 0 && (
                          <div className="bg-accent-yellow/5 border border-accent-yellow/20 rounded-lg px-4 py-3 text-xs text-accent-yellow">
                            Dopo aver aggiunto le variabili, riavvia il server (
                            <code className="font-mono">npm run dev</code>) o fai un nuovo deploy su Vercel.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
