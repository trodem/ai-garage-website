import Reveal from "./Reveal";
import SpotlightGroup from "./SpotlightGroup";
import { getTranslations } from "next-intl/server";

type AiCard = { title: string; copy: string };

export default async function AiSection() {
  const t = await getTranslations("ai");
  const cards = t.raw("cards") as AiCard[];

  return (
    <section id="ai" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="rounded-[2rem] border border-slate-200/80 bg-[#FAF9FC] p-8 dark:border-slate-800 dark:bg-slate-900/60 lg:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t("label")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-copy mx-auto mt-4">{t("copy")}</p>
        </div>
        <SpotlightGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal
              as="article"
              key={card.title}
              variant={i % 2 === 0 ? "left" : "right"}
              className="ai-card"
              data-spotlight
            >
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </Reveal>
          ))}
        </SpotlightGroup>
      </div>
    </section>
  );
}
