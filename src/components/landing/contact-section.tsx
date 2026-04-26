"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion } from "framer-motion";
import { gtmEvent } from "@/components/shared/analytics";

const interestOptions = [
  "Marketing Agents",
  "Sales Agents",
  "Customer Service",
  "Operations",
  "Progetto custom",
  "Non so ancora",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "Marketing Agents",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formStarted = useRef(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleFormStart = () => {
    if (!formStarted.current) {
      formStarted.current = true;
      gtmEvent("form_start", { form_name: "contatti" });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.error || "Errore durante l'invio del form.");
        setSubmitted(false);
      } else {
        gtmEvent("form_submit", { form_name: "contatti", interest_area: formData.interest });
        gtmEvent("generate_lead", { interest_area: formData.interest });
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          interest: "Marketing Agents",
          message: "",
        });
      }
    } catch (err) {
      setError("Impossibile inviare il form. Riprova più tardi.");
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contatti" className="bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface border border-border rounded-[32px] p-8 md:p-12 bg-gradient-to-br from-white/5 to-transparent"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <span className="text-accent-blue font-mono text-sm uppercase tracking-wider">
                INIZIA ORA
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                Pronto a mettere l'AI al lavoro?
              </h2>
              <p className="text-text-secondary max-w-xl leading-7">
                Scegli l'agente giusto per la tua azienda e avvia un progetto con ROI misurabile.
              </p>

              <div className="space-y-3">
                {[
                  "Analisi gratuita",
                  "Stima ROI",
                  "Demo live",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent-green text-black text-sm">
                      ✓
                    </span>
                    <span className="text-text-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-text-secondary">
                  Nome e cognome *
                  <input
                    required
                    value={formData.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    onFocus={handleFormStart}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
                    type="text"
                    placeholder="Mario Rossi"
                  />
                </label>
                <label className="space-y-2 text-sm text-text-secondary">
                  Email aziendale *
                  <input
                    required
                    value={formData.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
                    type="email"
                    placeholder="mario@azienda.it"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-text-secondary block">
                Azienda
                <input
                  value={formData.company}
                  onChange={(event) => handleChange("company", event.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
                  type="text"
                  placeholder="Nome azienda"
                />
              </label>

              <label className="space-y-2 text-sm text-text-secondary block">
                Tipo interesse
                <select
                  value={formData.interest}
                  onChange={(event) => handleChange("interest", event.target.value)}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
                >
                  {interestOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm text-text-secondary block">
                Messaggio
                <textarea
                  value={formData.message}
                  onChange={(event) => handleChange("message", event.target.value)}
                  className="w-full min-h-[140px] rounded-2xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-accent-blue"
                  placeholder="Descrivi brevemente il tuo progetto"
                />
              </label>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-accent-blue px-6 py-4 text-sm font-semibold text-white hover:bg-accent-blue/90 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Invio in corso..." : "Richiedi una consulenza gratuita →"}
                </button>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                {submitted && !error && (
                  <p className="text-accent-green text-sm">Grazie! Ti risponderemo entro 24 ore.</p>
                )}
                <p className="text-text-tertiary text-sm">
                  Risposta entro 24 ore. Nessun impegno.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}