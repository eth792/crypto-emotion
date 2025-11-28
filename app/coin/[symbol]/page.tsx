"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SentimentAreaChart } from "@/components/charts/sentiment-area-chart";
import { MetricCard } from "@/components/dashboard/metric-card";
import { NewsSection } from "@/components/dashboard/news-section";
import {
  mockCoins,
  generateDailyTrendData,
  mockNews,
  mockMetrics,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function CoinDetailPage() {
  const params = useParams();
  const symbol = params.symbol as string;

  const coin = mockCoins.find((c) => c.symbol === symbol);

  if (!coin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Coin Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The coin you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="text-primary hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const trendData = generateDailyTrendData(30); // 30 days
  const isPositive = coin.change24h >= 0;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">
          {coin.name} ({coin.symbol})
        </span>
      </div>

      {/* Coin Header */}
      <Card className="card-crypto border-0">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={coin.logo} alt={coin.name} />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                    {coin.symbol.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {coin.name} ({coin.symbol})
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl font-bold text-foreground">
                    Sentiment: {coin.sentimentScore}
                  </span>
                  <Badge
                    variant={isPositive ? "success" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {isPositive ? "+" : ""}
                    {coin.change24h.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 30 Day Trend */}
      <SentimentAreaChart
        data={trendData}
        currentScore={coin.sentimentScore}
        change24h={coin.change24h}
      />

      {/* Key Metrics */}
      <div>
        <h2 className="text-xl font-bold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </div>

      {/* Related News */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Related News for {coin.symbol}
        </h2>
        <NewsSection news={mockNews} />
      </div>
    </div>
  );
}
