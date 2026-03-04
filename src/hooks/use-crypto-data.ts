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

        const result: CryptoData[] = await response.json();
        
        if (isMounted) {
          setData(result);
          setIsLoading(false);
          setIsUsingMockData(false);
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
