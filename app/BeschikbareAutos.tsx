"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

type Auto = {
  id: number;
  brand: string;
  model: string;
  uitvoering: string | null;
  price: number | null;
  btw_type: string | null;
  photo_urls: string[] | null;
};

export default function BeschikbareAutos() {
  const [autos, setAutos] = useState<Auto[]>([]);

  useEffect(() => {
    let actief = true;

    async function laden() {
      const { data } = await supabase
        .from("vehicles")
        .select("id, brand, model, uitvoering, price, btw_type, photo_urls")
        .order("created_at", { ascending: false })
        .limit(3);

      if (actief && data) setAutos(data as Auto[]);
    }

    laden();
    return () => {
      actief = false;
    };
  }, []);

  // Geen auto's of een fout? Dan tonen we dit blok gewoon niet.
  if (autos.length === 0) return null;

  return (
    <div className="mt-14 w-full">
      <p className="text-xs mb-4 tracking-widest" style={{ color: "#6E93C2" }}>
        NU BESCHIKBAAR
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        {autos.map((auto) => (
          <Link
            key={auto.id}
            href={"/dashboard/voertuig/" + auto.id}
            className="block rounded-md overflow-hidden border"
            style={{ backgroundColor: "#0E1013", borderColor: "#1E2126" }}
          >
            <div
              className="h-36 flex items-center justify-center overflow-hidden"
              style={{ background: "linear-gradient(135deg,#12151A,#1C2128)" }}
            >
              {auto.photo_urls && auto.photo_urls.length > 0 ? (
                <img
                  src={auto.photo_urls[0]}
                  alt={auto.brand + " " + auto.model}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs" style={{ color: "#4E555E" }}>
                  Geen foto
                </span>
              )}
            </div>

            <div className="p-3">
              <div className="text-sm" style={{ color: "#F2F3F4" }}>
                {auto.brand} {auto.model}
              </div>
              {auto.uitvoering && (
                <div className="text-xs mt-0.5 truncate" style={{ color: "#8A929C" }}>
                  {auto.uitvoering}
                </div>
              )}
              <div className="text-sm mt-2" style={{ color: "#7FA8D9", fontWeight: 600 }}>
                {auto.price ? "EUR " + Number(auto.price).toLocaleString("nl-NL") : "-"}
                {auto.btw_type && (
                  <span className="text-[10px] ml-2 font-normal" style={{ color: "#8A929C" }}>
                    {auto.btw_type}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
