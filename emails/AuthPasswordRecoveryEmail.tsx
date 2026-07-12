import { Button, Section, Text } from '@react-email/components';
import { GarIqEmailLayout } from './GarIqEmailLayout';

/**
 * Source of truth for Supabase Auth "Reset password" email HTML styling.
 * Auth emails are sent by Supabase (not Resend). Export HTML and paste into
 * Dashboard → Authentication → Email Templates → Reset password.
 * The CTA href MUST remain `{{ .ConfirmationURL }}` (Go template) — never hardcode Site URL.
 */
export function AuthPasswordRecoveryEmail() {
  return (
    <GarIqEmailLayout preview="Passwort zurücksetzen — GarIQ">
      <Text style={lead}>Hallo,</Text>
      <Text style={paragraph}>
        Wir haben eine Anfrage erhalten, das Passwort für dein GarIQ-Konto zurückzusetzen.
        Tippe auf den Button, um ein neues Passwort zu wählen.
      </Text>
      <Section style={buttonSection}>
        {/* Supabase Go template — keep exactly this href when pasting into Dashboard */}
        <Button href="{{ .ConfirmationURL }}" style={button}>
          Passwort zurücksetzen
        </Button>
      </Section>
      <Text style={muted}>
        Wenn du diese Anfrage nicht gestellt hast, kannst du diese E-Mail ignorieren.
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

const buttonSection = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

const button = {
  backgroundColor: '#0284c7',
  borderRadius: '9999px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  padding: '12px 24px',
  display: 'inline-block',
};

const muted = {
  fontSize: '13px',
  lineHeight: '20px',
  color: '#71717a',
  margin: '0',
};
