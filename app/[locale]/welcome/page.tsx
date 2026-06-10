import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function WelcomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("welcome");

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <Image
        src="/images/garageapp-icon.png"
        alt="GarIQ"
        width={72}
        height={72}
        className="rounded-2xl shadow-lg"
        priority
      />
      <h1 className="mt-8 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{t("copy")}</p>
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">{t("hint")}</p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
      >
        {t("cta")}
      </Link>
    </main>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
