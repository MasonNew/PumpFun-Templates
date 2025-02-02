import { Navigation } from "@/components/Navigation";
import { TemplateShowcase } from "@/components/TemplateShowcase";
import { Footer } from "@/components/Footer";

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
      <Navigation />
      <TemplateShowcase />
      <Footer />
    </main>
  );
}