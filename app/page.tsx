import Navigation from "../components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
      <Navigation />
      <HeroSection />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}