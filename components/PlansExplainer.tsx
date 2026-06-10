import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type PlanTier = {
  id: string;
  name: string;
  description: string;
  featured: boolean;
  highlights: string[];
};

export default async function PlansExplainer() {
  const t = await getTranslations("plans");
  const tiers = t.raw("tiers") as PlanTier[];

  return (
    <section id="plans" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy mt-4">{t("copy")}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {tiers.map((plan) => (
          <Reveal
            as="article"
            key={plan.id}
            className={`pricing-card${plan.featured ? " pricing-card-featured" : ""}`}
          >
            <div>
              {plan.featured && (
                <div className="mb-3 inline-flex rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-100">
                  {t("popularBadge")}
                </div>
              )}
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
            <ul>
              {plan.highlights.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
        {t("footnote")}
      </p>

      <div className="mt-10">
        <a
          href="#download"
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
