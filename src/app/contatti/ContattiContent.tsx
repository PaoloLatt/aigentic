"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Mail, Phone } from "lucide-react";

const INTEREST_OPTIONS = [
  "Marketing Agents",
  "Sales Agents",
  "Customer Service",
  "Operations",
  "Progetto custom",
  "Non so ancora",
];

const BENEFITS = [
  "Analisi gratuita dei tuoi processi aziendali",
  "Stima ROI personalizzata per il tuo settore",
  "Demo live degli agenti prima di qualsiasi impegno",
];

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-accent-blue transition-colors";

export default function ContattiContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "Marketing Agents",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((curr) => ({ ...curr, [field]: value }));
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
        setError(payload.error || "Errore durante l'invio. Riprova.");
      } else {
        router.push("/grazie");
      }
    } catch {
      setError("Impossibile inviare il form. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <span className="text-accent-blue font-mono text-sm uppercase tracking-wider">
                CONTATTI
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mt-4 mb-5 leading-tight">
                Parliamo del<br />tuo progetto
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Raccontaci i tuoi processi e le sfide attuali. In 30 minuti
                capiamo insieme dove gli agenti AI fanno la differenza per
                la tua azienda.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-green flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                  </span>
                  <span className="text-text-primary">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="pt-8 border-t border-border space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-text-tertiary text-xs font-mono uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:info@agentforge.it"
                    className="text-text-primary hover:text-accent-blue transition-colors"
                  >
                    info@agentforge.it
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-text-tertiary text-xs font-mono uppercase tracking-wider mb-0.5">
                    Telefono
                  </p>
                  <span className="text-text-primary">+39 000 000 0000</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-border rounded-2xl p-8 space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block text-sm text-text-secondary">
                  Nome e cognome *
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    type="text"
                    placeholder="Mario Rossi"
                    className={inputClass}
                  />
                </label>
                <label className="block text-sm text-text-secondary">
                  Email aziendale *
                  <input
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    type="email"
                    placeholder="mario@azienda.it"
                    className={inputClass}
                  />
                </label>
              </div>

              <label className="block text-sm text-text-secondary">
                Azienda
                <input
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  type="text"
                  placeholder="Nome azienda"
                  className={inputClass}
                />
              </label>

              <label className="block text-sm text-text-secondary">
                Area di interesse
                <select
                  value={formData.interest}
                  onChange={(e) => handleChange("interest", e.target.value)}
                  className={inputClass}
                >
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm text-text-secondary">
                Raccontaci il tuo progetto
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Descrivi i processi che vorresti automatizzare, le sfide attuali, il settore…"
                  className={`${inputClass} min-h-[160px] resize-none`}
                />
              </label>

              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-accent-blue px-6 py-4 font-semibold text-white hover:bg-accent-blue/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Invio in corso…" : "Invia richiesta →"}
                </button>
                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
                <p className="text-text-tertiary text-sm text-center">
                  Risposta entro 24 ore · Nessun impegno
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
