"use client";

import { useState } from "react";
import { JsonLd } from "@/components/json-ld";
import { ScrollReveal } from "@/components/scroll-reveal";

// Garder ce tableau synchronisé avec public/schema/faq.json (JSON-LD
// externalisé — voir components/json-ld.tsx pour le pourquoi).
const FAQS = [
  {
    q: "Encore un outil à apprendre ?",
    a: "Non — Hector se pilote depuis WhatsApp, une interface que vous utilisez déjà. Pas de nouveau dashboard à mémoriser, pas de formation longue : vous lui parlez comme à un collaborateur.",
  },
  {
    q: "Mes données sont sensibles, comment sont-elles protégées ?",
    a: "Hector se connecte à votre stack existante sans dupliquer vos données dans un nouveau silo. Chaque cabinet dispose d'un accès isolé. Aucune décision d'investissement n'est prise automatiquement — Hector prépare, vous validez toujours.",
  },
  {
    q: "J'ai déjà Harvest, à quoi bon Hector ?",
    a: "Hector ne remplace pas Harvest, il se branche dessus. Il ajoute la couche conversationnelle et proactive : relances automatiques, bilans instantanés, alertes — ce que votre logiciel actuel ne fait pas seul.",
  },
  {
    q: "Hector est-il déjà disponible ?",
    a: "Hector est en phase de construction avec un nombre restreint de cabinets pilotes. Réservez une démonstration pour être prioritaire à l'ouverture et influencer les premières fonctionnalités livrées.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-rule" id="faq">
      <JsonLd src="/schema/faq.json" />
      <div className="mx-auto max-w-3xl px-6 py-24 lg:py-28">
        <ScrollReveal className="mb-12 max-w-xl">
          <p className="letter-kicker mb-3 text-ink-faint">Questions fréquentes</p>
          <h2 className="text-display-lg font-display text-ink">
            Ce que les CGPI nous demandent
          </h2>
        </ScrollReveal>
        <div className="divide-y divide-rule border-y border-rule">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-medium text-ink">{item.q}</span>
                  <svg
                    className={`shrink-0 text-gold-ink transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-8 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
