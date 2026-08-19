import Link from "next/link";
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
  children: ReactNode;
}

export function LegalShell({ kicker, title, lead, children }: LegalShellProps) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-rule bg-paper">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-safe">
          <Link href="/">
            <p className="text-lg font-semibold tracking-[0.14em] text-ink">HECTOR</p>
            <p className="hidden font-display text-xs italic text-ink-faint sm:block">Pour cabinets de gestion de patrimoine indépendants</p>
          </Link>
          <nav aria-label="Navigation principale" className="flex items-center gap-6 text-sm text-ink-soft">
            <Link href="/#tarifs" className="underline decoration-gold underline-offset-4 transition-colors hover:text-ink">
              Tarifs
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="border-b border-rule">
          <div className="mx-auto max-w-3xl px-safe pb-16 pt-16 lg:pt-20">
            <span className="gold-rule mb-6" aria-hidden="true" />
            <p className="letter-kicker mb-3 text-ink-faint">{kicker}</p>
            <h1 className="text-display-lg mb-4 font-display text-ink">{title}</h1>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft">{lead}</p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-safe py-16 lg:py-20">{children}</section>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-safe text-xs text-ink-faint">
          <span>© {new Date().getFullYear()} Hector</span>
          <div className="flex gap-6">
            <Link href="/confidentialite" className="transition-colors hover:text-ink">RGPD</Link>
            <Link href="/mentions-legales" className="transition-colors hover:text-ink">Mentions légales</Link>
          </div>
        </div>
      </footer>
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
