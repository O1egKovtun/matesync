"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyMateSync from "@/components/WhyMateSync";
import Cases from "@/components/Cases";
import Packages from "@/components/Packages";
import TechMarquee from "@/components/TechMarquee";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <Divider />
      <Services />
      <Divider />
      <WhyMateSync />
      <Divider />
      <Cases />
      <Divider />
      <Packages />
      <Divider />
      <TechMarquee />
      <Divider />
      <FAQ />
      <Divider />
      <ContactForm />
      <Footer />
    </main>
  );
}
