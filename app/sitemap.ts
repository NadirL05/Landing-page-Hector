import type { MetadataRoute } from "next";

// Landing + pages légales : les ancres (#confiance, #tarifs) ne sont pas
// des routes distinctes et ne doivent pas apparaître dans le sitemap.
//
// lastModified figé (pas new Date()) : sinon la valeur change à chaque build
// même sans modification de contenu réel, ce qui n'est pas un signal fiable
// pour les crawlers. Mettre à jour manuellement à chaque changement de fond.
// Pages légales réécrites le 26/10/2026 (Hector commercialisé, traitements
// de l'application décrits d'après le code du produit).
const LEGAL_PAGES_UPDATE = new Date("2026-10-26");
// Pages métier étoffées (en-tête, pied de page, contenu) le 26/10/2026,
// puis phrases non sourcées retirées le même jour (QA SEO, relais 20),
// puis alignées sur le produit le 27/10/2026 (intégrations, relances, WhatsApp).
const TOPIC_PAGES_UPDATE = new Date("2026-10-27");
// Accueil : section « Par usage », en-tête et pied de page modifiés le
// 26/10/2026 (PR #20), textes alignés sur le produit le 27/10/2026.
const HOME_UPDATE = new Date("2026-10-27");

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
      lastModified: LEGAL_PAGES_UPDATE,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://hector.agentimpact.fr/confidentialite",
      lastModified: LEGAL_PAGES_UPDATE,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
