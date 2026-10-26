import Link from "next/link";

// En-tête et pied de page communs à toutes les pages (accueil, pages métier,
// pages légales). Audit SEO 26/10/2026 : les 3 pages métier n'avaient ni
// en-tête ni pied de page, donc aucun lien vers les pages légales, les tarifs
// ou les autres pages du site. Registre "lettre de cabinet" inchangé : même
// masthead et même pied de page que la landing d'origine.

// Sur l'accueil, les ancres restent locales (#tarifs) et le wordmark n'est
// pas un lien vers la page courante ; ailleurs, elles renvoient vers "/".
export function SiteHeader({ onHome = false }: { onHome?: boolean }) {
  const anchor = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const wordmark = (
    <>
      <p className="text-lg font-semibold tracking-[0.14em] text-ink">HECTOR</p>
      <p className="hidden font-display text-xs italic text-ink-faint sm:block">Pour cabinets de gestion de patrimoine indépendants</p>
    </>
  );

  return (
    <header className="border-b border-rule bg-paper">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-safe">
        {onHome ? <div>{wordmark}</div> : <Link href="/">{wordmark}</Link>}
        <nav aria-label="Navigation principale" className="flex items-center gap-6 text-sm text-ink-soft">
          <a href={anchor("confiance")} className="hidden underline decoration-rule-strong underline-offset-4 transition-colors hover:text-ink sm:inline">
            Cadre de confiance
          </a>
          <a href={anchor("tarifs")} className="underline decoration-gold underline-offset-4 transition-colors hover:text-ink">
            Tarifs
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-safe py-6 text-xs text-ink-faint">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} Hector</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/assistant-ia-cgpi" className="transition-colors hover:text-ink">Assistant IA pour CGPI</Link>
            <Link href="/automatisation-cabinet-cgp" className="transition-colors hover:text-ink">Automatisation cabinet CGP</Link>
            <Link href="/bilan-patrimonial-ia" className="transition-colors hover:text-ink">Bilan patrimonial IA</Link>
            <Link href="/confidentialite" className="transition-colors hover:text-ink">RGPD</Link>
            <Link href="/mentions-legales" className="transition-colors hover:text-ink">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
