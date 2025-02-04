"use client";
import { Code2, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black/20 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Code2 className="h-5 w-5 text-[#4ECDC4] mr-2" />
            <span className="text-sm font-press-start text-white">PumpTemplates</span>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://x.com/PumpTemplates"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#4ECDC4]"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-white/60 text-xs">
          © {new Date().getFullYear()} PumpTemplates. All rights reserved.
        </div>
      </div>
    </footer>
  );
}