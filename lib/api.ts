export interface FearGreedData {
  value: number;
  value_classification: string;
  timestamp: string;
  time_until_update?: string;
}

export interface FearGreedHistoryResponse {
  data: {
    datasets: Array<{
      backgroundColor: string;
      borderColor: string;
      data: number[];
      fill: boolean;
      label: string;
    }>;
    labels: string[];
  };
  success: number;
}

// V2 API structure
export interface TickerData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: string;
  total_supply: string;
  max_supply: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
    };
  };
  last_updated: number;
}

export interface GlobalData {
  active_cryptocurrencies: number;
  active_markets: number;
  bitcoin_percentage_of_market_cap: number;
  quotes: {
    USD: {
      total_market_cap: number;
      total_volume_24h: number;
    };
  };
}

// Fear & Greed Index APIs
export async function fetchFearGreedHistory(
  days: number = 30
): Promise<FearGreedHistoryResponse> {
  try {
    const response = await fetch("/api/fear-greed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ days }),
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch Fear & Greed Index:", error);
    throw error;
  }
}

export async function fetchCurrentFearGreed(): Promise<FearGreedData> {
  try {
    const response = await fetch("/api/fear-greed", {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data[0];
  } catch (error) {
    console.error("Failed to fetch current Fear & Greed Index:", error);
    throw error;
  }
}

// Ticker APIs
export async function fetchTopCryptos(limit: number = 10): Promise<Record<string, TickerData>> {
  try {
    const response = await fetch(`/api/ticker?limit=${limit}`, {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch ticker data:", error);
    throw error;
  }
}

// Global Market APIs
export async function fetchGlobalMarket(): Promise<GlobalData> {
  try {
    const response = await fetch("/api/global", {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch global market data:", error);
    throw error;
  }
}

// Utility functions
export function transformHistoryData(response: FearGreedHistoryResponse) {
  const { datasets, labels } = response.data;
  const scores = datasets[0].data;

  return labels.map((label, index) => ({
    time: label,
    score: scores[index],
  }));
}

export function calculateChange(data: number[]): number {
  if (data.length < 2) return 0;
  const current = data[data.length - 1];
  const previous = data[data.length - 2];
  return ((current - previous) / previous) * 100;
}
