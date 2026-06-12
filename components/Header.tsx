"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LogoIcon from "@/components/LogoIcon";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const NAV_KEYS = [
  { href: "#features", key: "navFeatures" as const },
  { href: "#ai", key: "navAi" as const },
  { href: "#scenarios", key: "navScenarios" as const },
  { href: "#plans", key: "navPlans" as const },
  { href: "#download", key: "navDownload" as const },
  { href: "#faq", key: "navFaq" as const },
];

export default function Header() {
  const t = useTranslations("header");
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    const nextDark = root.classList.contains("dark");
    localStorage.setItem("gariq-theme", nextDark ? "dark" : "light");
    setIsDark(nextDark);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={t("homeAria")}>
          <LogoIcon className="logo-hover h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24" />
          <div className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="text-[#1F1BE8] dark:text-[#00A7E5]">Gar</span><span className="text-[#F2137B]">IQ</span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV_KEYS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
            aria-label={t("toggleThemeAria")}
          >
            <span>{isDark ? "☾" : "☀"}</span>
          </button>
          <a
            href="#download"
            className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            {t("ctaDownload")}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={t("openMenuAria")}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden"
        >
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {NAV_KEYS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-sm text-slate-600 dark:text-slate-300"
              >
                {t(link.key)}
              </a>
            ))}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <LocaleSwitcher />
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                {t("themeButton")}
              </button>
              <a
                href="#download"
                onClick={closeMenu}
                className="inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
              >
                {t("ctaDownload")}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
