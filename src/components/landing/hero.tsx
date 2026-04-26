"use client";

import { motion } from "framer-motion";
import { HERO_STATS } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at center, #3B82F6 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 bg-surface border border-border rounded-full text-accent-blue font-mono text-sm uppercase tracking-wider">
            AI AGENTS FOR BUSINESS
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight"
        >
          Agenti AI che lavorano
          <br />
          <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
            per il tuo business.
          </span>
          <br />
          <span className="bg-gradient-to-r from-accent-blue to-accent-green bg-clip-text text-transparent">
            24 ore su 24.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Progettiamo agenti AI che automatizzano marketing, vendite e customer service — così il tuo team si concentra sulla strategia.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="#contatti"
            className="bg-accent-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-blue/90 transition-colors"
          >
            Prenota una consulenza gratuita
          </a>
          <a
            href="#servizi"
            className="border border-accent-blue text-accent-blue px-8 py-4 rounded-lg font-semibold hover:bg-accent-blue hover:text-white transition-colors"
          >
            Scopri cosa automatizziamo ↓
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {HERO_STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-mono text-3xl md:text-4xl text-accent-green font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-text-tertiary text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}