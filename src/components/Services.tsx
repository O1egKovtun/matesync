"use client";
import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

const services = [
  { title: "AI Web Development", description: "Next-gen platforms with embedded AI agents." },
  { title: "Custom Models", description: "Proprietary LLMs trained on company datasets." },
  { title: "Automation Workflows", description: "Zero-touch processes with intelligent routing." },
  { title: "Data Analysis", description: "Predictive analytics uncovering opportunities." },
  { title: "AI Team Training", description: "Upskilling workforce to maximize AI tooling." },
];

interface ServiceRowProps {
  num: string;
  title: string;
  description: string;
  index: number;
}

function ServiceRow({ num, title, description, index }: ServiceRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "start 50%", "start 10%"]
  });

  // Calculate glow and color based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 1, 0.1]);
  const glow = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    ["0px 0px 0px rgba(0,123,255,0)", "0px 0px 40px rgba(0,150,255,0.8)", "0px 0px 0px rgba(0,123,255,0)"]
  );
  const color = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(255,255,255,0.1)", "rgba(255,255,255,1)", "rgba(255,255,255,0.1)"]
  );

  return (
    <m.div
      ref={containerRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      className="relative grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start md:items-center py-10 md:py-14 border-b border-border"
    >
      {/* Left: Number with scroll-triggered glow */}
      <m.div 
        style={{ 
          opacity,
          color,
          textShadow: glow
        }}
        className="text-[60px] md:text-[80px] font-bold leading-none mr-12 md:mr-20 select-none shrink-0"
      >
        {num}
      </m.div>
 
      {/* Center: Title */}
      <h3 className="text-h3 md:text-h2 text-t-primary transition-colors duration-300 flex-1 mb-4 md:mb-0">
        {title}
      </h3>
 
      {/* Right: Description */}
      <p className="text-body text-t-body transition-colors duration-300 max-w-md md:text-right">
        {description}
      </p>
    </m.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-section bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <m.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <SectionEyebrow>Solutions</SectionEyebrow>
          <h2 className="text-h2 md:text-h1 mb-6 text-t-primary text-left">Our Expertise</h2>
          <p className="text-body md:text-body-lg text-t-body max-w-2xl leading-relaxed">
            Specialized AI systems built for operational scale.
          </p>
        </m.div>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceRow 
              key={index}
              index={index}
              num={(index + 1).toString().padStart(2, "0")}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
