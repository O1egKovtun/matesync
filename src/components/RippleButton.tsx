"use client";

import React, { useRef, useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  href?: string;
}

export default function RippleButton({ 
  children, 
  className = "", 
  variant = "primary",
  onClick,
  href,
  ...props 
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const createRipple = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);
    if (onClick) (onClick as (e: React.MouseEvent) => void)(e);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (ripples.length > 0) {
        setRipples((prev) => prev.slice(1));
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, [ripples]);

  const baseStyles = "relative overflow-hidden transition-all duration-300 cubic-bezier(0.25, 0.46, 0.45, 0.94) flex items-center justify-center font-semibold tracking-[-0.01em]";
  
  const variants = {
    primary: "bg-[#005DFF] text-white border border-white/10 rounded-lg px-7 py-3.5 text-[15px] hover:bg-[#1A6FFF] transition-colors duration-300 active:scale-[0.98]",
    ghost: "bg-transparent text-t-body border border-border rounded-lg px-7 py-3.5 text-[15px] hover:bg-white/[0.04] hover:text-t-primary hover:border-t-primary/30 transition-all duration-300 active:scale-[0.98]",
  };

  const Component = (href ? m(Link) : m.button) as React.ElementType;
  const componentProps = href ? { href, ...props } : props;

  return (
    <Component
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={createRipple}
      {...componentProps}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      <AnimatePresence mode="popLayout">
        {ripples.map((ripple) => (
          <m.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute bg-white/20 rounded-full pointer-events-none z-0"
            style={{
              width: Math.max(buttonRef.current?.offsetWidth || 0, buttonRef.current?.offsetHeight || 0) * 2,
              height: Math.max(buttonRef.current?.offsetWidth || 0, buttonRef.current?.offsetHeight || 0) * 2,
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
      </AnimatePresence>
    </Component>
  );
}
