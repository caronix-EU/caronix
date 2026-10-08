import Link from "next/link";
import BeschikbareAutos from "./BeschikbareAutos";

export const metadata = {
  title: "Pagina niet gevonden | Caronix",
  description: "Deze pagina bestaat niet (meer). Bekijk het actuele aanbod van Caronix.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: "#08090B" }}>
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
        <Link href="/" className="text-sm" style={{ color: "#8A929C" }}>
          ← Terug naar home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl text-center">
          <p className="text-sm mb-3" style={{ color: "#6E93C2", letterSpacing: "0.3em" }}>
            404
          </p>

          <h1
            className="text-2xl md:text-3xl mb-3"
            style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          >
            Deze auto of pagina is niet meer beschikbaar
          </h1>

          <p className="text-sm max-w-md mx-auto mb-8" style={{ color: "#8A929C" }}>
            Mogelijk is de auto inmiddels verkocht. Ons aanbod wisselt snel, bekijk dus wat er nu
            wél beschikbaar is.
          </p>

          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 rounded-sm text-sm"
            style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
          >
            Bekijk de actuele voorraad
          </Link>

          <p className="mt-5 text-xs" style={{ color: "#7A828C" }}>
            Zoek je een specifieke auto?{" "}
            <Link href="/contact" className="underline" style={{ color: "#7FA8D9" }}>
              Neem contact op
            </Link>
          </p>

          <BeschikbareAutos />
        </div>
      </div>
    </div>
  );
}
