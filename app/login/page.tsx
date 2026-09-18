"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Inloggen mislukt. Controleer je gegevens.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: "#08090B" }}>
      <form onSubmit={handleLogin} className="w-full max-w-sm p-8 rounded-md border" style={{ borderColor: "#1E2126", backgroundColor: "#0E1013" }}>
        <h1 className="text-xl mb-6" style={{ color: "#F2F3F4", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
          Inloggen
        </h1>
        <input
          type="email"
          placeholder="E-mailadres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 rounded-sm border bg-transparent outline-none text-sm"
          style={{ borderColor: "#2A2E34", color: "#F2F3F4" }}
        />
        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 rounded-sm border bg-transparent outline-none text-sm"
          style={{ borderColor: "#2A2E34", color: "#F2F3F4" }}
        />
        {error && <p className="text-xs mb-3" style={{ color: "#C0524E" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-sm text-sm"
          style={{ backgroundColor: "#2E5A94", color: "#F2F3F4" }}
        >
          {loading ? "Bezig..." : "Inloggen"}
        </button>
      </form>
    </div>
  );
}