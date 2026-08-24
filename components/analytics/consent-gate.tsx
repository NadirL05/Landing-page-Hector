"use client";

import { useEffect, useState, type ReactNode } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    __cmp?: (command: string, params?: unknown, callback?: unknown) => void;
  }
}

type ConsentCategory = "analytics" | "marketing";

/**
 * Signal réel disponible côté consentmanager.net sur ce compte : pas l'API
 * IAB TCF v2 standard (`window.__tcfapi` n'existe pas sur ce compte), mais
 * Google Consent Mode v2, que leur script d'automatic blocking pousse
 * lui-même dans `dataLayer` sous forme d'entrées `{0:'consent',
 * 1:'default'|'update', 2:{analytics_storage, ad_storage, ...}}`.
 *
 * Même compte/CMP que plu-ia-work (id 175740, domaine racine
 * agentimpact.fr couvre les sous-domaines) — la config fournisseurs
 * (Facebook Meta → Marketing, Google Analytics → Mesure) est partagée,
 * pas besoin de la refaire par site.
 *
 * analytics_storage → gate GoogleTag (GA4).
 * ad_storage + ad_user_data → gate MetaPixel.
 *
 * Fail closed : tant qu'aucune entrée consent n'a été vue, la catégorie
 * reste non consentie (rien ne se charge).
 */
function readConsentState(category: ConsentCategory): boolean {
  if (typeof window === "undefined" || !Array.isArray(window.dataLayer)) return false;

  for (let i = window.dataLayer.length - 1; i >= 0; i--) {
    // Pas de Array.isArray() ici : le stub gtag() du CMP fait
    // `dataLayer.push(arguments)` — un objet arguments, array-like mais
    // PAS un vrai Array (Array.isArray dessus renvoie false). Un accès
    // [0]/[2] direct fonctionne aussi bien sur un arguments que sur un
    // tableau, donc on duck-type au lieu de vérifier le type exact.
    const entry = window.dataLayer[i] as Record<number, unknown> | unknown[] | null | undefined;
    if (entry == null || entry[0] !== "consent") continue;
    const payload = entry[2] as Record<string, string> | undefined;
    if (!payload) continue;

    if (category === "analytics") {
      return payload.analytics_storage === "granted";
    }
    return payload.ad_storage === "granted" && payload.ad_user_data === "granted";
  }

  return false;
}

// Audit sécu 24/08 : chaque instance de ConsentGate (une par catégorie,
// analytics ET marketing) patchait `dataLayer.push` indépendamment, en
// capturant son propre `originalPush` au montage. Si les deux se
// démontaient/remontaient dans un ordre différent (re-render, navigation
// client, StrictMode double-render en dev), le cleanup d'une instance
// écrasait le wrapper encore actif de l'autre — la propagation des
// changements de consentement pour une catégorie pouvait alors se figer
// (le tracking restant actif ou inactif après un changement d'avis
// utilisateur, un vrai risque RGPD dans un contexte réglementé). Fix :
// un seul wrapper partagé au niveau module, avec une liste d'abonnés —
// chaque `ConsentGate` s'abonne/se désabonne sans jamais toucher au
// wrapper lui-même.
const subscribers = new Set<() => void>();
let patched = false;

function ensurePatched(): void {
  if (patched || typeof window === "undefined") return;
  patched = true;

  const dataLayer = (window.dataLayer = window.dataLayer || []);
  const originalPush = dataLayer.push.bind(dataLayer);

  dataLayer.push = (...args: unknown[]) => {
    const result = originalPush(...args);
    subscribers.forEach((notify) => notify());
    return result;
  };
}

function useConsent(category: ConsentCategory): boolean {
  // Lazy initializer plutôt qu'un setState dans l'effet ci-dessous : l'état
  // initial (avant tout événement CMP) est lu directement au montage.
  const [granted, setGranted] = useState(() => readConsentState(category));

  useEffect(() => {
    ensurePatched();

    const notify = () => setGranted(readConsentState(category));
    subscribers.add(notify);

    // Filet de sécurité : l'API __cmp propriétaire notifie aussi les
    // changements de consentement via son propre système d'événements.
    if (typeof window.__cmp === "function") {
      window.__cmp("addEventListener", ["consent", notify, false], null);
    }

    return () => {
      subscribers.delete(notify);
    };
  }, [category]);

  return granted;
}

export function ConsentGate({ category, children }: { category: ConsentCategory; children: ReactNode }) {
  const granted = useConsent(category);
  if (!granted) return null;
  return <>{children}</>;
}
