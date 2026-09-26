"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

type Vehicle = {
  id: number;
  brand: string;
  model: string;
  uitvoering: string;
  btw_type: string;
  registration: string;
  price: number;
  km: number;
  fuel: string;
  color: string;
  transmission: string;
  country: string;
  photo_urls: string[] | null;
};

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

export default function VoertuigDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [session, setSession] = useState<Session | null>(null);
  const isLoggedIn = !!session;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  useEffect(() => {
    async function fetchVehicle() {
      const { data, error } = await supabase.from("vehicles").select("*").eq("id", id).single();
      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setVehicle(data as Vehicle);
      setLoading(false);
    }
    if (id) fetchVehicle();
  }, [id]);

  async function handleDelete() {
    if (!vehicle) return;
    const confirmed = window.confirm(
      "Weet je zeker dat je dit voertuig wilt verwijderen? Dit kan niet ongedaan gemaakt worden."
    );
    if (!confirmed) return;

    setDeleting(true);
    const { error } = await supabase.from("vehicles").delete().eq("id", vehicle.id);
    if (error) {
      alert("Verwijderen mislukt: " + error.message);
      setDeleting(false);
    } else {
      router.push("/dashboard");
    }
  }

  const photos = vehicle?.photo_urls || [];

  function nextPhoto() {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  }
  function prevPhoto() {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: "#08090B" }}>
        <p style={{ color: "#7A828C" }}>Laden...</p>
      </div>
    );
  }

  if (notFound || !vehicle) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#08090B" }}>
        <p style={{ color: "#7A828C" }}>Dit voertuig kon niet gevonden worden.</p>
        <Link href="/dashboard" style={{ color: "#7FA8D9" }}>← Terug naar aanbod</Link>
      </div>
    );
  }

  const registrationFormatted = vehicle.registration
    ? new Date(vehicle.registration).toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "-";

  const mailSubject = `Interesse in ${vehicle.brand} ${vehicle.model} (${
    vehicle.registration ? new Date(vehicle.registration).getFullYear() : ""
  })`;
  const mailtoLink = `mailto:infocaronix@gmail.com?subject=${encodeURIComponent(mailSubject)}`;

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#08090B" }}>
      {/* Navbar */}
      <div
        className="flex items-center justify-between px-6 md:px-10 py-4 border-b"
        style={{ borderColor: "#1E2126" }}
      >
        <Link
          href="/"
          className="text-lg tracking-tight"
          style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
        >
          CARONIX
        </Link>
        <Link href="/dashboard" className="text-sm flex items-center gap-1" style={{ color: "#8A929C" }}>
          <ArrowLeftIcon /> Terug naar aanbod
        </Link>
      </div>

      <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto">
        {isLoggedIn && (
          <div className="flex gap-2 mb-4">
            <Link
              href={"/dashboard/bewerken/" + vehicle.id}
              className="px-4 py-1.5 text-xs rounded-full"
              style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
            >
              Bewerken
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-1.5 text-xs rounded-full border"
              style={{
                borderColor: "#5A2E2E",
                color: deleting ? "#6E7680" : "#D98787",
                backgroundColor: "transparent",
              }}
            >
              {deleting ? "Bezig..." : "Verwijderen"}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fotogalerij */}
          <div>
            <div
              className="relative h-80 md:h-96 rounded-md overflow-hidden flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#12151A,#1C2128)" }}
            >
              {photos.length > 0 ? (
                <img
                  src={photos[currentPhoto]}
                  alt={vehicle.brand + " " + vehicle.model}
                  className="w-full h-full object-contain cursor-zoom-in"
                  onClick={() => setLightboxOpen(true)}
                />
              ) : (
                <span className="text-xs" style={{ color: "#4E555E" }}>
                  Geen foto
                </span>
              )}

              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(8,9,11,0.7)", color: "#F2F3F4" }}
                    aria-label="Vorige foto"
                  >
                    <ArrowLeftIcon />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(8,9,11,0.7)", color: "#F2F3F4" }}
                    aria-label="Volgende foto"
                  >
                    <ArrowRightIcon />
                  </button>
                  <div
                    className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: "rgba(8,9,11,0.7)", color: "#F2F3F4" }}
                  >
                    {currentPhoto + 1}/{photos.length}
                  </div>
                </>
              )}
            </div>

            {photos.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {photos.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPhoto(i)}
                    className="shrink-0 w-16 h-16 rounded-sm overflow-hidden border"
                    style={{
                      borderColor: i === currentPhoto ? "#7FA8D9" : "#2A2E34",
                    }}
                  >
                    <img src={src} alt={`foto ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specificaties */}
          <div>
            <div className="text-sm" style={{ color: "#8A929C" }}>
              {vehicle.brand}
            </div>
            <h1 className="text-2xl mb-1" style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              {vehicle.model}
            </h1>
            {vehicle.uitvoering && (
              <div className="text-sm mb-4" style={{ color: "#B7BEC7" }}>
                {vehicle.uitvoering}
              </div>
            )}

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-2xl" style={{ color: "#7FA8D9", fontWeight: 700 }}>
                {vehicle.price ? "EUR " + Number(vehicle.price).toLocaleString("nl-NL") : "-"}
              </span>
              {vehicle.btw_type && (
                <span className="text-xs" style={{ color: "#8A929C" }}>
                  {vehicle.btw_type}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <div className="text-xs mb-1 flex items-center gap-1" style={{ color: "#8A929C" }}>
                  <CalendarIcon /> Registratiedatum
                </div>
                <div style={{ color: "#F2F3F4" }}>{registrationFormatted}</div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: "#8A929C" }}>
                  Tellerstand
                </div>
                <div style={{ color: "#F2F3F4" }}>
                  {vehicle.km ? Number(vehicle.km).toLocaleString("nl-NL") + " km" : "-"}
                </div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: "#8A929C" }}>
                  Brandstof
                </div>
                <div style={{ color: "#F2F3F4" }}>{vehicle.fuel || "-"}</div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: "#8A929C" }}>
                  Transmissie
                </div>
                <div style={{ color: "#F2F3F4" }}>{vehicle.transmission || "-"}</div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: "#8A929C" }}>
                  Kleur
                </div>
                <div style={{ color: "#F2F3F4" }}>{vehicle.color || "-"}</div>
              </div>
              <div>
                <div className="text-xs mb-1 flex items-center gap-1" style={{ color: "#8A929C" }}>
                  <PinIcon /> Land van herkomst
                </div>
                <div style={{ color: "#F2F3F4" }}>{vehicle.country || "-"}</div>
              </div>
            </div>

            <a
              href={mailtoLink}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-sm text-sm"
              style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
            >
              <MailIcon />
              Interesse? Neem contact op
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && photos.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(8,9,11,0.92)" }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: "rgba(242,243,244,0.1)", color: "#F2F3F4" }}
            aria-label="Sluiten"
          >
            ×
          </button>

          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(242,243,244,0.1)", color: "#F2F3F4" }}
              aria-label="Vorige foto"
            >
              <ArrowLeftIcon />
            </button>
          )}

          <img
            src={photos[currentPhoto]}
            alt="Uitvergrote foto"
            className="max-w-full max-h-full object-contain rounded-md"
            onClick={(e) => e.stopPropagation()}
          />

          {photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(242,243,244,0.1)", color: "#F2F3F4" }}
              aria-label="Volgende foto"
            >
              <ArrowRightIcon />
            </button>
          )}

          {photos.length > 1 && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "rgba(242,243,244,0.1)", color: "#F2F3F4" }}
            >
              {currentPhoto + 1} / {photos.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
