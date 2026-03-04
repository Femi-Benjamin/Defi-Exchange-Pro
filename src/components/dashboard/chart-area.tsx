"use client";

import { useState, useMemo } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { priceDataByTimeframe } from "@/lib/mock-data";
import type { Timeframe } from "@/types";
import { TrendingUp } from "lucide-react";

const timeframes: Timeframe[] = ["1H", "24H", "7D", "30D"];

import type { CryptoData } from "@/hooks/use-crypto-data";

interface ChartAreaProps {
  selectedToken?: CryptoData | null;
}

export function ChartArea({ selectedToken }: ChartAreaProps) {
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>("24H");

  // Base data from mock
  const baseData = useMemo(
    () => priceDataByTimeframe[activeTimeframe],
    [activeTimeframe],
  );

  // Derive data based on selectedToken current_price
  const data = useMemo(() => {
    if (!selectedToken) return baseData;

    // Scale the mock ETH data to match the selected token's price range
    const ethPrice = baseData[baseData.length - 1]?.price || 3000;
    const scaleFactor = selectedToken.current_price / ethPrice;

    return baseData.map((d) => ({
      ...d,
      price: d.price * scaleFactor,
    }));
  }, [baseData, selectedToken]);

  const currentPrice =
    selectedToken?.current_price ?? data[data.length - 1]?.price ?? 0;
  const prevPrice = data[0]?.price ?? 0;
  const change =
    selectedToken?.price_change_percentage_24h ??
    ((currentPrice - prevPrice) / prevPrice) * 100;

  return (
    <div className="flex flex-col h-full glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold text-white uppercase">
              {selectedToken ? `${selectedToken.symbol} / USDC` : "ETH / USDC"}
            </span>
            <span
              className={`flex items-center gap-1 text-xs font-medium ${change >= 0 ? "text-success" : "text-danger"}`}
            >
              <TrendingUp
                size={12}
                className={change < 0 ? "rotate-180" : ""}
              />
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </span>
          </div>
          <span className="text-2xl font-bold text-white mt-1 block">
            $
            {currentPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits:
                selectedToken && selectedToken.current_price < 1 ? 6 : 2,
            })}
          </span>
        </div>

        {/* Timeframe Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/5">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTimeframe === tf
                  ? "bg-primary/20 text-primary"
                  : "text-muted hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 p-4 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 10 }}
              interval="preserveStartEnd"
              minTickGap={40}
            />
            <YAxis
              domain={["auto", "auto"]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 10 }}
              tickFormatter={(v) => `$${v.toLocaleString()}`}
              width={70}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(17,24,39,0.95)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "10px 14px",
                fontSize: "12px",
                color: "#E5E7EB",
              }}
              formatter={(value) => [
                `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                "Price",
              ]}
              labelStyle={{ color: "#6B7280", marginBottom: 4 }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#00E5FF"
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{
                r: 4,
                fill: "#00E5FF",
                stroke: "#0B0F19",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
