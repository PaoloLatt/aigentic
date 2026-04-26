"use client";

import { useState } from "react";
import { Pencil, Check, X, Plus, Trash2 } from "lucide-react";
import { FAQS } from "@/lib/constants";

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

  const updateSectionDraft = (
    id: string,
    field: "headline" | "subtitle",
    value: string
  ) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, draft: { ...s.draft, [field]: value } } : s
      )
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

  const updateFaqDraft = (
    id: string,
    field: "question" | "answer",
    value: string
  ) =>
    setFaqs((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, draft: { ...f.draft, [field]: value } } : f
      )
    );

  const addFaq = () =>
    setFaqs((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        question: "",
        answer: "",
        editing: true,
        draft: { question: "", answer: "" },
      },
    ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Contenuti</h1>
        <p className="text-text-secondary mt-1">
          Modifica i testi della landing page.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4 mb-10">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-surface border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-text-primary font-semibold">
                {section.label}
              </h2>
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
                    onChange={(e) =>
                      updateSectionDraft(section.id, "headline", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1.5">
                    Subtitle
                  </label>
                  <textarea
                    value={section.draft.subtitle}
                    onChange={(e) =>
                      updateSectionDraft(section.id, "subtitle", e.target.value)
                    }
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
                <p className="text-text-primary font-medium">
                  {section.headline}
                </p>
                <p className="text-text-secondary text-sm">{section.subtitle}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-text-primary font-semibold">FAQ</h2>
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
            <div
              key={faq.id}
              className="bg-surface border border-border rounded-xl p-5"
            >
              {faq.editing ? (
                <div className="space-y-3">
                  <input
                    value={faq.draft.question}
                    onChange={(e) =>
                      updateFaqDraft(faq.id, "question", e.target.value)
                    }
                    placeholder="Domanda…"
                    className={inputClass}
                  />
                  <textarea
                    value={faq.draft.answer}
                    onChange={(e) =>
                      updateFaqDraft(faq.id, "answer", e.target.value)
                    }
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
                    <p className="text-text-primary text-sm font-medium mb-1">
                      {faq.question}
                    </p>
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
      </div>
    </div>
  );
}
