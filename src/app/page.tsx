"use client";

import { useState, useCallback, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { ProblemSolutionSection } from "@/components/sections/problem-solution";
import { FeaturesSection } from "@/components/sections/features";
import { PreviewSection } from "@/components/sections/preview";
import { MetricsSection } from "@/components/sections/metrics";
import { CaseStudyModal } from "@/components/sections/case-study-modal";
import { TradingInterface } from "@/components/sections/trading-interface";
import { GallerySection } from "@/components/sections/gallery";

export default function HomePage() {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);

  const handleOpenCaseStudy = useCallback(() => {
    setCaseStudyOpen(true);
  }, []);

  // Listen for case study trigger from hero button
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-case-study-trigger]")) {
        handleOpenCaseStudy();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [handleOpenCaseStudy]);

  return (
    <div className="bg-[#0B0F19] min-h-screen overflow-x-hidden relative w-full flex flex-col">
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden">
        <HeroSection />
        <ProblemSolutionSection />
        <TradingInterface />
        <FeaturesSection />
        <GallerySection />
        <PreviewSection />
        <MetricsSection />
      </main>
      <Footer />
      <CaseStudyModal
        isOpen={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
      />
    </div>
  );
}
