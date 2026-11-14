import type { Metadata } from "next";
import { connection } from "next/server";
import { supabase } from "../lib/supabaseClient";
import HomeClient from "./HomeClient";
import HomeSecties from "./HomeSecties";

export const metadata: Metadata = {
  description:
    "Caronix is een auto groothandel voor autobedrijven. Bekijk het aanbod occasions uit de EU, bereken de kostprijs en breng een bod uit.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  // Altijd vers ophalen, zodat nieuwe auto's meteen op de homepage staan.
  await connection();

  const { data } = await supabase
    .from("vehicles")
    .select("voertuignummer, brand, model, uitvoering, price, km, registration, photo_urls")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <HomeClient>
      <HomeSecties nieuwste={data ?? []} />
    </HomeClient>
  );
}
