import { getTranslations } from "next-intl/server";
import type { Icon as TablerIcon } from "@tabler/icons-react";
import {
  IconClockHour4,
  IconCoin,
  IconComponents,
  IconFileText,
  IconMessageChatbot,
  IconTool,
} from "@tabler/icons-react";
import Reveal from "./Reveal";

type Card = { title: string; copy: string; examples?: string[] };

const PROBLEM_ICONS: TablerIcon[] = [
  IconFileText,
  IconCoin,
  IconTool,
  IconClockHour4,
  IconComponents,
  IconMessageChatbot,
];

export default async function ProblemSection() {
  const t = await getTranslations("problem");
  const cards = t.raw("cards") as Card[];

  return (
    <section id="problem" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-3xl lg:text-left">
        <Reveal>
          <span className="section-label">{t("label")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-copy mx-auto mt-4 lg:mx-0">{t("copy")}</p>
        </Reveal>
      </div>

      <ul className="soft-card-grid mt-12">
        {cards.map((card, index) => {
          const Icon = PROBLEM_ICONS[index] ?? IconFileText;
          const examples = card.examples ?? [];
          return (
            <Reveal as="li" key={card.title} className="soft-card">
              <span className="soft-card-chip" aria-hidden>
                <Icon size={24} stroke={1.6} />
              </span>
              <h3 className="soft-card-title">{card.title}</h3>
              <p className="soft-card-copy">{card.copy}</p>
              {examples.length > 0 ? (
                <ul className="soft-card-examples">
                  {examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
