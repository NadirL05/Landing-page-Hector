import type { MetadataRoute } from "next";

// Landing mono-page : une seule route réelle. Les ancres (#confiance,
// #tarifs) ne sont pas des routes distinctes et ne doivent pas apparaître
// dans le sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://hector.agentimpact.fr",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
