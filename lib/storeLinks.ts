import { SUPPORT_EMAIL } from "./legalContact";

/**
 * Store URLs for the marketing download CTA.
 * Leave NEXT_PUBLIC_* empty until the stores are public — the UI falls back to an
 * honest waitlist CTA instead of dead “Available” badges.
 */
export function getStoreUrls(): { appStoreUrl: string; playStoreUrl: string } {
  return {
    appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() ?? "",
    playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL?.trim() ?? "",
  };
}

export function getWaitlistMailto(): string {
  const email =
    process.env.NEXT_PUBLIC_WAITLIST_EMAIL?.trim() || SUPPORT_EMAIL;
  return `mailto:${email}?subject=${encodeURIComponent("GarIQ access request")}`;
}
