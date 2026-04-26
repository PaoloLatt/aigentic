"use client";

import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
}

interface Group {
  label: string;
  items: Integration[];
}

const INITIAL_GROUPS: Group[] = [
  {
    label: "CRM",
    items: [
      {
        id: "hubspot",
        name: "HubSpot",
        description: "Sincronizza lead e contatti automaticamente.",
        connected: true,
      },
    ],
  },
  {
    label: "Analytics",
    items: [
      {
        id: "ga4",
        name: "Google Analytics 4",
        description: "Traccia visite, eventi e conversioni.",
        connected: false,
      },
      {
        id: "gtm",
        name: "Google Tag Manager",
        description: "Gestisci tag e script di tracking senza modificare il codice.",
        connected: false,
      },
    ],
  },
  {
    label: "Advertising",
    items: [
      {
        id: "google-ads",
        name: "Google Ads",
        description: "Ottimizza campagne e traccia conversioni.",
        connected: false,
      },
      {
        id: "meta-ads",
        name: "Meta Ads",
        description: "Gestisci campagne Facebook e Instagram.",
        connected: false,
      },
    ],
  },
  {
    label: "Scheduling",
    items: [
      {
        id: "calendly",
        name: "Calendly",
        description: "Permetti ai lead di prenotare una call direttamente.",
        connected: false,
      },
    ],
  },
  {
    label: "Email",
    items: [
      {
        id: "mailchimp",
        name: "Mailchimp / Brevo",
        description: "Sincronizza contatti e gestisci sequenze email.",
        connected: false,
      },
    ],
  },
  {
    label: "Notifications",
    items: [
      {
        id: "slack",
        name: "Slack",
        description: "Ricevi notifiche real-time per ogni nuovo lead.",
        connected: true,
      },
    ],
  },
  {
    label: "Automation",
    items: [
      {
        id: "make",
        name: "Make / n8n",
        description: "Automatizza workflow complessi tra strumenti diversi.",
        connected: false,
      },
    ],
  },
];

export default function IntegrazioniPage() {
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);

  const toggle = (groupLabel: string, integrationId: string) =>
    setGroups((prev) =>
      prev.map((g) =>
        g.label !== groupLabel
          ? g
          : {
              ...g,
              items: g.items.map((i) =>
                i.id !== integrationId ? i : { ...i, connected: !i.connected }
              ),
            }
      )
    );

  const connectedCount = groups
    .flatMap((g) => g.items)
    .filter((i) => i.connected).length;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Integrazioni</h1>
          <p className="text-text-secondary mt-1">
            Connetti AgentForge ai tuoi strumenti.
          </p>
        </div>
        <span className="font-mono text-sm text-text-tertiary bg-surface border border-border px-3 py-1.5 rounded-lg">
          {connectedCount} / {groups.flatMap((g) => g.items).length} connesse
        </span>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <div key={group.label}>
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-tertiary mb-3 px-1">
              {group.label}
            </h2>
            <div className="bg-surface border border-border rounded-xl overflow-hidden divide-y divide-border">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-text-primary text-sm font-medium">
                        {item.name}
                      </p>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full font-mono ${
                          item.connected
                            ? "bg-accent-green/10 text-accent-green"
                            : "bg-surface-alt text-text-tertiary"
                        }`}
                      >
                        {item.connected ? "Connesso" : "Non connesso"}
                      </span>
                    </div>
                    <p className="text-text-tertiary text-sm">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => toggle(group.label, item.id)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shrink-0 ${
                      item.connected
                        ? "bg-accent-red/10 text-accent-red hover:bg-accent-red/20"
                        : "bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20"
                    }`}
                  >
                    {item.connected ? "Disconnetti" : "Connetti"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
