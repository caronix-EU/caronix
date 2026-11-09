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
    .select("id, voertuignummer, brand, model, uitvoering, price, photo_urls")
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

  const title = `${auto.brand} ${auto.model} | Caronix`;
  const description = `${auto.brand} ${auto.model}${
    auto.uitvoering ? " - " + auto.uitvoering : ""
  }${auto.price ? " - € " + Number(auto.price).toLocaleString("nl-NL") : ""} - Bekijk dit voertuig bij Caronix.`;
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

  return <VoertuigDetailClient id={String(auto.id)} />;
}
