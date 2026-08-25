/** Brand tokens for transactional email (React Email + Dashboard HTML). */

export const EMAIL_LOGO_URL = 'https://gariq.app/images/logo_gariq.png';

export const EMAIL_SITE_DE = 'https://gariq.app/de';

export const EMAIL_BRAND = {
  canvas: '#FAF9FC',
  card: '#ffffff',
  navy: '#0B1F4A',
  body: '#334155',
  muted: '#64748b',
  primary: '#211EE5',
  secondary: '#08A7DE',
  tertiary: '#ED177B',
  hairline: '#e4e4e7',
  footerLink: '#52525b',
} as const;

/** English only — matches app `APP_BRAND_SLOGAN` / website hero. */
export const EMAIL_SLOGAN_BEATS = [
  { text: 'Snap it.', color: EMAIL_BRAND.primary },
  { text: 'Scan it.', color: EMAIL_BRAND.secondary },
  { text: 'Ask GarIQ.', color: EMAIL_BRAND.tertiary },
] as const;

export const emailLeadStyle = {
  fontSize: '16px',
  lineHeight: '24px',
  color: EMAIL_BRAND.navy,
  margin: '0 0 12px',
};

export const emailParagraphStyle = {
  fontSize: '15px',
  lineHeight: '24px',
  color: EMAIL_BRAND.body,
  margin: '0 0 16px',
};

export const emailMutedStyle = {
  fontSize: '13px',
  lineHeight: '20px',
  color: EMAIL_BRAND.muted,
  margin: '16px 0 0',
};

export const emailButtonSectionStyle = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

/** Solid brand cyan (celeste) — no gradient. */
export const emailCtaButtonStyle = {
  backgroundColor: EMAIL_BRAND.secondary,
  borderRadius: '9999px',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};
