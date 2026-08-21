// Section crédibilité — cruciale pour un produit patrimonial pas encore
// en ligne. Volontairement honnête : pas de faux logos clients, pas de
// faux chiffres d'usage. On vend la rigueur du cadre, pas un historique
// qui n'existe pas encore.
//
// Refonte v2 — la v1 utilisait un folio Fraunces italique géant (même
// dispositif que la numérotation 01/02/03 des ÉTAPES sur la même page :
// deux fois le même tic) sur fond d'encre. Ici : registre "annexe de
// rapport" — appels de note en exposant, filets fins, canvas papier
// identique au reste de la page (pas d'alternance sombre systématique).

import { ScrollReveal } from "@/components/scroll-reveal";

const PILLARS = [
  {
    title: "Aucune décision d'investissement automatisée",
    desc: "Hector consolide, alerte, prépare. La décision reste toujours celle du CGPI — conforme au principe de non-substitution au conseil réglementé.",
  },
  {
    title: "Cloisonnement strict par cabinet",
    desc: "Chaque cabinet aura un accès isolé, sans mutualisation de données entre clients. Chiffrement au repos et en transit, hébergement prévu en Union européenne.",
  },
  {
    title: "Construit avec des cabinets pilotes",
    desc: "La feuille de route se construit avec un nombre restreint de CGPI early adopters, pas dans l'abstrait — chaque fonctionnalité livrée répond à un besoin réel observé.",
  },
  {
    title: "Transparence sur l'état du produit",
    desc: "Hector est en construction. Les tarifs affichés sont une hypothèse en cours de validation commerciale, jamais présentée comme un tarif final imposé.",
  },
] as const;

export function TrustSection() {
  return (
    <section className="border-t border-rule" id="confiance">
      <div className="mx-auto max-w-5xl px-safe py-24 lg:py-28">
        <ScrollReveal className="mb-14 max-w-2xl">
          <p className="letter-kicker mb-3 text-ink-faint">Avant même le lancement</p>
          <h2 className="text-display-lg font-display text-ink">
            Ce sur quoi vous pouvez déjà nous juger
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft">
            Hector n&apos;a pas encore d&apos;historique — un cabinet réglementé ne devrait jamais faire confiance sur promesse seule. Voici le cadre, vérifiable dès aujourd&apos;hui.
          </p>
        </ScrollReveal>

        {/* Annexe à appels de note — filets fins, pas de folio oversize */}
        <ol className="divide-y divide-rule border-y border-rule">
          {PILLARS.map((p, i) => (
            <li key={p.title}>
              <ScrollReveal delayMs={i * 70} className="grid gap-2 py-7 sm:grid-cols-12 sm:gap-8">
                <p className="sm:col-span-1">
                  <span className="footnote-mark font-display text-base text-gold-ink">{i + 1}</span>
                </p>
                <div className="sm:col-span-11">
                  <h3 className="mb-2 font-medium leading-snug text-ink">
                    {p.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
                    {p.desc}
                  </p>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal delayMs={100} className="mt-10 flex items-start gap-3 border-t border-rule pt-8">
          <svg className="mt-0.5 shrink-0 text-emerald-ink" width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M6 9.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm leading-relaxed text-ink-soft">
            Hector est bâti par <span className="font-medium text-ink">Agent Impact</span>, cabinet d&apos;automatisation IA qui équipe déjà des professionnels de secteurs réglementés. Les mêmes exigences de sécurité et de traçabilité s&apos;appliquent ici.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
