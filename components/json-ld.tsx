// Le JSON-LD doit être injecté INLINE dans le <script type="application/ld+json">.
// Un <script> dont le type n'est pas un type JS/module valide est traité par les
// navigateurs (et les robots, y compris Googlebot) comme un "data block" : seul
// le contenu texte inline est lu, `src` n'est JAMAIS chargé (WHATWG HTML spec,
// https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type).
// On ne passe jamais `data` comme enfant JSX (l'échappement JSX casserait le
// JSON) : on sérialise nous-mêmes via JSON.stringify puis on injecte le HTML
// via dangerouslySetInnerHTML. `data` provient toujours de fichiers JSON
// statiques contrôlés par l'équipe (public/schema/*.json), jamais d'une
// entrée utilisateur.
//
// Audit sécu 24/08 : JSON.stringify() seul n'échappe pas "<". Si une valeur
// contenait un jour "</script><script>...", ça casserait le data-block et
// permettrait l'injection d'un script actif. Pas exploitable aujourd'hui
// (aucun "<" dans les JSON statiques actuels), mais JsonLd est un composant
// générique réutilisable par un futur contributeur avec des données moins
// statiques — on échappe "<" en < par précaution, correction gratuite.
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
