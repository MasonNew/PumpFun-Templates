"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Twitter, Send } from "lucide-react";

interface TemplateLivePreviewProps {
  contractAddress: string;
  title: string;
  logo: File | null;
  template: number;
}

export function TemplateLivePreview({ contractAddress, title, logo, template }: TemplateLivePreviewProps) {
  // Create object URL for uploaded logo
  const logoUrl = logo ? URL.createObjectURL(logo) : null;

  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] rounded-lg overflow-hidden">
      <div className="absolute inset-0 p-4">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Logo"
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
            ) : (
              <div className="w-8 h-8 bg-[#4ECDC4] rounded-full mr-2" />
            )}
            <span className="text-sm font-press-start text-white">{title}</span>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
              About
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
              Tokenomics
            </Button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-press-start text-white mb-2">
            {title}
          </h1>
          <p className="text-sm text-white/80 mb-4">
            The next generation of memecoins
          </p>
          <div className="flex justify-center space-x-2">
            <Button size="sm" className="bg-[#4ECDC4] hover:bg-[#45B7AF] text-black">
              Buy Now
            </Button>
            <Button size="sm" variant="outline" className="border-[#4ECDC4] text-[#4ECDC4]">
              Chart
            </Button>
          </div>
        </div>

        {/* Contract Address */}
        <div className="bg-black/20 rounded-lg p-2 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/60">Contract:</span>
            <code className="text-xs text-[#4ECDC4]">{contractAddress}</code>
          </div>
        </div>

        {/* Social Links */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button size="sm" className="bg-[#1DA1F2] hover:bg-[#1a8cd8]">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-[#0088cc] hover:bg-[#0077b3]">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}