"use client";

import { useState } from "react";
import { Pencil, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { USE_CASES } from "@/lib/constants";

interface UCDraft {
  badge: string;
  badgeColor: string;
  title: string;
  sector: string;
  before: string;
  after: string;
  result: string;
  resultLabel: string;
  resultExtra: string;
  stackText: string;
}

interface UCItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  sector: string;
  before: string;
  after: string;
  result: string;
  resultLabel: string;
  resultExtra: string;
  stack: string[];
  expanded: boolean;
  editing: boolean;
  draft: UCDraft;
}

function toDraft(uc: Omit<UCItem, "expanded" | "editing" | "draft">): UCDraft {
  return {
    badge: uc.badge,
    badgeColor: uc.badgeColor,
    title: uc.title,
    sector: uc.sector,
    before: uc.before,
    after: uc.after,
    result: uc.result,
    resultLabel: uc.resultLabel,
    resultExtra: uc.resultExtra,
    stackText: uc.stack.join(", "),
  };
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-text-primary text-sm outline-none focus:border-accent-blue transition-colors";
const taClass = `${inputClass} resize-none`;

export default function AdminUseCasesPage() {
  const [items, setItems] = useState<UCItem[]>(
    USE_CASES.map((uc) => ({
      ...uc,
      expanded: false,
      editing: false,
      draft: toDraft(uc),
    }))
  );

  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((u) => (u.id === id ? { ...u, expanded: !u.expanded } : u))
    );

  const startEdit = (id: string) =>
    setItems((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, editing: true, draft: toDraft(u) } : u
      )
    );

  const cancelEdit = (id: string) =>
    setItems((prev) =>
      prev.map((u) => (u.id === id ? { ...u, editing: false } : u))
    );

  const saveEdit = (id: string) =>
    setItems((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        return {
          ...u,
          editing: false,
          badge: u.draft.badge,
          badgeColor: u.draft.badgeColor,
          title: u.draft.title,
          sector: u.draft.sector,
          before: u.draft.before,
          after: u.draft.after,
          result: u.draft.result,
          resultLabel: u.draft.resultLabel,
          resultExtra: u.draft.resultExtra,
          stack: u.draft.stackText
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        };
      })
    );

  const updateDraft = (id: string, field: keyof UCDraft, value: string) =>
    setItems((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, draft: { ...u.draft, [field]: value } } : u
      )
    );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Use Cases</h1>
          <p className="text-text-secondary mt-1">
            Modifica i casi studio mostrati sul sito.
          </p>
        </div>
        <span className="font-mono text-sm text-text-tertiary bg-surface border border-border px-3 py-1.5 rounded-lg">
          {items.length} use cases
        </span>
      </div>

      <div className="space-y-3">
        {items.map((uc) => (
          <div
            key={uc.id}
            className="bg-surface border border-border rounded-xl overflow-hidden"
          >
            {/* Header row */}
            <div className="flex items-center gap-4 px-5 py-4">
              <span
                className="px-2.5 py-0.5 text-xs font-mono uppercase rounded-full text-white shrink-0"
                style={{ backgroundColor: uc.badgeColor }}
              >
                {uc.badge}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-text-primary font-medium text-sm truncate">
                  {uc.title}
                </p>
                <p className="text-text-tertiary text-xs">{uc.sector}</p>
              </div>
              <span className="font-mono text-lg font-bold text-accent-green shrink-0">
                {uc.result}
              </span>
              <button
                onClick={() => toggle(uc.id)}
                className="text-text-tertiary hover:text-text-primary transition-colors shrink-0"
              >
                {uc.expanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Expanded content */}
            {uc.expanded && (
              <div className="border-t border-border px-5 py-5">
                {uc.editing ? (
                  /* Edit form */
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                          Badge
                        </label>
                        <input
                          value={uc.draft.badge}
                          onChange={(e) =>
                            updateDraft(uc.id, "badge", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                          Colore badge (hex)
                        </label>
                        <div className="flex gap-2">
                          <div
                            className="w-9 h-9 rounded-lg border border-border shrink-0"
                            style={{ backgroundColor: uc.draft.badgeColor }}
                          />
                          <input
                            value={uc.draft.badgeColor}
                            onChange={(e) =>
                              updateDraft(uc.id, "badgeColor", e.target.value)
                            }
                            className={`${inputClass} font-mono`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                          Titolo
                        </label>
                        <input
                          value={uc.draft.title}
                          onChange={(e) =>
                            updateDraft(uc.id, "title", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                          Settore
                        </label>
                        <input
                          value={uc.draft.sector}
                          onChange={(e) =>
                            updateDraft(uc.id, "sector", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                        Prima (situazione attuale)
                      </label>
                      <textarea
                        value={uc.draft.before}
                        onChange={(e) =>
                          updateDraft(uc.id, "before", e.target.value)
                        }
                        rows={3}
                        className={taClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                        Dopo (con agente AI)
                      </label>
                      <textarea
                        value={uc.draft.after}
                        onChange={(e) =>
                          updateDraft(uc.id, "after", e.target.value)
                        }
                        rows={3}
                        className={taClass}
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                          Risultato
                        </label>
                        <input
                          value={uc.draft.result}
                          onChange={(e) =>
                            updateDraft(uc.id, "result", e.target.value)
                          }
                          className={`${inputClass} font-mono`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                          Label
                        </label>
                        <input
                          value={uc.draft.resultLabel}
                          onChange={(e) =>
                            updateDraft(uc.id, "resultLabel", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                          Extra
                        </label>
                        <input
                          value={uc.draft.resultExtra}
                          onChange={(e) =>
                            updateDraft(uc.id, "resultExtra", e.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-text-tertiary font-mono uppercase tracking-wider mb-1">
                        Stack (separato da virgola)
                      </label>
                      <input
                        value={uc.draft.stackText}
                        onChange={(e) =>
                          updateDraft(uc.id, "stackText", e.target.value)
                        }
                        className={`${inputClass} font-mono`}
                        placeholder="HubSpot, Intercom, Pipedrive"
                      />
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => saveEdit(uc.id)}
                        className="flex items-center gap-1.5 bg-accent-green/10 text-accent-green px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-green/20 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Salva
                      </button>
                      <button
                        onClick={() => cancelEdit(uc.id)}
                        className="flex items-center gap-1.5 bg-surface-alt text-text-secondary px-4 py-2 rounded-lg text-sm font-medium hover:text-text-primary transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Annulla
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View mode */
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <button
                        onClick={() => startEdit(uc.id)}
                        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        Modifica
                      </button>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-text-tertiary text-xs font-mono uppercase tracking-wider mb-1">
                          Prima
                        </p>
                        <p className="text-text-secondary leading-relaxed">
                          {uc.before}
                        </p>
                      </div>
                      <div>
                        <p className="text-text-tertiary text-xs font-mono uppercase tracking-wider mb-1">
                          Dopo
                        </p>
                        <p className="text-text-secondary leading-relaxed">
                          {uc.after}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xl font-bold text-accent-green">
                        {uc.result}
                      </span>
                      <span className="text-text-primary text-sm">
                        {uc.resultLabel}
                      </span>
                      <span className="text-text-tertiary text-sm">·</span>
                      <span className="text-text-tertiary text-sm">
                        {uc.resultExtra}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {uc.stack.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-xs bg-surface-alt border border-border rounded font-mono text-text-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
