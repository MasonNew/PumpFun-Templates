"use client";
import { motion } from "framer-motion";

interface RoadmapProps {
  accentColor?: string;
}

export function Roadmap({ accentColor = "#4ECDC4" }: RoadmapProps) {
  const phases = [
    {
      title: "Phase 1",
      items: ["Token Launch", "Community Growth", "DEX Listing"]
    },
    {
      title: "Phase 2",
      items: ["CEX Listings", "NFT Collection", "Staking Platform"]
    },
    {
      title: "Phase 3",
      items: ["Governance", "Metaverse", "Cross-chain Bridge"]
    }
  ];

  return (
    <div className="py-20 bg-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-press-start text-white text-center mb-16">Roadmap</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
              style={{ borderColor: accentColor }}
            >
              <h3 className="text-2xl font-press-start mb-6" style={{ color: accentColor }}>{phase.title}</h3>
              <ul className="space-y-4">
                {phase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-white">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: accentColor }}></span>
                    <span className="font-press-start text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}