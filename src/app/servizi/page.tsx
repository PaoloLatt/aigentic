import type { Metadata } from "next";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import ServiziContent from "./ServiziContent";

export const metadata: Metadata = {
  title: "I Nostri Agenti AI | AgentForge",
  description:
    "Scopri tutti gli agenti AI di AgentForge per Marketing, Sales, Customer Service e Operations. Automatizza i processi della tua azienda con agenti che agiscono 24/7.",
  openGraph: {
    title: "I Nostri Agenti AI | AgentForge",
    description:
      "Agenti AI su misura per Marketing, Sales, Customer Service e Operations. Integrati con i tuoi tool, operativi 24/7.",
  },
};

export default function ServiziPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <ServiziContent />
      </main>
      <Footer />
    </>
  );
}
