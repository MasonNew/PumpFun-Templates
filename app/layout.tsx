import './globals.css';
import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';
import { Toaster } from "sonner";

const pressStart = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start'
});

export const metadata: Metadata = {
  title: 'PumpTemplates - Premium Web3 Templates',
  description: 'Launch your next meme coin website within minutes with our professionally designed templates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${pressStart.variable} font-sans`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}