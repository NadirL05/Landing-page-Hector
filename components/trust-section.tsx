// Section crédibilité — cruciale pour un produit patrimonial pas encore
// en ligne. Volontairement honnête : pas de faux logos clients, pas de
// faux chiffres d'usage. On vend la rigueur du cadre, pas un historique
// qui n'existe pas encore.
//
// Composition éditoriale délibérée (inspirée Titan/Origin, refs Mobbin) :
// liste asymétrique alternée, gros folio Fraunces italique en repère de
// lecture, liseré or vertical comme colonne de rythme — pas une grille
// 4 cases uniforme qui banaliserait un sujet de confiance réglementaire.

import { ScrollReveal } from "@/components/scroll-reveal";

const PILLARS = [
  {
    n: "01",
    title: "Aucune décision d'investissement automatisée",
    desc: "Hector consolide, alerte, prépare. La décision reste toujours celle du CGPI — conforme au principe de non-substitution au conseil réglementé.",
  },
  {
    n: "02",
    title: "Cloisonnement strict par cabinet",
    desc: "Chaque cabinet dispose d'un accès isolé, sans mutualisation de données entre clients. Chiffrement au repos et en transit, hébergement en Union européenne.",
  },
  {
    n: "03",
    title: "Construit avec des cabinets pilotes",
    desc: "La feuille de route se construit avec un nombre restreint de CGPI early adopters, pas dans l'abstrait — chaque fonctionnalité livrée répond à un besoin réel observé.",
  },
  {
    n: "04",
    title: "Transparence sur l'état du produit",
    desc: "Hector est en construction. Les tarifs affichés sont une hypothèse en cours de validation commerciale, jamais présentée comme un tarif final imposé.",
  },
] as const;

export function TrustSection() {
  return (
    <section className="grain-dark relative overflow-hidden border-t border-line-dark bg-ink-900" id="confiance">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/3 h-[480px] w-[480px] -translate-y-1/2 rounded-full opacity-[0.08] blur-[130px]"
        style={{ background: "oklch(45% 0.09 165)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <ScrollReveal className="mb-16 max-w-2xl">
          <span className="gold-rule mb-4" aria-hidden />
          <p className="mb-3 font-display text-sm italic text-gold-300">Avant même le lancement</p>
          <h2 className="text-display-lg font-display text-surface">
            Ce sur quoi vous pouvez déjà nous juger
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted-dark">
            Hector n&apos;a pas encore d&apos;historique — un cabinet réglementé ne devrait jamais faire confiance sur promesse seule. Voici le cadre, vérifiable dès aujourd&apos;hui.
          </p>
        </ScrollReveal>

        {/* Liste éditoriale — folio Fraunces oversize + liseré or vertical,
            alternance d'alignement (pas de grille symétrique). */}
        <div className="divide-y divide-line-dark border-y border-line-dark">
          {PILLARS.map((p, i) => (
            <ScrollReveal key={p.n} delayMs={i * 90} className="group grid gap-4 py-10 sm:grid-cols-12 sm:gap-8 lg:py-12">
              <div className="sm:col-span-3">
                <p className="font-display text-6xl italic leading-none text-gold/25 transition-colors duration-500 group-hover:text-gold-300/60 lg:text-7xl">
                  {p.n}
                </p>
              </div>
              <div className="relative sm:col-span-9 sm:pl-8">
                <span className="gold-rule-vertical absolute left-0 top-1 h-full opacity-60" aria-hidden />
                <h3 className={`mb-3 font-display text-2xl leading-snug text-surface lg:text-3xl ${i % 2 === 1 ? "sm:pr-16" : ""}`}>
                  {p.title}
                </h3>
                <p className={`max-w-xl text-sm leading-relaxed text-ink-muted-dark lg:text-base ${i % 2 === 1 ? "sm:ml-auto" : ""}`}>
                  {p.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delayMs={120} className="mt-10 flex items-start gap-3 pt-2">
          <svg className="mt-0.5 shrink-0 text-emerald" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M6 9.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm leading-relaxed text-ink-muted-dark">
            Hector est bâti par <span className="font-medium text-surface">Agent Impact</span>, cabinet d&apos;automatisation IA qui équipe déjà des professionnels de secteurs réglementés. Les mêmes exigences de sécurité et de traçabilité s&apos;appliquent ici.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
