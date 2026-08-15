import { Button, Section, Text } from '@react-email/components';
import { GarIqEmailLayout } from './GarIqEmailLayout';

export type VehicleCessionRevokedEmailProps = {
  recipientEmail: string;
  vehicleLabel: string;
  actorDisplayName: string;
  ctaUrl?: string;
};

const defaultCta = 'https://gariq.app/de';

export function VehicleCessionRevokedEmail({
  recipientEmail,
  vehicleLabel,
  actorDisplayName,
  ctaUrl = defaultCta,
}: VehicleCessionRevokedEmailProps) {
  const preview = `Übertragung von „${vehicleLabel}“ zurückgezogen`;

  return (
    <GarIqEmailLayout preview={preview}>
      <Text style={lead}>Hallo,</Text>
      <Text style={paragraph}>
        <strong>{actorDisplayName}</strong> hat die Übertragung des Fahrtenbuchs{' '}
        <strong>{vehicleLabel}</strong> zurückgezogen.
      </Text>
      <Text style={paragraph}>
        Die Einladung für <strong>{recipientEmail}</strong> ist nicht mehr gültig. Du kannst das
        Fahrtenbuch nicht mehr über die App annehmen, es sei denn, du erhältst eine neue Einladung.
      </Text>
      <Section style={buttonSection}>
        <Button href={ctaUrl} style={button}>
          GarIQ im Browser öffnen
        </Button>
      </Section>
      <Text style={muted}>
        Bei Fragen wende dich direkt an die Person, die die Übertragung gestartet hat.
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
