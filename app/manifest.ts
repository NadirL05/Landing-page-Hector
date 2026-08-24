import type { MetadataRoute } from "next";

// Audit SEO/GEO 24/08 : icon-512.png existait dans public/ mais n'était
// référencé nulle part (ni metadata.icons, ni manifest) — asset orphelin.
// Convention Next.js native : ce fichier généra /manifest.webmanifest
// automatiquement, pas besoin d'un fichier statique dans public/.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hector — collaborateur IA pour CGPI",
    short_name: "Hector",
    description:
      "Hector consolide le suivi patrimonial d'un cabinet de gestion de patrimoine, déclenche relances et rapprochements, et livre le travail fini via WhatsApp.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDFBF7",
    theme_color: "#0D0716",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
