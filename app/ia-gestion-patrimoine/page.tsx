import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IA pour la gestion de patrimoine | Hector",
  description: "Découvrez comment Hector utilise l’IA pour assister les professionnels de la gestion de patrimoine dans le suivi, l’analyse et la préparation des dossiers clients.",
  alternates: { canonical: "https://hector.agentimpact.fr/ia-gestion-patrimoine" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "IA pour la gestion de patrimoine | Hector",
    description: "Découvrez comment Hector utilise l’IA pour assister les professionnels de la gestion de patrimoine dans le suivi, l’analyse et la préparation des dossiers clients.",
    url: "https://hector.agentimpact.fr/ia-gestion-patrimoine",
    type: "website",
    locale: "fr_FR",
    siteName: "Hector",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <article className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
        <Link href="/" className="text-sm text-gold-ink hover:underline">← Retour à Hector</Link>
        <p className="letter-kicker mt-12 text-ink-faint">Hector · Pour les professionnels du patrimoine</p>
        <h1 className="mt-4 font-display text-4xl leading-tight lg:text-6xl">L’IA au service de la gestion de patrimoine</h1>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-soft">Hector aide les professionnels de la gestion de patrimoine à structurer le suivi client, accélérer la préparation des dossiers et automatiser les opérations répétitives.</p>
        <div className="mt-16 divide-y divide-rule border-y border-rule">
          <section className="py-10">
            <h2 className="font-display text-2xl">Une IA reliée à vos outils</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">Hector s’appuie sur les données accessibles dans votre environnement de travail plutôt que sur un chatbot isolé.</p>
          </section>
          <section className="py-10">
            <h2 className="font-display text-2xl">Un assistant orienté exécution</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">L’objectif n’est pas seulement de répondre à une question, mais de préparer les actions, relances et livrables dont le cabinet a besoin.</p>
          </section>
          <section className="py-10">
            <h2 className="font-display text-2xl">Un rôle complémentaire au conseiller</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">Hector automatise le répétitif afin que le conseiller conserve le temps nécessaire à l’analyse, à la relation client et au conseil.</p>
          </section>
        </div>
        <div className="mt-14 flex flex-wrap gap-4">
          <Link href="/#demo" className="rounded-[var(--radius-btn)] border border-ink bg-ink px-6 py-3 text-sm font-medium text-paper">Découvrir Hector</Link>
          <Link href="/#tarifs" className="rounded-[var(--radius-btn)] border border-rule-strong px-6 py-3 text-sm font-medium text-ink">Voir les tarifs</Link>
        </div>
      </article>
    </main>
  );
}
