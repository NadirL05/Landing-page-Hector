// Aperçus visuels du hero — conversation WhatsApp + bilan patrimonial.
// Toute donnée chiffrée ici est un exemple illustratif explicitement
// labellisé, jamais une donnée client réelle (produit pas encore en ligne).

const MESSAGES = [
  { from: "cgp", text: "Hector, peux-tu préparer le bilan patrimonial de M. Dupont pour jeudi ?", time: "09:14" },
  { from: "hector", text: "Bien sûr. Je consolide les données Harvest + Linxea. Le bilan sera prêt d'ici 20 minutes.", time: "09:14" },
  { from: "hector", text: "Bilan prêt — AUM 1,2 M€ · 4 supports · rendement YTD +4,7 %\nhector.agentimpact.fr/bilans/dupont-2024", time: "09:31" },
  { from: "cgp", text: "Parfait. Relance aussi pour la mise à jour de sa clause bénéficiaire.", time: "09:33" },
  { from: "hector", text: "Noté. Je programme la relance pour lundi 9h. Je t'enverrai un résumé.", time: "09:33" },
] as const;

export function WhatsAppMockup() {
  return (
    <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 bg-ink-900 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 font-display text-sm text-gold-300">H</div>
        <div>
          <p className="text-sm font-medium text-surface">Hector</p>
          <p className="text-xs text-ink-muted-dark">en ligne</p>
        </div>
      </div>
      <div className="min-h-[280px] space-y-2 bg-surface-alt px-3 py-4">
        {MESSAGES.map((m, i) => (
          <div key={i} className={`flex ${m.from === "cgp" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-[var(--radius-card)] px-3 py-2 text-xs leading-relaxed ${
                m.from === "cgp"
                  ? "rounded-tr-sm bg-ink-900 text-surface"
                  : "rounded-tl-sm bg-white text-ink shadow-sm"
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              <p className={`mt-1 text-right text-[10px] ${m.from === "cgp" ? "text-ink-muted-dark" : "text-ink-muted"}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const SPARK_POINTS = [42, 38, 50, 45, 58, 54, 62, 60, 71, 68, 74, 78];
const ALLOCATION = [
  { label: "Assurance-vie", pct: 52, className: "bg-gold" },
  { label: "PEA", pct: 28, className: "bg-emerald" },
  { label: "Immobilier SC", pct: 20, className: "bg-ink-muted" },
] as const;

export function BilanApercu() {
  const maxV = Math.max(...SPARK_POINTS);
  const minV = Math.min(...SPARK_POINTS);
  const h = 48;
  const w = 180;
  const pts = SPARK_POINTS
    .map((v, i) => `${(i / (SPARK_POINTS.length - 1)) * w},${h - ((v - minV) / (maxV - minV)) * h}`)
    .join(" ");

  return (
    <div className="mx-auto w-full max-w-xs rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-2xl shadow-black/30">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-display text-xs italic text-ink-muted">Bilan patrimonial</p>
          <p className="text-sm font-semibold text-ink">M. et Mme Dupont</p>
        </div>
        <span className="rounded-[var(--radius-pill)] border border-gold-100 bg-gold-50 px-2 py-1 text-[10px] font-medium text-gold-600">
          Exemple illustratif
        </span>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[
          { label: "AUM total", val: "1,24 M€" },
          { label: "Rendement YTD", val: "+4,7 %" },
          { label: "Supports", val: "4" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-[var(--radius-card)] bg-surface-alt p-3 text-center">
            <p className="mb-1 text-[11px] leading-tight text-ink-muted">{kpi.label}</p>
            <p className="tabular text-sm font-semibold text-ink">{kpi.val}</p>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-medium text-ink-muted">Valorisation 12 mois</p>
          <p className="tabular text-[11px] font-semibold text-emerald">+78 k€</p>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-12 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(74% 0.12 85)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="oklch(74% 0.12 85)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#sparkGrad)" />
          <polyline points={pts} fill="none" stroke="oklch(62% 0.13 78)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="space-y-2">
        {ALLOCATION.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <p className="w-24 shrink-0 text-[11px] text-ink-muted">{item.label}</p>
            <div className="h-1.5 flex-1 overflow-hidden rounded-[var(--radius-pill)] bg-surface-alt">
              <div className={`h-full rounded-[var(--radius-pill)] ${item.className}`} style={{ width: `${item.pct}%` }} />
            </div>
            <p className="tabular w-8 text-right text-[11px] font-medium text-ink">{item.pct}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
