"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Template1Preview } from "./Template1Preview";
import Link from "next/link";

export function TemplateShowcase() {
  const templates = [
    {
      id: 1,
      name: "Crypto Launch Template",
      description: "A modern, animated template perfect for token launches",
      price: "0.25 SOL",
      features: ["Animated Sections", "Mobile Responsive", "Social Integration", "Custom Branding"]
    },
    {
      id: 2,
      name: "Crypto Launch Template",
      description: "A modern, animated template perfect for token launches",
      price: "0.25 SOL",
      features: ["Animated Sections", "Mobile Responsive", "Social Integration", "Custom Branding"]
    },
    {
      id: 3,
      name: "Crypto Launch Template",
      description: "A modern, animated template perfect for token launches",
      price: "0.25 SOL",
      features: ["Animated Sections", "Mobile Responsive", "Social Integration", "Custom Branding"]
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-press-start text-white text-center mb-16">Templates</h1>
        <div className="grid grid-cols-1 gap-12">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-[#4ECDC4]">
                    <Template1Preview
                      contractAddress="So1ana1111111111111111111111111111111111112"
                      title="$CTWT"
                      logo={null}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-press-start text-white mb-4">{template.name}</h2>
                  <p className="text-white/80 mb-6">{template.description}</p>
                  <ul className="space-y-2 mb-8">
                    {template.features.map((feature, index) => (
                      <li key={index} className="text-white/80 flex items-center">
                        <span className="w-2 h-2 bg-[#4ECDC4] rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-press-start text-[#4ECDC4]">{template.price}</span>
                    <Link href={`/templates/${template.id}`}>
                      <Button className="bg-[#4ECDC4] hover:bg-[#45B7AF] text-black font-press-start">
                        Purchase Template
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}