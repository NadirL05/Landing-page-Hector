import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

// Next.js émet déjà `<meta name="robots" content="noindex">` sur une 404 :
// `robots: null` évite une seconde balise (le `index, follow` hérité du
// layout). `alternates: null` retire la canonical vers l'accueil héritée du
// layout, sans objet sur une page d'erreur (QA SEO du 26/10/2026, même
// correction que sur fonciable.fr).
export const metadata: Metadata = {
  title: "Page introuvable",
  robots: null,
  alternates: null,
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-safe py-20 lg:py-28">
        <p className="letter-kicker mb-4 text-ink-faint">Erreur 404</p>
        <h1 className="text-display-lg font-display text-ink">Page introuvable</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          L&apos;adresse a peut-être changé.
        </p>
        <div className="mt-10 flex flex-wrap gap-5 text-sm">
          <Link href="/" className="font-medium text-ink underline underline-offset-4">Revenir à l&apos;accueil d&apos;Hector</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
