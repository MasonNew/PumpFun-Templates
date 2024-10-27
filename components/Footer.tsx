"use client";
import { Code2, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black/20 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Code2 className="h-6 w-6 text-[#4ECDC4] mr-2" />
            <span className="text-xl font-press-start text-white">PumpFun</span>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://twitter.com/pumpfun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#4ECDC4]"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/pumpfun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#4ECDC4]"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-white/60 text-sm">
          © {new Date().getFullYear()} PumpFun. All rights reserved.
        </div>
      </div>
    </footer>
  );
}