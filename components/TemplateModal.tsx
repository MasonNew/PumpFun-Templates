"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Template1Preview } from "./Template1Preview";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractAddress: string;
  title: string;
  logo: File | null;
}

export function TemplateModal({ isOpen, onClose, contractAddress, title, logo }: TemplateModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0 bg-transparent border-0 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>Template Preview</DialogTitle>
        </VisuallyHidden>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 bg-black/20 hover:bg-black/40 text-white"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="w-full h-full overflow-y-auto">
          <Template1Preview
            contractAddress={contractAddress}
            title={title}
            logo={logo}
            fullscreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}