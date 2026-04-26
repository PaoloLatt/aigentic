import type { Metadata } from "next";
import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import ServicesSection from "@/components/landing/services-section";
import UseCasesSection from "@/components/landing/use-cases-section";
import ProcessSection from "@/components/landing/process-section";
import IntegrationsSection from "@/components/landing/integrations-section";
import FaqSection from "@/components/landing/faq-section";
import ContactSection from "@/components/landing/contact-section";
import Footer from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "AgentForge — Agenti AI per PMI",
  description:
    "Progettiamo agenti AI che automatizzano marketing, vendite e customer service per PMI italiane. ROI misurabile, deploy in meno di 4 settimane.",
  openGraph: {
    title: "AgentForge — Agenti AI per PMI",
    description:
      "Agenti AI su misura per Marketing, Sales e Customer Service. Automatizza i processi, libera il team.",
    url: "https://agentforge.it",
  },
};

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center">
          <div
            className="h-px w-32 bg-gradient-to-r from-transparent via-accent-blue to-transparent"
            style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
          ></div>
        </div>
      </div>

      <ServicesSection />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center">
          <div
            className="h-px w-32 bg-gradient-to-r from-transparent via-accent-blue to-transparent"
            style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
          ></div>
        </div>
      </div>

      <UseCasesSection />
      <ProcessSection />
      <IntegrationsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
