import { notFound, permanentRedirect } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";
import { maakSlug } from "../../../../lib/voertuigSlug";

// Oude links zoals /dashboard/voertuig/18 sturen door naar de nieuwe leesbare link.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OudeVoertuigLink({ params }: Props) {
  const { id } = await params;

  const { data } = await supabase
    .from("vehicles")
    .select("brand, model, voertuignummer")
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  permanentRedirect(`/voorraad/${maakSlug(data.brand, data.model, data.voertuignummer)}`);
}
