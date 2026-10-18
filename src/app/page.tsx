import { CREATOR, BASE, SOLANA, PRICES } from "@/lib/config";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "48px 20px 80px",
        lineHeight: 1.6,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: 999,
          background: "linear-gradient(90deg,#22c55e22,#3b82f622)",
          border: "1px solid #22c55e44",
          color: "#4ade80",
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        x402 · Base + Solana · Live
      </div>

      <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.5, margin: "0 0 12px" }}>
        Easy Micropayments.
        <br />
        <span style={{ color: "#a78bfa" }}>Creators earn.</span>
      </h1>

      <p style={{ color: "#a1a1aa", fontSize: 18, marginBottom: 32 }}>
        AI agents and users pay a few cents in USDC per API call.
        No subscriptions. No API keys. Funds land directly in{" "}
        <a href={CREATOR.twitter} style={{ color: "#60a5fa" }}>
          {CREATOR.handle}
        </a>
        &apos;s wallets.
      </p>

      <section
        style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 16,
          padding: 24,
          marginBottom: 28,
        }}
      >
        <h2 style={{ margin: "0 0 16px", fontSize: 18 }}>Creator wallets</h2>
        <div style={{ fontSize: 14, fontFamily: "ui-monospace, monospace" }}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ color: "#71717a" }}>Base (USDC)</span>
            <br />
            <span style={{ wordBreak: "break-all" }}>{BASE.payTo}</span>
          </div>
          <div>
            <span style={{ color: "#71717a" }}>Solana (USDC)</span>
            <br />
            <span style={{ wordBreak: "break-all" }}>{SOLANA.payTo}</span>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Endpoints</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "#71717a" }}>
              <th style={{ padding: "8px 0" }}>Path</th>
              <th>Price</th>
              <th>Desc</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderTop: "1px solid #27272a" }}>
              <td style={{ padding: "10px 0" }}>
                <code>/api/health</code>
              </td>
              <td>Free</td>
              <td>Status + config</td>
            </tr>
            <tr style={{ borderTop: "1px solid #27272a" }}>
              <td style={{ padding: "10px 0" }}>
                <code>/api/price</code>
              </td>
              <td>${PRICES.price.toFixed(2)}</td>
              <td>Demo price oracle</td>
            </tr>
            <tr style={{ borderTop: "1px solid #27272a" }}>
              <td style={{ padding: "10px 0" }}>
                <code>/api/earn</code>
              </td>
              <td>${PRICES.earn.toFixed(2)}</td>
              <td>Main earn insight</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section
        style={{
          background: "#18181b",
          border: "1px solid #27272a",
          borderRadius: 16,
          padding: 24,
          marginBottom: 28,
        }}
      >
        <h2 style={{ margin: "0 0 12px", fontSize: 18 }}>How it works</h2>
        <ol style={{ margin: 0, paddingLeft: 20, color: "#d4d4d8" }}>
          <li>Agent hits a paid route → receives HTTP 402 + payment requirements</li>
          <li>Agent signs USDC transferWithAuthorization (or Solana equivalent)</li>
          <li>Retries with <code>X-PAYMENT</code> header</li>
          <li>Server (or facilitator) verifies → returns data</li>
          <li>USDC settles to the creator wallets above</li>
        </ol>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Quick test</h2>
        <pre
          style={{
            background: "#09090b",
            border: "1px solid #27272a",
            borderRadius: 12,
            padding: 16,
            overflowX: "auto",
            fontSize: 13,
            color: "#a1a1aa",
          }}
        >
{`# See payment required
curl -i https://YOUR-DEPLOY.vercel.app/api/earn

# Health (free)
curl https://YOUR-DEPLOY.vercel.app/api/health`}
        </pre>
      </section>

      <footer style={{ color: "#52525b", fontSize: 13 }}>
        Built for {CREATOR.handle} ·{" "}
        <a href={CREATOR.github} style={{ color: "#71717a" }}>
          GitHub
        </a>{" "}
        · x402 open standard · Base + Solana
      </footer>
    </main>
  );
}
