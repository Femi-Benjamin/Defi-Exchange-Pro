"use client";

import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { useCryptoData, CryptoData } from "@/hooks/use-crypto-data";
import { formatPercent } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Zap,
  Search,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Mock historical data for market cap
const marketCapData = Array.from({ length: 30 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (30 - i));
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: 1200000000000 + Math.random() * 200000000000 + i * 10000000000,
  };
});

export default function AnalyticsPage() {
  const { data: tokens, isLoading } = useCryptoData();

  const gainers = [...tokens]
    .sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
    )
    .slice(0, 5);
  const losers = [...tokens]
    .sort(
      (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
    )
    .slice(0, 5);
  const trending = tokens.slice(0, 5); // Just take top 5 for trending mock

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="pt-[88px] pb-10">
        <div className="max-w-[1920px] mx-auto p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Market Analytics
              </h1>
              <p className="text-muted text-sm">
                Deep dive into market trends and volume
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                placeholder="Search analytics..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-white/5 border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary/30 transition-colors"
              />
            </div>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Global Market Cap",
                value: "$1.42T",
                change: "+2.4%",
                icon: Activity,
                positive: true,
              },
              {
                label: "24h Volume",
                value: "$64.2B",
                change: "-1.2%",
                icon: Zap,
                positive: false,
              },
              {
                label: "Active Traders",
                value: "2.4M",
                change: "+12%",
                icon: Users,
                positive: true,
              },
              {
                label: "BTC Dominance",
                value: "48.2%",
                change: "+0.5%",
                icon: TrendingUp,
                positive: true,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass rounded-xl p-5 border border-border/50 hover:border-border transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted">
                    {stat.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-primary">
                    <stat.icon size={16} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div
                  className={`text-xs font-medium flex items-center gap-1 ${stat.positive ? "text-success" : "text-danger"}`}
                >
                  {stat.positive ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {stat.change} vs last 24h
                </div>
              </div>
            ))}
          </div>

          {/* Main Chart */}
          <div className="glass rounded-2xl p-6 border border-border/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-white">
                Global Market Cap (30D)
              </h3>
              <div className="flex gap-2">
                {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((t) => (
                  <button
                    key={t}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${t === "1M" ? "bg-primary/20 text-primary font-medium" : "bg-white/5 text-muted hover:text-white"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketCapData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                    minTickGap={30}
                  />
                  <YAxis
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                    tickFormatter={(value) =>
                      `$${(value / 1000000000000).toFixed(1)}T`
                    }
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#080B12",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#00F0FF" }}
                    formatter={(value: any) => [
                      `$${(Number(value) / 1000000000000).toFixed(2)}T`,
                      "Market Cap",
                    ]}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00F0FF"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gainers, Losers, Trending */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TopList title="Top Gainers" data={gainers} />
            <TopList title="Top Losers" data={losers} />
            <TopList title="Trending" data={trending} />
          </div>
        </div>
      </main>
    </div>
  );
}

function TopList({ title, data }: { title: string; data: CryptoData[] }) {
  return (
    <div className="glass rounded-2xl p-6 border border-border/50">
      <h3 className="text-base font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((token, i) => (
          <div
            key={token.id || i}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted w-4">
                {i + 1}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                {token.image ? (
                  <img
                    src={token.image}
                    alt={token.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs">{token.symbol?.charAt(0)}</span>
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-white uppercase">
                  {token.symbol}
                </div>
                <div className="text-xs text-muted max-w-[80px] truncate">
                  {token.name}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-white">
                $
                {token.current_price?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}
              </div>
              <div
                className={`text-xs font-medium flex items-center justify-end gap-1 ${token.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}`}
              >
                {token.price_change_percentage_24h >= 0 ? (
                  <TrendingUp size={10} />
                ) : (
                  <TrendingDown size={10} />
                )}
                {formatPercent(token.price_change_percentage_24h)}
              </div>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-sm text-muted text-center py-4">
            Loading data...
          </div>
        )}
      </div>
    </div>
  );
}
