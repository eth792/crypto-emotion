import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSentimentType(score: number): {
  type: "fear" | "neutral" | "greed";
  label: string;
  color: string;
} {
  if (score < 36)
    return { type: "fear", label: "Fear", color: "text-sentiment-fear" };
  if (score < 66)
    return {
      type: "neutral",
      label: "Neutral",
      color: "text-sentiment-neutral",
    };
  return { type: "greed", label: "Greed", color: "text-sentiment-greed" };
}

export function formatNumber(num: number, decimals = 2): string {
  return num.toFixed(decimals);
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}
