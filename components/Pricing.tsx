"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  const features = [
    "Full Source Code",
    "Premium Design",
    "Responsive Layout",
    "SEO Optimized",
    "Free Updates",
    "Developer Support"
  ];

  return (
    <div className="py-20" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-press-start text-white text-center mb-16">Pricing</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-[#4ECDC4]"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-press-start text-white mb-4">Template Package</h3>
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl font-press-start text-[#4ECDC4]">0.25 Solana</span>
            </div>
          </div>
          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-white">
                <Check className="h-5 w-5 text-[#4ECDC4] mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link href="/templates/1" className="w-full">
            <Button
              className="w-full bg-[#4ECDC4] hover:bg-[#45B7AF] text-black font-press-start"
            >
              Purchase Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}