import { getTranslations } from "next-intl/server";
import MagneticButton from "@/components/MagneticButton";
import PhoneMockup from "@/components/phone-mockup/PhoneMockup";
import VehicleCarousel from "@/components/VehicleCarousel";
import GarIqWordmark from "@/components/GarIqWordmark";

export default async function Hero() {
  const t = await getTranslations("hero");
  const vt = await getTranslations("vehicleTypes");
  const vehicles = vt.raw("items") as string[];
  const support = t("support");
  const supportHook = t("supportHook");

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="hero-grid">
          <div className="hero-grid-copy text-center lg:text-left">
            <h1 className="text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              <span className="text-gradient block">{t("title")}</span>
              <span className="hero-title-knows">
                <GarIqWordmark
                  variant="brand"
                  size="md"
                  className="hero-title-wordmark"
                />
                <span className="text-gradient">{t("titleAfter")}</span>
              </span>
            </h1>
            <div className="hero-support">
              <p className="hero-support-lead">{support}</p>
              <p className="hero-support-lead">{t("supportDocs")}</p>
              <p className="hero-support-lead">{t("supportWork")}</p>
              <p className="hero-support-lead">{supportHook}</p>
            </div>
          </div>

          <div className="hero-grid-phone">
            <PhoneMockup tour="tabs" />
          </div>

          <div className="hero-grid-cta flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <MagneticButton
              href="#plans"
              className="btn-brand btn-shine inline-flex min-h-11 min-w-[11rem] items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white"
            >
              {t("ctaPrimary")}
            </MagneticButton>
            <a
              href="#ask"
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
