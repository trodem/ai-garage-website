import { notFound } from "next/navigation";

/**
 * Post-signup copy is only shown on /auth/callback after a real Supabase email link.
 * Public /[locale]/welcome URLs are intentionally disabled.
 */
export default function WelcomePageRemoved() {
  notFound();
}
