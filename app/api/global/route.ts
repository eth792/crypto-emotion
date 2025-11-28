import { NextResponse } from "next/server";

// Get global market data
export async function GET() {
  try {
    const response = await fetch("https://api.alternative.me/v2/global/", {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch global market data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
