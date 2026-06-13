"use client";

import { useEffect, useState } from "react";

type Props = {
  hint: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  enabled?: boolean;
  delayMs?: number;
};

export default function StoreDownloadHint({
  hint,
  appStoreUrl,
  playStoreUrl,
  enabled = true,
  delayMs = 3000,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled || (!appStoreUrl && !playStoreUrl)) return;
    const timer = setTimeout(() => setVisible(true), delayMs);
    return () => clearTimeout(timer);
  }, [enabled, appStoreUrl, playStoreUrl, delayMs]);

  if (!visible || (!appStoreUrl && !playStoreUrl)) return null;

  return (
    <div className="mt-6 sm:mt-8">
      <p className="text-sm text-slate-500 sm:text-base dark:text-slate-400">{hint}</p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
        {appStoreUrl ? (
          <a
            href={appStoreUrl}
            className="min-h-11 text-sm font-medium text-slate-700 underline hover:text-slate-900 sm:text-base dark:text-slate-300 dark:hover:text-white"
          >
            App Store
          </a>
        ) : null}
        {playStoreUrl ? (
          <a
            href={playStoreUrl}
            className="min-h-11 text-sm font-medium text-slate-700 underline hover:text-slate-900 sm:text-base dark:text-slate-300 dark:hover:text-white"
          >
            Google Play
          </a>
        ) : null}
      </div>
    </div>
  );
}
