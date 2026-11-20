"use client";

import { useState } from "react";
import type { ReactNode } from "react";

// Hier komen de aanmeldingen binnen.
const CONTACT = "info@caronix.nl";

const inputClass =
  "w-full px-3 py-3 rounded-md border text-base focus:outline-none focus:ring-2 focus:ring-[#2E5A94]";
const inputStyle = { backgroundColor: "#08090B", borderColor: "#2A2E34", color: "#F2F3F4" };

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
  bedrijf: string;
  naam: string;
  email: string;
  btw: string;
  kvk: string;
  toestemming: boolean;
};

const LEEG: Invoer = { bedrijf: "", naam: "", email: "", btw: "", kvk: "", toestemming: false };

export default function VoorraadlijstForm() {
  const [v, setV] = useState<Invoer>(LEEG);
  const [fouten, setFouten] = useState<string[]>([]);
  const [tekst, setTekst] = useState<string | null>(null);
  const [gekopieerd, setGekopieerd] = useState(false);

  const zet =
    (k: "bedrijf" | "naam" | "email" | "kvk") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const waarde = e.target.value; // direct lezen, niet pas bij het bijwerken van de staat
      setV((p) => ({ ...p, [k]: waarde }));
    };

  function maakTekst(): string {
    const regel = (label: string, waarde: string) => (waarde.trim() ? `${label}: ${waarde.trim()}\n` : "");
    return (
      "Aanmelding voorraadlijst via caronix.nl\n\n" +
      regel("Bedrijf", v.bedrijf) +
      regel("Naam", v.naam) +
      regel("E-mail", v.email) +
      regel("BTW-nummer", v.btw) +
      regel("KvK-nummer", v.kvk) +
      "\nIk wil de voorraadlijst per e-mail ontvangen. Ik kan mij op elk moment afmelden door een e-mail te sturen aan " +
      CONTACT +
      ".\n"
    );
  }

  function verstuur(e: React.FormEvent) {
    e.preventDefault();
    const f: string[] = [];
    if (!v.bedrijf.trim()) f.push("Vul uw bedrijfsnaam in.");
    if (!v.naam.trim()) f.push("Vul uw naam in.");
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) f.push("Vul een geldig e-mailadres in.");
    if (!v.btw.trim()) f.push("Vul uw BTW-nummer in.");
    else if (!/^[A-Z]{2}[A-Z0-9]{6,14}$/.test(v.btw)) f.push("Controleer uw BTW-nummer. Het begint met een landcode, bijvoorbeeld NL.");
    if (!v.toestemming) f.push("Vink aan dat u de voorraadlijst per e-mail wilt ontvangen.");
    setFouten(f);
    if (f.length > 0) return;

    const t = maakTekst();
    setTekst(t);
    setGekopieerd(false);
    window.location.href =
      `mailto:${CONTACT}?subject=${encodeURIComponent("Aanmelding voorraadlijst")}&body=${encodeURIComponent(t)}`;
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
          <Veld id="btw" label="BTW-nummer *">
            <input
              id="btw"
              value={v.btw}
              onChange={(e) => {
                const waarde = e.target.value.toUpperCase().replace(/[\s.\-]/g, ""); // hoofdletters, zonder spaties en punten
                setV((p) => ({ ...p, btw: waarde }));
              }}
              className={inputClass}
              style={inputStyle}
              autoComplete="off"
              aria-describedby="btw-hint"
            />
            <p id="btw-hint" className="text-[11px] mt-1" style={{ color: "#8A929C" }}>
              Met landcode, bijvoorbeeld NL123456789B01.
            </p>
          </Veld>
          <Veld id="kvk" label="KvK-nummer">
            <input id="kvk" value={v.kvk} onChange={zet("kvk")} className={inputClass} style={inputStyle} inputMode="numeric" />
          </Veld>
        </div>

        <label className="flex items-start gap-3 mt-5 text-sm cursor-pointer" style={{ color: "#B7BEC7" }}>
          <input
            id="toestemming"
            type="checkbox"
            checked={v.toestemming}
            onChange={(e) => {
              const aan = e.target.checked;
              setV((p) => ({ ...p, toestemming: aan }));
            }}
            className="mt-1 shrink-0"
            style={{ width: 18, height: 18, accentColor: "#2E5A94" }}
          />
          <span>
            Ik wil de voorraadlijst per e-mail ontvangen. Ik kan mij op elk moment afmelden.
          </span>
        </label>
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
        Aanmelden
      </button>
      <p className="text-xs mt-3" style={{ color: "#8A929C" }}>
        Er opent een e-mail met uw aanmelding. U verstuurt die zelf vanuit uw e-mailprogramma.
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
            rows={9}
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
