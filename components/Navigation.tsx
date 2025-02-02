"use client";
import { Button } from "@/components/ui/button";
import { Code2, Wallet } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface NavigationProps {
  customTitle?: string;
  customLogo?: string | null;
  hidePhantom?: boolean;
}

export function Navigation({ customTitle, customLogo, hidePhantom = false }: NavigationProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  // Use the Shyft RPC endpoint
  const connection = new Connection('https://rpc.shyft.to?api_key=gk2CFJvy6BgDL7i_', 'confirmed');

  const menuItems = [
    { name: "Features", path: "/#features" },
    { name: "Templates", path: "/templates" },
    { name: "Pricing", path: "/#pricing" },
    { name: "FAQ", path: "/#faq" }
  ];

  // Check if Phantom is installed
  const checkPhantom = () => {
    return typeof window !== 'undefined' && window.solana?.isPhantom;
  };

  // Function to connect to the Phantom wallet
  const connectWallet = async () => {
    if (checkPhantom()) {
      try {
        const solana = window.solana;
        if (solana) {
          const response = await solana.connect({ onlyIfTrusted: false });
          const publicKey = response.publicKey.toString();
          setWalletAddress(publicKey);
          console.log('Connected with Public Key:', publicKey);
          await fetchBalance(publicKey); // Fetch balance after connecting
        }
      } catch (error) {
        console.error('Connection to Phantom failed:', error);
      }
    } else {
      alert('Phantom wallet is not installed. Please install it from https://phantom.app');
    }
  };

  // Function to fetch the Solana balance
  const fetchBalance = async (publicKey: string) => {
    try {
      const balanceInLamports = await connection.getBalance(new PublicKey(publicKey));
      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL; // Convert lamports to SOL
      setBalance(parseFloat(balanceInSOL.toFixed(2))); // Format to 2 decimal places
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    if (checkPhantom()) {
      const solana = window.solana;
      if (solana) {
        solana.on('connect', () => {
          if (solana.publicKey) {
            const publicKey = solana.publicKey.toString();
            setWalletAddress(publicKey);
            fetchBalance(publicKey);
          }
        });

        if (solana.isConnected && solana.publicKey) {
          const publicKey = solana.publicKey.toString();
          setWalletAddress(publicKey);
          fetchBalance(publicKey);
        }
      }
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            {customLogo ? (
              <Image
                src={customLogo}
                alt="Logo"
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
            ) : (
              <Code2 className="h-6 w-6 text-[#4ECDC4] mr-2" />
            )}
            <span className="text-xl font-press-start text-white">
              {customTitle || "PumpTemplates"}
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 font-press-start text-xs"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            {!hidePhantom && (
              <Button
                onClick={connectWallet}
                className="bg-[#512DA8] hover:bg-[#4527A0] text-white font-press-start text-xs flex items-center"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {walletAddress ? `SOL: ${balance !== null ? balance.toFixed(2) : 'Loading...'} (${walletAddress.substring(0, 6)}...)` : 'Connect Phantom'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
