import type { MetadataRoute } from "next";

// Landing + pages légales : les ancres (#confiance, #tarifs) ne sont pas
// des routes distinctes et ne doivent pas apparaître dans le sitemap.
//
// lastModified figé (pas new Date()) : sinon la valeur change à chaque build
// même sans modification de contenu réel, ce qui n'est pas un signal fiable
// pour les crawlers. Mettre à jour manuellement à chaque changement de fond.
const LAST_CONTENT_UPDATE = new Date("2026-08-21");
// Pages métier étoffées (en-tête, pied de page, contenu) le 26/10/2026,
// puis phrases non sourcées retirées le même jour (QA SEO, relais 20).
const TOPIC_PAGES_UPDATE = new Date("2026-10-26");
// Accueil : section « Par usage », en-tête et pied de page modifiés le
// 26/10/2026 (PR #20).
const HOME_UPDATE = new Date("2026-10-26");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hector.agentimpact.fr",
      lastModified: HOME_UPDATE,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://hector.agentimpact.fr/assistant-ia-cgpi",
      lastModified: TOPIC_PAGES_UPDATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://hector.agentimpact.fr/automatisation-cabinet-cgp",
      lastModified: TOPIC_PAGES_UPDATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://hector.agentimpact.fr/bilan-patrimonial-ia",
      lastModified: TOPIC_PAGES_UPDATE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://hector.agentimpact.fr/mentions-legales",
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://hector.agentimpact.fr/confidentialite",
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
