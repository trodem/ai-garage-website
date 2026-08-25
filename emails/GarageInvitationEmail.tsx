import { Button, Section, Text } from '@react-email/components';
import {
  EMAIL_SITE_DE,
  emailButtonSectionStyle,
  emailCtaButtonStyle,
  emailLeadStyle,
  emailMutedStyle,
  emailParagraphStyle,
} from './emailBrand';
import { GarIqEmailLayout } from './GarIqEmailLayout';

export type GarageInvitationEmailProps = {
  inviteeEmail: string;
  garageName: string;
  inviterDisplayName: string;
  roleLabel: string;
  ctaUrl?: string;
};

export function GarageInvitationEmail({
  inviteeEmail,
  garageName,
  inviterDisplayName,
  roleLabel,
  ctaUrl = EMAIL_SITE_DE,
}: GarageInvitationEmailProps) {
  const preview = `${inviterDisplayName} hat dich zu „${garageName}“ eingeladen`;

  return (
    <GarIqEmailLayout preview={preview}>
      <Text style={emailLeadStyle}>Hallo,</Text>
      <Text style={emailParagraphStyle}>
        <strong>{inviterDisplayName}</strong> hat dich eingeladen, dem Garagen-Workspace{' '}
        <strong>{garageName}</strong> beizutreten — Rolle: <strong>{roleLabel}</strong>.
      </Text>
      <Text style={emailParagraphStyle}>
        Melde dich in der GarIQ-App mit der E-Mail-Adresse <strong>{inviteeEmail}</strong> an und
        nimm die Einladung dort an oder lehne sie ab. Es gibt keine automatische Freigabe über
        diesen Link.
      </Text>
      <Section style={emailButtonSectionStyle}>
        <Button href={ctaUrl} style={emailCtaButtonStyle}>
          GarIQ im Browser öffnen
        </Button>
      </Section>
      <Text style={emailMutedStyle}>
        Falls du noch kein Konto hast, registriere dich mit derselben E-Mail-Adresse und öffne die
        App erneut.
      </Text>
    </GarIqEmailLayout>
  );
}
