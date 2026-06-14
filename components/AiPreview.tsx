"use client";

import { useEffect, useRef, useState } from "react";

const S = { IDLE: 0, USER: 1, TYPING: 2, RESPONSE: 3, CARD: 4, BUTTON: 5 };

export default function AiPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(S.IDLE);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStage(S.USER),     300);
          setTimeout(() => setStage(S.TYPING),   900);
          setTimeout(() => setStage(S.RESPONSE), 1800);
          setTimeout(() => setStage(S.CARD),     2300);
          setTimeout(() => setStage(S.BUTTON),   2800);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shown = (s: number) => ({
    opacity: stage >= s ? 1 : 0,
    transform: `translateY(${stage >= s ? 0 : 8}px)`,
    transition: "opacity 350ms ease, transform 350ms cubic-bezier(.4,0,.2,1)",
  });

  return (
    <div ref={ref} className="relative flex items-center justify-center py-4">
      <div className="pointer-events-none absolute -right-8 top-4 h-56 w-56 rounded-full bg-brand-pink/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 rounded-full bg-primary-500/10 blur-2xl" />

      <div
        className="w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-700/50 dark:bg-slate-900/90"
        style={{
          opacity: stage >= S.IDLE ? 1 : 0,
          transform: `translateY(${stage >= S.IDLE ? 0 : 20}px)`,
          transition: "opacity 700ms ease, transform 700ms cubic-bezier(.4,0,.2,1)",
        }}
      >
        {/* chat header */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500/10 text-xs text-primary-600 dark:text-primary-400">
            ✦
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-white">Ask AI</span>
          <span className="ml-auto flex h-2 w-2 rounded-full bg-emerald-400" />
        </div>

        <div className="space-y-3 text-sm">
          {/* user message */}
          <div className="flex justify-end" style={shown(S.USER)}>
            <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-slate-100 px-3.5 py-2.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Ho fotografato lo scontrino del pieno 📸
            </div>
          </div>

          {/* typing dots */}
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

          {/* AI text response */}
          <div className="flex gap-2" style={shown(S.RESPONSE)}>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500/10 text-[10px] text-primary-600 dark:text-primary-400">
              ✦
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-primary-500/8 px-3.5 py-2.5 text-xs text-slate-700 dark:bg-primary-500/15 dark:text-slate-200">
              Ho trovato questi dati dallo scontrino:
            </div>
          </div>

          {/* extracted event card */}
          <div
            className="ml-9"
            style={{
              opacity: stage >= S.CARD ? 1 : 0,
              transform: `translateY(${stage >= S.CARD ? 0 : 10}px) scale(${stage >= S.CARD ? 1 : 0.97})`,
              transition: "opacity 400ms ease, transform 400ms cubic-bezier(.4,0,.2,1)",
            }}
          >
            <div className="rounded-2xl border border-primary-500/15 bg-primary-500/5 p-3.5 dark:border-primary-500/25 dark:bg-primary-500/10">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="text-base leading-none">⛽</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Rifornimento
                </span>
                <span className="ml-auto text-[10px] text-slate-400">14 giu</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Litri",  value: "45 L"     },
                  { label: "Totale", value: "€ 82.35"  },
                  { label: "€/L",    value: "1.83"     },
                  { label: "Km",     value: "48.230"   },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="rounded-lg bg-white/70 px-2.5 py-1.5 dark:bg-slate-800/60"
                  >
                    <p className="text-[9px] text-slate-400">{f.label}</p>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* confirm button */}
          <div className="ml-9" style={shown(S.BUTTON)}>
            <div className="flex items-center justify-center gap-2 rounded-full bg-slate-900 py-2 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">
              <span>✓</span>
              <span>Conferma e salva</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
