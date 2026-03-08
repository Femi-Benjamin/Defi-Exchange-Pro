import { useState, useEffect } from "react";
import { tokens as mockTokens } from "@/lib/mock-data";

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
}

export function useCryptoData() {
  const [data, setData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        // Fetch top 50 coins by market cap
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en"
        );

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error("Rate limit exceeded");
          }
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        
        if (isMounted) {
          if (Array.isArray(result)) {
            const normalized = normalizeApiTokens(result);
            if (normalized.length === 0) {
              throw new Error("API returned no usable token records");
            }
            setData(normalized);
            setError(null);
            setIsLoading(false);
            setIsUsingMockData(false);
          } else {
            throw new Error("API returned non-array data");
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.warn("CoinGecko API error, falling back to mock data:", err instanceof Error ? err.message : String(err));
          
          // Map mock data to match CryptoData interface roughly for fallback
          const fallbackData: CryptoData[] = mockTokens.map(token => ({
            id: token.symbol.toLowerCase(), // using symbol as id since mock data doesn't have id
            symbol: token.symbol.toLowerCase(),
            name: token.name,
            image: token.icon ?? "", // Assuming icon is a URL or we use symbol
            current_price: token.price,
            market_cap: 0,
            market_cap_rank: 0,
            fully_diluted_valuation: null,
            total_volume: parseVolumeStrToNumber(token.volume24h),
            high_24h: 0,
            low_24h: 0,
            price_change_24h: 0,
            price_change_percentage_24h: token.change24h,
            market_cap_change_24h: 0,
            market_cap_change_percentage_24h: 0,
            circulating_supply: 0,
            total_supply: null,
            max_supply: null,
            ath: 0,
            ath_change_percentage: 0,
            ath_date: "",
            atl: 0,
            atl_change_percentage: 0,
            atl_date: "",
            roi: null,
            last_updated: new Date().toISOString(),
          }));
          
          setData(fallbackData);
          setError(
            err instanceof Error
              ? err.message
              : "Unable to fetch live market data",
          );
          setIsLoading(false);
          setIsUsingMockData(true);
          // Don't set error state to avoid breaking UI, just warn in console and flag that we are using mock data
        }
      }
    }

    fetchData();

    // Refresh data every 60 seconds
    const interval = setInterval(fetchData, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { data, isLoading, error, isUsingMockData };
}

// Helper for fallback data parsing
function parseVolumeStrToNumber(volStr: string | undefined): number {
  if (!volStr) return 0;
  // Convert something like "12.5B" to 12500000000
  let val = parseFloat(volStr.replace(/[^0-9.]/g, ""));
  if (volStr.toLowerCase().includes("b")) val *= 1_000_000_000;
  else if (volStr.toLowerCase().includes("m")) val *= 1_000_000;
  else if (volStr.toLowerCase().includes("k")) val *= 1_000;
  return val;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}

function asText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function normalizeApiTokens(raw: unknown[]): CryptoData[] {
  return raw
    .map((item, index) => {
      if (typeof item !== "object" || item === null) return null;
      const token = item as Partial<CryptoData>;
      const symbol = asText(token.symbol, "UNK");
      const name = asText(token.name, `Token ${index + 1}`);
      const id = asText(token.id, `${symbol.toLowerCase()}-${index}`);

      return {
        id,
        symbol,
        name,
        image: asText(token.image, ""),
        current_price: asNumber(token.current_price),
        market_cap: asNumber(token.market_cap),
        market_cap_rank: asNumber(token.market_cap_rank),
        fully_diluted_valuation:
          token.fully_diluted_valuation == null
            ? null
            : asNumber(token.fully_diluted_valuation),
        total_volume: asNumber(token.total_volume),
        high_24h: asNumber(token.high_24h),
        low_24h: asNumber(token.low_24h),
        price_change_24h: asNumber(token.price_change_24h),
        price_change_percentage_24h: asNumber(token.price_change_percentage_24h),
        market_cap_change_24h: asNumber(token.market_cap_change_24h),
        market_cap_change_percentage_24h: asNumber(
          token.market_cap_change_percentage_24h,
        ),
        circulating_supply: asNumber(token.circulating_supply),
        total_supply:
          token.total_supply == null ? null : asNumber(token.total_supply),
        max_supply: token.max_supply == null ? null : asNumber(token.max_supply),
        ath: asNumber(token.ath),
        ath_change_percentage: asNumber(token.ath_change_percentage),
        ath_date: asText(token.ath_date, ""),
        atl: asNumber(token.atl),
        atl_change_percentage: asNumber(token.atl_change_percentage),
        atl_date: asText(token.atl_date, ""),
        roi: null,
        last_updated: asText(token.last_updated, new Date().toISOString()),
      } satisfies CryptoData;
    })
    .filter((token): token is CryptoData => token !== null);
}
