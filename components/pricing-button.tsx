"use client";

import { useState } from "react";

/**
 * CTA de tarif : lance un Stripe Checkout ANONYME (pas de compte Clerk requis
 * à ce stade — voir patrimoine/apps/api/routers/billing.py, endpoint
 * POST /billing/checkout-public). Le paiement précède la création du compte :
 * après paiement, Stripe redirige vers /sign-up?checkout_session_id=…, qui
 * relie ensuite ce paiement au compte fraîchement créé (/activate).
 *
 * Remplace l'ancien lien statique direct vers /sign-up (SEC-13) : ce
 * dernier créait un compte sans jamais passer par Stripe, avec le même accès
 * qu'un compte payant tant que /choose-plan n'était pas atteint manuellement.
 */
const API_BASE = "https://app-hector.agentimpact.fr/api";

interface PricingButtonProps {
  plan: "monthly" | "yearly";
  className: string;
  children: React.ReactNode;
}

export function PricingButton({ plan, className, children }: PricingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/billing/checkout-public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) throw new Error(`checkout ${res.status}`);
      const data: { checkout_url: string } = await res.json();
      window.location.assign(data.checkout_url);
    } catch {
      setError("Impossible de lancer le paiement. Réessayez dans un instant.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button type="button" onClick={handleClick} disabled={loading} className={className}>
        {loading ? "Redirection…" : children}
      </button>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
