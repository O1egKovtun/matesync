"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Instagram, Linkedin } from "lucide-react";
import { m, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import AnimatedButton from "./AnimatedButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const logoRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    VanillaTilt.init(el, { max: 8, speed: 400, glare: false });
    return () => {
      (el as HTMLDivElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt?.destroy();
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["services", "cases", "packages", "contact"];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services", id: "services" },
    { name: "Cases", href: "#cases", id: "cases" },
    { name: "Packages", href: "#packages", id: "packages" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <m.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-black/40 backdrop-blur-[24px] border-white/[0.06]" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 grid grid-cols-[auto_1fr_auto] items-center relative z-50">
        {/* Logo Left */}
        <Link href="/" className="flex items-center shrink-0">
          <m.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 }}
          >
            <div ref={logoRef}>
              <Image
                src="/logo.svg"
                alt="MATE Sync Logo"
                width={132}
                height={44}
                className="h-[44px] w-auto object-contain transition-opacity hover:opacity-80"
                priority
              />
            </div>
          </m.div>
        </Link>

        {/* Desktop Links Center */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[14px] font-medium transition-colors duration-200 ease-in-out py-2 group ${
                  isActive ? "text-accent-blue" : "text-t-body hover:text-t-primary"
                }`}
              >
                {link.name}
                {/* Active Dot */}
                {isActive && (
                  <m.div 
                    layoutId="activeDot"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 bg-accent-blue rounded-full"
                  />
                )}
                {/* Hover Dot */}
                {!isActive && (
                  <m.div 
                    initial={{ scale: 0, x: "-50%" }}
                    whileHover={{ scale: 1, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 bg-accent-blue/40 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Right */}
        <div className="hidden md:flex items-center shrink-0">
          <AnimatedButton href="#contact">
            Start Project
          </AnimatedButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white relative z-50 transition-transform p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#030014] z-40 flex flex-col items-center justify-center p-12"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <m.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-bold text-t-primary hover:text-accent-blue transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-8"
              >
                <AnimatedButton 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-8 py-4 text-lg"
                >
                  Start Project
                </AnimatedButton>
              </m.div>
            </div>

            {/* Socials in Mobile Menu */}
            <div className="absolute bottom-12 flex gap-8">
              <Link href="https://www.instagram.com/mate.sync/" target="_blank" className="text-white/40 hover:text-white transition-colors">
                <Instagram size={24} />
              </Link>
              <Link href="https://www.linkedin.com/in/mate-sync-2193703b8/" target="_blank" className="text-white/40 hover:text-white transition-colors">
                <Linkedin size={24} />
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
  );
}
