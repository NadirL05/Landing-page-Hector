// Section crédibilité — cruciale pour un produit patrimonial pas encore
// en ligne. Volontairement honnête : pas de faux logos clients, pas de
// faux chiffres d'usage. On vend la rigueur du cadre, pas un historique
// qui n'existe pas encore.

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
    <section className="border-t border-line-dark bg-ink-900" id="confiance">
      <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 font-display text-sm italic text-gold-300">Avant même le lancement</p>
          <h2 className="font-display text-3xl leading-tight text-surface lg:text-4xl">
            Ce sur quoi vous pouvez déjà nous juger
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted-dark">
            Hector n&apos;a pas encore d&apos;historique — un cabinet réglementé ne devrait jamais faire confiance sur promesse seule. Voici le cadre, vérifiable dès aujourd&apos;hui.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-line-dark sm:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.n} className="bg-ink-900 p-8">
              <p className="mb-4 font-display text-sm text-gold-600">{p.n}</p>
              <h3 className="mb-2 font-medium leading-snug text-surface">{p.title}</h3>
              <p className="text-sm leading-relaxed text-ink-muted-dark">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-start gap-3 border-t border-line-dark pt-8">
          <svg className="mt-0.5 shrink-0 text-emerald" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M6 9.2l2 2 4-4.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm leading-relaxed text-ink-muted-dark">
            Hector est bâti par <span className="font-medium text-surface">Agent Impact</span>, cabinet d&apos;automatisation IA qui équipe déjà des professionnels de secteurs réglementés. Les mêmes exigences de sécurité et de traçabilité s&apos;appliquent ici.
          </p>
        </div>
      </div>
    </section>
  );
}
