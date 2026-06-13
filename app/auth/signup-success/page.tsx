import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

const SITE_LOCALES = routing.locales;

function localeFromAcceptLanguage(acceptLanguage: string | null): (typeof SITE_LOCALES)[number] {
  const defaultLocale = routing.defaultLocale;
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const candidates = acceptLanguage.split(",").map((segment) => {
    const tag = segment.trim().split(";")[0]?.toLowerCase() ?? "";
    return tag.split("-")[0];
  });

  for (const code of candidates) {
    if ((SITE_LOCALES as readonly string[]).includes(code)) {
      return code as (typeof SITE_LOCALES)[number];
    }
  }

  return defaultLocale;
}

/** Post–email-confirmation hop: Supabase redirects here; browser language → localized welcome. */
export default async function SignupSuccessPage() {
  const headerList = await headers();
  const locale = localeFromAcceptLanguage(headerList.get("accept-language"));
  redirect(`/${locale}/welcome`);
}
