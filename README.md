This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Vitrine sur Cloudflare Workers

Depuis la racine du dépôt, `npm ci` puis `npm run build:worker` produisent la vitrine dans `out/`. Le build traduit les en-têtes de Next.js pour les assets Cloudflare. Les liens internes, les métadonnées et les deux offres Hector sont inclus dans l’export. Le seul traitement serveur sur Workers est le relais `/monitoring` vers le projet Sentry de la vitrine. Les boutons de paiement continuent d’appeler l’application Hector directement depuis le navigateur.

Pour la recette locale, exécuter `npx wrangler dev --local`. Pour vérifier le paquet sans publier, exécuter `npx wrangler deploy --dry-run`. Pour placer une version en prévisualisation, utiliser `npx wrangler versions upload` avec le compte Cloudflare autorisé. Le fichier Wrangler laisse les domaines de production gérés séparément. Après validation de la version et de ses parcours, le responsable du domaine peut l’activer sur `hector.agentimpact.fr`.

Le build Next.js habituel reste disponible avec `npm run build`.
