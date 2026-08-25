import { Button, Section, Text } from '@react-email/components';
import {
  emailButtonSectionStyle,
  emailCtaButtonStyle,
  emailLeadStyle,
  emailMutedStyle,
  emailParagraphStyle,
} from './emailBrand';
import { GarIqEmailLayout } from './GarIqEmailLayout';

/**
 * Source of truth for Supabase Auth "Confirm signup" email HTML styling.
 * Auth emails are sent by Supabase (not Resend). Export HTML and paste into
 * Dashboard → Authentication → Email Templates → Confirm signup.
 * The CTA href MUST remain `{{ .ConfirmationURL }}` (Go template) — never hardcode Site URL.
 */
export function AuthConfirmSignupEmail() {
  return (
    <GarIqEmailLayout preview="E-Mail bestätigen — GarIQ">
      <Text style={emailLeadStyle}>Hallo,</Text>
      <Text style={emailParagraphStyle}>
        Bitte bestätige deine E-Mail-Adresse, um dein GarIQ-Konto zu aktivieren.
        Tippe auf den Button, um die Registrierung abzuschließen.
      </Text>
      <Section style={emailButtonSectionStyle}>
        {/* Supabase Go template — keep exactly this href when pasting into Dashboard */}
        <Button href="{{ .ConfirmationURL }}" style={emailCtaButtonStyle}>
          E-Mail bestätigen
        </Button>
      </Section>
      <Text style={emailMutedStyle}>
        Wenn du kein Konto erstellt hast, kannst du diese E-Mail ignorieren.
      </Text>
    </GarIqEmailLayout>
  );
}
