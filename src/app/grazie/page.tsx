"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Phone, FileText } from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";

const NEXT_STEPS = [
  {
    number: "01",
    Icon: Clock,
    title: "Analizziamo la tua richiesta",
    description:
      "Leggiamo il tuo messaggio e studiamo i processi descritti per capire dove gli agenti AI possono avere il maggiore impatto.",
    timing: "Entro 24 ore",
  },
  {
    number: "02",
    Icon: Phone,
    title: "Ti contattiamo",
    description:
      "Un nostro consulente ti scrive o chiama per una call di 30 minuti. Parliamo dei tuoi obiettivi e rispondiamo a ogni dubbio.",
    timing: "Entro 48 ore",
  },
  {
    number: "03",
    Icon: FileText,
    title: "Prepariamo la proposta",
    description:
      "Costruiamo una proposta su misura: agenti selezionati, integrazioni, tempistiche e stima di ROI misurabile.",
    timing: "Entro 5 giorni",
  },
];

export default function GraziePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        {/* Hero */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-8"
            >
              <CheckCircle className="w-20 h-20 text-accent-green" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-accent-green font-mono text-sm uppercase tracking-wider"
            >
              RICEVUTO
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-text-primary mt-4 mb-6"
            >
              Richiesta ricevuta!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-text-secondary max-w-xl mx-auto"
            >
              Grazie per averci contattato. Ecco cosa succede ora.
            </motion.p>
          </div>
        </section>

        {/* Cosa succede ora */}
        <section className="px-4 pb-20">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12"
            >
              Cosa succede ora
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {NEXT_STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden"
                >
                  {/* Background number */}
                  <span className="absolute top-3 right-4 font-mono text-6xl font-bold text-border select-none leading-none">
                    {step.number}
                  </span>

                  <div className="relative">
                    <div className="mb-5 w-10 h-10 rounded-lg bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                      <step.Icon className="w-5 h-5 text-accent-blue" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-5">
                      {step.description}
                    </p>
                    <span className="inline-block px-3 py-1 text-xs font-mono bg-surface-alt border border-border rounded-full text-text-tertiary">
                      {step.timing}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Calendly placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-text-primary text-center mb-3">
                Preferisci prenotare direttamente?
              </h2>
              <p className="text-text-secondary text-center mb-8">
                Scegli tu l&apos;orario, senza aspettare.
              </p>
              <div className="border-2 border-dashed border-border rounded-2xl p-16 text-center bg-surface/50">
                <p className="text-text-tertiary font-mono text-sm mb-2">
                  Widget Calendly qui
                </p>
                <p className="text-text-tertiary text-xs">
                  Integra il tuo link Calendly per permettere ai clienti di
                  prenotare la call direttamente.
                </p>
              </div>
            </motion.div>

            {/* Navigation links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-border text-text-secondary hover:text-text-primary hover:border-border-light transition-colors"
              >
                ← Torna alla home
              </a>
              <a
                href="/use-cases"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent-blue text-white hover:bg-accent-blue/90 transition-colors"
              >
                Scopri i nostri use cases →
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
