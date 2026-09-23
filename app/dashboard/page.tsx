"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

type Vehicle = {
  id: number;
  brand: string;
  model: string;
  uitvoering: string;
  btw_type: string;
  registration: string; // datum als "YYYY-MM-DD" string vanuit Supabase
  price: number;
  km: number;
  fuel: string;
  color: string;
  transmission: string;
  country: string;
  photo_urls: string[] | null;
};

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
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const isLoggedIn = !!session;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    async function fetchVehicles() {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setVehicles(data as Vehicle[]);
      }
      setLoading(false);
    }
    fetchVehicles();
  }, []);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Weet je zeker dat je dit voertuig wilt verwijderen? Dit kan niet ongedaan gemaakt worden."
    );
    if (!confirmed) return;

    setDeletingId(id);
    const { error } = await supabase.from("vehicles").delete().eq("id", id);
    if (error) {
      alert("Verwijderen mislukt: " + error.message);
    } else {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
    setDeletingId(null);
  }

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
      <div
        className="flex items-center justify-between px-6 md:px-10 py-4 border-b"
        style={{ borderColor: "#1E2126" }}
      >
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 100 100">
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
          <span className="text-lg tracking-tight" style={chrome}>
            CARONIX
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#8A929C" }}>
          <a href="/dashboard" style={{ color: "#F2F3F4" }}>
            Aanbod
          </a>
          {isLoggedIn && <a href="/dashboard/nieuw">Voertuig toevoegen</a>}
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

          {!authLoading && isLoggedIn && (
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-full text-xs border"
              style={{ borderColor: "#2A2E34", color: "#D98787" }}
            >
              Uitloggen
            </button>
          )}

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
            <h1
              className="text-2xl mb-1"
              style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
            >
              Voertuigaanbod
            </h1>
            <p className="text-sm" style={{ color: "#7A828C" }}>
              {loading ? "Laden..." : `${vehicles.length} beschikbare occasions binnen de EU`}
            </p>
          </div>

          {isLoggedIn && (
            <a
              href="/dashboard/nieuw"
              className="px-4 py-2 rounded-sm text-sm text-center"
              style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
            >
              + Voertuig toevoegen
            </a>
          )}
        </div>

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

        <div className="flex flex-nowrap gap-3 mb-8 overflow-x-auto pb-1">
          {[
            { label: "Bouwjaar", from: "Van", to: "Tot" },
            { label: "Prijs", from: "Van (EUR)", to: "Tot (EUR)" },
            { label: "Tellerstand", from: "Van (km)", to: "Tot (km)" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs border shrink-0"
              style={{ borderColor: "#2A2E34", color: "#8A929C" }}
            >
              <span style={{ color: "#8A929C" }}>{f.label}</span>
              <input placeholder={f.from} className="bg-transparent outline-none w-16" style={{ color: "#F2F3F4" }} />
              <span>-</span>
              <input placeholder={f.to} className="bg-transparent outline-none w-16" style={{ color: "#F2F3F4" }} />
            </div>
          ))}
        </div>

        {loading && <p style={{ color: "#7A828C" }}>Voertuigen laden...</p>}
        {error && <p style={{ color: "#C0524E" }}>Er ging iets mis: {error}</p>}
        {!loading && !error && vehicles.length === 0 && (
          <p style={{ color: "#7A828C" }}>
            Nog geen voertuigen toegevoegd. Klik op &quot;+ Voertuig toevoegen&quot; om te beginnen.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="rounded-md overflow-hidden border"
              style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}
            >
              <div
                className="h-56 flex items-center justify-center overflow-hidden"
                style={{ background: "linear-gradient(135deg,#12151A,#1C2128)" }}
              >
                {v.photo_urls && v.photo_urls.length > 0 ? (
                  <img
                    src={v.photo_urls[0]}
                    alt={v.brand + " " + v.model}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs" style={{ color: "#4E555E" }}>
                    Geen foto
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="text-sm" style={{ color: "#F2F3F4" }}>
                      {v.brand}
                    </div>
                    <div className="text-base" style={{ color: "#F2F3F4" }}>
                      {v.model}
                    </div>
                    {v.uitvoering && (
                      <div className="text-xs" style={{ color: "#F2F3F4" }}>
                        {v.uitvoering}
                      </div>
                    )}
                  </div>
                  <div className="text-base" style={{ color: "#7FA8D9", fontWeight: 600 }}>
                    {v.price ? "EUR " + Number(v.price).toLocaleString("nl-NL") : "-"}
                    {v.btw_type && (
                      <div className="text-[10px] font-normal text-right mt-0.5" style={{ color: "#F2F3F4" }}>
                        {v.btw_type}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: "#F2F3F4" }}>
                  <span className="flex items-center gap-1">
                    <CalendarIcon />{" "}
                    {v.registration
                      ? new Date(v.registration).toLocaleDateString("nl-NL", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "-"}
                  </span>
                  <span>{v.km ? Number(v.km).toLocaleString("nl-NL") + " km" : "-"}</span>
                  <span className="flex items-center gap-1">
                    <PinIcon /> {v.country}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: "#F2F3F4" }}>
                  <span>{v.fuel}</span>
                  <span>{v.color}</span>
                  <span>{v.transmission}</span>
                </div>

                {isLoggedIn && (
                  <div className="flex gap-2 mt-4">
                    <a
                      href={"/dashboard/bewerken/" + v.id}
                      className="flex-1 py-2 text-xs rounded-sm text-center"
                      style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
                    >
                      Bewerken
                    </a>
                    <button
                      onClick={() => handleDelete(v.id)}
                      disabled={deletingId === v.id}
                      className="flex-1 py-2 text-xs rounded-sm border"
                      style={{
                        borderColor: "#5A2E2E",
                        color: deletingId === v.id ? "#6E7680" : "#D98787",
                        backgroundColor: "transparent",
                      }}
                    >
                      {deletingId === v.id ? "Bezig..." : "Verwijderen"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
