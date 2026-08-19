import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Link headers (RFC 8288) — découverte par agents IA sur la homepage.
        // Pas d'api-catalog : aucune API publique n'existe pour Hector.
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</.well-known/mcp/server-card.json>; rel="service-desc"',
              '</sitemap.xml>; rel="sitemap"',
            ].join(", "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
