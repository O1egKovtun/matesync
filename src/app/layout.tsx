import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LazyMotion, domAnimation } from "framer-motion";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MATE Sync - Your AI Partner for Business Growth",
  description: "We build AI-powered websites, creatives, automation & brand models. From idea to launch in 48h.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.className} bg-background text-foreground antialiased`}>
        <LazyMotion features={domAnimation}>
          <ScrollProgress />
          <Cursor />
          {children}
        </LazyMotion>
      </body>
    </html>
  );
}
