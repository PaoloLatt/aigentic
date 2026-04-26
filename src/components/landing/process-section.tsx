"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <section id="processo" className="bg-background py-20 px-4">
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
            PROCESSO
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
          Da idea ad agente operativo.
        </motion.h2>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="flex flex-col items-center text-center max-w-xs relative"
            >
              {/* Number */}
              <div className="font-mono text-3xl font-bold text-accent-blue mb-4">
                {index + 1}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-text-primary mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Time */}
              <div className="font-mono text-accent-blue text-sm">
                {step.description.split('. ').pop()}
              </div>

              {/* Separator (not for last) */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-8 w-16 h-px bg-border"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}