import { ImageResponse } from "next/og";

export const alt = "Caronix - B2B Autohandel & Sourcing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08090B",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" fill="none" stroke="#3E4750" strokeWidth={2} />
          <path
            d="M10 68 C35 68 55 35 92 14"
            stroke="url(#swoosh)"
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="swoosh" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2E5A94" />
              <stop offset="100%" stopColor="#7FA8D9" />
            </linearGradient>
          </defs>
        </svg>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 700,
            color: "#F2F3F4",
            letterSpacing: "-0.02em",
          }}
        >
          CARONIX
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 24,
            color: "#6E93C2",
            letterSpacing: "0.3em",
          }}
        >
          B2B | CARTRADING | SOURCING
        </div>
      </div>
    ),
    { ...size }
  );
}
