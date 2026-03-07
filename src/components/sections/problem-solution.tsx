"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Layers, Zap } from "lucide-react";

export function ProblemSolutionSection() {
  const [ref, inView] = useInView();

  return (
    <section className="relative py-16 sm:py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 sm:mb-6">
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

            {/* Animated Flow Diagram */}
            <div className="mt-10 p-6 md:p-8 rounded-2xl glass-strong border border-border/50 shadow-elevated relative overflow-hidden group">
              {/* Background ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                {/* Top Row: Liquidity Sources */}
                <div className="flex justify-between items-end mb-6">
                  {["Uniswap", "Curve", "Balancer"].map((dex, i) => (
                    <motion.div
                      key={dex}
                      className="flex flex-col items-center"
                      initial={{ y: 0 }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 3,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 shadow-sm">
                        <span className="text-primary text-sm font-bold">
                          {["🦄", "🌈", "⚖️"][i]}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs text-muted uppercase font-medium tracking-wider">
                        {dex}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Middle: Smart Router */}
                <div className="relative flex justify-center py-6">
                  {/* Connection Lines */}
                  <div className="absolute top-0 left-[15%] w-[35%] h-1/2 border-l-2 border-t-2 border-primary/20 rounded-tl-xl border-dashed" />
                  <div className="absolute top-0 right-[15%] w-[35%] h-1/2 border-r-2 border-t-2 border-primary/20 rounded-tr-xl border-dashed" />
                  <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-primary/20 border-dashed" />

                  {/* Moving dots on lines */}
                  <motion.div
                    className="absolute w-1.5 h-1.5 bg-primary rounded-full blur-[1px] shadow-[0_0_8px_#00F0FF]"
                    animate={{
                      top: ["0%", "50%"],
                      left: ["15%", "50%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute w-1.5 h-1.5 bg-primary rounded-full blur-[1px] shadow-[0_0_8px_#00F0FF]"
                    animate={{
                      top: ["0%", "50%"],
                      left: ["50%", "50%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute w-1.5 h-1.5 bg-primary rounded-full blur-[1px] shadow-[0_0_8px_#00F0FF]"
                    animate={{
                      top: ["0%", "50%"],
                      left: ["85%", "50%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Router Node */}
                  <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-primary to-secondary p-px shadow-glow-primary group-hover:shadow-glow-primary-intense transition-shadow duration-500">
                    <div className="w-full h-full bg-[#0E131F] rounded-[15px] flex items-center justify-center flex-col">
                      <Zap size={20} className="text-primary mb-1" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                        Router
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom: Execution Output */}
                <div className="relative flex justify-center pt-6">
                  <div className="absolute top-0 left-1/2 w-0.5 h-6 bg-success/30" />
                  <motion.div
                    className="absolute w-2 h-2 bg-success rounded-full blur-[1px] shadow-[0_0_8px_#10B981]"
                    animate={{ top: ["0%", "24px"], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />

                  <div className="px-6 py-3 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success">
                      ✓
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        Optimal Execution
                      </div>
                      <div className="text-xs text-success font-medium">
                        0.01% Price Impact
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
