import { NextRequest, NextResponse } from "next/server";
import { buildPaymentRequired, PRICES, BASE } from "@/lib/config";

export const dynamic = "force-dynamic";

/**
 * Cheap live-style price endpoint ($0.01 USDC)
 * Real production would verify X-PAYMENT / facilitator settle.
 * This demo returns 402 until a payment proof header is present.
 */
export async function GET(req: NextRequest) {
  const payment = req.headers.get("x-payment") || req.headers.get("X-PAYMENT");
  const proof = req.headers.get("x-payment-proof") || req.headers.get("X-Payment-Proof");

  if (!payment && !proof) {
    const body = buildPaymentRequired({
      amount: PRICES.price,
      description: "Live crypto price snapshot via x402",
      resource: "https://x402-micropay-earn.vercel.app/api/price",
    });

    return new NextResponse(JSON.stringify(body), {
      status: 402,
      headers: {
        "Content-Type": "application/json",
        "X-Payment-Required": "true",
        "PAYMENT-REQUIRED": Buffer.from(JSON.stringify(body)).toString("base64"),
        "X-Payment-Address": BASE.payTo,
        "X-Payment-Amount": String(Math.round(PRICES.price * 1e6)),
        "X-Payment-Asset": "USDC",
        "X-Payment-Network": "base",
        "Access-Control-Expose-Headers":
          "PAYMENT-REQUIRED, X-Payment-Address, X-Payment-Amount, X-Payment-Asset, X-Payment-Network",
      },
    });
  }

  // Payment present — return demo data (production: verify on-chain / facilitator)
  return NextResponse.json({
    paid: true,
    price: {
      symbol: "ETH",
      usd: 3247.82,
      change24h: 1.42,
      source: "demo-oracle",
      timestamp: new Date().toISOString(),
    },
    note: "Payment accepted. In production this is settled via x402 facilitator to the creator wallet.",
    creator: "@okfreelancer",
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-PAYMENT, X-Payment-Proof",
    },
  });
}
