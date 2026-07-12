"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import AiPreview from "@/components/AiPreview";
import AskLogbookPreview from "@/components/AskLogbookPreview";

type FrameId = "scan" | "ask";

const FLIP_MS = 4800;

export default function HeroAskScanFlip() {
  const tFlip = useTranslations("mockups.heroFlip");
  const tAi = useTranslations("ai.preview");
  const baseId = useId();
  const [frame, setFrame] = useState<FrameId>("scan");
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setFrame((prev) => (prev === "scan" ? "ask" : "scan"));
    }, FLIP_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const frames: { id: FrameId; label: string }[] = [
    { id: "scan", label: tFlip("scanLabel") },
    { id: "ask", label: tFlip("askLabel") },
  ];

  return (
    <div
      className="w-full"
      aria-label={tFlip("ariaLabel")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        role="tablist"
        aria-label={tFlip("ariaLabel")}
        className="mb-3 flex items-center justify-center gap-2"
      >
        {frames.map((item) => {
          const selected = frame === item.id;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setFrame(item.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                selected
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                  : "border border-slate-300 text-slate-600 hover:border-slate-400 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel-scan`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-scan`}
        hidden={frame !== "scan"}
      >
        {frame === "scan" ? (
          <AiPreview
            assistant={tAi("assistant")}
            userMessage={tAi("userMessage")}
            answerIntro={tAi("answerIntro")}
            eventTitle={tAi("eventTitle")}
            fields={tAi.raw("fields")}
            values={tAi.raw("values")}
            confirm={tAi("confirm")}
          />
        ) : null}
      </div>

      <div
        id={`${baseId}-panel-ask`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-ask`}
        hidden={frame !== "ask"}
      >
        {frame === "ask" ? <AskLogbookPreview active /> : null}
      </div>
    </div>
  );
}
