import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import type { ReactNode } from "react";

// Coquille commune aux pages légales (mentions-légales, confidentialité) —
// même masthead et même pied de page que app/page.tsx, registre "lettre de
// cabinet" (canvas papier, encre navy, filet or en ornement rare). Extrait
// dans un composant dédié pour ne pas dupliquer le masthead/footer de la
// landing tout en gardant page.tsx intact.
interface LegalShellProps {
  kicker: string;
  title: string;
  lead: string;
  /** Date affichée « Dernière mise à jour », ex. « 26 octobre 2026 ». */
  updated?: string;
  children: ReactNode;
}

export function LegalShell({ kicker, title, lead, updated, children }: LegalShellProps) {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      <main>
        <section className="border-b border-rule">
          <div className="mx-auto max-w-3xl px-safe pb-16 pt-16 lg:pt-20">
            <span className="gold-rule mb-6" aria-hidden="true" />
            <p className="letter-kicker mb-3 text-ink-faint">{kicker}</p>
            <h1 className="text-display-lg mb-4 font-display text-ink">{title}</h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft">{lead}</p>
            {updated ? (
              <p className="mt-4 text-sm text-ink-faint">Dernière mise à jour : {updated}</p>
            ) : null}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-safe py-16 lg:py-20">{children}</section>
      </main>

      <SiteFooter />
    </div>
  );
}

// Bloc de section légale : titre + contenu, filet supérieur, registre
// "article de courrier" cohérent avec ScrollReveal/ENJEUX de la landing.
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-rule pt-8 first:border-t-0 first:pt-0">
      <h2 className="mb-4 text-lg font-semibold text-ink">{title}</h2>
      <div className="space-y-4 text-sm leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

// Ligne d'identification "libellé : valeur" pour le bloc éditeur.
export function LegalRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-rule py-3 last:border-b-0 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-4">
      <dt className="letter-kicker text-ink-faint sm:pt-[3px]">{label}</dt>
      <dd className="text-sm leading-relaxed text-ink">{children}</dd>
    </div>
  );
}
