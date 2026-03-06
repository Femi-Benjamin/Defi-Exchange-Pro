"use client";

import { useState } from "react";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { useCryptoData } from "@/hooks/use-crypto-data";
import { formatPercent } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  ArrowRightLeft,
  Download,
} from "lucide-react";

export default function PortfolioPage() {
  const { data: tokens, isLoading } = useCryptoData();

  // Mock portfolio data based on live prices
  const portfolioAssets = tokens.slice(0, 5).map((token, index) => {
    // Arbitrary balance for mockup
    const balances = [1.5, 0.05, 1200, 450, 10000];
    const balance = balances[index] || 100;
    const value = balance * token.current_price;
    return {
      ...token,
      balance,
      value,
    };
  });

  const totalValue = portfolioAssets.reduce(
    (sum, asset) => sum + asset.value,
    0,
  );

  // Data for donut chart
  const COLORS = ["#00F0FF", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"];
  const pieData = portfolioAssets.map((a) => ({
    name: a.symbol.toUpperCase(),
    value: a.value,
  }));

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="pt-[88px] pb-10">
        <div className="max-w-[1920px] mx-auto p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Portfolio</h1>
              <p className="text-muted text-sm">
                Overview of your holdings and performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center gap-2">
                <Download size={16} />
                Export CSV
              </button>
              <button className="px-4 py-2 rounded-lg bg-primary text-background text-sm font-semibold hover:bg-primary/90 transition-colors glow-primary flex items-center gap-2">
                <Wallet size={16} />
                Deposit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Overview Cards */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Total Balance Card */}
              <div className="glass rounded-2xl p-4 sm:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-[80px] -translate-y-1/2 translate-x-1/2" />

                <h2 className="text-sm font-medium text-muted mb-2">
                  Total Balance
                </h2>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  $
                  {isLoading
                    ? "0.00"
                    : totalValue.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-success bg-success/10 px-2.5 py-1 rounded-full text-sm font-medium">
                    <ArrowUpRight size={16} />
                    +$1,245.50 (5.2%)
                  </div>
                  <span className="text-muted text-sm">Past 24 hours</span>
                </div>
              </div>

              {/* Asset Performance */}
              <div className="glass rounded-2xl p-4 sm:p-6 flex-1">
                <div className="flex flex-wrap items-center justify-between mb-4 sm:mb-6 gap-3">
                  <h3 className="text-base font-semibold text-white">
                    Your Assets
                  </h3>
                  <div className="flex items-center gap-2">
                    {["All", "Crypto", "Staking"].map((tab) => (
                      <button
                        key={tab}
                        className="px-3 py-1 text-xs rounded-md bg-white/5 text-muted hover:text-white transition-colors"
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-muted border-b border-border/50">
                        <th className="pb-3 font-medium">Asset</th>
                        <th className="pb-3 font-medium text-right">Price</th>
                        <th className="pb-3 font-medium text-right">Balance</th>
                        <th className="pb-3 font-medium text-right">Value</th>
                        <th className="pb-3 font-medium text-right">
                          24h Change
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {portfolioAssets.map((asset) => (
                        <tr key={asset.id} className="group cursor-pointer">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                                {asset.image ? (
                                  <img
                                    src={asset.image}
                                    alt={asset.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-xs">
                                    {asset.symbol.charAt(0)}
                                  </span>
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-white uppercase group-hover:text-primary transition-colors">
                                  {asset.symbol}
                                </div>
                                <div className="text-xs text-muted">
                                  {asset.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-right text-white">
                            $
                            {asset.current_price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 6,
                            })}
                          </td>
                          <td className="py-4 text-right text-white">
                            {asset.balance.toLocaleString()}
                          </td>
                          <td className="py-4 text-right font-medium text-white">
                            $
                            {asset.value.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </td>
                          <td className="py-4 text-right">
                            <span
                              className={`inline-flex items-center gap-1 ${asset.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}`}
                            >
                              {asset.price_change_percentage_24h >= 0 ? (
                                <ArrowUpRight size={14} />
                              ) : (
                                <ArrowDownRight size={14} />
                              )}
                              {formatPercent(asset.price_change_percentage_24h)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Asset Allocation */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-6">
                  Allocation
                </h3>
                <div className="h-[200px] mb-6">
                  {pieData.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value: any) =>
                            `$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                          }
                          contentStyle={{
                            backgroundColor: "#080B12",
                            borderColor: "rgba(255,255,255,0.1)",
                            borderRadius: "8px",
                          }}
                          itemStyle={{ color: "#fff" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="space-y-3">
                  {portfolioAssets.map((asset, i) => (
                    <div
                      key={asset.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2 text-white">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[i % COLORS.length] }}
                        />
                        <span className="uppercase">{asset.symbol}</span>
                      </div>
                      <span className="text-muted">
                        {((asset.value / totalValue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass rounded-2xl p-6 flex-1">
                <h3 className="text-base font-semibold text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary">
                          <ArrowRightLeft size={16} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            Swap ETH for USDC
                          </div>
                          <div className="text-xs text-muted">Today, 14:32</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-success">
                          +2,450.00 USDC
                        </div>
                        <div className="text-xs text-muted">-1.0 ETH</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
