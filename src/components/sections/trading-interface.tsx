"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Settings2, Loader2, ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { tokens, priceDataByTimeframe } from "@/lib/mock-data";
import type { Timeframe } from "@/types";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const timeframes: Timeframe[] = ["1H", "24H", "7D", "30D"];

// --- Mock Components for the Preview ---

function MiniSparkline({
  data,
  isPositive,
}: {
  data: any[];
  isPositive: boolean;
}) {
  const color = isPositive ? "#10B981" : "#EF4444";
  return (
    <div className="h-8 w-16">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`spark-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#spark-${color})`}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TradingInterface() {
  const [ref, inView] = useInView();
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>("24H");
  const [isSwapping, setIsSwapping] = useState(false);

  // Use a subset of tokens for the left panel
  const marketTokens = tokens.slice(0, 5);

  const handleSimulateSwap = () => {
    setIsSwapping(true);
    setTimeout(() => setIsSwapping(false), 1500);
  };

  return (
    <section
      id="trading-interface"
      className="relative py-24 overflow-hidden"
      ref={ref}
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        <SectionHeader
          badge="Live Interface Preview"
          title="Institutional-Grade Trading UI"
          description="A powerful, uncompromising interface designed for professional traders. Execute complex strategies with sub-second latency."
          inView={inView}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 group"
        >
          {/* Main App Container Mockup */}
          <div className="rounded-2xl glass-strong border border-border/50 overflow-hidden shadow-elevated group-hover:glow-primary transition-all duration-700">
            {/* Fake App Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-black/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger/80" />
                <div className="w-3 h-3 rounded-full bg-warning/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 text-xs text-muted font-mono">
                app.defiexchangepro.io
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-xs font-medium text-white">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Connected
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
                  0x7A...3f9C
                </div>
              </div>
            </div>

            {/* 3-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-border/30 h-[600px] overflow-hidden">
              {/* Left Column: Markets */}
              <div className="hidden lg:flex lg:col-span-3 flex-col bg-surface/80 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                    Markets
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 rounded"
                  >
                    <Settings2 size={14} />
                  </Button>
                </div>

                <div className="space-y-2 flex-1 overflow-auto pr-2 scrollbar-hide">
                  {marketTokens.map((token, i) => (
                    <motion.div
                      key={token.symbol}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        i === 0
                          ? "bg-primary/5 border-primary/20 glow-primary"
                          : "bg-white/2 border-transparent hover:bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">
                            {token.symbol}/USDC
                          </span>
                        </div>
                        <span
                          className={`text-xs font-medium ${token.change24h >= 0 ? "text-success" : "text-danger"}`}
                        >
                          {token.change24h >= 0 ? "+" : ""}
                          {token.change24h}%
                        </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-sm text-muted">
                          $
                          {token.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        {/* Static sparkline using 1H data for visual flair */}
                        <MiniSparkline
                          data={priceDataByTimeframe["1H"]}
                          isPositive={token.change24h >= 0}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Center Column: Chart */}
              <div className="col-span-1 lg:col-span-6 flex flex-col bg-surface/90 relative">
                {/* Chart Header */}
                <div className="p-4 sm:p-6 pb-0 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      ETH / USDC
                      <span className="text-sm px-2 py-0.5 rounded-md bg-success/10 text-success font-medium">
                        +2.34%
                      </span>
                    </h2>
                    <div className="text-3xl font-bold text-primary mt-1">
                      $3,847.52
                    </div>
                  </div>

                  <div className="flex items-center gap-1 p-1 rounded-lg bg-black/40 border border-white/5">
                    {timeframes.map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setActiveTimeframe(tf)}
                        className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                          activeTimeframe === tf
                            ? "bg-white/10 text-white shadow-sm"
                            : "text-muted hover:text-white"
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated Chart Area */}
                <div className="flex-1 p-4 sm:p-6 min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTimeframe}
                      initial={{ opacity: 0, scaleY: 0.9 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={priceDataByTimeframe[activeTimeframe]}>
                          <defs>
                            <linearGradient
                              id="mainGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="#00E5FF"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="100%"
                                stopColor="#00E5FF"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="time" hide />
                          <YAxis domain={["auto", "auto"]} hide />
                          <Tooltip
                            contentStyle={{
                              background: "rgba(17,24,39,0.9)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                              color: "#fff",
                            }}
                            itemStyle={{ color: "#00E5FF", fontWeight: 600 }}
                            formatter={(value: any) => [
                              `$${Number(value || 0).toFixed(2)}`,
                              "Price",
                            ]}
                            labelStyle={{
                              color: "#9CA3AF",
                              marginBottom: "4px",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#00E5FF"
                            strokeWidth={2.5}
                            fill="url(#mainGradient)"
                            animationDuration={1500}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Order Entry */}
              <div className="col-span-1 lg:col-span-3 bg-surface/80 p-4 sm:p-6 border-l border-border/30">
                <div className="flex items-center gap-4 mb-6">
                  <button className="flex-1 pb-2 border-b-2 border-primary text-sm font-semibold text-white">
                    Swap
                  </button>
                  <button className="flex-1 pb-2 border-b-2 border-transparent text-sm font-medium text-muted hover:text-white transition-colors">
                    Limit
                  </button>
                </div>

                <div className="space-y-1 relative">
                  {/* From Token */}
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors group/input">
                    <div className="text-xs text-muted mb-2 flex justify-between">
                      <span>You pay</span>
                      <span>Balance: 2.45 ETH</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value="1.0"
                        readOnly
                        className="bg-transparent text-3xl font-semibold text-white outline-none w-1/2"
                      />
                      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                          ⟠
                        </span>
                        <span className="font-medium text-white">ETH</span>
                        <ChevronDown size={14} className="text-muted" />
                      </button>
                    </div>
                    <div className="text-xs text-muted mt-2">$3,847.52</div>
                  </div>

                  {/* Swap Arrow Subtly overlapping */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <button className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-white hover:text-primary hover:glow-primary transition-all shadow-md">
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        ↓
                      </motion.div>
                    </button>
                  </div>

                  {/* To Token */}
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors group/input">
                    <div className="text-xs text-muted mb-2">
                      You receive (estimated)
                    </div>
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value="3841.25"
                        readOnly
                        className="bg-transparent text-3xl font-semibold text-white outline-none w-1/2"
                      />
                      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors">
                        <span className="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-xs text-white uppercase font-bold">
                          U
                        </span>
                        <span className="font-medium text-white">USDC</span>
                        <ChevronDown size={14} className="text-muted" />
                      </button>
                    </div>
                    <div className="text-xs text-muted mt-2">
                      1 ETH = 3,841.25 USDC
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-3 px-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Price Impact</span>
                    <span className="text-success font-medium">&lt; 0.01%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Max Slippage</span>
                    <span className="text-white">0.5%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Network Fee</span>
                    <span className="text-white">~$2.40</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Route</span>
                    <span className="text-primary cursor-pointer hover:underline">
                      Optimized (3 hops)
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full mt-6 h-14 text-base shadow-glow-primary relative overflow-hidden group"
                  onClick={handleSimulateSwap}
                  disabled={isSwapping}
                >
                  <AnimatePresence mode="wait">
                    {isSwapping ? (
                      <motion.div
                        key="swapping"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 size={18} className="animate-spin" />
                        Confirming in Wallet...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ready"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Swap Tokens
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
