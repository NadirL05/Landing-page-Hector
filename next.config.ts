import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

// CSP notes:
// - `script-src 'self' 'unsafe-inline'`: the inline JSON-LD <script type="application/ld+json">
//   blocks (components/json-ld.tsx) are data blocks per the WHATWG spec, not script — they are
//   not subject to script-src at all. 'unsafe-inline' here is for Next.js's own inline
//   hydration/RSC payload scripts, which ship without nonces on static export-style pages.
// - `worker-src 'self' blob:`: React Three Fiber / three.js (components/wealth-seal-canvas.tsx,
//   the lazy-loaded coin-stack scene) can spin up blob-URL workers for shader/texture work
//   depending on the WebGL backend — allow blob: defensively so the 3D scene never silently
//   fails under CSP.
// - `img-src`/`font-src 'self' data:`: next/image and next/font inline small assets as data URIs.
// GoogleTag/MetaPixel/CMP ajoutés le 21/08 (même compte consentmanager.net
// que plu-ia-work, id 175740) : chargent des scripts externes, sans ces
// domaines en script-src la CSP les bloquait silencieusement (cf. incident
// GA4 plu-ia-work — voir CLAUDE.md de ce repo-là).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://cdn.consentmanager.net https://*.delivery.consentmanager.net",
  "style-src 'self' 'unsafe-inline'",
  // *.delivery.consentmanager.net : le pixel de preuve de consentement
  // (/delivery/info/) tourne sur le sous-domaine wildcard, pas sur
  // cdn.consentmanager.net — sans lui, bloqué sur chaque page vue, avant
  // toute interaction (confirmé via console Playwright réelle le 21/08,
  // audit SEO). Wildcard déjà présent en connect-src, manquait en img-src.
  "img-src 'self' data: blob: https://www.facebook.com https://cdn.consentmanager.net https://*.delivery.consentmanager.net",
  "font-src 'self' data:",
  // app-hector.agentimpact.fr : API Hector (patrimoine/apps/api) appelée
  // directement en cross-origin par components/pricing-button.tsx
  // (POST /api/billing/checkout-public) — sans elle, CSP bloque silencieusement
  // le clic sur les CTA tarifs (constaté en prod : "Refused to connect because
  // it violates the document's Content Security Policy").
  "connect-src 'self' https://app-hector.agentimpact.fr https://www.google-analytics.com https://www.facebook.com https://cdn.consentmanager.net https://*.delivery.consentmanager.net https://consentmanager.mgr.consensu.org",
  "worker-src 'self' blob:",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Security headers on every route.
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
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

export default withSentryConfig(nextConfig, {
  org: "agentimpact",
  project: "landing-hector",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  webpack: {
    automaticVercelMonitors: true,
    treeshake: { removeDebugLogging: true },
  },
});
