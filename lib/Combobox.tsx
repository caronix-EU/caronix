"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { normaliseer } from "./automerken";

// Invoerveld met een keuzelijst (bijvoorbeeld voor merk en model).
// - Het pijltje toont altijd ALLE opties, ook als er al iets is ingevuld.
// - Tijdens het typen wordt de lijst gefilterd.
// - Vrij typen blijft mogelijk: een waarde die niet in de lijst staat, wordt gewoon overgenomen.
type Props = {
  id: string;
  waarde: string;
  onChange: (waarde: string) => void;
  opties: string[];
  variant?: "vak" | "lijn"; // vak = veld met rand (zoekopdracht), lijn = veld met onderlijn (beheer)
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  required?: boolean;
};

export default function Combobox({
  id,
  waarde,
  onChange,
  opties,
  variant = "vak",
  className,
  style,
  placeholder,
  required,
}: Props) {
  const [open, setOpen] = useState(false);
  const [filterAan, setFilterAan] = useState(false);
  const [actief, setActief] = useState(-1);
  const houder = useRef<HTMLDivElement>(null);

  // Gefilterd tijdens het typen (eerst wat met de letters begint), anders alles.
  const zoek = normaliseer(waarde);
  const zichtbaar =
    filterAan && zoek
      ? [
          ...opties.filter((o) => normaliseer(o).startsWith(zoek)),
          ...opties.filter((o) => {
            const n = normaliseer(o);
            return !n.startsWith(zoek) && n.includes(zoek);
          }),
        ]
      : opties;

  function sluit() {
    setOpen(false);
    setActief(-1);
  }

  function kies(o: string) {
    onChange(o);
    setFilterAan(false);
    sluit();
  }

  // Klik of tik buiten het veld sluit de lijst.
  useEffect(() => {
    if (!open) return;
    function buiten(e: MouseEvent | TouchEvent) {
      if (houder.current && !houder.current.contains(e.target as Node)) sluit();
    }
    document.addEventListener("mousedown", buiten);
    document.addEventListener("touchstart", buiten);
    return () => {
      document.removeEventListener("mousedown", buiten);
      document.removeEventListener("touchstart", buiten);
    };
  }, [open]);

  // Houd de gekozen regel in beeld bij het bladeren met het toetsenbord.
  useEffect(() => {
    if (actief >= 0) document.getElementById(`${id}-optie-${actief}`)?.scrollIntoView?.({ block: "nearest" });
  }, [actief, id]);

  function toets(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setFilterAan(false);
        setOpen(true);
        setActief(0);
      } else {
        setActief((a) => Math.min(a + 1, zichtbaar.length - 1));
      }
    } else if (e.key === "ArrowUp") {
      if (open) {
        e.preventDefault();
        setActief((a) => Math.max(a - 1, 0));
      }
    } else if (e.key === "Enter") {
      if (open && actief >= 0 && zichtbaar[actief]) {
        e.preventDefault(); // niet het formulier versturen
        kies(zichtbaar[actief]);
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        sluit();
      }
    } else if (e.key === "Tab") {
      sluit();
    }
  }

  const knopClass =
    variant === "vak"
      ? "absolute top-0 bottom-0 right-0 flex items-center justify-center"
      : "absolute right-0 top-1/2 -translate-y-1/2";
  const knopStyle: CSSProperties =
    variant === "vak" ? { width: 40, color: "#8A929C" } : { color: "#8A929C" };

  return (
    <div className="relative" ref={houder}>
      <input
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-lijst`}
        aria-autocomplete="list"
        autoComplete="off"
        required={required}
        placeholder={placeholder}
        value={waarde}
        onChange={(e) => {
          onChange(e.target.value);
          setFilterAan(true);
          setOpen(true);
          setActief(-1);
        }}
        onKeyDown={toets}
        className={className}
        style={style}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-label="Toon alle opties"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          if (open && !filterAan) {
            sluit(); // alle opties stonden al open: sluiten
          } else {
            setFilterAan(false); // alle opties tonen, ook als er al iets is getypt
            setActief(-1);
            setOpen(true);
          }
        }}
        className={knopClass}
        style={knopStyle}
      >
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        >
          <path d="M1 1.5l5 5 5-5" />
        </svg>
      </button>

      {open && zichtbaar.length > 0 && (
        <ul
          id={`${id}-lijst`}
          role="listbox"
          className="absolute left-0 right-0 z-20 mt-1 overflow-auto rounded-md border py-1"
          style={{ top: "100%", maxHeight: 240, backgroundColor: "#0E1013", borderColor: "#2A2E34" }}
        >
          {zichtbaar.map((o, i) => (
            <li
              key={o}
              id={`${id}-optie-${i}`}
              role="option"
              aria-selected={o === waarde}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => kies(o)}
              className="px-3 py-2 text-sm cursor-pointer"
              style={{
                backgroundColor: i === actief ? "#1E2126" : "transparent",
                color: o === waarde ? "#7FA8D9" : "#F2F3F4",
              }}
            >
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
