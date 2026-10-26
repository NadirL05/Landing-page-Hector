export const SITE_URL = "https://hector.agentimpact.fr";

// Image OG de l'accueil (app/opengraph-image.tsx, 1200×630, générée au build).
// Audit SEO 26/10/2026 : les pages qui déclarent leur propre `openGraph`
// remplacent celui du layout et perdaient cette image. On la référence donc
// explicitement. Aucune nouvelle image n'est créée.
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Hector — pas un logiciel, un collaborateur. Pour CGPI indépendants.",
} as const;
