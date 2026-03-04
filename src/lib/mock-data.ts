import type { Token, Transaction, PricePoint, Feature, CaseStudy, Metric, Timeframe } from "@/types";

// ---- Tokens ----
export const tokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", icon: "⟠", price: 3847.52, change24h: 2.34, volume24h: "18.2B", marketCap: "462.1B" },
  { symbol: "BTC", name: "Bitcoin", icon: "₿", price: 97234.18, change24h: 1.12, volume24h: "32.4B", marketCap: "1.9T" },
  { symbol: "SOL", name: "Solana", icon: "◎", price: 187.43, change24h: -1.87, volume24h: "4.8B", marketCap: "86.2B" },
  { symbol: "ARB", name: "Arbitrum", icon: "🔵", price: 1.24, change24h: 5.67, volume24h: "890M", marketCap: "5.1B" },
  { symbol: "AVAX", name: "Avalanche", icon: "🔺", price: 42.18, change24h: -0.54, volume24h: "1.2B", marketCap: "16.8B" },
  { symbol: "MATIC", name: "Polygon", icon: "🟣", price: 0.92, change24h: 3.21, volume24h: "620M", marketCap: "8.9B" },
  { symbol: "UNI", name: "Uniswap", icon: "🦄", price: 12.87, change24h: -2.15, volume24h: "340M", marketCap: "7.7B" },
  { symbol: "LINK", name: "Chainlink", icon: "⬡", price: 18.92, change24h: 1.45, volume24h: "780M", marketCap: "11.2B" },
  { symbol: "AAVE", name: "Aave", icon: "👻", price: 267.34, change24h: 4.12, volume24h: "520M", marketCap: "4.0B" },
  { symbol: "OP", name: "Optimism", icon: "🔴", price: 2.56, change24h: -3.42, volume24h: "410M", marketCap: "2.8B" },
];

// ---- Price Data Generator ----
function generatePriceData(base: number, points: number, volatility: number): PricePoint[] {
  const data: PricePoint[] = [];
  let price = base;
  const now = Date.now();
  for (let i = 0; i < points; i++) {
    price += (Math.random() - 0.48) * volatility;
    price = Math.max(price * 0.95, price);
    data.push({
      time: new Date(now - (points - i) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000),
    });
  }
  return data;
}

export const priceDataByTimeframe: Record<Timeframe, PricePoint[]> = {
  "1H": generatePriceData(3800, 60, 8),
  "24H": generatePriceData(3700, 96, 25),
  "7D": generatePriceData(3500, 84, 60),
  "30D": generatePriceData(3200, 90, 120),
};

// ---- Transactions ----
export const transactions: Transaction[] = [
  { id: "tx1", type: "swap", fromToken: "ETH", toToken: "USDC", amount: "2.5 ETH", value: "$9,618.80", status: "success", timestamp: "2 min ago" },
  { id: "tx2", type: "swap", fromToken: "SOL", toToken: "ETH", amount: "45 SOL", value: "$8,434.35", status: "success", timestamp: "5 min ago" },
  { id: "tx3", type: "swap", fromToken: "ARB", toToken: "ETH", amount: "5,000 ARB", value: "$6,200.00", status: "pending", timestamp: "8 min ago" },
  { id: "tx4", type: "swap", fromToken: "ETH", toToken: "MATIC", amount: "1.2 ETH", value: "$4,617.02", status: "success", timestamp: "12 min ago" },
  { id: "tx5", type: "swap", fromToken: "AVAX", toToken: "USDT", amount: "120 AVAX", value: "$5,061.60", status: "success", timestamp: "18 min ago" },
  { id: "tx6", type: "swap", fromToken: "UNI", toToken: "ETH", amount: "300 UNI", value: "$3,861.00", status: "failed", timestamp: "25 min ago" },
  { id: "tx7", type: "swap", fromToken: "LINK", toToken: "SOL", amount: "200 LINK", value: "$3,784.00", status: "success", timestamp: "32 min ago" },
  { id: "tx8", type: "swap", fromToken: "AAVE", toToken: "ETH", amount: "10 AAVE", value: "$2,673.40", status: "pending", timestamp: "45 min ago" },
];

// ---- Features ----
export const features: Feature[] = [
  { title: "Smart Order Routing", description: "Algorithmically split orders across multiple liquidity pools to minimize slippage and maximize execution quality.", icon: "route" },
  { title: "Real-Time Price Feeds", description: "Sub-second price updates powered by decentralized oracle networks with institutional-grade accuracy.", icon: "activity" },
  { title: "Advanced Charting", description: "Professional trading charts with technical indicators, drawing tools, and customizable timeframes.", icon: "chart" },
  { title: "Multi-Wallet Support", description: "Connect and manage multiple wallets simultaneously with unified portfolio tracking across chains.", icon: "wallet" },
  { title: "Optimistic UI Engine", description: "Instant feedback and state prediction for a fluid trading experience while transactions confirm on-chain.", icon: "zap" },
  { title: "Performance Rendering", description: "WebGL-accelerated rendering engine handles thousands of price updates per second without frame drops.", icon: "cpu" },
];

// ---- Metrics ----
export const metrics: Metric[] = [
  { label: "Token Pairs", value: "100", suffix: "+" },
  { label: "Price Update Latency", value: "<1", suffix: "s" },
  { label: "Faster Load Times", value: "40", suffix: "%" },
  { label: "Liquidity Sources", value: "25", suffix: "+" },
];

// ---- Case Study ----
export const caseStudy: CaseStudy = {
  title: "DeFi Exchange Pro",
  subtitle: "Institutional-Grade Decentralized Trading Infrastructure",
  highlights: [
    "40% reduction in average trade execution time",
    "Sub-second price feed latency across 100+ pairs",
    "Multi-pool liquidity aggregation from 25+ sources",
    "Optimistic UI engine for instant trade feedback",
    "WebGL-accelerated chart rendering at 60fps",
  ],
  role: "Lead Frontend Engineer & System Architect",
  techStack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Recharts", "WebGL", "WebSocket"],
  sections: [
    {
      title: "The Challenge",
      content: "Existing DEX interfaces suffered from fragmented liquidity, slow execution, and poor UX. Institutional traders needed a platform that could aggregate liquidity across multiple chains while providing the performance and reliability expected in traditional finance.",
    },
    {
      title: "Architecture Decisions",
      content: "We implemented a micro-frontend architecture with lazy-loaded dashboard modules, WebSocket-based real-time price streaming, and an optimistic UI pattern that provides instant feedback while transactions confirm on-chain. The rendering pipeline uses requestAnimationFrame batching for smooth 60fps chart updates.",
    },
    {
      title: "Smart Order Routing",
      content: "The routing engine analyzes liquidity depth across 25+ pools in real-time, splitting large orders optimally to minimize slippage. Price impact simulation runs client-side using a lightweight WASM module, giving traders accurate cost estimates before execution.",
    },
    {
      title: "Performance Engineering",
      content: "Achieved sub-100ms Time to Interactive through aggressive code splitting, edge caching, and streaming SSR. The chart engine processes 10,000+ price points per second using canvas rendering with worker thread computation. Memory consumption stays under 50MB even during high-volatility periods.",
    },
  ],
  gallery: [
    "/dashboard-overview.png",
    "/advanced-charting.png",
    "/swap-interface.png",
  ],
};
