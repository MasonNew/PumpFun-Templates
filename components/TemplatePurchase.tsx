"use client";

import { useState, useEffect } from 'react';
import { Template1Preview } from './Template1Preview';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Navigation } from './Navigation';
import { Check } from 'lucide-react';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { toast } from 'sonner';

export function TemplatePurchase() {
  const [formData, setFormData] = useState({
    contractAddress: 'Solana111111111111111111111111111111112',
    title: '$CTWT',
    logo: null as File | null,
    backgroundColor: '#87CEEB',
    accentColor: '#4ECDC4',
    fontType: 'Press Start 2P',
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

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('logo', file);
    }
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.solana?.isPhantom) {
      try {
        const response = await window.solana.connect();
        const publicKey = response.publicKey.toString();
        setWalletAddress(publicKey);
        console.log('Connected with Public Key:', publicKey);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        toast.error('Failed to connect wallet');
      }
    } else {
      toast.error('Please install Phantom wallet');
      window.open('https://phantom.app/', '_blank');
    }
  };

  const handlePurchase = async () => {
    if (!walletAddress) {
      toast.error('Please connect your wallet first');
      return;
    }

    const solana = window?.solana;
    if (!solana || !solana.isPhantom) {
      toast.error('Phantom wallet is not available');
      return;
    }

    try {
      setIsDeploying(true);
      toast.loading('Processing payment...');

      // Process Solana payment
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

      const signedTransaction = await solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signedTransaction.signature);
      
      toast.success('Payment confirmed! Deploying your site...');

      // Deploy to Netlify
      const response = await fetch('/.netlify/functions/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData })
      });

      if (!response.ok) {
        throw new Error('Deployment failed');
      }

      const { siteUrl, claimUrl, message } = await response.json();

      toast.success(
        <div className="space-y-2">
          <p>🎉 Your site is live!</p>
          <p className="text-sm opacity-80">
            View your site: <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="underline">{siteUrl}</a>
          </p>
          <p className="text-sm opacity-80">
            Claim your site: <a href={claimUrl} target="_blank" rel="noopener noreferrer" className="underline">Transfer to your Netlify account</a>
          </p>
        </div>,
        { duration: 10000 }
      );

    } catch (error: any) {
      console.error('Error:', error);
      toast.error(`Transaction failed: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.solana?.isPhantom) {
        if (window.solana.isConnected) {
          const publicKey = window.solana.publicKey?.toString();
          if (publicKey) {
            setWalletAddress(publicKey);
          }
        }

        window.solana.on('connect', () => {
          if (window.solana.publicKey) {
            setWalletAddress(window.solana.publicKey.toString());
          }
        });

        window.solana.on('disconnect', () => {
          setWalletAddress(null);
        });
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
      <Navigation />
      <main className="py-12">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <Card className="sticky top-24 bg-white/5 backdrop-blur-lg border-white/10">
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-press-start text-white">Customize Template</h2>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-white">Contract Address</Label>
                      <Input
                        value={formData.contractAddress}
                        onChange={(e) => handleInputChange('contractAddress', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Title</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Logo</Label>
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        className="bg-white/10 border-white/10 text-white"
                        accept="image/*"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Background Color</Label>
                      <Input
                        type="color"
                        value={formData.backgroundColor}
                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Accent Color</Label>
                      <Input
                        type="color"
                        value={formData.accentColor}
                        onChange={(e) => handleInputChange('accentColor', e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Font Type</Label>
                      <select
                        value={formData.fontType}
                        onChange={(e) => handleInputChange('fontType', e.target.value)}
                        className="w-full bg-white/10 border-white/10 text-white rounded-md"
                      >
                        <option value="Press Start 2P">Press Start 2P</option>
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-white">Font Color</Label>
                      <Input
                        type="color"
                        value={formData.fontColor}
                        onChange={(e) => handleInputChange('fontColor', e.target.value)}
                        className="h-10"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Buy Button Link</Label>
                      <Input
                        value={formData.buyButtonLink}
                        onChange={(e) => handleInputChange('buyButtonLink', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                        placeholder="Enter URL for Buy Button"
                      />
                    </div>

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

                    {formData.showSocialLinks && (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-white">Twitter Link</Label>
                          <Input
                            value={formData.twitterLink}
                            onChange={(e) => handleInputChange('twitterLink', e.target.value)}
                            className="bg-white/10 border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">Telegram Link</Label>
                          <Input
                            value={formData.telegramLink}
                            onChange={(e) => handleInputChange('telegramLink', e.target.value)}
                            className="bg-white/10 border-white/10 text-white"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label className="text-white">Hero Title</Label>
                      <Textarea
                        value={formData.heroTitle}
                        onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Hero Subtitle</Label>
                      <Textarea
                        value={formData.heroSubtitle}
                        onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div>

                    <Button 
                      className="w-full bg-[#4ECDC4] hover:bg-[#45b8b0] text-black font-press-start mt-6"
                      onClick={handlePurchase}
                      disabled={!walletAddress || isDeploying}
                    >
                      {!walletAddress ? (
                        'Connect Wallet to Purchase'
                      ) : isDeploying ? (
                        'Deploying...'
                      ) : (
                        `Purchase (${priceInSOL} SOL)`
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="w-full lg:w-3/4">
              <div className="sticky top-24 h-[800px] overflow-y-auto rounded-lg border border-white/10">
                <Template1Preview
                  {...formData}
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