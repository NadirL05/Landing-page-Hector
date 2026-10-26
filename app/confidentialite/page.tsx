import type { Metadata } from "next";
import { LegalSection, LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment hector.agentimpact.fr collecte, utilise et protège vos données personnelles, conformément au RGPD.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: true, follow: true },
};

const EMAIL = "nadir.lahyani@agentimpact.fr";
const LINK_CLASS = "underline decoration-gold underline-offset-4 transition-colors hover:text-ink";

interface ProcessingRow {
  purpose: string;
  data: string;
  legalBasis: string;
  retention: string;
}

// Traitements décrits d'après le code réel (mise à jour du 26/10/2026) :
//   - site hector.agentimpact.fr : app/page.tsx de ce dépôt
//       Stripe   → liens de paiement STRIPE_LINK_MONTHLY/YEARLY (mode LIVE depuis le 21/08/2026)
//       Calendly → CALENDLY_URL, ouvert dans un nouvel onglet
//       Vercel   → hébergement
//   - application Hector : dépôt NadirL05/patrimoine (apps/api/models/*,
//     apps/api/config.py, apps/web/vercel.json, apps/web/app/client.tsx).
//     Les intégrations optionnelles (Powens, HubSpot, Slack, Teams, WhatsApp)
//     ne sont appelées que si le cabinet les active. Pénélop n'est qu'un
//     squelette dans le code : volontairement absent de cette page.
// Ne rien ajouter ici qui ne soit pas vérifiable dans l'un de ces deux codes.
const PROCESSINGS: readonly ProcessingRow[] = [
  {
    purpose: "Réservation d'une démonstration",
    data: "Nom, adresse e-mail, créneau choisi et informations renseignées dans le formulaire Calendly",
    legalBasis: "Mesures précontractuelles à la demande de la personne",
    retention: "3 ans à compter du dernier contact",
  },
  {
    purpose: "Souscription via le lien de paiement (mode réel)",
    data: "Nom, adresse e-mail et informations de paiement traitées directement par Stripe",
    legalBasis: "Exécution du contrat d'abonnement",
    retention: "3 ans à compter du dernier contact, hors durées de conservation légales propres à Stripe pour les données de facturation",
  },
  {
    purpose: "Compte et abonnement du cabinet dans l'application Hector",
    data: "Nom du cabinet, logo et couleur de marque, identifiants des utilisateurs (adresse e-mail, nom), plan souscrit, statut d'abonnement et identifiants client et abonnement Stripe",
    legalBasis: "Exécution du contrat d'abonnement",
    retention: "Pendant la durée de l'abonnement ; les durées applicables après sa fin sont communiquées sur demande",
  },
  {
    purpose: "Dossiers patrimoniaux tenus par le cabinet dans l'application Hector",
    data: "Pour chaque client du cabinet : identité et coordonnées (nom, e-mail, téléphone), situation familiale (régime matrimonial, conjoint, personnes à charge), actifs, passifs, revenus et charges, contrats d'assurance-vie et clauses bénéficiaires, prévoyance, éléments fiscaux, opérations bancaires importées, documents déposés (relevés de compte, avis d'imposition, contrats d'assurance-vie, offres de prêt), profil investisseur (profil de risque, connaissances, capacité de perte, horizon, objectifs), comptes rendus de rendez-vous et rapports préparés",
    legalBasis: "Traitement effectué pour le compte du cabinet, qui détermine la finalité et la base légale applicables à ses clients",
    retention: "Durées définies avec le cabinet",
  },
  {
    purpose: "Messagerie conversationnelle (Slack, Microsoft Teams ou WhatsApp), si le cabinet l'active",
    data: "Identifiants du compte de messagerie de l'utilisateur et de l'espace de travail, journal des échanges avec Hector",
    legalBasis: "Exécution du contrat d'abonnement",
    retention: "Durées définies avec le cabinet",
  },
];

