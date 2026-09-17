import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>{t("copyright", { year })}</p>
        <div className="flex flex-wrap gap-5">
          <Link
            href="/privacy"
            className="hover:text-slate-900 dark:hover:text-white"
          >
            {t("privacy")}
          </Link>
          <Link
            href="/terms"
            className="hover:text-slate-900 dark:hover:text-white"
          >
            {t("terms")}
          </Link>
          <Link
            href="/contact"
            className="hover:text-slate-900 dark:hover:text-white"
          >
            {t("contact")}
          </Link>
          <a
            href="https://logo.dev"
            className="hover:text-slate-900 dark:hover:text-white"
          >
            {t("logoAttribution")}
          </a>
        </div>
      </div>
    </footer>
  );
}
