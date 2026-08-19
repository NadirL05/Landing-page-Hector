import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { FaqSection } from "@/components/faq-section";
import { TrustSection } from "@/components/trust-section";
import { WhatsAppMockup, BilanApercu } from "@/components/hero-mockups";
import { ScrollReveal } from "@/components/scroll-reveal";

// Contenu source : Figma Make (figma.com/make/sh6K53CdXkJl0eAR5D7Vf0) + PRD 3
// Messaging & Value Prop (patrimoine repo), refonte design "private
// banking sombre" (passe dédiée — voir Mobbin refs Fey/Origin/Rox).
// 3 corrections historiques conservées : points retirés sur titres
// single-sentence, emoji remplacés par liseré de couleur (crédibilité
// profession réglementée), "Bilan Patrimonial" → "Bilan patrimonial"
// (pas un nom de marque déposé).

// Liens de paiement Stripe (mode TEST — compte Hector, pas de vrai argent
// tant que non basculé en live) et prise de RDV Calendly.
const STRIPE_LINK_MONTHLY = "https://buy.stripe.com/test_eVqcN65rdgYLblSaCP1Fe00";
const STRIPE_LINK_YEARLY = "https://buy.stripe.com/test_8x2dRabPBcIvey46mz1Fe01";
const CALENDLY_URL = "https://calendly.com/nadir-lahyani-agentimpact/30min";

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

