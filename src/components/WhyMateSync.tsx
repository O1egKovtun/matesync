"use client";

import { m } from "framer-motion";
import { Timer, BarChart, Eye, Handshake } from "lucide-react";

const reasons = [
  {
    icon: <Timer className="w-12 h-12 text-primary" />,
    title: "Speed",
    desc: "MVP in under 2 weeks, not months."
  },
  {
    icon: <BarChart className="w-12 h-12 text-primary" />,
    title: "Results in Numbers",
    desc: "Measurable KPIs, not just design."
  },
  {
    icon: <Eye className="w-12 h-12 text-primary" />,
    title: "Full Transparency",
    desc: "Shared real-time dashboard."
  },
  {
    icon: <Handshake className="w-12 h-12 text-primary" />,
    title: "True Partner",
    desc: "We sync with your business goals."
  }
];

interface ReasonCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}

function ReasonCard({ icon, title, desc, index }: ReasonCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      whileHover={{ y: -4 }}
      className="group glass-card backdrop-blur-xl bg-background/40 border border-border/5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/30 hover:shadow-glow-primary/10"
    >
      <div className="bg-background/60 border border-border/10 rounded-full p-4 mb-6 transition-all duration-300 group-hover:bg-background/80">
        {icon}
      </div>
      <h3 className="text-h3 mb-3 text-t-primary group-hover:text-accent-blue transition-colors duration-300">{title}</h3>
      <p className="text-body text-t-body leading-relaxed">{desc}</p>
    </m.div>
  );
}

function GridBackground() {
  return (
    <>
      {/* Geometric Wireframe Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10 transform-gpu bg-grid-white" />

      {/* Deep Autonomous Neon Bubbles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-[5%] left-[10%] w-[25rem] h-[25rem] lg:w-[35rem] lg:h-[35rem] bg-primary/20 rounded-full blur-[80px] transform-gpu will-change-transform animate-pulse-glow"
        />
        <div 
          className="absolute bottom-[5%] right-[10%] w-[20rem] h-[20rem] lg:w-[30rem] lg:h-[30rem] bg-secondary/15 rounded-full blur-[90px] transform-gpu will-change-transform animate-pulse-glow transition-delay-[3000ms]"
        />
      </div>

      {/* Matte Glass Frosting */}
      <div className="absolute inset-0 z-[1] backdrop-blur-[16px] bg-background/60 pointer-events-none transform-gpu" />
    </>
  );
}

import SectionEyebrow from "./SectionEyebrow";

export default function WhyMateSync() {
  return (
    <section id="why" className="py-24 md:py-32 bg-background border-y border-border relative overflow-hidden">
      <GridBackground />

      {/* FOREGROUND CONTENT */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 relative z-10">
        <m.div 
          className="text-left mb-16 md:mb-20 will-change-transform"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionEyebrow>Values</SectionEyebrow>
          <h2 className="text-h2 md:text-h1 lg:text-display mb-4 text-t-primary text-left">Why MATE Sync?</h2>
          <p className="text-body md:text-body-lg text-t-body max-w-2xl leading-relaxed text-left">Premium AI Solutions. Exceptional Partnership.</p>
        </m.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {reasons.map((item, i) => (
            <ReasonCard 
              key={i}
              index={i}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
