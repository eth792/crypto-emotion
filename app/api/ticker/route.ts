import { NextRequest, NextResponse } from "next/server";

// Get ticker data for top cryptocurrencies
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit") || "10";
    const convert = searchParams.get("convert") || "USD";

    const response = await fetch(
      `https://api.alternative.me/v2/ticker/?limit=${limit}&convert=${convert}`,
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch ticker data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
