// ---- Token ----
export interface Token {
  symbol: string;
  name: string;
  icon: string;
  price: number;
  change24h: number;
  volume24h: string;
  marketCap: string;
}

// ---- Transaction ----
export type TransactionStatus = "success" | "pending" | "failed";

export interface Transaction {
  id: string;
  type: "swap" | "send" | "receive";
  fromToken: string;
  toToken: string;
  amount: string;
  value: string;
  status: TransactionStatus;
  timestamp: string;
}

// ---- Chart ----
export type Timeframe = "1H" | "24H" | "7D" | "30D";

export interface PricePoint {
  time: string;
  price: number;
  volume?: number;
}

// ---- Feature ----
export interface Feature {
  title: string;
  description: string;
  icon: string;
}

// ---- Case Study ----
export interface CaseStudySection {
  title: string;
  content: string;
}

export interface CaseStudy {
  title: string;
  subtitle: string;
  highlights: string[];
  role: string;
  techStack: string[];
  sections: CaseStudySection[];
  gallery: string[];
}

// ---- Metric ----
export interface Metric {
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
  description: string;
  icon: string;
}

// ---- Nav ----
export interface NavItem {
  label: string;
  href: string;
}
