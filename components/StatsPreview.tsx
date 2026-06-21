"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "./CountUp";

type StatsPreviewProps = {
  spendLabel: string;
  categoryLabel: string;
  trendLabel: string;
  filtersLabel: string;
  categories: string[];
};

const CATEGORY_STYLE = [
  { pct: 42, color: "#F2137B", amount: "€ 1,356" },
  { pct: 28, color: "#00A7E5", amount: "€ 904" },
  { pct: 18, color: "#1F1BE8", amount: "€ 581" },
  { pct: 12, color: "#94a3b8", amount: "€ 387" },
];

const MONTHS = [40, 62, 35, 78, 54, 90, 48, 66, 30, 72, 58, 84];

export default function StatsPreview({
  spendLabel,
  categoryLabel,
  trendLabel,
  filtersLabel,
  categories,
}: StatsPreviewProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const leaving = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (leaving.current) clearTimeout(leaving.current);
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setTilt({ x: -dy * 6, y: dx * 8 });
  };

  const onMouseLeave = () => {
    leaving.current = setTimeout(() => setTilt({ x: 0, y: 0 }), 80);
  };

  return (
    <div
      ref={wrapRef}
      className="w-full"
      style={{ perspective: "900px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.13)] backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/90"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 180ms ease-out",
        }}
      >
        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-600 dark:bg-brand-cyan/12 dark:text-brand-cyan">
            {filtersLabel}
          </span>
        </div>

        {/* Total spend */}
        <div className="mb-5 flex items-baseline justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            {spendLabel}
          </span>
          <span className="text-2xl font-black tracking-tight text-primary-500 dark:text-[#4A47FF] lg:text-3xl">
            <CountUp value={3228} prefix="€ " />
          </span>
        </div>

        {/* Category bars */}
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          {categoryLabel}
        </p>
        <div className="space-y-3">
          {categories.map((label, i) => {
            const style = CATEGORY_STYLE[i] ?? CATEGORY_STYLE[CATEGORY_STYLE.length - 1];
            return (
              <div key={label}>
                <div className="mb-1 flex justify-between gap-2 text-xs sm:text-sm">
                  <span className="flex min-w-0 items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: style.color }}
                    />
                    <span className="truncate">{label}</span>
                  </span>
                  <span className="shrink-0 font-bold text-slate-600 dark:text-slate-300">
                    {style.amount}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: style.color,
                      width: animated ? `${style.pct}%` : "0%",
                      transition: `width 900ms cubic-bezier(.4,0,.2,1) ${i * 120}ms`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Monthly trend */}
        <p className="mb-2 mt-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          {trendLabel}
        </p>
        <div className="flex items-end justify-between gap-1" style={{ height: 64 }}>
          {MONTHS.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: animated ? `${h}%` : "0%",
                background:
                  h === Math.max(...MONTHS)
                    ? "linear-gradient(180deg,#00A7E5,#1F1BE8)"
                    : "rgba(148,163,184,0.35)",
                transition: `height 800ms cubic-bezier(.4,0,.2,1) ${i * 50}ms`,
                minHeight: 4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
