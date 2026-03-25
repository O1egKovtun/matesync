"use client";
import { m } from "framer-motion";

interface SectionEyebrowProps {
  children: React.ReactNode;
}

export default function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-block px-3.5 py-1.5 rounded-full bg-pill-bg border border-pill-border mb-6"
    >
      <span className="text-[12px] font-semibold text-primary-light tracking-widest uppercase">
        {children}
      </span>
    </m.div>
  );
}
