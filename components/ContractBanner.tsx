"use client";
import { motion } from "framer-motion";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ContractBannerProps {
  customAddress?: string;
  accentColor?: string;
}

export function ContractBanner({ customAddress, accentColor = "#4ECDC4" }: ContractBannerProps) {
  const contractAddress = customAddress || "So1ana1111111111111111111111111111111111112";
  
  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    toast.success("Contract address copied!", {
      style: { fontFamily: "var(--font-press-start)" }
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <span className="text-white font-press-start text-sm">Contract:</span>
            <code className="bg-black/20 px-4 py-2 rounded text-white font-mono" style={{ color: accentColor }}>
              {contractAddress}
            </code>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={copyAddress}
              className="border-white/10 text-white hover:bg-white/10 font-press-start"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(`https://explorer.solana.com/address/${contractAddress}`, "_blank")}
              className="border-white/10 text-white hover:bg-white/10 font-press-start"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}