import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type ProblemCard = { title: string; copy: string };

export default async function ProblemSection() {
  const t = await getTranslations("problem");
  const cards = t.raw("cards") as ProblemCard[];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy">{t("copy")}</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((problem) => (
          <Reveal as="article" key={problem.title} className="problem-card">
            <h3>{problem.title}</h3>
            <p>{problem.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
