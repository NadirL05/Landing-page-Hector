import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bilan patrimonial avec l'IA",
  description:
    "Hector aide les CGPI à préparer et transmettre plus rapidement des bilans patrimoniaux exploitables à partir des données suivies par le cabinet.",
  alternates: { canonical: "/bilan-patrimonial-ia" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Bilan patrimonial avec l'IA | Hector",
    description:
      "Hector aide les CGPI à préparer et transmettre plus rapidement des bilans patrimoniaux exploitables à partir des données suivies par le cabinet.",
    url: "https://hector.agentimpact.fr/bilan-patrimonial-ia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilan patrimonial avec l'IA | Hector",
    description:
      "Préparez plus rapidement des bilans patrimoniaux exploitables avec Hector.",
  },
};

export default function BilanPatrimonialIaPage() {
  return (
    <main className="mx-auto max-w-4xl px-safe py-20 lg:py-28">
      <p className="letter-kicker mb-4 text-ink-faint">Livrables patrimoniaux</p>
      <h1 className="text-display-lg font-display text-ink">Bilan patrimonial avec l&apos;IA</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Hector aide le cabinet à consolider le suivi patrimonial et à préparer des bilans plus rapidement,
        tout en laissant au conseiller la responsabilité de l&apos;analyse et de la relation client.
      </p>
      <section className="mt-14 border-y border-rule py-10">
        <h2 className="font-display text-2xl text-ink">Du suivi au livrable</h2>
        <p className="mt-5 leading-relaxed text-ink-soft">
          Les informations suivies par le cabinet peuvent être rapprochées, structurées et restituées sous forme de livrable,
          afin de réduire le temps consacré aux opérations répétitives avant le rendez-vous client.
        </p>
      </section>
      <div className="mt-10 flex flex-wrap gap-5 text-sm">
        <Link href="/" className="font-medium text-ink underline underline-offset-4">Découvrir Hector</Link>
        <Link href="/assistant-ia-cgpi" className="text-ink-soft underline underline-offset-4">Assistant IA pour CGPI</Link>
        <Link href="/automatisation-cabinet-cgp" className="text-ink-soft underline underline-offset-4">Automatisation d&apos;un cabinet CGP</Link>
      </div>
    </main>
  );
}
