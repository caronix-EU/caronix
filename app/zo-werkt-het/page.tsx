import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zo werkt inkopen via Caronix | Caronix",
  description:
    "Zo werkt inkopen van Deense auto's via Caronix: u koopt rechtstreeks van de verkoper, Caronix bemiddelt en zorgt dat de auto bij u wordt afgeleverd. Wie wat regelt en wat u betaalt.",
  alternates: { canonical: "/zo-werkt-het" },
};

const kop = { color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 } as const;
const kaart = { backgroundColor: "#0E1013", borderColor: "#1E2126" } as const;

const IN_HET_KORT: [string, string][] = [
  ["Voor wie", "Autobedrijven. Alleen zakelijk."],
  ["Herkomst", "Denemarken"],
  ["Aanbod", "U ontvangt van ons een lijst met beschikbare Deense voertuigen."],
  ["Koop", "Rechtstreeks van de Deense verkoper. Caronix bemiddelt."],
  ["Wat Caronix factureert", "Provisie en transport."],
  ["Betaling", "Alles vóór het transport begint: de auto aan de verkoper, provisie en transport aan Caronix."],
  ["Export in Denemarken", "Wordt daar geregeld. U hoeft er niets voor te doen."],
  ["Aflevering", "Bij u aan huis, ongeveer 3 tot 4 weken na betaling. Het transport is verzekerd."],
  ["Kenteken", "Het Nederlandse kenteken regelt u zelf bij de RDW."],
  ["Controle", "Caronix controleert de voertuigen niet. Alle gegevens komen van de verkoper."],
];

const STAPPEN = [
  {
    titel: "U ontvangt het aanbod",
    tekst:
      "Wij sturen u een lijst met beschikbare Deense voertuigen. Per voertuig ziet u onder meer merk, model, uitvoering, eerste registratie, kilometerstand, brandstof, kleur en chassisnummer, met een link naar foto's.",
  },
  {
    titel: "U kiest en rekent",
    tekst:
      "Kies een voertuig. Bij de voertuigen op deze site ziet u in de kostprijscalculator vooraf wat de auto u in totaal kost en wat uw marge kan zijn.",
  },
  {
    titel: "U brengt een bod uit",
    tekst:
      "Wij leggen uw bod voor aan de verkoper. De reactietijd hangt af van de verkoper; wij laten het u weten zodra wij antwoord hebben.",
  },
  {
    titel: "De verkoper gaat akkoord",
    tekst:
      "Dan is uw bod bindend en wordt het voertuig aan u toegewezen. Wijst de verkoper af, dan hoort u dat van ons. Doet hij een tegenbod, dan leggen wij dat aan u voor en is het pas bindend als u akkoord gaat.",
  },
  {
    titel: "U betaalt vóór het transport",
    tekst:
      "U betaalt de auto aan de Deense verkoper. Caronix factureert alleen provisie en transport. Alles is betaald voordat het transport begint.",
  },
  {
    titel: "Export en transport",
    tekst:
      "De afmelding en de export worden in Denemarken geregeld. Daar hoeft u niets voor te doen. Wij zorgen dat de auto bij u wordt afgeleverd. Het transport is verzekerd; schade onderweg wordt via de vervoerder afgehandeld.",
  },
  {
    titel: "Aflevering, CMR en kentekenpapieren",
    tekst:
      "Bij aflevering tekent u de CMR. Stuur de getekende CMR na ontvangst naar ons terug: die is nodig om de export aan te tonen. Zodra wij die ontvangen hebben, sturen wij u het volledige Deense kentekenbewijs (beide delen) met track and trace.",
  },
  {
    titel: "U regelt het kenteken",
    tekst:
      "Het Nederlandse kenteken regelt u zelf bij de RDW, inclusief de bijbehorende BPM. Voor de RDW-keuring maakt u zelf een afspraak.",
  },
];

const WEL = [
  "Bemiddelen tussen u en de Deense verkoper",
  "Uw bod aan de verkoper voorleggen",
  "Het transport naar uw adres regelen, verzekerd",
  "De kentekenpapieren naar u opsturen nadat wij de getekende CMR hebben ontvangen",
  "De kosten vooraf zichtbaar maken in de kostprijscalculator",
];

