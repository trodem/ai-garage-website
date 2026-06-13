import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Section,
  Text,
} from '@react-email/components';
import type { ReactNode } from 'react';

const footerBase = 'https://gariq.app/de';

type GarIqEmailLayoutProps = {
  preview: string;
  children: ReactNode;
};

export function GarIqEmailLayout({ preview, children }: GarIqEmailLayoutProps) {
  return (
    <Html lang="de">
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={brand}>GarIQ</Heading>
          </Section>
          {children}
          <Hr style={hr} />
          <Text style={footerText}>
            <Link href={footerBase} style={footerLink}>
              GarIQ
            </Link>
            {' · '}
            <Link href={`${footerBase}#`} style={footerLink}>
              Impressum
            </Link>
            {' · '}
            <Link href={`${footerBase}#`} style={footerLink}>
              Datenschutz
            </Link>
            {' · '}
            <Link href={`${footerBase}#`} style={footerLink}>
              Hilfe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: '#f4f4f5',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '32px 24px',
  maxWidth: '560px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
};

const header = {
  marginBottom: '24px',
};

const brand = {
  fontSize: '22px',
  fontWeight: '700' as const,
  color: '#0f172a',
  margin: '0',
};

const hr = {
  borderColor: '#e4e4e7',
  margin: '32px 0 16px',
};

const footerText = {
  fontSize: '12px',
  color: '#71717a',
  lineHeight: '20px',
  margin: '0',
};

const footerLink = {
  color: '#52525b',
  textDecoration: 'underline' as const,
};
