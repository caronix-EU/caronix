"use client";

import { useState } from "react";
import Link from "next/link";

const carBlueprints = [
  "M8 46h4l4-9c2-4 7-7 14-7h20c7 0 12 3 14 7l4 9h4a3 3 0 013 3v6a3 3 0 01-3 3h-4a8 8 0 01-16 0H32a8 8 0 01-16 0h-4a3 3 0 01-3-3v-6a3 3 0 013-3z",
  "M6 44h5l3-12c1.5-5 6-9 13-9h18c7 0 11.5 4 13 9l3 12h5a3 3 0 013 3v5a3 3 0 01-3 3h-4a8 8 0 01-16 0H30a8 8 0 01-16 0h-5a3 3 0 01-3-3v-5a3 3 0 013-3z",
  "M10 45h3l6-13c2-5 8-9 15-9h9c6 0 10 3 12 8l5 14h3a3 3 0 013 3v4a3 3 0 01-3 3h-3a7 7 0 01-14 0H30a7 7 0 01-14 0h-3a3 3 0 01-3-3v-4a3 3 0 013-3z",
];

const tileBg = [
  "linear-gradient(135deg,#12151A,#1C2128)",
  "linear-gradient(135deg,#0D1520,#16222F)",
  "linear-gradient(135deg,#14161B,#1E2833)",
];

export default function LoginPage() {
  const [lang, setLang] = useState<"NL" | "EN">("NL");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const t = {
    NL: {
      loginTitle: "Inloggen op uw account",
      email: "E-mailadres",
      password: "Wachtwoord",
      submit: "Inloggen",
      noAccount: "Nog geen account?",
      register: "Registreer hier",
      footer: "B2B-voertuigbemiddeling",
      loginBtn: "Login",
      companyHeading: "Caronix: Jouw betrouwbare partner in auto groothandel B2B",
      companyText:
        "Ben je op zoek naar een betrouwbare en efficiente manier om je wagenpark uit te breiden? Zoek niet verder! Bij Caronix geniet je van een scala aan voordelen die jouw bedrijf naar nieuwe hoogten zullen stuwen. Wij zijn gespecialiseerd in het in- en verkopen van personenauto's, met meer dan 25 jaar ervaring in de branche.",
    },
    EN: {
      loginTitle: "Log in to your account",
      email: "Email address",
      password: "Password",
      submit: "Log in",
      noAccount: "Don't have an account?",
      register: "Register here",
      footer: "B2B vehicle brokerage",
      loginBtn: "Login",
      companyHeading: "Caronix: Your trusted partner in B2B car wholesale",
      companyText:
        "Looking for a reliable and efficient way to expand your fleet? Look no further! At Caronix you will enjoy a range of benefits that will take your business to new heights. We specialize in buying and selling passenger cars, with over 25 years of experience in the industry.",
    },
  }[lang];

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
    <div className="min-h-screen w-full flex flex-col md:flex-row" style={{ backgroundColor: "#08090B" }}>
      <div
        className="md:w-1/2 min-h-[220px] md:min-h-screen grid grid-cols-3 grid-rows-3 gap-px"
        style={{ backgroundColor: "#000" }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="relative flex items-center justify-center overflow-hidden"
            style={{ background: tileBg[i % 3] }}
          >
            <svg viewBox="0 0 90 60" className="w-2/3 h-2/3 relative">
              <path d={carBlueprints[i % 3]} fill="none" stroke="#4E6FA0" strokeWidth={1} opacity={0.6} />
            </svg>
          </div>
        ))}
      </div>

      <div
        className="md:w-1/2 flex flex-col border-t md:border-t-0 md:border-l"
        style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}
      >
        <div className="flex justify-end items-center gap-3 p-6 md:p-8">
          <Link
            href="/dashboard"
            className="text-xs px-3 py-1.5 rounded-full border transition-colors"
            style={{ borderColor: "#2A2E34", color: "#8FA0B8" }}
          >
            Voorraad
          </Link>

          <button
            onClick={() => setShowLogin((v) => !v)}
            className="text-xs px-3 py-1.5 rounded-full border transition-colors"
            style={{
              borderColor: showLogin ? "#2E5A94" : "#2A2E34",
              color: showLogin ? "#F2F3F4" : "#8FA0B8",
              backgroundColor: showLogin ? "#2E5A94" : "transparent",
            }}
          >
            {t.loginBtn}
          </button>

          <div className="flex rounded-full border overflow-hidden text-xs" style={{ borderColor: "#2A2E34" }}>
            {(["NL", "EN"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-3 py-1.5 transition-colors"
                style={{
                  backgroundColor: lang === l ? "#2E5A94" : "transparent",
                  color: lang === l ? "#F2F3F4" : "#7A828C",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 md:px-16">
          <div className="w-full max-w-sm">
            <div className="flex flex-col items-center text-center mb-10">
              <svg width="48" height="48" viewBox="0 0 100 100" className="mb-3">
                <circle cx="50" cy="50" r="30" fill="none" stroke="#3E4750" strokeWidth={2} />
                <path d="M50 20 Q65 50 50 80 M20 50 h60" stroke="#3E4750" strokeWidth={1} fill="none" opacity={0.7} />
                <path d="M10 68 C35 68 55 35 92 14" stroke="url(#swoosh)" strokeWidth={6} fill="none" strokeLinecap="round" />
                <defs>
                  <linearGradient id="swoosh" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2E5A94" />
                    <stop offset="100%" stopColor="#7FA8D9" />
                  </linearGradient>
                </defs>
              </svg>
              <h1 className="text-3xl tracking-tight" style={chrome}>
                CARONIX
              </h1>
              <p
                className="mt-2 text-[10px]"
                style={{ color: "#6E93C2", letterSpacing: "0.3em", fontWeight: 500 }}
              >
                B2B&nbsp;&nbsp;|&nbsp;&nbsp;CARTRADING&nbsp;&nbsp;|&nbsp;&nbsp;SOURCING
              </p>
            </div>

            {!showLogin ? (
              <div className="text-center text-sm" style={{ color: "#B7BEC7" }}>
                <p className="mb-4" style={{ color: "#F2F3F4", fontWeight: 700 }}>
                  {t.companyHeading}
                </p>
                <p>{t.companyText}</p>
              </div>
            ) : (
              <>
                <h2 className="text-lg mb-6" style={{ color: "#F2F3F4" }}>
                  {t.loginTitle}
                </h2>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm mb-2" style={{ color: "#8A929C" }}>
                      {t.email}
                    </label>
                    <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: "#2A2E34" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B7CA8" strokeWidth={2}>
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m2 7 10 6 10-6" />
                      </svg>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent outline-none text-sm"
                        style={{ color: "#F2F3F4" }}
                        placeholder="naam@bedrijf.nl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2" style={{ color: "#8A929C" }}>
                      {t.password}
                    </label>
                    <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: "#2A2E34" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B7CA8" strokeWidth={2}>
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent outline-none text-sm"
                        style={{ color: "#F2F3F4" }}
                        placeholder="********"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-sm transition-colors"
                    style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3E6FAE")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2E5A94")}
                  >
                    {t.submit}
                  </button>
                </form>

                <p className="mt-6 text-sm" style={{ color: "#7A828C" }}>
                  {t.noAccount}{" "}
                  <a href="#" className="underline" style={{ color: "#F2F3F4" }}>
                    {t.register}
                  </a>
                </p>
              </>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 text-xs" style={{ color: "#4E555E" }}>
          Caronix - {t.footer}
        </div>
      </div>
    </div>
  );
}