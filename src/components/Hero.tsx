"use client";

import CountUp from "react-countup";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import SectionEyebrow from "./SectionEyebrow";
import AnimatedButton from "./AnimatedButton";

const Logo3D = dynamic(() => import("./Logo3D"), { ssr: false });

interface StatItemProps {
  num: number;
  suffix: string;
  label: string;
  isLast?: boolean;
  mounted: boolean;
}

function StatItem({ num, suffix, label, isLast, mounted }: StatItemProps) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col pr-8 lg:pr-12">
        <div className={`text-h3 md:text-h2 font-bold text-accent-blue leading-none mb-1`}>
          {mounted ? <CountUp end={num} duration={2} /> : "0"}
          {suffix}
        </div>
        <div className="text-t-caption uppercase tracking-wider font-semibold text-[10px] md:text-xs">
          {label}
        </div>
      </div>
      {!isLast && <div className="h-10 w-[1px] bg-white/10 mr-8 lg:mr-12" />}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);


  const description = "We build AI-powered websites, creatives, automation & brand models. From idea to MVP in under 2 weeks.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  useEffect(() => {
    setMounted(true);

    const el = heroRef.current;
    if (!el || typeof window === "undefined" || window.innerWidth < 768) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty('--mouse-x', x.toString());
        el.style.setProperty('--mouse-y', y.toString());
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const stats = [
    { num: 14, suffix: "d", label: "MVP Delivery" },
    { num: 15, suffix: "+", label: "AI Processes" },
    { num: 90, suffix: "%", label: "Automation" },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative py-20 md:py-40 bg-background overflow-hidden flex items-center justify-center transform-gpu min-h-[90vh]"
    >
      
      {/* Floating Particles Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              "--particle-size": `${2 + (i % 3)}px`,
              "--particle-duration": `${4 + (i % 5)}s`,
              "--particle-delay": `${(i * 0.7) % 5}s`,
              "--particle-left": `${(i * 9.3) % 100}%`,
              "--particle-opacity": `${0.4 + (i % 5) * 0.1}`,
              top: "100%",
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Background Blobs Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blob 1: Blue */}
        <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[100px] -right-[100px] w-[600px] h-[600px] bg-[#005DFF] rounded-full blur-[120px] opacity-[0.06] transform-gpu"
        />
        {/* Blob 2: Purple */}
        <motion.div 
          animate={{ 
            x: [0, -20, 0], 
            y: [0, 30, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-[#6C63FF] rounded-full blur-[100px] opacity-[0.04] transform-gpu"
        />
      </div>

      <div className="absolute inset-0 z-[1] backdrop-blur-[40px] bg-background/60 pointer-events-none transform-gpu" />

      {/* FOREGROUND CONTENT */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        
        {/* Left Column (60%) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Eyebrow */}
          <motion.div variants={wordVariants}>
            <SectionEyebrow>AI Agency</SectionEyebrow>
          </motion.div>
  
          {/* Headline */}
          <h1 className="text-h1 lg:text-display text-t-primary mb-8 leading-tight">
            {"Your AI Partner for Growth.".split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.06,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            variants={wordVariants}
            className="text-body-lg text-t-body mb-12 max-w-[480px] leading-relaxed"
          >
            {description}
          </motion.p>

          {/* CTA Row */}
          <motion.div variants={wordVariants} className="flex flex-wrap items-center gap-8 mb-16">
            <AnimatedButton href="#contact" large className="gap-3">
              Start Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </AnimatedButton>
            
            <AnimatedButton 
              href="#cases" 
              variant="ghost"
              className="text-t-body hover:text-t-primary transition-colors duration-200 text-label flex items-center gap-2 group border-none hover:bg-transparent"
            >
              See our work <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </AnimatedButton>
          </motion.div>

          {/* Inline Stats Row */}
          <motion.div 
            variants={wordVariants}
            className="flex flex-wrap items-center gap-y-6"
          >
            {stats.map((stat, i) => (
              <StatItem 
                key={i} 
                {...stat} 
                isLast={i === stats.length - 1} 
                mounted={mounted} 
              />
            ))}
          </motion.div>
        </motion.div>


        {/* Right Column (40%) - 3D Logo */}
        <div className="hidden lg:flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-20"
          >
            <Logo3D />
          </motion.div>
          
          {/* Subtle geometric element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-80 h-80 border border-white/5 rounded-full animate-pulse" />
            <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </div>

      </div>
    </section>
  );
}
