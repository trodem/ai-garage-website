/** Public support inbox — single source for Contact / Privacy / Terms / mailto CTAs. */
export const SUPPORT_EMAIL = "gariq.app@gmail.com";

/**
 * Interim controller identity (owner-locked 2026-09-17).
 * No invented postal street — email-only contact until a real address is supplied.
 */
export const LEGAL_ENTITY = {
  kind: "natural_person" as const,
  name: "Demis Troisi",
  country: "Switzerland",
  /** Empty until owner provides a real postal address for public launch. */
  addressLines: [] as string[],
  governingLaw: "Swiss law",
  governingLawJurisdiction: "Switzerland",
};

export function getSupportMailto(subject: string): string {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
