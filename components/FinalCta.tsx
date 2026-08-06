import { getTranslations } from "next-intl/server";
import MagneticButton from "@/components/MagneticButton";
import GarIqWordmark from "@/components/GarIqWordmark";

export default async function FinalCta() {
  const t = await getTranslations("finalCta");

  return (
    <section id="final-cta" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-12 text-white shadow-soft dark:border-slate-800 lg:px-12 lg:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="aurora" />
          <div className="aurora-pink" />
        </div>
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <GarIqWordmark size="sm" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-brand-cyan">
              {t("badge")}
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.75rem)] font-semibold tracking-tight text-gradient">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg text-slate-300">{t("copy")}</p>
            <p className="mt-3 text-sm text-slate-400">{t("microTrust")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <MagneticButton
              href="#download"
              className="btn-shine inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200"
            >
              {t("ctaPrimary")}
            </MagneticButton>
            <a
              href="#plans"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
