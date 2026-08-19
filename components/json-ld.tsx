// Le JSON-LD doit être injecté INLINE dans le <script type="application/ld+json">.
// Un <script> dont le type n'est pas un type JS/module valide est traité par les
// navigateurs (et les robots, y compris Googlebot) comme un "data block" : seul
// le contenu texte inline est lu, `src` n'est JAMAIS chargé (WHATWG HTML spec,
// https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type).
// On ne passe jamais `data` comme enfant JSX (l'échappement JSX casserait le
// JSON) : on sérialise nous-mêmes via JSON.stringify puis on injecte le HTML
// via dangerouslySetInnerHTML. C'est sûr ici : `data` provient toujours de
// fichiers JSON statiques contrôlés par l'équipe (public/schema/*.json),
// jamais d'une entrée utilisateur — donc pas de risque XSS.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
