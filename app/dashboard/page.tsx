import { permanentRedirect } from "next/navigation";

// De voorraad staat voortaan op /voorraad. Oude links naar /dashboard sturen hierheen door.
export const dynamic = "force-dynamic";

export default function DashboardDoorsturen() {
  permanentRedirect("/voorraad");
}
