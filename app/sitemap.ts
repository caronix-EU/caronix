import type { MetadataRoute } from "next";
import { supabase } from "../lib/supabaseClient";
import { maakSlug } from "../lib/voertuigSlug";

const BASE_URL = "https://www.caronix.nl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: vehicles } = await supabase.from("vehicles").select("brand, model, voertuignummer, created_at");

  const vehiclePages: MetadataRoute.Sitemap = (vehicles ?? []).map((v) => ({
    url: `${BASE_URL}/voorraad/${maakSlug(v.brand, v.model, v.voertuignummer)}`,
    lastModified: v.created_at ? new Date(v.created_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/voorraad`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/privacybeleid`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/voorwaarden`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    ...vehiclePages,
  ];
}
