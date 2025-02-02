"use client";
import { motion } from "framer-motion";
import { Zap, Palette, Code, Rocket } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with Next.js and optimized for maximum performance"
    },
    {
      icon: Palette,
      title: "Customizable",
      description: "Easy to modify colors, content, and styling to match your brand"
    },
    {
      icon: Code,
      title: "Clean Code",
      description: "Well-structured, documented code following best practices"
    },
    {
      icon: Rocket,
      title: "Deploy Ready",
      description: "One-click deployment to Vercel, Netlify, or your preferred platform"
    }
  ];

  return (
    <div className="py-20" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-press-start text-white text-center mb-16">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-8 text-center border border-white/10 hover:border-[#4ECDC4] transition-colors"
            >
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-[#4ECDC4]" />
              <h3 className="text-xl font-press-start text-white mb-4">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}