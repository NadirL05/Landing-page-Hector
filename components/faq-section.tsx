"use client";

import { useState } from "react";
import { JsonLd } from "@/components/json-ld";

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
] as const;

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-[oklch(93%_0.03_250)]" id="faq">
      <JsonLd data={FAQ_JSON_LD} />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="mb-12 max-w-xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[oklch(55%_0.18_250)]">FAQ</p>
          <h2 className="text-3xl font-semibold leading-tight text-[oklch(14%_0.02_250)] lg:text-4xl">
            Ce que les CGPI nous demandent
          </h2>
        </div>
        <div className="divide-y divide-[oklch(93%_0.03_250)] border-y border-[oklch(93%_0.03_250)]">
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
                  <span className="font-medium text-[oklch(14%_0.02_250)]">{item.q}</span>
                  <svg
                    className={`shrink-0 text-[oklch(55%_0.18_250)] transition-transform ${isOpen ? "rotate-45" : ""}`}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "240px" : "0px" }}
                >
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-[oklch(48%_0.04_250)]">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
