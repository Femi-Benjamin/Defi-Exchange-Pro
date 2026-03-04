"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  ChevronDown,
  Settings2,
  Info,
  Loader2,
} from "lucide-react";
import { useCryptoData } from "@/hooks/use-crypto-data";

export function SwapCard() {
  const { data: tokens, isLoading } = useCryptoData();
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("1.0");
  const [slippage, setSlippage] = useState("0.5");
  const [showSettings, setShowSettings] = useState(false);

  const fromTokenData = tokens.find(
    (t) => t.symbol.toUpperCase() === fromToken,
  );
  const toTokenData = tokens.find((t) => t.symbol.toUpperCase() === toToken);

  const fromPrice = fromTokenData?.current_price ?? 0;
  const toPrice = toTokenData?.current_price ?? 1; // avoid division by zero

  // Calculate exchange rate and estimated output
  const exchangeRate = fromPrice / toPrice;
  const estimatedOutput = (parseFloat(amount || "0") * exchangeRate).toFixed(6);

  const handleSwapDirection = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setAmount("");
  };

  return (
    <div className="glass rounded-2xl overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-[#0B0F19]/80 backdrop-blur-sm flex items-center justify-center">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
        </div>
      )}

      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Swap</h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-muted hover:text-white transition-colors"
        >
          <Settings2 size={14} />
        </button>
      </div>

      {/* Slippage Settings */}
      {showSettings && (
        <div className="px-5 py-3 border-b border-border bg-white/2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted flex items-center gap-1">
              <Info size={12} />
              Slippage Tolerance
            </span>
            <div className="flex items-center gap-2">
              {["0.1", "0.5", "1.0"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSlippage(s)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                    slippage === s
                      ? "bg-primary/20 text-primary"
                      : "bg-white/5 text-muted hover:text-white"
                  }`}
                >
                  {s}%
                </button>
              ))}
              <input
                type="text"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-14 px-2 py-1 text-xs bg-white/5 border border-border rounded-md text-white text-center focus:outline-none focus:border-primary/30"
              />
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="p-5 space-y-3">
        {/* From */}
        <div className="p-4 rounded-xl bg-white/3 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted">From</span>
            <span className="text-xs text-muted">Balance: 12.45</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 min-w-0 bg-transparent text-xl font-semibold text-white focus:outline-none placeholder-muted/40"
            />
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0 max-w-[140px]">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                {fromTokenData?.image ? (
                  <img
                    src={fromTokenData.image}
                    alt={fromToken}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs">{fromToken.charAt(0)}</span>
                )}
              </div>
              <span className="text-sm font-medium text-white truncate">
                {fromToken}
              </span>
              <ChevronDown size={14} className="text-muted shrink-0" />
            </button>
          </div>
        </div>

        {/* Swap Direction */}
        <div className="flex justify-center -my-1 relative z-10">
          <button
            onClick={handleSwapDirection}
            className="w-10 h-10 rounded-xl bg-[#111827] border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all duration-200 hover:rotate-180 shadow-lg"
          >
            <ArrowDownUp size={16} />
          </button>
        </div>

        {/* To */}
        <div className="p-4 rounded-xl bg-white/3 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted">To (estimated)</span>
            <span className="text-xs text-muted">Balance: 15,230.50</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 text-xl font-semibold text-white truncate pr-2">
              {estimatedOutput === "NaN" ? "0.00" : estimatedOutput}
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0 max-w-[140px]">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                {toTokenData?.image ? (
                  <img
                    src={toTokenData.image}
                    alt={toToken}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs">{toToken.charAt(0)}</span>
                )}
              </div>
              <span className="text-sm font-medium text-white truncate">
                {toToken}
              </span>
              <ChevronDown size={14} className="text-muted shrink-0" />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted">Rate</span>
            <span className="text-white">
              1 {fromToken} ={" "}
              {exchangeRate.toLocaleString(undefined, {
                maximumFractionDigits: 6,
              })}{" "}
              {toToken}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted">Price Impact</span>
            <span className="text-success">&lt;0.01%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted">Slippage</span>
            <span className="text-white">{slippage}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted">Route</span>
            <span className="text-primary">3 pools (optimal)</span>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-3.5 rounded-xl bg-primary text-[#0B0F19] font-semibold text-sm hover:bg-primary/90 transition-all duration-200 glow-primary hover:glow-primary-intense mt-2">
          Swap Tokens
        </button>
      </div>
    </div>
  );
}
