# SEO_CHANGELOG — hector.agentimpact.fr

Journal des changements SEO, du plus récent au plus ancien. Chaque entrée renvoie à l'audit qui la justifie et dit comment la vérifier.

## 2026-10-26 (bis) — Corrections de la QA SEO du 26/10/2026 (relais 20)

Source : `20_qa_apres_correction.md` (QA adversariale après mise en production), corrections 1 (tarifs uniquement), 2, 4 et 8 de la liste. Branche `fix/qa2-seo`.

| Changement | Fichiers | Vérification |
|---|---|---|
| Retrait des phrases de la PR #20 tirées seulement de l'étude de cas www/hector et non retrouvées dans le code d'Hector : alertes et relances sur « condition et destinataire définis », « canal unique » d'alertes, conditions modifiables « sans reconstruire l'outil », lecture « des fichiers déjà utilisés », transmission des « cas ambigus » avec leur contexte, rapprochement « pièces attendues / pièces reçues », « situations à examiner » avec les informations rassemblées. Conservé : la classification des documents par un modèle de langage, corroborée par le code (`apps/api/pipeline/extraction/classifier.py`). Deux H2 suivent le contenu restant. | `app/automatisation-cabinet-cgp/page.tsx`, `app/bilan-patrimonial-ia/page.tsx` | relecture de Nadir |
| lastmod de l'accueil au 2026-10-26 (section « Par usage », en-tête et pied de page modifiés ce jour-là) | `app/sitemap.ts` | `/sitemap.xml` |
| Page 404 : une seule balise robots `noindex`, sans canonical vers l'accueil | `app/not-found.tsx` | HTML de `_not-found` dans le build |
| Tarifs : la mention « hypothèse en cours de validation commerciale » est retirée partout (bloc confiance, FAQ visible, JSON-LD `FAQPage`, `llms.txt`, Agent Skill `site-overview` et son digest). Elle est remplacée par les montants déjà affichés (149 € par mois, 1 490 € par an). Décision de Nadir du 26/10/2026 : « les tarifs sont validés ». | `components/trust-section.tsx`, `components/faq-section.tsx`, `public/schema/faq.json`, `public/llms.txt`, `public/.well-known/agent-skills/*` | grep « hypothèse » sans résultat dans `app`, `components` et `public` |

Non traité (décision de Nadir en attente) : la phrase « phase de construction » et les « cabinets pilotes » (accueil, FAQ, `/assistant-ia-cgpi`).

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
