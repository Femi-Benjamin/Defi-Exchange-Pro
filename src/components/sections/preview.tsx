"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PreviewSection() {
  const [ref, inView] = useInView();

  return (
    <section id="preview" className="relative py-16 sm:py-32 overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Experience the Platform
          </h2>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            A glimpse into the institutional-grade trading interface.
          </p>
        </motion.div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="group relative"
        >
          <div className="relative rounded-2xl glass overflow-hidden transition-all duration-500 group-hover:glow-primary group-hover:scale-[1.01]">
            {/* Top bar mock */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
              </div>
              <div className="flex-1 mx-8">
                <div className="mx-auto max-w-xs px-4 py-1.5 rounded-lg bg-white/5 text-xs text-muted text-center">
                  app.defiexchangepro.io/dashboard
                </div>
              </div>
              <div className="w-16" />
            </div>

            {/* Dashboard mockup */}
            <div className="p-3 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 min-h-[250px] sm:min-h-[400px]">
              {/* Left: Markets */}
              <div className="hidden sm:block col-span-3 space-y-3">
                <div className="text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                  Markets
                </div>
                {[
                  { pair: "ETH/USDC", change: "+2.34%", positive: true },
                  { pair: "BTC/USDC", change: "+1.12%", positive: true },
                  { pair: "SOL/USDC", change: "-1.87%", positive: false },
                  { pair: "ARB/ETH", change: "+5.67%", positive: true },
                  { pair: "AVAX/USDC", change: "-0.54%", positive: false },
                ].map(({ pair, change, positive }) => (
                  <div
                    key={pair}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/2 hover:bg-white/5 transition-colors"
                  >
                    <span className="text-xs text-white">{pair}</span>
                    <span
                      className={`text-xs ${positive ? "text-success" : "text-danger"}`}
                    >
                      {change}
                    </span>
                  </div>
                ))}
              </div>

              {/* Center: Chart */}
              <div className="col-span-1 sm:col-span-6">
                <div className="h-full rounded-xl bg-white/2 border border-border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-sm font-semibold text-white">
                        ETH / USDC
                      </span>
                      <span className="ml-2 text-xs text-success">+2.34%</span>
                    </div>
                    <div className="flex gap-1">
                      {["1H", "24H", "7D", "30D"].map((tf) => (
                        <div
                          key={tf}
                          className={`px-2 py-0.5 rounded text-xs ${tf === "24H" ? "bg-primary/20 text-primary" : "text-muted"}`}
                        >
                          {tf}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Synthetic chart line */}
                  <svg
                    className="w-full h-48"
                    viewBox="0 0 400 150"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="rgba(0,229,255,0.2)" />
                        <stop offset="100%" stopColor="rgba(0,229,255,0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,120 Q30,110 60,95 T120,80 T180,50 T240,65 T300,30 T360,45 T400,20"
                      fill="none"
                      stroke="#00E5FF"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,120 Q30,110 60,95 T120,80 T180,50 T240,65 T300,30 T360,45 T400,20 V150 H0 Z"
                      fill="url(#chartGrad)"
                    />
                  </svg>
                </div>
              </div>

              {/* Right: Order */}
              <div className="hidden sm:block col-span-3 space-y-3">
                <div className="text-xs font-medium text-muted mb-2 uppercase tracking-wider">
                  Swap
                </div>
                <div className="p-3 rounded-lg bg-white/2 border border-border space-y-3">
                  <div>
                    <span className="text-xs text-muted">From</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-white">1.0</span>
                      <span className="text-xs text-primary">ETH</span>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <span className="text-xs text-muted">To (estimated)</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm text-white">3,847.52</span>
                      <span className="text-xs text-primary">USDC</span>
                    </div>
                  </div>
                </div>
                <div className="w-full py-2.5 rounded-lg bg-primary text-center text-xs font-semibold text-[#0B0F19]">
                  Swap Tokens
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Explore the Platform
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
