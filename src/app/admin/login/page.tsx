"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? "Password non corretta.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Errore di rete. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">A</span>
          </div>
          <span className="text-text-primary font-bold text-xl">AgentForge</span>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8">
          <h1 className="text-xl font-bold text-text-primary mb-1">
            Accesso Admin
          </h1>
          <p className="text-text-secondary text-sm mb-6">
            Inserisci la password per continuare.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-text-primary outline-none focus:border-accent-blue transition-colors"
              />
            </div>

            {error && (
              <p className="text-accent-red text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-xl bg-accent-blue text-white px-4 py-3 font-semibold hover:bg-accent-blue/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Accesso in corso…" : "Entra →"}
            </button>
          </form>
        </div>

        <p className="text-text-tertiary text-xs text-center mt-4">
          Accesso riservato al team AgentForge.
        </p>
      </div>
    </div>
  );
}
