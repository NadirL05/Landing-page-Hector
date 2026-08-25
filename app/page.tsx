import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import softwareApplicationSchema from "@/public/schema/software-application.json";
import organizationSchema from "@/public/schema/organization.json";
import { FaqSection } from "@/components/faq-section";
import { TrustSection } from "@/components/trust-section";
import { WhatsAppMockup, BilanApercu } from "@/components/hero-mockups";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WealthSeal } from "@/components/wealth-seal";
import { PricingButton } from "@/components/pricing-button";

// Contenu source : Figma Make (figma.com/make/sh6K53CdXkJl0eAR5D7Vf0) + PRD 3
// Messaging & Value Prop (patrimoine repo). Refonte design v2 — passe
// anti-convergence dédiée : la v1 ("dark ink + gold/émeraude + Fraunces
// + folios géants") était la même DA que HostIA (dark luxury obsidienne/
// champagne) avec un autre accent. v2 = "lettre de cabinet de gestion de
// patrimoine française" : canvas papier quasi permanent, encre navy,
// or réduit à l'ornement. Voir Mobbin refs Titan (Annual Investor
// Letter, masthead) et Origin (bloc éditorial clair) citées en revue.
// 3 corrections historiques conservées : points retirés sur titres
// single-sentence, emoji remplacés par filet/typographie, "Bilan
// Patrimonial" → "Bilan patrimonial" (pas un nom de marque déposé).

// Prise de RDV Calendly, en option secondaire sous les CTA de paiement.
const CALENDLY_URL = "https://calendly.com/nadir-lahyani-agentimpact/30min";

// Audit sécu 24/08 (SEC-13), puis refonte 25/08 (SEC-14) : ces liens
// pointaient DIRECTEMENT vers /sign-up (créait un compte sans paiement, cf.
// historique dans le fix SEC-13), puis vers un Payment Link Stripe brut
// avant ça (créait un paiement sans compte). Le CTA lance maintenant un
// Stripe Checkout anonyme (PricingButton, /billing/checkout-public) — le
// paiement précède la création du compte, qui vient ensuite le réclamer
// via /sign-up?checkout_session_id=… → /activate. Voir
// patrimoine/apps/api/routers/billing.py.

