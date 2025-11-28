import {
  Coin,
  MarketSentiment,
  TrendDataPoint,
  NewsItem,
  MetricCard,
} from "@/types";

export const mockMarketSentiment: MarketSentiment = {
  score: 68,
  sentiment: "greed",
  change24h: 5.2,
  timestamp: new Date().toISOString(),
};

export const mockCoins: Coin[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    sentimentScore: 72,
    change24h: 8.5,
    sparklineData: [65, 67, 70, 68, 71, 72],
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    sentimentScore: 68,
    change24h: 5.2,
    sparklineData: [62, 64, 66, 65, 67, 68],
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "Binance Coin",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    sentimentScore: 65,
    change24h: 3.8,
    sparklineData: [60, 62, 63, 64, 64, 65],
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    sentimentScore: 75,
    change24h: 12.4,
    sparklineData: [68, 70, 72, 71, 74, 75],
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    sentimentScore: 58,
    change24h: -2.1,
    sparklineData: [62, 61, 60, 59, 58, 58],
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "Ripple",
    logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    sentimentScore: 62,
    change24h: 1.5,
    sparklineData: [60, 61, 61, 62, 62, 62],
  },
];

export function generateTrendData(hours: number): TrendDataPoint[] {
  const data: TrendDataPoint[] = [];
  let baseScore = 50;

  for (let i = 0; i < hours; i++) {
    const date = new Date();
    date.setHours(date.getHours() - (hours - i - 1));

    baseScore += (Math.random() - 0.5) * 10;
    baseScore = Math.max(0, Math.min(100, baseScore));

    const hour = date.getHours();
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    data.push({
      time: `${displayHour} ${period}`,
      score: Math.round(baseScore),
    });
  }

  return data;
}

export function generateDailyTrendData(days: number): TrendDataPoint[] {
  const data: TrendDataPoint[] = [];
  let baseScore = 50;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));

    baseScore += (Math.random() - 0.5) * 10;
    baseScore = Math.max(0, Math.min(100, baseScore));

    data.push({
      time: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      score: Math.round(baseScore),
    });
  }

  return data;
}

export const mockNews: NewsItem[] = [
  {
    id: "news_001",
    title: "Bitcoin Breaks New All-Time High",
    source: "CoinDesk",
    sentiment: "positive",
    timestamp: "2 hours ago",
    url: "#",
  },
  {
    id: "news_002",
    title: "Ethereum 2.0 Staking Reaches New Milestone",
    source: "CoinTelegraph",
    sentiment: "positive",
    timestamp: "4 hours ago",
    url: "#",
  },
  {
    id: "news_003",
    title: "Regulatory Concerns Rise in Asia",
    source: "Bloomberg",
    sentiment: "negative",
    timestamp: "6 hours ago",
    url: "#",
  },
  {
    id: "news_004",
    title: "Major Exchange Adds Support for New Tokens",
    source: "CryptoNews",
    sentiment: "neutral",
    timestamp: "8 hours ago",
    url: "#",
  },
];

export const mockMetrics: MetricCard[] = [
  {
    title: "Popularity Index",
    value: 85,
    change: 12,
    description: "Based on search volume and social media mentions",
  },
  {
    title: "Social Sentiment",
    value: "78%",
    change: 5,
    description: "Positive sentiment across social platforms",
  },
  {
    title: "Volatility",
    value: "High",
    description: "Price volatility indicator",
  },
  {
    title: "News Sentiment",
    value: 82,
    change: 8,
    description: "156 news articles analyzed",
  },
];
