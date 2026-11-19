"use client";

import Link from "next/link";

export default function ContactPage() {
  const email = "info@caronix.nl";

  const chrome: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(180deg, #F2F3F4 0%, #C7CCD1 35%, #8C949C 55%, #DADFE3 75%, #A9AFB6 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
  };

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: "#08090B" }}>
      <div
        className="flex items-center justify-between px-6 md:px-10 py-4 border-b"
        style={{ borderColor: "#1E2126" }}
      >
        <Link
          href="/"
          className="text-lg tracking-tight"
          style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          CARONIX
        </Link>
        <Link href="/" className="text-sm" style={{ color: "#8A929C" }}>
          ← Terug naar home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
          <img src="/logo-caronix.png" alt="Caronix logo" width={96} height={96} className="mb-4 mx-auto" />

          <h1
            className="text-2xl mb-2"
            style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          >
            Neem contact op
          </h1>
          <p className="text-sm mb-10" style={{ color: "#7A828C" }}>
            Heeft u een vraag, wilt u een voertuig bespreken, of wilt u even sparren? Stuur ons een e-mail.
          </p>

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-md border transition-colors"
            style={{ borderColor: "#2A2E34", color: "#F2F3F4" }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = "#2E5A94")}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = "#2A2E34")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FA8D9" strokeWidth={2}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
            <span className="text-base" style={{ fontWeight: 500 }}>
              {email}
            </span>
          </a>

          <p className="mt-4 text-xs" style={{ color: "#4E555E" }}>
            Klik op het e-mailadres om uw mailprogramma te openen.
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 text-xs text-center" style={{ color: "#4E555E" }}>
        Caronix - B2B-voertuigbemiddeling
      </div>
    </div>
  );
}