const NIET = [
  "De voertuigen controleren of inspecteren",
  "Uitspraken doen over kilometerstand, schade of onderhoud: die gegevens komen van de verkoper",
  "Een keuringsrapport of COC-document leveren",
  "Het Nederlandse kenteken voor u regelen",
];

const VRAGEN = [
  {
    vraag: "Voor wie is Caronix bedoeld?",
    antwoord: "Voor autobedrijven. Het aanbod en de calculator zijn uitsluitend bedoeld voor zakelijke kopers.",
  },
  {
    vraag: "Van wie koop ik de auto?",
    antwoord: "Rechtstreeks van de Deense verkoper. Caronix bemiddelt en is geen partij bij de koop.",
  },
  {
    vraag: "Wat factureert Caronix?",
    antwoord: "Alleen provisie en transport. De auto betaalt u aan de Deense verkoper.",
  },
  {
    vraag: "Wanneer betaal ik?",
    antwoord: "Voordat het transport begint. Dat geldt voor de auto, de provisie en het transport.",
  },
  {
    vraag: "Moet ik zelf iets regelen in Denemarken?",
    antwoord: "Nee. De afmelding en de export worden in Denemarken geregeld.",
  },
  {
    vraag: "Waarom moet ik de CMR terugsturen?",
    antwoord:
      "De getekende CMR toont aan dat de auto is uitgevoerd. Pas nadat wij die hebben ontvangen, sturen wij de kentekenpapieren naar u op.",
  },
  {
    vraag: "Welke papieren ontvang ik?",
    antwoord:
      "Het volledige Deense kentekenbewijs (beide delen), met track and trace. Een COC en een keuringsrapport worden niet meegeleverd.",
  },
  {
    vraag: "Wordt de auto door Caronix gecontroleerd?",
    antwoord:
      "Nee. Caronix controleert de voertuigen niet. Alle gegevens, zoals de kilometerstand, komen van de verkoper.",
  },
  {
    vraag: "Is het transport verzekerd?",
    antwoord: "Ja. Schade onderweg wordt via de vervoerder afgehandeld.",
  },
  {
    vraag: "Hoe lang duurt het?",
    antwoord:
      "De aflevering duurt ongeveer 3 tot 4 weken na betaling. Het Nederlandse kenteken regelt u daarna zelf.",
  },
];

