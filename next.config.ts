import type { NextConfig } from "next";

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
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
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

export default nextConfig;
