"use client";
import { useState, useMemo } from "react";
import AnimatedButton from "./AnimatedButton";
import { m } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-[13px] text-t-body font-medium tracking-wide uppercase">
          {label}
        </label>
        <span className="text-[15px] font-bold text-white tabular-nums">
          {unit === "$" ? `$${value}` : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calculator-slider w-full"
      />
    </div>
  );
}

export default function Packages() {
  const [employees, setEmployees] = useState(10);
  const [wage, setWage] = useState(35);
  const [hours, setHours] = useState(20);

  const results = useMemo(() => {
    const annualCost = employees * wage * hours * 52;
    const timeWasted = employees * hours * 52;
    const savings = Math.round(annualCost * 0.7);
    return { annualCost, timeWasted, savings };
  }, [employees, wage, hours]);

  return (
    <section id="packages" className="relative py-section bg-background overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <SectionEyebrow>Calculator</SectionEyebrow>
          <h2 className="text-h2 md:text-h1 mb-4 font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#38BDF8] via-[#A855F7] to-[#EC4899]">
            YOUR MANUAL EFFORT LEAKAGE
          </h2>
          <p className="text-body md:text-body-lg text-t-body max-w-2xl leading-relaxed">
            Calculate how much manual workflows are costing your business.{" "}
            <span className="text-white font-semibold">FIX THE DRAIN.</span>
          </p>
        </m.div>

        {/* Glass Card */}
        <m.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Column 1: Inputs */}
            <div className="flex flex-col gap-10">
              <h3 className="text-label uppercase tracking-widest text-t-caption mb-2">
                Your Current Setup
              </h3>
              <SliderInput
                label="Number of Manual Employees"
                value={employees}
                min={1}
                max={100}
                step={1}
                unit=""
                onChange={setEmployees}
              />
              <SliderInput
                label="Average Hourly Wage"
                value={wage}
                min={10}
                max={150}
                step={5}
                unit="$"
                onChange={setWage}
              />
              <SliderInput
                label="Manual Hours / Week"
                value={hours}
                min={1}
                max={60}
                step={1}
                unit=""
                onChange={setHours}
              />
            </div>

            {/* Column 2: Results */}
            <div className="flex flex-col justify-between gap-8 lg:pl-8 lg:border-l lg:border-white/[0.06]">
              <h3 className="text-label uppercase tracking-widest text-t-caption">
                Your Total Leakage
              </h3>

              <div className="flex flex-col gap-8">
                {/* Annual Manual Cost */}
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-t-caption mb-2 font-semibold">
                    Annual Manual Cost
                  </p>
                  <p className="text-h2 md:text-h1 font-bold text-[#A855F7] tabular-nums leading-none drop-shadow-[0_0_24px_rgba(168,85,247,0.35)]">
                    ${results.annualCost.toLocaleString()}
                  </p>
                </div>

                {/* Time Wasted / Year */}
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-t-caption mb-2 font-semibold">
                    Time Wasted / Year
                  </p>
                  <p className="text-h2 md:text-h1 font-bold text-[#38BDF8] tabular-nums leading-none drop-shadow-[0_0_24px_rgba(56,189,248,0.35)]">
                    {results.timeWasted.toLocaleString()}h
                  </p>
                </div>

                {/* Potential Savings */}
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-t-caption mb-2 font-semibold">
                    Fix via Mate Sync (Potential Savings)
                  </p>
                  <p className="text-h2 md:text-h1 font-bold text-[#4ADE80] tabular-nums leading-none drop-shadow-[0_0_24px_rgba(74,222,128,0.35)]">
                    ${results.savings.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="relative mt-4 w-fit">
                <div
                  className="absolute inset-[-5px] rounded-[14px] border border-[#005DFF]/40 pointer-events-none"
                  style={{ animation: "ringPulse 2s ease-out infinite" }}
                />
                <AnimatedButton href="#contact" large className="gap-3">
                  FIX MY WORKFLOWS
                </AnimatedButton>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
