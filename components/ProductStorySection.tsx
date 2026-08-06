import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type Step = { title: string; copy: string };

export default async function ProductStorySection() {
  const t = await getTranslations("productStory");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="how" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
      </div>

      <ol className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.slice(0, 4).map((step) => (
          <Reveal as="li" key={step.title} className="text-center sm:text-left">
            <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white sm:text-xl">
              {step.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {step.copy}
            </p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
