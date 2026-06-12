import { getTranslations } from "next-intl/server";
import AppPreview from "@/components/AppPreview";

export default async function Hero() {
  const t = await getTranslations("hero");

  const stats = [
    { title: t("stat1Title"), copy: t("stat1Copy") },
    { title: t("stat2Title"), copy: t("stat2Copy") },
    { title: t("stat3Title"), copy: t("stat3Copy") },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-100">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {t("badge")}
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#download"
              className="btn-soft inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
            >
              {t("ctaSecondary")}
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-1 gap-4 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
              >
                <dt className="font-semibold text-slate-950 dark:text-white">{stat.title}</dt>
                <dd className="mt-1">{stat.copy}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex items-center justify-center py-8 lg:py-0">
          <AppPreview />
        </div>
      </div>
    </section>
  );
}
