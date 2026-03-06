"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  ChevronDown,
  Settings2,
  Info,
  Loader2,
  CheckCircle2,
  Search,
} from "lucide-react";
import { useCryptoData, CryptoData } from "@/hooks/use-crypto-data";

interface SwapCardProps {
  initialFromToken?: string;
}

export function SwapCard({ initialFromToken }: SwapCardProps) {
  const { data: tokens, isLoading } = useCryptoData();
  const [fromTokenState, setFromTokenState] = useState<string | null>(null);
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("1.0");
  const [slippage, setSlippage] = useState("0.5");
  const [showSettings, setShowSettings] = useState(false);

  // Dropdown states
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Swap Simulation States
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapSuccess, setSwapSuccess] = useState(false);

  // Preference order: manual selection > global prop selection > fallback
  const fromToken = fromTokenState || initialFromToken || "ETH";

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
    setFromTokenState(toToken);
    setToToken(fromToken);
    setAmount("");
  };

  const handleSwapSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setIsSwapping(true);
    // Simulate transaction delay
    setTimeout(() => {
      setIsSwapping(false);
      setSwapSuccess(true);
      // Auto-hide success after 3 seconds
      setTimeout(() => setSwapSuccess(false), 3000);
    }, 2000);
  };

  const filteredTokens = tokens.filter(
    (t) =>
      t.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const TokenSelectDropdown = ({
    onSelect,
    onClose,
  }: {
    onSelect: (symbol: string) => void;
    onClose: () => void;
  }) => (
    <div className="absolute top-12 right-0 w-64 glass-strong rounded-xl border border-border shadow-2xl overflow-hidden z-50 flex flex-col max-h-[300px] animate-in slide-in-from-top-2">
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-black/40 border border-border rounded-lg text-sm text-white focus:outline-none focus:border-primary/50"
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-1 p-2 space-y-1">
        {filteredTokens.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              onSelect(t.symbol.toUpperCase());
              setSearchQuery("");
              onClose();
            }}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 overflow-hidden shrink-0">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.symbol}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="flex items-center justify-center h-full text-xs">
                    {t.symbol.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white uppercase">
                  {t.symbol}
                </span>
                <span className="text-xs text-muted">{t.name}</span>
              </div>
            </div>
            <span className="text-sm font-medium text-white">
              $
              {t.current_price.toLocaleString(undefined, {
                maximumFractionDigits: 4,
              })}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

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
        <div className="px-5 py-3 border-b border-border bg-white/5">
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
            <div className="relative">
              <button
                onClick={() => {
                  setShowToDropdown(false);
                  setShowFromDropdown(!showFromDropdown);
                  setSearchQuery("");
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0 max-w-[140px]"
              >
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

              {showFromDropdown && (
                <TokenSelectDropdown
                  onSelect={setFromTokenState}
                  onClose={() => setShowFromDropdown(false)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Swap Direction */}
        <div className="flex justify-center relative z-10 group">
          <button
            onClick={handleSwapDirection}
            className="w-10 h-10 rounded-xl bg-[#111827] border-[3px] border-[#080B12] flex items-center justify-center text-muted hover:text-primary hover:border-[#080B12] transition-all duration-200 hover:rotate-180 shadow-lg glow-secondary/10"
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
            <div className="relative">
              <button
                onClick={() => {
                  setShowFromDropdown(false);
                  setShowToDropdown(!showToDropdown);
                  setSearchQuery("");
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0 max-w-[140px]"
              >
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

              {showToDropdown && (
                <TokenSelectDropdown
                  onSelect={setToToken}
                  onClose={() => setShowToDropdown(false)}
                />
              )}
            </div>
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
        {/* CTA */}
        {swapSuccess ? (
          <div className="w-full py-3 rounded-xl bg-success/10 border border-success/30 text-success font-semibold text-sm flex items-center justify-center gap-2 mt-2 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 size={18} />
            Swap Successful!
          </div>
        ) : (
          <button
            onClick={handleSwapSubmit}
            disabled={isSwapping || !amount || parseFloat(amount) <= 0}
            className="w-full py-3.5 rounded-xl bg-primary text-[#0B0F19] font-semibold text-sm hover:bg-primary/90 transition-all duration-200 glow-primary hover:glow-primary-intense mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:glow-primary"
          >
            {isSwapping ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Swapping...
              </>
            ) : (
              "Swap Tokens"
            )}
          </button>
        )}
      </div>

      {/* Click outside overlay to close dropdowns */}
      {(showFromDropdown || showToDropdown) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowFromDropdown(false);
            setShowToDropdown(false);
          }}
        />
      )}
    </div>
  );
}
