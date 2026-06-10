import { getTranslations } from "next-intl/server";

export default async function FinalCta() {
  const t = await getTranslations("finalCta");

  return (
    <section id="final-cta" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 px-6 py-12 text-white shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
              {t("badge")}
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h2>
            <p className="mt-4 text-lg text-slate-300">{t("copy")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href="#download"
              className="btn-soft inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#plans"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
