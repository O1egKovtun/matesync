"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { m } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

const faqs = [
  { q: "How long does it take to launch an AI campaign or website?", a: "Our standard delivery time is 14 days from the moment the brief is approved." },
  { q: "Do I need technical skills to use your solutions?", a: "Not at all. We build zero-touch automation workflows and intuitive interfaces. We handle the complex backend so you can focus on business results." },
  { q: "How do you handle custom datasets for AI?", a: "We securely process your data to fine-tune proprietary models, ensuring your AI perfectly matches your brand voice and specific logic." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-section bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <m.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <SectionEyebrow>Assistance</SectionEyebrow>
          <h2 className="text-h2 md:text-h1 mb-6 text-t-primary text-left">Frequently Asked Questions</h2>
          <p className="text-body md:text-body-lg text-t-body max-w-2xl leading-relaxed text-left">
            Everything you need to know about scaling operations with MATE Sync integrations.
          </p>
        </m.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <m.div 
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                className={`group border rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen 
                    ? "bg-background border-primary" 
                    : "bg-background border-border hover:border-white/20"
                }`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="px-6 py-6 md:px-8 md:py-8 flex items-center justify-between gap-4">
                  <h3 className={`font-semibold transition-colors duration-300 text-body md:text-body-lg ${isOpen ? "text-accent-blue" : "text-t-primary group-hover:text-t-primary"}`}>
                    {faq.q}
                  </h3>
                  <div className={`shrink-0 transition-transform duration-300 rounded-full p-1.5 ${isOpen ? "rotate-45 bg-primary/20 text-accent-blue" : "text-t-caption bg-transparent group-hover:text-t-primary"}`}>
                    <Plus className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
                
                <div 
                  className="grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-0" 
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-t-body text-body leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
