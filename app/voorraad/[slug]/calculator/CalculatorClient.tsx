"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";

// Hier gaan de offerte-aanvragen naartoe.
const CONTACT = "info@caronix.nl";

type CalcAuto = {
  voertuignummer: number;
  slug: string;
  titel: string;
  prijs: number;
  fuel: string | null;
  km: number | null;
  registration: string | null;
  foto: string | null;
  provisie: number;
  transport: number;
  kenteken: number;
  bpmBtw: number;
  bpmPeildatum: string | null;
  overig: number;
  verkoopprijs: number | null;
  btwType: string | null;
  land: string | null;
};

const KLEUREN = ["#7FA8D9", "#2E5A94", "#F0872A", "#A84F9C", "#8A929C", "#C9A227"];
const POSITIEF = "#4CBF82";

// Het proces vanaf het bod, zoals Caronix het hanteert.
const STAPPEN = [
  { titel: "U brengt een bod uit", tekst: "Via de knop stuurt u ons uw bod met deze berekening." },
  { titel: "Wij leggen uw bod voor aan de verkoper", tekst: "De eigenaar van het voertuig krijgt uw bod van ons voorgelegd. De reactietijd hangt af van de verkoper; wij laten het u weten zodra wij antwoord hebben." },
  {
    titel: "Akkoord van de verkoper: bindend",
    tekst: "Gaat de verkoper akkoord, dan is uw bod bindend en wordt het voertuig aan u toegewezen. U ontvangt de factuur en betaalt vóór het transport.",
  },
  {
    titel: "Afwijzing of tegenbod",
    tekst: "Wijst de verkoper af? Dan hoort u dat van ons. Doet hij een tegenbod, dan leggen wij dat aan u voor en is het pas bindend als u daarmee akkoord gaat.",
  },
];
const NEGATIEF = "#FF7B6B";

const inputClass =
  "w-full px-3 py-3 rounded-md border text-base focus:outline-none focus:ring-2 focus:ring-[#2E5A94] disabled:cursor-not-allowed";
const inputStyle = { backgroundColor: "#08090B", borderColor: "#2A2E34", color: "#F2F3F4" };
const lockedStyle = { ...inputStyle, opacity: 0.6 };

// Geldbedrag in hele euro's, Nederlandse notatie (zoals in het oorspronkelijke bestand).
function fmt(v: number): string {
  try {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);
  } catch {
    return String(Math.round(v));
  }
}

// Leest een invulveld als getal; leeg of ongeldig telt als 0.
// Leest een ingevuld bedrag als getal: punt = duizendtal, komma = decimaal. Leeg of ongeldig telt als 0.
function n(v: string): number {
  const x = parseFloat(v.replace(/\./g, "").replace(",", "."));
  return isNaN(x) ? 0 : x;
}

