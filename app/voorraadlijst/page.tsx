import type { Metadata } from "next";
import Link from "next/link";
import VoorraadlijstForm from "./VoorraadlijstForm";

export const metadata: Metadata = {
  title: "Voorraadlijst voor autobedrijven | Caronix",
  description:
    "Schrijf u in voor de voorraadlijst van Caronix met beschikbare Deense voertuigen. Alleen voor autobedrijven.",
  alternates: { canonical: "/voorraadlijst" },
};

export default function VoorraadlijstPagina() {
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

      <div className="px-4 md:px-10 py-10 max-w-2xl mx-auto">
        <h1
          className="text-2xl mb-3"
          style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
        >
          Voorraadlijst voor autobedrijven
        </h1>
        <p className="text-sm leading-relaxed mb-2" style={{ color: "#B7BEC7" }}>
          Mis geen voertuig: schrijf u in voor onze voorraadlijst met beschikbare Deense voertuigen. U ontvangt de
          lijst per e-mail.
        </p>
        <p className="text-xs mb-8" style={{ color: "#8A929C" }}>
          Alleen voor zakelijke kopers (autobedrijven). U kunt zich op elk moment afmelden door een e-mail te
          sturen aan info@caronix.nl. Wij gebruiken uw gegevens alleen om u de voorraadlijst te sturen. Lees ons{" "}
          <Link href="/privacybeleid" className="underline" style={{ color: "#7FA8D9" }}>
            privacybeleid
          </Link>
          .
        </p>

        <VoorraadlijstForm />

        <div
          className="flex gap-4 text-xs mt-12 pt-4 border-t"
          style={{ borderColor: "#1E2126", color: "#8A929C" }}
        >
          <Link href="/voorwaarden">Voorwaarden</Link>
          <Link href="/privacybeleid">Privacybeleid</Link>
        </div>
      </div>
    </div>
  );
}
