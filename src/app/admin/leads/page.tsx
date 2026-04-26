"use client";

import { useState } from "react";

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
  id: number;
  name: string;
  company: string;
  email: string;
  interest: string;
  status: Status;
  score: number;
  date: string;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: 1,
    name: "Marco Bianchi",
    company: "Tech Srl",
    email: "marco@techsrl.it",
    interest: "Marketing Agents",
    status: "Nuovo",
    score: 80,
    date: "25/04/2026",
  },
  {
    id: 2,
    name: "Anna Ferrari",
    company: "RetailCo",
    email: "anna@retailco.it",
    interest: "Sales Agents",
    status: "Contattato",
    score: 75,
    date: "24/04/2026",
  },
  {
    id: 3,
    name: "Luca Romano",
    company: "FinStart",
    email: "luca@finstart.it",
    interest: "Customer Service",
    status: "In trattativa",
    score: 65,
    date: "23/04/2026",
  },
  {
    id: 4,
    name: "Sara Ricci",
    company: "—",
    email: "sara@gmail.com",
    interest: "Non so ancora",
    status: "Nuovo",
    score: 50,
    date: "22/04/2026",
  },
  {
    id: 5,
    name: "Paolo Esposito",
    company: "ManufacturingItaly",
    email: "p.esposito@manufitaly.it",
    interest: "Operations",
    status: "Chiuso vinto",
    score: 70,
    date: "21/04/2026",
  },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [filter, setFilter] = useState<Status | "Tutti">("Tutti");

  const filtered =
    filter === "Tutti" ? leads : leads.filter((l) => l.status === filter);

  const updateStatus = (id: number, status: Status) =>
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Lead</h1>
        <p className="text-text-secondary mt-1">
          Gestisci e monitora i lead in entrata.
        </p>
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

      {/* Table */}
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
              {filtered.map((lead) => (
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
                      {lead.company}
                    </p>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-4">
                    <p className="text-text-secondary text-sm">{lead.email}</p>
                  </td>

                  {/* Interesse */}
                  <td className="px-5 py-4">
                    <p className="text-text-secondary text-sm">
                      {lead.interest}
                    </p>
                  </td>

                  {/* Status — colored badge + invisible select overlay */}
                  <td className="px-5 py-4">
                    <div className="relative inline-flex">
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-medium pointer-events-none select-none"
                        style={{
                          backgroundColor: STATUS_STYLE[lead.status].bg,
                          color: STATUS_STYLE[lead.status].text,
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
                          className="h-full bg-accent-blue rounded-full"
                          style={{ width: `${lead.score}%` }}
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
                      {lead.date}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-text-tertiary text-xs mt-4 font-mono">
        I lead vengono sincronizzati con HubSpot.
      </p>
    </div>
  );
}
