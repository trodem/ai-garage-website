"use client";

import { useEffect, useRef, useState } from "react";

const FIELDS = [
  { label: "Data",   value: "14 giu 2025" },
  { label: "Km",     value: "48.230" },
  { label: "Litri",  value: "45 L" },
  { label: "€/L",    value: "1.83" },
  { label: "Totale", value: "€ 82.35", highlight: true },
];

const CHIPS = [
  { icon: "⛽", label: "Rifornimento", active: true },
  { icon: "🔧", label: "Manutenzione" },
  { icon: "🛡️", label: "Assicurazione" },
];

export default function FeaturesPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setAnimated(true), 200);
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
      <div className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-4 h-40 w-40 rounded-full bg-brand-cyan/10 blur-2xl" />

      <div
        className="w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/90"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translateY(${visible ? 0 : 20}px)`,
          transition: "opacity 700ms ease, transform 700ms cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* header */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-800 dark:text-white">Nuovo evento</span>
          <span
            className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
            style={{ opacity: animated ? 1 : 0, transition: "opacity 400ms ease 80ms" }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Bozza IA
          </span>
        </div>

        {/* type chips */}
        <div className="mb-5 flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <span
              key={chip.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                chip.active
                  ? "bg-primary-500 text-white"
                  : "border border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-500"
              }`}
            >
              {chip.icon} {chip.label}
            </span>
          ))}
        </div>

        {/* form fields */}
        <div className="space-y-2.5">
          {FIELDS.map((f, i) => (
            <div
              key={f.label}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-2.5 dark:border-slate-800 dark:bg-slate-800/50"
              style={{
                opacity: animated ? 1 : 0,
                transform: `translateX(${animated ? 0 : 10}px)`,
                transition: `opacity 400ms ease ${i * 70}ms, transform 400ms ease ${i * 70}ms`,
              }}
            >
              <span className="text-xs font-medium text-slate-400">{f.label}</span>
              <span
                className={`text-sm font-bold ${
                  f.highlight
                    ? "text-primary-500 dark:text-[#4A47FF]"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {f.value}
              </span>
            </div>
          ))}
        </div>

        {/* confirm button */}
        <div
          className="mt-5"
          style={{
            opacity: animated ? 1 : 0,
            transform: `translateY(${animated ? 0 : 8}px)`,
            transition: "opacity 400ms ease 420ms, transform 400ms ease 420ms",
          }}
        >
          <div className="flex items-center justify-center gap-2 rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
            <span>✓</span>
            <span>Conferma e salva</span>
          </div>
        </div>
      </div>
    </div>
  );
}
