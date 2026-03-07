"use client";

import { useInView } from "@/hooks/use-in-view";
import { SectionHeader } from "@/components/ui/section-header";
import { GalleryItem } from "@/components/ui/gallery-item";
import { Wallet, Settings, Activity, CheckCircle } from "lucide-react";

export function GallerySection() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="gallery" className="relative py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          badge="Product Design"
          title="Engineered for Clarity"
          description="Every interaction is meticulously designed to reduce cognitive load and provide institutional traders with the context they need."
          inView={inView}
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
          {/* Card 1: Wallet Connection */}
          <GalleryItem
            title="Secure Connection"
            description="Multi-wallet integration with hardware support"
            delay={0.1}
          >
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="w-full max-w-sm rounded-2xl glass-strong border border-border/50 shadow-elevated p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Connect Wallet
                    </h4>
                    <p className="text-xs text-muted">
                      Select a provider to continue
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {["MetaMask", "WalletConnect", "Coinbase Wallet"].map(
                    (wallet, i) => (
                      <div
                        key={wallet}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-white/10" />
                          <span className="text-sm font-medium text-white">
                            {wallet}
                          </span>
                        </div>
                        {i === 0 && (
                          <span className="text-[10px] uppercase font-bold text-success bg-success/10 px-2 py-0.5 rounded-md">
                            Recent
                          </span>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </GalleryItem>

          {/* Card 2: Advanced Charting */}
          <GalleryItem
            title="Advanced Analytics"
            description="Deep technical indicators and order book depth"
            delay={0.2}
          >
            <div className="w-full h-full p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-24 h-6 rounded bg-white/5" />
                  <div className="w-16 h-6 rounded bg-primary/20" />
                </div>
                <div className="flex gap-1">
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-muted">
                    <Activity size={14} />
                  </div>
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-muted">
                    <Settings size={14} />
                  </div>
                </div>
              </div>
              <div className="flex-1 rounded-xl bg-white/5 border border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-linear-to-t from-primary/20 to-transparent" />
                <svg
                  className="absolute w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M0,80 Q25,70 50,40 T100,20"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2"
                  />
                  {/* Candlesticks abstract */}
                  <rect x="20" y="60" width="2" height="15" fill="#10B981" />
                  <rect x="19" y="65" width="4" height="6" fill="#10B981" />

                  <rect x="40" y="50" width="2" height="20" fill="#EF4444" />
                  <rect x="39" y="55" width="4" height="10" fill="#EF4444" />

                  <rect x="60" y="35" width="2" height="25" fill="#10B981" />
                  <rect x="59" y="40" width="4" height="15" fill="#10B981" />

                  <rect x="80" y="25" width="2" height="15" fill="#EF4444" />
                  <rect x="79" y="25" width="4" height="8" fill="#EF4444" />
                </svg>
              </div>
            </div>
          </GalleryItem>

          {/* Card 3: Token Selection (Span full width on mobile) */}
          <GalleryItem
            title="Smart Routing"
            description="Instant aggregate token discovery across 25+ DEXs"
            delay={0.3}
          >
            <div className="w-full h-full flex items-center justify-center p-6">
              <div className="w-full max-w-sm rounded-2xl glass border border-border/50 p-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search tokens..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white outline-none"
                    disabled
                  />
                </div>
                <div className="flex gap-2 mb-4 overflow-hidden">
                  {["ETH", "USDC", "WBTC", "UNI"].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-white/5 text-xs text-white border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="space-y-1">
                  {[
                    { s: "USDC", n: "USD Coin", b: "12,450.00" },
                    { s: "ARB", n: "Arbitrum", b: "5,000.00" },
                    { s: "OP", n: "Optimism", b: "0.00" },
                  ].map((t) => (
                    <div
                      key={t.s}
                      className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10" />
                        <div>
                          <p className="text-sm font-bold text-white leading-none">
                            {t.s}
                          </p>
                          <p className="text-xs text-muted">{t.n}</p>
                        </div>
                      </div>
                      <span className="text-sm text-white font-medium">
                        {t.b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GalleryItem>

          {/* Card 4: Confirmation */}
          <GalleryItem
            title="Optimistic Execution"
            description="Predictive UI state before on-chain confirmation"
            delay={0.4}
          >
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="w-full max-w-[280px] rounded-2xl glass-strong border border-success/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] p-6 text-center transform rotate-2">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success mx-auto mb-4 border border-success/30">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Swap Initiated
                </h4>
                <p className="text-sm text-muted mb-6">
                  Your transaction has been submitted to the network.
                </p>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-6 text-left space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Paid</span>
                    <span className="text-white font-medium">1.0 ETH</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Received</span>
                    <span className="text-success font-medium">
                      +3,842.15 USDC
                    </span>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                  View Explorer
                </button>
              </div>
            </div>
          </GalleryItem>
        </div>
      </div>
    </section>
  );
}
