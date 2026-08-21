import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { ConsentGate } from "@/components/analytics/consent-gate";
import { GoogleTag } from "@/components/analytics/google-tag";
import { MetaPixel } from "@/components/analytics/meta-pixel";
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
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
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
      <head>
        {/*
         * consentmanager.net (CMP) : même compte que plu-ia-work (id
         * 175740, domaine racine agentimpact.fr couvre les sous-domaines,
         * config fournisseurs déjà correcte — Facebook Meta → Marketing,
         * Google Analytics → Mesure). Positionnement en tête de <head> :
         * n'atteint pas leur prérequis "premier script du document" sous
         * Next.js App Router — sans conséquence, ConsentGate ne dépend pas
         * de leur "automatic blocking" DOM, seulement du dataLayer Consent
         * Mode v2 qu'ils y poussent.
         */}
        {/*
         * cmp_setlang="FR" : force le français côté bannière au lieu de
         * suivre la langue du navigateur (fallback EN sinon — paramètre
         * officiel `cmp_setlang`, doc consentmanager.net "client-side
         * configuration options"). Contenu statique, pas d'input externe.
         * `async` : audit SEO 2026-08-21, le script synchrone faisait de la
         * bannière elle-même l'élément LCP (render-blocking) ; ConsentGate
         * ne dépendant pas de l'automatic-blocking DOM (cf. ci-dessus),
         * async est sans risque.
         */}
        <script>{'window.cmp_setlang="FR";'}</script>
        <script
          async
          type="text/javascript"
          data-cmp-ab="1"
          src="https://cdn.consentmanager.net/delivery/js/semiautomatic.min.js"
          data-cmp-cdid="a9d3fcbcd2398"
          data-cmp-host="a.delivery.consentmanager.net"
          data-cmp-cdn="cdn.consentmanager.net"
          data-cmp-codesrc="0"
        />
      </head>
      <body>
        {/*
         * GoogleTag/MetaPixel ne se montent qu'après consentement (Google
         * Consent Mode v2, lu depuis dataLayer — voir consent-gate.tsx).
         */}
        <ConsentGate category="analytics">
          <GoogleTag />
        </ConsentGate>
        <ConsentGate category="marketing">
          <MetaPixel />
        </ConsentGate>
        {children}
      </body>
    </html>
  );
}
