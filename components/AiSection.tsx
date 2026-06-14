import Reveal from "./Reveal";
import AiPreview from "./AiPreview";
import { getTranslations } from "next-intl/server";

type AiCard = { title: string; copy: string };

export default async function AiSection() {
  const t = await getTranslations("ai");
  const cards = t.raw("cards") as AiCard[];

  return (
    <section id="ai" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-4xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900 lg:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="section-label">{t("label")}</span>
            <h2 className="section-title">{t("title")}</h2>
            <p className="section-copy">{t("copy")}</p>
          </div>
          <AiPreview />
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Reveal as="article" key={card.title} className="ai-card">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
