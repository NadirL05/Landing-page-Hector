import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { OG_IMAGE } from "@/lib/seo";

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
    siteName: "Hector",
    locale: "fr_FR",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilan patrimonial avec l'IA | Hector",
    description:
      "Préparez plus rapidement des bilans patrimoniaux exploitables avec Hector.",
    images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
  },
};

export default function BilanPatrimonialIaPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-safe py-20 lg:py-28">
        <Breadcrumb name="Bilan patrimonial avec l'IA" path="/bilan-patrimonial-ia" />
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
        <section className="border-b border-rule py-10">
          <h2 className="font-display text-2xl text-ink">Un bilan demandé et reçu sur WhatsApp</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Vous demandez un bilan à Hector par message, sur WhatsApp. Il vous rend une page de bilan interactive brandée à votre cabinet, plutôt qu&apos;un PDF figé.
          </p>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Ce livrable peut devenir un argument commercial : c&apos;est le document que vos clients montrent à leur entourage.
          </p>
        </section>
        <section className="border-b border-rule py-10">
          <h2 className="font-display text-2xl text-ink">Des données consolidées avant le rendez-vous</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Les données d&apos;un client sont souvent dispersées entre custodiens, assureurs et logiciel interne, et les consolider à la main prend du temps. Hector consolide le suivi d&apos;un parc d&apos;actifs patrimoniaux à partir des outils déjà en place, comme Harvest ou Linxea, sans migration.
          </p>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Un modèle de langage lit et classe les documents entrants.
          </p>
        </section>
        <section className="border-b border-rule py-10">
          <h2 className="font-display text-2xl text-ink">L&apos;analyse reste celle du conseiller</h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Hector prépare, mais ne prend aucune décision d&apos;investissement. L&apos;analyse, la recommandation et la relation client restent sous la responsabilité du CGPI. Le suivi récurrent est automatisé ; le conseil et les arbitrages restent les vôtres.
          </p>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Les bilans présentés sur ce site sont des exemples illustratifs.
          </p>
        </section>
        <div className="mt-10 flex flex-wrap gap-5 text-sm">
          <Link href="/" className="font-medium text-ink underline underline-offset-4">Découvrir Hector</Link>
          <Link href="/assistant-ia-cgpi" className="text-ink-soft underline underline-offset-4">Assistant IA pour CGPI</Link>
          <Link href="/automatisation-cabinet-cgp" className="text-ink-soft underline underline-offset-4">Automatisation d&apos;un cabinet CGP</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
