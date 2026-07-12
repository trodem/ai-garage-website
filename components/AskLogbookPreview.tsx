"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const S = { IDLE: 0, USER: 1, TYPING: 2, RESPONSE: 3, METRIC: 4 };

type AskLogbookPreviewProps = {
  /** Restart animation when this frame becomes visible in the flip. */
  active?: boolean;
};

export default function AskLogbookPreview({ active = true }: AskLogbookPreviewProps) {
  const t = useTranslations("mockups.heroFlip.ask");
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(S.IDLE);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStage(S.IDLE);
    if (!active) return;

    const el = ref.current;
    if (!el) return;

    const run = () => {
      timers.current.push(setTimeout(() => setStage(S.USER), 200));
      timers.current.push(setTimeout(() => setStage(S.TYPING), 700));
      timers.current.push(setTimeout(() => setStage(S.RESPONSE), 1500));
      timers.current.push(setTimeout(() => setStage(S.METRIC), 2000));
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, [active]);

  const shown = (s: number) => ({
    opacity: stage >= s ? 1 : 0,
    transform: `translateY(${stage >= s ? 0 : 8}px)`,
    transition: "opacity 350ms ease, transform 350ms cubic-bezier(.4,0,.2,1)",
  });

  return (
    <div ref={ref} className="relative flex items-center justify-center py-4">
      <div className="pointer-events-none absolute -right-8 top-4 h-56 w-56 rounded-full bg-brand-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 rounded-full bg-primary-500/10 blur-2xl" />

      <div className="w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/90">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500/10 text-xs text-primary-600 dark:text-primary-400">
            ✦
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-white">{t("title")}</span>
          <span className="ml-auto flex h-2 w-2 rounded-full bg-emerald-400" />
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-end" style={shown(S.USER)}>
            <div className="max-w-[88%] rounded-2xl rounded-br-sm bg-slate-100 px-3.5 py-2.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {t("question")}
            </div>
          </div>

          {stage === S.TYPING && (
            <div className="flex items-center gap-2 px-1">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-[10px] text-primary-600 dark:text-primary-400">
                ✦
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2" style={shown(S.RESPONSE)}>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-[10px] text-primary-600 dark:text-primary-400">
              ✦
            </div>
            <div className="flex-1 space-y-2">
              <div className="rounded-2xl rounded-tl-sm bg-primary-500/8 px-3.5 py-2.5 text-xs text-slate-700 dark:bg-primary-500/15 dark:text-slate-200">
                {t("answer")}
              </div>
              <div
                className="rounded-2xl border border-primary-500/15 bg-primary-500/5 p-3.5 dark:border-primary-500/25 dark:bg-primary-500/10"
                style={shown(S.METRIC)}
              >
                <p className="text-2xl font-black tracking-tight text-primary-500 dark:text-[#4A47FF]">
                  {t("total")}
                </p>
                <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">{t("detail1")}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{t("detail2")}</p>
              </div>
              <p className="px-1 text-[10px] text-slate-400" style={shown(S.METRIC)}>
                {t("footnote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
