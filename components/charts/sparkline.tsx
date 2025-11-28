"use client";

import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

interface SparklineProps {
  data: number[];
  color?: string;
}

export function Sparkline({ data, color = "#FF6B4A" }: SparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  // Calculate min and max for better scaling
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);

  // Add padding to domain (5% on each side)
  const padding = (maxValue - minValue) * 0.1 || 1;
  const domain = [minValue - padding, maxValue + padding];

  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={chartData} style={{ outline: 'none' }}>
        <YAxis domain={domain} hide />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