const CHECK_ICON = (
  <svg className="shrink-0 text-gold-600" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Home() {
  return (
    <>
      <JsonLd src="/schema/software-application.json" />
      <div className="min-h-screen bg-surface">
        <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg tracking-tight text-ink">Hector</span>
              <span className="hidden text-xs font-normal text-ink-muted sm:inline">pour CGPI</span>
            </div>
            <a href="#tarifs" className="rounded-[var(--radius-pill)] bg-ink px-4 py-2 text-sm font-medium text-surface transition-colors hover:bg-ink-900">
              Commencer gratuitement
            </a>
          </div>
        </header>

        <main>
          {/* ===== HERO =====
              Composition asymétrique volontaire : le texte occupe 7/12,
              les deux aperçus produit se chevauchent en profondeur
              (rotation légère + décalage + ombre portée large) plutôt
              qu'un centrage sage côte à côte. Lueur or renforcée pour
              ancrer le point focal sur le bilan patrimonial. */}
          <section className="grain-dark relative overflow-hidden bg-ink-900">
            <div
              aria-hidden
              className="pointer-events-none absolute right-[-15%] top-[-25%] h-[720px] w-[720px] rounded-full opacity-[0.20] blur-[140px]"
              style={{ background: "oklch(74% 0.12 85)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[-25%] left-[-15%] h-[520px] w-[520px] rounded-full opacity-[0.13] blur-[130px]"
              style={{ background: "oklch(45% 0.09 165)" }}
            />
            <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-20 lg:pb-40 lg:pt-24">
              <div className="grid items-center gap-16 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <span className="gold-rule mb-6" aria-hidden />
                  <p className="mb-5 font-display text-sm italic text-gold-300">
                    Pour CGPI indépendants
                  </p>
                  <h1 className="text-hero mb-8 font-display text-surface">
                    Pas un logiciel.
                    <br />
                    <span className="italic text-gold-300">Un collaborateur.</span>
                  </h1>
                  <p className="mb-8 max-w-lg text-lg leading-relaxed text-ink-muted-dark lg:text-xl">
                    Hector se branche sur la stack de votre cabinet, vous discutez avec lui, il vous rend le travail fini.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#tarifs" className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-gold px-6 py-3 font-medium text-ink-900 transition-all hover:bg-gold-300">
                      Commencer gratuitement
                    </a>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-line-dark px-6 py-3 font-medium text-surface transition-all hover:border-gold-300 hover:text-gold-300">
                      Voir un bilan en live
                    </a>
                  </div>
                  <p className="mt-10 max-w-md border-t border-line-dark pt-6 text-sm leading-relaxed text-ink-muted-dark">
                    Hector consolide automatiquement le suivi d&apos;un parc d&apos;actifs patrimoniaux, déclenche relances et alertes, et vous transmet chaque livrable via WhatsApp — sans remplacer vos outils existants.
                  </p>
                </div>
                <div className="relative lg:col-span-4">
                  <div className="relative mx-auto h-[420px] w-full max-w-sm sm:h-[460px]">
                    <div className="absolute left-0 top-0 w-[75%] -rotate-6 transition-transform duration-500 ease-out hover:-rotate-3 hover:scale-[1.02]">
                      <WhatsAppMockup />
                    </div>
                    <div className="absolute bottom-0 right-0 w-[72%] rotate-3 transition-transform duration-500 ease-out hover:rotate-1 hover:scale-[1.02]">
                      <BilanApercu />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== ÉTAPES ===== */}
          <section className="border-b border-line bg-surface-alt">
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="grid gap-0 divide-y divide-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                {STEPS.map((s, i) => (
                  <ScrollReveal key={s.n} delayMs={i * 100} className="px-6 py-8 first:pl-0 last:pr-0 lg:py-0">
                    <p className="mb-3 font-display text-5xl italic text-gold-300/70">{s.n}</p>
                    <h3 className="mb-3 text-xl font-semibold text-ink">{s.label}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{s.desc}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ===== DOULEURS ===== */}
          <section className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
            <ScrollReveal className="mb-14 max-w-xl">
              <span className="gold-rule mb-4" aria-hidden />
              <p className="mb-3 font-display text-sm italic text-gold-800">Le quotidien</p>
              <h2 className="text-display-lg font-display text-ink">
                Ce qui ronge le temps d&apos;un cabinet
              </h2>
            </ScrollReveal>
            <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
              {ENJEUX.map((e, i) => (
                <ScrollReveal key={e.title} delayMs={i * 80} className="border-l-2 border-l-gold bg-surface p-8 transition-colors hover:bg-surface-alt">
                  <h3 className="mb-2 font-semibold leading-snug text-ink">{e.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{e.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* ===== BÉNÉFICES ===== */}
          <section className="grain-dark bg-ink-900" id="demo">
            <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
              <ScrollReveal className="mb-16 max-w-xl">
                <span className="gold-rule mb-4" aria-hidden />
                <p className="mb-3 font-display text-sm italic text-gold-300">Ce que ça change</p>
                <h2 className="text-display-lg font-display text-surface">Deux bénéfices, dans cet ordre</h2>
              </ScrollReveal>
              <div className="grid gap-8 lg:grid-cols-2">
                <ScrollReveal className="relative overflow-hidden rounded-[var(--radius-card)] border border-gold/30 bg-gold/[0.06] p-10">
                  <div className="absolute right-6 top-6 select-none font-display text-8xl italic text-gold/15">1</div>
                  <p className="mb-4 font-display text-4xl leading-tight text-surface">Vos livrables deviennent votre argument commercial</p>
                  <p className="leading-relaxed text-ink-muted-dark">
                    Un bilan patrimonial interactif, brandé à votre cabinet, envoyé en 20 minutes : c&apos;est le livrable que vos clients montrent à leur entourage. Votre visibilité, votre revenu.
                  </p>
                  <p className="mt-6 text-sm font-medium text-gold-300">→ Revenu et différenciation</p>
                </ScrollReveal>
                <ScrollReveal delayMs={120} className="relative overflow-hidden rounded-[var(--radius-card)] border border-line-dark bg-white/[0.03] p-10">
                  <div className="absolute right-6 top-6 select-none font-display text-8xl italic text-surface/10">2</div>
                  <p className="mb-4 text-2xl font-semibold leading-tight text-surface">Le répétitif tourne seul</p>
                  <p className="leading-relaxed text-ink-muted-dark">
                    Surveillance des portefeuilles, relances automatiques, alertes d&apos;anomalie — Hector s&apos;en occupe pendant que vous conseillez. Moins de charge mentale, plus de disponibilité pour vos clients.
                  </p>
                  <p className="mt-6 text-sm font-medium text-ink-muted-dark">→ Temps et sérénité</p>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ===== TABLE COMPARATIVE ===== */}
          <section className="border-t border-line">
            <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
              <ScrollReveal className="mb-14 max-w-xl">
                <span className="gold-rule mb-4" aria-hidden />
                <p className="mb-3 font-display text-sm italic text-gold-800">Positionnement</p>
                <h2 className="text-display-lg font-display text-ink">Ce que les autres ne font pas</h2>
              </ScrollReveal>
              <div className="-mx-6 overflow-x-auto px-6">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="w-40 py-4 pr-6 text-left font-medium text-ink-muted" />
                      <th className="rounded-t-[var(--radius-card)] border border-b-0 border-line bg-surface-alt px-6 py-4 text-center">
                        <span className="font-display italic text-gold-800">Hector</span>
                      </th>
                      <th className="px-6 py-4 text-center font-medium text-ink-muted">Logiciels CGP classiques</th>
                      <th className="px-6 py-4 text-center font-medium text-ink-muted">ChatGPT générique</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.label}>
                        <td className="border-t border-line py-4 pr-6 font-medium text-ink">{row.label}</td>
                        <td className="border-x border-t border-line bg-surface-alt px-6 py-4 text-center font-medium text-gold-800">{row.hector}</td>
                        <td className="border-t border-line px-6 py-4 text-center text-ink-muted">{row.classique}</td>
                        <td className="border-t border-line px-6 py-4 text-center text-ink-muted">{row.gpt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <TrustSection />

          <FaqSection />

          {/* ===== TARIFS ===== */}
          <section className="border-t border-line" id="tarifs">
            <div className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
              <ScrollReveal className="mb-14 max-w-xl">
                <span className="gold-rule mb-4" aria-hidden />
                <p className="mb-3 font-display text-sm italic text-gold-800">Tarifs</p>
                <h2 className="text-display-lg font-display text-ink">Un collaborateur, un abonnement simple</h2>
              </ScrollReveal>
              <div className="mb-8 grid max-w-2xl gap-6 sm:grid-cols-2">
                <div className="rounded-[var(--radius-card)] border border-line p-8">
                  <p className="mb-4 text-sm font-medium text-ink-muted">Mensuel</p>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="tabular font-display text-4xl text-ink">149 €</span>
                    <span className="text-ink-muted">/mois</span>
                  </div>
                  <ul className="mb-8 space-y-2.5">
                    {["Module d'entrée inclus", "Connexion à votre stack", "Accès WhatsApp", "Livrables brandés"].map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-ink-muted">
                        {CHECK_ICON}
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={STRIPE_LINK_MONTHLY} className="block rounded-[var(--radius-pill)] border border-ink px-6 py-3 text-center text-sm font-medium text-ink transition-colors hover:bg-surface-alt">
                    Commencer gratuitement
                  </a>
                </div>
                <div className="relative rounded-[var(--radius-card)] border-2 border-gold p-8">
                  <span className="absolute right-4 top-4 rounded-[var(--radius-pill)] bg-gold px-2 py-1 text-[10px] font-semibold text-ink-900">−17 %</span>
                  <p className="mb-4 text-sm font-medium text-ink-muted">Annuel</p>
                  <div className="mb-1 flex items-baseline gap-1">
                    <span className="tabular font-display text-4xl text-ink">1 490 €</span>
                    <span className="text-ink-muted">/an</span>
                  </div>
                  <p className="mb-6 text-xs text-gold-800">soit 124 €/mois</p>
                  <ul className="mb-8 space-y-2.5">
                    {["Tout le mensuel", "2 mois offerts", "Priorité support", "Onboarding dédié"].map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-ink-muted">
                        {CHECK_ICON}
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={STRIPE_LINK_YEARLY} className="block rounded-[var(--radius-pill)] bg-ink px-6 py-3 text-center text-sm font-medium text-surface transition-colors hover:bg-ink-900">
                    Commencer gratuitement
                  </a>
                </div>
              </div>
              <p className="mb-1 text-sm text-ink-muted">
                Module supplémentaire : <span className="font-medium text-ink">+100 € / mois</span>
              </p>
              <p className="text-xs text-ink-muted opacity-70">
                Hypothèse tarifaire en cours de validation, pas encore vendue. Nous contacter pour valider votre configuration.
              </p>
            </div>
          </section>

          {/* ===== CTA FINAL ===== */}
          <section className="grain-dark relative overflow-hidden border-t border-line-dark bg-ink-900">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[130px]"
              style={{ background: "oklch(74% 0.12 85)" }}
            />
            <ScrollReveal className="relative mx-auto max-w-3xl px-6 py-28 text-center">
              <span className="gold-rule mx-auto mb-8" aria-hidden />
              <h2 className="text-display-lg mb-6 font-display text-surface">
                Votre cabinet mérite un collaborateur, <span className="italic text-gold-300">pas un logiciel de plus</span>
              </h2>
              <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-ink-muted-dark">
                Réservez une démonstration. Hector se connecte à votre stack en quelques minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#tarifs" className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-gold px-8 py-4 text-base font-medium text-ink-900 transition-all hover:bg-gold-300">
                  Commencer gratuitement
                </a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-line-dark px-8 py-4 text-base font-medium text-surface transition-all hover:border-gold-300 hover:text-gold-300">
                  Voir un bilan en live
                </a>
              </div>
            </ScrollReveal>
          </section>
        </main>

        <footer className="border-t border-line">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-xs text-ink-muted">
            <span>© {new Date().getFullYear()} Hector</span>
            <div className="flex gap-6">
              <Link href="/confidentialite" className="transition-colors hover:text-gold-800">RGPD</Link>
              <Link href="/mentions-legales" className="transition-colors hover:text-gold-800">Mentions légales</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
