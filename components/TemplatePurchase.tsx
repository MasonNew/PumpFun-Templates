"use client";

import { useState } from 'react';
import { Template1Preview } from './Template1Preview';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Navigation } from './Navigation';
import { Check } from 'lucide-react';
import { Textarea } from './ui/textarea';

export function TemplatePurchase() {
  const [formData, setFormData] = useState({
    contractAddress: 'Solana111111111111111111111111111111112',
    title: '$CTWT',
    logo: null as File | null,
    backgroundColor: '#87CEEB',
    accentColor: '#4ECDC4',
    showRoadmap: true,
    showSocialProof: true,
    showSocialLinks: true,
    marketCap: '$10M',
    holders: '25K+',
    transactions: '100K',
    twitterLink: 'https://twitter.com/pepe2',
    telegramLink: 'https://t.me/pepe2',
    heroTitle: 'Launch Your\nNext Token\nIn Style',
    heroSubtitle: 'Professional, animated templates for your crypto project. Ready to deploy in minutes.'
  });

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
      
      {/* Header Section */}
      <header className="pt-24 pb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-press-start text-white mb-4">Crypto Launch Template</h1>
            <p className="text-lg text-white/80 mb-8">Professional template for launching your next crypto project</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
              {[
                "Full Source Code",
                "Premium Design",
                "Responsive Layout",
                "SEO Optimized",
                "Free Updates",
                "Developer Support"
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

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Customization Form */}
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <Card className="sticky top-24 bg-white/5 backdrop-blur-lg border-white/10">
                <div className="p-6">
                  <h2 className="text-xl font-press-start text-white mb-6">Customize Template</h2>
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
                      <Label className="text-white">Website Title</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="bg-white/10 border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Hero Title</Label>
                      <Textarea
                        value={formData.heroTitle}
                        onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                        className="bg-white/10 border-white/10 text-white h-24 resize-none"
                        placeholder="Enter hero title (use \n for line breaks)"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Hero Subtitle</Label>
                      <Textarea
                        value={formData.heroSubtitle}
                        onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                        className="bg-white/10 border-white/10 text-white resize-none"
                      />
                    </div>

                    <div>
                      <Label className="text-white">Logo</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="bg-white/10 border-white/10 text-white"
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

                    <div className="space-y-4 pt-4 border-t border-white/10">
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

                    {formData.showSocialProof && (
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <div>
                          <Label className="text-white">Market Cap</Label>
                          <Input
                            value={formData.marketCap}
                            onChange={(e) => handleInputChange('marketCap', e.target.value)}
                            className="bg-white/10 border-white/10 text-white"
                          />
                        </div>

                        <div>
                          <Label className="text-white">Holders</Label>
                          <Input
                            value={formData.holders}
                            onChange={(e) => handleInputChange('holders', e.target.value)}
                            className="bg-white/10 border-white/10 text-white"
                          />
                        </div>

                        <div>
                          <Label className="text-white">Transactions</Label>
                          <Input
                            value={formData.transactions}
                            onChange={(e) => handleInputChange('transactions', e.target.value)}
                            className="bg-white/10 border-white/10 text-white"
                          />
                        </div>
                      </div>
                    )}

                    {formData.showSocialLinks && (
                      <div className="space-y-4 pt-4 border-t border-white/10">
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

                    <Button 
                      className="w-full bg-[#4ECDC4] hover:bg-[#45b8b0] text-black font-press-start mt-6"
                      onClick={() => console.log('Purchase template')}
                    >
                      Purchase (0.25 SOL)
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Preview Section */}
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