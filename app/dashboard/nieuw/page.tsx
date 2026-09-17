"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function NieuwVoertuigPage() {
  const router = useRouter();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [uitvoering, setUitvoering] = useState("");
  const [btwType, setBtwType] = useState<"Marge" | "Excl. BTW">("Marge");
  const [registration, setRegistration] = useState("");
  const [price, setPrice] = useState("");
  const [km, setKm] = useState("");
  const [fuel, setFuel] = useState("");
  const [color, setColor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [country, setCountry] = useState("");

  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setPhotos((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  }

  function movePhoto(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= photos.length) return;
    const newPhotos = [...photos];
    const newPreviews = [...previews];
    [newPhotos[index], newPhotos[newIndex]] = [newPhotos[newIndex], newPhotos[index]];
    [newPreviews[index], newPreviews[newIndex]] = [newPreviews[newIndex], newPreviews[index]];
    setPhotos(newPhotos);
    setPreviews(newPreviews);
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const photoUrls: string[] = [];
      for (const file of photos) {
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("vehicle-photos")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("vehicle-photos")
          .getPublicUrl(fileName);

        photoUrls.push(publicUrlData.publicUrl);
      }

      const { error: insertError } = await supabase.from("vehicles").insert({
        brand,
        model,
        uitvoering,
        btw_type: btwType,
        registration: registration ? Number(registration) : null,
        price: price ? Number(price) : null,
        km: km ? Number(km) : null,
        fuel,
        color,
        transmission,
        country,
        photo_urls: photoUrls,
      });

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (err: any) {
      setError(err.message || "Er ging iets mis.");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle: React.CSSProperties = { color: "#F2F3F4" };
  const labelClass = "block text-sm mb-2";
  const labelStyle: React.CSSProperties = { color: "#8A929C" };
  const fieldWrap = "border-b pb-2";
  const fieldBorder: React.CSSProperties = { borderColor: "#2A2E34" };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#08090B" }}>
      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b" style={{ borderColor: "#1E2126" }}>
        <a href="/dashboard" className="text-lg tracking-tight" style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
          CARONIX
        </a>
        <a href="/dashboard" className="text-sm" style={{ color: "#8A929C" }}>
          ← Terug naar aanbod
        </a>
      </div>

      <div className="px-6 md:px-10 py-8 max-w-2xl mx-auto">
        <h1 className="text-2xl mb-1" style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
          Nieuw voertuig toevoegen
        </h1>
        <p className="text-sm mb-8" style={{ color: "#7A828C" }}>
          Vul de gegevens in en upload foto's — de volgorde waarin je ze uploadt bepaalt de volgorde op de site.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass} style={labelStyle}>Merk</label>
              <div className={fieldWrap} style={fieldBorder}>
                <input required value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full bg-transparent outline-none text-sm" style={inputStyle} placeholder="BMW" />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Model</label>
              <div className={fieldWrap} style={fieldBorder}>
                <input required value={model} onChange={(e) => setModel(e.target.value)} className="w-full bg-transparent outline-none text-sm" style={inputStyle} placeholder="5 Serie" />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Uitvoering</label>
              <div className={fieldWrap} style={fieldBorder}>
                <input value={uitvoering} onChange={(e) => setUitvoering(e.target.value)} className="w-full bg-transparent outline-none text-sm" style={inputStyle} placeholder="520d M Sport" />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>BTW-status</label>
              <div className="flex gap-2 pb-2">
                {(["Marge", "Excl. BTW"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setBtwType(option)}
                    className="px-3 py-1.5 rounded-full text-xs border"
                    style={{
                      borderColor: "#2A2E34",
                      backgroundColor: btwType === option ? "#2E5A94" : "transparent",
                      color: btwType === option ? "#F2F3F4" : "#8A929C",
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Bouwjaar</label>
              <div className={fieldWrap} style={fieldBorder}>
                <input type="number" value={registration} onChange={(e) => setRegistration(e.target.value)} className="w-full bg-transparent outline-none text-sm" style={inputStyle} placeholder="2022" />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Prijs (€)</label>
              <div className={fieldWrap} style={fieldBorder}>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-transparent outline-none text-sm" style={inputStyle} placeholder="38900" />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Tellerstand (km)</label>
              <div className={fieldWrap} style={fieldBorder}>
                <input type="number" value={km} onChange={(e) => setKm(e.target.value)} className="w-full bg-transparent outline-none text-sm" style={inputStyle} placeholder="41200" />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Brandstof</label>
              <div className={fieldWrap} style={fieldBorder}>
                <input value={fuel} onChange={(e) => setFuel(e.target.value)} className="w-full bg-transparent outline-none text-sm" style={inputStyle} placeholder="Diesel" />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Kleur</label>
              <div className={fieldWrap} style={fieldBorder}>
                <input value={color} onChange={(e) => setColor(e.target.value)} className="w-full bg-transparent outline-none text-sm" style={inputStyle} placeholder="Zwart" />
              </div>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Transmissie</label>
              <div className={fieldWrap} style={fieldBorder}>
                <input value={transmission} onChange={(e) => setTransmission(e.target.value)} className="w-full bg-transparent outline-none text-sm" style={inputStyle} placeholder="Automaat" />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} style={labelStyle}>Land van herkomst</label>
              <div className={fieldWrap} style={fieldBorder}>
                <input value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-transparent outline-none text-sm" style={inputStyle} placeholder="Duitsland" />
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass} style={labelStyle}>Foto's</label>
            <input type="file" accept="image/*" multiple onChange={handlePhotoChange} className="text-sm mb-4" style={inputStyle} />

            {previews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative rounded-sm overflow-hidden border" style={{ borderColor: "#2A2E34" }}>
                    <img src={src} alt={`foto ${i + 1}`} className="w-full h-24 object-cover" />
                    <div className="absolute top-1 left-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "#08090B", color: "#7FA8D9" }}>
                      {i + 1}
                    </div>
                    <div className="absolute bottom-1 right-1 flex gap-1">
                      <button type="button" onClick={() => movePhoto(i, -1)} className="text-[10px] w-5 h-5 rounded-full" style={{ backgroundColor: "#08090B", color: "#F2F3F4" }}>‹</button>
                      <button type="button" onClick={() => movePhoto(i, 1)} className="text-[10px] w-5 h-5 rounded-full" style={{ backgroundColor: "#08090B", color: "#F2F3F4" }}>›</button>
                      <button type="button" onClick={() => removePhoto(i)} className="text-[10px] w-5 h-5 rounded-full" style={{ backgroundColor: "#08090B", color: "#C0524E" }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p style={{ color: "#C0524E" }} className="text-sm">Er ging iets mis: {error}</p>}
          {success && <p style={{ color: "#7FA8D9" }} className="text-sm">Voertuig toegevoegd! Je wordt teruggestuurd...</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 text-sm rounded-sm"
            style={{ backgroundColor: saving ? "#1C2A3F" : "#2E5A94", color: "#F2F3F4" }}
          >
            {saving ? "Bezig met opslaan..." : "Voertuig toevoegen"}
          </button>
        </form>
      </div>
    </div>
  );
}