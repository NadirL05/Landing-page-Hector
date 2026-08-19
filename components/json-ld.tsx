// Le JSON-LD est servi comme fichier statique dans public/schema/ et
// référencé via `src`, jamais injecté comme enfant texte du <script>.
// Un enfant JSX passe par l'échappement JSX de React (guillemets → \"),
// ce qui casse le parsing JSON côté Google/robots IA. `src` pointe vers
// un fichier JSON brut, non affecté par cet échappement.
export function JsonLd({ src }: { src: string }) {
  return <script type="application/ld+json" src={src} async />;
}
