import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "x402 Easy Micropay Earn | @okfreelancer",
  description:
    "Trendy pay-per-call micropayments on Base + Solana. AI agents pay USDC, creators earn instantly. No accounts, no keys.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
          background: "#0a0a0b",
          color: "#f4f4f5",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