const STEPS = [
  { n: "I", label: "Connecter", desc: "Hector se greffe sur vos outils existants — Harvest, Linxea, ou tout autre logiciel de votre cabinet. Aucune migration, aucun lock-in." },
  { n: "II", label: "Discuter", desc: "Envoyez-lui un message sur WhatsApp comme à un collègue. Demandez un bilan, une relance, un rapprochement." },
  { n: "III", label: "Recevoir", desc: "Il vous rend le travail fini : page de bilan interactive brandée à votre cabinet, relance envoyée, anomalie signalée." },
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

const TARIFS = [
  { periode: "Mensuel", prix: "149 €", unite: "/ mois", note: "—", cta: "Commencer", plan: "monthly" },
  { periode: "Annuel", prix: "1 490 €", unite: "/ an", note: "soit 124 €/mois · 2 mois offerts", cta: "Commencer", plan: "yearly" },
] as const;

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd data={organizationSchema} />
      <div className="min-h-screen bg-paper">
        {/* ===== MASTHEAD =====
            En-tête de courrier, pas une nav-bar SaaS : wordmark en petites
            capitales espacées, sous-titre en italique, liens texte plats
            (jamais de bouton pilule dans le header). Réf Titan masthead. */}
        <header className="border-b border-rule bg-paper">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-safe">
            <div>
              <p className="text-lg font-semibold tracking-[0.14em] text-ink">HECTOR</p>
              <p className="hidden font-display text-xs italic text-ink-faint sm:block">Pour cabinets de gestion de patrimoine indépendants</p>
            </div>
            <nav aria-label="Navigation principale" className="flex items-center gap-6 text-sm text-ink-soft">
              <a href="#confiance" className="hidden underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink sm:inline">
                Cadre de confiance
              </a>
              <a href="#tarifs" className="underline decoration-gold underline-offset-4 transition-colors hover:text-ink">
                Tarifs
              </a>
            </nav>
          </div>
        </header>

        <main>
          {/* ===== HERO =====
              Composition de lettre : colonne de texte 7/12 avec lettrine,
              une seule pièce jointe en vis-à-vis présentée comme une
              planche de rapport ("Fig. 1"), pas un collage de deux
              mockups pivotés qui se chevauchent (tic dark-fintech). */}
          <section className="border-b border-rule">
            <div className="mx-auto max-w-6xl px-safe pb-20 pt-16 lg:pb-28 lg:pt-20">
              <div className="grid items-start gap-16 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <p className="letter-kicker mb-6 text-ink-faint">Pour CGPI indépendants</p>
                  <h1 className="text-hero mb-8 font-display text-ink">
                    Pas un logiciel.
                    <br />
                    Un collaborateur.
                  </h1>
                  <p className="drop-cap mb-8 max-w-lg text-base leading-relaxed text-ink-soft lg:text-lg">
                    Hector se branche sur la stack de votre cabinet, vous discutez avec lui, il vous rend le travail fini — sans remplacer vos outils existants, sans nouveau tableau de bord à apprendre.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#tarifs" className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-transparent hover:text-ink">
                      Voir les tarifs
                    </a>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-rule-strong px-6 py-3 text-sm font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink">
                      Voir un bilan en live
                    </a>
                  </div>
                  <p className="mt-12 max-w-md border-t border-rule pt-6 text-sm leading-relaxed text-ink-faint">
                    Hector consolide automatiquement le suivi d&apos;un parc d&apos;actifs patrimoniaux, déclenche relances et alertes, et vous transmet chaque livrable via WhatsApp.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <figure className="border border-rule bg-paper-alt p-4">
                    <BilanApercu />
                    <figcaption className="mt-3 border-t border-rule pt-3 text-xs text-ink-faint">
                      Fig. 1 — Bilan patrimonial reçu sur WhatsApp. Exemple illustratif.
                    </figcaption>
                  </figure>
                  <figure className="mt-6 border border-rule bg-paper-alt p-4">
                    <WhatsAppMockup />
                    <figcaption className="mt-3 border-t border-rule pt-3 text-xs text-ink-faint">
                      Fig. 2 — Échange avec Hector. Exemple illustratif.
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* ===== ÉTAPES =====
              h2 sr-only : la section n'a pas de titre visible dans le
              design (kicker + h2 non prévus ici, contrairement aux
              sections suivantes), mais la hiérarchie sémantique doit
              rester continue (h1 hero → h2 → h3 "Connecter/Discuter/
              Recevoir"). Ne change rien visuellement. */}
          <section className="border-b border-rule bg-paper-alt">
            <div className="mx-auto max-w-6xl px-safe py-20">
              <h2 className="sr-only">Comment Hector s&apos;intègre à votre cabinet</h2>
              <div className="grid gap-0 divide-y divide-rule-strong lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                {STEPS.map((s, i) => (
                  <ScrollReveal key={s.n} delayMs={i * 100} className="px-6 py-8 first:pl-0 last:pr-0 lg:py-0">
                    <p className="mb-3 font-display text-sm italic text-gold-ink">Article {s.n}</p>
                    <h3 className="mb-3 text-xl font-semibold text-ink">{s.label}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{s.desc}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ===== DOULEURS =====
              Liste à filets, registre "clauses d'un courrier", pas une
              grille de cartes avec fond de survol coloré. */}
          <section className="mx-auto max-w-6xl px-safe py-24 lg:py-28">
            <ScrollReveal className="mb-14 max-w-xl">
              <p className="letter-kicker mb-3 text-ink-faint">Le quotidien</p>
              <h2 className="text-display-lg font-display text-ink">
                Ce qui ronge le temps d&apos;un cabinet
              </h2>
            </ScrollReveal>
            <div className="divide-y divide-rule border-y border-rule">
              {ENJEUX.map((e, i) => (
                <ScrollReveal key={e.title} delayMs={i * 60} className="grid gap-2 py-7 sm:grid-cols-12 sm:gap-8">
                  <h3 className="sm:col-span-4 font-medium leading-snug text-ink">{e.title}</h3>
                  <p className="sm:col-span-8 text-sm leading-relaxed text-ink-soft">{e.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* ===== BÉNÉFICES =====
              Deux planches de rapport côte à côte, filets et numérotation
              en note de bas de page — pas de fond gold/blanc translucide
              façon carte SaaS. */}
          <section className="border-t border-rule bg-paper-alt" id="demo">
            <div className="mx-auto max-w-6xl px-safe py-24 lg:py-28">
              <ScrollReveal className="mb-16 max-w-xl">
                <p className="letter-kicker mb-3 text-ink-faint">Ce que ça change</p>
                <h2 className="text-display-lg font-display text-ink">Deux bénéfices, dans cet ordre</h2>
              </ScrollReveal>
              <div className="grid gap-px overflow-hidden border border-rule bg-rule lg:grid-cols-2">
                <ScrollReveal className="bg-paper p-10">
                  <p className="footnote-mark mb-3 font-display text-sm text-gold-ink">1</p>
                  <h3 className="mb-4 font-display text-2xl leading-tight text-ink lg:text-3xl">Vos livrables deviennent votre argument commercial</h3>
                  <p className="leading-relaxed text-ink-soft">
                    Un bilan patrimonial interactif, brandé à votre cabinet, envoyé en 20 minutes : c&apos;est le livrable que vos clients montrent à leur entourage. Votre visibilité, votre revenu.
                  </p>
                  <p className="mt-6 border-t border-rule pt-4 text-sm font-medium text-gold-ink">Revenu et différenciation</p>
                </ScrollReveal>
                <ScrollReveal delayMs={80} className="bg-paper p-10">
                  <p className="footnote-mark mb-3 font-display text-sm text-ink-faint">2</p>
                  <h3 className="mb-4 font-display text-2xl leading-tight text-ink lg:text-3xl">Le répétitif tourne seul</h3>
                  <p className="leading-relaxed text-ink-soft">
                    Surveillance des portefeuilles, relances automatiques, alertes d&apos;anomalie — Hector s&apos;en occupe pendant que vous conseillez. Moins de charge mentale, plus de disponibilité pour vos clients.
                  </p>
                  <p className="mt-6 border-t border-rule pt-4 text-sm font-medium text-ink-faint">Temps et sérénité</p>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ===== TABLE COMPARATIVE — feuille de comparaison à filets ===== */}
          <section className="border-t border-rule">
            <div className="mx-auto max-w-6xl px-safe py-24 lg:py-28">
              <ScrollReveal className="mb-14 max-w-xl">
                <p className="letter-kicker mb-3 text-ink-faint">Positionnement</p>
                <h2 className="text-display-lg font-display text-ink">Ce que les autres ne font pas</h2>
              </ScrollReveal>
              {/* Conteneur scrollable + filet de dégradé sur le bord droit :
                  seul indice visuel mobile qu'il y a plus de colonnes à
                  droite (min-w-[640px] déborde sous ~640px de viewport).
                  Le dégradé disparaît à partir de lg, où la table tient
                  déjà dans la largeur du conteneur. */}
              <div className="relative -mx-6 px-6">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className="w-40 border-b border-rule-strong py-4 pr-6 text-left font-normal text-ink-faint" />
                        <th className="border-b-2 border-ink px-6 py-4 text-center">
                          <span className="font-display italic text-ink">Hector</span>
                        </th>
                        <th className="border-b border-rule-strong px-6 py-4 text-center font-normal text-ink-faint">Logiciels CGP classiques</th>
                        <th className="border-b border-rule-strong px-6 py-4 text-center font-normal text-ink-faint">ChatGPT générique</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON_ROWS.map((row) => (
                        <tr key={row.label}>
                          <td className="border-b border-rule py-4 pr-6 font-medium text-ink">{row.label}</td>
                          <td className="border-x border-b border-rule bg-paper-alt px-6 py-4 text-center font-medium text-ink">{row.hector}</td>
                          <td className="border-b border-rule px-6 py-4 text-center text-ink-soft">{row.classique}</td>
                          <td className="border-b border-rule px-6 py-4 text-center text-ink-soft">{row.gpt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-6 w-10 bg-gradient-to-l from-paper to-transparent lg:hidden"
                />
              </div>
            </div>
          </section>

          <TrustSection />

          <FaqSection />

          {/* ===== TARIFS — feuille tarifaire à filets, pas deux cartes
              concurrentes avec badge pilule ===== */}
          <section className="border-t border-rule" id="tarifs">
            <div className="mx-auto max-w-6xl px-safe py-24 lg:py-28">
              <ScrollReveal className="mb-14 max-w-xl">
                <p className="letter-kicker mb-3 text-ink-faint">Tarifs</p>
                <h2 className="text-display-lg font-display text-ink">Un collaborateur, un abonnement simple</h2>
              </ScrollReveal>
              <div className="max-w-2xl border-y border-rule">
                {TARIFS.map((t, i) => (
                  <div key={t.periode} className={`flex flex-wrap items-center justify-between gap-4 py-6 ${i === 0 ? "border-b border-rule" : ""}`}>
                    <div>
                      <p className="letter-kicker text-ink-faint">{t.periode}</p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="tabular font-display text-3xl text-ink">{t.prix}</span>
                        <span className="text-sm text-ink-faint">{t.unite}</span>
                      </div>
                      {t.note !== "—" && <p className="mt-1 text-xs text-gold-ink">{t.note}</p>}
                    </div>
                    <PricingButton plan={t.plan} className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-60">
                      {t.cta}
                    </PricingButton>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-ink-soft">
                Module supplémentaire : <span className="font-medium text-ink">+100 € / mois</span>
              </p>
              <p className="mt-1 text-xs text-ink-faint">
                Hypothèse tarifaire en cours de validation, pas encore vendue. Nous contacter pour valider votre configuration.
              </p>
            </div>
          </section>

          {/* ===== CTA FINAL — "sceau" =====
              Unique bande d'encre profonde de la page : clôture de lettre,
              pas une alternance systématique clair/sombre par section. */}
          <section className="grain-paper border-t border-rule bg-seal">
            <ScrollReveal className="relative mx-auto max-w-2xl px-safe py-24 text-center lg:py-28">
              <WealthSeal className="mb-8" />
              <h2 className="text-display-lg mb-6 font-display text-seal-paper">
                Votre cabinet mérite un collaborateur, pas un logiciel de plus
              </h2>
              <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-seal-soft lg:text-lg">
                Réservez une démonstration. Hector se connecte à votre stack en quelques minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#tarifs" className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-seal-paper bg-seal-paper px-7 py-3.5 text-sm font-medium text-seal transition-colors hover:bg-transparent hover:text-seal-paper">
                  Voir les tarifs
                </a>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-seal-soft px-7 py-3.5 text-sm font-medium text-seal-paper transition-colors hover:border-seal-paper">
                  Voir un bilan en live
                </a>
              </div>
            </ScrollReveal>
          </section>
        </main>

        <footer className="border-t border-rule">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-safe text-xs text-ink-faint">
            <span>© {new Date().getFullYear()} Hector</span>
            <div className="flex gap-6">
              <Link href="/confidentialite" className="transition-colors hover:text-ink">RGPD</Link>
              <Link href="/mentions-legales" className="transition-colors hover:text-ink">Mentions légales</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
