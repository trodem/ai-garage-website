"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  de: "DE",
  it: "IT",
};

export default function LocaleSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1" role="group" aria-label={t("localeLabel")}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
            loc === locale
              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
          aria-current={loc === locale ? "true" : undefined}
        >
          {LOCALE_LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
