"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const STEPS = [
  { num: "01", key: "create", status: "done" },
  { num: "02", key: "add", status: "done" },
  { num: "03", key: "log", status: "active" },
  { num: "04", key: "docs", status: "pending" },
  { num: "05", key: "timeline", status: "pending" },
] as const;

export default function HowItWorksPreview() {
  const t = useTranslations("mockups.howItWorksPreview");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setProgress(60), 600);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative flex items-center justify-center py-4">
      <div className="pointer-events-none absolute left-1/4 top-0 h-52 w-52 rounded-full bg-brand-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-4 right-0 h-36 w-36 rounded-full bg-brand-pink/8 blur-2xl" />

      <div
        className="w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/90"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? 0 : 20}px)`,
          transition: "opacity 700ms ease, transform 700ms cubic-bezier(.4,0,.2,1)",
        }}
      >
        <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {t("title")}
        </p>

        <div className="space-y-2">
          {STEPS.map((s, i) => {
            const isDone    = s.status === "done";
            const isActive  = s.status === "active";
            const isPending = s.status === "pending";

            return (
              <div
                key={s.num}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-500 ${
                  isActive
                    ? "border border-primary-500/20 bg-primary-500/5 dark:border-primary-500/30 dark:bg-primary-500/10"
                    : "border border-transparent"
                }`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: `translateX(${visible ? 0 : -12}px)`,
                  transition: `opacity 400ms ease ${i * 120}ms, transform 400ms ease ${i * 120}ms, background 300ms ease, border-color 300ms ease`,
                }}
              >
                {/* step indicator */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-500 ${
                    isDone
                      ? "bg-emerald-500 text-white"
                      : isActive
                      ? "bg-primary-500 text-white"
                      : "border border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-500"
                  }`}
                >
                  {isDone ? "✓" : s.num}
                </div>

                {/* label */}
                <span
                  className={`text-sm font-semibold ${
                    isActive
                      ? "text-primary-600 dark:text-primary-400"
                      : isDone
                      ? "text-slate-600 dark:text-slate-300"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {t(s.key)}
                </span>

                {isActive && (
                  <span className="ml-auto shrink-0 rounded-full bg-primary-500/10 px-2 py-0.5 text-[10px] font-bold text-primary-600 dark:text-primary-400">
                    {t("active")}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* progress bar */}
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-[10px] text-slate-400">
            <span>{t("progress")}</span>
            <span style={{ transition: "all 700ms ease 600ms" }}>{visible ? "60%" : "0%"}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #1F1BE8, #00A7E5)",
                transition: "width 900ms cubic-bezier(.4,0,.2,1) 600ms",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
