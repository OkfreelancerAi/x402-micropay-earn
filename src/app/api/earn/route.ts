import { NextRequest, NextResponse } from "next/server";
import { buildPaymentRequired, PRICES, BASE, CREATOR } from "@/lib/config";

export const dynamic = "force-dynamic";

/**
 * Main earning endpoint — $0.05 USDC
 * Agents call this for a structured "earn insight" payload.
 * Funds flow to creator wallets on Base / Solana via x402.
 */
export async function GET(req: NextRequest) {
  const payment = req.headers.get("x-payment") || req.headers.get("X-PAYMENT");
  const proof = req.headers.get("x-payment-proof") || req.headers.get("X-Payment-Proof");

  if (!payment && !proof) {
    const body = buildPaymentRequired({
      amount: PRICES.earn,
      description: "Creator earn insight + micropay settlement to @okfreelancer",
      resource: "https://x402-micropay-earn.vercel.app/api/earn",
    });

    return new NextResponse(JSON.stringify(body), {
      status: 402,
      headers: {
        "Content-Type": "application/json",
        "X-Payment-Required": "true",
        "PAYMENT-REQUIRED": Buffer.from(JSON.stringify(body)).toString("base64"),
        "X-Payment-Address": BASE.payTo,
        "X-Payment-Amount": String(Math.round(PRICES.earn * 1e6)),
        "X-Payment-Asset": "USDC",
        "X-Payment-Network": "base",
        "Access-Control-Expose-Headers":
          "PAYMENT-REQUIRED, X-Payment-Address, X-Payment-Amount, X-Payment-Asset, X-Payment-Network",
      },
    });
  }

  // Paid path
  return NextResponse.json({
    paid: true,
    amountUsd: PRICES.earn,
    creator: CREATOR,
    insight: {
      title: "Easy Micropay Earnings Active",
      tip: "Agents and users can pay $0.01–$0.10 USDC per call. No accounts, no API keys — pure x402.",
      next: "Point more endpoints at your own logic. Every paid call lands in the wallets below.",
      wallets: {
        base: BASE.payTo,
        solana: "2jAMeJZH1UeNSgdzdhHgYwAm6286aRqxMCdx52DBw7xo",
      },
    },
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  return GET(req);
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-PAYMENT, X-Payment-Proof",
    },
  });
}
