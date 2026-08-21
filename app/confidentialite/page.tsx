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

// Traitements réellement mis en œuvre par CE site (landing pré-lancement) —
// pas d'invention d'un régime de traitement pour un produit Hector qui
// n'existe pas encore (pas de WhatsApp, pas de données patrimoniales).
// Vérifiés un par un contre app/page.tsx :
//   - Stripe  → liens de paiement STRIPE_LINK_MONTHLY/YEARLY (mode LIVE depuis le 21/08/2026)
//   - Calendly → CALENDLY_URL, ouvert dans un nouvel onglet
//   - Vercel  → hébergement de ce site
const PROCESSINGS: readonly ProcessingRow[] = [
  {
    purpose: "Réservation d'une démonstration",
    data: "Nom, adresse e-mail, créneau choisi et informations renseignées dans le formulaire Calendly",
    legalBasis: "Mesures précontractuelles à la demande de la personne",
    retention: "3 ans à compter du dernier contact",
  },
  {
    purpose: "Inscription via le lien de paiement (mode réel)",
    data: "Nom, adresse e-mail et informations de paiement traitées directement par Stripe",
    legalBasis: "Exécution du contrat de réservation",
    retention: "3 ans à compter du dernier contact, hors durées de conservation légales propres à Stripe pour les données de facturation",
  },
];

const PROCESSORS: readonly { name: string; role: string }[] = [
  { name: "Vercel Inc.", role: "Hébergement du site hector.agentimpact.fr" },
  { name: "Calendly LLC", role: "Prise de rendez-vous en ligne (widget ouvert sur calendly.com)" },
  {
    name: "Stripe Payments Europe, Ltd.",
    role: "Traitement des paiements via les liens de paiement Stripe (mode réel — un paiement effectué est un débit réel)",
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
      lead="Ce document décrit les données réellement collectées sur hector.agentimpact.fr aujourd'hui — pas les traitements d'un produit encore en construction."
    >
      <div className="space-y-12">
        <LegalSection title="1. Responsable du traitement">
          <p>
            Le responsable du traitement des données collectées sur hector.agentimpact.fr est Nadir Lahyani,
            entrepreneur individuel, 200 rue de la Croix Nivert, 75015 Paris, France. Pour toute question relative à
            vos données, écrivez à{" "}
            <a href={`mailto:${EMAIL}`} className={LINK_CLASS}>
              {EMAIL}
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="2. Un site de pré-lancement, pas encore un produit">
          <p>
            Hector n&apos;est pas encore un produit disponible : ce site présente l&apos;offre à venir. Aucune donnée
            patrimoniale, aucune intégration WhatsApp ou logiciel de cabinet n&apos;existe à ce stade — décrire un tel
            traitement serait inexact. Seules les données collectées via les deux actions possibles sur cette page
            (réserver une démonstration, s&apos;inscrire via le lien de paiement) sont traitées, comme détaillé
            ci-dessous.
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
            au fonctionnement de ce site :
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
            Ces prestataires sont susceptibles de traiter des données en dehors de l&apos;Union européenne
            (notamment Vercel Inc. et Stripe Payments Europe, Ltd., dont l&apos;infrastructure s&apos;appuie sur des
            centres de données situés hors de France). Ces transferts sont encadrés par les garanties prévues par le
            RGPD (clauses contractuelles types de la Commission européenne ou décision d&apos;adéquation).
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
        </LegalSection>

        <LegalSection title="7. Sécurité">
          <p>
            Les échanges avec ce site sont chiffrés (HTTPS). Les données transmises via Calendly ou Stripe sont
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
            À mesure que Hector passe de landing page à produit réellement disponible (intégration WhatsApp,
            connexion aux logiciels des cabinets), cette politique sera mise à jour pour refléter les nouveaux
            traitements de données mis en œuvre — jamais l&apos;inverse. Les{" "}
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
