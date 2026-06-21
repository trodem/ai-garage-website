import Reveal from "./Reveal";
import { getTranslations } from "next-intl/server";

type FaqItem = { q: string; a: string };

export default async function Faq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
      </div>
      <div className="mt-12 space-y-4">
        {items.map((faq) => (
          <Reveal as="details" key={faq.q} className="faq-item">
            <summary>{faq.q}</summary>
            <div className="faq-answer">
              <div>
                <p>{faq.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
