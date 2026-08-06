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

function FlagIcon({ locale, className }: { locale: string; className?: string }) {
  const common = className ?? "h-4 w-4 shrink-0 rounded-full";

  if (locale === "it") {
    return (
      <svg className={common} viewBox="0 0 18 18" aria-hidden>
        <circle cx="9" cy="9" r="9" fill="#009246" />
        <path d="M6 0h6v18H6z" fill="#fff" />
        <path d="M12 0h6v18h-6z" fill="#ce2b37" />
        <circle cx="9" cy="9" r="8.5" fill="none" stroke="rgba(15,23,42,0.12)" />
      </svg>
    );
  }

  if (locale === "de") {
    return (
      <svg className={common} viewBox="0 0 18 18" aria-hidden>
        <circle cx="9" cy="9" r="9" fill="#ffce00" />
        <path d="M0 0h18v6H0z" fill="#000" />
        <path d="M0 6h18v6H0z" fill="#dd0000" />
        <circle cx="9" cy="9" r="8.5" fill="none" stroke="rgba(15,23,42,0.12)" />
      </svg>
    );
  }

  // en — UK-inspired roundel (readable at small size)
  return (
    <svg className={common} viewBox="0 0 18 18" aria-hidden>
      <circle cx="9" cy="9" r="9" fill="#012169" />
      <path d="M0 9h18M9 0v18" stroke="#fff" strokeWidth="3" />
      <path d="M0 9h18M9 0v18" stroke="#C8102E" strokeWidth="1.5" />
      <path
        d="M1.8 1.8l14.4 14.4M16.2 1.8L1.8 16.2"
        stroke="#fff"
        strokeWidth="2"
      />
      <path
        d="M1.8 1.8l14.4 14.4M16.2 1.8L1.8 16.2"
        stroke="#C8102E"
        strokeWidth="0.9"
      />
      <circle cx="9" cy="9" r="8.5" fill="none" stroke="rgba(15,23,42,0.12)" />
    </svg>
  );
}

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
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={LOCALE_LABELS[locale]}
      >
        <FlagIcon locale={locale} />
        <span>{LOCALE_LABELS[locale]}</span>
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
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
                  <FlagIcon locale={loc} />
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
