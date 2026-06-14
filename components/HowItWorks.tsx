import Reveal from "./Reveal";
import HowItWorksPreview from "./HowItWorksPreview";
import { getTranslations } from "next-intl/server";

type Step = { title: string; copy: string };

export default async function HowItWorks() {
  const t = await getTranslations("howItWorks");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-2xl">
          <span className="section-label">{t("label")}</span>
          <h2 className="section-title">{t("title")}</h2>
        </div>
        <HowItWorksPreview />
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        {steps.map((step, index) => (
          <Reveal as="article" key={step.title} className="step-card">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
