"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp, Shield } from "lucide-react";
import { useCookieConsent, type ConsentCategories } from "@/lib/cookie-consent";

// ── Cookie details for preferences panel ─────────────────────────────────────

interface CookieDetail {
  name: string;
  provider: string;
  duration: string;
  purpose: string;
}

interface Category {
  key: keyof ConsentCategories;
  label: string;
  description: string;
  required: boolean;
  cookies: CookieDetail[];
}

const CATEGORIES: Category[] = [
  {
    key: "necessary",
    label: "Cookie necessari",
    description:
      "Indispensabili per il funzionamento del sito. Non possono essere disattivati.",
    required: true,
    cookies: [
      {
        name: "cookie_consent",
        provider: "AgentForge",
        duration: "365 giorni",
        purpose: "Salva le preferenze cookie dell'utente",
      },
      {
        name: "admin_auth",
        provider: "AgentForge",
        duration: "7 giorni",
        purpose: "Sessione autenticata area admin",
      },
    ],
  },
  {
    key: "analytics",
    label: "Cookie di analisi",
    description:
      "Ci aiutano a capire come gli utenti interagiscono con il sito (Google Analytics 4, GTM). Tutti i dati sono anonimi e aggregati.",
    required: false,
    cookies: [
      {
        name: "_ga",
        provider: "Google Analytics",
        duration: "2 anni",
        purpose: "Distingue utenti unici",
      },
      {
        name: "_ga_*",
        provider: "Google Analytics",
        duration: "2 anni",
        purpose: "Mantiene lo stato della sessione GA4",
      },
      {
        name: "_gid",
        provider: "Google Analytics",
        duration: "24 ore",
        purpose: "Distingue utenti nella stessa giornata",
      },
    ],
  },
  {
    key: "marketing",
    label: "Cookie di marketing",
    description:
      "Utilizzati per mostrare annunci pertinenti sui social e misurare le conversioni (Meta Pixel, Google Ads, LinkedIn Insight).",
    required: false,
    cookies: [
      {
        name: "_fbp",
        provider: "Meta (Facebook)",
        duration: "3 mesi",
        purpose: "Traccia visite per Facebook Ads",
      },
      {
        name: "_fbc",
        provider: "Meta (Facebook)",
        duration: "3 mesi",
        purpose: "Memorizza il click identifier",
      },
      {
        name: "_gcl_au",
        provider: "Google Ads",
        duration: "3 mesi",
        purpose: "Traccia conversioni Google Ads",
      },
      {
        name: "li_sugr",
        provider: "LinkedIn",
        duration: "3 mesi",
        purpose: "Tracciamento per LinkedIn Ads",
      },
    ],
  },
  {
    key: "functional",
    label: "Cookie funzionali",
    description:
      "Abilitano funzionalità avanzate come la chat, il booking con Calendly e il CRM HubSpot.",
    required: false,
    cookies: [
      {
        name: "__hs*",
        provider: "HubSpot",
        duration: "vari",
        purpose: "Tracciamento e analisi HubSpot CRM",
      },
      {
        name: "__cfruid",
        provider: "Calendly",
        duration: "Sessione",
        purpose: "Identifica la sessione Calendly",
      },
    ],
  },
];

// ── Preferences panel ─────────────────────────────────────────────────────────

