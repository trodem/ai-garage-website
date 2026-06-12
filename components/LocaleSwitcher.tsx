"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  de: "DE",
  it: "IT",
};

const LOCALE_FLAGS: Record<string, string> = {
  en: "🇬🇧",
  de: "🇩🇪",
  it: "🇮🇹",
};

export default function LocaleSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const select = (loc: string) => {
    router.replace(pathname, { locale: loc });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative" aria-label={t("localeLabel")}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{LOCALE_FLAGS[locale]}</span>
        <span>{LOCALE_LABELS[locale]}</span>
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul
            role="listbox"
            className="absolute left-0 top-full z-50 mt-1.5 min-w-28 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900"
          >
            {routing.locales.map((loc) => (
              <li key={loc} role="option" aria-selected={loc === locale}>
                <button
                  type="button"
                  onClick={() => select(loc)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold transition ${
                    loc === locale
                      ? "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  }`}
                >
                  <span>{LOCALE_FLAGS[loc]}</span>
                  <span>{LOCALE_LABELS[loc]}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
