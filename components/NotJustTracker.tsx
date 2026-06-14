import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type Row = { old: string; new: string };

export default async function NotJustTracker() {
  const t = await getTranslations("notJustTracker");
  const rows = t.raw("rows") as Row[];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy">{t("copy")}</p>
      </div>

      <div className="mt-12 grid gap-4">
        {/* Column headers (desktop) */}
        <div className="hidden grid-cols-2 gap-4 px-2 sm:grid">
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            {t("oldLabel")}
          </span>
          <span className="text-sm font-semibold uppercase tracking-widest text-primary-600 dark:text-brand-cyan">
            {t("newLabel")}
          </span>
        </div>

        {rows.map((row) => (
          <Reveal
            as="div"
            key={row.new}
            className="grid gap-3 rounded-3xl border border-slate-200/70 bg-white/70 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 sm:grid-cols-2 sm:gap-4 sm:p-5"
          >
            {/* Old way */}
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-400 dark:bg-slate-800 dark:text-slate-500"
              >
                ✕
              </span>
              <p className="text-slate-500 line-through decoration-slate-300 dark:text-slate-500 dark:decoration-slate-700">
                {row.old}
              </p>
            </div>

            {/* GarIQ way */}
            <div className="flex items-start gap-3 sm:border-l sm:border-slate-200/70 sm:pl-4 sm:dark:border-slate-800">
              <span
                aria-hidden
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500/12 text-sm font-bold text-primary-600 dark:bg-brand-cyan/15 dark:text-brand-cyan"
              >
                ✓
              </span>
              <p className="font-medium text-slate-900 dark:text-white">{row.new}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
