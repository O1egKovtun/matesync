"use client";

import { useEffect, useState } from "react";
import { m, useSpring, useMotionValue } from "framer-motion";

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState<"none" | "button" | "text">("none");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs: Outer ring (120/18), Inner dot (500/28)
  const outerX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const outerY = useSpring(mouseY, { stiffness: 120, damping: 18 });
  const innerX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const innerY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isButton = target.closest('a, button, .cursor-hover');
      const isText = target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'SPAN' || target.tagName === 'LABEL';

      if (isButton) setHoverType("button");
      else if (isText) setHoverType("text");
      else setHoverType("none");
    };

    // Inject cursor-hover class on mount
    const injectClass = () => {
      document.querySelectorAll('a, button').forEach(el => 
        el.classList.add('cursor-hover'));
    };
    injectClass();
    
    // Also use a MutationObserver to catch dynamic elements
    const observer = new MutationObserver(injectClass);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      <m.div
        className="fixed top-0 left-0 w-9 h-9 border-[1.5px] border-white/80 rounded-full pointer-events-none z-[99999] flex items-center justify-center transform-gpu"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: hoverType === "button" ? 1.8 : hoverType === "text" ? 2.5 : 1,
          borderColor: hoverType === "button" ? "#005DFF" : hoverType === "text" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.8)",
          backgroundColor: hoverType === "button" ? "rgba(0, 93, 255, 0.1)" : "transparent",
          mixBlendMode: hoverType === "text" ? "difference" : "normal",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      <m.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[99999] transform-gpu"
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: hoverType === "button" ? 0 : 1,
          opacity: hoverType === "button" ? 0 : 1,
        }}
      />
    </>
  );
}
