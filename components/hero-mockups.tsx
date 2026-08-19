// Aperçus visuels du hero — conversation WhatsApp + bilan patrimonial.
// Toute donnée chiffrée ici est un exemple illustratif explicitement
// labellisé, jamais une donnée client réelle (produit pas encore en ligne).
//
// Présentés dans page.tsx comme des planches de rapport encadrées
// ("Fig. 1", "Fig. 2"), pas comme un collage de cartes pivotées qui se
// chevauchent — le composant reste volontairement sobre, sans chrome
// sombre ni lueur, pour rester cohérent avec le canvas papier.

const MESSAGES = [
  { from: "cgp", text: "Hector, peux-tu préparer le bilan patrimonial de M. Dupont pour jeudi ?", time: "09:14" },
  { from: "hector", text: "Bien sûr. Je consolide les données Harvest + Linxea. Le bilan sera prêt d'ici 20 minutes.", time: "09:14" },
  { from: "hector", text: "Bilan prêt — AUM 1,2 M€ · 4 supports · rendement YTD +4,7 %\nhector.agentimpact.fr/bilans/dupont-2024", time: "09:31" },
  { from: "cgp", text: "Parfait. Relance aussi pour la mise à jour de sa clause bénéficiaire.", time: "09:33" },
  { from: "hector", text: "Noté. Je programme la relance pour lundi 9h. Je t'enverrai un résumé.", time: "09:33" },
] as const;

export function WhatsAppMockup() {
  return (
    <div className="mx-auto w-full overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper">
      <div className="flex items-center gap-3 border-b border-rule bg-paper-deep px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-rule-strong font-display text-sm italic text-ink">H</div>
        <div>
          <p className="text-sm font-medium text-ink">Hector</p>
          <p className="text-xs text-ink-soft">en ligne</p>
        </div>
      </div>
      <div className="min-h-[240px] space-y-2 bg-paper px-3 py-4">
        {MESSAGES.map((m, i) => (
          <div key={i} className={`flex ${m.from === "cgp" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-[var(--radius-card)] border px-3 py-2 text-xs leading-relaxed ${
                m.from === "cgp"
                  ? "border-ink bg-ink text-paper"
                  : "border-rule bg-paper-alt text-ink"
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              <p className={`mt-1 text-right text-[10px] ${m.from === "cgp" ? "text-paper-deep" : "text-ink-faint"}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SPARK_POINTS = [42, 38, 50, 45, 58, 54, 62, 60, 71, 68, 74, 78];
const ALLOCATION = [
  { label: "Assurance-vie", className: "bg-ink" },
  { label: "PEA", className: "bg-gold" },
  { label: "Immobilier SC", className: "bg-ink-faint" },
] as const;
const ALLOCATION_PCT = [52, 28, 20] as const;

export function BilanApercu() {
  const maxV = Math.max(...SPARK_POINTS);
  const minV = Math.min(...SPARK_POINTS);
  const h = 48;
  const w = 180;
  const pts = SPARK_POINTS
    .map((v, i) => `${(i / (SPARK_POINTS.length - 1)) * w},${h - ((v - minV) / (maxV - minV)) * h}`)
    .join(" ");

  return (
    <div className="mx-auto w-full rounded-[var(--radius-card)] border border-rule bg-paper p-5">
      <div className="mb-4 flex items-center justify-between border-b border-rule pb-3">
        <div>
          <p className="letter-kicker text-ink-faint">Bilan patrimonial</p>
          <p className="text-sm font-semibold text-ink">M. et Mme Dupont</p>
        </div>
        <span className="rounded-[var(--radius-btn)] border border-rule-strong px-2 py-1 text-[10px] font-medium text-ink-faint">
          Exemple illustratif
        </span>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[
          { label: "AUM total", val: "1,24 M€" },
          { label: "Rendement YTD", val: "+4,7 %" },
          { label: "Supports", val: "4" },
        ].map((kpi) => (
          <div key={kpi.label} className="border border-rule p-3 text-center">
            <p className="mb-1 text-[11px] leading-tight text-ink-faint">{kpi.label}</p>
            <p className="tabular text-sm font-semibold text-ink">{kpi.val}</p>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-medium text-ink-faint">Valorisation 12 mois</p>
          <p className="tabular text-[11px] font-semibold text-emerald-ink">+78 k€</p>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-12 w-full" preserveAspectRatio="none">
          <polyline points={pts} fill="none" stroke="var(--color-ink-soft)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="space-y-2">
        {ALLOCATION.map((item, i) => (
          <div key={item.label} className="flex items-center gap-2">
            <p className="w-24 shrink-0 text-[11px] text-ink-faint">{item.label}</p>
            <div className="h-1.5 flex-1 overflow-hidden rounded-[var(--radius-btn)] bg-paper-alt">
              <div className={`h-full rounded-[var(--radius-btn)] ${item.className}`} style={{ width: `${ALLOCATION_PCT[i]}%` }} />
            </div>
            <p className="tabular w-8 text-right text-[11px] font-medium text-ink">{ALLOCATION_PCT[i]}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
