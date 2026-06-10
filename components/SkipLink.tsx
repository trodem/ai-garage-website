import { getTranslations } from "next-intl/server";

export default async function SkipLink() {
  const t = await getTranslations("common");
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white dark:focus:bg-white dark:focus:text-slate-900"
    >
      {t("skipToContent")}
    </a>
  );
}
