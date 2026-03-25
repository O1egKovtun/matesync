"use client";
import AnimatedButton from "./AnimatedButton";
import { m } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import { Check } from "lucide-react";

const packages = [
  { 
    name: "ESSENTIAL", 
    features: ["AI Landing Page", "Creative Suite", "Basic SEO optimization", "Standard support"], 
    highlighted: false 
  },
  { 
    name: "PRO", 
    features: ["AI Web Development", "Automation Workflows", "Dataset Integration", "Priority Support"], 
    highlighted: true 
  },
  { 
    name: "ENTERPRISE", 
    features: ["Custom Models", "Data Analysis & Insights", "Team AI Training", "Dedicated AI Architect"], 
    highlighted: false 
  },
];

interface PackageItem {
  name: string;
  features: string[];
  highlighted: boolean;
}

interface PackageCardProps {
  pkg: PackageItem;
  index: number;
}

function PackageCard({ pkg, index }: PackageCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl p-8 md:p-10 transition-all duration-300 hover:-translate-y-1.5 ${
        pkg.highlighted
          ? "bg-white/[0.06] border border-primary/40 shadow-[0_0_30px_rgba(0,93,255,0.15),0_0_60px_rgba(0,93,255,0.05)]"
          : "bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15]"
      }`}
    >
      <div className="mb-8 pt-2">
        <h3 className={`text-h2 font-bold tracking-tight flex items-center gap-3 ${
          pkg.highlighted ? "text-white" : "text-t-primary"
        }`}>
          <span>{pkg.name}</span>
          {pkg.highlighted && (
            <span className="text-[10px] font-bold tracking-widest bg-primary text-white px-2 py-0.5 rounded-full uppercase shadow-[0_0_10px_rgba(0,102,255,0.3)]">
              Most Popular
            </span>
          )}
        </h3>
      </div>

      <div className="flex-1">
        <ul className="flex flex-col gap-1 mb-10">
          {pkg.features.map((feature, j) => (
            <li
              key={j}
              className="flex items-center gap-3 py-3"
            >
              <span className={`flex items-center justify-center w-5 h-5 rounded-full shrink-0 ${
                pkg.highlighted
                  ? "bg-primary/20 text-primary"
                  : "bg-white/[0.06] text-white/50"
              }`}>
                <Check size={12} strokeWidth={2.5} />
              </span>
              <span className="text-[14px] text-t-body leading-tight">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <AnimatedButton
        href="#contact"
        variant={pkg.highlighted ? "primary" : "ghost"}
        className="w-full"
      >
        SELECT TIER
      </AnimatedButton>
    </m.div>
  );
}

export default function Packages() {
  return (
    <section id="packages" className="relative py-section bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        <m.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <SectionEyebrow>Pricing</SectionEyebrow>
          <h2 className="text-h2 md:text-h1 mb-6 text-t-primary text-left">Engagement Tiers</h2>
          <p className="text-body md:text-body-lg text-t-body max-w-2xl leading-relaxed text-left">
            Select the integration framework that aligns with your operational velocity.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages.map((pkg, i) => (
            <PackageCard 
              key={i} 
              pkg={pkg} 
              index={i} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
