import Link from "next/link";

export const metadata = {
  title: "Privacybeleid | Caronix",
  description: "Lees hoe Caronix omgaat met persoonsgegevens en cookies.",
};

export default function PrivacybeleidPage() {
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
          Privacybeleid
        </h1>

        <p className="mb-6">
          Caronix hecht waarde aan de bescherming van je persoonsgegevens. In dit privacybeleid
          leggen we uit welke gegevens we verzamelen, waarom, en welke rechten je hebt. Dit
          beleid is voor het laatst bijgewerkt op {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          Wie is verantwoordelijk?
        </h2>
        <p className="mb-6">
          Caronix is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in
          dit privacybeleid. Voor vragen kun je contact opnemen via{" "}
          <a href="mailto:infocaronix@gmail.com" className="underline" style={{ color: "#7FA8D9" }}>
            infocaronix@gmail.com
          </a>
          .
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          Welke gegevens verzamelen wij?
        </h2>
        <p className="mb-3">
          Wij verzamelen alleen gegevens die je zelf actief met ons deelt:
        </p>
        <ul className="list-disc pl-5 mb-6 space-y-1">
          <li>
            Wanneer je contact met ons opneemt via e-mail (bijvoorbeeld via de contactpagina of de
            &quot;Interesse?&quot;-knop bij een voertuig), wordt dit rechtstreeks via jouw eigen
            e-mailprogramma verstuurd. Wij ontvangen dan je e-mailadres, naam (indien vermeld) en de
            inhoud van je bericht. Deze gegevens worden niet apart opgeslagen op onze website of in
            een database, maar komen direct in onze mailbox terecht.
          </li>
          <li>
            Onze website maakt gebruik van functionele cookies die nodig zijn om ingelogde
            beheerders herkend te houden. Deze cookies worden niet gebruikt voor tracking,
            profilering of advertenties.
          </li>
          <li>
            Zoals bij vrijwel elke website worden er door onze hostingpartij (Vercel) technische
            gegevens vastgelegd voor beveiliging en foutopsporing, zoals IP-adres en tijdstip van
            bezoek. Wij gebruiken deze gegevens niet zelf voor marketingdoeleinden.
          </li>
        </ul>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          Cookies
        </h2>
        <p className="mb-6">
          Wij gebruiken op dit moment geen cookies voor tracking, analyse of advertenties. De
          enige cookies die worden geplaatst zijn functioneel en noodzakelijk voor de werking van
          de website (bijvoorbeeld om een inlogsessie te onthouden). Voor dit type cookies is geen
          toestemming vereist onder de Telecommunicatiewet.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          Hoe lang bewaren wij gegevens?
        </h2>
        <p className="mb-6">
          E-mails die je ons stuurt bewaren wij zolang als nodig is om je vraag te beantwoorden en
          eventuele vervolgcommunicatie mogelijk te maken, en niet langer dan noodzakelijk.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          Jouw rechten
        </h2>
        <p className="mb-3">Je hebt het recht om:</p>
        <ul className="list-disc pl-5 mb-6 space-y-1">
          <li>Inzage te vragen in de gegevens die wij van je hebben</li>
          <li>Onjuiste gegevens te laten corrigeren</li>
          <li>Je gegevens te laten verwijderen</li>
          <li>Bezwaar te maken tegen de verwerking van je gegevens</li>
        </ul>
        <p className="mb-6">
          Je kunt hiervoor contact met ons opnemen via{" "}
          <a href="mailto:infocaronix@gmail.com" className="underline" style={{ color: "#7FA8D9" }}>
            infocaronix@gmail.com
          </a>
          . Ook heb je het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens.
        </p>

        <h2 className="text-base mb-2 mt-8" style={{ color: "#F2F3F4", fontWeight: 600 }}>
          Wijzigingen
        </h2>
        <p className="mb-6">
          Wij kunnen dit privacybeleid van tijd tot tijd aanpassen. De meest actuele versie staat
          altijd op deze pagina.
        </p>
      </div>

      <div className="p-6 md:p-8 text-xs text-center" style={{ color: "#4E555E" }}>
        Caronix - B2B-voertuigbemiddeling
      </div>
    </div>
  );
}
