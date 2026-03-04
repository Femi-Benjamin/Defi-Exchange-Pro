"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { ArrowRight, Layers, Zap } from "lucide-react";

export function ProblemSolutionSection() {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Problem */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-danger/10 text-danger text-xs font-medium mb-6">
              <Layers size={12} />
              The Problem
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              Fragmented Liquidity Kills Execution
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Trading across decentralized exchanges means fragmented liquidity
              pools, inconsistent pricing, and poor execution quality. Large
              orders face excessive slippage, and traders are forced to manually
              route across protocols — losing time, money, and opportunity.
            </p>
            <div className="space-y-4">
              {[
                "Liquidity scattered across 50+ DEXs",
                "Manual routing leads to suboptimal fills",
                "High slippage on institutional-size orders",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-muted"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-danger" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Solution */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium mb-6">
              <Zap size={12} />
              The Solution
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
              Aggregated Liquidity, Optimized Routing
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              DeFi Exchange Pro aggregates liquidity from 25+ sources in real
              time, algorithmically splitting and routing orders for optimal
              execution. Our smart order routing engine minimizes slippage and
              maximizes fill quality — automatically.
            </p>
            <div className="space-y-4">
              {[
                "25+ liquidity sources aggregated in real time",
                "Algorithmic order splitting for minimal slippage",
                "Sub-second execution with optimistic UI feedback",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-muted"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-success" />
                  {item}
                </div>
              ))}
            </div>

            {/* Visual diagram */}
            <div className="mt-10 p-6 rounded-2xl glass relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary text-lg">⟠</span>
                  </div>
                  <span className="text-xs text-muted">DEX Pool A</span>
                </div>
                <ArrowRight size={16} className="text-primary/40" />
                <div className="text-center">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-2 glow-primary">
                    <span className="text-[#0B0F19] text-sm font-bold">DX</span>
                  </div>
                  <span className="text-xs text-primary font-medium">
                    Router
                  </span>
                </div>
                <ArrowRight size={16} className="text-primary/40" />
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
                    <span className="text-success text-lg">✓</span>
                  </div>
                  <span className="text-xs text-muted">Best Price</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
