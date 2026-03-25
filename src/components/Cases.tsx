"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";

/* ──────────────────────────────────────────────── */
/*  CASE DATA                                       */
/* ──────────────────────────────────────────────── */

const casesData = [
  {
    id: "makkids",
    tag: "RETAIL & E-COMMERCE",
    client: "MakKids Premium",
    result: "Lightning-fast optimized platform driving high ROAS campaigns for apparel brand.",
    metrics: [
      { val: "95%", label: "UI Performance" },
      { val: "2.4x", label: "ROAS Growth" },
      { val: "Meta", label: "SDK Integration" },
    ],
    href: "https://github.com/O1egKovtun/makkids-boutique-shop",
  },
  {
    id: "logistics-ai",
    tag: "B2B LOGISTICS",
    client: "Brokerage AI",
    result: "Zero-error AI pipeline for automated trade document classification and routing.",
    metrics: [
      { val: "15+", label: "Docs Automated" },
      { val: "40h", label: "Saved Weekly" },
      { val: "0", label: "Routing Errors" },
    ],
    href: "#contact",
  },
  {
    id: "fashion-brand",
    tag: "LUXURY FASHION",
    client: "Fashion House",
    result: "Complete inventory & order fulfillment auto-pipeline for global scale.",
    metrics: [
      { val: "20m", label: "Processing" },
      { val: "340%", label: "Fulfillment" },
      { val: "$2.4k", label: "Labor Savings" },
    ],
    href: "#contact",
  },
  {
    id: "real-estate",
    tag: "LEAD GENERATION",
    client: "Estate Agency",
    result: "AI-driven ad creatives combined with 24/7 automated lead qualification.",
    metrics: [
      { val: "$12", label: "CPL Reduced" },
      { val: "3.7x", label: "Qual. Leads" },
      { val: "180%", label: "ROAS Growth" },
    ],
    href: "#contact",
  },
  {
    id: "restaurant-chain",
    tag: "TELEGRAM AUTOMATION",
    client: "Chain Locations",
    result: "AI content automation driving mass foot traffic across three primary locations.",
    metrics: [
      { val: "2,400", label: "New Subs" },
      { val: "14h", label: "Saved Weekly" },
      { val: "67%", label: "Res. Increase" },
    ],
    href: "#contact",
  },
];

interface CaseData {
  id: string;
  tag: string;
  client: string;
  result: string;
  metrics: { val: string; label: string }[];
  href: string;
}

interface CaseCardProps {
  data: CaseData;
  index: number;
}

function CaseCard({ data }: CaseCardProps) {
  return (
    <m.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-[520px] h-[360px] bg-white/[0.03] border border-border rounded-xl p-10 flex flex-col justify-between group transition-all duration-300 hover:border-primary/50 hover:shadow-case-hover relative overflow-hidden shrink-0"
    >
      <div className="relative z-10">
        <span className="text-[11px] font-bold tracking-widest text-primary uppercase mb-6 block">
          {data.tag}
        </span>
        <h3 className="text-h3 text-white mb-3">
          {data.client}
        </h3>
        <p className="text-body text-t-body leading-relaxed max-w-[400px] transform transition-all duration-500 delay-75 group-hover:translate-x-2">
          {data.result}
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-8 pt-8 border-t border-border">
        {data.metrics.map((m, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-h3 font-bold text-t-primary leading-none">
              {m.val}
            </span>
            <span className="text-[11px] text-t-body uppercase tracking-wider">
              {m.label}
            </span>
          </div>
        ))}
      </div>
      
      {/* Subtle blue glow */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </m.div>
  );
}

interface ProgressDotProps {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function ProgressDot({ index, total, scrollYProgress }: ProgressDotProps) {
  const range = [index / total, (index + 1) / total];
  const opacity = useTransform(scrollYProgress, range, [0.2, 1]);
  const scale = useTransform(scrollYProgress, range, [1, 1.2]);
  const background = useTransform(scrollYProgress, range, ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]);

  return (
    <m.div
      style={{ 
        opacity, 
        scale,
        border: "1px solid rgba(255,255,255,0.2)",
        background: background
      }}
      className="w-3 h-3 rounded-full"
    />
  );
}

export default function Cases() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the horizontal translation based on scroll progress
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const physicsX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section id="cases" ref={containerRef} className="relative h-[600vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Section Header */}
        <div className="pt-20 pb-8 pl-6 md:pl-24 z-20 shrink-0">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h2 className="text-h2 md:text-h1 lg:text-display text-t-primary mb-4 text-left">
              Our <span className="text-shimmer">Cases</span>
            </h2>
            <p className="text-body md:text-body-lg text-t-body max-w-2xl leading-relaxed text-left">
              Explore our latest high-impact AI integrations.
            </p>
          </m.div>
        </div>

        {/* Horizontal Moving Content */}
        <div className="flex items-center flex-1 min-h-0">
          <m.div
            style={{ x: physicsX }}
            className="flex gap-6 pl-[max(80px,calc((100vw-520px)/2))] pr-24"
          >
            {casesData.map((c, i) => (
              <CaseCard key={c.id} data={c} index={i} />
            ))}
          </m.div>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {casesData.map((_, i) => (
            <ProgressDot 
              key={i} 
              index={i} 
              total={casesData.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
