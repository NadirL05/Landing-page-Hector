import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Assistant IA pour CGPI",
  description:
    "Hector aide les CGPI à automatiser le suivi patrimonial, les relances et la préparation de livrables sans ajouter un nouveau logiciel à piloter.",
  alternates: { canonical: "/assistant-ia-cgpi" },
  robots: { index: true, follow: true },
};

export default function AssistantIaCgpiPage() {
  return (
    <main className="mx-auto max-w-4xl px-safe py-20 lg:py-28">
      <p className="letter-kicker mb-4 text-ink-faint">Hector pour les CGPI</p>
      <h1 className="text-display-lg font-display text-ink">Assistant IA pour CGPI</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Hector se connecte à la stack de votre cabinet pour centraliser le suivi patrimonial,
        préparer les relances et vous transmettre des livrables exploitables, notamment via WhatsApp.
      </p>
      <section className="mt-14 border-y border-rule py-10">
        <h2 className="font-display text-2xl text-ink">Ce qu&apos;Hector automatise</h2>
        <ul className="mt-6 space-y-4 text-ink-soft">
          <li>Suivi d&apos;un parc d&apos;actifs patrimoniaux et détection d&apos;anomalies.</li>
          <li>Relances et rappels sur les tâches répétitives du cabinet.</li>
          <li>Préparation et transmission de bilans patrimoniaux illustratifs.</li>
        </ul>
      </section>
      <div className="mt-10 flex flex-wrap gap-5 text-sm">
        <Link href="/" className="font-medium text-ink underline underline-offset-4">Découvrir Hector</Link>
        <Link href="/automatisation-cabinet-cgp" className="text-ink-soft underline underline-offset-4">Automatisation d&apos;un cabinet CGP</Link>
        <Link href="/bilan-patrimonial-ia" className="text-ink-soft underline underline-offset-4">Bilan patrimonial avec l&apos;IA</Link>
      </div>
    </main>
  );
}
