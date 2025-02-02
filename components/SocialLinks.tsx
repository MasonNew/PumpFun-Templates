"use client";
import { motion } from "framer-motion";
import { Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLinksProps {
  accentColor?: string;
  twitterLink?: string;
  telegramLink?: string;
}

export function SocialLinks({ 
  accentColor = "#4ECDC4",
  twitterLink = "https://twitter.com/pepe2",
  telegramLink = "https://t.me/pepe2"
}: SocialLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="flex flex-col space-y-4"
    >
      <Button
        size="lg"
        className="rounded-full transition-all hover:scale-110"
        style={{ backgroundColor: accentColor }}
        onClick={() => window.open(twitterLink, "_blank")}
      >
        <Twitter className="h-5 w-5 mr-2" />
        Follow
      </Button>
      <Button
        size="lg"
        className="rounded-full transition-all hover:scale-110"
        style={{ backgroundColor: accentColor }}
        onClick={() => window.open(telegramLink, "_blank")}
      >
        <Send className="h-5 w-5 mr-2" />
        Join
      </Button>
    </motion.div>
  );
}