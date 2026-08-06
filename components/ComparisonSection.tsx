import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type Row = { approach: string; breaks: string; why: string };

export default async function ComparisonSection() {
  const t = await getTranslations("comparison");
  const rows = t.raw("rows") as Row[];

  return (
    <section id="comparison" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy mt-4">{t("copy")}</p>
      </div>

      <div className="mt-12 space-y-4">
        <div className="hidden grid-cols-3 gap-4 px-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400 sm:grid dark:text-slate-500">
          <span>{t("colApproach")}</span>
          <span>{t("colBreaks")}</span>
          <span>{t("colWhy")}</span>
        </div>

        {rows.map((row) => (
          <Reveal
            key={row.approach}
            className="grid gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-5 sm:grid-cols-3 sm:gap-6 dark:border-slate-800 dark:bg-slate-900/50"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 sm:hidden">
                {t("colApproach")}
              </p>
              <p className="mt-1 font-semibold text-slate-950 dark:text-white sm:mt-0">
                {row.approach}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 sm:hidden">
                {t("colBreaks")}
              </p>
              <p className="mt-1 text-slate-600 dark:text-slate-400 sm:mt-0">{row.breaks}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-600 sm:hidden dark:text-brand-cyan">
                {t("colWhy")}
              </p>
              <p className="mt-1 font-medium text-primary-700 dark:text-brand-cyan sm:mt-0">
                {row.why}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
