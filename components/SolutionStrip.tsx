import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import SolutionVerbCards from "./SolutionVerbCards";

type Verb = { kicker: string; title: string; copy: string };

export default async function SolutionStrip() {
  const t = await getTranslations("solutionStrip");
  const verbs = t.raw("verbs") as Verb[];

  return (
    <section id="solution" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-label">{t("label")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-copy mx-auto mt-4">{t("copy")}</p>
        </Reveal>

        <Reveal variant="scale" className="mt-4">
          <SolutionVerbCards
            verbs={verbs}
            receipt={{
              title: t("receipt.title"),
              merchant: t("receipt.merchant"),
              fuel: t("receipt.fuel"),
              total: t("receipt.total"),
              scanning: t("receipt.scanning"),
            }}
            draft={{
              title: t("draft.title"),
              badge: t("draft.badge"),
              type: t("draft.type"),
              amount: t("draft.amount"),
              liters: t("draft.liters"),
              odometer: t("draft.odometer"),
              confirm: t("draft.confirm"),
            }}
            chat={{
              title: t("chat.title"),
              badge: t("chat.badge"),
              user: t("chat.user"),
              assistant: t("chat.assistant"),
              typing: t("chat.typing"),
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
