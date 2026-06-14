import Reveal from "./Reveal";
import FeaturesPreview from "./FeaturesPreview";
import { getTranslations } from "next-intl/server";

type FeatureItem = { title: string; copy: string };

export default async function FeaturesSection() {
  const t = await getTranslations("features");
  const items = t.raw("items") as FeatureItem[];

  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-2xl">
          <span className="section-label">{t("label")}</span>
          <h2 className="section-title">{t("title")}</h2>
        </div>
        <FeaturesPreview />
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((feature) => (
          <Reveal as="article" key={feature.title} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
