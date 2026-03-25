"use client";

import React, { useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  large?: boolean;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function AnimatedButton({
  children,
  variant = "primary",
  large = false,
  className = "",
  href,
  onClick,
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    if (onClick) onClick(e);
  };

  const isPrimary = variant === "primary";
  
  const baseClasses = `
    relative overflow-hidden inline-flex items-center justify-center font-semibold tracking-[-0.01em] transition-all
    ${large ? "px-12 py-[18px] text-[17px] rounded-[10px]" : "px-8 py-3.5 text-[15px] rounded-lg"}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-none"}
    ${className}
  `;

  const variantClasses = isPrimary
    ? "bg-[#005DFF] text-white border border-white/15"
    : "bg-transparent border border-white/20 text-white/80";

  const isHashLink = href?.startsWith("#");
  const Component = href ? (isHashLink ? m.a : m(Link)) : m.button;
  const commonProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: buttonRef as any,
    className: `${baseClasses} group ${variantClasses}`,
    onMouseDown: handleMouseDown,
    whileHover: isPrimary 
      ? { scale: 1.03, y: -3, boxShadow: large ? "0 16px 60px rgba(0, 93, 255, 0.6)" : "0 12px 40px rgba(0, 93, 255, 0.5)" }
      : { scale: 1.02, y: -2, borderColor: "rgba(255,255,255,0.5)", color: "#FFFFFF", backgroundColor: "rgba(255,255,255,0.04)" },
    whileTap: { scale: 0.97, y: 0, boxShadow: isPrimary ? "0 4px 15px rgba(0, 93, 255, 0.3)" : "none" },
    transition: { type: "spring", stiffness: 400, damping: 20 },
    ...(href ? { href } : { type, disabled }),
  } as any;
/* eslint-enable @typescript-eslint/no-explicit-any */

  return (
    <Component {...commonProps}>
      {/* Glow Ring for Large Button */}
      {large && isPrimary && (
        <div 
          className="absolute inset-[-4px] border border-[#005DFF]/40 rounded-[12px] pointer-events-none"
          style={{ animation: "ringPulse 2s ease-out infinite" }}
        />
      )}

      {/* Shine Sweep for Primary */}
      {isPrimary && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shine-sweep" />
        </div>
      )}

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <m.span
            key={r.id}
            initial={{ width: 0, height: 0, opacity: 0.25 }}
            animate={{ width: 600, height: 600, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bg-white/20 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: r.x, top: r.y }}
          />
        ))}
      </AnimatePresence>
    </Component>
  );
}
