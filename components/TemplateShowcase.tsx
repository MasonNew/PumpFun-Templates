"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export function TemplateShowcase() {
  const [imageError, setImageError] = useState(false);
  
  const templates = [
    {
      id: 1,
      name: "Crypto Launch Template",
      description: "A modern, animated template perfect for token launches",
      price: "0.15 SOL",
      features: ["Animated Sections", "Mobile Responsive", "Social Integration", "Custom Branding"]
    },
    {
      id: 2,
      name: "Coming Soon",
      description: "Stay tuned!",
      price: "0.15 SOL",
      features: ["Animated Sections", "Mobile Responsive", "Social Integration", "Custom Branding"]
    },
    {
      id: 3,
      name: "Coming Soon",
      description: "Stay tuned!",
      price: "0.15 SOL",
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
                    {template.id === 1 ? (
                      imageError ? (
                        <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                          <span className="text-xl font-press-start text-white">Preview Loading...</span>
                        </div>
                      ) : (
                        <Image
                          src="/images/template1-preview.png"
                          alt="Template Preview"
                          width={1920}
                          height={1080}
                          className="object-cover"
                          priority
                          onError={() => setImageError(true)}
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                        <span className="text-xl font-press-start text-white">Coming Soon</span>
                      </div>
                    )}
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