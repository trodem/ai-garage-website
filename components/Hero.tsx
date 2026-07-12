import { getTranslations } from "next-intl/server";
import HeroDualMockups from "@/components/HeroDualMockups";
import MagneticButton from "@/components/MagneticButton";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8 lg:pb-14 lg:pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/10 dark:text-primary-100">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {t("badge")}
          </div>

          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl lg:leading-[1.05]">
            <span className="text-gradient">{t("title")}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl sm:leading-9">
            {t("subtitleShort")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton
              href="#download"
              className="btn-shine inline-flex min-w-[11rem] items-center justify-center rounded-full bg-slate-900 px-8 py-3.5 text-base font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {t("ctaPrimary")}
            </MagneticButton>
            <a
              href="#how"
              className="inline-flex min-w-[11rem] items-center justify-center rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>

        <div className="mt-14 lg:mt-20">
          <HeroDualMockups />
        </div>
      </div>

      <div className="pointer-events-none hidden justify-center pb-8 text-slate-400 lg:flex dark:text-slate-500">
        <span className="scroll-cue" aria-hidden="true" />
      </div>
    </section>
  );
}
