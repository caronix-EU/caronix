import type { Metadata } from "next";
import { supabase } from "../../lib/supabaseClient";
import DashboardClient from "./DashboardClient";

// Zorgt dat de voorraad bij elk bezoek vers wordt opgehaald (geen verouderde cache)
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { count } = await supabase.from("vehicles").select("*", { count: "exact", head: true });

  const title = "Voorraad | Caronix";
  const description = `Bekijk het actuele aanbod van Caronix${
    count ? ` met ${count} occasions` : ""
  }. B2B autohandel en EU sourcing van personenauto's.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function DashboardPage() {
  const { data } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });

  return <DashboardClient initialVehicles={data ?? []} />;
}
