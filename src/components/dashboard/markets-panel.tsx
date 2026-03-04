"use client";

import { useCryptoData } from "@/hooks/use-crypto-data";
import { formatPercent } from "@/lib/utils";
import { Search, Star, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { useState } from "react";

interface MarketsPanelProps {
  selectedTokenId?: string;
  onSelectToken?: (token: any) => void;
}

export function MarketsPanel({
  selectedTokenId,
  onSelectToken,
}: MarketsPanelProps) {
  const [search, setSearch] = useState("");
  const { data: tokens, isLoading } = useCryptoData();

  const filtered = tokens.filter(
    (t) =>
      t.symbol.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col h-full glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Markets
          </h3>
          <span className="text-xs text-muted">
            {isLoading ? "Loading..." : `${tokens.length} pairs`}
          </span>
        </div>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white/5 border border-border rounded-lg text-white placeholder-muted focus:outline-none focus:border-primary/30 transition-colors"
          />
        </div>
      </div>

      {/* Token List */}
      <div className="flex-1 overflow-y-auto min-h-[300px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-muted">
            <Loader2 className="animate-spin w-5 h-5 mr-2" />
            <span className="text-sm">Fetching markets...</span>
          </div>
        ) : (
          filtered.map((token) => (
            <button
              key={token.id}
              onClick={() => onSelectToken?.(token)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors text-left border-b border-border/50 group ${
                selectedTokenId === token.id
                  ? "bg-primary/5 border-l-2 border-l-primary"
                  : ""
              }`}
            >
              {/* Icon */}
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 overflow-hidden">
                {token.image ? (
                  <img
                    src={token.image}
                    alt={token.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-bold">
                    {token.symbol.substring(0, 1).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white uppercase group-hover:text-primary transition-colors">
                    {token.symbol}
                  </span>
                  <span className="text-xs text-muted truncate">
                    {token.name}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-muted">
                    $
                    {token.current_price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })}
                  </span>
                  <span
                    className={`flex items-center gap-0.5 text-xs font-medium ${token.price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}`}
                  >
                    {token.price_change_percentage_24h >= 0 ? (
                      <TrendingUp size={10} />
                    ) : (
                      <TrendingDown size={10} />
                    )}
                    {formatPercent(token.price_change_percentage_24h)}
                  </span>
                </div>
              </div>

              {/* Fav */}
              <Star
                size={14}
                className="text-muted/40 hover:text-primary transition-colors shrink-0"
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
