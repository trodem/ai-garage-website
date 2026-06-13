import { Button, Section, Text } from '@react-email/components';
import { GarIqEmailLayout } from './GarIqEmailLayout';

export type GarageInvitationEmailProps = {
  inviteeEmail: string;
  garageName: string;
  inviterDisplayName: string;
  roleLabel: string;
  ctaUrl?: string;
};

const defaultCta = 'https://gariq.app/de';

export function GarageInvitationEmail({
  inviteeEmail,
  garageName,
  inviterDisplayName,
  roleLabel,
  ctaUrl = defaultCta,
}: GarageInvitationEmailProps) {
  const preview = `${inviterDisplayName} hat dich zu „${garageName}“ eingeladen`;

  return (
    <GarIqEmailLayout preview={preview}>
      <Text style={lead}>Hallo,</Text>
      <Text style={paragraph}>
        <strong>{inviterDisplayName}</strong> hat dich eingeladen, dem Garagen-Workspace{' '}
        <strong>{garageName}</strong> beizutreten — Rolle: <strong>{roleLabel}</strong>.
      </Text>
      <Text style={paragraph}>
        Melde dich in der GarIQ-App mit der E-Mail-Adresse <strong>{inviteeEmail}</strong> an und
        nimm die Einladung dort an oder lehne sie ab. Es gibt keine automatische Freigabe über
        diesen Link.
      </Text>
      <Section style={buttonSection}>
        <Button href={ctaUrl} style={button}>
          GarIQ im Browser öffnen
        </Button>
      </Section>
      <Text style={muted}>
        Falls du noch kein Konto hast, registriere dich mit derselben E-Mail-Adresse und öffne die
        App erneut.
      </Text>
    </GarIqEmailLayout>
  );
}

const lead = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#18181b',
  margin: '0 0 12px',
};

const paragraph = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#3f3f46',
  margin: '0 0 16px',
};

const muted = {
  fontSize: '13px',
  lineHeight: '20px',
  color: '#71717a',
  margin: '16px 0 0',
};

const buttonSection = {
  margin: '24px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};
