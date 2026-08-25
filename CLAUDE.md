# CLAUDE.md — Landing-page-Hector

Contexte projet pour tout agent IA (Cursor, Claude Code, etc.) bossant sur ce repo.

## Quoi

Landing page marketing seule pour **Hector**, collaborateur IA pour CGPI (cabinets de gestion de patrimoine indépendants). Next.js 15 App Router, TypeScript, Tailwind v4.

Pas l'outil. Juste la landing. L'outil (si/quand construit) vivra dans un repo séparé, sur un sous-domaine séparé (`app-hector.agentimpact.fr` probable, à confirmer avant de bâtir).

## Stack

- Next.js App Router, `next/font/google` (Inter) — jamais `@import` Google Fonts en CSS, toujours `next/font`
- Tailwind v4 via `@theme inline` dans `app/globals.css` — tokens oklch, pas de couleurs hardcodées ailleurs
- Déploiement Vercel, domaine cible `hector.agentimpact.fr`

## Design tokens (ne pas dupliquer, réutiliser)

Définis dans `app/globals.css` sous `@theme inline` : `--color-brand*` (échelle oklch 50→800), `--color-surface`, `--color-ink`, `--color-ink-muted`, `--radius-card`. Toute nouvelle couleur doit passer par un token nommé, jamais une valeur oklch inline non documentée.

## Règles de contenu (héritées de la session de build initiale — à respecter sur toute future modif)

- Titres single-sentence : jamais de point final.
- Pas d'emoji dans le contenu produit (secteur réglementé CGPI) — utiliser liseré de couleur / SVG à la place.
- "Bilan patrimonial" en bas de casse (pas "Bilan Patrimonial" — pas un nom de marque déposé).
- Tarifs (149€/mois, 1490€/an) : **validés commercialement (26/08/2026)** — la mention "Hypothèse tarifaire en cours de validation" a été retirée. Le module supplémentaire +100€/mois reste, lui, sans confirmation de vente à ce jour ; ne pas ajouter cette même mention ailleurs sans redemander confirmation à Nadir.
- JSON-LD : URL canonique = `https://hector.agentimpact.fr`, jamais un placeholder.
- Toute donnée chiffrée (KPI, %, exemples de bilan) doit être explicitement labellisée "exemple illustratif" — ne jamais laisser un chiffre passer pour une donnée client réelle.

## Ce qui n'est PAS encore fait

- Attache du sous-domaine `hector.agentimpact.fr` sur Vercel.
- Passage des agents SEO/GEO (`claude-seo:*`) sur cette landing — prévu en même temps que HostIA et PLU-IA, en une passe groupée une fois les 3 déployées.
- Relecture French proofreader finale avant merge.

## Repos liés

- `NadirL05/Landing-page-HostIA` — même pattern (landing seule, repo séparé de l'outil)
- `NadirL05/sas-plu-3d` — PLU-IA, en cours de split landing/outil (voir historique de session, pas encore fait)
