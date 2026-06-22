import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";

export type AuthCallbackLocale = "en" | "de" | "it";

const MESSAGES: Record<AuthCallbackLocale, typeof en> = {
  en,
  de: de as typeof en,
  it: it as typeof en,
};

/**
 * The /auth/callback route lives outside the [locale] segment (Supabase redirects
 * to a fixed URL), so there is no next-intl context here. We detect the visitor's
 * language from the browser to localize the post-confirmation copy.
 */
export function resolveAuthCallbackLocale(
  navigatorLanguages?: readonly string[] | string,
): AuthCallbackLocale {
  const candidates =
    typeof navigatorLanguages === "string"
      ? [navigatorLanguages]
      : navigatorLanguages ?? [];

  for (const raw of candidates) {
    const base = raw.toLowerCase().split("-")[0];
    if (base === "de" || base === "it" || base === "en") {
      return base;
    }
  }
  return "en";
}

export function getAuthCallbackCopy(locale: AuthCallbackLocale) {
  return MESSAGES[locale].authCallback;
}
