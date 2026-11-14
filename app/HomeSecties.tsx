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

const STAPPEN = [
  {
    titel: "Kies een voertuig",
    tekst: "Bekijk de voorraad en filter op merk, model, brandstof, bouwjaar, prijs en kilometerstand.",
  },
  {
    titel: "Reken de kostprijs uit",
    tekst:
      "Bij elk voertuig ziet u in de kostprijscalculator de totale inkoopkosten en wat uw marge kan zijn.",
  },
  {
    titel: "Breng een bod uit",
    tekst:
      "Wij leggen uw bod voor aan de verkoper. Bij akkoord wordt het voertuig aan u toegewezen en volgt de factuur.",
  },
  {
    titel: "Betaling en levering",
    tekst: "U betaalt vóór het transport. De levering duurt ongeveer 3 tot 4 weken na betaling.",
  },
];

const VRAGEN = [
  {
    vraag: "Voor wie is Caronix bedoeld?",
    antwoord: "Voor autobedrijven. Het aanbod en de calculator zijn uitsluitend bedoeld voor zakelijke kopers.",
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
      {/* Wat wij doen */}
      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl mb-4" style={kop}>
          Auto&apos;s inkopen in de EU voor autobedrijven
        </h2>
        <p className="text-sm leading-relaxed">
          Caronix bemiddelt in de in- en verkoop van personenauto&apos;s binnen de EU. In de voorraad staan
          occasions van particulieren en dealerbedrijven, onder meer uit Denemarken. Per voertuig ziet u
          vooraf wat het u in totaal kost, zodat u weet wat u biedt.
        </p>
        <p className="text-sm leading-relaxed mt-3">
          Zoekt u een bepaald voertuig dat nog niet in de voorraad staat?{" "}
          <Link href="/zoekopdracht" className="underline" style={{ color: "#7FA8D9" }}>
            Dien een zoekopdracht in
          </Link>
          .
        </p>
      </section>

      {/* Zo werkt het */}
      <section className="mb-16">
        <h2 className="text-2xl mb-6" style={kop}>
          Zo werkt inkopen via Caronix
        </h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STAPPEN.map((st, i) => (
            <li
              key={st.titel}
              className="flex gap-3 rounded-lg border p-4"
              style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}
            >
              <span
                className="shrink-0 flex items-center justify-center rounded-full text-xs font-semibold"
                style={{ width: 24, height: 24, backgroundColor: "#2E5A94", color: "#F2F3F4" }}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm" style={{ color: "#F2F3F4", fontWeight: 600 }}>
                  {st.titel}
                </h3>
                <p className="text-xs mt-1" style={{ color: "#8A929C" }}>
                  {st.tekst}
                </p>
              </div>
            </li>
          ))}
        </ol>
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
