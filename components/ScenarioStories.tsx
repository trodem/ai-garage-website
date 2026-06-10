import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type Scenario = { title: string; copy: string };

export default async function ScenarioStories() {
  const t = await getTranslations("scenarios");
  const items = t.raw("items") as Scenario[];

  return (
    <section id="scenarios" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((scenario) => (
          <Reveal as="article" key={scenario.title} className="testimonial-card">
            <h3 className="text-base font-semibold text-slate-950 dark:text-white">
              {scenario.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {scenario.copy}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
