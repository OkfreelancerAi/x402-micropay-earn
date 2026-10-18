import { NextResponse } from "next/server";
import { CREATOR, BASE, SOLANA, PRICES } from "@/lib/config";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "x402-micropay-earn",
    version: "1.0.0",
    x402Version: 1,
    creator: CREATOR,
    payment: {
      base: {
        network: BASE.network,
        payTo: BASE.payTo,
        asset: "USDC",
      },
      solana: {
        network: SOLANA.network,
        payTo: SOLANA.payTo,
        asset: "USDC",
      },
      prices: PRICES,
    },
    message: "Ready to earn. Hit /api/earn or /api/price — agents pay via x402, funds go to @okfreelancer",
  });
}
