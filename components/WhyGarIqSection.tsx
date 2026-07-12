import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type Point = { title: string; copy: string };

export default async function WhyGarIqSection() {
  const t = await getTranslations("whyGarIq");
  const points = t.raw("points") as Point[];

  return (
    <section id="why" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy mt-4">{t("copy")}</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {points.map((point) => (
          <Reveal as="article" key={point.title} className="feature-card">
            <h3>{point.title}</h3>
            <p>{point.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
