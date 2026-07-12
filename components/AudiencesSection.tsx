import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type Audience = { title: string; copy: string };

export default async function AudiencesSection() {
  const t = await getTranslations("audiences");
  const items = t.raw("items") as Audience[];

  return (
    <section id="audiences" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <Reveal as="article" key={item.title} className="use-case-card">
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
