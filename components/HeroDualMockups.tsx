"use client";

import { useTranslations } from "next-intl";
import AskLogbookPreview from "@/components/AskLogbookPreview";
import ScanOcrPreview from "@/components/ScanOcrPreview";

export default function HeroDualMockups() {
  const t = useTranslations("mockups.heroFlip");

  return (
    <div aria-label={t("ariaLabel")} className="mx-auto w-full max-w-6xl">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <figure className="min-w-0">
          <figcaption className="mb-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {t("scanLabel")}
          </figcaption>
          <ScanOcrPreview active />
        </figure>
        <figure className="min-w-0">
          <figcaption className="mb-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {t("askLabel")}
          </figcaption>
          <AskLogbookPreview active />
        </figure>
      </div>
    </div>
  );
}
