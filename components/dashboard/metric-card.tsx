"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  description: string;
}

export function MetricCard({
  title,
  value,
  change,
  description,
}: MetricCardProps) {
  const hasChange = change !== undefined;
  const isPositive = hasChange && change >= 0;

  return (
    <Card className="card-crypto border-0">
      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{value}</span>
            {hasChange && (
              <div
                className={cn(
                  "flex items-center gap-0.5 sm:gap-1",
                  isPositive ? "text-sentiment-greed" : "text-sentiment-fear"
                )}
              >
                {isPositive ? (
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
                <span className="text-xs sm:text-sm font-medium">
                  {isPositive ? "+" : ""}
                  {change.toFixed(1)}%
                </span>
              </div>
            )}
          </div>
          <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
