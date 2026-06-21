"use client";

import { useTranslations } from "next-intl";
import LogoIcon from "@/components/LogoIcon";

const BAR_DATA = [
  { monthKey: "jan", km: 420 },
  { monthKey: "feb", km: 310 },
  { monthKey: "mar", km: 580 },
  { monthKey: "apr", km: 490 },
  { monthKey: "may", km: 720 },
  { monthKey: "jun", km: 390 },
];

const MAX_KM = Math.max(...BAR_DATA.map((d) => d.km));

const TIMELINE = [
  { type: "refuel", labelKey: "refueling", detailKey: "fuelDetail1", dateKey: "jun10" },
  { type: "workshop", labelKey: "service", detailKey: "oilFilters", dateKey: "jun2" },
  { type: "refuel", labelKey: "refueling", detailKey: "fuelDetail2", dateKey: "may28" },
  { type: "workshop", labelKey: "brakes", detailKey: "brakePads", dateKey: "may15" },
];

const TYPE_COLORS: Record<string, string> = {
  refuel:   "#00A7E5",
  workshop: "#F2137B",
};

export default function PhoneMockup() {
  const t = useTranslations("mockups.phoneMockup");

  return (
    <div className="relative flex items-center justify-center">
      {/* ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute left-1/3 top-1/3 h-44 w-44 rounded-full bg-brand-cyan/12 blur-2xl" />
      <div className="absolute right-1/4 bottom-1/4 h-36 w-36 rounded-full bg-brand-pink/12 blur-2xl" />

      {/* phone frame */}
      <div className="relative z-10 w-64 overflow-hidden rounded-[2.5rem] border-[6px] border-slate-800 bg-slate-950 shadow-[0_40px_80px_rgba(0,0,0,0.55)] sm:w-72 md:w-80">
        {/* notch */}
        <div className="flex justify-center bg-slate-950 pb-1 pt-2">
          <div className="h-5 w-24 rounded-full bg-slate-800" />
        </div>

        {/* screen */}
        <div className="relative bg-linear-to-b from-slate-900 via-[#0d0c2b] to-slate-950 px-4 pb-5 pt-3">
          {/* status bar */}
          <div className="mb-3 flex items-center justify-between text-[10px] text-slate-500">
            <span>9:41</span>
            <span>▊▊▊ ⬡</span>
          </div>

          {/* app header */}
          <div className="mb-4 flex items-center gap-2">
            <LogoIcon className="h-7 w-7" />
            <span className="text-sm font-extrabold">
              <span className="text-[#4A47FF]">Gar</span>
              <span className="text-brand-pink">IQ</span>
            </span>
          </div>

          {/* ── Bar chart ── */}
          <div className="mb-4 rounded-2xl border border-white/5 bg-white/5 p-3">
            <div className="mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
              {t("monthlyKm")}
            </div>
            <div className="flex items-end justify-between gap-1" style={{ height: 56 }}>
              {BAR_DATA.map((d, i) => {
                const pct = (d.km / MAX_KM) * 100;
                const isLast = i === BAR_DATA.length - 1;
                return (
                  <div key={d.monthKey} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-sm"
                      style={{
                        height: `${pct}%`,
                        background: isLast
                          ? "linear-gradient(180deg,#00A7E5,#1F1BE8)"
                          : "rgba(255,255,255,0.12)",
                        minHeight: 4,
                      }}
                    />
                    <span className="text-[8px] text-slate-500">{t(d.monthKey)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Timeline ── */}
          <div className="rounded-2xl border border-white/5 bg-white/5 p-3">
            <div className="mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-400">
              {t("latestEvents")}
            </div>
            <div className="relative space-y-3 pl-5">
              {/* vertical line */}
              <div className="absolute bottom-1 left-1.75 top-1 w-px bg-white/10" />

              {TIMELINE.map((ev, i) => (
                <div key={i} className="relative flex items-start gap-2">
                  {/* dot */}
                  <div
                    className="absolute -left-5 mt-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px]"
                    style={{ background: TYPE_COLORS[ev.type] + "22", border: `1.5px solid ${TYPE_COLORS[ev.type]}` }}
                  >
                    <span style={{ color: TYPE_COLORS[ev.type] }}>
                      {ev.type === "refuel" ? "⛽" : "🔧"}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-semibold text-white">{t(ev.labelKey)}</span>
                      <span className="text-[8px] text-slate-500">{t(ev.dateKey)}</span>
                    </div>
                    <div className="text-[9px] text-slate-400">{t(ev.detailKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* home indicator */}
        <div className="flex justify-center bg-slate-950 py-2">
          <div className="h-1 w-20 rounded-full bg-slate-700" />
        </div>
      </div>
    </div>
  );
}
