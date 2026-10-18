# x402 Easy Micropay Earn

**Trendy, zero-friction micropayments for AI agents & creators.**

Pay-per-call with USDC on **Base** and **Solana**. No accounts, no API keys, no Stripe.
Every paid request settles to the creator wallets below.

**Creator:** [@okfreelancer](https://x.com/okfreelancer)  
**GitHub:** [OkfreelancerAi](https://github.com/OkfreelancerAi)

---

## Creator wallets (funds land here)

| Network | Address |
|---------|---------|
| **Base** (USDC) | `0x34AcF08d68D85644bf322B7167151F8422f1BafC` |
| **Solana** (USDC) | `2jAMeJZH1UeNSgdzdhHgYwAm6286aRqxMCdx52DBw7xo` |

---

## Endpoints

| Path | Price | Description |
|------|-------|-------------|
| `GET /api/health` | Free | Status, config, wallets |
| `GET /api/price` | $0.01 USDC | Demo price snapshot |
| `GET/POST /api/earn` | $0.05 USDC | Main earn insight payload |

---

## How x402 works (30 seconds)

1. Client requests a paid route → server returns **HTTP 402** + payment requirements (Base + Solana options).
2. Client signs an EIP-3009 `transferWithAuthorization` (or Solana equivalent) for the exact USDC amount.
3. Client retries with `X-PAYMENT` (or `X-Payment-Proof`) header.
4. Server / facilitator verifies the payment → returns the data.
5. USDC is already on its way to the creator address.

This starter implements the **402 challenge + headers** correctly so any x402-compatible agent or client can pay. For full production settlement on mainnet, point at a public facilitator (PayAI, x402rs, Heurist, Corbits, etc.) or run your own.

---

## Deploy (Vercel — 1 click)

1. Fork / push this repo to your GitHub.
2. Import in [Vercel](https://vercel.com/new).
3. Deploy. No env vars required for the demo (wallets are hardcoded to the creator).

Optional env (future):
```
PAY_TO_BASE=0x...
PAY_TO_SOLANA=...
FACILITATOR_URL=https://...
```

---

## Local

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Customize & earn more

- Change prices in `src/lib/config.ts`
- Add new routes under `src/app/api/` that return 402 until payment header is present
- Replace the demo JSON with your real logic (research, signals, content, compute, etc.)
- Point more agents at your deployed URL — every paid call is revenue

---

## Stack

- Next.js 14 (App Router) — Vercel-native
- Pure TypeScript
- x402 v1 payment-required payload (dual-chain ready)

---

MIT · Built for the agentic economy · @okfreelancer