export default function ZoWerktHetPagina() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#08090B" }}>
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

      <div className="px-4 md:px-10 py-10 max-w-3xl mx-auto" style={{ color: "#B7BEC7" }}>
        <h1 className="text-3xl mb-4" style={kop}>
          Zo werkt inkopen via Caronix
        </h1>
        <p className="text-sm leading-relaxed mb-10">
          Caronix bemiddelt voor autobedrijven in de inkoop van personenauto&apos;s uit Denemarken. U kiest een
          voertuig, wij zorgen dat het bij u wordt afgeleverd. Op deze pagina staat precies wie wat regelt, wat u
          betaalt en wat u niet van ons mag verwachten.
        </p>

        {/* In het kort */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4" style={kop}>
            In het kort
          </h2>
          <div className="rounded-lg border overflow-hidden" style={kaart}>
            <dl>
              {IN_HET_KORT.map(([k, v], i) => (
                <div
                  key={k}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-4 py-3 text-sm"
                  style={{ borderTop: i === 0 ? undefined : "1px solid #1E2126" }}
                >
                  <dt style={{ color: "#8A929C" }}>{k}</dt>
                  <dd className="sm:col-span-2" style={{ color: "#F2F3F4" }}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Stappen */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4" style={kop}>
            De stappen
          </h2>
          <ol className="space-y-3">
            {STAPPEN.map((st, i) => (
              <li key={st.titel} className="flex gap-3 rounded-lg border p-4" style={kaart}>
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
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "#8A929C" }}>
                    {st.tekst}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Wie krijgt wat */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4" style={kop}>
            Wat u betaalt en aan wie
          </h2>
          <div className="rounded-lg border overflow-hidden text-sm" style={kaart}>
            {[
              ["Aan de Deense verkoper", "De auto"],
              ["Aan Caronix", "Provisie en transport, op een factuur van Caronix"],
              ["In Nederland, zelf te regelen", "Kenteken (RDW en kentekenplaten) en de BPM"],
            ].map(([a, b], i) => (
              <div
                key={a}
                className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 px-4 py-3"
                style={{ borderTop: i === 0 ? undefined : "1px solid #1E2126" }}
              >
                <div style={{ color: "#7FA8D9", fontWeight: 600 }}>{a}</div>
                <div className="sm:col-span-2" style={{ color: "#F2F3F4" }}>
                  {b}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ color: "#8A929C" }}>
            De bedragen per voertuig ziet u vooraf in de kostprijscalculator.
          </p>
        </section>

        {/* Wel en niet */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4" style={kop}>
            Wat wij doen en wat niet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4" style={kaart}>
              <h3 className="text-sm mb-3" style={{ color: "#F2F3F4", fontWeight: 600 }}>
                Dit doen wij
              </h3>
              <ul className="space-y-2 text-xs leading-relaxed" style={{ color: "#B7BEC7" }}>
                {WEL.map((x) => (
                  <li key={x}>+ {x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border p-4" style={kaart}>
              <h3 className="text-sm mb-3" style={{ color: "#F2F3F4", fontWeight: 600 }}>
                Dit doen wij niet
              </h3>
              <ul className="space-y-2 text-xs leading-relaxed" style={{ color: "#B7BEC7" }}>
                {NIET.map((x) => (
                  <li key={x}>− {x}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Papieren en kenteken */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4" style={kop}>
            Papieren en kenteken
          </h2>
          <p className="text-sm leading-relaxed mb-3">
            Voor een Nederlands kenteken vraagt de RDW onder meer het volledige originele buitenlandse
            kentekenbewijs. Dat ontvangt u van ons. Een COC wordt niet meegeleverd; volgens de RDW hoeft u dat
            niet verplicht mee te brengen. De eisen kunnen veranderen, dus controleer altijd de actuele eisen op{" "}
            <a
              href="https://www.rdw.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "#7FA8D9" }}
            >
              rdw.nl
            </a>
            .
          </p>
        </section>

        {/* Waarom Denemarken */}
        <section className="mb-12">
          <h2 className="text-2xl mb-4" style={kop}>
            Waarom Denemarken?
          </h2>
          <p className="text-sm leading-relaxed">
            Denemarken kent een hoge registratiebelasting op auto&apos;s. Wordt een auto uitgevoerd, dan kan de
            verkoper een deel daarvan terugkrijgen, de zogenoemde exportteruggave. Dat is een van de redenen waarom
            Deense auto&apos;s voor export interessant kunnen zijn. Caronix doet geen uitspraken over prijsvoordeel:
            wat een auto u kost, ziet u zelf in de kostprijscalculator.
          </p>
        </section>

        {/* Veelgestelde vragen */}
        <section className="mb-12">
          <h2 className="text-2xl mb-6" style={kop}>
            Veelgestelde vragen
          </h2>
          <dl className="space-y-5">
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

        {/* Vervolgstap */}
        <section
          className="rounded-lg border p-6 mb-8"
          style={kaart}
        >
          <h2 className="text-xl mb-3" style={kop}>
            Aan de slag
          </h2>
          <p className="text-sm mb-4">Bekijk het aanbod, of laat ons weten welk voertuig u zoekt.</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/voorraad"
              className="px-5 py-3 rounded-md text-sm"
              style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
            >
              Bekijk de voorraad
            </Link>
            <Link
              href="/zoekopdracht"
              className="px-5 py-3 rounded-md text-sm border"
              style={{ borderColor: "#2E5A94", color: "#7FA8D9" }}
            >
              Dien een zoekopdracht in
            </Link>
          </div>
        </section>

        <div
          className="flex gap-4 text-xs mt-8 pt-4 border-t"
          style={{ borderColor: "#1E2126", color: "#8A929C" }}
        >
          <Link href="/voorwaarden">Voorwaarden</Link>
          <Link href="/privacybeleid">Privacybeleid</Link>
        </div>
      </div>
    </div>
  );
}