const PROCESSORS: readonly { name: string; role: string }[] = [
  { name: "Vercel Inc.", role: "Hébergement du site hector.agentimpact.fr et de l'application Hector" },
  { name: "Calendly LLC", role: "Prise de rendez-vous en ligne (widget ouvert sur calendly.com)" },
  {
    name: "Stripe Payments Europe, Ltd.",
    role: "Traitement des paiements et des abonnements (mode réel — un paiement effectué est un débit réel)",
  },
  { name: "Neon", role: "Base de données PostgreSQL de l'application Hector" },
  { name: "Clerk", role: "Authentification des utilisateurs de l'application Hector" },
  {
    name: "Anthropic, OpenRouter",
    role: "Modèles d'IA utilisés par l'application Hector (assistant, extraction de documents, comptes rendus) ; les éléments du dossier nécessaires à la demande leur sont transmis",
  },
  { name: "Sentry", role: "Suivi des erreurs techniques de l'application Hector" },
  {
    name: "Intégrations activées par le cabinet",
    role: "Powens (agrégation bancaire), HubSpot (CRM), Slack, Microsoft Teams, WhatsApp (Meta) : appelés uniquement si le cabinet connecte le service concerné",
  },
];

const RIGHTS: readonly string[] = [
  "Droit d'accès à vos données",
  "Droit de rectification des données inexactes",
  "Droit à l'effacement (« droit à l'oubli »)",
  "Droit à la limitation du traitement",
  "Droit d'opposition, notamment au traitement fondé sur l'intérêt légitime",
  "Droit à la portabilité de vos données",
];

