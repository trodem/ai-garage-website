"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import CountUp from "./CountUp";

const SPEND_ITEMS = [
  { key: "refueling", color: "#00A7E5", pct: 14, amount: "€ 515.52" },
  { key: "workshop", color: "#F2137B", pct: 38, amount: "€ 1,355.95" },
  { key: "other", color: "#94a3b8", pct: 48, amount: "€ 1,719.00" },
];

const YEARLY = [
  { year: "2024", pct: 42 },
  { year: "2025", pct: 100 },
];

const VEHICLES = [
  { emoji: "🏍️", name: "DUCATI Multistrada", kmValue: "6,450", cost: "€ 2,984.35", color: "#1F1BE8" },
  { emoji: "🚙", name: "HYUNDAI Santa Fe", kmValue: "30,431", cost: "€ 585.00", color: "#F2137B" },
];

function Card({
  children,
  z = 0,
  delay = 0,
  visible,
  className = "",
}: {
  children: React.ReactNode;
  z?: number;
  delay?: number;
  visible: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.13)] backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/90 ${className}`}
      style={{
        transform: `translateZ(${z}px) translateY(${visible ? 0 : 24}px)`,
        opacity: visible ? 1 : 0,
        transition: `transform 700ms cubic-bezier(.4,0,.2,1) ${delay}ms, opacity 700ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function AppPreview() {
  const t = useTranslations("mockups.appPreview");
  const wrapRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible,  setVisible]  = useState(false);
  const [animated, setAnimated] = useState(false);
  const [tilt, setTilt] = useState({ x: 10, y: -8 });
  const leaving = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
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

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (leaving.current) clearTimeout(leaving.current);
    const el = wrapRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    setTilt({ x: 10 - dy * 7, y: -8 + dx * 10 });
  };

  const onMouseLeave = () => {
    leaving.current = setTimeout(() => setTilt({ x: 10, y: -8 }), 80);
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full select-none"
      style={{ perspective: "900px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-0 h-56 w-56 rounded-full bg-brand-cyan/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-8 right-8 h-40 w-40 rounded-full bg-brand-pink/8 blur-2xl" />

      {/* 3-D scene */}
      <div
        ref={innerRef}
        className="flex flex-col gap-4"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 180ms ease-out",
        }}
      >
        {/* ── Total Spend — front layer ── */}
        <Card z={48} delay={0} visible={visible}>
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-1">
            <span className="text-xs font-semibold text-slate-400 sm:text-sm">{t("totalSpend")}</span>
            <span className="text-xl font-black tracking-tight text-primary-500 dark:text-[#4A47FF] sm:text-2xl lg:text-3xl">
              <CountUp value={3590.47} prefix="€ " decimals={2} />
            </span>
          </div>
          <div className="space-y-3">
            {SPEND_ITEMS.map((item, i) => (
              <div key={item.key}>
                <div className="mb-1 flex justify-between gap-2 text-xs sm:text-sm">
                  <span className="flex min-w-0 items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                    <span className="h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5" style={{ background: item.color }} />
                    <span className="truncate">{t(item.key)}</span>
                  </span>
                  <span className="shrink-0 font-bold text-slate-600 dark:text-slate-300">{item.amount}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 sm:h-2">
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: item.color,
                      width: animated ? `${item.pct}%` : "0%",
                      transition: `width 900ms cubic-bezier(.4,0,.2,1) ${i * 150}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Bottom row ── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4" style={{ transformStyle: "preserve-3d" }}>

          <Card z={24} delay={180} visible={visible}>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:mb-4 sm:text-[11px]">
              {t("yearlyTrend")}
            </p>
            <div className="flex items-end justify-around gap-2 sm:gap-4" style={{ height: 80 }}>
              {YEARLY.map((y) => {
                const active = y.pct === 100;
                return (
                  <div key={y.year} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex w-full items-end" style={{ height: 60 }}>
                      <div
                        className="w-full rounded-t-md sm:rounded-t-lg"
                        style={{
                          height: animated ? `${y.pct}%` : "0%",
                          background: active
                            ? "linear-gradient(180deg,#1F1BE8 0%,#00A7E5 100%)"
                            : "rgba(148,163,184,0.22)",
                          transition: `height 1000ms cubic-bezier(.4,0,.2,1) ${active ? 300 : 100}ms`,
                          minHeight: 4,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold sm:text-xs" style={{ color: active ? "#1F1BE8" : "#94a3b8" }}>
                      {y.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card z={36} delay={320} visible={visible} className="flex flex-col justify-between">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:mb-4 sm:text-[11px]">
              {t("byVehicle")}
            </p>
            <div className="space-y-2 sm:space-y-3">
              {VEHICLES.map((v, i) => (
                <div
                  key={v.name}
                  className="flex items-center gap-2 border-b border-slate-100 pb-2 last:border-0 last:pb-0 dark:border-slate-800 sm:gap-3 sm:pb-3"
                >
                  <span className="text-lg leading-none sm:text-2xl">{v.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-bold text-slate-700 dark:text-slate-200 sm:text-xs">{v.name}</p>
                    <p className="text-[9px] text-slate-400 sm:text-[10px]">{v.kmValue} {t("kmTracked")}</p>
                  </div>
                  <span
                    className="shrink-0 text-[11px] font-black sm:text-sm"
                    style={{
                      color: v.color,
                      opacity: animated ? 1 : 0,
                      transition: `opacity 600ms ease ${420 + i * 150}ms`,
                    }}
                  >
                    {v.cost}
                  </span>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
