import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

// Fil d'Ariane visible + BreadcrumbList JSON-LD, pour que les données
// structurées décrivent ce que la page affiche réellement.
export function Breadcrumb({ name, path }: { name: string; path: string }) {
  const items = [
    { name: "Accueil", path: "/" },
    { name, path },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Fil d'Ariane" className="mb-8 text-xs text-ink-faint">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="underline underline-offset-4 transition-colors hover:text-ink">Hector</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{name}</li>
        </ol>
      </nav>
    </>
  );
}
