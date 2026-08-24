import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type PlanTier = {
  id: string;
  name: string;
  price: string;
  description: string;
  badge: string;
  featured: boolean;
  highlights: string[];
};

export default async function PlansExplainer() {
  const t = await getTranslations("plans");
  const tiers = t.raw("tiers") as PlanTier[];
  const notes = t.raw("notes.items") as { heading: string; body: string }[];

  return (
    <section id="plans" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="max-w-3xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy mt-4">{t("copy")}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {tiers.map((plan) => (
          <Reveal
            as="article"
            key={plan.id}
            className={`pricing-card pricing-tier-${plan.id}${plan.featured ? " pricing-card-featured" : ""}`}
          >
            <div>
              <div className="pricing-badge">{plan.badge}</div>
              <h3>{plan.name}</h3>
              <p className="pricing-price">{plan.price}</p>
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

      <div className="pricing-notes mt-12 max-w-3xl">
        <h3>{t("notes.title")}</h3>
        {notes.map((note) => (
          <div key={note.heading}>
            <h4>{note.heading}</h4>
            <p>{note.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
