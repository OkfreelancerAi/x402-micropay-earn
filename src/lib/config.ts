/**
 * x402 Easy Micropay Earn — Creator Config
 * Payments settle to @okfreelancer wallets on Base (ETH/USDC) + Solana
 */

export const CREATOR = {
  handle: "@okfreelancer",
  name: "MISTER FANTASTIC",
  twitter: "https://x.com/okfreelancer",
  github: "https://github.com/OkfreelancerAi",
};

/** Base (EVM) — USDC on Base mainnet */
export const BASE = {
  network: "base",
  chainId: 8453,
  payTo: "0x34AcF08d68D85644bf322B7167151F8422f1BafC",
  asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
  assetSymbol: "USDC",
  decimals: 6,
  // Facilitator for testnet/mainnet (public ones work for discovery)
  facilitator: "https://x402.org/facilitator",
};

/** Solana */
export const SOLANA = {
  network: "solana",
  payTo: "2jAMeJZH1UeNSgdzdhHgYwAm6286aRqxMCdx52DBw7xo",
  asset: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  assetSymbol: "USDC",
  decimals: 6,
};

/** Default prices in USDC (human readable) */
export const PRICES = {
  health: 0, // free
  price: 0.01, // $0.01
  earn: 0.05, // $0.05 — main earning endpoint demo
  tip: 0.10,
};

export function toAtomic(amount: number, decimals = 6): string {
  return Math.round(amount * 10 ** decimals).toString();
}

/** Build x402 Payment Required payload (v1/v2 compatible headers) */
export function buildPaymentRequired(opts: {
  amount: number;
  description?: string;
  resource?: string;
}) {
  const amountAtomic = toAtomic(opts.amount);
  return {
    x402Version: 1,
    accepts: [
      {
        scheme: "exact",
        network: "base",
        maxAmountRequired: amountAtomic,
        resource: opts.resource || "https://x402-micropay-earn.vercel.app",
        description: opts.description || "x402 micropayment",
        mimeType: "application/json",
        payTo: BASE.payTo,
        maxTimeoutSeconds: 60,
        asset: BASE.asset,
        extra: {
          name: "USDC",
          version: "2",
        },
      },
      {
        scheme: "exact",
        network: "solana",
        maxAmountRequired: amountAtomic,
        resource: opts.resource || "https://x402-micropay-earn.vercel.app",
        description: opts.description || "x402 micropayment (Solana)",
        mimeType: "application/json",
        payTo: SOLANA.payTo,
        maxTimeoutSeconds: 60,
        asset: SOLANA.asset,
        extra: {
          name: "USDC",
        },
      },
    ],
  };
}
