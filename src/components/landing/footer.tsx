"use client";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="text-text-primary font-semibold">AgentForge</p>
            <p className="text-text-tertiary text-sm">AI agents per PMI.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
          <a href="#servizi" className="hover:text-text-primary transition-colors">
            Servizi
          </a>
          <a href="#use-cases" className="hover:text-text-primary transition-colors">
            Use Cases
          </a>
          <a href="#processo" className="hover:text-text-primary transition-colors">
            Processo
          </a>
          <a href="#faq" className="hover:text-text-primary transition-colors">
            FAQ
          </a>
          <a href="#contatti" className="hover:text-text-primary transition-colors">
            Contatti
          </a>
        </div>

        <p className="text-text-tertiary text-sm">© 2026 AgentForge. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}