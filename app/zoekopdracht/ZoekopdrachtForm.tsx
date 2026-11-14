"use client";

import { useState } from "react";
import type { ReactNode } from "react";

// Hier komen de zoekopdrachten binnen.
const CONTACT = "info@caronix.nl";

const inputClass =
  "w-full px-3 py-3 rounded-md border text-base focus:outline-none focus:ring-2 focus:ring-[#2E5A94]";
const inputStyle = { backgroundColor: "#08090B", borderColor: "#2A2E34", color: "#F2F3F4" };

// Bedrag met punten voor duizendtallen (45000 wordt 45.000).
function opmaak(invoer: string): string {
  const cijfers = invoer.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
  return cijfers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function Veld({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] mb-1" style={{ color: "#8A929C" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

type Invoer = {
  merk: string;
  model: string;
  bouwjaar: string;
  km: string;
  brandstof: string;
  transmissie: string;
  budget: string;
  aantal: string;
  wensen: string;
  bedrijf: string;
  naam: string;
  email: string;
  telefoon: string;
  kvk: string;
};

const LEEG: Invoer = {
  merk: "",
  model: "",
  bouwjaar: "",
  km: "",
  brandstof: "",
  transmissie: "",
  budget: "",
  aantal: "",
  wensen: "",
  bedrijf: "",
  naam: "",
  email: "",
  telefoon: "",
  kvk: "",
};

const KM_OPTIES = [10000, 25000, 50000, 75000, 100000, 125000, 150000, 200000];
const BRANDSTOF_OPTIES = ["Benzine", "Diesel", "Hybride (HEV/MHEV)", "Plug-in hybride (PHEV)", "Elektrisch"];
const TRANSMISSIE_OPTIES = ["Automaat", "Handgeschakeld"];
const AANTAL_OPTIES = ["1", "2", "3 of meer"];

export default function ZoekopdrachtForm() {
  const [v, setV] = useState<Invoer>(LEEG);
  const [fouten, setFouten] = useState<string[]>([]);
  const [tekst, setTekst] = useState<string | null>(null);
  const [gekopieerd, setGekopieerd] = useState(false);

  const huidigJaar = new Date().getFullYear();
  const jaren = Array.from({ length: 14 }, (_, i) => huidigJaar - i);

  const zet =
    (k: keyof Invoer) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const waarde = e.target.value; // direct lezen, niet pas bij het bijwerken van de staat
      setV((p) => ({ ...p, [k]: waarde }));
    };

  function maakTekst(): string {
    const regel = (label: string, waarde: string) => (waarde.trim() ? `${label}: ${waarde.trim()}\n` : "");
    return (
      "Zoekopdracht via caronix.nl\n\n" +
      "Gezocht voertuig\n" +
      regel("Merk", v.merk) +
      regel("Model", v.model) +
      regel("Bouwjaar vanaf", v.bouwjaar) +
      regel("Kilometerstand tot", v.km ? Number(v.km).toLocaleString("nl-NL") + " km" : "") +
      regel("Brandstof", v.brandstof) +
      regel("Transmissie", v.transmissie) +
      regel("Budget tot", v.budget ? "€ " + v.budget : "") +
      regel("Aantal", v.aantal) +
      regel("Opties en wensen", v.wensen) +
      "\nGegevens\n" +
      regel("Bedrijf", v.bedrijf) +
      regel("Naam", v.naam) +
      regel("E-mail", v.email) +
      regel("Telefoon", v.telefoon) +
      regel("KvK-nummer", v.kvk)
    );
  }

  function verstuur(e: React.FormEvent) {
    e.preventDefault();
    const f: string[] = [];
    if (!v.merk.trim()) f.push("Vul het merk in dat u zoekt.");
    if (!v.bedrijf.trim()) f.push("Vul uw bedrijfsnaam in.");
    if (!v.naam.trim()) f.push("Vul uw naam in.");
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) f.push("Vul een geldig e-mailadres in.");
    setFouten(f);
    if (f.length > 0) return;

    const t = maakTekst();
    setTekst(t);
    setGekopieerd(false);
    const onderwerp = `Zoekopdracht: ${[v.merk.trim(), v.model.trim()].filter(Boolean).join(" ")}`;
    window.location.href =
      `mailto:${CONTACT}?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(t)}`;
  }

  async function kopieer() {
    if (!tekst) return;
    try {
      await navigator.clipboard.writeText(tekst);
      setGekopieerd(true);
    } catch {
      // Lukt kopiëren niet, dan kan de bezoeker de tekst zelf selecteren.
    }
  }

  return (
    <form onSubmit={verstuur} noValidate>
      <div className="rounded-lg border p-4 mb-4" style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}>
        <h2
          className="text-base mb-4"
          style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
        >
          Welk voertuig zoekt u?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Veld id="merk" label="Merk *">
            <input id="merk" value={v.merk} onChange={zet("merk")} className={inputClass} style={inputStyle} placeholder="Toyota" />
          </Veld>
          <Veld id="model" label="Model">
            <input id="model" value={v.model} onChange={zet("model")} className={inputClass} style={inputStyle} placeholder="Yaris Cross" />
          </Veld>
          <Veld id="bouwjaar" label="Bouwjaar vanaf">
            <select id="bouwjaar" value={v.bouwjaar} onChange={zet("bouwjaar")} className={inputClass} style={inputStyle}>
              <option value="">Geen voorkeur</option>
              {jaren.map((j) => (
                <option key={j} value={String(j)}>
                  {j}
                </option>
              ))}
            </select>
          </Veld>
          <Veld id="km" label="Kilometerstand tot">
            <select id="km" value={v.km} onChange={zet("km")} className={inputClass} style={inputStyle}>
              <option value="">Geen voorkeur</option>
              {KM_OPTIES.map((k) => (
                <option key={k} value={String(k)}>
                  {k.toLocaleString("nl-NL")} km
                </option>
              ))}
            </select>
          </Veld>
          <Veld id="brandstof" label="Brandstof">
            <select id="brandstof" value={v.brandstof} onChange={zet("brandstof")} className={inputClass} style={inputStyle}>
              <option value="">Geen voorkeur</option>
              {BRANDSTOF_OPTIES.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Veld>
          <Veld id="transmissie" label="Transmissie">
            <select id="transmissie" value={v.transmissie} onChange={zet("transmissie")} className={inputClass} style={inputStyle}>
              <option value="">Geen voorkeur</option>
              {TRANSMISSIE_OPTIES.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Veld>
          <Veld id="budget" label="Budget tot per voertuig">
            <div className="relative">
              <span
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none text-base"
                style={{ left: 12, color: "#8A929C" }}
              >
                €
              </span>
              <input
                id="budget"
                type="text"
                inputMode="numeric"
                value={v.budget}
                onChange={(e) => {
                  const waarde = opmaak(e.target.value);
                  setV((p) => ({ ...p, budget: waarde }));
                }}
                className={inputClass}
                style={{ ...inputStyle, paddingLeft: 32 }}
                placeholder="20.000"
              />
            </div>
          </Veld>
          <Veld id="aantal" label="Aantal voertuigen">
            <select id="aantal" value={v.aantal} onChange={zet("aantal")} className={inputClass} style={inputStyle}>
              <option value="">Geen voorkeur</option>
              {AANTAL_OPTIES.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Veld>
        </div>
        <div className="mt-4">
          <Veld id="wensen" label="Gewenste opties en overige wensen">
            <textarea
              id="wensen"
              value={v.wensen}
              onChange={zet("wensen")}
              maxLength={1000}
              rows={4}
              className={inputClass}
              style={inputStyle}
              placeholder="Bijvoorbeeld kleur, uitvoering, trekhaak, panoramadak"
            />
          </Veld>
        </div>
      </div>

      <div className="rounded-lg border p-4 mb-4" style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}>
        <h2
          className="text-base mb-4"
          style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
        >
          Uw gegevens
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Veld id="bedrijf" label="Bedrijfsnaam *">
            <input id="bedrijf" value={v.bedrijf} onChange={zet("bedrijf")} className={inputClass} style={inputStyle} autoComplete="organization" />
          </Veld>
          <Veld id="naam" label="Uw naam *">
            <input id="naam" value={v.naam} onChange={zet("naam")} className={inputClass} style={inputStyle} autoComplete="name" />
          </Veld>
          <Veld id="email" label="E-mailadres *">
            <input id="email" type="email" value={v.email} onChange={zet("email")} className={inputClass} style={inputStyle} autoComplete="email" />
          </Veld>
          <Veld id="telefoon" label="Telefoonnummer">
            <input id="telefoon" type="tel" value={v.telefoon} onChange={zet("telefoon")} className={inputClass} style={inputStyle} autoComplete="tel" />
          </Veld>
          <Veld id="kvk" label="KvK-nummer">
            <input id="kvk" value={v.kvk} onChange={zet("kvk")} className={inputClass} style={inputStyle} inputMode="numeric" />
          </Veld>
        </div>
      </div>

      {fouten.length > 0 && (
        <ul className="mb-4 text-sm space-y-1" style={{ color: "#FF7B6B" }} role="alert">
          {fouten.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="w-full py-3.5 rounded-md text-base font-semibold"
        style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
      >
        Verstuur zoekopdracht
      </button>
      <p className="text-xs mt-3" style={{ color: "#8A929C" }}>
        Er opent een e-mail met uw zoekopdracht. U verstuurt die zelf vanuit uw e-mailprogramma.
      </p>

      {tekst && (
        <div className="rounded-lg border p-4 mt-6" style={{ backgroundColor: "#0E1013", borderColor: "#2E5A94" }}>
          <p className="text-sm mb-2" style={{ color: "#F2F3F4", fontWeight: 600 }}>
            Opent er geen e-mail?
          </p>
          <p className="text-xs mb-3" style={{ color: "#8A929C" }}>
            Kopieer dan deze tekst en mail die naar{" "}
            <a href={`mailto:${CONTACT}`} className="underline" style={{ color: "#7FA8D9" }}>
              {CONTACT}
            </a>
            .
          </p>
          <textarea
            readOnly
            value={tekst}
            rows={10}
            className="w-full px-3 py-2 rounded-md border text-xs"
            style={{ backgroundColor: "#08090B", borderColor: "#2A2E34", color: "#B7BEC7" }}
          />
          <button
            type="button"
            onClick={kopieer}
            className="mt-3 px-4 py-2 rounded-md border text-sm"
            style={{ borderColor: "#2E5A94", color: "#7FA8D9" }}
          >
            {gekopieerd ? "Gekopieerd" : "Kopieer tekst"}
          </button>
        </div>
      )}
    </form>
  );
}
