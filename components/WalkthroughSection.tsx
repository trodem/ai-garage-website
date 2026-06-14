import Reveal from "./Reveal";
import WalkthroughMockup from "./WalkthroughMockups";
import { getTranslations } from "next-intl/server";

type Step = { title: string; copy: string; alt: string };

export default async function WalkthroughSection() {
  const t = await getTranslations("walkthrough");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
      </div>

      <div className="mt-14 flex flex-col gap-16 lg:gap-24">
        {steps.map((step, i) => {
          const reversed = i % 2 === 1;
          return (
            <Reveal
              as="div"
              key={step.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className={reversed ? "lg:order-2" : ""}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-500/10 text-sm font-bold text-primary-600 dark:bg-brand-cyan/12 dark:text-brand-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.copy}
                </p>
              </div>

              <div className={reversed ? "lg:order-1" : ""} role="img" aria-label={step.alt}>
                <WalkthroughMockup index={i} />
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
