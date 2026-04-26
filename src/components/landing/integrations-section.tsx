"use client";

import { motion } from "framer-motion";
import { INTEGRATIONS } from "@/lib/constants";

export default function IntegrationsSection() {
  return (
    <section className="bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-accent-blue font-mono text-sm uppercase tracking-wider">
            INTEGRAZIONI
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-text-primary mb-6"
        >
          Si integrano con i tuoi strumenti.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-text-secondary mb-12"
        >
          Connessione diretta via API
        </motion.p>

        {/* Integrations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12"
        >
          {INTEGRATIONS.map((tool, index) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
              className="bg-surface border border-border rounded-lg px-4 py-3 hover:border-accent-blue transition-colors"
            >
              <span className="font-mono text-sm text-text-primary">
                {tool}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Powered by */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-text-tertiary text-sm"
        >
          Powered by Claude · Make · n8n · Langdock
        </motion.div>
      </div>
    </section>
  );
}