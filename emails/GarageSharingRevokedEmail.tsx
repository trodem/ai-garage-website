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

export type GarageSharingRevokedKind = 'pending_invitation' | 'member_access';

export type GarageSharingRevokedEmailProps = {
  kind: GarageSharingRevokedKind;
  recipientEmail: string;
  garageName: string;
  actorDisplayName: string;
  roleLabel?: string;
  ctaUrl?: string;
};

export function GarageSharingRevokedEmail({
  kind,
  recipientEmail,
  garageName,
  actorDisplayName,
  roleLabel,
  ctaUrl = EMAIL_SITE_DE,
}: GarageSharingRevokedEmailProps) {
  const preview =
    kind === 'pending_invitation'
      ? `Einladung zu „${garageName}“ zurückgezogen`
      : `Zugriff auf „${garageName}“ entfernt`;

  return (
    <GarIqEmailLayout preview={preview}>
      <Text style={emailLeadStyle}>Hallo,</Text>
      {kind === 'pending_invitation' ? (
        <>
          <Text style={emailParagraphStyle}>
            <strong>{actorDisplayName}</strong> hat die Einladung zum Garagen-Workspace{' '}
            <strong>{garageName}</strong>
            {roleLabel != null ? (
              <>
                {' '}
                (Rolle: <strong>{roleLabel}</strong>)
              </>
            ) : null}{' '}
            zurückgezogen.
          </Text>
          <Text style={emailParagraphStyle}>
            Die Einladung für <strong>{recipientEmail}</strong> ist nicht mehr gültig. Du kannst
            den Workspace nicht mehr über die App annehmen, es sei denn, du erhältst eine neue
            Einladung.
          </Text>
        </>
      ) : (
        <>
          <Text style={emailParagraphStyle}>
            <strong>{actorDisplayName}</strong> hat deinen Zugriff auf den Garagen-Workspace{' '}
            <strong>{garageName}</strong> entfernt.
          </Text>
          <Text style={emailParagraphStyle}>
            Dein Konto <strong>{recipientEmail}</strong> hat keinen Zugriff mehr auf Fahrzeuge und
            Einträge in diesem Workspace. Bereits gespeicherte Daten bleiben beim Eigentümer des
            Garagens.
          </Text>
        </>
      )}
      <Section style={emailButtonSectionStyle}>
        <Button href={ctaUrl} style={emailCtaButtonStyle}>
          GarIQ im Browser öffnen
        </Button>
      </Section>
      <Text style={emailMutedStyle}>
        Bei Fragen wende dich direkt an die Person, die den Zugriff verwaltet.
      </Text>
    </GarIqEmailLayout>
  );
}
