import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { supabase } from "../../lib/supabaseClient";
import ZoekopdrachtForm from "./ZoekopdrachtForm";

export const metadata: Metadata = {
  title: "Zoekopdracht voor autobedrijven | Caronix",
  description:
    "Zoekt u een bepaald voertuig voor uw autobedrijf? Dien een zoekopdracht in bij Caronix: merk, model, bouwjaar, kilometerstand en budget.",
  alternates: { canonical: "/zoekopdracht" },
};

export default async function ZoekopdrachtPagina() {
  // Merken en modellen uit onze eigen voorraad komen er bovenop de standaardlijst bij.
  await connection();
  const { data } = await supabase.from("vehicles").select("brand, model");
  const voorraad = (data ?? []).filter((x) => x.brand && x.model);

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
          Zoekopdracht voor autobedrijven
        </h1>
        <p className="text-sm leading-relaxed mb-2" style={{ color: "#B7BEC7" }}>
          Zoekt u een bepaald voertuig? Laat ons weten wat u zoekt. Wij kijken of wij het voor u kunnen
          vinden binnen de EU en laten u per e-mail weten wat er mogelijk is.
        </p>
        <p className="text-xs mb-8" style={{ color: "#8A929C" }}>
          Alleen voor zakelijke kopers (autobedrijven). Staat uw voertuig misschien al in onze voorraad?{" "}
          <Link href="/voorraad" className="underline" style={{ color: "#7FA8D9" }}>
            Bekijk de voorraad
          </Link>
          .
        </p>

        <ZoekopdrachtForm voorraad={voorraad} />

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
