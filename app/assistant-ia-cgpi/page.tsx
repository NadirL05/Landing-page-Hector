import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Assistant IA pour CGPI",
  description:
    "Hector aide les CGPI à automatiser le suivi patrimonial, les relances et la préparation de livrables sans ajouter un nouveau logiciel à piloter.",
  alternates: { canonical: "/assistant-ia-cgpi" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Assistant IA pour CGPI | Hector",
    description:
      "Hector aide les CGPI à automatiser le suivi patrimonial, les relances et la préparation de livrables sans ajouter un nouveau logiciel à piloter.",
    url: "https://hector.agentimpact.fr/assistant-ia-cgpi",
    siteName: "Hector",
    locale: "fr_FR",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Assistant IA pour CGPI | Hector",
    description:
      "Automatisez suivi patrimonial, relances et préparation de livrables avec Hector.",
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
  },
};

export default function AssistantIaCgpiPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-safe py-20 lg:py-28">
        <Breadcrumb name="Assistant IA pour CGPI" path="/assistant-ia-cgpi" />
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
        <section className="border-b border-rule py-10">
          <h2 className="font-display text-2xl text-ink">Un assistant que l&apos;on pilote depuis WhatsApp</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Hector se pilote depuis WhatsApp, une interface que vous utilisez déjà : pas de nouveau tableau de bord à mémoriser, pas de formation longue. Vous lui envoyez un message comme à un collègue pour demander un bilan, une relance ou un rapprochement.
          </p>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Il vous rend ensuite le travail fini : une page de bilan interactive brandée à votre cabinet, une relance envoyée ou une anomalie signalée.
          </p>
        </section>
        <section className="border-b border-rule py-10">
          <h2 className="font-display text-2xl text-ink">Branché sur les outils du cabinet</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Hector se greffe sur vos outils existants, comme Harvest, Linxea ou tout autre logiciel de votre cabinet, sans migration ni lock-in. Il ne remplace pas votre logiciel : il ajoute une couche conversationnelle et proactive, avec relances automatiques, bilans et alertes.
          </p>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Chaque cabinet aura un accès isolé, sans mutualisation de données entre clients, avec un chiffrement au repos et en transit.
          </p>
        </section>
        <section className="border-b border-rule py-10">
          <h2 className="font-display text-2xl text-ink">Le conseil reste celui du CGPI</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Aucune décision d&apos;investissement n&apos;est automatisée. Hector consolide, alerte et prépare ; la décision reste toujours celle du CGPI, conformément au principe de non-substitution au conseil réglementé.
          </p>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Hector est commercialisé, aux tarifs affichés sur le site : 149 € par mois ou 1 490 € par an.
          </p>
        </section>
        <div className="mt-10 flex flex-wrap gap-5 text-sm">
          <Link href="/" className="font-medium text-ink underline underline-offset-4">Découvrir Hector</Link>
          <Link href="/automatisation-cabinet-cgp" className="text-ink-soft underline underline-offset-4">Automatisation d&apos;un cabinet CGP</Link>
          <Link href="/bilan-patrimonial-ia" className="text-ink-soft underline underline-offset-4">Bilan patrimonial avec l&apos;IA</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
