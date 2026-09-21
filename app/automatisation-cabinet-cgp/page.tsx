import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automatisation d'un cabinet CGP",
  description:
    "Automatisez les tâches répétitives d'un cabinet de gestion de patrimoine avec Hector : suivi, relances, alertes et préparation de livrables.",
  alternates: { canonical: "/automatisation-cabinet-cgp" },
  robots: { index: true, follow: true },
};

export default function AutomatisationCabinetCgpPage() {
  return (
    <main className="mx-auto max-w-4xl px-safe py-20 lg:py-28">
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
      <div className="mt-10 flex flex-wrap gap-5 text-sm">
        <Link href="/" className="font-medium text-ink underline underline-offset-4">Découvrir Hector</Link>
        <Link href="/assistant-ia-cgpi" className="text-ink-soft underline underline-offset-4">Assistant IA pour CGPI</Link>
        <Link href="/bilan-patrimonial-ia" className="text-ink-soft underline underline-offset-4">Bilan patrimonial avec l&apos;IA</Link>
      </div>
    </main>
  );
}
