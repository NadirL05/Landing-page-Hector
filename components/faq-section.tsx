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
    a: "Non. Pour obtenir un bilan, il suffit d'envoyer un message à Hector sur WhatsApp, une interface que vous utilisez déjà : il vous répond par un lien sécurisé, sans aucun montant dans la conversation. Le suivi, les brouillons de relance et les points d'attention se retrouvent dans l'application Hector.",
  },
  {
    q: "Mes données sont sensibles, comment sont-elles protégées ?",
    a: "Chaque cabinet dispose d'un accès isolé, sans mutualisation de données entre clients : ce que voit un cabinet reste strictement le sien. Les données sont chiffrées au repos et en transit. Surtout, aucune décision d'investissement n'est jamais prise automatiquement : Hector consolide, alerte et prépare le travail, mais la décision reste toujours celle du CGPI, conformément au principe de non-substitution au conseil réglementé.",
  },
  {
    q: "J'ai déjà un logiciel de cabinet, à quoi bon Hector ?",
    a: "Hector ne remplace pas votre logiciel. Il part de vos données existantes (import de fichiers CSV ou Excel, connexion HubSpot, agrégation bancaire) et ajoute une couche proactive : bilans interactifs, brouillons de relance que vous relisez et envoyez vous-même, points d'attention signalés dans l'application.",
  },
  {
    q: "Hector est-il déjà disponible ?",
    a: "Oui, Hector est commercialisé. Les tarifs sont ceux affichés sur cette page : 149 € par mois ou 1 490 € par an.",
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
