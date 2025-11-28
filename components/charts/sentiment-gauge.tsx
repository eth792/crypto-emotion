"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSentimentType } from "@/lib/utils";

interface SentimentGaugeProps {
  score: number;
  change24h: number;
}

export function SentimentGauge({ score, change24h }: SentimentGaugeProps) {
  const sentiment = getSentimentType(score);
  const isPositive = change24h >= 0;

  // Calculate the gauge arc path
  const radius = 80;
  const strokeWidth = 20;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const arcLength = (circumference * 0.75); // 270 degrees (3/4 circle)
  const offset = arcLength - (score / 100) * arcLength;

  // Start angle at 135 degrees (bottom left)
  const startAngle = 135;
  const endAngle = startAngle + 270;

  return (
    <Card className="card-crypto border-0 h-full">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg text-muted-foreground font-medium">
          Market Sentiment Index
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          {/* Gauge Chart */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full -rotate-[135deg]"
            >
              {/* Background Arc */}
              <circle
                cx="100"
                cy="100"
                r={normalizedRadius}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
              />

              {/* Progress Arc */}
              <circle
                cx="100"
                cy="100"
                r={normalizedRadius}
                fill="none"
                stroke={
                  sentiment.type === "fear"
                    ? "#EF4444"
                    : sentiment.type === "neutral"
                    ? "#F59E0B"
                    : "#10B981"
                }
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: "drop-shadow(0 0 8px currentColor)",
                }}
              />
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
                {score}
              </span>
              <Badge
                variant={
                  sentiment.type === "fear"
                    ? "destructive"
                    : sentiment.type === "neutral"
                    ? "secondary"
                    : "success"
                }
                className="mt-2 sm:mt-3 text-xs sm:text-sm px-3 sm:px-4 py-1"
              >
                {sentiment.label}
              </Badge>
            </div>
          </div>

          {/* 24h Change */}
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <p className="text-xs sm:text-sm text-muted-foreground">24h Change</p>
            <div className="flex items-center gap-1 sm:gap-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-sentiment-greed" />
              ) : (
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-sentiment-fear" />
              )}
              <span
                className={cn(
                  "text-xl sm:text-2xl font-bold",
                  isPositive ? "text-sentiment-greed" : "text-sentiment-fear"
                )}
              >
                {isPositive ? "+" : ""}
                {change24h.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Sentiment Scale */}
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mb-1 sm:mb-2">
              <span>Fear</span>
              <span>Neutral</span>
              <span>Greed</span>
            </div>
            <div className="h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-sentiment-fear via-sentiment-neutral to-sentiment-greed" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
