"use client";
import { motion } from "framer-motion";
import { Rocket, Users, Zap } from "lucide-react";

interface SocialProofProps {
  marketCap?: string;
  holders?: string;
  transactions?: string;
  accentColor?: string;
}

export function SocialProof({ 
  marketCap = "$10M",
  holders = "25K+",
  transactions = "100K",
  accentColor = "#4ECDC4"
}: SocialProofProps) {
  const stats = [
    { icon: Rocket, value: marketCap, label: "MARKET CAP" },
    { icon: Users, value: holders, label: "HOLDERS" },
    { icon: Zap, value: transactions, label: "TRANSACTIONS" },
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-8 text-center border border-white/10 transition-colors"
              style={{ borderColor: accentColor }}
            >
              <stat.icon className="h-12 w-12 mx-auto mb-4" style={{ color: accentColor }} />
              <h3 className="text-3xl font-press-start text-white mb-2">{stat.value}</h3>
              <p className="text-white/80 font-press-start text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}