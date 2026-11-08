import type { Metadata } from "next";
import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import { leesNummer, maakSlug } from "../../../../lib/voertuigSlug";
import CalculatorClient from "./CalculatorClient";

type Props = {
  params: Promise<{ slug: string }>;
};

// Zoekt de auto op voertuignummer (het deel "cx1042" achteraan de link).
// cache() zorgt dat dit per bezoek maar één keer wordt opgehaald.
const vindAuto = cache(async (slug: string) => {
  const nummer = leesNummer(decodeURIComponent(slug));
  if (nummer === null) return null;

  const { data } = await supabase
    .from("vehicles")
    .select(
      "id, voertuignummer, brand, model, uitvoering, price, km, fuel, registration, photo_urls, calc_provisie_pct, calc_transport, calc_kenteken, calc_overig, calc_verkoopprijs, bpm_indicatie, btw_type"
    )
    .eq("voertuignummer", nummer)
    .maybeSingle();

  return data;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const auto = await vindAuto(slug);

  if (!auto) {
    return { title: "Voertuig niet gevonden | Caronix", robots: { index: false } };
  }

  const titel = [auto.brand, auto.model, auto.uitvoering].filter(Boolean).join(" ");
  const title = `Kostprijs berekenen: ${titel} | Caronix`;
  const description = `Bereken wat de ${titel} u in totaal kost (landed cost) en wat u eraan overhoudt. Indicatieve berekening van Caronix.`;
  const eersteFoto = auto.photo_urls && auto.photo_urls.length > 0 ? auto.photo_urls[0] : null;
  const pad = `/voorraad/${maakSlug(auto.brand, auto.model, auto.voertuignummer)}/calculator`;

  return {
    title,
    description,
    alternates: { canonical: pad },
    // De calculator is een gereedschap om te delen, geen pagina om in Google te vinden.
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      images: eersteFoto ? [{ url: eersteFoto, width: 1200, height: 800 }] : undefined,
    },
  };
}

export default async function CalculatorPagina({ params }: Props) {
  const { slug } = await params;
  const auto = await vindAuto(slug);

  if (!auto) {
    notFound();
  }

  // Klopt het merk/model-deel van de link niet (meer)? Stuur door naar de juiste link.
  const juisteSlug = maakSlug(auto.brand, auto.model, auto.voertuignummer);
  if (decodeURIComponent(slug).toLowerCase() !== juisteSlug) {
    permanentRedirect(`/voorraad/${juisteSlug}/calculator`);
  }

  return (
    <CalculatorClient
      auto={{
        voertuignummer: auto.voertuignummer,
        slug: juisteSlug,
        titel: [auto.brand, auto.model, auto.uitvoering].filter(Boolean).join(" "),
        prijs: Number(auto.price) || 0,
        fuel: auto.fuel || null,
        km: auto.km ? Number(auto.km) : null,
        registration: auto.registration || null,
        foto: auto.photo_urls && auto.photo_urls.length > 0 ? auto.photo_urls[0] : null,
        provisie: Number(auto.calc_provisie_pct),
        transport: Number(auto.calc_transport),
        kenteken: Number(auto.calc_kenteken),
        bpmBtw: Number(auto.bpm_indicatie) || 0, // BPM komt uit het veld "Indicatieve BPM bij import"
        overig: Number(auto.calc_overig),
        verkoopprijs: auto.calc_verkoopprijs ? Number(auto.calc_verkoopprijs) : null,
        btwType: auto.btw_type || null,
      }}
    />
  );
}
