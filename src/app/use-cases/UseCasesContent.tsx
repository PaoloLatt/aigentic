"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { USE_CASES } from "@/lib/constants";

const CATEGORIES = [
  "Tutti",
  "Marketing",
  "Sales",
  "Customer Service",
  "Operations",
];

const CATEGORY_COLORS: Record<string, string> = {
  Marketing: "#3B82F6",
  Sales: "#10B981",
  "Customer Service": "#F59E0B",
  Operations: "#8B5CF6",
};

export default function UseCasesContent() {
  const [activeCategory, setActiveCategory] = useState("Tutti");

  const filtered =
    activeCategory === "Tutti"
      ? USE_CASES
      : USE_CASES.filter((uc) => uc.badge === activeCategory);

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
              RISULTATI REALI
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
          >
            Use Cases
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Casi reali, numeri concreti. Ecco cosa succede quando le PMI
            smettono di fare le cose a mano.
          </motion.p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => {
              const color = CATEGORY_COLORS[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                    isActive
                      ? "text-white shadow-lg"
                      : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-border-light"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: color ?? "#3B82F6",
                          boxShadow: `0 4px 14px ${(color ?? "#3B82F6") + "30"}`,
                        }
                      : {}
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <p className="text-center text-text-tertiary text-sm mt-4 font-mono">
            {filtered.length} case{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "Tutti" ? ` · ${activeCategory}` : ""}
          </p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filtered.map((useCase, index) => (
                <motion.div
                  key={useCase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-surface border border-border rounded-lg p-6 flex flex-col hover:shadow-xl hover:scale-[1.01] transition-all duration-200"
                >
                  {/* Badge + Sector */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full text-white"
                      style={{ backgroundColor: useCase.badgeColor }}
                    >
                      {useCase.badge}
                    </span>
                    <span className="text-text-tertiary text-sm">
                      {useCase.sector}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-text-primary mb-6">
                    {useCase.title}
                  </h3>

                  {/* Before / After */}
                  <div className="space-y-4 mb-6 flex-1">
                    <div className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {useCase.before}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {useCase.after}
                      </p>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="bg-accent-green/10 border border-accent-green/20 rounded-lg p-4 mb-5">
                    <div className="font-mono text-2xl font-bold text-accent-green mb-1">
                      {useCase.result}
                    </div>
                    <div className="text-text-primary font-medium text-sm mb-1">
                      {useCase.resultLabel}
                    </div>
                    <div className="text-text-tertiary text-xs">
                      {useCase.resultExtra}
                    </div>
                  </div>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2">
                    {useCase.stack.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-1 text-xs bg-surface-alt border border-border rounded font-mono text-text-secondary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
            Vuoi risultati simili?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-text-secondary mb-8 text-lg"
          >
            Parliamo dei tuoi processi. In 30 minuti capiamo dove gli agenti
            AI fanno la differenza.
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
              Prenota una call →
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
