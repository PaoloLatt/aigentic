"use client";

import { Users, TrendingUp, Eye, Phone } from "lucide-react";

const STAT_CARDS = [
  {
    label: "Lead Totali",
    value: "23",
    icon: Users,
    color: "#3B82F6",
    trend: "+3 questa settimana",
  },
  {
    label: "Conversione",
    value: "4.2%",
    icon: TrendingUp,
    color: "#10B981",
    trend: "+0.4% vs mese scorso",
  },
  {
    label: "Visite",
    value: "1.847",
    icon: Eye,
    color: "#F59E0B",
    trend: "+127 questa settimana",
  },
  {
    label: "Call Prenotate",
    value: "8",
    icon: Phone,
    color: "#8B5CF6",
    trend: "+2 questa settimana",
  },
];

const INTEREST_DATA = [
  { label: "Marketing", value: 9, color: "#3B82F6" },
  { label: "Sales", value: 6, color: "#10B981" },
  { label: "Customer Service", value: 4, color: "#F59E0B" },
  { label: "Operations", value: 3, color: "#8B5CF6" },
  { label: "Custom / N.D.", value: 1, color: "#666666" },
];

const RECENT_LEADS = [
  {
    name: "Marco Bianchi",
    company: "Tech Srl",
    interest: "Marketing Agents",
    score: 80,
    date: "25 apr",
  },
  {
    name: "Anna Ferrari",
    company: "RetailCo",
    interest: "Sales Agents",
    score: 75,
    date: "24 apr",
  },
  {
    name: "Luca Romano",
    company: "FinStart",
    interest: "Customer Service",
    score: 65,
    date: "23 apr",
  },
  {
    name: "Sara Ricci",
    company: "—",
    interest: "Non so ancora",
    score: 50,
    date: "22 apr",
  },
  {
    name: "Paolo Esposito",
    company: "ManufacturingItaly",
    interest: "Operations",
    score: 70,
    date: "21 apr",
  },
];

const MAX_BAR = Math.max(...INTEREST_DATA.map((d) => d.value));

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">
          Panoramica delle performance.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {STAT_CARDS.map((card) => (
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
                <card.icon
                  className="w-4 h-4"
                  style={{ color: card.color }}
                />
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
        {/* Bar chart */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold mb-6">
            Lead per interesse
          </h2>
          <div className="space-y-4">
            {INTEREST_DATA.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-32 text-sm text-text-secondary shrink-0">
                  {item.label}
                </div>
                <div className="flex-1 bg-surface-alt rounded-full h-7 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.value / MAX_BAR) * 100}%`,
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
        </div>

        {/* Recent leads */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-text-primary font-semibold mb-6">
            Ultimi lead
          </h2>
          <div className="space-y-4">
            {RECENT_LEADS.map((lead) => (
              <div key={lead.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-alt border border-border flex items-center justify-center shrink-0">
                  <span className="text-text-secondary text-xs font-medium">
                    {lead.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-text-primary text-sm font-medium truncate">
                    {lead.name}
                  </p>
                  <p className="text-text-tertiary text-xs truncate">
                    {lead.interest}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-text-primary text-sm font-mono">
                    {lead.score}
                  </p>
                  <p className="text-text-tertiary text-xs">{lead.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
