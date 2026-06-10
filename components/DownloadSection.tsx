import { getTranslations } from "next-intl/server";

const playUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL?.trim() ?? "";
const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() ?? "";

function StoreButton({
  label,
  href,
  comingSoonLabel,
  available,
}: {
  label: string;
  href: string;
  comingSoonLabel: string;
  available: boolean;
}) {
  if (available) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-soft inline-flex min-h-[3.25rem] min-w-[11rem] items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600"
      >
        {label}
      </a>
    );
  }

  return (
    <span
      className="inline-flex min-h-[3.25rem] min-w-[11rem] cursor-not-allowed items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-400 dark:border-slate-600 dark:bg-slate-900/50 dark:text-slate-500"
      aria-disabled="true"
    >
      {label} — {comingSoonLabel}
    </span>
  );
}

export default async function DownloadSection() {
  const t = await getTranslations("download");

  return (
    <section id="download" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-primary-100 bg-primary-50/80 p-8 text-center dark:border-primary-500/20 dark:bg-primary-500/5 lg:p-14">
        <span className="section-label">{t("label")}</span>
        <h2 className="section-title mx-auto mt-2 max-w-2xl">{t("title")}</h2>
        <p className="section-copy mx-auto mt-4 max-w-xl">{t("copy")}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <StoreButton
            label={t("playStore")}
            href={playUrl}
            comingSoonLabel={t("comingSoon")}
            available={playUrl.length > 0}
          />
          <StoreButton
            label={t("appStore")}
            href={appStoreUrl}
            comingSoonLabel={t("comingSoon")}
            available={appStoreUrl.length > 0}
          />
        </div>
        {playUrl.length === 0 && appStoreUrl.length === 0 && (
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">{t("comingSoonHint")}</p>
        )}
      </div>
    </section>
  );
}
