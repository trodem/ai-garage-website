import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

export default async function PlansExplainer() {
  const t = await getTranslations("plans");
  const points = t.raw("points") as string[];

  return (
    <section id="plans" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="rounded-[2rem] border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 lg:p-12">
        <div className="max-w-2xl">
          <span className="section-label">{t("label")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-copy mt-4">{t("copy")}</p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {points.map((point) => (
            <li
              key={point}
              className="flex gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300"
            >
              <span className="text-primary-600 dark:text-primary-300" aria-hidden>
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <a
            href="#download"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            {t("cta")}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
