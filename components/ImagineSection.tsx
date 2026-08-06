import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type Item = { title: string; copy: string };

export default async function ImagineSection() {
  const t = await getTranslations("imagine");
  const items = t.raw("items") as Item[];

  return (
    <section id="imagine" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
      </div>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Reveal as="article" key={item.title} className="border-l-2 border-primary-500/40 pl-5 dark:border-brand-cyan/40">
            <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {item.copy}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
