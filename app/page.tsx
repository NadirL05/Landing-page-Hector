import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";

// Contenu source : Figma Make (figma.com/make/sh6K53CdXkJl0eAR5D7Vf0) + PRD 3
// Messaging & Value Prop (patrimoine repo). 3 corrections appliquées au
// port : points retirés sur titres single-sentence, emoji remplacés par
// liseré de couleur (crédibilité profession réglementée), "Bilan
// Patrimonial" → "Bilan patrimonial" (pas un nom de marque déposé).

// Liens de paiement Stripe (mode TEST — compte Hector, pas de vrai argent
// tant que non basculé en live) et prise de RDV Calendly.
const STRIPE_LINK_MONTHLY = "https://buy.stripe.com/test_eVqcN65rdgYLblSaCP1Fe00";
const STRIPE_LINK_YEARLY = "https://buy.stripe.com/test_8x2dRabPBcIvey46mz1Fe01";
const CALENDLY_URL = "https://calendly.com/nadir-lahyani-agentimpact/30min";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Hector",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Collaborateur IA pour CGPI",
  operatingSystem: "Web",
  description:
    "Hector consolide le suivi patrimonial d'un cabinet de gestion de patrimoine, déclenche relances et rapprochements, et livre le travail fini via WhatsApp.",
  inLanguage: "fr",
  offers: [
    { "@type": "Offer", name: "Mensuel", price: "149", priceCurrency: "EUR", billingIncrement: "P1M" },
    { "@type": "Offer", name: "Annuel", price: "1490", priceCurrency: "EUR", billingIncrement: "P1Y" },
  ],
};

