import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
    </div>
  );
}
