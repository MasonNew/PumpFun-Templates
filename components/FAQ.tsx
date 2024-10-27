"use client";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      question: "What's included in the template?",
      answer: "You'll receive the complete source code, documentation, and all assets used in the template. The package includes everything you need to get started."
    },
    {
      question: "Can I modify the template?",
      answer: "Yes! You have full rights to modify the template for your own use. The clean, well-structured code makes customization easy."
    },
    {
      question: "Do you offer support?",
      answer: "Yes, we provide email support for any technical issues you might encounter while setting up the template."
    },
    {
      question: "How do I get updates?",
      answer: "All updates are free and will be available through your purchase link. We regularly improve and add new features."
    }
  ];

  return (
    <div className="py-20" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-press-start text-white text-center mb-16">FAQ</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
              >
                <AccordionTrigger className="px-6 text-white hover:text-[#4ECDC4]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 text-white/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}