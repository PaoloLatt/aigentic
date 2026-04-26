"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { USE_CASES } from "@/lib/constants";
import { gtmEvent } from "@/components/shared/analytics";

export default function UseCasesSection() {
  // Take first 3 use cases (or filter by is_featured if exists)
  const featuredCases = USE_CASES.slice(0, 3);

  return (
    <section id="use-cases" className="bg-section-alt py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="text-accent-blue font-mono text-sm uppercase tracking-wider">
            USE CASES
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-center text-text-primary mb-16"
        >
          Risultati concreti.
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-surface border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full text-white"
                  style={{ backgroundColor: useCase.badgeColor }}
                >
                  {useCase.badge}
                </span>
                <span className="text-text-tertiary text-sm">{useCase.sector}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                {useCase.title}
              </h3>

              {/* Before/After */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {useCase.before}
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {useCase.after}
                  </p>
                </div>
              </div>

              {/* Result */}
              <div className="bg-accent-green/10 border border-accent-green/20 rounded-lg p-4 mb-6">
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
                {useCase.stack.slice(0, 3).map((tool, toolIndex) => (
                  <span
                    key={toolIndex}
                    className="px-2 py-1 text-xs bg-surface-alt border border-border rounded font-mono"
                  >
                    {tool}
                  </span>
                ))}
                {useCase.stack.length > 3 && (
                  <span className="px-2 py-1 text-xs text-text-tertiary">
                    +{useCase.stack.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="/use-cases"
            onClick={() => gtmEvent("cta_click", { label: "Vedi tutti use cases" })}
            className="inline-flex items-center text-accent-blue hover:text-accent-blue/80 transition-colors font-medium"
          >
            Vedi tutti gli use cases →
          </a>
        </motion.div>
      </div>
    </section>
  );
}