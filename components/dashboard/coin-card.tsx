"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Sparkline } from "@/components/charts/sparkline";

interface CoinCardProps {
  symbol: string;
  name: string;
  logo: string;
  sentimentScore: number;
  change24h: number;
  sparklineData: number[];
}

export function CoinCard({
  symbol,
  name,
  logo,
  sentimentScore,
  change24h,
  sparklineData,
}: CoinCardProps) {
  const isPositive = change24h >= 0;

  return (
    <Link href={`/coin/${symbol}`}>
      <Card className="card-crypto border-0 hover:scale-[1.02] cursor-pointer">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          {/* Left: Icon + Name */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                <AvatarImage src={logo} alt={name} />
                <AvatarFallback className="bg-primary/20 text-primary text-[10px] sm:text-xs font-bold">
                  {symbol.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground">{symbol}</h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{name}</p>
            </div>
          </div>

          {/* Right: Score */}
          <div className="text-right">
            <div className="flex items-center gap-1 sm:gap-2 justify-end mb-1">
              <span
                className={cn(
                  "font-bold text-base sm:text-lg",
                  isPositive ? "text-sentiment-greed" : "text-sentiment-fear"
                )}
              >
                {sentimentScore.toFixed(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Change and Sparkline */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-sentiment-greed" />
            ) : (
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-sentiment-fear" />
            )}
            <span
              className={cn(
                "text-xs sm:text-sm font-medium",
                isPositive ? "text-sentiment-greed" : "text-sentiment-fear"
              )}
            >
              {isPositive ? "+" : ""}
              {change24h.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="mt-2 sm:mt-3">
          <Sparkline
            data={sparklineData}
            color={isPositive ? "#10B981" : "#EF4444"}
          />
        </div>
      </Card>
    </Link>
  );
}
