"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";
import { supabase } from "../../../../lib/supabaseClient";
import { CARONIX_LOGO_BASE64 } from "../../../../lib/caronixLogo";
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
function WhatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.42a9.87 9.87 0 0 0 4.62 1.17h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.11c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.66-.6-2.92-1.26-4.83-4.18-4.98-4.38-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36l.56.01c.18.01.42-.07.65.5.24.58.82 2.01.89 2.16.07.15.11.32.02.52-.09.2-.13.32-.26.49-.13.17-.28.38-.4.51-.13.13-.27.28-.11.55.15.27.68 1.12 1.46 1.81 1.01.9 1.86 1.18 2.13 1.31.27.13.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.22.6-.13.24.09 1.53.72 1.79.85.27.13.44.2.51.31.07.11.07.64-.17 1.32z" />
    </svg>
  );
}
function PdfIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

export default function VoertuigDetailClient({ id }: { id: string }) {
  const router = useRouter();

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

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const whatsappMessage = `Bekijk deze ${vehicle.brand} ${vehicle.model} bij Caronix: ${pageUrl}`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  // Zet een afbeeldings-URL om naar een genormaliseerde JPEG-dataURL via canvas.
  // Dit fixt kwaliteitsproblemen (verkeerd formaat, scheve verhoudingen) en geeft
  // de echte beeldverhouding terug, zodat de foto nooit vervormd in de PDF komt.
  // Faalt stil (bijv. door CORS) — de PDF wordt dan simpelweg zonder foto gegenereerd.
  async function loadImageForPdf(
    url: string
  ): Promise<{ dataUrl: string; width: number; height: number } | null> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const img = document.createElement("img");
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("afbeelding kon niet laden"));
        img.src = objectUrl;
      });

      const maxWidth = 1400; // groot genoeg voor scherpe print, niet nodeloos zwaar
      const scale = Math.min(1, maxWidth / img.naturalWidth);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      URL.revokeObjectURL(objectUrl);
      return {
        dataUrl: canvas.toDataURL("image/jpeg", 0.92),
        width: canvas.width,
        height: canvas.height,
      };
    } catch {
      return null;
    }
  }

  async function handleDownloadPdf() {
    if (!vehicle) return;

    // Caronix-huisstijlkleuren (RGB)
    const blueDark: [number, number, number] = [46, 90, 148]; // #2E5A94
    const blueLight: [number, number, number] = [127, 168, 217]; // #7FA8D9
    const textDark: [number, number, number] = [25, 25, 25];
    const textGrey: [number, number, number] = [120, 120, 120];
    const lineGrey: [number, number, number] = [225, 225, 225];

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 14;

    // Kop: logo linksboven
    const logoWidth = 55;
    const logoHeight = logoWidth * (300 / 900); // beeldverhouding van het logo
    try {
      doc.addImage(CARONIX_LOGO_BASE64, "JPEG", margin, y, logoWidth, logoHeight);
    } catch {
      // val terug op tekst als logo onverhoopt niet laadt
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(...textDark);
      doc.text("CARONIX", margin, y + 8);
    }

    // Dunne blauwe streep rechtsboven als accent (i.p.v. een zwart/gekleurd vlak)
    doc.setDrawColor(...blueDark);
    doc.setLineWidth(1.2);
    doc.line(pageWidth - margin - 40, y + 4, pageWidth - margin, y + 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...textGrey);
    doc.text("B2B CARTRADING & EU SOURCING", pageWidth - margin, y + 10, { align: "right" });

    y += logoHeight + 8;
    doc.setDrawColor(...lineGrey);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Hoofdfoto (iets kleiner dan voorheen, zodat er ruimte overblijft voor miniaturen)
    if (photos.length > 0) {
      const image = await loadImageForPdf(photos[0]);
      if (image) {
        try {
          const maxImgWidth = pageWidth - margin * 2;
          const maxImgHeight = 72;
          const aspectRatio = image.width / image.height;

          let imgWidth = maxImgWidth;
          let imgHeight = imgWidth / aspectRatio;
          if (imgHeight > maxImgHeight) {
            imgHeight = maxImgHeight;
            imgWidth = imgHeight * aspectRatio;
          }
          const imgX = margin + (maxImgWidth - imgWidth) / 2;

          doc.addImage(image.dataUrl, "JPEG", imgX, y, imgWidth, imgHeight);
          y += imgHeight + 6;
        } catch {
          // afbeelding kon niet worden toegevoegd, PDF gaat door zonder foto
        }
      }
    }

    // Miniaturenrij: toont tot 4 overige foto's naast elkaar onder de hoofdfoto
    const remainingPhotos = photos.slice(1, 5); // foto 2 t/m 5
    if (remainingPhotos.length > 0) {
      const thumbHeight = 24;
      const gap = 4;
      const totalWidth = pageWidth - margin * 2;
      const slotWidth = (totalWidth - gap * (remainingPhotos.length - 1)) / remainingPhotos.length;

      for (let i = 0; i < remainingPhotos.length; i++) {
        const slotX = margin + i * (slotWidth + gap);

        // Lichte kaderlijn per vakje, ook zichtbaar als de foto zelf niet laadt
        doc.setDrawColor(...lineGrey);
        doc.setLineWidth(0.3);
        doc.rect(slotX, y, slotWidth, thumbHeight);

        const thumb = await loadImageForPdf(remainingPhotos[i]);
        if (thumb) {
          const thumbAspect = thumb.width / thumb.height;
          let tw = slotWidth;
          let th = tw / thumbAspect;
          if (th > thumbHeight) {
            th = thumbHeight;
            tw = th * thumbAspect;
          }
          const tx = slotX + (slotWidth - tw) / 2;
          const ty = y + (thumbHeight - th) / 2;
          try {
            doc.addImage(thumb.dataUrl, "JPEG", tx, ty, tw, th);
          } catch {
            // deze miniatuur overslaan, kader blijft zichtbaar
          }
        }
      }

      // "+X meer" label als er meer dan 5 foto's in totaal zijn
      const extraCount = photos.length - 1 - remainingPhotos.length;
      if (extraCount > 0) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...textGrey);
        doc.text(`+${extraCount} meer op aanvraag`, pageWidth - margin, y + thumbHeight + 5, {
          align: "right",
        });
      }

      y += thumbHeight + 10;
    } else {
      y += 4;
    }

    // Titel + prijs op één regel
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(...textDark);
    doc.text(`${vehicle.brand} ${vehicle.model}`.toUpperCase(), margin, y);

    doc.setFontSize(17);
    doc.setTextColor(...blueDark);
    const priceText = vehicle.price ? "EUR " + Number(vehicle.price).toLocaleString("nl-NL") : "-";
    doc.text(priceText, pageWidth - margin, y, { align: "right" });
    y += 6;

    // Subtitel (uitvoering) + BTW-status
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...textGrey);
    const subtitleParts = [vehicle.uitvoering, vehicle.fuel, vehicle.transmission].filter(Boolean);
    doc.text(subtitleParts.join(" | ") || "-", margin, y);

    if (vehicle.btw_type) {
      doc.text(vehicle.btw_type, pageWidth - margin, y, { align: "right" });
    }
    y += 12;

    // Specificatie-grid (dunne lijn i.p.v. gevuld vlak = printvriendelijker)
    doc.setDrawColor(...lineGrey);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 9;

    const specs: [string, string][] = [
      ["Registratiedatum", registrationFormatted],
      ["Tellerstand", vehicle.km ? Number(vehicle.km).toLocaleString("nl-NL") + " km" : "-"],
      ["Brandstof", vehicle.fuel || "-"],
      ["Transmissie", vehicle.transmission || "-"],
      ["Kleur", vehicle.color || "-"],
      ["Land van herkomst", vehicle.country || "-"],
    ];

    const colWidth = (pageWidth - margin * 2) / 3;
    specs.forEach(([label, value], i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = margin + col * colWidth;
      const rowY = y + row * 16;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...blueLight);
      doc.text(label.toUpperCase(), x, rowY);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...textDark);
      doc.text(value, x, rowY + 6);
    });

    y += Math.ceil(specs.length / 3) * 16 + 8;

    // Call-to-action balk (blauw i.p.v. zwart, smal = weinig inktverbruik)
    doc.setFillColor(...blueDark);
    doc.rect(margin, y, pageWidth - margin * 2, 12, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("Interesse? Neem contact op via infocaronix@gmail.com", pageWidth / 2, y + 8, {
      align: "center",
    });
    y += 22;

    // Footer
    doc.setDrawColor(...lineGrey);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...textGrey);
    doc.text("CARONIX - B2B Cartrading & EU Sourcing", margin, y);
    doc.text(
      "Specificaties op basis van aangeleverde voertuiggegevens. Controleer beschikbaarheid vóór aankoop.",
      margin,
      y + 5
    );

    doc.save(`${vehicle.brand}-${vehicle.model}-caronix.pdf`.replace(/\s+/g, "-").toLowerCase());
  }

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

            <div className="flex gap-2 mt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-sm text-xs border"
                style={{ borderColor: "#2A2E34", color: "#F2F3F4" }}
              >
                <WhatsappIcon />
                Deel via WhatsApp
              </a>
              <button
                onClick={handleDownloadPdf}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-sm text-xs border"
                style={{ borderColor: "#2A2E34", color: "#F2F3F4" }}
              >
                <PdfIcon />
                Download als PDF
              </button>
            </div>
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
