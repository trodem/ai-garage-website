import { getTranslations } from "next-intl/server";
import MagneticButton from "@/components/MagneticButton";
import PhoneMockup from "@/components/phone-mockup/PhoneMockup";
import VehicleCarousel from "@/components/VehicleCarousel";

export default async function Hero() {
  const t = await getTranslations("hero");
  const vt = await getTranslations("vehicleTypes");
  const vehicles = vt.raw("items") as string[];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="hero-grid">
          <div className="hero-grid-copy text-center lg:text-left">
            <h1 className="mt-2 text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight">
              <span className="text-gradient block">{t("title")}</span>
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl sm:leading-9">
              {t("support")}
            </p>
            <p className="mt-3 text-sm font-semibold tracking-[0.04em] text-slate-500 dark:text-slate-400 sm:text-base">
              {t("slogan")}
            </p>
          </div>

          <div className="hero-grid-phone">
            <PhoneMockup tour="tabs" />
          </div>

          <div className="hero-grid-cta flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <MagneticButton
              href="#download"
              className="btn-shine inline-flex min-h-11 min-w-[11rem] items-center justify-center rounded-full bg-primary-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-primary-600"
            >
              {t("ctaPrimary")}
            </MagneticButton>
            <a
              href="#solution"
              className="inline-flex min-h-11 min-w-[11rem] items-center justify-center rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-white"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>

        <VehicleCarousel label={vt("label")} vehicles={vehicles} />
      </div>
    </section>
  );
}
