import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import type { ReactNode } from 'react';
import {
  EMAIL_BRAND,
  EMAIL_LOGO_URL,
  EMAIL_SITE_DE,
  EMAIL_SLOGAN_BEATS,
} from './emailBrand';

type GarIqEmailLayoutProps = {
  preview: string;
  children: ReactNode;
};

export function GarIqEmailLayout({ preview, children }: GarIqEmailLayoutProps) {
  return (
    <Html lang="de">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Row>
              <Column style={logoColumn}>
                <Img
                  src={EMAIL_LOGO_URL}
                  width="56"
                  height="56"
                  alt="GarIQ"
                  style={logo}
                />
              </Column>
              <Column style={wordmarkColumn}>
                <Text style={wordmark}>
                  <span style={wordmarkGar}>Gar</span>
                  <span style={wordmarkIq}>IQ</span>
                </Text>
                <Text style={slogan}>
                  {EMAIL_SLOGAN_BEATS.map((beat, index) => (
                    <span key={beat.text}>
                      {index > 0 ? ' ' : null}
                      <span style={{ color: beat.color }}>{beat.text}</span>
                    </span>
                  ))}
                </Text>
              </Column>
            </Row>
          </Section>
          <Section style={barWrap}>
            <Row>
              <Column style={barPrimary}>&nbsp;</Column>
              <Column style={barSecondary}>&nbsp;</Column>
              <Column style={barTertiary}>&nbsp;</Column>
            </Row>
          </Section>
          {children}
          <Hr style={hr} />
          <Text style={footerText}>
            <Link href={EMAIL_SITE_DE} style={footerLink}>
              GarIQ
            </Link>
            {' · '}
            <Link href={`${EMAIL_SITE_DE}#`} style={footerLink}>
              Impressum
            </Link>
            {' · '}
            <Link href={`${EMAIL_SITE_DE}#`} style={footerLink}>
              Datenschutz
            </Link>
            {' · '}
            <Link href={`${EMAIL_SITE_DE}#`} style={footerLink}>
              Hilfe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: EMAIL_BRAND.canvas,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  margin: '0',
  padding: '24px',
};

const container = {
  margin: '0 auto',
  padding: '32px 24px',
  maxWidth: '560px',
  backgroundColor: EMAIL_BRAND.card,
  borderRadius: '8px',
};

const header = {
  marginBottom: '16px',
};

const logoColumn = {
  width: '68px',
  verticalAlign: 'middle' as const,
};

const wordmarkColumn = {
  verticalAlign: 'middle' as const,
};

const logo = {
  display: 'block',
  border: '0',
};

const wordmark = {
  fontFamily: '"Space Grotesk", Arial, Helvetica, sans-serif',
  fontSize: '28px',
  fontWeight: '800' as const,
  letterSpacing: '-0.04em',
  lineHeight: '32px',
  margin: '0',
};

const wordmarkGar = {
  color: EMAIL_BRAND.primary,
};

const wordmarkIq = {
  color: EMAIL_BRAND.tertiary,
};

const slogan = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  fontSize: '13px',
  fontWeight: '600' as const,
  letterSpacing: '-0.01em',
  lineHeight: '18px',
  margin: '4px 0 0',
};

const barWrap = {
  margin: '0 0 24px',
};

const barSegment = {
  height: '3px',
  fontSize: '0',
  lineHeight: '3px',
};

const barPrimary = {
  ...barSegment,
  backgroundColor: EMAIL_BRAND.primary,
};

const barSecondary = {
  ...barSegment,
  backgroundColor: EMAIL_BRAND.secondary,
};

const barTertiary = {
  ...barSegment,
  backgroundColor: EMAIL_BRAND.tertiary,
};

const hr = {
  borderColor: EMAIL_BRAND.hairline,
  margin: '32px 0 16px',
};

const footerText = {
  fontSize: '12px',
  color: EMAIL_BRAND.muted,
  lineHeight: '20px',
  margin: '0',
};

const footerLink = {
  color: EMAIL_BRAND.footerLink,
  textDecoration: 'underline' as const,
};
