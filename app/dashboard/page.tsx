"use client";

import { useState } from "react";

const vehicles = [
  { brand: "BMW", model: "5 Serie 520d", year: 2022, price: "€38.900", country: "Duitsland", km: "41.200 km", fuel: "Diesel", color: "Zwart", transmission: "Automaat" },
  { brand: "Audi", model: "A6 Avant", year: 2021, price: "€34.500", country: "België", km: "58.900 km", fuel: "Diesel", color: "Grijs", transmission: "Automaat" },
  { brand: "Mercedes-Benz", model: "C-Klasse", year: 2023, price: "€42.300", country: "Duitsland", km: "22.400 km", fuel: "Benzine", color: "Wit", transmission: "Automaat" },
  { brand: "Volvo", model: "XC60", year: 2022, price: "€39.700", country: "Zweden", km: "36.100 km", fuel: "Hybride", color: "Blauw", transmission: "Automaat" },
  { brand: "Škoda", model: "Superb Combi", year: 2021, price: "€27.800", country: "Tsjechië", km: "62.300 km", fuel: "Diesel", color: "Zilver", transmission: "Handgeschakeld" },
  { brand: "Volkswagen", model: "Passat Variant", year: 2022, price: "€29.900", country: "Duitsland", km: "44.700 km", fuel: "Benzine", color: "Zwart", transmission: "Automaat" },
];

const carPaths = [
  "M8 46h4l4-9c2-4 7-7 14-7h20c7 0 12 3 14 7l4 9h4a3 3 0 013 3v6a3 3 0 01-3 3h-4a8 8 0 01-16 0H32a8 8 0 01-16 0h-4a3 3 0 01-3-3v-6a3 3 0 013-3z",
  "M6 44h5l3-12c1.5-5 6-9 13-9h18c7 0 11.5 4 13 9l3 12h5a3 3 0 013 3v5a3 3 0 01-3 3h-4a8 8 0 01-16 0H30a8 8 0 01-16 0h-5a3 3 0 01-3-3v-5a3 3 0 013-3z",
  "M10 45h3l6-13c2-5 8-9 15-9h9c6 0 10 3 12 8l5 14h3a3 3 0 013 3v4a3 3 0 01-3 3h-3a7 7 0 01-14 0H30a7 7 0 01-14 0h-3a3 3 0 01-3-3v-4a3 3 0 013-3z",
];

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B7CA8" strokeWidth={2}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function DashboardPage() {
  const [lang, setLang] = useState<"NL" | "EN">("NL");

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
    <div className="min-h-screen w-full" style={{ backgroundColor: "#08090B" }}>
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b" style={{ borderColor: "#1E2126" }}>
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" fill="none" stroke="#3E4750" strokeWidth={2} />
            <path d="M10 68 C35 68 55 35 92 14" stroke="url(#swoosh)" strokeWidth={6} fill="none" strokeLinecap="round" />
            <defs>
              <linearGradient id="swoosh" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#2E5A94" />
                <stop offset="100%" stopColor="#7FA8D9" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-lg tracking-tight" style={chrome}>CARONIX</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#8A929C" }}>
          <a href="#" style={{ color: "#F2F3F4" }}>Aanbod</a>
          <a href="#">Mijn aanvragen</a>
          <a href="#">Account</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex rounded-full border overflow-hidden text-xs" style={{ borderColor: "#2A2E34" }}>
            {(["NL", "EN"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-3 py-1.5"
                style={{
                  backgroundColor: lang === l ? "#2E5A94" : "transparent",
                  color: lang === l ? "#F2F3F4" : "#7A828C",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs"
            style={{ backgroundColor: "#1C2128", color: "#8FA0B8" }}
          >
            JD
          </div>
        </div>
      </div>

      {/* Header + filters */}
      <div className="px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl mb-1" style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              Voertuigaanbod
            </h1>
            <p className="text-sm" style={{ color: "#7A828C" }}>
              {vehicles.length} beschikbare occasions binnen de EU
            </p>
          </div>

          <div className="flex items-center gap-2 border-b pb-2 w-full md:w-72" style={{ borderColor: "#2A2E34" }}>
            <SearchIcon />
            <input
              placeholder="Zoek op merk of model..."
              className="w-full bg-transparent outline-none text-sm"
              style={{ color: "#F2F3F4" }}
            />
          </div>
        </div>

        {/* Filters regel 1 */}
        <div className="flex flex-nowrap gap-3 mb-3 overflow-x-auto pb-1">
          {["Merk", "Model", "Brandstof", "Kleur", "Transmissie", "Land van herkomst"].map((f) => (
            <button
              key={f}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs border shrink-0"
              style={{ borderColor: "#2A2E34", color: "#8A929C" }}
            >
              {f}
              <ChevronIcon />
            </button>
          ))}
        </div>

        {/* Filters regel 2: bereiken */}
        <div className="flex flex-nowrap gap-3 mb-8 overflow-x-auto pb-1">
          {[
            { label: "Bouwjaar", from: "Van", to: "Tot" },
            { label: "Prijs", from: "Van (€)", to: "Tot (€)" },
            { label: "Tellerstand", from: "Van (km)", to: "Tot (km)" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs border shrink-0"
              style={{ borderColor: "#2A2E34", color: "#8A929C" }}
            >
              <span style={{ color: "#F2F3F4" }}>{f.label}</span>
              <input placeholder={f.from} className="bg-transparent outline-none w-16" style={{ color: "#F2F3F4" }} />
              <span>–</span>
              <input placeholder={f.to} className="bg-transparent outline-none w-16" style={{ color: "#F2F3F4" }} />
            </div>
          ))}
        </div>

        {/* Vehicle grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map((v, i) => (
            <div
              key={i}
              className="rounded-md overflow-hidden border"
              style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}
            >
              <div
                className="h-36 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#12151A,#1C2128)" }}
              >
                <svg viewBox="0 0 90 60" className="w-1/2 h-1/2">
                  <path d={carPaths[i % 3]} fill="none" stroke="#4E6FA0" strokeWidth={1} opacity={0.6} />
                </svg>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="text-sm" style={{ color: "#8A929C" }}>{v.brand}</div>
                    <div className="text-base" style={{ color: "#F2F3F4" }}>{v.model}</div>
                  </div>
                  <div className="text-base" style={{ color: "#7FA8D9", fontWeight: 600 }}>{v.price}</div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: "#6E7680" }}>
                  <span className="flex items-center gap-1"><CalendarIcon /> {v.year}</span>
                  <span>{v.km}</span>
                  <span className="flex items-center gap-1"><PinIcon /> {v.country}</span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: "#6E7680" }}>
                  <span>{v.fuel}</span>
                  <span>{v.color}</span>
                  <span>{v.transmission}</span>
                </div>

                <button
                  className="w-full mt-4 py-2 text-xs rounded-sm"
                  style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
                >
                  Bekijk details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
