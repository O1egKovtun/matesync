"use client";
import Link from "next/link";
import { m } from "framer-motion";
const footerLinks = {
  about: [
    { label: "Mission", href: "#" },
    { label: "Vision", href: "#" },
  ],
  services: [
    { label: "AI Web Design", href: "#services" },
    { label: "Data Pipeline", href: "#services" },
    { label: "Automations", href: "#services" },
  ],
  contact: [
    { label: "Schedule Call", href: "#contact" },
    { label: "Support", href: "#contact" },
    { label: "Partnerships", href: "#contact" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/mate.sync/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/oleh-kovtun-2193703b8/" },
  ],
};
export default function Footer() {
  return (
    <footer className="relative bg-background py-section border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="mb-24 md:mb-32 flex justify-center overflow-hidden pointer-events-none select-none">
          <m.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 93, 255, 0.15), rgba(0, 93, 255, 0.03))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            className="text-[12vw] md:text-[80px] font-black tracking-[-0.05em] leading-none whitespace-nowrap uppercase"
          >
            MATE SYNC AGENTS
          </m.h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 mb-24 md:mb-32">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-6">
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-t-caption uppercase">
                {title}
              </h4>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-[14px] text-t-body hover:text-accent-blue transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium tracking-widest text-t-caption uppercase">
          <p>© 2025 MATE Sync. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-accent-blue rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  );
}