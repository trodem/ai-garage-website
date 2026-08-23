import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";

type InsertStep = { label: string; copy: string };
type AskPair = { q: string; a: string };
type InsertBlock = {
  heading: string;
  promise: string;
  examples: string[];
  steps: InsertStep[];
};
type AskBlock = { heading: string; pairs: AskPair[] };

export default async function CapabilitiesSection() {
  const t = await getTranslations("capabilities");
  const insert = t.raw("insert") as InsertBlock;
  const ask = t.raw("ask") as AskBlock;

  return (
    <section id="capabilities" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <Reveal className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy mt-4">{t("copy")}</p>
      </Reveal>

      <Reveal className="cap-insert">
        <h3 className="cap-block-title">{insert.heading}</h3>
        <p className="cap-insert-promise">{insert.promise}</p>
        <ul className="cap-insert-examples">
          {insert.examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
        <ol className="cap-insert-steps">
          {insert.steps.map((step, index) => (
            <li key={step.label}>
              <span className="cap-insert-step-index" aria-hidden>
                {index + 1}
              </span>
              <h4 className="cap-insert-step-label">{step.label}</h4>
              <p className="cap-insert-step-copy">{step.copy}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <p className="cap-bridge">{t("bridge")}</p>

      <Reveal className="cap-ask">
        <h3 className="cap-block-title">{ask.heading}</h3>
        <dl className="cap-ask-qa">
          {ask.pairs.map((pair) => (
            <div key={pair.q} className="cap-ask-pair">
              <dt>{pair.q}</dt>
              <dd>
                <blockquote>{pair.a}</blockquote>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
