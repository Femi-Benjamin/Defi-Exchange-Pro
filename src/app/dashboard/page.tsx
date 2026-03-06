"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { MarketsPanel } from "@/components/dashboard/markets-panel";
import { SwapCard } from "@/components/dashboard/swap-card";
import { ActiveOrders } from "@/components/dashboard/active-orders";
import { useCryptoData, CryptoData } from "@/hooks/use-crypto-data";

// Lazy load heavy chart component
const ChartArea = dynamic(
  () =>
    import("@/components/dashboard/chart-area").then((mod) => ({
      default: mod.ChartArea,
    })),
  {
    loading: () => (
      <div className="flex-1 glass rounded-2xl flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted text-sm">Loading chart...</div>
      </div>
    ),
    ssr: false,
  },
);

const TransactionHistory = dynamic(
  () =>
    import("@/components/dashboard/transaction-history").then((mod) => ({
      default: mod.TransactionHistory,
    })),
  {
    loading: () => (
      <div className="glass rounded-2xl flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse text-muted text-sm">Loading...</div>
      </div>
    ),
    ssr: false,
  },
);

export default function DashboardPage() {
  const { data: tokens } = useCryptoData();
  const [userSelectedToken, setUserSelectedToken] = useState<CryptoData | null>(
    null,
  );

  // Derive the active token: user choice > default (ETH) > first in list
  const selectedToken = useMemo(() => {
    if (userSelectedToken) return userSelectedToken;
    if (tokens.length === 0) return null;
    return tokens.find((t) => t.symbol.toLowerCase() === "eth") || tokens[0];
  }, [userSelectedToken, tokens]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="pt-[60px]">
        {/* Dashboard Grid */}
        <div className="mx-auto max-w-[1920px] px-4 md:px-6 py-6 h-full">
          {/* Mobile stacking, large screen 12-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Left Column: Markets (Sticky on desktop) */}
            <div className="lg:col-span-3 lg:col-start-1 lg:sticky lg:top-[88px] h-[400px] lg:h-[calc(100vh-112px)]">
              <MarketsPanel
                selectedTokenId={selectedToken?.id}
                onSelectToken={setUserSelectedToken}
              />
            </div>

            {/* Center Column: Chart & Action */}
            <div className="lg:col-span-6 lg:col-start-4 flex flex-col gap-6 min-h-[400px]">
              <div className="glass rounded-2xl p-1 shrink-0 h-[300px] sm:h-[400px] lg:h-[500px]">
                <ChartArea selectedToken={selectedToken} />
              </div>

              <div className="flex-1 w-full hidden lg:block">
                <ActiveOrders />
              </div>

              <div className="w-full max-w-md mx-auto xl:hidden pb-10">
                <SwapCard
                  initialFromToken={selectedToken?.symbol.toUpperCase()}
                />
              </div>

              <div className="w-full lg:hidden pb-10">
                <ActiveOrders />
              </div>
            </div>

            {/* Right Column: Order/Swap & History */}
            <div className="lg:col-span-3 lg:col-start-10 lg:sticky lg:top-[88px] flex flex-col gap-6 h-auto lg:h-[calc(100vh-112px)]">
              <div className="hidden xl:block shrink-0">
                <SwapCard
                  initialFromToken={selectedToken?.symbol.toUpperCase()}
                />
              </div>
              <div className="flex-1 min-h-[300px]">
                <TransactionHistory />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
