import Link from "next/link";

export const metadata = {
  title: "Algemene voorwaarden | Caronix",
  description: "Lees de gebruiksvoorwaarden van de Caronix-website.",
};

export default function VoorwaardenPage() {
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

      <div className="px-6 md:px-10 py-12 max-w-2xl mx-auto text-sm leading-relaxed" style={{ color: "#B7BEC7" }}>
        <h1
          className="text-2xl mb-6"
          style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
        >
          Algemene voorwaarden
        </h1>

        <p className="mb-6">
          Deze gebruiksvoorwaarden zijn van toepassing op het gebruik van de website van Caronix
          (caronix.nl). Door deze website te bezoeken en te gebruiken, ga je akkoord met
          onderstaande voorwaarden. Deze voorwaarden zijn voor het laatst bijgewerkt op{" "}
          {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          1. Algemeen
        </h2>
        <p className="mb-6">
          Caronix bemiddelt voor autobedrijven in de in- en verkoop van personenauto&apos;s binnen
          de EU. Deze website is uitsluitend bedoeld voor zakelijk gebruik (B2B) en biedt een
          overzicht van het actuele voertuigaanbod. De website is informatief van aard en vormt op
          zichzelf geen koopovereenkomst.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          2. Voertuiginformatie
        </h2>
        <p className="mb-6">
          Wij streven ernaar om de informatie over voertuigen (specificaties, foto&apos;s, prijs,
          kilometerstand, bouwjaar, CO2-uitstoot en overige gegevens) zo nauwkeurig mogelijk weer
          te geven. Deze gegevens zijn echter gebaseerd op informatie die door derden is
          aangeleverd en kunnen onjuistheden bevatten. Aan de op deze website vermelde informatie
          kunnen geen rechten worden ontleend. Controleer voorafgaand aan een transactie altijd
          zelf de actuele staat, beschikbaarheid en specificaties van een voertuig.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          3. Prijzen
        </h2>
        <p className="mb-6">
          Alle vermelde prijzen zijn, tenzij anders aangegeven, exclusief BPM en overige
          importkosten. Prijzen kunnen zonder voorafgaande aankondiging worden gewijzigd. Aan
          kennelijke fouten of vergissingen in de prijsvermelding kunnen geen rechten worden
          ontleend.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          4. Totstandkoming van een overeenkomst
        </h2>
        <p className="mb-6">
          Een overeenkomst tot koop of verkoop van een voertuig komt niet tot stand via deze
          website, maar uitsluitend na rechtstreeks contact en nadere afspraken tussen Caronix en
          de betreffende partij, bijvoorbeeld via e-mail of WhatsApp.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          5. Aansprakelijkheid
        </h2>
        <p className="mb-6">
          Caronix is niet aansprakelijk voor schade die voortvloeit uit onjuistheden of
          onvolledigheden in de op deze website vermelde informatie, noch voor schade als gevolg
          van het (tijdelijk) niet beschikbaar zijn van de website. Deze website bevat links naar
          diensten van derden (zoals WhatsApp en e-mail); Caronix is niet verantwoordelijk voor de
          inhoud of werking van deze diensten van derden.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          6. Intellectueel eigendom
        </h2>
        <p className="mb-6">
          Alle content op deze website, waaronder teksten, het Caronix-logo en de vormgeving, is
          eigendom van Caronix of de betreffende rechthebbende, tenzij anders vermeld. Zonder
          voorafgaande schriftelijke toestemming is het niet toegestaan deze content te
          verveelvoudigen of openbaar te maken, anders dan voor persoonlijk, niet-commercieel
          gebruik.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          7. Toepasselijk recht
        </h2>
        <p className="mb-6">
          Op deze gebruiksvoorwaarden is Nederlands recht van toepassing.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          8. Wijzigingen
        </h2>
        <p className="mb-6">
          Caronix behoudt zich het recht voor deze voorwaarden op elk moment te wijzigen. De meest
          actuele versie staat altijd op deze pagina.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          9. Contact
        </h2>
        <p className="mb-6">
          Vragen over deze voorwaarden kun je sturen naar{" "}
          <a href="mailto:infocaronix@gmail.com" className="underline" style={{ color: "#7FA8D9" }}>
            infocaronix@gmail.com
          </a>
          .
        </p>
      </div>

      <div className="p-6 md:p-8 text-xs text-center" style={{ color: "#4E555E" }}>
        Caronix - B2B-voertuigbemiddeling
      </div>
    </div>
  );
}
