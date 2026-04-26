import type { Metadata } from "next";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import UseCasesContent from "./UseCasesContent";

export const metadata: Metadata = {
  title: "Use Cases | AgentForge",
  description:
    "Casi reali, numeri concreti. Scopri come AgentForge ha trasformato aziende con agenti AI per Marketing, Sales, Customer Service e Operations.",
  openGraph: {
    title: "Use Cases | AgentForge",
    description:
      "Risultati misurabili con agenti AI: +200% conversion rate, -75% tempo reporting, +300% engagement. Casi reali per PMI italiane.",
  },
};

export default function UseCasesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-16">
        <UseCasesContent />
      </main>
      <Footer />
    </>
  );
}
