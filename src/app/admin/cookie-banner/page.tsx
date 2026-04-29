"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Cookie,
  Code2,
  List,
  BarChart3,
  Download,
  RefreshCw,
  Check,
  X,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ConsentLog {
  id: string;
  created_at: string;
  anonymous_id: string;
  action: string;
  categories: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  };
  consent_version: string;
  user_agent: string;
}

interface Stats {
  total: number;
  accept_all: number;
  reject_all: number;
  custom: number;
  analytics_pct: number;
  marketing_pct: number;
  functional_pct: number;
}

// ── Tab config ────────────────────────────────────────────────────────────────

const TABS = [
  { id: "config", label: "Configurazione", icon: Settings },
  { id: "categories", label: "Categorie", icon: Cookie },
  { id: "scripts", label: "Script", icon: Code2 },
  { id: "logs", label: "Log Consensi", icon: List },
  { id: "stats", label: "Statistiche", icon: BarChart3 },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ── Shared input style ────────────────────────────────────────────────────────

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-text-primary outline-none focus:border-accent-blue transition-colors text-sm";

// ── Config tab ────────────────────────────────────────────────────────────────

function ConfigTab() {
  const [config, setConfig] = useState({
    title: "Questo sito utilizza i cookie",
    text: "Utilizziamo cookie tecnici necessari al funzionamento del sito e, con il tuo consenso, cookie di analisi e marketing per migliorare la tua esperienza e misurare l'efficacia dei nostri servizi.",
    position: "bottom",
    btnAccept: "Accetta tutti",
    btnReject: "Rifiuta tutti",
    btnCustomize: "Personalizza",
  });
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetPreview = () => {
    if (typeof document !== "undefined") {
      document.cookie = "cookie_consent=; max-age=0; path=/";
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-text-primary font-semibold mb-5">Testi del banner</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1.5">
              Titolo
            </label>
            <input
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1.5">
              Testo informativo
            </label>
            <textarea
              value={config.text}
              onChange={(e) => setConfig({ ...config, text: e.target.value })}
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { field: "btnAccept", label: "Bottone Accetta" },
              { field: "btnReject", label: "Bottone Rifiuta" },
              { field: "btnCustomize", label: "Bottone Personalizza" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1.5">
                  {label}
                </label>
                <input
                  value={config[field as keyof typeof config]}
                  onChange={(e) =>
                    setConfig({ ...config, [field]: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          className="flex items-center gap-1.5 bg-accent-green/10 text-accent-green px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-green/20 transition-colors"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : null}
          {saved ? "Salvato" : "Salva configurazione"}
        </button>
        <button
          onClick={resetPreview}
          className="flex items-center gap-1.5 bg-surface-alt text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-text-primary transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Testa banner (reset consenso)
        </button>
      </div>

      {/* Live preview */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-xs text-text-tertiary font-mono uppercase tracking-wider mb-4">
          Anteprima banner
        </p>
        <div className="bg-[#0D0D12] border border-[#1A1A24] rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-text-primary font-semibold text-sm mb-1">
                {config.title}
              </p>
              <p className="text-text-secondary text-xs leading-relaxed">
                {config.text}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <span className="px-4 py-2 border border-white/30 text-text-primary text-xs rounded-lg font-medium">
                {config.btnReject}
              </span>
              <span className="px-4 py-2 border border-white/30 text-text-primary text-xs rounded-lg font-medium">
                {config.btnCustomize}
              </span>
              <span className="px-4 py-2 bg-white text-background text-xs rounded-lg font-medium">
                {config.btnAccept}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Categories tab ────────────────────────────────────────────────────────────

function CategoriesTab() {
  const categories = [
    {
      key: "necessary",
      label: "Cookie necessari",
      required: true,
      description:
        "Indispensabili per il funzionamento del sito. Non possono essere disattivati.",
      cookies: ["cookie_consent", "admin_auth"],
    },
    {
      key: "analytics",
      label: "Cookie di analisi",
      required: false,
      description: "Google Analytics 4 via GTM. Dati anonimi e aggregati.",
      cookies: ["_ga", "_ga_*", "_gid"],
    },
    {
      key: "marketing",
      label: "Cookie di marketing",
      required: false,
      description: "Meta Pixel, Google Ads, LinkedIn Insight Tag.",
      cookies: ["_fbp", "_fbc", "_gcl_au", "li_sugr"],
    },
    {
      key: "functional",
      label: "Cookie funzionali",
      required: false,
      description: "HubSpot CRM tracking, Calendly booking.",
      cookies: ["__hs*", "__cfruid"],
    },
  ];

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div
          key={cat.key}
          className="bg-surface border border-border rounded-xl p-5"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="text-text-primary font-medium text-sm">{cat.label}</p>
              <p className="text-text-secondary text-xs mt-0.5">{cat.description}</p>
            </div>
            {cat.required ? (
              <span className="text-xs font-mono text-accent-green bg-accent-green/10 px-2 py-1 rounded flex-shrink-0">
                Sempre attivi
              </span>
            ) : (
              <span className="text-xs font-mono text-text-tertiary bg-surface-alt px-2 py-1 rounded flex-shrink-0">
                Opzionale
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.cookies.map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 font-mono text-xs bg-surface-alt border border-border rounded text-text-secondary"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Scripts tab ───────────────────────────────────────────────────────────────

function ScriptsTab() {
  const scripts = [
    {
      category: "Analytics",
      color: "text-accent-blue",
      items: [
        {
          label: "GTM Container ID",
          env: "NEXT_PUBLIC_GTM_ID",
          placeholder: "GTM-XXXXXXX",
          note: "Google Tag Manager — gestisce GA4 e altri tag",
        },
      ],
    },
    {
      category: "Marketing",
      color: "text-accent-purple",
      items: [
        {
          label: "Meta Pixel ID",
          env: "NEXT_PUBLIC_META_PIXEL_ID",
          placeholder: "123456789012345",
          note: "Facebook / Instagram Ads conversion tracking",
        },
        {
          label: "Google Ads ID",
          env: "NEXT_PUBLIC_GOOGLE_ADS_ID",
          placeholder: "AW-XXXXXXXXXX",
          note: "Google Ads conversion tracking",
        },
      ],
    },
    {
      category: "Funzionali",
      color: "text-accent-yellow",
      items: [
        {
          label: "HubSpot Portal ID",
          env: "NEXT_PUBLIC_HUBSPOT_ID",
          placeholder: "12345678",
          note: "HubSpot CRM tracking e chat widget",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-accent-blue/20 rounded-xl p-4 text-sm text-text-secondary">
        Gli script vengono caricati <strong className="text-text-primary">dinamicamente</strong> solo
        quando l'utente accetta la categoria corrispondente. Imposta gli ID nelle
        variabili d'ambiente del progetto (
        <code className="font-mono text-accent-blue text-xs">.env.local</code>
        {" "}o Vercel dashboard).
      </div>
      {scripts.map((group) => (
        <div key={group.category}>
          <h3 className={`font-mono text-xs uppercase tracking-wider mb-3 ${group.color}`}>
            {group.category}
          </h3>
          <div className="space-y-3">
            {group.items.map((item) => (
              <div
                key={item.env}
                className="bg-surface border border-border rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-text-primary font-medium text-sm">{item.label}</p>
                    <p className="text-text-secondary text-xs mt-0.5">{item.note}</p>
                  </div>
                  <span className="text-xs font-mono text-text-tertiary bg-surface-alt px-2 py-1 rounded flex-shrink-0 ml-4">
                    Carica con: {group.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono text-accent-blue bg-surface-alt px-2 py-1 rounded">
                    {item.env}
                  </code>
                  <span className="text-text-tertiary text-xs">=</span>
                  <code className="text-xs font-mono text-text-tertiary">
                    {item.placeholder}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Logs tab ──────────────────────────────────────────────────────────────────

function LogsTab() {
  const [logs, setLogs] = useState<ConsentLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/consent-logs")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setLogs(d.logs ?? []);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const exportCsv = () => {
    const header = "id,created_at,anonymous_id,action,necessary,analytics,marketing,functional,version\n";
    const rows = logs
      .map(
        (l) =>
          `${l.id},${l.created_at},${l.anonymous_id},${l.action},${l.categories.necessary},${l.categories.analytics},${l.categories.marketing},${l.categories.functional},${l.consent_version}`
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `consent_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const actionBadge = (action: string) => {
    if (action === "accept_all")
      return (
        <span className="px-2 py-0.5 text-xs bg-accent-green/10 text-accent-green rounded font-mono">
          accept_all
        </span>
      );
    if (action === "reject_all")
      return (
        <span className="px-2 py-0.5 text-xs bg-accent-red/10 text-accent-red rounded font-mono">
          reject_all
        </span>
      );
    return (
      <span className="px-2 py-0.5 text-xs bg-accent-yellow/10 text-accent-yellow rounded font-mono">
        custom
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-text-tertiary text-sm">
        Caricamento…
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6">
        <p className="text-accent-red text-sm mb-2 font-medium">Errore</p>
        <p className="text-text-secondary text-sm">{error}</p>
        <details className="mt-4">
          <summary className="text-text-tertiary text-xs cursor-pointer hover:text-text-secondary">
            Schema SQL richiesto
          </summary>
          <pre className="mt-2 p-3 bg-background rounded text-xs text-text-secondary overflow-x-auto font-mono leading-relaxed">
{`create table public.consent_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  anonymous_id text not null,
  consent_version text default '1.0',
  categories jsonb not null,
  action text not null,
  user_agent text
);
create index idx_consent_logs_created
  on public.consent_logs(created_at desc);`}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-text-secondary text-sm font-mono">
          {logs.length} log (ultimi 100)
        </span>
        {logs.length > 0 && (
          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 bg-surface-alt text-text-secondary px-3 py-1.5 rounded-lg text-sm hover:text-text-primary transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Esporta CSV
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-10 text-center text-text-tertiary text-sm">
          Nessun log ancora registrato.
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  {["Data/Ora", "ID anonimo", "Azione", "Analytics", "Marketing", "Funz.", "Versione"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-text-tertiary font-mono uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-alt transition-colors">
                    <td className="px-4 py-3 text-text-secondary whitespace-nowrap font-mono">
                      {new Date(log.created_at).toLocaleString("it-IT", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 font-mono text-text-tertiary">
                      {log.anonymous_id.slice(0, 12)}…
                    </td>
                    <td className="px-4 py-3">{actionBadge(log.action)}</td>
                    {(
                      ["analytics", "marketing", "functional"] as const
                    ).map((key) => (
                      <td key={key} className="px-4 py-3">
                        {log.categories[key] ? (
                          <Check className="w-3.5 h-3.5 text-accent-green" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-text-tertiary" />
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3 font-mono text-text-tertiary">
                      {log.consent_version}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Stats tab ─────────────────────────────────────────────────────────────────

function StatsTab() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/consent-logs")
      .then((r) => r.json())
      .then((d) => {
        if (d.stats) setStats(d.stats);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-text-tertiary text-sm">
        Caricamento…
      </div>
    );
  }

  if (!stats || stats.total === 0) {
    return (
      <div className="bg-surface border border-border rounded-xl p-10 text-center text-text-tertiary text-sm">
        Nessun dato disponibile questo mese.
      </div>
    );
  }

  const bars = [
    { label: "Accept all", value: Math.round((stats.accept_all / stats.total) * 100), color: "bg-accent-green" },
    { label: "Reject all", value: Math.round((stats.reject_all / stats.total) * 100), color: "bg-accent-red" },
    { label: "Custom", value: Math.round((stats.custom / stats.total) * 100), color: "bg-accent-yellow" },
  ];

  const catBars = [
    { label: "Analytics", value: stats.analytics_pct, color: "bg-accent-blue" },
    { label: "Marketing", value: stats.marketing_pct, color: "bg-accent-purple" },
    { label: "Funzionali", value: stats.functional_pct, color: "bg-accent-yellow" },
  ];

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Consensi questo mese", value: stats.total },
          { label: "Accept all", value: stats.accept_all },
          { label: "Reject all", value: stats.reject_all },
          { label: "Personalizzati", value: stats.custom },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-surface border border-border rounded-xl p-4 text-center"
          >
            <p className="font-mono text-2xl font-bold text-text-primary">{value}</p>
            <p className="text-text-tertiary text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Action breakdown */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-text-primary font-semibold text-sm mb-5">
          Distribuzione azioni
        </h3>
        <div className="space-y-3">
          {bars.map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>{label}</span>
                <span className="font-mono">{value}%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-alt overflow-hidden">
                <div
                  className={`h-full rounded-full ${color} transition-all duration-500`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category acceptance */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-text-primary font-semibold text-sm mb-5">
          Accettazione per categoria
        </h3>
        <div className="space-y-3">
          {catBars.map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex justify-between text-xs text-text-secondary mb-1">
                <span>{label}</span>
                <span className="font-mono">{value}%</span>
              </div>
              <div className="h-2 rounded-full bg-surface-alt overflow-hidden">
                <div
                  className={`h-full rounded-full ${color} transition-all duration-500`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CookieBannerAdminPage() {
  const [activeTab, setActiveTab] = useState<TabId>("config");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Cookie Banner</h1>
        <p className="text-text-secondary mt-1">
          Gestisci il sistema di consenso cookie GDPR.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-alt border border-border rounded-xl p-1 mb-8 overflow-x-auto">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              activeTab === id
                ? "bg-surface text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "config" && <ConfigTab />}
      {activeTab === "categories" && <CategoriesTab />}
      {activeTab === "scripts" && <ScriptsTab />}
      {activeTab === "logs" && <LogsTab />}
      {activeTab === "stats" && <StatsTab />}
    </div>
  );
}
