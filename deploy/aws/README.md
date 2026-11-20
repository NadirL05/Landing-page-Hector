# Hector — préparation AWS

Source : production Vercel 0395f1cb40350983aa24bed0e2119a79c7fc6715.

Installation npm ci verrouillée et compilation : réussies sur AWS. Exécution next start vérifiée en HTTP local, avec réponse 200 sur la page d’accueil et le sitemap ; X-Frame-Options: DENY conservé. Les services de test ont été arrêtés après vérification.

Le Dockerfile conserve le serveur Next.js, ses en-têtes et ses routes. Aucun export statique ne supprime les fonctions du framework. Les secrets et fichiers de contexte sont exclus du contexte Docker.

Image Docker à construire et à tester avec un compte de déploiement habilité ; épingler ensuite le digest de l’image de base. Injecter les paramètres publics d’analytics au build via le mécanisme géré par l’opérateur si nécessaire.

Avant bascule : vérifier le proxy HTTPS, les certificats, les pages et CTA ; conserver la cible DNS précédente. Le compte Superset actuel ne peut ni gérer Docker ni modifier le tunnel. Aucun DNS public basculé.
