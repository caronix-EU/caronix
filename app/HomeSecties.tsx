import Link from "next/link";
import { maakSlug } from "../lib/voertuigSlug";

type Auto = {
  voertuignummer: number;
  brand: string;
  model: string;
  uitvoering: string | null;
  price: number | null;
  km: number | null;
  registration: string | null;
  photo_urls: string[] | null;
};

const VRAGEN = [
  {
    vraag: "Voor wie is Caronix bedoeld?",
    antwoord: "Voor autobedrijven. Het aanbod en de calculator zijn uitsluitend bedoeld voor zakelijke kopers.",
  },
  {
    vraag: "Van wie koop ik de auto?",
    antwoord:
      "Rechtstreeks van de Deense verkoper. Caronix bemiddelt en factureert alleen provisie en transport.",
  },
  {
    vraag: "Waar komen de auto's vandaan?",
    antwoord:
      "Uit de EU, onder meer uit Denemarken. Bij elk voertuig staat het land van herkomst vermeld.",
  },
  {
    vraag: "Wat kost een auto mij in totaal?",
    antwoord:
      "In de kostprijscalculator bij elk voertuig ziet u het bod, de provisie, het transport, de RDW- en kentekenkosten, de BPM en overige kosten bij elkaar, plus uw verwachte marge.",
  },
  {
    vraag: "Hoe lang duurt de levering?",
    antwoord: "Ongeveer 3 tot 4 weken na betaling.",
  },
];

const kop = { color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 } as const;

export default function HomeSecties({ nieuwste }: { nieuwste: Auto[] }) {
  return (
    <div className="px-6 md:px-10 py-14 max-w-5xl mx-auto" style={{ color: "#B7BEC7" }}>
      {/* Voorraadlijst */}
      <section
        className="mb-16 rounded-lg border p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}
      >
        <div>
          <p className="text-base" style={{ color: "#F2F3F4" }}>
            Mis geen voertuig: schrijf u in voor onze voorraadlijst met beschikbare Deense voertuigen.
          </p>
          <p className="text-xs mt-1" style={{ color: "#8A929C" }}>
            Alleen voor autobedrijven.
          </p>
        </div>
        <Link
          href="/voorraadlijst"
          className="shrink-0 px-5 py-3 rounded-md text-sm text-center"
          style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
        >
          Aanmelden
        </Link>
      </section>

      {/* Nieuwste voertuigen */}
      {nieuwste.length > 0 && (
        <section className="mb-16">
          <div className="flex items-end justify-between mb-6 gap-4">
            <h2 className="text-2xl" style={kop}>
              Nieuwste voertuigen
            </h2>
            <Link href="/voorraad" className="text-sm underline shrink-0" style={{ color: "#7FA8D9" }}>
              Bekijk alle voertuigen →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nieuwste.map((a) => {
              const href = `/voorraad/${maakSlug(a.brand, a.model, a.voertuignummer)}`;
              const foto = a.photo_urls && a.photo_urls.length > 0 ? a.photo_urls[0] : null;
              const jaar = a.registration ? new Date(a.registration).getUTCFullYear() : null;
              const regels = [
                jaar ? String(jaar) : null,
                a.km ? `${Number(a.km).toLocaleString("nl-NL")} km` : null,
              ].filter(Boolean);
              return (
                <Link
                  key={a.voertuignummer}
                  href={href}
                  className="block rounded-lg border overflow-hidden"
                  style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}
                >
                  <div style={{ aspectRatio: "3 / 2", backgroundColor: "#08090B" }}>
                    {foto && (
                      <img
                        src={foto}
                        alt={`${a.brand} ${a.model}${a.uitvoering ? " " + a.uitvoering : ""}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full block object-contain"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-base" style={{ color: "#F2F3F4", fontWeight: 600 }}>
                      {a.brand} {a.model}
                    </h3>
                    {a.uitvoering && (
                      <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "#8A929C" }}>
                        {a.uitvoering}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-3 text-xs" style={{ color: "#8A929C" }}>
                      <span>{regels.join(" · ")}</span>
                      {a.price ? (
                        <span className="text-sm" style={{ color: "#7FA8D9", fontWeight: 600 }}>
                          € {Number(a.price).toLocaleString("nl-NL")}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Kostprijscalculator */}
      <section
        className="mb-16 rounded-lg border p-6"
        style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}
      >
        <h2 className="text-2xl mb-3" style={kop}>
          Weet wat uw import echt kost
        </h2>
        <p className="text-sm leading-relaxed mb-4 max-w-3xl">
          Bij elk voertuig staat een kostprijscalculator. U vult uw bod in en ziet direct de provisie, het
          transport, de RDW- en kentekenkosten, de BPM en overige kosten, en wat uw marge kan zijn bij uw
          verwachte verkoopprijs.
        </p>
        <Link
          href="/voorraad"
          className="inline-block px-5 py-3 rounded-md text-sm"
          style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
        >
          Bekijk de voorraad
        </Link>
      </section>

      {/* Veelgestelde vragen */}
      <section>
        <h2 className="text-2xl mb-6" style={kop}>
          Veelgestelde vragen
        </h2>
        <dl className="space-y-5 max-w-3xl">
          {VRAGEN.map((v) => (
            <div key={v.vraag}>
              <dt className="text-sm" style={{ color: "#F2F3F4", fontWeight: 600 }}>
                {v.vraag}
              </dt>
              <dd className="text-sm mt-1" style={{ color: "#8A929C" }}>
                {v.antwoord}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
