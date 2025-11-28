import { SentimentAreaChart } from "@/components/charts/sentiment-area-chart";
import { SentimentGauge } from "@/components/charts/sentiment-gauge";
import { CoinCard } from "@/components/dashboard/coin-card";
import { NewsSection } from "@/components/dashboard/news-section";
import { MetricCard } from "@/components/dashboard/metric-card";
import { mockNews } from "@/lib/mock-data";
import {
  fetchTopCryptos,
  type TickerData,
} from "@/lib/api";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage() {
  // Fetch real Fear & Greed Index data
  let trendData;
  let currentScore;
  let change24h;

  try {
    // Fetch Fear & Greed Index history (last 30 days for initial display)
    const response = await fetch("https://api.alternative.me/fng/?limit=30", {
      cache: "no-cache",
      next: { revalidate: 300 },
    });

    if (response.ok) {
      const result = await response.json();
      const fngData = result.data;

      if (fngData && fngData.length > 0) {
        // Transform data for the chart
        trendData = fngData.reverse().map((item: any) => ({
          time: new Date(parseInt(item.timestamp) * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          score: parseInt(item.value),
        }));

        // Get current score (latest value)
        currentScore = parseInt(fngData[fngData.length - 1].value);

        // Calculate 24h change
        if (fngData.length >= 2) {
          const current = parseInt(fngData[fngData.length - 1].value);
          const previous = parseInt(fngData[fngData.length - 2].value);
          change24h = ((current - previous) / previous) * 100;
        } else {
          change24h = 0;
        }
      } else {
        throw new Error("No data received");
      }
    } else {
      throw new Error(`API request failed: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch Fear & Greed data:", error);
    const { generateTrendData, mockMarketSentiment } = await import(
      "@/lib/mock-data"
    );
    trendData = generateTrendData(24);
    currentScore = mockMarketSentiment.score;
    change24h = mockMarketSentiment.change24h;
  }

  // Fetch real cryptocurrency data
  let cryptoData: Record<string, TickerData> = {};
  let topCoins: Array<{
    id: string;
    symbol: string;
    name: string;
    logo: string;
    sentimentScore: number;
    change24h: number;
    sparklineData: number[];
  }> = [];

  try {
    cryptoData = await fetchTopCryptos(6);
    // Transform ticker data to coin card format
    topCoins = Object.values(cryptoData)
      .slice(0, 6)
      .map((coin) => {
        const change24h = coin.quotes?.USD?.percent_change_24h || 0;
        return {
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          logo: `https://cryptologos.cc/logos/${coin.name.toLowerCase()}-${coin.symbol.toLowerCase()}-logo.png`,
          sentimentScore: calculateSentimentFromChange(change24h),
          change24h: change24h,
          sparklineData: generateSparkline(change24h),
        };
      });
  } catch (error) {
    console.error("Failed to fetch crypto data:", error);
    const { mockCoins } = await import("@/lib/mock-data");
    topCoins = mockCoins;
  }

  // Fetch global market data
  let marketMetrics = [
    {
      title: "Market Cap",
      value: "$1.85T",
      change: 5.2,
      description: "Total cryptocurrency market cap",
    },
    {
      title: "24h Volume",
      value: "$75B",
      change: 3.1,
      description: "Trading volume in last 24 hours",
    },
    {
      title: "BTC Dominance",
      value: "45.2%",
      change: -0.5,
      description: "Bitcoin market cap percentage",
    },
    {
      title: "Active Cryptos",
      value: "8,943",
      description: "Number of active cryptocurrencies",
    },
  ];

  try {
    // Fetch global market data directly from external API in server component
    const response = await fetch("https://api.alternative.me/v2/global/", {
      cache: "no-cache",
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (response.ok) {
      const result = await response.json();
      const globalData = result.data;

      if (globalData && globalData.quotes && globalData.quotes.USD) {
        const usdQuotes = globalData.quotes.USD;
        marketMetrics = [
          {
            title: "Market Cap",
            value: formatLargeNumber(usdQuotes.total_market_cap),
            change: change24h, // Use Fear & Greed change as proxy
            description: "Total cryptocurrency market cap",
          },
          {
            title: "24h Volume",
            value: formatLargeNumber(usdQuotes.total_volume_24h),
            change: change24h * 0.6, // Estimate
            description: "Trading volume in last 24 hours",
          },
          {
            title: "BTC Dominance",
            value: globalData.bitcoin_percentage_of_market_cap
              ? `${globalData.bitcoin_percentage_of_market_cap.toFixed(1)}%`
              : "N/A",
            change: -0.5,
            description: "Bitcoin market cap percentage",
          },
          {
            title: "Active Cryptos",
            value: globalData.active_cryptocurrencies
              ? globalData.active_cryptocurrencies.toLocaleString()
              : "N/A",
            description: "Number of active cryptocurrencies",
          },
        ];
      }
    }
  } catch (error) {
    console.error("Failed to fetch global market data:", error);
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-0">
      {/* Main Sentiment Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
        {/* Gauge Chart - Left (1/3 width) */}
        <div className="lg:col-span-1 h-full">
          <SentimentGauge score={currentScore} change24h={change24h} />
        </div>

        {/* Area Chart - Right (2/3 width) */}
        <div className="lg:col-span-2 h-full">
          <SentimentAreaChart
            data={trendData}
            currentScore={currentScore}
            change24h={change24h}
          />
        </div>
      </div>

      {/* Top Metrics */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Market Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {marketMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </div>

      {/* Hot Coins */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Hot Coins</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {topCoins.map((coin) => (
            <CoinCard key={coin.id} {...coin} />
          ))}
        </div>
      </div>

      {/* News Section */}
      <NewsSection news={mockNews} />
    </div>
  );
}

// Helper functions
function calculateSentimentFromChange(change24h: number): number {
  // Map price change to sentiment score (0-100)
  // Extreme negative: 0, Neutral: 50, Extreme positive: 100
  const normalized = Math.max(-20, Math.min(20, change24h)); // Clamp to ±20%
  const sentiment = 50 + (normalized / 20) * 50;
  return Math.round(sentiment);
}

function generateSparkline(change24h: number): number[] {
  // Generate realistic 7-day sparkline based on 24h change
  const points = 7; // 7 days
  const data: number[] = [];
  const endValue = 50; // Current normalized value
  const startValue = endValue - change24h; // 7 days ago value

  for (let i = 0; i < points; i++) {
    // Linear interpolation with random variation
    const progress = i / (points - 1);
    const interpolated = startValue + (endValue - startValue) * progress;
    const randomVariation = (Math.random() - 0.5) * Math.abs(change24h) * 0.3;
    const value = interpolated + randomVariation;
    data.push(Math.max(0, Math.min(100, value)));
  }

  return data;
}

function formatLargeNumber(num: number | undefined): string {
  if (num === undefined || num === null || isNaN(num)) return "N/A";
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
}
