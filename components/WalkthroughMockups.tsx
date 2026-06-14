import type { ReactNode } from "react";
import {
  FuelIcon,
  WrenchIcon,
  ShieldIcon,
  ReceiptIcon,
  CarIcon,
  VanIcon,
  MotorcycleIcon,
  HomeIcon,
  SparkleIcon,
  SwapIcon,
} from "./icons/AppIcons";

/** Shared flat "app card" shell — matches AiPreview / FeaturesPreview / StatsPreview style. */
function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex items-center justify-center py-4">
      <div className="pointer-events-none absolute -right-8 -top-6 h-52 w-52 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-2 h-40 w-40 rounded-full bg-brand-cyan/10 blur-2xl" />
      <div className="w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/90">
        {children}
      </div>
    </div>
  );
}

function Bar({ w = "100%", c }: { w?: string; c?: string }) {
  return (
    <span
      className="block h-2 rounded-full"
      style={{ width: w, background: c ?? "rgba(148,163,184,0.35)" }}
    />
  );
}

/* 1 — Capture: photo → editable AI draft */
function CaptureMockup() {
  const fields = [
    { label: "Litri", value: "45 L" },
    { label: "€/L", value: "1.83" },
    { label: "Totale", value: "€ 82.35", hl: true },
    { label: "Km", value: "48.230" },
  ];
  return (
    <Frame>
      <div className="mb-4 flex items-center gap-2">
        <FuelIcon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        <span className="text-sm font-bold text-slate-800 dark:text-white">Rifornimento</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Bozza IA
        </span>
      </div>
      <div className="mb-4 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="flex h-12 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm dark:bg-slate-700 dark:text-slate-300">
          <ReceiptIcon className="h-6 w-6" />
        </div>
        <div className="flex-1 space-y-1.5">
          <Bar w="80%" />
          <Bar w="60%" />
          <Bar w="40%" />
        </div>
        <span className="text-lg text-primary-500 dark:text-brand-cyan">↓</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {fields.map((f) => (
          <div key={f.label} className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2 dark:border-slate-800 dark:bg-slate-800/50">
            <p className="text-[10px] text-slate-400">{f.label}</p>
            <p className={`text-sm font-bold ${f.hl ? "text-primary-500 dark:text-[#4A47FF]" : "text-slate-700 dark:text-slate-200"}`}>{f.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-slate-900 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
        <span>✓</span><span>Conferma e salva</span>
      </div>
    </Frame>
  );
}

/* 2 — Timeline grouped by year */
function TimelineMockup() {
  const rows = [
    { Icon: FuelIcon, c: "#00A7E5", cost: "€ 82,35", date: "14 giu" },
    { Icon: WrenchIcon, c: "#F2137B", cost: "€ 240,00", date: "2 giu" },
    { Icon: ShieldIcon, c: "#1F1BE8", cost: "€ 410,00", date: "20 mag" },
  ];
  return (
    <Frame>
      <div className="mb-4 flex items-center justify-between rounded-xl border border-primary-500/20 bg-primary-500/5 px-3.5 py-2.5 dark:border-primary-500/30 dark:bg-primary-500/10">
        <span className="text-base font-bold text-slate-800 dark:text-white">2025</span>
        <span className="text-primary-500 dark:text-brand-cyan">⌄</span>
      </div>
      <div className="relative space-y-3 pl-7">
        <div className="absolute bottom-2 left-3 top-2 w-px bg-slate-200 dark:bg-slate-700" />
        {rows.map((r, i) => (
          <div key={i} className="relative flex items-center gap-3">
            <div
              className="absolute -left-7 flex h-6 w-6 items-center justify-center rounded-full"
              style={{ background: r.c + "1f", color: r.c }}
            >
              <r.Icon className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1 space-y-1.5">
              <Bar w="70%" />
              <Bar w="45%" />
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{r.cost}</p>
              <p className="text-[10px] text-slate-400">{r.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 px-3.5 py-2.5 dark:border-slate-800">
        <span className="text-base font-bold text-slate-400">2024</span>
        <span className="text-slate-400">›</span>
      </div>
    </Frame>
  );
}

/* 3 — Statistics: per-vehicle comparison */
function VehicleStatsMockup() {
  const vehicles = [
    { Icon: MotorcycleIcon, pct: 100, cost: "€ 2.984", c: "#1F1BE8" },
    { Icon: VanIcon, pct: 38, cost: "€ 1.135", c: "#F2137B" },
    { Icon: CarIcon, pct: 22, cost: "€ 585", c: "#00A7E5" },
  ];
  return (
    <Frame>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-800 dark:text-white">Per veicolo</span>
        <span className="rounded-full bg-primary-500/10 px-2.5 py-1 text-[11px] font-semibold text-primary-600 dark:bg-brand-cyan/12 dark:text-brand-cyan">2025</span>
      </div>
      <div className="space-y-4">
        {vehicles.map((v, i) => (
          <div key={i}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <v.Icon className="h-5 w-5" style={{ color: v.c }} />
                <span className="h-2 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
              </span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{v.cost}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full rounded-full" style={{ width: `${v.pct}%`, background: v.c }} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 4 — Ask with a document citation */
function AskCitationMockup() {
  return (
    <Frame>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400">
          <SparkleIcon className="h-4 w-4" />
        </div>
        <span className="text-sm font-bold text-slate-800 dark:text-white">Ask AI</span>
        <span className="ml-auto flex h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-slate-100 px-3.5 py-2.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            Pressione gomme consigliata?
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400">
            <SparkleIcon className="h-4 w-4" />
          </div>
          <div className="flex-1 rounded-2xl rounded-tl-sm bg-primary-500/8 px-3.5 py-2.5 dark:bg-primary-500/15">
            <p className="mb-2 text-xs text-slate-700 dark:text-slate-200">2,4 bar (anteriore) · 2,6 bar (posteriore)</p>
            <div className="flex items-center gap-2 rounded-lg border-l-2 border-brand-cyan bg-white/70 px-2.5 py-1.5 dark:bg-slate-800/70">
              <span className="flex h-7 w-6 items-center justify-center rounded bg-brand-cyan/15 text-[9px] font-bold text-brand-cyan">PDF</span>
              <div className="flex-1 space-y-1">
                <Bar w="85%" />
                <Bar w="55%" />
              </div>
              <span className="text-[9px] text-slate-400">p. 12</span>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* 5 — Multi-garage switcher + vehicles */
function MultiGarageMockup() {
  const vehicles = [
    { Icon: CarIcon, c: "#00A7E5" },
    { Icon: MotorcycleIcon, c: "#F2137B" },
  ];
  return (
    <Frame>
      <div className="mb-4 flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/5 px-3 py-2 dark:bg-primary-500/10">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white">
          <HomeIcon className="h-4 w-4" />
        </span>
        <span className="h-2 w-24 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="ml-auto text-primary-500 dark:text-brand-cyan">⌄</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {vehicles.map((v, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-800/50">
            <div
              className="mb-2.5 flex h-16 items-center justify-center rounded-xl"
              style={{ background: v.c + "18", color: v.c }}
            >
              <v.Icon className="h-8 w-8" />
            </div>
            <Bar w="80%" />
            <div className="mt-2 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: v.c }} />
              <span className="h-1.5 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        <span className="h-1.5 w-4 rounded-full bg-primary-500" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
      </div>
    </Frame>
  );
}

/* 6 — Automatic currency conversion */
function MultiCurrencyMockup() {
  return (
    <Frame>
      <div className="mb-4 flex items-center gap-2">
        <FuelIcon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        <span className="text-sm font-bold text-slate-800 dark:text-white">Rifornimento</span>
        <span className="ml-auto text-[10px] text-slate-400">12 giu</span>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center dark:border-slate-800 dark:bg-slate-800/50">
        <p className="text-[10px] uppercase tracking-widest text-slate-400">Costo nel garage</p>
        <p className="mt-1 text-3xl font-black tracking-tight text-primary-500 dark:text-[#4A47FF]">€ 74,20</p>
        <div className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-white/70 px-3 py-2.5 dark:bg-slate-900/60">
          <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-200">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-[11px] font-bold text-white">₣</span>
            68,00
          </span>
          <SwapIcon className="h-4 w-4 text-brand-cyan" />
          <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700 dark:text-slate-200">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan text-[11px] font-bold text-white">€</span>
            74,20
          </span>
        </div>
        <p className="mt-2 text-[10px] text-slate-400">1 CHF = 1,091 € · cambio del 12 giu</p>
      </div>
    </Frame>
  );
}

const MOCKUPS = [
  CaptureMockup,
  TimelineMockup,
  VehicleStatsMockup,
  AskCitationMockup,
  MultiGarageMockup,
  MultiCurrencyMockup,
];

export default function WalkthroughMockup({ index }: { index: number }) {
  const Mockup = MOCKUPS[index] ?? MOCKUPS[0];
  return <Mockup />;
}
