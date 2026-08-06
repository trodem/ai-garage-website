"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function StickyDownloadCta() {
  const t = useTranslations("header");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      setVisible(progress >= 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-xl transition-transform duration-300 md:hidden dark:border-slate-800 dark:bg-slate-950/95 motion-reduce:transition-none ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <a
        href="#download"
        className="btn-shine flex min-h-11 w-full items-center justify-center rounded-full bg-primary-500 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600"
        tabIndex={visible ? 0 : -1}
      >
        {t("ctaDownload")}
      </a>
    </div>
  );
}
