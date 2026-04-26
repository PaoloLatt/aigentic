"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { gtmEvent } from "@/components/shared/analytics";

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(openIndex === index ? -1 : index);
    if (isOpening) {
      gtmEvent("service_expand", { service_name: SERVICES[index].title });
    }
  };

  return (
    <section id="servizi" className="bg-background py-20 px-4">
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
            SERVIZI
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-center text-text-primary mb-6"
        >
          Non chatbot.{" "}
          <span className="text-accent-blue">Agenti.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-text-secondary text-center max-w-3xl mx-auto mb-8"
        >
          I nostri agenti AI non si limitano a rispondere: agiscono autonomamente, integrandosi con i tuoi tool esistenti per eseguire task complessi 24/7, liberando il tuo team da mansioni ripetitive.
        </motion.p>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-text-tertiary text-center mb-12"
        >
          Clicca su ogni categoria per vedere il dettaglio ↓
        </motion.p>

        {/* Accordion */}
        <div className="space-y-4">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className={`bg-surface border rounded-lg overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? `border-[${service.color}] shadow-lg`
                  : "border-border"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-surface-alt transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary mt-1">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className="font-mono text-sm px-2 py-1 bg-surface-alt rounded"
                    style={{ color: service.color }}
                  >
                    {service.agents.length} agenti
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-text-secondary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-secondary" />
                  )}
                </div>
              </button>

              {/* Content */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0">
                      <div className="space-y-6">
                        {service.agents.map((agent, agentIndex) => (
                          <div key={agentIndex} className="border-l-2 pl-4" style={{ borderColor: service.color }}>
                            <h4 className="text-lg font-semibold text-text-primary mb-2 flex items-center">
                              <span
                                className="inline-block w-2 h-2 rounded-full mr-3"
                                style={{ backgroundColor: service.color }}
                              ></span>
                              {agent.name}
                            </h4>
                            <p className="text-text-secondary mb-4 leading-relaxed">
                              {agent.detail}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {agent.automations.map((automation, autoIndex) => (
                                <span
                                  key={autoIndex}
                                  className="inline-flex items-center px-3 py-1 text-sm bg-surface-alt border border-border rounded-full"
                                >
                                  <span
                                    className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                                    style={{ backgroundColor: service.color }}
                                  ></span>
                                  {automation}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}