function PreferencesPanel() {
  const { consentState, acceptAll, acceptSelected, closePreferences } =
    useCookieConsent();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selected, setSelected] = useState<Partial<ConsentCategories>>({
    analytics: consentState.analytics,
    marketing: consentState.marketing,
    functional: consentState.functional,
  });

  const toggle = (key: keyof ConsentCategories) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    acceptSelected(selected);
  };

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      className="fixed inset-x-0 bottom-0 z-[10001] bg-[#0D0D12] border-t border-[#1A1A24] max-h-[85vh] overflow-y-auto"
    >
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-text-primary font-bold text-xl">
              Preferenze cookie
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Scegli quali cookie accettare. I necessari non possono essere
              disattivati.{" "}
              <a
                href="/privacy-policy"
                className="text-accent-blue hover:underline"
              >
                Leggi la Privacy Policy
              </a>
            </p>
          </div>
          <button
            onClick={closePreferences}
            className="p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors flex-shrink-0 ml-4"
            aria-label="Chiudi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-3 mb-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="bg-surface border border-border rounded-xl overflow-hidden"
            >
              {/* Row */}
              <div className="flex items-center gap-4 px-5 py-4">
                <button
                  onClick={() =>
                    setExpanded(expanded === cat.key ? null : cat.key)
                  }
                  className="flex-1 flex items-center gap-3 text-left"
                >
                  {expanded === cat.key ? (
                    <ChevronUp className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-text-primary font-medium text-sm">
                      {cat.label}
                    </p>
                    <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </button>

                {/* Toggle */}
                {cat.required ? (
                  <span className="flex-shrink-0 text-xs font-mono text-accent-green bg-accent-green/10 px-2 py-1 rounded">
                    Sempre attivi
                  </span>
                ) : (
                  <button
                    role="switch"
                    aria-checked={!!selected[cat.key]}
                    onClick={() => toggle(cat.key)}
                    className={`flex-shrink-0 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      selected[cat.key]
                        ? "bg-accent-blue"
                        : "bg-border"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        selected[cat.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Cookie table */}
              <AnimatePresence>
                {expanded === cat.key && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border px-5 pb-4 pt-3">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-text-tertiary font-mono uppercase tracking-wider">
                              <th className="text-left pb-2 pr-4">Cookie</th>
                              <th className="text-left pb-2 pr-4">Provider</th>
                              <th className="text-left pb-2 pr-4">Durata</th>
                              <th className="text-left pb-2">Scopo</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {cat.cookies.map((c) => (
                              <tr key={c.name}>
                                <td className="py-1.5 pr-4 font-mono text-text-primary">
                                  {c.name}
                                </td>
                                <td className="py-1.5 pr-4 text-text-secondary">
                                  {c.provider}
                                </td>
                                <td className="py-1.5 pr-4 text-text-secondary whitespace-nowrap">
                                  {c.duration}
                                </td>
                                <td className="py-1.5 text-text-secondary">
                                  {c.purpose}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl border border-white/30 text-text-primary px-6 py-3 text-sm font-semibold hover:bg-white/5 transition-colors"
          >
            Salva preferenze
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 rounded-xl bg-white text-background px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Banner ───────────────────────────────────────────────────────────────

export default function CookieBanner() {
  const {
    showBanner,
    showPreferencesPanel,
    hasConsented,
    acceptAll,
    rejectAll,
    openPreferences,
  } = useCookieConsent();

  return (
    <>
      {/* Backdrop for preferences panel */}
      <AnimatePresence>
        {showPreferencesPanel && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[10000]"
            onClick={openPreferences}
          />
        )}
      </AnimatePresence>

      {/* Preferences panel */}
      <AnimatePresence>
        {showPreferencesPanel && <PreferencesPanel key="panel" />}
      </AnimatePresence>

      {/* Cookie banner */}
      <AnimatePresence>
        {showBanner && !showPreferencesPanel && (
          <motion.div
            key="banner"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed bottom-0 inset-x-0 z-[9999] bg-[#0D0D12] border-t border-[#1A1A24]"
          >
            <div className="max-w-[1140px] mx-auto px-6 py-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary font-semibold text-sm mb-1">
                    Questo sito utilizza i cookie
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Utilizziamo cookie tecnici necessari al funzionamento del
                    sito e, con il tuo consenso, cookie di analisi e marketing
                    per migliorare la tua esperienza e misurare l&apos;efficacia
                    dei nostri servizi.{" "}
                    <a
                      href="/privacy-policy"
                      className="text-accent-blue hover:underline whitespace-nowrap"
                    >
                      Leggi la Privacy Policy
                    </a>
                  </p>
                </div>

                {/* Buttons — equal visual weight per GDPR 2026 */}
                <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                  <button
                    onClick={rejectAll}
                    className="rounded-xl border border-white/30 text-text-primary px-5 py-2.5 text-sm font-semibold hover:bg-white/5 transition-colors min-w-[130px]"
                  >
                    Rifiuta tutti
                  </button>
                  <button
                    onClick={openPreferences}
                    className="rounded-xl border border-white/30 text-text-primary px-5 py-2.5 text-sm font-semibold hover:bg-white/5 transition-colors min-w-[130px]"
                  >
                    Personalizza
                  </button>
                  <button
                    onClick={acceptAll}
                    className="rounded-xl bg-white text-background px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors min-w-[130px]"
                  >
                    Accetta tutti
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating preferences button — visible after consent */}
      <AnimatePresence>
        {hasConsented && !showBanner && !showPreferencesPanel && (
          <motion.button
            key="floating"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={openPreferences}
            title="Gestisci preferenze cookie"
            className="fixed bottom-5 left-5 z-[9998] w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-tertiary hover:text-text-primary hover:border-accent-blue transition-colors shadow-lg"
          >
            <Shield className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
