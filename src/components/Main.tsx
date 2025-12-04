"use client";

import { useScroll, useTransform } from "framer-motion";
import {
  HeroSection,
  ProblemSection,
  SolutionSection,
  DemoSection,
  ProcessSection,
  CTASection,
  Footer,
} from "@/components/sections";

export default function Main() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main className="relative overflow-hidden bg-dark-900">
      <HeroSection heroOpacity={heroOpacity} heroScale={heroScale} />
      <ProblemSection />
      <SolutionSection />
      <DemoSection />
      <ProcessSection />
      <CTASection />
      <Footer />
    </main>
  );
}
