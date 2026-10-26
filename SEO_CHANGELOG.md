# SEO_CHANGELOG — hector.agentimpact.fr

Journal des changements SEO, du plus récent au plus ancien. Chaque entrée renvoie à l'audit qui la justifie et dit comment la vérifier.

## 2026-10-26 — Corrections issues de l'audit SEO/GEO du 26/10/2026

Source : audit RosoAI SEO/GEO V4 (`SEO_AUDIT_2026-10-26.md`, relais 03, 07 et 22), accord de Nadir du 26/10 (« go pour tout, relie les sites »). Branche `seo/fix-gsc-indexation`.

| Changement | Fichiers | Vérification |
|---|---|---|
| En-tête et pied de page communs (accueil, pages légales, 3 pages métier) | `components/site-chrome.tsx`, `app/page.tsx`, `components/legal-shell.tsx`, `app/*/page.tsx` | liens vers /, /#tarifs, pages légales et pages métier présents sur chaque page |
| Lien « Un produit AgentImpact » vers `https://www.agentimpact.fr/`. JSON-LD Organization aligné sur www (`@id`, `url`, `sameAs`). | `components/site-chrome.tsx`, `public/schema/*.json` | `npm run seo:check -- --external` |
| og:image (image existante de l'accueil, 1200×630) et image Twitter sur les 3 pages métier | `lib/seo.ts`, `app/{assistant-ia-cgpi,automatisation-cabinet-cgp,bilan-patrimonial-ia}/page.tsx` | règle og:image de `seo:check` |
| Fil d'Ariane visible et BreadcrumbList JSON-LD sur les 3 pages métier | `components/breadcrumb.tsx`, `lib/seo.ts` | JSON-LD parsé par `seo:check` |
| Section « Par usage » dans le corps de l'accueil, avec des liens vers les 3 pages métier | `app/page.tsx` | HTML de `/` |
| 3 pages métier étoffées (de 71-85 mots à environ 300), uniquement avec des faits déjà publiés. Sources phrase par phrase dans la PR. lastmod du sitemap : 2026-10-26. | `app/*/page.tsx`, `app/sitemap.ts` | relecture de Nadir |
| Script `scripts/seo-check.mjs` (`npm run seo:check`) | `scripts/seo-check.mjs`, `package.json` | sortie « seo-check : OK » |

Titles (31 à 40 caractères) et meta descriptions (144 à 145 caractères) des 3 pages : déjà uniques et dans les bornes, donc inchangés.

Retour arrière : `git revert` du commit concerné. Aucune URL créée, déplacée ni supprimée.

Après déploiement (Nadir) : demande d'indexation de `/assistant-ia-cgpi` et `/automatisation-cabinet-cgp` (« détectée, non indexée ») et de `/bilan-patrimonial-ia` dans Search Console, puis nouvelle soumission du sitemap.
