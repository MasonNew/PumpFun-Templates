"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-press-start text-white mb-6 leading-tight">
            Launch Your
            <br />
            Next Website
            <br />
            In Style
          </h1>
          <p className="text-lg text-white/80 mb-8 font-pixel">
            Professional, animated templates for your crypto project. Ready to deploy in minutes.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/templates">
              <Button
                size="lg"
                className="bg-[#4ECDC4] hover:bg-[#45B7AF] text-black font-press-start"
              >
                View Templates
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/10 font-press-start"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}