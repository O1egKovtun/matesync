"use client";
import { useEffect, useRef, useState } from "react";

export function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Hardware-accelerated bi-directional revealing
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        // Only dynamically collapse if the user scrolls upwards past the card (the element goes back to the bottom of the viewport)
        if (entry.boundingClientRect.top > 0) {
          setIsVisible(false);
        }
      }
    }, { threshold, rootMargin: "0px 0px -50px 0px" });

    observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  return { ref, isVisible };
}
