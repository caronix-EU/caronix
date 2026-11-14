import type { Metadata } from "next";
import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { leesNummer, maakSlug } from "../../../lib/voertuigSlug";
import VoertuigDetailClient from "./VoertuigDetailClient";

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
      "id, voertuignummer, brand, model, uitvoering, btw_type, registration, price, km, fuel, co2, body_type, vin, bpm_indicatie, bpm_peildatum, color, transmission, country, photo_urls"
    )
    .eq("voertuignummer", nummer)
    .maybeSingle();

  return data;
});

// Titel: merk, model, uitvoering en bouwjaar. Is hij te lang, dan vallen de laatste woorden van de uitvoering af.
function maakTitel(auto: {
  brand: string;
  model: string;
  uitvoering: string | null;
  registration: string | null;
}): string {
  const jaar = auto.registration ? new Date(auto.registration).getUTCFullYear() : null;
  const basis = [auto.brand, auto.model, auto.uitvoering].filter(Boolean).join(" ");
  const eind = (jaar ? ` (${jaar})` : "") + " | Caronix";
  const max = 70 - eind.length;
  const woorden = basis.split(" ");
  while (woorden.length > 2 && woorden.join(" ").length > max) woorden.pop();
  return woorden.join(" ") + eind;
}

// Omschrijving: de belangrijkste kenmerken eerst. Kenmerken die niet meer passen, laten we weg,
// zodat de zin nooit midden in een woord eindigt.
function maakOmschrijving(auto: {
  brand: string;
  model: string;
  uitvoering: string | null;
  registration: string | null;
  km: number | null;
  fuel: string | null;
  transmission: string | null;
  country: string | null;
  price: number | null;
}): string {
  const jaar = auto.registration ? new Date(auto.registration).getUTCFullYear() : null;
  const naam = [auto.brand, auto.model, auto.uitvoering].filter(Boolean).join(" ");
  const kenmerken = [
    jaar ? `bouwjaar ${jaar}` : null,
    auto.km ? `${Number(auto.km).toLocaleString("nl-NL")} km` : null,
    auto.price ? `vraagprijs € ${Number(auto.price).toLocaleString("nl-NL")}` : null,
    auto.fuel,
    auto.transmission,
    auto.country ? `herkomst ${auto.country}` : null,
  ].filter(Boolean) as string[];

  const slot = ". Zakelijk aanbod van Caronix.";
  let tekst = naam;
  for (const k of kenmerken) {
    if ((tekst + ", " + k + slot).length > 160) break;
    tekst += ", " + k;
  }
  return tekst + slot;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const auto = await vindAuto(slug);

  if (!auto) {
    return { title: "Voertuig niet gevonden | Caronix", robots: { index: false } };
  }

  const title = maakTitel(auto);
  const description = maakOmschrijving(auto);
  const eersteFoto = auto.photo_urls && auto.photo_urls.length > 0 ? auto.photo_urls[0] : null;

  return {
    title,
    description,
    alternates: { canonical: `/voorraad/${maakSlug(auto.brand, auto.model, auto.voertuignummer)}` },
    openGraph: {
      title,
      description,
      images: eersteFoto ? [{ url: eersteFoto, width: 1200, height: 800 }] : undefined,
    },
  };
}

export default async function VoertuigPagina({ params }: Props) {
  const { slug } = await params;
  const auto = await vindAuto(slug);

  // Bestaat de auto niet (meer)? Echte 404, zodat Google de pagina sneller laat vallen.
  if (!auto) {
    notFound();
  }

  // Klopt het merk/model-deel van de link niet (meer)? Stuur door naar de juiste link.
  const juisteSlug = maakSlug(auto.brand, auto.model, auto.voertuignummer);
  if (decodeURIComponent(slug).toLowerCase() !== juisteSlug) {
    permanentRedirect(`/voorraad/${juisteSlug}`);
  }

  return <VoertuigDetailClient id={String(auto.id)} initialVehicle={auto} />;
}
