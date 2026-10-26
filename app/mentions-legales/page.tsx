import type { Metadata } from "next";
import { LegalRow, LegalSection, LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de hector.agentimpact.fr : éditeur, hébergeur, propriété intellectuelle et droit applicable.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

const EMAIL = "nadir.lahyani@agentimpact.fr";

export default function MentionsLegalesPage() {
  return (
    <LegalShell
      kicker="Informations légales"
      title="Mentions légales"
      lead="Identification de l'éditeur du site hector.agentimpact.fr, conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique."
      updated="26 octobre 2026"
    >
      <div className="space-y-12">
        <LegalSection title="1. Éditeur du site">
          <dl>
            <LegalRow label="Raison sociale">LAHYANI NADIR</LegalRow>
            <LegalRow label="Nom commercial">
              AgentImpact — Hector est un produit édité par AgentImpact
            </LegalRow>
            <LegalRow label="Forme juridique">Entrepreneur individuel</LegalRow>
            <LegalRow label="Siège">61 rue de Lyon, 75012 Paris, France</LegalRow>
            <LegalRow label="SIREN">942 311 333</LegalRow>
            <LegalRow label="SIRET">942 311 333 00010 (établissement unique)</LegalRow>
            <LegalRow label="TVA intracommunautaire">FR58942311333</LegalRow>
            <LegalRow label="Immatriculation">RCS Paris, le 21/03/2025</LegalRow>
            <LegalRow label="Code NAF / APE">
              7490B — Activités spécialisées, scientifiques et techniques diverses
            </LegalRow>
            <LegalRow label="Responsable de la publication">Nadir Lahyani</LegalRow>
            <LegalRow label="Contact">
              <a href={`mailto:${EMAIL}`} className="underline decoration-gold underline-offset-4 transition-colors hover:text-ink">
                {EMAIL}
              </a>
            </LegalRow>
          </dl>
        </LegalSection>

        <LegalSection title="2. Hébergeur">
          <p>
            Le site hector.agentimpact.fr et l&apos;application Hector (app-hector.agentimpact.fr) sont hébergés par
            Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —{" "}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4 transition-colors hover:text-ink">
              vercel.com
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="3. Le produit Hector">
          <p>
            Hector est commercialisé sous forme d&apos;abonnement, aux tarifs affichés sur ce site : 149 € par mois ou
            1 490 € par an. La souscription passe par un lien de paiement Stripe en <strong>mode réel</strong> (un
            paiement effectué est un débit réel, traité par Stripe). Ce site permet aussi de réserver une
            démonstration. Les données traitées par ce site et par l&apos;application Hector sont décrites dans la{" "}
            <a href="/confidentialite" className="underline decoration-gold underline-offset-4 transition-colors hover:text-ink">
              politique de confidentialité
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="4. Propriété intellectuelle">
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, visuels, logo, structure, éléments graphiques)
            est la propriété exclusive de Nadir Lahyani, sauf mention contraire. Toute reproduction, représentation,
            adaptation ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite et
            constitue une contrefaçon au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>
        </LegalSection>

        <LegalSection title="5. Responsabilité">
          <p>
            Les informations publiées sur ce site sont fournies à titre indicatif et peuvent être modifiées à tout
            moment. L&apos;éditeur met tout en œuvre pour en assurer l&apos;exactitude, sans pouvoir en garantir
            l&apos;exhaustivité. Les liens vers des sites tiers (Calendly, Stripe) sont proposés à titre de commodité :
            leur contenu n&apos;engage pas la responsabilité de l&apos;éditeur.
          </p>
        </LegalSection>

        <LegalSection title="6. Données personnelles et cookies">
          <p>
            Le traitement de vos données personnelles est détaillé dans notre{" "}
            <a href="/confidentialite" className="underline decoration-gold underline-offset-4 transition-colors hover:text-ink">
              politique de confidentialité
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="7. Droit applicable">
          <p>
            Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut de
            résolution amiable, les tribunaux français sont seuls compétents.
          </p>
        </LegalSection>
      </div>
    </LegalShell>
  );
}
