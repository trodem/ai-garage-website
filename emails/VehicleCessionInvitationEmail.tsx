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

export type VehicleCessionInvitationEmailProps = {
  inviteeEmail: string;
  vehicleLabel: string;
  inviterDisplayName: string;
  ctaUrl?: string;
};

export function VehicleCessionInvitationEmail({
  inviteeEmail,
  vehicleLabel,
  inviterDisplayName,
  ctaUrl = EMAIL_SITE_DE,
}: VehicleCessionInvitationEmailProps) {
  const preview = `${inviterDisplayName} möchte dir das Fahrtenbuch „${vehicleLabel}“ übertragen`;

  return (
    <GarIqEmailLayout preview={preview}>
      <Text style={emailLeadStyle}>Hallo,</Text>
      <Text style={emailParagraphStyle}>
        <strong>{inviterDisplayName}</strong> möchte dir das Fahrtenbuch für{' '}
        <strong>{vehicleLabel}</strong> übertragen.
      </Text>
      <Text style={emailParagraphStyle}>
        Melde dich in der GarIQ-App mit der E-Mail-Adresse <strong>{inviteeEmail}</strong> an und
        nimm die Übertragung dort an oder lehne sie ab. Es gibt keine automatische Freigabe über
        diesen Link. Du brauchst einen bezahlten Plan und einen freien Fahrzeugplatz in einer
        Garage, deren Hauptinhaber du bist.
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
