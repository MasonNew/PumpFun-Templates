"use client";

import { useState, useEffect } from 'react';
import { Template1Preview } from './Template1Preview';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Navigation } from './Navigation';
import { Check } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { Label } from './ui/label';

export function TemplatePurchase() {
  const [formData, setFormData] = useState({
    contractAddress: 'Solana111111111111111111111111111111112',
    title: '$CTWT',
    logo: null as File | null,
    backgroundColor: '#87CEEB',
    accentColor: '#4ECDC4',
    fontType: 'LoRes 9 OT Wide Bold Alt Oakland',
    fontColor: '#FFFFFF',
    buyButtonLink: '',
    showRoadmap: true,
    showSocialProof: true,
    showSocialLinks: true,
    marketCapLabel: 'Market Cap',
    marketCap: '$10M',
    holdersLabel: 'Holders',
    holders: '25K+',
    transactionsLabel: 'Transactions',
    transactions: '100K',
    twitterLink: 'https://twitter.com/pepe2',
    telegramLink: 'https://t.me/pepe2',
    heroTitle: 'Launch Your\nNext Token\nIn Style',
    heroSubtitle: 'Professional, animated templates for your crypto project. Ready to deploy in minutes.'
  });
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const priceInSOL = 0.15;

  const connection = new Connection(
    'https://rpc.shyft.to?api_key=gk2CFJvy6BgDL7i_',
    'confirmed'
  );

  const checkPhantom = () => {
    return typeof window !== 'undefined' && window.solana?.isPhantom;
  };

  const connectWallet = async () => {
    if (checkPhantom()) {
      try {
        const solana = window.solana as SolanaProvider;
        if (solana) {
          const response = await solana.connect({ onlyIfTrusted: false });
          const publicKey = response.publicKey.toString();
          console.log("Connected wallet address:", publicKey);
          setWalletAddress(publicKey);
        }
      } catch (error) {
        console.error('Connection to Phantom failed:', error);
      }
    } else {
      alert('Phantom wallet is not installed. Please install it from https://phantom.app');
    }
  };

  useEffect(() => {
    if (checkPhantom()) {
      const solana = window.solana as SolanaProvider;
      if (solana && solana.isConnected && solana.publicKey) {
        const publicKey = solana.publicKey.toString();
        console.log("Wallet connected on page load:", publicKey);
        setWalletAddress(publicKey);
      }
    }
  }, []);

  const handlePurchase = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first.');
      return;
    }

    const solana = window?.solana as SolanaProvider;

    if (!solana || !solana.isPhantom) {
      alert('Phantom wallet is not available. Please ensure it is installed and connected.');
      return;
    }

    try {
      const recipient = new PublicKey("C6t9FLMr1J28qB5cXKpePeZyrMA9dbTSuKrtARBQhV3J");
      const lamports = LAMPORTS_PER_SOL * priceInSOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(walletAddress),
          toPubkey: recipient,
          lamports,
        })
      );

      transaction.feePayer = new PublicKey(walletAddress);
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      // Request the Phantom wallet to sign and send the transaction
      const signedTransaction = await solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signedTransaction.signature, 'processed');

      alert("Payment successful! Thank you for your purchase.");
      console.log("Transaction successful. Proceeding with Netlify deployment...");

      // Call the Netlify deploy function to deploy the customized template
      const response = await fetch('/.netlify/functions/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NETLIFY_AUTH_TOKEN}` // Using the token to authenticate
        },
        body: JSON.stringify({ formData })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to deploy site. Status: ${response.status}, Response: ${errorText}`);
      }

      const { claimURL, siteUrl } = await response.json();
      alert(`Your site is live at: ${siteUrl}. Claim it here: ${claimURL}`);
      console.log(`Deployment successful. Site URL: ${siteUrl}, Claim URL: ${claimURL}`);

    } catch (error: any) {
      console.error('An error occurred:', error);
      alert(`Payment or deployment failed. Please try again. Error details: ${error.message || error}`);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('logo', file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
      <Navigation />

      <header className="pt-24 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-press-start text-white mb-4">Crypto Launch Template</h1>
            <p className="text-lg text-white/80 mb-8">Professional template for launching your next crypto project</p>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                "Premium Design",
                "SEO Optimized",
                "Responsive Layout",
                "Quick and Easy"
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-white/5 rounded-lg p-3 backdrop-blur-sm"
                >
                  <Check className="h-4 w-4 text-[#4ECDC4] mr-2" />
                  <span className="text-sm text-white">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <Card className="sticky top-24 bg-white/5 backdrop-blur-lg border-white/10">
                <div className="p-6">
                  <h2 className="text-xl font-press-start text-white mb-6">Customize Template</h2>
                  <div className="space-y-6">
                    {/* Contract Address */}
                    <div>
                      <Label className="text-white">Contract Address</Label>
                      <Input
                        value={formData.contractAddress}
                        onChange={(e) => handleInputChange('contractAddress', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                        placeholder="Contract Address"
                      />
                    </div>

                    {/* Title */}
                    <div>
                      <Label className="text-white">Title</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                        placeholder="Website Title"
                      />
                    </div>

                    {/* Logo Upload */}
                    <div>
                      <Label className="text-white">Logo</Label>
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        className="bg-white/10 border-white/10 text-white"
                        accept="image/*"
                        placeholder="Logo"
                      />
                    </div>

                    {/* Background Color */}
                    <div>
                      <Label className="text-white">Background Color</Label>
                      <Input
                        type="color"
                        value={formData.backgroundColor}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        className="h-10"
                      />
                    </div>

                    {/* Accent Color */}
                    <div>
                      <Label className="text-white">Accent Color</Label>
                      <Input
                        type="color"
                        value={formData.accentColor}
                        onChange={(e) => handleInputChange('accentColor', e.target.value)}
                        className="h-10"
                      />
                    </div>

                    {/* Font Type */}
                    <div>
                      <Label className="text-white">Font Type</Label>
                      <select
                        value={formData.fontType}
                        onChange={(e) => handleInputChange('fontType', e.target.value)}
                        className="bg-gray-700 border-white/10 text-white w-full"
                      >
                        <option value="LoRes 9 OT Wide Bold Alt Oakland">(Default)</option>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>

                    {/* Font Color */}
                    <div>
                      <Label className="text-white">Font Color</Label>
                      <Input
                        type="color"
                        value={formData.fontColor}
                        onChange={(e) => handleInputChange('fontColor', e.target.value)}
                        className="h-10"
                      />
                    </div>

                    {/* Buy Button Link */}
                    <div>
                      <Label className="text-white">Buy Button Link</Label>
                      <Input
                        value={formData.buyButtonLink}
                        onChange={(e) => handleInputChange('buyButtonLink', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                        placeholder="Enter URL for Buy Button"
                      />
                    </div>

                    {/* Editable Social Proof Labels */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <div>
                        <Label className="text-white">Market Cap Label</Label>
                        <Input
                          value={formData.marketCapLabel}
                          onChange={(e) => handleInputChange('marketCapLabel', e.target.value)}
                          className="bg-white/10 border-white/10 text-white"
                          placeholder="Market Cap Label"
                        />
                        <Label className="text-white">Market Cap</Label>
                        <Input
                          value={formData.marketCap}
                          onChange={(e) => handleInputChange('marketCap', e.target.value)}
                          className="bg-white/10 border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Holders Label</Label>
                        <Input
                          value={formData.holdersLabel}
                          onChange={(e) => handleInputChange('holdersLabel', e.target.value)}
                          className="bg-white/10 border-white/10 text-white"
                          placeholder="Holders Label"
                        />
                        <Label className="text-white">Holders</Label>
                        <Input
                          value={formData.holders}
                          onChange={(e) => handleInputChange('holders', e.target.value)}
                          className="bg-white/10 border-white/10 text-white"
                        />
                      </div>

                      <div>
                        <Label className="text-white">Transactions Label</Label>
                        <Input
                          value={formData.transactionsLabel}
                          onChange={(e) => handleInputChange('transactionsLabel', e.target.value)}
                          className="bg-white/10 border-white/10 text-white"
                          placeholder="Transactions Label"
                        />
                        <Label className="text-white">Transactions</Label>
                        <Input
                          value={formData.transactions}
                          onChange={(e) => handleInputChange('transactions', e.target.value)}
                          className="bg-white/10 border-white/10 text-white"
                        />
                      </div>
                    </div>

                    {/* Toggle Options */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-white">Show Roadmap</Label>
                        <Switch
                          checked={formData.showRoadmap}
                          onCheckedChange={(checked) => handleInputChange('showRoadmap', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-white">Show Social Proof</Label>
                        <Switch
                          checked={formData.showSocialProof}
                          onCheckedChange={(checked) => handleInputChange('showSocialProof', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-white">Show Social Links</Label>
                        <Switch
                          checked={formData.showSocialLinks}
                          onCheckedChange={(checked) => handleInputChange('showSocialLinks', checked)}
                        />
                      </div>
                    </div>

                    {/* Social Links */}
                    {formData.showSocialLinks && (
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <div>
                          <Label className="text-white">Twitter Link</Label>
                          <Input
                            value={formData.twitterLink}
                            onChange={(e) => handleInputChange('twitterLink', e.target.value)}
                            className="bg-white/10 border-white/10 text-white"
                            placeholder="Twitter Link"
                          />
                        </div>

                        <div>
                          <Label className="text-white">Telegram Link</Label>
                          <Input
                            value={formData.telegramLink}
                            onChange={(e) => handleInputChange('telegramLink', e.target.value)}
                            className="bg-white/10 border-white/10 text-white"
                            placeholder="Telegram Link"
                          />
                        </div>
                      </div>
                    )}

                    {/* Hero Content */}
                    <div>
                      <Label className="text-white">Hero Title</Label>
                      <Textarea
                        value={formData.heroTitle}
                        onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                        placeholder="Hero Title"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Hero Subtitle</Label>
                      <Textarea
                        value={formData.heroSubtitle}
                        onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                        placeholder="Hero Subtitle"
                      />
                    </div>

                    {/* Purchase Button */}
                    <Button 
                      className="w-full bg-[#4ECDC4] hover:bg-[#45b8b0] text-black font-press-start mt-6"
                      onClick={handlePurchase}
                      disabled={!walletAddress}
                    >
                      Purchase (0.15 SOL)
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="w-full lg:w-3/4">
              <div className="sticky top-24 h-[800px] overflow-y-auto rounded-lg border border-white/10">
                <Template1Preview
                  {...formData}
                  marketCapLabel={formData.marketCapLabel}
                  holdersLabel={formData.holdersLabel}
                  transactionsLabel={formData.transactionsLabel}
                  hidePhantom={true}
                  preview={true}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
