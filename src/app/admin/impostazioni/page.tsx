"use client";

import { useState, type FormEvent } from "react";
import { Save, Check } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-text-primary outline-none focus:border-accent-blue transition-colors text-sm";

export default function ImpostazioniPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    agencyName: "AgentForge",
    domain: "agentforge.it",
    contactEmail: "info@agentforge.it",
    notificationEmail: "team@agentforge.it",
    ga4Id: "",
    gtmId: "",
    metaPixelId: "",
  });

  const set = (field: keyof typeof settings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Impostazioni</h1>
        <p className="text-text-secondary mt-1">
          Configura le informazioni base e il tracking.
        </p>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl space-y-6">
        {/* Generale */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold mb-5">Generale</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Nome agenzia
              </label>
              <input
                value={settings.agencyName}
                onChange={(e) => set("agencyName", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Dominio
              </label>
              <input
                value={settings.domain}
                onChange={(e) => set("domain", e.target.value)}
                placeholder="es. agentforge.it"
                className={inputClass}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Email contatto
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => set("contactEmail", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1.5">
                  Email notifiche
                </label>
                <input
                  type="email"
                  value={settings.notificationEmail}
                  onChange={(e) => set("notificationEmail", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold mb-1">Tracking</h2>
          <p className="text-text-tertiary text-sm mb-5">
            Gli ID vengono iniettati automaticamente nel sito.
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Google Analytics 4 ID
              </label>
              <input
                value={settings.ga4Id}
                onChange={(e) => set("ga4Id", e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className={`${inputClass} font-mono`}
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Google Tag Manager ID
              </label>
              <input
                value={settings.gtmId}
                onChange={(e) => set("gtmId", e.target.value)}
                placeholder="GTM-XXXXXXX"
                className={`${inputClass} font-mono`}
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Meta Pixel ID
              </label>
              <input
                value={settings.metaPixelId}
                onChange={(e) => set("metaPixelId", e.target.value)}
                placeholder="XXXXXXXXXXXXXXXXXX"
                className={`${inputClass} font-mono`}
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-accent-blue text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-blue/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            Salva impostazioni
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-accent-green text-sm">
              <Check className="w-4 h-4" />
              Salvato
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
