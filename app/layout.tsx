import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Serif éditorial pour les titres — signe distinctif "private banking",
// jamais utilisé pour le corps de texte (lisibilité).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const SITE_URL = "https://hector.agentimpact.fr";

export const metadata: Metadata = {
  title: {
    default: "Hector — pas un logiciel, un collaborateur | Pour CGPI",
    template: "%s | Hector",
  },
  description:
    "Hector consolide le suivi patrimonial de votre cabinet, déclenche relances et rapprochements, et vous rend le travail fini — sur WhatsApp.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Hector",
    title: "Hector — pas un logiciel, un collaborateur",
    description:
      "Hector se branche sur la stack de votre cabinet, vous discutez avec lui, il vous rend le travail fini.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hector — pas un logiciel, un collaborateur",
    description: "Pour CGPI indépendants. Connecter · Discuter · Recevoir.",
  },
};

// viewport-fit=cover : la bande d'encre "sceau" et le masthead sont
// plein-bleed jusqu'aux bords — sans cover, iOS laisse une marge de
// sécurité blanche non stylée de part et d'autre en paysage (notch).
// width/initialScale reprennent le défaut Next.js explicitement, car
// déclarer `viewport` remplace entièrement la balise générée par défaut.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
