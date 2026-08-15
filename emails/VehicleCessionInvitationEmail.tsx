import { Button, Section, Text } from '@react-email/components';
import { GarIqEmailLayout } from './GarIqEmailLayout';

export type VehicleCessionInvitationEmailProps = {
  inviteeEmail: string;
  vehicleLabel: string;
  inviterDisplayName: string;
  ctaUrl?: string;
};

const defaultCta = 'https://gariq.app/de';

export function VehicleCessionInvitationEmail({
  inviteeEmail,
  vehicleLabel,
  inviterDisplayName,
  ctaUrl = defaultCta,
}: VehicleCessionInvitationEmailProps) {
  const preview = `${inviterDisplayName} möchte dir das Fahrtenbuch „${vehicleLabel}“ übertragen`;

  return (
    <GarIqEmailLayout preview={preview}>
      <Text style={lead}>Hallo,</Text>
      <Text style={paragraph}>
        <strong>{inviterDisplayName}</strong> möchte dir das Fahrtenbuch für{' '}
        <strong>{vehicleLabel}</strong> übertragen.
      </Text>
      <Text style={paragraph}>
        Melde dich in der GarIQ-App mit der E-Mail-Adresse <strong>{inviteeEmail}</strong> an und
        nimm die Übertragung dort an oder lehne sie ab. Es gibt keine automatische Freigabe über
        diesen Link. Du brauchst einen bezahlten Plan und einen freien Fahrzeugplatz in einer
        Garage, deren Hauptinhaber du bist.
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
