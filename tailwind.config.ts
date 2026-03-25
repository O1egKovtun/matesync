import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        secondary: "var(--secondary)",
        border: "var(--border)",
        "pill-bg": "var(--pill-bg)",
        "pill-border": "var(--pill-border)",
        "t-primary": "var(--color-text-primary)",
        "t-secondary": "var(--color-text-secondary)",
        "t-body": "var(--color-text-body)",
        "t-caption": "var(--color-text-caption)",
        "accent-blue": "var(--color-accent-blue)",
      },
      spacing: {
        section: "var(--space-section)",
        lg: "var(--space-lg)",
        md: "var(--space-md)",
        sm: "var(--space-sm)",
      },
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "700" }],
        h1: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        h2: ["2.5rem", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "600" }],
        h3: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", letterSpacing: "-0.01em", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.65", fontWeight: "400" }],
        caption: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.02em", fontWeight: "500" }],
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.08em", fontWeight: "600" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-gradient": "linear-gradient(to right, #00E0FF, #9D00FF)",
      },
      boxShadow: {
        "glow-primary": "0 0 20px -2px rgba(0, 224, 255, 0.4)",
        "glow-secondary": "0 0 20px -2px rgba(157, 0, 255, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
