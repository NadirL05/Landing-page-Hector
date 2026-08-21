import type { MetadataRoute } from "next";

// Landing + pages légales : les ancres (#confiance, #tarifs) ne sont pas
// des routes distinctes et ne doivent pas apparaître dans le sitemap.
//
// lastModified figé (pas new Date()) : sinon la valeur change à chaque build
// même sans modification de contenu réel, ce qui n'est pas un signal fiable
// pour les crawlers. Mettre à jour manuellement à chaque changement de fond.
const LAST_CONTENT_UPDATE = new Date("2026-08-21");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hector.agentimpact.fr",
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "weekly",
      priority: 1,
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
