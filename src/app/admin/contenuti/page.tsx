"use client";

import { useState } from "react";
import { Pencil, Check, X, Plus, Trash2 } from "lucide-react";
import { FAQS, HERO_STATS, SERVICES, PROCESS_STEPS } from "@/lib/constants";

interface Section {
  id: string;
  label: string;
  headline: string;
  subtitle: string;
  editing: boolean;
  draft: { headline: string; subtitle: string };
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  editing: boolean;
  draft: { question: string; answer: string };
}

interface StatItem {
  id: string;
  value: string;
  label: string;
  editing: boolean;
  draft: { value: string; label: string };
}

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  editing: boolean;
  draft: { title: string; description: string };
}

interface StepItem {
  id: string;
  title: string;
  description: string;
  editing: boolean;
  draft: { title: string; description: string };
}

const INITIAL_SECTIONS: Section[] = [
  {
    id: "hero",
    label: "Hero",
    headline: "Non chatbot. Agenti.",
    subtitle:
      "I nostri agenti AI non si limitano a rispondere: agiscono autonomamente, integrandosi con i tuoi tool esistenti per eseguire task complessi 24/7.",
    editing: false,
    draft: { headline: "", subtitle: "" },
  },
  {
    id: "cta",
    label: "CTA",
    headline: "Pronto a mettere l'AI al lavoro?",
    subtitle:
      "Scegli l'agente giusto per la tua azienda e avvia un progetto con ROI misurabile.",
    editing: false,
    draft: { headline: "", subtitle: "" },
  },
];

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-text-primary outline-none focus:border-accent-blue transition-colors text-sm";

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-text-primary font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function ContenutiPage() {
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
  const [faqs, setFaqs] = useState<FaqItem[]>(
    FAQS.map((f, i) => ({
      id: String(i),
      question: f.question,
      answer: f.answer,
      editing: false,
      draft: { question: f.question, answer: f.answer },
    }))
  );
  const [stats, setStats] = useState<StatItem[]>(
    HERO_STATS.map((s, i) => ({
      id: String(i),
      value: s.value,
      label: s.label,
      editing: false,
      draft: { value: s.value, label: s.label },
    }))
  );
  const [services, setServices] = useState<ServiceItem[]>(
    SERVICES.map((s) => ({
      id: s.id,
      icon: s.icon,
      title: s.title,
      description: s.description,
      color: s.color,
      editing: false,
      draft: { title: s.title, description: s.description },
    }))
  );
  const [steps, setSteps] = useState<StepItem[]>(
    PROCESS_STEPS.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      editing: false,
      draft: { title: s.title, description: s.description },
    }))
  );

  /* ── Section helpers ── */
  const startEditSection = (id: string) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, editing: true, draft: { headline: s.headline, subtitle: s.subtitle } }
          : s
      )
    );
  const saveSection = (id: string) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, editing: false, headline: s.draft.headline, subtitle: s.draft.subtitle }
          : s
      )
    );
  const cancelSection = (id: string) =>
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, editing: false } : s))
    );
  const updateSectionDraft = (id: string, field: "headline" | "subtitle", value: string) =>
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, draft: { ...s.draft, [field]: value } } : s))
    );

  /* ── Stat helpers ── */
  const startEditStat = (id: string) =>
    setStats((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, editing: true, draft: { value: s.value, label: s.label } } : s
      )
    );
  const saveStat = (id: string) =>
    setStats((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, editing: false, value: s.draft.value, label: s.draft.label } : s
      )
    );
  const cancelStat = (id: string) =>
    setStats((prev) => prev.map((s) => (s.id === id ? { ...s, editing: false } : s)));
  const updateStatDraft = (id: string, field: "value" | "label", value: string) =>
    setStats((prev) =>
      prev.map((s) => (s.id === id ? { ...s, draft: { ...s.draft, [field]: value } } : s))
    );

  /* ── Service helpers ── */
  const startEditService = (id: string) =>
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, editing: true, draft: { title: s.title, description: s.description } }
          : s
      )
    );
  const saveService = (id: string) =>
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, editing: false, title: s.draft.title, description: s.draft.description }
          : s
      )
    );
  const cancelService = (id: string) =>
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, editing: false } : s)));
  const updateServiceDraft = (id: string, field: "title" | "description", value: string) =>
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, draft: { ...s.draft, [field]: value } } : s))
    );

  /* ── Step helpers ── */
  const startEditStep = (id: string) =>
    setSteps((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, editing: true, draft: { title: s.title, description: s.description } }
          : s
      )
    );
  const saveStep = (id: string) =>
    setSteps((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, editing: false, title: s.draft.title, description: s.draft.description }
          : s
      )
    );
  const cancelStep = (id: string) =>
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, editing: false } : s)));
  const updateStepDraft = (id: string, field: "title" | "description", value: string) =>
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, draft: { ...s.draft, [field]: value } } : s))
    );

  /* ── FAQ helpers ── */
  const startEditFaq = (id: string) =>
    setFaqs((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, editing: true, draft: { question: f.question, answer: f.answer } }
          : f
      )
    );
  const saveFaq = (id: string) =>
    setFaqs((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, editing: false, question: f.draft.question, answer: f.draft.answer }
          : f
      )
    );
  const cancelFaq = (id: string) =>
    setFaqs((prev) => {
      const faq = prev.find((f) => f.id === id);
      if (!faq) return prev;
      if (!faq.question) return prev.filter((f) => f.id !== id);
      return prev.map((f) => (f.id === id ? { ...f, editing: false } : f));
    });
  const deleteFaq = (id: string) =>
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  const updateFaqDraft = (id: string, field: "question" | "answer", value: string) =>
    setFaqs((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, draft: { ...f.draft, [field]: value } } : f
      )
    );
  const addFaq = () =>
    setFaqs((prev) => [
      ...prev,
      { id: String(Date.now()), question: "", answer: "", editing: true, draft: { question: "", answer: "" } },
    ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Contenuti</h1>
        <p className="text-text-secondary mt-1">Modifica i testi della landing page.</p>
      </div>

      {/* Hero & CTA sections */}
      <SectionCard title="Sezioni testo">
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-surface border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-text-primary font-medium text-sm">{section.label}</h3>
                {!section.editing && (
                  <button
                    onClick={() => startEditSection(section.id)}
                    className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Modifica
                  </button>
                )}
              </div>
              {section.editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1.5">
                      Headline
                    </label>
                    <input
                      value={section.draft.headline}
                      onChange={(e) => updateSectionDraft(section.id, "headline", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1.5">
                      Subtitle
                    </label>
                    <textarea
                      value={section.draft.subtitle}
                      onChange={(e) => updateSectionDraft(section.id, "subtitle", e.target.value)}
                      className={`${inputClass} min-h-[80px] resize-none`}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveSection(section.id)}
                      className="flex items-center gap-1.5 bg-accent-green/10 text-accent-green px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-green/20 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Salva
                    </button>
                    <button
                      onClick={() => cancelSection(section.id)}
                      className="flex items-center gap-1.5 bg-surface-alt text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-text-primary transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Annulla
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <p className="text-text-primary font-medium">{section.headline}</p>
                  <p className="text-text-secondary text-sm">{section.subtitle}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Hero Stats */}
      <SectionCard title="Hero Stats">
        <div className="grid sm:grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-surface border border-border rounded-xl p-5">
              {stat.editing ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                        Valore
                      </label>
                      <input
                        value={stat.draft.value}
                        onChange={(e) => updateStatDraft(stat.id, "value", e.target.value)}
                        className={`${inputClass} font-mono`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                        Label
                      </label>
                      <input
                        value={stat.draft.label}
                        onChange={(e) => updateStatDraft(stat.id, "label", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveStat(stat.id)}
                      className="flex items-center gap-1.5 bg-accent-green/10 text-accent-green px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-accent-green/20 transition-colors"
                    >
                      <Check className="w-3 h-3" />
                      Salva
                    </button>
                    <button
                      onClick={() => cancelStat(stat.id)}
                      className="flex items-center gap-1.5 bg-surface-alt text-text-secondary px-3 py-1.5 rounded-lg text-sm font-medium hover:text-text-primary transition-colors"
                    >
                      <X className="w-3 h-3" />
                      Annulla
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xl font-bold text-accent-green">{stat.value}</p>
                    <p className="text-text-secondary text-xs mt-0.5">{stat.label}</p>
                  </div>
                  <button
                    onClick={() => startEditStat(stat.id)}
                    className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-alt transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Services */}
      <SectionCard title="Categorie Servizi">
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.id} className="bg-surface border border-border rounded-xl p-5">
              {service.editing ? (
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                        Titolo
                      </label>
                      <input
                        value={service.draft.title}
                        onChange={(e) => updateServiceDraft(service.id, "title", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                        Descrizione
                      </label>
                      <input
                        value={service.draft.description}
                        onChange={(e) => updateServiceDraft(service.id, "description", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveService(service.id)}
                      className="flex items-center gap-1.5 bg-accent-green/10 text-accent-green px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-accent-green/20 transition-colors"
                    >
                      <Check className="w-3 h-3" />
                      Salva
                    </button>
                    <button
                      onClick={() => cancelService(service.id)}
                      className="flex items-center gap-1.5 bg-surface-alt text-text-secondary px-3 py-1.5 rounded-lg text-sm font-medium hover:text-text-primary transition-colors"
                    >
                      <X className="w-3 h-3" />
                      Annulla
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xl shrink-0">{service.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary font-medium text-sm" style={{ color: service.color }}>
                      {service.title}
                    </p>
                    <p className="text-text-secondary text-xs mt-0.5 truncate">{service.description}</p>
                  </div>
                  <button
                    onClick={() => startEditService(service.id)}
                    className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-alt transition-colors shrink-0"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Process Steps */}
      <SectionCard title="Processo">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={step.id} className="bg-surface border border-border rounded-xl p-5">
              {step.editing ? (
                <div className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                        Titolo
                      </label>
                      <input
                        value={step.draft.title}
                        onChange={(e) => updateStepDraft(step.id, "title", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                        Descrizione
                      </label>
                      <input
                        value={step.draft.description}
                        onChange={(e) => updateStepDraft(step.id, "description", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveStep(step.id)}
                      className="flex items-center gap-1.5 bg-accent-green/10 text-accent-green px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-accent-green/20 transition-colors"
                    >
                      <Check className="w-3 h-3" />
                      Salva
                    </button>
                    <button
                      onClick={() => cancelStep(step.id)}
                      className="flex items-center gap-1.5 bg-surface-alt text-text-secondary px-3 py-1.5 rounded-lg text-sm font-medium hover:text-text-primary transition-colors"
                    >
                      <X className="w-3 h-3" />
                      Annulla
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs text-text-tertiary bg-surface-alt border border-border rounded px-2 py-1 shrink-0 mt-0.5">
                    0{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary font-medium text-sm">{step.title}</p>
                    <p className="text-text-secondary text-xs mt-0.5">{step.description}</p>
                  </div>
                  <button
                    onClick={() => startEditStep(step.id)}
                    className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-alt transition-colors shrink-0"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>

      {/* FAQs */}
      <SectionCard title="FAQ">
        <div className="flex justify-end mb-4">
          <button
            onClick={addFaq}
            className="flex items-center gap-1.5 bg-accent-blue/10 text-accent-blue px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-blue/20 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Aggiungi FAQ
          </button>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-surface border border-border rounded-xl p-5">
              {faq.editing ? (
                <div className="space-y-3">
                  <input
                    value={faq.draft.question}
                    onChange={(e) => updateFaqDraft(faq.id, "question", e.target.value)}
                    placeholder="Domanda…"
                    className={inputClass}
                  />
                  <textarea
                    value={faq.draft.answer}
                    onChange={(e) => updateFaqDraft(faq.id, "answer", e.target.value)}
                    placeholder="Risposta…"
                    className={`${inputClass} min-h-[80px] resize-none`}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveFaq(faq.id)}
                      className="flex items-center gap-1.5 bg-accent-green/10 text-accent-green px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-green/20 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Salva
                    </button>
                    <button
                      onClick={() => cancelFaq(faq.id)}
                      className="flex items-center gap-1.5 bg-surface-alt text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-text-primary transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Annulla
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-sm font-medium mb-1">{faq.question}</p>
                    <p className="text-text-secondary text-sm">{faq.answer}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => startEditFaq(faq.id)}
                      className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-alt transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteFaq(faq.id)}
                      className="p-1.5 rounded-lg text-text-tertiary hover:text-accent-red hover:bg-accent-red/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
