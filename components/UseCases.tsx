import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type UseCase = { title: string; copy: string };

export default async function UseCases() {
  const t = await getTranslations("useCases");
  const items = t.raw("items") as UseCase[];

  return (
    <section id="use-cases" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {items.map((useCase) => (
          <Reveal as="article" key={useCase.title} className="use-case-card">
            <h3>{useCase.title}</h3>
            <p>{useCase.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
