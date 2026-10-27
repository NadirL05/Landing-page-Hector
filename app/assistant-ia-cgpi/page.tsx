import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Assistant IA pour CGPI",
  description:
    "Hector aide les CGPI à suivre leur parc patrimonial et à préparer bilans et brouillons de relance, sans ajouter un nouveau logiciel à piloter.",
  alternates: { canonical: "/assistant-ia-cgpi" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Assistant IA pour CGPI | Hector",
    description:
      "Hector aide les CGPI à suivre leur parc patrimonial et à préparer bilans et brouillons de relance, sans ajouter un nouveau logiciel à piloter.",
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
      "Suivi patrimonial, bilans et brouillons de relance préparés avec Hector.",
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
          Hector part des données de votre cabinet pour centraliser le suivi patrimonial,
          préparer des brouillons de relance et vous transmettre des bilans exploitables. Un bilan se demande aussi sur WhatsApp.
        </p>
        <section className="mt-14 border-y border-rule py-10">
          <h2 className="font-display text-2xl text-ink">Ce qu&apos;Hector automatise</h2>
          <ul className="mt-6 space-y-4 text-ink-soft">
            <li>Suivi d&apos;un parc d&apos;actifs patrimoniaux et détection d&apos;anomalies.</li>
            <li>Brouillons de relance pour les pièces manquantes, que vous relisez et envoyez vous-même.</li>
            <li>Préparation et transmission de bilans patrimoniaux illustratifs.</li>
          </ul>
        </section>
        <section className="border-b border-rule py-10">
          <h2 className="font-display text-2xl text-ink">Un bilan demandé depuis WhatsApp</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Pour obtenir un bilan, pas besoin d&apos;ouvrir un nouveau tableau de bord : vous envoyez un message à Hector sur WhatsApp, une interface que vous utilisez déjà, comme à un collègue. Il vous répond par un lien sécurisé vers le bilan, sans aucun montant dans la conversation.
          </p>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Le reste du travail vous attend dans l&apos;application : une page de bilan interactive brandée à votre cabinet, des brouillons de relance prêts à relire et à envoyer, et les points d&apos;attention signalés.
          </p>
        </section>
        <section className="border-b border-rule py-10">
          <h2 className="font-display text-2xl text-ink">Branché sur les outils du cabinet</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Hector part de vos données existantes : import de fichiers CSV ou Excel, connexion HubSpot, agrégation bancaire. Pas de migration ni de lock-in. Il ne remplace pas votre logiciel : il ajoute une couche proactive, avec brouillons de relance, bilans et points d&apos;attention.
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