function WhatsAppMockup() {
  const messages = [
    { from: "cgp", text: "Hector, peux-tu préparer le bilan patrimonial de M. Dupont pour jeudi ?", time: "09:14" },
    { from: "hector", text: "Bien sûr. Je consolide les données Harvest + Linxea. Le bilan sera prêt d'ici 20 minutes.", time: "09:14" },
    { from: "hector", text: "Bilan prêt — AUM 1,2 M€ · 4 supports · rendement YTD +4,7 %\nhector.agentimpact.fr/bilans/dupont-2024", time: "09:31" },
    { from: "cgp", text: "Parfait. Relance aussi pour la mise à jour de sa clause bénéficiaire.", time: "09:33" },
    { from: "hector", text: "Noté. Je programme la relance pour lundi 9h. Je t'enverrai un résumé.", time: "09:33" },
  ];

  return (
    <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-[oklch(86%_0.06_250)] bg-white shadow-2xl">
      <div className="flex items-center gap-3 bg-[oklch(55%_0.18_250)] px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">H</div>
        <div>
          <p className="text-sm font-medium text-white">Hector</p>
          <p className="text-xs text-white/70">en ligne</p>
        </div>
      </div>
      <div className="min-h-[280px] space-y-2 bg-[oklch(97%_0.012_250)] px-3 py-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "cgp" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                m.from === "cgp"
                  ? "rounded-tr-sm bg-[oklch(55%_0.18_250)] text-white"
                  : "rounded-tl-sm bg-white text-[oklch(14%_0.02_250)] shadow-sm"
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              <p className={`mt-1 text-right text-[10px] ${m.from === "cgp" ? "text-white/60" : "text-[oklch(48%_0.04_250)]"}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BilanApercu() {
  const sparkPoints = [42, 38, 50, 45, 58, 54, 62, 60, 71, 68, 74, 78];
  const maxV = Math.max(...sparkPoints);
  const minV = Math.min(...sparkPoints);
  const h = 48;
  const w = 180;
  const pts = sparkPoints
    .map((v, i) => `${(i / (sparkPoints.length - 1)) * w},${h - ((v - minV) / (maxV - minV)) * h}`)
    .join(" ");

  return (
    <div className="mx-auto w-full max-w-xs rounded-2xl border border-[oklch(86%_0.06_250)] bg-white p-5 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[oklch(48%_0.04_250)]">Bilan patrimonial</p>
          <p className="text-sm font-semibold text-[oklch(14%_0.02_250)]">M. et Mme Dupont</p>
        </div>
        <span className="rounded-full border border-[oklch(93%_0.03_250)] bg-[oklch(97%_0.012_250)] px-2 py-1 text-[10px] font-medium text-[oklch(55%_0.18_250)]">
          Exemple illustratif
        </span>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[
          { label: "AUM total", val: "1,24 M€" },
          { label: "Rendement YTD", val: "+4,7 %" },
          { label: "Supports", val: "4" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl bg-[oklch(97%_0.012_250)] p-3 text-center">
            <p className="mb-1 text-[11px] leading-tight text-[oklch(48%_0.04_250)]">{kpi.label}</p>
            <p className="text-sm font-semibold text-[oklch(14%_0.02_250)]">{kpi.val}</p>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[11px] font-medium text-[oklch(48%_0.04_250)]">Valorisation 12 mois</p>
          <p className="text-[11px] font-semibold text-[oklch(45%_0.18_250)]">+78 k€</p>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-12 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(55% 0.18 250)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="oklch(55% 0.18 250)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#sparkGrad)" />
          <polyline points={pts} fill="none" stroke="oklch(55% 0.18 250)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="space-y-2">
        {[
          { label: "Assurance-vie", pct: 52, color: "bg-[oklch(55%_0.18_250)]" },
          { label: "PEA", pct: 28, color: "bg-[oklch(65%_0.14_250)]" },
          { label: "Immobilier SC", pct: 20, color: "bg-[oklch(75%_0.10_250)]" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <p className="w-24 shrink-0 text-[11px] text-[oklch(48%_0.04_250)]">{item.label}</p>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[oklch(93%_0.03_250)]">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
            </div>
            <p className="w-8 text-right text-[11px] font-medium text-[oklch(14%_0.02_250)]">{item.pct}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const STEPS = [
  { n: "01", label: "Connecter", desc: "Hector se greffe sur vos outils existants — Harvest, Linxea, ou tout autre logiciel de votre cabinet. Aucune migration, aucun lock-in." },
  { n: "02", label: "Discuter", desc: "Envoyez-lui un message sur WhatsApp comme à un collègue. Demandez un bilan, une relance, un rapprochement." },
  { n: "03", label: "Recevoir", desc: "Il vous rend le travail fini : page de bilan interactive brandée à votre cabinet, relance envoyée, anomalie signalée." },
] as const;

const ENJEUX = [
  { title: "Vigilance qui repose sur une personne", desc: "Un départ, un congé, une surcharge — et la surveillance du portefeuille ralentit ou s'arrête." },
  { title: "Données dispersées entre outils", desc: "Custodiens, assureurs, logiciel interne : consolider manuellement prend du temps que vous n'avez pas." },
  { title: "Relances au fil de l'eau", desc: "Clause bénéficiaire à mettre à jour, document manquant, échéance d'arbitrage — ça se perd dans les agendas." },
  { title: "Temps d'expert perdu en surveillance", desc: "Vous êtes CGPI, pas opérateur de monitoring. La valeur que vous vendez, c'est le conseil, pas la veille." },
] as const;

const COMPARISON_ROWS = [
  { label: "Modèle", hector: "collaborateur qui fait le travail", classique: "logiciel à opérer soi-même", gpt: "assistant qui répond, ne fait rien" },
  { label: "Livrable", hector: "page interactive brandée", classique: "PDF morts", gpt: "du texte" },
  { label: "Connexion stack", hector: "se greffe sur l'existant", classique: "remplace / lock-in", gpt: "aucune" },
  { label: "Conversationnel", hector: "oui — WhatsApp", classique: "copilote limité / non", gpt: "oui mais hors métier" },
  { label: "Décision d'investissement", hector: "jamais (prépare, vous validez)", classique: "—", gpt: "risque hallucination" },
] as const;

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="min-h-screen bg-[oklch(99%_0.004_250)]">
        <header className="sticky top-0 z-50 border-b border-[oklch(93%_0.03_250)] bg-[oklch(99%_0.004_250)]/85 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold tracking-tight text-[oklch(55%_0.18_250)]">Hector</span>
              <span className="hidden text-xs font-normal text-[oklch(48%_0.04_250)] sm:inline">pour CGPI</span>
            </div>
            <a href="#tarifs" className="rounded-[0.75rem] bg-[oklch(55%_0.18_250)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[oklch(45%_0.18_250)]">
              Commencer gratuitement
            </a>
          </div>
        </header>

        <main>
          {/* ===== HERO ===== */}
          <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 lg:pb-32 lg:pt-28">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[oklch(55%_0.18_250)]">
                  Pour CGPI indépendants
                </p>
                <h1 className="mb-6 text-4xl font-semibold leading-[1.1] tracking-tight text-[oklch(14%_0.02_250)] lg:text-5xl xl:text-6xl">
                  Pas un logiciel. <span className="text-[oklch(55%_0.18_250)]">Un collaborateur.</span>
                </h1>
                <p className="mb-8 max-w-lg text-lg leading-relaxed text-[oklch(48%_0.04_250)] lg:text-xl">
                  Hector se branche sur la stack de votre cabinet, vous discutez avec lui, il vous rend le travail fini.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#tarifs" className="inline-flex items-center gap-2 rounded-[0.75rem] bg-[oklch(55%_0.18_250)] px-6 py-3 font-medium text-white transition-all hover:bg-[oklch(45%_0.18_250)]">
                    Commencer gratuitement
                  </a>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[0.75rem] border border-[oklch(86%_0.06_250)] px-6 py-3 font-medium text-[oklch(48%_0.04_250)] transition-all hover:border-[oklch(55%_0.18_250)] hover:text-[oklch(55%_0.18_250)]">
                    Voir un bilan en live
                  </a>
                </div>
                <p className="mt-8 max-w-md border-t border-[oklch(93%_0.03_250)] pt-6 text-sm leading-relaxed text-[oklch(48%_0.04_250)]">
                  Hector consolide automatiquement le suivi d&apos;un parc d&apos;actifs patrimoniaux, déclenche relances et alertes, et vous transmet chaque livrable via WhatsApp — sans remplacer vos outils existants.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
                <WhatsAppMockup />
                <div className="hidden h-64 w-px bg-[oklch(86%_0.06_250)] lg:block" />
                <BilanApercu />
              </div>
            </div>
          </section>

          {/* ===== ÉTAPES ===== */}
          <section className="border-y border-[oklch(93%_0.03_250)] bg-[oklch(97%_0.012_250)]">
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="grid gap-0 divide-y divide-[oklch(86%_0.06_250)] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                {STEPS.map((s) => (
                  <div key={s.n} className="px-6 py-8 first:pl-0 last:pr-0 lg:py-0">
                    <p className="mb-3 text-4xl font-light tabular-nums text-[oklch(86%_0.06_250)]">{s.n}</p>
                    <h3 className="mb-3 text-xl font-semibold text-[oklch(55%_0.18_250)]">{s.label}</h3>
                    <p className="text-sm leading-relaxed text-[oklch(48%_0.04_250)]">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== DOULEURS ===== */}
          <section className="mx-auto max-w-6xl px-6 py-24">
            <div className="mb-14 max-w-xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[oklch(55%_0.18_250)]">Le quotidien</p>
              <h2 className="text-3xl font-semibold leading-tight text-[oklch(14%_0.02_250)] lg:text-4xl">
                Ce qui ronge le temps d&apos;un cabinet
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[0.75rem] border border-[oklch(86%_0.06_250)] bg-[oklch(86%_0.06_250)] sm:grid-cols-2">
              {ENJEUX.map((e) => (
                <div key={e.title} className="border-l-2 border-l-[oklch(55%_0.18_250)] bg-[oklch(99%_0.004_250)] p-8 transition-colors hover:bg-[oklch(97%_0.012_250)]">
                  <h3 className="mb-2 font-semibold leading-snug text-[oklch(14%_0.02_250)]">{e.title}</h3>
                  <p className="text-sm leading-relaxed text-[oklch(48%_0.04_250)]">{e.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== BÉNÉFICES ===== */}
          <section className="bg-[oklch(14%_0.02_250)]" id="demo">
            <div className="mx-auto max-w-6xl px-6 py-24">
              <div className="mb-16 max-w-xl">
                <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[oklch(55%_0.18_250)]">Ce que ça change</p>
                <h2 className="text-3xl font-semibold leading-tight text-white lg:text-4xl">Deux bénéfices, dans cet ordre</h2>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="relative overflow-hidden rounded-[0.75rem] border border-[oklch(55%_0.18_250)]/40 bg-[oklch(55%_0.18_250)]/8 p-10">
                  <div className="absolute right-6 top-6 select-none text-8xl font-black text-[oklch(55%_0.18_250)]/20">1</div>
                  <p className="mb-4 text-4xl font-semibold leading-tight text-white">Vos livrables deviennent votre argument commercial</p>
                  <p className="leading-relaxed text-[oklch(48%_0.04_250)]">
                    Un bilan patrimonial interactif, brandé à votre cabinet, envoyé en 20 minutes : c&apos;est le livrable que vos clients montrent à leur entourage. Votre visibilité, votre revenu.
                  </p>
                  <p className="mt-6 text-sm font-medium text-[oklch(55%_0.18_250)]">→ Revenu et différenciation</p>
                </div>
                <div className="relative overflow-hidden rounded-[0.75rem] border border-white/10 bg-white/5 p-10">
                  <div className="absolute right-6 top-6 select-none text-8xl font-black text-white/10">2</div>
                  <p className="mb-4 text-2xl font-semibold leading-tight text-white">Le répétitif tourne seul</p>
                  <p className="leading-relaxed text-[oklch(48%_0.04_250)]">
                    Surveillance des portefeuilles, relances automatiques, alertes d&apos;anomalie — Hector s&apos;en occupe pendant que vous conseillez. Moins de charge mentale, plus de disponibilité pour vos clients.
                  </p>
                  <p className="mt-6 text-sm font-medium text-white/50">→ Temps et sérénité</p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== TABLE COMPARATIVE ===== */}
          <section className="border-t border-[oklch(93%_0.03_250)]">
            <div className="mx-auto max-w-6xl px-6 py-24">
              <div className="mb-14 max-w-xl">
                <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[oklch(55%_0.18_250)]">Positionnement</p>
                <h2 className="text-3xl font-semibold leading-tight text-[oklch(14%_0.02_250)] lg:text-4xl">Ce que les autres ne font pas</h2>
              </div>
              <div className="-mx-6 overflow-x-auto px-6">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="w-40 py-4 pr-6 text-left font-medium text-[oklch(48%_0.04_250)]" />
                      <th className="rounded-t-[0.75rem] border border-b-0 border-[oklch(86%_0.06_250)] bg-[oklch(97%_0.012_250)] px-6 py-4 text-center">
                        <span className="font-semibold text-[oklch(55%_0.18_250)]">Hector</span>
                      </th>
                      <th className="px-6 py-4 text-center font-medium text-[oklch(48%_0.04_250)]">Logiciels CGP classiques</th>
                      <th className="px-6 py-4 text-center font-medium text-[oklch(48%_0.04_250)]">ChatGPT générique</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.label}>
                        <td className="border-t border-[oklch(93%_0.03_250)] py-4 pr-6 font-medium text-[oklch(14%_0.02_250)]">{row.label}</td>
                        <td className="border-x border-t border-[oklch(86%_0.06_250)] bg-[oklch(97%_0.012_250)] px-6 py-4 text-center font-medium text-[oklch(45%_0.18_250)]">{row.hector}</td>
                        <td className="border-t border-[oklch(93%_0.03_250)] px-6 py-4 text-center text-[oklch(48%_0.04_250)]">{row.classique}</td>
                        <td className="border-t border-[oklch(93%_0.03_250)] px-6 py-4 text-center text-[oklch(48%_0.04_250)]">{row.gpt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <FaqSection />

          {/* ===== TARIFS ===== */}
          <section className="border-t border-[oklch(93%_0.03_250)]" id="tarifs">
            <div className="mx-auto max-w-6xl px-6 py-24">
              <div className="mb-14 max-w-xl">
                <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[oklch(55%_0.18_250)]">Tarifs</p>
                <h2 className="text-3xl font-semibold leading-tight text-[oklch(14%_0.02_250)] lg:text-4xl">Un collaborateur, un abonnement simple</h2>
              </div>
              <div className="mb-8 grid max-w-2xl gap-6 sm:grid-cols-2">
                <div className="rounded-[0.75rem] border border-[oklch(86%_0.06_250)] p-8">
                  <p className="mb-4 text-sm font-medium text-[oklch(48%_0.04_250)]">Mensuel</p>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold text-[oklch(14%_0.02_250)]">149 €</span>
                    <span className="text-[oklch(48%_0.04_250)]">/mois</span>
                  </div>
                  <ul className="mb-8 space-y-2.5">
                    {["Module d'entrée inclus", "Connexion à votre stack", "Accès WhatsApp", "Livrables brandés"].map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[oklch(48%_0.04_250)]">
                        <svg className="shrink-0 text-[oklch(55%_0.18_250)]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={STRIPE_LINK_MONTHLY} className="block rounded-[0.75rem] border border-[oklch(55%_0.18_250)] px-6 py-3 text-center text-sm font-medium text-[oklch(55%_0.18_250)] transition-colors hover:bg-[oklch(97%_0.012_250)]">
                    Commencer gratuitement
                  </a>
                </div>
                <div className="relative rounded-[0.75rem] border-2 border-[oklch(55%_0.18_250)] p-8">
                  <span className="absolute right-4 top-4 rounded-full bg-[oklch(55%_0.18_250)] px-2 py-1 text-[10px] font-semibold text-white">−17 %</span>
                  <p className="mb-4 text-sm font-medium text-[oklch(48%_0.04_250)]">Annuel</p>
                  <div className="mb-1 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold text-[oklch(14%_0.02_250)]">1 490 €</span>
                    <span className="text-[oklch(48%_0.04_250)]">/an</span>
                  </div>
                  <p className="mb-6 text-xs text-[oklch(55%_0.18_250)]">soit 124 €/mois</p>
                  <ul className="mb-8 space-y-2.5">
                    {["Tout le mensuel", "2 mois offerts", "Priorité support", "Onboarding dédié"].map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[oklch(48%_0.04_250)]">
                        <svg className="shrink-0 text-[oklch(55%_0.18_250)]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={STRIPE_LINK_YEARLY} className="block rounded-[0.75rem] bg-[oklch(55%_0.18_250)] px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[oklch(45%_0.18_250)]">
                    Commencer gratuitement
                  </a>
                </div>
              </div>
              <p className="mb-1 text-sm text-[oklch(48%_0.04_250)]">
                Module supplémentaire : <span className="font-medium text-[oklch(14%_0.02_250)]">+100 € / mois</span>
              </p>
              <p className="text-xs text-[oklch(48%_0.04_250)] opacity-70">
                Hypothèse tarifaire en cours de validation, pas encore vendue. Nous contacter pour valider votre configuration.
              </p>
            </div>
          </section>

          {/* ===== CTA FINAL ===== */}
          <section className="border-t border-[oklch(93%_0.03_250)] bg-[oklch(97%_0.012_250)]">
            <div className="mx-auto max-w-3xl px-6 py-28 text-center">
              <h2 className="mb-6 text-3xl font-semibold leading-tight text-[oklch(14%_0.02_250)] lg:text-5xl">
                Votre cabinet mérite un collaborateur, <span className="text-[oklch(55%_0.18_250)]">pas un logiciel de plus</span>
              </h2>
              <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-[oklch(48%_0.04_250)]">
                Commencez gratuitement. Hector se connecte à votre stack en quelques minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#tarifs" className="inline-flex items-center gap-2 rounded-[0.75rem] bg-[oklch(55%_0.18_250)] px-8 py-4 text-base font-medium text-white transition-all hover:bg-[oklch(45%_0.18_250)]">
                  Commencer gratuitement
                </a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[0.75rem] border border-[oklch(86%_0.06_250)] px-8 py-4 text-base font-medium text-[oklch(48%_0.04_250)] transition-all hover:border-[oklch(55%_0.18_250)] hover:text-[oklch(55%_0.18_250)]">
                  Voir un bilan en live
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-[oklch(93%_0.03_250)]">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-xs text-[oklch(48%_0.04_250)]">
            <span>© {new Date().getFullYear()} Hector</span>
            <div className="flex gap-6">
              <Link href="/confidentialite" className="transition-colors hover:text-[oklch(55%_0.18_250)]">RGPD</Link>
              <Link href="/mentions-legales" className="transition-colors hover:text-[oklch(55%_0.18_250)]">Mentions légales</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
