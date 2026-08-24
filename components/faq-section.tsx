"use client";

import { useState } from "react";
import { JsonLd } from "@/components/json-ld";
import faqSchema from "@/public/schema/faq.json";
import { ScrollReveal } from "@/components/scroll-reveal";

// Garder ce tableau synchronisé avec public/schema/faq.json (JSON-LD
// injecté inline — voir components/json-ld.tsx pour le pourquoi).
const FAQS = [
  {
    q: "Encore un outil à apprendre ?",
    a: "Non — Hector se pilote depuis WhatsApp, une interface que vous utilisez déjà. Pas de nouveau dashboard à mémoriser, pas de formation longue : vous lui parlez comme à un collaborateur.",
  },
  {
    q: "Mes données sont sensibles, comment sont-elles protégées ?",
    a: "Hector se connecte à votre stack existante sans dupliquer vos données dans un nouveau silo. Chaque cabinet dispose d'un accès isolé, sans mutualisation de données entre clients : ce que voit un cabinet reste strictement le sien. Les données sont chiffrées au repos et en transit, avec un hébergement prévu en Union européenne — cohérent avec les exigences d'un secteur réglementé. Surtout, aucune décision d'investissement n'est jamais prise automatiquement : Hector consolide, alerte et prépare le travail, mais la décision reste toujours celle du CGPI, conformément au principe de non-substitution au conseil réglementé.",
  },
  {
    q: "J'ai déjà Harvest, à quoi bon Hector ?",
    a: "Hector ne remplace pas Harvest, il se branche dessus. Il ajoute la couche conversationnelle et proactive : relances automatiques, bilans instantanés, alertes — ce que votre logiciel actuel ne fait pas seul.",
  },
  {
    q: "Hector est-il déjà disponible ?",
    a: "Hector est en phase de construction, avec un nombre restreint de cabinets pilotes. La feuille de route se bâtit avec ces premiers utilisateurs plutôt que dans l'abstrait : chaque fonctionnalité livrée répond à un besoin réel observé sur le terrain, pas à une hypothèse produit isolée. Les tarifs affichés sont une hypothèse en cours de validation commerciale, jamais présentée comme un tarif final imposé. Réserver une démonstration permet d'être prioritaire à l'ouverture et d'influencer directement les premières fonctionnalités livrées.",
  },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-rule" id="faq">
      <JsonLd data={faqSchema} />
      <div className="mx-auto max-w-3xl px-safe py-24 lg:py-28">
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
                <h3>
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
                      aria-hidden="true"
                    >
                      <path d="M9 2v14M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </h3>
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
