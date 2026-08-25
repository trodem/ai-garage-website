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

export type VehicleCessionRevokedEmailProps = {
  recipientEmail: string;
  vehicleLabel: string;
  actorDisplayName: string;
  ctaUrl?: string;
};

export function VehicleCessionRevokedEmail({
  recipientEmail,
  vehicleLabel,
  actorDisplayName,
  ctaUrl = EMAIL_SITE_DE,
}: VehicleCessionRevokedEmailProps) {
  const preview = `Übertragung von „${vehicleLabel}“ zurückgezogen`;

  return (
    <GarIqEmailLayout preview={preview}>
      <Text style={emailLeadStyle}>Hallo,</Text>
      <Text style={emailParagraphStyle}>
        <strong>{actorDisplayName}</strong> hat die Übertragung des Fahrtenbuchs{' '}
        <strong>{vehicleLabel}</strong> zurückgezogen.
      </Text>
      <Text style={emailParagraphStyle}>
        Die Einladung für <strong>{recipientEmail}</strong> ist nicht mehr gültig. Du kannst das
        Fahrtenbuch nicht mehr über die App annehmen, es sei denn, du erhältst eine neue Einladung.
      </Text>
      <Section style={emailButtonSectionStyle}>
        <Button href={ctaUrl} style={emailCtaButtonStyle}>
          GarIQ im Browser öffnen
        </Button>
      </Section>
      <Text style={emailMutedStyle}>
        Bei Fragen wende dich direkt an die Person, die die Übertragung gestartet hat.
      </Text>
    </GarIqEmailLayout>
  );
}
