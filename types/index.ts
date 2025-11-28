export interface Coin {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  sentimentScore: number;
  change24h: number;
  sparklineData: number[];
}

export interface MarketSentiment {
  score: number;
  sentiment: "fear" | "neutral" | "greed";
  change24h: number;
  timestamp: string;
}

export interface TrendDataPoint {
  time: string;
  score: number;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  sentiment: "positive" | "neutral" | "negative";
  timestamp: string;
  url: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  description: string;
}