export default function ConfidentialitePage() {
  return (
    <LegalShell
      kicker="Protection des données"
      title="Politique de confidentialité"
      lead="Ce document décrit les données traitées par le site hector.agentimpact.fr et par l'application Hector (app-hector.agentimpact.fr)."
      updated="26 octobre 2026"
    >
      <div className="space-y-12">
        <LegalSection title="1. Responsable du traitement">
          <p>
            Le responsable du traitement des données collectées sur hector.agentimpact.fr est Nadir Lahyani,
            entrepreneur individuel, 61 rue de Lyon, 75012 Paris, France. Pour toute question relative à
            vos données, écrivez à{" "}
            <a href={`mailto:${EMAIL}`} className={LINK_CLASS}>
              {EMAIL}
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="2. Le site et l&apos;application">
          <p>
            Le site hector.agentimpact.fr présente Hector et permet deux actions : réserver une démonstration et
            souscrire via le lien de paiement. L&apos;application Hector, accessible après connexion, est l&apos;outil
            utilisé par les cabinets abonnés.
          </p>
          <p>
            Pour les données que les cabinets enregistrent dans l&apos;application au sujet de leurs propres clients,
            le cabinet détermine les finalités du traitement ; l&apos;éditeur les traite pour son compte, afin de
            fournir le service. Les personnes concernées peuvent exercer leurs droits auprès de leur cabinet ou à
            l&apos;adresse ci-dessus.
          </p>
        </LegalSection>

        <LegalSection title="3. Données collectées, finalités, bases légales et durées de conservation">
          <div className="space-y-4">
            {PROCESSINGS.map((row) => (
              <div key={row.purpose} className="border border-rule bg-paper-alt p-5">
                <h3 className="mb-3 text-sm font-semibold leading-snug text-ink">{row.purpose}</h3>
                <dl className="space-y-2">
                  <div className="grid gap-1 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-4">
                    <dt className="letter-kicker text-ink-faint">Données</dt>
                    <dd className="text-sm leading-relaxed text-ink-soft">{row.data}</dd>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-4">
                    <dt className="letter-kicker text-ink-faint">Base légale</dt>
                    <dd className="text-sm leading-relaxed text-ink-soft">{row.legalBasis}</dd>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-4">
                    <dt className="letter-kicker text-ink-faint">Conservation</dt>
                    <dd className="text-sm leading-relaxed text-ink-soft">{row.retention}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p>
            Aucune donnée n&apos;est vendue, louée ou cédée à des tiers à des fins commerciales.
          </p>
        </LegalSection>

        <LegalSection title="4. Destinataires et sous-traitants">
          <p>
            Vos données sont traitées par Nadir Lahyani et par les prestataires techniques strictement nécessaires
            au fonctionnement de ce site et de l&apos;application Hector :
          </p>
          <ul className="space-y-3">
            {PROCESSORS.map((processor) => (
              <li key={processor.name} className="flex flex-col gap-1 border border-rule bg-paper-alt p-4 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="text-sm font-semibold text-ink sm:w-40 sm:flex-shrink-0">{processor.name}</span>
                <span className="text-sm leading-relaxed text-ink-soft">{processor.role}</span>
              </li>
            ))}
          </ul>
          <p>
            Plusieurs de ces prestataires sont établis hors de l&apos;Union européenne, notamment aux États-Unis, et
            sont susceptibles d&apos;y traiter des données. Le suivi des erreurs (Sentry) est configuré sur un point
            de collecte situé dans l&apos;Union européenne. La localisation de chaque traitement et les garanties
            encadrant les transferts (clauses contractuelles types de la Commission européenne ou décision
            d&apos;adéquation) sont communiquées sur demande à l&apos;adresse ci-dessus.
          </p>
        </LegalSection>

        <LegalSection title="5. Paiement">
          <p>
            Le lien de paiement affiché sur cette page fonctionne en <strong>mode réel</strong> : un paiement effectué
            constitue un débit réel, traité par Stripe. Les informations de paiement (numéro de carte, etc.) ne
            transitent jamais par les serveurs de ce site : elles sont saisies directement sur l&apos;interface
            sécurisée de Stripe, seul responsable de leur traitement conformément à sa propre politique de
            confidentialité.
          </p>
        </LegalSection>

        <LegalSection title="6. Cookies et mesure d'audience">
          <p>
            Ce site ne dépose aucun cookie de mesure d&apos;audience ni traceur publicitaire. Le module de prise de
            rendez-vous est fourni par Calendly et ne se charge que lorsque vous cliquez sur un lien Calendly, qui
            s&apos;ouvre dans un nouvel onglet vers calendly.com ; il dépose alors ses propres traceurs, soumis à la
            politique de confidentialité de son éditeur.
          </p>
          <p>
            L&apos;application Hector utilise les cookies nécessaires à l&apos;authentification de ses utilisateurs
            (Clerk).
          </p>
        </LegalSection>

        <LegalSection title="7. Sécurité">
          <p>
            Les échanges avec ce site et avec l&apos;application Hector sont chiffrés (HTTPS), de même que la
            connexion entre l&apos;application et sa base de données. Les données transmises via Calendly ou Stripe sont
            hébergées et sécurisées par ces prestataires, sur des infrastructures conformes à leurs standards de
            sécurité respectifs.
          </p>
        </LegalSection>

        <LegalSection title="8. Vos droits">
          <p>
            Conformément au Règlement général sur la protection des données (RGPD) et à la loi « Informatique et
            Libertés », vous disposez des droits suivants :
          </p>
          <ul className="grid gap-2.5">
            {RIGHTS.map((right) => (
              <li key={right} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                <span className="text-sm leading-relaxed text-ink-soft">{right}</span>
              </li>
            ))}
          </ul>
          <p>
            Pour exercer ces droits, écrivez à{" "}
            <a href={`mailto:${EMAIL}`} className={LINK_CLASS}>
              {EMAIL}
            </a>
            . Une réponse vous sera apportée dans un délai maximum d&apos;un mois. Si vous estimez, après nous avoir
            contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              www.cnil.fr
            </a>
            ).
          </p>
        </LegalSection>

        <LegalSection title="9. Évolution de cette politique">
          <p>
            Cette politique est mise à jour lorsque de nouveaux traitements de données sont mis en œuvre. Les{" "}
            <a href="/mentions-legales" className={LINK_CLASS}>
              mentions légales
            </a>{" "}
            complètent le présent document.
          </p>
        </LegalSection>
      </div>
    </LegalShell>
  );
}
