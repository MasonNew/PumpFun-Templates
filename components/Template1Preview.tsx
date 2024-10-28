"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Navigation } from './Navigation';
import { ContractBanner } from './ContractBanner';
import { SocialProof } from './SocialProof';
import { Roadmap } from './Roadmap';
import { SocialLinks } from './SocialLinks';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface Template1PreviewProps {
  contractAddress: string;
  title: string;
  logo?: File | null;
  backgroundColor?: string;
  accentColor?: string;
  font?: string;
  showRoadmap?: boolean;
  showSocialProof?: boolean;
  showSocialLinks?: boolean;
  marketCapLabel?: string;
  marketCap?: string;
  holdersLabel?: string;
  holders?: string;
  transactionsLabel?: string;
  transactions?: string;
  twitterLink?: string;
  telegramLink?: string;
  fullscreen?: boolean;
  preview?: boolean;
  hidePhantom?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
}

export function Template1Preview({
  contractAddress,
  title,
  logo,
  backgroundColor = "#87CEEB",
  accentColor = "#4ECDC4",
  font = "Press Start 2P",
  showRoadmap = true,
  showSocialProof = true,
  showSocialLinks = true,
  marketCapLabel = "Market Cap",
  marketCap = "$10M",
  holdersLabel = "Holders",
  holders = "25K+",
  transactionsLabel = "Transactions",
  transactions = "100K",
  twitterLink = "https://twitter.com/pepe2",
  telegramLink = "https://t.me/pepe2",
  fullscreen = false,
  preview = false,
  hidePhantom = false,
  heroTitle = "Launch Your\nNext Token\nIn Style",
  heroSubtitle = "Professional, animated templates for your crypto project. Ready to deploy in minutes."
}: Template1PreviewProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (logo) {
      const url = URL.createObjectURL(logo);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [logo]);

  if (!fullscreen && !preview) {
    return (
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          <Image
            src="/template1-preview.png"
            alt="Template Preview"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full overflow-y-auto"
      style={{ backgroundColor, fontFamily: font }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-full bg-[url('/pixel-clouds.png')] bg-repeat-x animate-float opacity-50" />
      </div>

      {/* Content Container */}
      <div className="relative min-h-full flex flex-col">
        {/* Header Section */}
        <div className="sticky top-0 z-50 w-full bg-black/20 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt="Logo"
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                ) : (
                  <div className="w-6 h-6 bg-[#4ECDC4] rounded-full mr-2" />
                )}
                <span className="text-xl font-press-start text-white">{title}</span>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                {/* Removed the "About", "Tokenomics", "Roadmap" buttons */}
                {!hidePhantom && (
                  <button
                    className="bg-[#4ECDC4] hover:bg-[#45B7AF] text-black font-press-start text-xs px-4 py-2 rounded-md transition-colors"
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative pt-32 pb-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-press-start text-white mb-6 leading-tight whitespace-pre-line">
                {heroTitle}
              </h1>
              <p className="text-lg text-white/80 mb-8 font-pixel">
                {heroSubtitle}
              </p>
              <Button
                className="bg-[#4ECDC4] hover:bg-[#45B7AF] text-black font-press-start"
                style={{ backgroundColor: accentColor }}
              >
                Buy Now
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <ContractBanner
            customAddress={contractAddress}
            accentColor={accentColor}
          />
          {showSocialProof && (
            <SocialProof
              marketCapLabel={marketCapLabel}
              marketCap={marketCap}
              holdersLabel={holdersLabel}
              holders={holders}
              transactionsLabel={transactionsLabel}
              transactions={transactions}
              accentColor={accentColor}
            />
          )}
          {showRoadmap && <Roadmap accentColor={accentColor} />}
          {showSocialLinks && (
            <div className="sticky bottom-8 right-8 flex justify-end px-8">
              <SocialLinks
                accentColor={accentColor}
                twitterLink={twitterLink}
                telegramLink={telegramLink}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
