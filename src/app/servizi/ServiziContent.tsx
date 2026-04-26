"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, INTEGRATIONS } from "@/lib/constants";

const TABS = [
  { id: "tutti", label: "Tutti" },
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales" },
  { id: "customer-service", label: "Customer Service" },
  { id: "operations", label: "Operations" },
];

const EXTRA_TOOLS = ["Buffer", "Hootsuite", "WhatsApp", "Meta", "Zoom", "ATS"];
const ALL_TOOLS = [...INTEGRATIONS, ...EXTRA_TOOLS];

function getConnections(detail: string): string[] {
  const lower = detail.toLowerCase();
  return ALL_TOOLS.filter((tool) => lower.includes(tool.toLowerCase()));
}

export default function ServiziContent() {
  const [activeTab, setActiveTab] = useState("tutti");

  const filteredServices =
    activeTab === "tutti"
      ? SERVICES
      : SERVICES.filter((s) => s.id === activeTab);

  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-accent-blue font-mono text-sm uppercase tracking-wider">
              AGENTI AI
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
          >
            I Nostri{" "}
            <span className="text-accent-blue">Agenti AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Ogni agente agisce autonomamente, integrandosi con i tuoi tool per
            eseguire task complessi 24/7. Scegli per area di business.
          </motion.p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-accent-blue text-white shadow-lg shadow-accent-blue/20"
                    : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-border-light"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories + Agent Cards */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto space-y-20">
          <AnimatePresence mode="wait">
            {filteredServices.map((service, sIndex) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, delay: sIndex * 0.08 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-3xl">{service.icon}</span>
                  <div>
                    <h2
                      className="text-2xl md:text-3xl font-bold text-text-primary"
                      style={{ color: service.color }}
                    >
                      {service.title}
                    </h2>
                    <p className="text-text-secondary mt-1">
                      {service.description}
                    </p>
                  </div>
                  <div
                    className="ml-4 hidden md:block h-px flex-1 opacity-20"
                    style={{ backgroundColor: service.color }}
                  />
                  <span
                    className="hidden md:block font-mono text-sm px-3 py-1 rounded-full border"
                    style={{ color: service.color, borderColor: service.color + "40" }}
                  >
                    {service.agents.length} agenti
                  </span>
                </div>

                {/* Agent Cards Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {service.agents.map((agent, aIndex) => {
                    const connections = getConnections(agent.detail);
                    return (
                      <motion.div
                        key={agent.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: sIndex * 0.08 + aIndex * 0.06,
                        }}
                        className="bg-surface border border-border rounded-lg p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-200"
                        style={{
                          borderTopColor: service.color,
                          borderTopWidth: 2,
                        }}
                      >
                        {/* Name */}
                        <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
                          <span
                            className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: service.color }}
                          />
                          {agent.name}
                        </h3>

                        {/* Detail */}
                        <p className="text-text-secondary text-sm leading-relaxed mb-5">
                          {agent.detail}
                        </p>

                        {/* Automations */}
                        <div className="mb-5">
                          <p className="text-text-tertiary text-xs font-mono uppercase tracking-wider mb-2">
                            Automazioni
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {agent.automations.map((automation) => (
                              <span
                                key={automation}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-surface-alt border border-border rounded-full"
                              >
                                <span
                                  className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: service.color }}
                                />
                                {automation}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Connections */}
                        {connections.length > 0 && (
                          <div>
                            <p className="text-text-tertiary text-xs font-mono uppercase tracking-wider mb-2">
                              Connessioni
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {connections.map((conn) => (
                                <span
                                  key={conn}
                                  className="px-2 py-0.5 text-xs bg-surface-alt border border-border-light rounded font-mono text-text-secondary"
                                >
                                  {conn}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-section-alt py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            Quale agente ti serve?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary mb-8 text-lg"
          >
            Parliamo dei tuoi processi. In 30 minuti capiamo quali agenti
            fanno la differenza per la tua azienda.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="/contatti"
              className="inline-flex items-center bg-accent-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue/20"
            >
              Parliamo →
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
