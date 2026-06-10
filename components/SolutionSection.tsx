import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type SolutionCard = { kicker: string; title: string; copy: string };

export default async function SolutionSection() {
  const t = await getTranslations("solution");
  const cards = t.raw("cards") as SolutionCard[];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="section-label">{t("label")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-copy">{t("copy")}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((solution) => (
            <Reveal key={solution.title} className="solution-card">
              <span className="solution-kicker">{solution.kicker}</span>
              <h3>{solution.title}</h3>
              <p>{solution.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
