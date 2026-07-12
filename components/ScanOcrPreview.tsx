"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const S = { IDLE: 0, SOURCE: 1, ANALYZING: 2, DRAFT: 3, CONFIRM: 4 };

type ScanOcrPreviewProps = {
  active?: boolean;
};

export default function ScanOcrPreview({ active = true }: ScanOcrPreviewProps) {
  const t = useTranslations("mockups.heroFlip.scan");
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(S.IDLE);
  const [source, setSource] = useState<"photo" | "pdf">("photo");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStage(S.IDLE);
    setSource("photo");
    if (!active) return;

    const el = ref.current;
    if (!el) return;

    const run = () => {
      timers.current.push(setTimeout(() => setStage(S.SOURCE), 150));
      timers.current.push(setTimeout(() => setSource("pdf"), 1100));
      timers.current.push(setTimeout(() => setStage(S.ANALYZING), 1600));
      timers.current.push(setTimeout(() => setStage(S.DRAFT), 2600));
      timers.current.push(setTimeout(() => setStage(S.CONFIRM), 3100));
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

  const fields = t.raw("fields") as Record<string, string>;
  const values = t.raw("values") as Record<string, string>;
  const draftFields = [
    { label: fields.date, value: values.date },
    { label: fields.location, value: values.location },
    { label: fields.total, value: values.total, highlight: true },
    { label: fields.pricePerLiter, value: values.pricePerLiter },
    { label: fields.odometer, value: values.odometer },
    { label: fields.liters, value: values.liters },
  ];

  return (
    <div ref={ref} className="relative flex items-center justify-center py-4">
      <div className="pointer-events-none absolute -right-8 top-4 h-56 w-56 rounded-full bg-brand-pink/10 blur-3xl" />
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
          <div style={shown(S.SOURCE)}>
            <div className="mb-2 flex gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  source === "photo"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {t("photoBadge")}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  source === "pdf"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {t("pdfBadge")}
              </span>
            </div>

            {source === "photo" ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-200 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
                <div className="flex items-center justify-between border-b border-slate-200/80 px-3 py-2 dark:border-slate-700">
                  <span className="text-[10px] font-semibold text-slate-500">IMG · receipt.jpg</span>
                  <span className="text-[10px] text-slate-400">2.1 MB</span>
                </div>
                <div className="space-y-1.5 px-8 py-5">
                  <div className="mx-auto h-1.5 w-16 rounded-full bg-slate-300/80 dark:bg-slate-600" />
                  <div className="mx-auto h-20 w-full max-w-[9rem] rounded-lg border border-dashed border-slate-300/90 bg-white/70 p-2 dark:border-slate-600 dark:bg-slate-800/70">
                    <div className="space-y-1">
                      <div className="h-1 rounded bg-slate-300 dark:bg-slate-600" />
                      <div className="h-1 w-[80%] rounded bg-slate-300 dark:bg-slate-600" />
                      <div className="h-1 w-[60%] rounded bg-slate-300 dark:bg-slate-600" />
                      <div className="mt-2 h-1 w-[40%] rounded bg-brand-pink/50" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/60">
                <span className="flex h-12 w-10 items-center justify-center rounded-md bg-brand-cyan/15 text-[11px] font-black text-brand-cyan">
                  PDF
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">
                    invoice-fuel.pdf
                  </p>
                  <p className="text-[10px] text-slate-400">184 KB · 1 page</p>
                </div>
              </div>
            )}
          </div>

          {stage === S.ANALYZING && (
            <div className="flex items-center gap-2 rounded-2xl bg-primary-500/8 px-3.5 py-2.5 text-xs text-slate-600 dark:bg-primary-500/15 dark:text-slate-200">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-500"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </span>
              {t("analyzing")}
            </div>
          )}

          <div style={shown(S.DRAFT)}>
            <p className="mb-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {t("draftIntro")}
            </p>
            <div className="rounded-2xl border border-primary-500/15 bg-primary-500/5 p-3.5 dark:border-primary-500/25 dark:bg-primary-500/10">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="text-base leading-none">⛽</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {t("eventTitle")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {draftFields.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-lg bg-white/70 px-2.5 py-1.5 dark:bg-slate-800/60"
                  >
                    <p className="text-[9px] text-slate-400">{f.label}</p>
                    <p
                      className={`truncate text-xs font-bold ${
                        f.highlight
                          ? "text-primary-500 dark:text-[#4A47FF]"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {f.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={shown(S.CONFIRM)}>
            <div className="flex items-center justify-center gap-2 rounded-full bg-slate-900 py-2 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">
              <span>✓</span>
              <span>{t("confirm")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
