import type { MetadataRoute } from "next";

// Landing + pages légales : les ancres (#confiance, #tarifs) ne sont pas
// des routes distinctes et ne doivent pas apparaître dans le sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hector.agentimpact.fr",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://hector.agentimpact.fr/mentions-legales",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: "https://hector.agentimpact.fr/confidentialite",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
