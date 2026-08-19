// JSON passé en enfant texte d'un <script> — React échappe le contenu,
// pas de risque XSS, pas besoin d'injection HTML brute.
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  );
}