// Maakt van wat de bezoeker typt een net bedrag: punten voor duizendtallen (16450 wordt 16.450).
function opmaak(invoer: string): string {
  const schoon = invoer.replace(/[^\d,]/g, "");
  const delen = schoon.split(",");
  const heel = delen[0].replace(/^0+(?=\d)/, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  if (delen.length > 1) return heel + "," + delen.slice(1).join("").slice(0, 2);
  return heel;
}

// Zet een getal om naar de opmaak van het invulveld.
function naarVeld(v: number): string {
  return opmaak(String(Math.round(v * 100) / 100).replace(".", ","));
}

function procent(v: number): string {
  return v.toFixed(1).replace(".", ",") + "%";
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

export default function CalculatorClient({ auto }: { auto: CalcAuto }) {
  // Invulbaar door de bezoeker. Het bod begint bij de vraagprijs.
  const [bod, setBod] = useState(naarVeld(auto.prijs));
  const [reg, setReg] = useState(naarVeld(auto.kenteken));
  const [tax, setTax] = useState(naarVeld(auto.bpmBtw));
  const [oth, setOth] = useState(naarVeld(auto.overig));
  // Verwachte verkoopprijs: vooraf ingevuld door Caronix (indien bekend), de bezoeker kan hem aanpassen.
  const [verkoop, setVerkoop] = useState(auto.verkoopprijs ? naarVeld(auto.verkoopprijs) : "");

  // Vast per auto (komt uit de database, de bezoeker kan dit niet wijzigen).
  const feePct = auto.provisie;
  const tr = auto.transport;

  // --- Rekenlogica (ongewijzigd t.o.v. het oorspronkelijke bestand) ---
  const h = n(bod);
  const fee = (h * feePct) / 100;
  const parts: [string, number][] = [
    ["Bod", h],
    ["Provisie Caronix (" + String(feePct).replace(".", ",") + "% van bod)", fee],
    ["Transport", tr],
    ["Kentekenvoorbereiding", n(reg)],
    ["BPM", n(tax)],
    ["Overig", n(oth)],
  ];
  const tot = parts.reduce((s, p) => s + p[1], 0);

  const rp = n(verkoop);
  let margeTekst = "–";
  let margePctTekst = "–";
  let margeNegatief = false;
  if (rp > 0) {
    const m = rp - tot;
    margeNegatief = m < 0;
    margeTekst = fmt(m);
    margePctTekst = procent((m / rp) * 100);
  }
  const margeKleur = rp > 0 ? (margeNegatief ? NEGATIEF : POSITIEF) : "#F2F3F4";
  // --- Einde rekenlogica ---

  const registratieTekst = auto.registration
    ? new Date(auto.registration).toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  // BPM is een indicatie: toon de peildatum zodat duidelijk is hoe actueel het bedrag is
  const bpmPeil = auto.bpmPeildatum
    ? new Date(auto.bpmPeildatum + "T12:00:00").toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
  const bpmToelichting = auto.bpmBtw > 0 ? (bpmPeil ? ` (indicatie per ${bpmPeil})` : " (indicatie)") : "";

  // BTW-status van de auto (zelfde veld als op de voertuigpagina)
  const btwInfo =
    auto.btwType === "Marge"
      ? { label: "Margeauto", uitleg: "Geen btw apart vermeld op de factuur." }
      : auto.btwType === "Excl. BTW"
      ? { label: "Excl. btw", uitleg: "Vraagprijs is exclusief btw." }
      : null;

  const blokjes: { label: string; waarde: string }[] = [];
  if (auto.fuel) blokjes.push({ label: "Brandstof", waarde: auto.fuel });
  if (auto.km) blokjes.push({ label: "Kilometerstand", waarde: auto.km.toLocaleString("nl-NL") + " km" });
  if (registratieTekst) blokjes.push({ label: "1e registratie", waarde: registratieTekst });
  if (auto.land) blokjes.push({ label: "Herkomst", waarde: auto.land });

  const autoUrl = `https://www.caronix.nl/voorraad/${auto.slug}/calculator`;
  // Bedragen in de mail met Nederlandse punten en een gewone spatie
  const eur = (v: number) => fmt(v).replace(/\u00a0/g, " ");
  const mailTekst =
    `Hierbij breng ik een bod uit van ${eur(h)} op ${auto.titel} (CX-${auto.voertuignummer}).\n` +
    "Ik begrijp dat mijn bod aan de verkoper wordt voorgelegd en dat het bindend wordt zodra de verkoper akkoord geeft.\n" +
    "Voorwaarden: https://www.caronix.nl/voorwaarden\n\n" +
    "Mijn berekening via de Caronix-calculator:\n" +
    (btwInfo ? `BTW-status: ${btwInfo.label}\n` : "") +
    `Link: ${autoUrl}\n` +
    "Bestemming: Nederland\n" +
    parts
      .filter((p) => p[1] > 0)
      .map((p) => p[0] + ": " + eur(p[1]))
      .join("\n") +
    "\nTotale inkoopkosten: " +
    eur(tot) +
    "\n\nMijn gegevens:\nNaam:\nBedrijf:\nKvK-nummer:\nBTW-nummer:\nTelefoon:";
  // Bericht voor WhatsApp: titelregel, korte zin en de link (zonder bedragen)
  const waTekst = `${auto.titel}\nBekijk de kostprijsberekening bij Caronix:\n${autoUrl}`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(waTekst)}`;
  const mailLink =
    `mailto:${CONTACT}?subject=` +
    encodeURIComponent(`Bod op ${auto.titel} - CX-${auto.voertuignummer}`) +
    "&body=" +
    encodeURIComponent(mailTekst);

  const kaart = { backgroundColor: "#0E1013", borderColor: "#1E2126" };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#08090B" }}>
      {/* Navbar (zelfde als op de voertuigpagina) */}
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
        <Link
          href={`/voorraad/${auto.slug}`}
          className="text-sm"
          style={{ color: "#8A929C" }}
        >
          ← Terug naar voertuig
        </Link>
      </div>

      <div className="px-4 md:px-6 pt-6 pb-28 md:pb-6 max-w-xl mx-auto">
        <h1
          className="text-2xl mb-1"
          style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
        >
          Weet wat uw import echt kost
        </h1>
        <p className="text-sm mb-5" style={{ color: "#8A929C" }}>
          Weet vóór u biedt wat de auto werkelijk kost en wat uw marge kan zijn.
        </p>

        {/* Autokaart */}
        <div className="rounded-lg border overflow-hidden mb-3" style={kaart}>
          {auto.foto && (
            <img
              src={auto.foto}
              alt={auto.titel}
              className="w-full block object-cover"
              style={{ maxHeight: 280 }}
            />
          )}
          <div className="p-4">
            <h2
              className="text-lg"
              style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
            >
              {auto.titel}
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "#8A929C" }}>
              Vraagprijs: {fmt(auto.prijs)}
            </p>
            <div className="text-xs mt-1" style={{ color: "#8A929C" }}>
              Voertuignummer CX-{auto.voertuignummer}
            </div>
            {btwInfo && (
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs px-2.5 py-1 rounded-full border"
                  style={{ borderColor: "#2E5A94", color: "#7FA8D9" }}
                >
                  {btwInfo.label}
                </span>
                <span className="text-xs" style={{ color: "#8A929C" }}>
                  {btwInfo.uitleg}
                </span>
              </div>
            )}
            {blokjes.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                {blokjes.map((b) => (
                  <div
                    key={b.label}
                    className="rounded-md border px-2 py-2"
                    style={{ borderColor: "#1E2126", backgroundColor: "#08090B" }}
                  >
                    <div className="text-[11px]" style={{ color: "#8A929C" }}>
                      {b.label}
                    </div>
                    <div className="text-sm" style={{ color: "#F2F3F4" }}>
                      {b.waarde}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link
              href={`/voorraad/${auto.slug}`}
              className="inline-block mt-3 text-sm underline"
              style={{ color: "#7FA8D9" }}
            >
              Bekijk alle foto&apos;s en specificaties →
            </Link>
            <Link href="/voorraad" className="block mt-2 text-sm underline" style={{ color: "#8A929C" }}>
              Bekijk meer voertuigen →
            </Link>
          </div>
        </div>

        {/* Invoer */}
        <div className="rounded-lg border p-4 mb-3" style={kaart}>
          <Veld id="bod" label="Uw bod in € (startpunt is de vraagprijs)">
            <input
              id="bod"
              type="text"
              inputMode="numeric"
              value={bod}
              onChange={(e) => setBod(opmaak(e.target.value))}
              className={inputClass}
              style={inputStyle}
            />
          </Veld>
          <div className="flex gap-2 flex-wrap mt-2 mb-3">
            {[500, 250, 100, 50].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setBod(naarVeld(Math.max(0, n(bod) - v)))}
                className="px-3.5 py-2 rounded-full border text-sm"
                style={{ borderColor: "#2A2E34", color: "#F2F3F4", backgroundColor: "#0E1013" }}
              >
                − €{v}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Veld id="fee" label="Provisie Caronix %">
              <input
                id="fee"
                type="number"
                value={feePct}
                readOnly
                disabled
                className={inputClass}
                style={lockedStyle}
              />
            </Veld>
            <Veld id="land" label="Bestemming">
              <input
                id="land"
                value="Nederland"
                readOnly
                disabled
                className={inputClass}
                style={lockedStyle}
              />
            </Veld>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Veld id="tr" label="Transport €">
              <input
                id="tr"
                type="number"
                value={tr}
                readOnly
                disabled
                className={inputClass}
                style={lockedStyle}
              />
            </Veld>
            <Veld id="reg" label="Kentekenvoorbereiding €">
              <input
                id="reg"
                type="text"
                inputMode="numeric"
                value={reg}
                onChange={(e) => setReg(opmaak(e.target.value))}
                className={inputClass}
                style={inputStyle}
              />
            </Veld>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Veld id="tax" label="BPM €">
              <input
                id="tax"
                type="text"
                inputMode="numeric"
                value={tax}
                onChange={(e) => setTax(opmaak(e.target.value))}
                className={inputClass}
                style={inputStyle}
              />
            </Veld>
            <Veld id="oth" label="Overig (poetsen, klaarmaken e.d.) €">
              <input
                id="oth"
                type="text"
                inputMode="numeric"
                value={oth}
                onChange={(e) => setOth(opmaak(e.target.value))}
                className={inputClass}
                style={inputStyle}
              />
            </Veld>
          </div>

          <p className="text-xs mt-3" style={{ color: "#8A929C" }}>
            Voorgesteld door Caronix: kenteken {fmt(auto.kenteken)}, BPM {fmt(auto.bpmBtw)}
            {bpmToelichting}, overig {fmt(auto.overig)}. U kunt deze bedragen zelf aanpassen.
            {auto.bpmBtw > 0 && " De BPM is een indicatie en kan wijzigen."}
          </p>
        </div>

        {/* Totale inkoopkosten */}
        <div className="rounded-lg border p-4 mb-3" style={kaart}>
          <p
            className="text-4xl text-right"
            style={{ color: "#7FA8D9", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
          >
            {fmt(tot)}
          </p>
          <div className="text-sm text-right" style={{ color: "#8A929C" }}>
            Uw totale inkoopkosten, klaar voor verkoop
          </div>

          <div
            className="flex h-3.5 rounded-lg overflow-hidden my-3"
            style={{ backgroundColor: "#1E2126" }}
            aria-hidden="true"
          >
            {tot > 0 &&
              parts.map((p, i) => (
                <div key={i} style={{ width: (p[1] / tot) * 100 + "%", backgroundColor: KLEUREN[i] }} />
              ))}
          </div>
          <div className="text-sm mb-1" style={{ color: "#8A929C" }}>
            Aandeel in totale inkoopkosten
          </div>

          <div>
            {parts
              .map((p, i) => ({ p, i }))
              .filter(({ p }) => p[1] > 0)
              .map(({ p, i }) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 text-[15px] border-b last:border-b-0"
                  style={{ borderColor: "#1E2126", color: "#F2F3F4" }}
                >
                  <span className="flex items-center">
                    <i
                      className="inline-block rounded-sm mr-2"
                      style={{ width: 11, height: 11, backgroundColor: KLEUREN[i] }}
                    />
                    {p[0]}
                  </span>
                  <span>
                    {fmt(p[1])} <span style={{ color: "#8A929C" }}>{procent((p[1] / tot) * 100)}</span>
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Verkoop en marge */}
        <div className="rounded-lg border p-4 mb-4" style={kaart}>
          <Veld
            id="rp"
            label={
              auto.verkoopprijs
                ? "Indicatieve verkoopprijs in € – Caronix inschatting"
                : "Verwachte verkoopprijs in €"
            }
          >
            <input
              id="rp"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={verkoop}
              onChange={(e) => setVerkoop(opmaak(e.target.value))}
              className={inputClass}
              style={inputStyle}
            />
          </Veld>
          <p className="text-xs mt-2" style={{ color: "#8A929C" }}>
            {auto.verkoopprijs
              ? "Dit bedrag is een indicatie van Caronix. U kunt het aanpassen aan uw eigen inzicht en marktkennis."
              : "Vul hier uw eigen verwachte verkoopprijs in."}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <div>
              <div className="text-xs" style={{ color: "#8A929C" }}>
                Marge
              </div>
              <p className="text-lg font-bold mt-1" style={{ color: margeKleur }}>
                {margeTekst}
              </p>
            </div>
            <div>
              <div className="text-xs" style={{ color: "#8A929C" }}>
                Marge % v. verkoop
              </div>
              <p className="text-lg font-bold mt-1" style={{ color: margeKleur }}>
                {margePctTekst}
              </p>
            </div>
          </div>
          {auto.btwType === "Marge" && rp > 0 && (
            <p className="text-xs mt-3" style={{ color: "#8A929C" }}>
              Bij een margeauto is de btw over de marge hierin nog niet verwerkt.
            </p>
          )}
        </div>

        <div className="rounded-lg border p-4 mb-4" style={kaart}>
          <h2
            className="text-base mb-3"
            style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          >
            Zo werkt het
          </h2>
          <ol className="space-y-3">
            {STAPPEN.map((st, i) => (
              <li key={st.titel} className="flex gap-3">
                <span
                  className="shrink-0 flex items-center justify-center rounded-full text-xs font-semibold"
                  style={{ width: 24, height: 24, backgroundColor: "#2E5A94", color: "#F2F3F4" }}
                >
                  {i + 1}
                </span>
                <div>
                  <div className="text-sm" style={{ color: "#F2F3F4", fontWeight: 600 }}>
                    {st.titel}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#8A929C" }}>
                    {st.tekst}
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-xs mt-3 pt-3 border-t" style={{ borderColor: "#1E2126", color: "#8A929C" }}>
            Levering: ongeveer 3 tot 4 weken na betaling.
          </p>
        </div>

        <a
          href={mailLink}
          className="hidden md:block w-full text-center py-3.5 rounded-md text-base font-semibold"
          style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
        >
          Breng een bod uit
        </a>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 mt-3 rounded-md text-sm border"
          style={{ borderColor: "#2E5A94", color: "#7FA8D9" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.2A8.5 8.5 0 1 1 21 11.5z" />
          </svg>
          Deel via WhatsApp
        </a>

        <p className="text-xs mt-3" style={{ color: "#8A929C" }}>
          Indicatieve berekening. Uw bod wordt pas bindend na akkoord, zoals beschreven onder
          &quot;Zo werkt het&quot;. Belastingen en overige kosten zijn hier invulbaar; controleer deze
          altijd vooraf.
        </p>

        <div
          className="flex gap-4 text-xs mt-8 pt-4 border-t"
          style={{ borderColor: "#1E2126", color: "#8A929C" }}
        >
          <Link href="/voorwaarden">Voorwaarden</Link>
          <Link href="/privacybeleid">Privacybeleid</Link>
        </div>
      </div>

      {/* Vaste balk onderaan op de telefoon: totaal, marge en offerteknop blijven in beeld */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 border-t px-4 pt-3"
        style={{
          backgroundColor: "#0E1013",
          borderColor: "#1E2126",
          paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="flex items-center gap-3 max-w-xl mx-auto">
          <div className="flex-1 min-w-0 grid grid-cols-2 gap-3">
            <div>
              <div className="text-[11px]" style={{ color: "#8A929C" }}>
                Totaal inkoop
              </div>
              <div className="text-base font-bold truncate" style={{ color: "#7FA8D9" }}>
                {fmt(tot)}
              </div>
            </div>
            <div>
              <div className="text-[11px]" style={{ color: "#8A929C" }}>
                Marge
              </div>
              <div className="text-base font-bold truncate" style={{ color: margeKleur }}>
                {rp > 0 ? margeTekst : "–"}
              </div>
            </div>
          </div>
          <a
            href={mailLink}
            className="shrink-0 px-4 py-3 rounded-md text-sm font-semibold"
            style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
          >
            Breng een bod uit
          </a>
        </div>
      </div>
    </div>
  );
}
