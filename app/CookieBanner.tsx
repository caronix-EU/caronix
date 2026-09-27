"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("caronix-cookie-notice-seen");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("caronix-cookie-notice-seen", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-6 py-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{ backgroundColor: "#0E1013", borderColor: "#2A2E34" }}
    >
      <p className="text-xs" style={{ color: "#B7BEC7" }}>
        Deze website gebruikt alleen functionele cookies die nodig zijn om de site te laten
        werken (bijvoorbeeld om ingelogd te blijven). Er worden geen cookies gebruikt voor
        tracking, advertenties of analyse.{" "}
        <Link href="/privacybeleid" className="underline" style={{ color: "#7FA8D9" }}>
          Lees ons privacybeleid
        </Link>
        .
      </p>
      <button
        onClick={handleAccept}
        className="shrink-0 px-5 py-2 rounded-sm text-xs whitespace-nowrap"
        style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
      >
        Begrepen
      </button>
    </div>
  );
}
