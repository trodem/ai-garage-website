import { getTranslations } from "next-intl/server";
import Reveal from "./Reveal";
import { AppleIcon, GooglePlayIcon } from "./icons/StoreIcons";
import { getStoreUrls, getWaitlistMailto } from "@/lib/storeLinks";

function StoreButton({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-soft inline-flex min-h-[3.25rem] min-w-[11rem] items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-slate-600"
    >
      {icon}
      {label}
    </a>
  );
}

export default async function DownloadSection() {
  const t = await getTranslations("download");
  const { appStoreUrl, playStoreUrl } = getStoreUrls();
  const hasStores = appStoreUrl.length > 0 || playStoreUrl.length > 0;

  return (
    <section id="download" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <Reveal
        as="div"
        variant="scale"
        className="gradient-border rounded-[2rem] border border-primary-100 bg-primary-50/70 p-8 text-center dark:border-primary-500/20 dark:bg-primary-500/5 lg:p-14"
      >
        <span className="section-label">{t("label")}</span>
        <p className="mt-3 text-sm font-semibold tracking-tight text-primary-600 dark:text-brand-cyan">
          {t("brandLine")}
        </p>
        <h2 className="section-title mx-auto mt-2 max-w-2xl">{t("title")}</h2>
        <p className="section-copy mx-auto mt-4 max-w-xl">
          {hasStores ? t("copy") : t("waitlistCopy")}
        </p>

        {hasStores ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {playStoreUrl.length > 0 && (
              <StoreButton
                label={t("playStore")}
                href={playStoreUrl}
                icon={<GooglePlayIcon className="h-5 w-5" />}
              />
            )}
            {appStoreUrl.length > 0 && (
              <StoreButton
                label={t("appStore")}
                href={appStoreUrl}
                icon={<AppleIcon className="h-5 w-5" />}
              />
            )}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href={getWaitlistMailto()}
              className="btn-shine inline-flex min-h-11 min-w-[14rem] items-center justify-center rounded-full bg-primary-500 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-primary-600"
            >
              {t("waitlistCta")}
            </a>
            <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
              {t("waitlistHint")}
            </p>
          </div>
        )}

        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">{t("microTrust")}</p>
      </Reveal>
    </section>
  );
}
