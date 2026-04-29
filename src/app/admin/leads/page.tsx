"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw } from "lucide-react";

const STATUS_OPTIONS = [
  "Nuovo",
  "Contattato",
  "In trattativa",
  "Chiuso vinto",
  "Chiuso perso",
] as const;

type Status = (typeof STATUS_OPTIONS)[number];

const STATUS_STYLE: Record<Status, { bg: string; text: string }> = {
  Nuovo: { bg: "#3B82F620", text: "#3B82F6" },
  Contattato: { bg: "#F59E0B20", text: "#F59E0B" },
  "In trattativa": { bg: "#8B5CF620", text: "#8B5CF6" },
  "Chiuso vinto": { bg: "#10B98120", text: "#10B981" },
  "Chiuso perso": { bg: "#EF444420", text: "#EF4444" },
};

interface Lead {
  id: string;
  created_at: string;
  name: string;
  company: string;
  email: string;
  interest: string;
  status: Status;
  score: number;
  utm_source?: string;
  message?: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<Status | "Tutti">("Tutti");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url =
        filter === "Tutti"
          ? "/api/leads"
          : `/api/leads?status=${encodeURIComponent(filter)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Errore caricamento lead");
      setLeads(data.leads ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore sconosciuto");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateStatus = async (id: string, status: Status) => {
    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        // Roll back on failure
        fetchLeads();
      }
    } catch {
      fetchLeads();
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 75) return "#10B981";
    if (score >= 60) return "#F59E0B";
    return "#3B82F6";
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Lead</h1>
          <p className="text-text-secondary mt-1">
            Gestisci e monitora i lead in entrata.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-text-tertiary bg-surface border border-border px-3 py-1.5 rounded-lg">
            {leads.length} lead
          </span>
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors border border-border"
            title="Aggiorna"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(["Tutti", ...STATUS_OPTIONS] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === s
                ? "bg-accent-blue text-white"
                : "bg-surface border border-border text-text-secondary hover:text-text-primary"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-accent-red/10 border border-accent-red/20 rounded-xl px-5 py-4 text-accent-red text-sm">
          {error}
          {error.includes("configurato") && (
            <p className="mt-1 text-text-secondary text-xs">
              Configura <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
              <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> in{" "}
              <code className="font-mono">.env.local</code>.
            </p>
          )}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-5 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="h-4 bg-surface-alt rounded w-32" />
                <div className="h-4 bg-surface-alt rounded w-48" />
                <div className="h-4 bg-surface-alt rounded w-24" />
                <div className="h-4 bg-surface-alt rounded w-20" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && leads.length === 0 && (
        <div className="bg-surface border border-border rounded-xl p-12 text-center">
          <p className="text-text-secondary text-sm">
            {filter === "Tutti"
              ? "Nessun lead ancora. Quando qualcuno compila il form, apparirà qui."
              : `Nessun lead con status "${filter}".`}
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && leads.length > 0 && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Nome", "Email", "Interesse", "Status", "Score", "Data"].map(
                    (col) => (
                      <th
                        key={col}
                        className="text-left px-5 py-3.5 text-text-tertiary text-xs font-mono uppercase tracking-wider"
                      >
                        {col}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-surface-alt transition-colors"
                  >
                    {/* Nome + company */}
                    <td className="px-5 py-4">
                      <p className="text-text-primary text-sm font-medium">
                        {lead.name}
                      </p>
                      <p className="text-text-tertiary text-xs mt-0.5">
                        {lead.company || "—"}
                      </p>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-text-secondary text-sm hover:text-accent-blue transition-colors"
                      >
                        {lead.email}
                      </a>
                    </td>

                    {/* Interesse */}
                    <td className="px-5 py-4">
                      <p className="text-text-secondary text-sm">
                        {lead.interest || "—"}
                      </p>
                    </td>

                    {/* Status — colored badge + invisible select overlay */}
                    <td className="px-5 py-4">
                      <div className="relative inline-flex">
                        <span
                          className="px-2.5 py-1 rounded-lg text-xs font-medium pointer-events-none select-none"
                          style={{
                            backgroundColor: STATUS_STYLE[lead.status]?.bg ?? "#66666620",
                            color: STATUS_STYLE[lead.status]?.text ?? "#666666",
                          }}
                        >
                          {lead.status}
                        </span>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead.id, e.target.value as Status)
                          }
                          className="absolute inset-0 opacity-0 cursor-pointer w-full"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-surface-alt rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${lead.score}%`,
                              backgroundColor: scoreColor(lead.score),
                            }}
                          />
                        </div>
                        <span className="text-text-secondary text-xs font-mono">
                          {lead.score}
                        </span>
                      </div>
                    </td>

                    {/* Data */}
                    <td className="px-5 py-4">
                      <p className="text-text-tertiary text-sm font-mono">
                        {formatDate(lead.created_at)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-text-tertiary text-xs mt-4 font-mono">
        I lead vengono sincronizzati con HubSpot.
      </p>
    </div>
  );
}
