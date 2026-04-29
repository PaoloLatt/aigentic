"use client";

import { useState, useEffect } from "react";
import { Users, TrendingUp, Star, Phone } from "lucide-react";

interface Lead {
  id: string;
  created_at: string;
  name: string;
  company: string;
  interest: string;
  score: number;
  status: string;
}

interface DashboardData {
  leads: Lead[];
}

const INTEREST_COLORS: Record<string, string> = {
  Marketing: "#3B82F6",
  Sales: "#10B981",
  "Customer Service": "#F59E0B",
  Operations: "#8B5CF6",
  Altro: "#666666",
};

function classifyInterest(interest: string): string {
  if (/marketing/i.test(interest)) return "Marketing";
  if (/sales/i.test(interest)) return "Sales";
  if (/customer/i.test(interest)) return "Customer Service";
  if (/operation/i.test(interest)) return "Operations";
  return "Altro";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
  });
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d: DashboardData) => {
        setLeads(d.leads ?? []);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // ── Computed stats ──────────────────────────────────────────────────────────

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const thisWeek = leads.filter((l) => new Date(l.created_at) > weekAgo).length;
  const thisMonth = leads.filter((l) => new Date(l.created_at) > monthAgo).length;
  const avgScore =
    leads.length > 0
      ? Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length)
      : 0;
  const won = leads.filter((l) => l.status === "Chiuso vinto").length;

  const statCards = [
    {
      label: "Lead Totali",
      value: loading ? "…" : String(leads.length),
      icon: Users,
      color: "#3B82F6",
      trend: loading ? "" : `+${thisWeek} questa settimana`,
    },
    {
      label: "Score Medio",
      value: loading ? "…" : String(avgScore),
      icon: Star,
      color: "#10B981",
      trend: "su scala 0–100",
    },
    {
      label: "Lead / mese",
      value: loading ? "…" : String(thisMonth),
      icon: TrendingUp,
      color: "#F59E0B",
      trend: "ultimi 30 giorni",
    },
    {
      label: "Chiusi vinti",
      value: loading ? "…" : String(won),
      icon: Phone,
      color: "#8B5CF6",
      trend:
        leads.length > 0
          ? `${Math.round((won / leads.length) * 100)}% conversion`
          : "—",
    },
  ];

  // Interest breakdown
  const interestMap: Record<string, number> = {};
  leads.forEach((l) => {
    const key = classifyInterest(l.interest);
    interestMap[key] = (interestMap[key] ?? 0) + 1;
  });
  const interestData = Object.entries(interestMap)
    .sort((a, b) => b[1] - a[1])
    .map(([label, value]) => ({ label, value, color: INTEREST_COLORS[label] ?? "#666" }));
  const maxBar = Math.max(...interestData.map((d) => d.value), 1);

  // Recent leads (last 5)
  const recentLeads = leads.slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">Panoramica delle performance.</p>
      </div>

      {error && (
        <div className="mb-6 bg-accent-red/10 border border-accent-red/20 rounded-xl px-5 py-4 text-accent-red text-sm">
          {error}
          {error.includes("configurato") && (
            <p className="mt-1 text-text-secondary text-xs">
              Configura Supabase in{" "}
              <code className="font-mono">.env.local</code> per vedere i dati reali.
            </p>
          )}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-surface border border-border rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-secondary text-sm">{card.label}</span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: card.color + "20" }}
              >
                <card.icon className="w-4 h-4" style={{ color: card.color }} />
              </div>
            </div>
            <p className="text-3xl font-bold text-text-primary font-mono mb-1">
              {card.value}
            </p>
            <p className="text-text-tertiary text-xs">{card.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Interest bar chart */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold mb-6">Lead per interesse</h2>
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 h-4 bg-surface-alt rounded" />
                  <div className="flex-1 h-7 bg-surface-alt rounded-full" />
                  <div className="w-5 h-4 bg-surface-alt rounded" />
                </div>
              ))}
            </div>
          ) : interestData.length === 0 ? (
            <p className="text-text-tertiary text-sm text-center py-8">
              Nessun dato disponibile.
            </p>
          ) : (
            <div className="space-y-4">
              {interestData.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-text-secondary shrink-0">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-surface-alt rounded-full h-7 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(item.value / maxBar) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <div className="w-5 text-sm text-text-secondary text-right shrink-0 font-mono">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent leads */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold mb-6">Ultimi lead</h2>
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-alt shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 bg-surface-alt rounded w-32" />
                    <div className="h-3 bg-surface-alt rounded w-24" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-3.5 bg-surface-alt rounded w-6" />
                    <div className="h-3 bg-surface-alt rounded w-10" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentLeads.length === 0 ? (
            <p className="text-text-tertiary text-sm text-center py-8">
              Nessun lead ancora.
            </p>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-alt border border-border flex items-center justify-center shrink-0">
                    <span className="text-text-secondary text-xs font-medium">
                      {lead.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-primary text-sm font-medium truncate">
                      {lead.name}
                    </p>
                    <p className="text-text-tertiary text-xs truncate">
                      {lead.interest || "—"}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-text-primary text-sm font-mono">{lead.score}</p>
                    <p className="text-text-tertiary text-xs">
                      {formatDate(lead.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
