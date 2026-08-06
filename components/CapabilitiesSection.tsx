"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import Reveal from "./Reveal";

type CapTab = {
  id: string;
  label: string;
  title: string;
  bullets: string[];
  cta?: { href: string; label: string };
};

export default function CapabilitiesSection() {
  const t = useTranslations("capabilities");
  const tabs = t.raw("tabs") as CapTab[];
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "capture");
  const baseId = useId();
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") {
      return;
    }
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    setActiveId(tabs[next].id);
    const btn = document.getElementById(`${baseId}-tab-${tabs[next].id}`);
    btn?.focus();
  };

  if (!active) return null;

  return (
    <section id="capabilities" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="max-w-2xl">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title">{t("title")}</h2>
        <p className="section-copy mt-4">{t("copy")}</p>
      </Reveal>

      <div
        role="tablist"
        aria-label={t("label")}
        className="mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                selected
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                  : "border border-slate-300 text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <Reveal key={active.id} className="mt-8">
        <div
          id={`${baseId}-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active.id}`}
          className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950 sm:p-8"
        >
          <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-2xl">
            {active.title}
          </h3>
          <ul className="mt-6 space-y-3">
            {active.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 text-base leading-relaxed text-slate-600 dark:text-slate-300"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F2137B]"
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          {active.cta ? (
            <a
              href={active.cta.href}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {active.cta.label}
            </a>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
