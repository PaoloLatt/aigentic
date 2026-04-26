import type { Metadata } from "next";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import ContattiContent from "./ContattiContent";

export const metadata: Metadata = {
  title: "Contatti | AgentForge",
  description:
    "Parliamo del tuo progetto AI. Analisi gratuita dei processi, stima ROI e demo live. Risposta entro 24 ore.",
  openGraph: {
    title: "Contatti | AgentForge",
    description:
      "Raccontaci i tuoi processi. In 30 minuti capiamo dove gli agenti AI fanno la differenza per la tua azienda.",
  },
};

export default function ContattiPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <ContattiContent />
      </main>
      <Footer />
    </>
  );
}
