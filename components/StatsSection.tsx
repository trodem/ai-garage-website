import Reveal from "./Reveal";
import StatsPreview from "./StatsPreview";
import { getTranslations } from "next-intl/server";

type StatCard = { title: string; copy: string };

export default async function StatsSection() {
  const t = await getTranslations("stats");
  const cards = t.raw("cards") as StatCard[];
  const categories = t.raw("categories") as string[];

  return (
    <section id="stats" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="max-w-2xl">
          <span className="section-label">{t("label")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-copy">{t("copy")}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {cards.map((card) => (
              <Reveal as="article" key={card.title} className="use-case-card">
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <StatsPreview
          spendLabel={t("vizSpend")}
          categoryLabel={t("vizCategory")}
          trendLabel={t("vizTrend")}
          filtersLabel={t("vizFilters")}
          categories={categories}
        />
      </div>
    </section>
  );
}
