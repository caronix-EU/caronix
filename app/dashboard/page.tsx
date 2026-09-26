"use client";

import { useEffect, useMemo, useState } from "react";
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
function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-5h4v5a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V9" />
    </svg>
  );
}

// Haalt unieke, niet-lege waarden op uit een lijst voertuigen voor een gegeven veld
function uniqueValues(vehicles: Vehicle[], key: keyof Vehicle): string[] {
  const set = new Set<string>();
  vehicles.forEach((v) => {
    const val = v[key];
    if (val && typeof val === "string" && val.trim() !== "") set.add(val);
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
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

  // Houdt bij welke foto-index (0, 1, 2...) elk voertuig op dit moment toont
  const [photoIndex, setPhotoIndex] = useState<Record<number, number>>({});

  // Filterstatus: lege string = "alle"
  const [filterBrand, setFilterBrand] = useState("");
  const [filterModel, setFilterModel] = useState("");
  const [filterFuel, setFilterFuel] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [filterTransmission, setFilterTransmission] = useState("");
  const [filterCountry, setFilterCountry] = useState("");

  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [kmFrom, setKmFrom] = useState("");
  const [kmTo, setKmTo] = useState("");

  function nextPhoto(vehicleId: number, total: number) {
    setPhotoIndex((prev) => {
      const current = prev[vehicleId] || 0;
      return { ...prev, [vehicleId]: (current + 1) % total };
    });
  }

  function prevPhoto(vehicleId: number, total: number) {
    setPhotoIndex((prev) => {
      const current = prev[vehicleId] || 0;
      return { ...prev, [vehicleId]: (current - 1 + total) % total };
    });
  }

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

  // Dropdown-opties, automatisch afgeleid uit de huidige voertuigen
  const brandOptions = useMemo(() => uniqueValues(vehicles, "brand"), [vehicles]);
  const modelOptions = useMemo(() => uniqueValues(vehicles, "model"), [vehicles]);
  const fuelOptions = useMemo(() => uniqueValues(vehicles, "fuel"), [vehicles]);
  const colorOptions = useMemo(() => uniqueValues(vehicles, "color"), [vehicles]);
  const transmissionOptions = useMemo(() => uniqueValues(vehicles, "transmission"), [vehicles]);
  const countryOptions = useMemo(() => uniqueValues(vehicles, "country"), [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (filterBrand && v.brand !== filterBrand) return false;
      if (filterModel && v.model !== filterModel) return false;
      if (filterFuel && v.fuel !== filterFuel) return false;
      if (filterColor && v.color !== filterColor) return false;
      if (filterTransmission && v.transmission !== filterTransmission) return false;
      if (filterCountry && v.country !== filterCountry) return false;

      if (yearFrom || yearTo) {
        const year = v.registration ? new Date(v.registration).getFullYear() : null;
        if (year === null) return false;
        if (yearFrom && year < Number(yearFrom)) return false;
        if (yearTo && year > Number(yearTo)) return false;
      }

      if (priceFrom && (!v.price || v.price < Number(priceFrom))) return false;
      if (priceTo && (!v.price || v.price > Number(priceTo))) return false;

      if (kmFrom && (v.km === null || v.km === undefined || v.km < Number(kmFrom))) return false;
      if (kmTo && (v.km === null || v.km === undefined || v.km > Number(kmTo))) return false;

      return true;
    });
  }, [
    vehicles,
    filterBrand,
    filterModel,
    filterFuel,
    filterColor,
    filterTransmission,
    filterCountry,
    yearFrom,
    yearTo,
    priceFrom,
    priceTo,
    kmFrom,
    kmTo,
  ]);

  function resetFilters() {
    setFilterBrand("");
    setFilterModel("");
    setFilterFuel("");
    setFilterColor("");
    setFilterTransmission("");
    setFilterCountry("");
    setYearFrom("");
    setYearTo("");
    setPriceFrom("");
    setPriceTo("");
    setKmFrom("");
    setKmTo("");
  }

  const filtersActive =
    filterBrand ||
    filterModel ||
    filterFuel ||
    filterColor ||
    filterTransmission ||
    filterCountry ||
    yearFrom ||
    yearTo ||
    priceFrom ||
    priceTo ||
    kmFrom ||
    kmTo;

  const chrome: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(180deg, #F2F3F4 0%, #C7CCD1 35%, #8C949C 55%, #DADFE3 75%, #A9AFB6 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
  };

  // Stijl voor de dropdown-filterknoppen (native <select>, visueel als pill-knop)
  const selectStyle: React.CSSProperties = {
    borderColor: "#2A2E34",
    color: "#8A929C",
    backgroundColor: "transparent",
    appearance: "none",
    WebkitAppearance: "none",
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
          <a
            href="/"
            className="w-8 h-8 rounded-full flex items-center justify-center border"
            style={{ borderColor: "#2A2E34", color: "#8A929C" }}
            aria-label="Naar homepagina"
          >
            <HomeIcon />
          </a>

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
              {loading
                ? "Laden..."
                : `${filteredVehicles.length} van ${vehicles.length} beschikbare occasions binnen de EU`}
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
          <div className="relative shrink-0">
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-4 py-2 pr-8 rounded-full text-xs border shrink-0 cursor-pointer"
              style={selectStyle}
            >
              <option value="">Merk</option>
              {brandOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8A929C" }}>
              <ChevronIcon />
            </span>
          </div>

          <div className="relative shrink-0">
            <select
              value={filterModel}
              onChange={(e) => setFilterModel(e.target.value)}
              className="px-4 py-2 pr-8 rounded-full text-xs border shrink-0 cursor-pointer"
              style={selectStyle}
            >
              <option value="">Model</option>
              {modelOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8A929C" }}>
              <ChevronIcon />
            </span>
          </div>

          <div className="relative shrink-0">
            <select
              value={filterFuel}
              onChange={(e) => setFilterFuel(e.target.value)}
              className="px-4 py-2 pr-8 rounded-full text-xs border shrink-0 cursor-pointer"
              style={selectStyle}
            >
              <option value="">Brandstof</option>
              {fuelOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8A929C" }}>
              <ChevronIcon />
            </span>
          </div>

          <div className="relative shrink-0">
            <select
              value={filterColor}
              onChange={(e) => setFilterColor(e.target.value)}
              className="px-4 py-2 pr-8 rounded-full text-xs border shrink-0 cursor-pointer"
              style={selectStyle}
            >
              <option value="">Kleur</option>
              {colorOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8A929C" }}>
              <ChevronIcon />
            </span>
          </div>

          <div className="relative shrink-0">
            <select
              value={filterTransmission}
              onChange={(e) => setFilterTransmission(e.target.value)}
              className="px-4 py-2 pr-8 rounded-full text-xs border shrink-0 cursor-pointer"
              style={selectStyle}
            >
              <option value="">Transmissie</option>
              {transmissionOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8A929C" }}>
              <ChevronIcon />
            </span>
          </div>

          <div className="relative shrink-0">
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="px-4 py-2 pr-8 rounded-full text-xs border shrink-0 cursor-pointer"
              style={selectStyle}
            >
              <option value="">Land van herkomst</option>
              {countryOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8A929C" }}>
              <ChevronIcon />
            </span>
          </div>

          {filtersActive && (
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-full text-xs border shrink-0"
              style={{ borderColor: "#5A2E2E", color: "#D98787" }}
            >
              Filters wissen
            </button>
          )}
        </div>

        <div className="flex flex-nowrap gap-3 mb-8 overflow-x-auto pb-1">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs border shrink-0"
            style={{ borderColor: "#2A2E34", color: "#8A929C" }}
          >
            <span style={{ color: "#8A929C" }}>Bouwjaar</span>
            <input
              type="number"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              placeholder="Van"
              className="bg-transparent outline-none w-16"
              style={{ color: "#F2F3F4" }}
            />
            <span>-</span>
            <input
              type="number"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              placeholder="Tot"
              className="bg-transparent outline-none w-16"
              style={{ color: "#F2F3F4" }}
            />
          </div>

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs border shrink-0"
            style={{ borderColor: "#2A2E34", color: "#8A929C" }}
          >
            <span style={{ color: "#8A929C" }}>Prijs</span>
            <input
              type="number"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              placeholder="Van (EUR)"
              className="bg-transparent outline-none w-20"
              style={{ color: "#F2F3F4" }}
            />
            <span>-</span>
            <input
              type="number"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              placeholder="Tot (EUR)"
              className="bg-transparent outline-none w-20"
              style={{ color: "#F2F3F4" }}
            />
          </div>

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs border shrink-0"
            style={{ borderColor: "#2A2E34", color: "#8A929C" }}
          >
            <span style={{ color: "#8A929C" }}>Tellerstand</span>
            <input
              type="number"
              value={kmFrom}
              onChange={(e) => setKmFrom(e.target.value)}
              placeholder="Van (km)"
              className="bg-transparent outline-none w-20"
              style={{ color: "#F2F3F4" }}
            />
            <span>-</span>
            <input
              type="number"
              value={kmTo}
              onChange={(e) => setKmTo(e.target.value)}
              placeholder="Tot (km)"
              className="bg-transparent outline-none w-20"
              style={{ color: "#F2F3F4" }}
            />
          </div>
        </div>

        {loading && <p style={{ color: "#7A828C" }}>Voertuigen laden...</p>}
        {error && <p style={{ color: "#C0524E" }}>Er ging iets mis: {error}</p>}
        {!loading && !error && vehicles.length === 0 && (
          <p style={{ color: "#7A828C" }}>
            Nog geen voertuigen toegevoegd. Klik op &quot;+ Voertuig toevoegen&quot; om te beginnen.
          </p>
        )}
        {!loading && !error && vehicles.length > 0 && filteredVehicles.length === 0 && (
          <p style={{ color: "#7A828C" }}>Geen voertuigen gevonden die aan deze filters voldoen.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVehicles.map((v) => {
            const photos = v.photo_urls || [];
            const currentIndex = photoIndex[v.id] || 0;
            const hasMultiplePhotos = photos.length > 1;

            return (
              <div
                key={v.id}
                className="rounded-md overflow-hidden border"
                style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}
              >
                <div
                  className="relative h-56 flex items-center justify-center overflow-hidden"
                  style={{ background: "linear-gradient(135deg,#12151A,#1C2128)" }}
                >
                  {photos.length > 0 ? (
                    <img
                      src={photos[currentIndex]}
                      alt={v.brand + " " + v.model}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs" style={{ color: "#4E555E" }}>
                      Geen foto
                    </span>
                  )}

                  {hasMultiplePhotos && (
                    <>
                      <button
                        onClick={() => prevPhoto(v.id, photos.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(8,9,11,0.7)", color: "#F2F3F4" }}
                        aria-label="Vorige foto"
                      >
                        <ArrowLeftIcon />
                      </button>
                      <button
                        onClick={() => nextPhoto(v.id, photos.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(8,9,11,0.7)", color: "#F2F3F4" }}
                        aria-label="Volgende foto"
                      >
                        <ArrowRightIcon />
                      </button>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {photos.map((_, i) => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: i === currentIndex ? "#7FA8D9" : "rgba(242,243,244,0.35)",
                            }}
                          />
                        ))}
                      </div>

                      <div
                        className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: "rgba(8,9,11,0.7)", color: "#F2F3F4" }}
                      >
                        {currentIndex + 1}/{photos.length}
                      </div>
                    </>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
