import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import VoertuigDetailClient from "./VoertuigDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

async function getVehicle(id: string) {
  const { data } = await supabase
    .from("vehicles")
    .select("brand, model, uitvoering, price, photo_urls")
    .eq("id", id)
    .maybeSingle();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) {
    return {
      title: "Voertuig niet gevonden | Caronix",
      robots: { index: false },
    };
  }

  const title = `${vehicle.brand} ${vehicle.model} | Caronix`;
  const description = `${vehicle.brand} ${vehicle.model}${
    vehicle.uitvoering ? " - " + vehicle.uitvoering : ""
  }${vehicle.price ? " - EUR " + Number(vehicle.price).toLocaleString("nl-NL") : ""} - Bekijk dit voertuig bij Caronix.`;

  const firstPhoto = vehicle.photo_urls && vehicle.photo_urls.length > 0 ? vehicle.photo_urls[0] : null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: firstPhoto ? [{ url: firstPhoto, width: 1200, height: 800 }] : undefined,
    },
  };
}

export default async function VoertuigDetailPage({ params }: Props) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  // Bestaat de auto niet (meer)? Dan geven we een echte 404-status terug,
  // zodat Google de pagina sneller uit de index haalt.
  if (!vehicle) {
    notFound();
  }

  return <VoertuigDetailClient id={id} />;
}
