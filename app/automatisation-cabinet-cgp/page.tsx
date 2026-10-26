import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Automatisation d'un cabinet CGP",
  description:
    "Automatisez les tâches répétitives d'un cabinet de gestion de patrimoine avec Hector : suivi, relances, alertes et préparation de livrables.",
  alternates: { canonical: "/automatisation-cabinet-cgp" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Automatisation d'un cabinet CGP | Hector",
    description:
      "Automatisez les tâches répétitives d'un cabinet de gestion de patrimoine avec Hector : suivi, relances, alertes et préparation de livrables.",
    url: "https://hector.agentimpact.fr/automatisation-cabinet-cgp",
    siteName: "Hector",
    locale: "fr_FR",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatisation d'un cabinet CGP | Hector",
    description:
      "Suivi, relances, alertes et préparation de livrables pour les cabinets CGP.",
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
  },
};

export default function AutomatisationCabinetCgpPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-safe py-20 lg:py-28">
        <Breadcrumb name="Automatisation d'un cabinet CGP" path="/automatisation-cabinet-cgp" />
        <p className="letter-kicker mb-4 text-ink-faint">Automatisation cabinet</p>
        <h1 className="text-display-lg font-display text-ink">Automatisation d&apos;un cabinet CGP</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Hector automatise une partie du travail répétitif sans remplacer vos outils existants :
          surveillance, relances, alertes et préparation de livrables pour vous laisser davantage de temps de conseil.
        </p>
        <section className="mt-14 border-y border-rule py-10">
          <h2 className="font-display text-2xl text-ink">Une automatisation intégrée à votre stack</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            L&apos;objectif n&apos;est pas d&apos;ajouter un tableau de bord supplémentaire, mais de connecter Hector à votre environnement
            et de recevoir le travail terminé dans vos canaux habituels.
          </p>
        </section>
        <section className="border-b border-rule py-10">
          <h2 className="font-display text-2xl text-ink">Les tâches répétitives qui ralentissent un cabinet</h2>
          <ul className="mt-6 space-y-4 text-ink-soft">
            <li>Une vigilance qui repose sur une personne : un départ, un congé ou une surcharge, et la surveillance du portefeuille ralentit ou s&apos;arrête.</li>
            <li>Des données dispersées entre custodiens, assureurs et logiciel interne, qu&apos;il faut consolider à la main.</li>
            <li>Des relances au fil de l&apos;eau : clause bénéficiaire à mettre à jour, document manquant, échéance d&apos;arbitrage.</li>
            <li>Du temps d&apos;expert perdu en surveillance, alors que la valeur que vous vendez, c&apos;est le conseil.</li>
          </ul>
        </section>
        <section className="border-b border-rule py-10">
          <h2 className="font-display text-2xl text-ink">La décision reste au conseiller</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Hector traite les tâches récurrentes et prépare le dossier. Aucune décision d&apos;investissement n&apos;est automatisée. Le conseil, la relation client et les arbitrages restent les vôtres.
          </p>
        </section>
        <div className="mt-10 flex flex-wrap gap-5 text-sm">
          <Link href="/" className="font-medium text-ink underline underline-offset-4">Découvrir Hector</Link>
          <Link href="/assistant-ia-cgpi" className="text-ink-soft underline underline-offset-4">Assistant IA pour CGPI</Link>
          <Link href="/bilan-patrimonial-ia" className="text-ink-soft underline underline-offset-4">Bilan patrimonial avec l&apos;IA</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
