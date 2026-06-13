import { Button, Section, Text } from '@react-email/components';
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

const defaultCta = 'https://gariq.app/de';

export function GarageSharingRevokedEmail({
  kind,
  recipientEmail,
  garageName,
  actorDisplayName,
  roleLabel,
  ctaUrl = defaultCta,
}: GarageSharingRevokedEmailProps) {
  const preview =
    kind === 'pending_invitation'
      ? `Einladung zu „${garageName}“ zurückgezogen`
      : `Zugriff auf „${garageName}“ entfernt`;

  return (
    <GarIqEmailLayout preview={preview}>
      <Text style={lead}>Hallo,</Text>
      {kind === 'pending_invitation' ? (
        <>
          <Text style={paragraph}>
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
          <Text style={paragraph}>
            Die Einladung für <strong>{recipientEmail}</strong> ist nicht mehr gültig. Du kannst
            den Workspace nicht mehr über die App annehmen, es sei denn, du erhältst eine neue
            Einladung.
          </Text>
        </>
      ) : (
        <>
          <Text style={paragraph}>
            <strong>{actorDisplayName}</strong> hat deinen Zugriff auf den Garagen-Workspace{' '}
            <strong>{garageName}</strong> entfernt.
          </Text>
          <Text style={paragraph}>
            Dein Konto <strong>{recipientEmail}</strong> hat keinen Zugriff mehr auf Fahrzeuge und
            Einträge in diesem Workspace. Bereits gespeicherte Daten bleiben beim Eigentümer des
            Garagens.
          </Text>
        </>
      )}
      <Section style={buttonSection}>
        <Button href={ctaUrl} style={button}>
          GarIQ im Browser öffnen
        </Button>
      </Section>
      <Text style={muted}>
        Bei Fragen wende dich direkt an die Person, die den Zugriff verwaltet.
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
