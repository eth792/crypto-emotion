"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendDataPoint } from "@/types";
import { useState, useEffect } from "react";

interface SentimentAreaChartProps {
  data: TrendDataPoint[];
  currentScore: number;
  change24h: number;
}

type TimePeriod = "Week" | "Month" | "Year";

const periodToDays: Record<TimePeriod, number> = {
  Week: 7,
  Month: 30,
  Year: 365,
};

export function SentimentAreaChart({
  data: initialData,
  currentScore: initialScore,
  change24h: initialChange,
}: SentimentAreaChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("Week");
  const [data, setData] = useState<TrendDataPoint[]>(initialData);
  const [currentScore, setCurrentScore] = useState(initialScore);
  const [change, setChange] = useState(initialChange);
  const [isLoading, setIsLoading] = useState(false);

  const isPositive = change >= 0;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const days = periodToDays[selectedPeriod];
        const response = await fetch(`https://api.alternative.me/fng/?limit=${days}`);

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const result = await response.json();
        const fngData = result.data;

        if (fngData && fngData.length > 0) {
          // Transform data for the chart (reverse to get chronological order)
          const transformedData = fngData.reverse().map((item: any) => ({
            time: new Date(parseInt(item.timestamp) * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            score: parseInt(item.value),
          }));

          setData(transformedData);

          // Get current score (latest value)
          const current = parseInt(fngData[fngData.length - 1].value);
          setCurrentScore(current);

          // Calculate change
          if (fngData.length >= 2) {
            const previous = parseInt(fngData[fngData.length - 2].value);
            const changePercent = ((current - previous) / previous) * 100;
            setChange(changePercent);
          } else {
            setChange(0);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  return (
    <Card className="card-crypto border-0 h-full flex flex-col">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 space-y-3 sm:space-y-0">
        <div>
          <CardTitle className="text-base sm:text-lg text-muted-foreground font-medium mb-2">
            Market Sentiment Trend
          </CardTitle>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="data-value text-2xl sm:text-3xl">{currentScore.toFixed(0)}</span>
            <Badge
              variant={isPositive ? "success" : "destructive"}
              className="flex items-center gap-1 text-xs sm:text-sm"
            >
              <TrendingUp
                className={cn("w-3 h-3", !isPositive && "rotate-180")}
              />
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </Badge>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto overflow-x-auto">
          {(["Week", "Month", "Year"] as TimePeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              disabled={isLoading}
              className={cn(
                "px-3 sm:px-4 py-1.5 sm:py-2 rounded-button text-xs sm:text-sm font-medium transition-all whitespace-nowrap",
                selectedPeriod === period
                  ? "bg-primary text-white"
                  : "bg-background-tertiary text-muted-foreground hover:text-foreground",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-4 sm:pt-6 flex-1 flex items-center px-2 sm:px-6">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} style={{ outline: 'none' }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B4A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8B4513" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" className="opacity-50" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "10px" }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: "10px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#FF6B4A"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
