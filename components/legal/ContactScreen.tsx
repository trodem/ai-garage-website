import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LogoIcon from "@/components/LogoIcon";
import GarIqWordmark from "@/components/GarIqWordmark";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Footer from "@/components/Footer";
import RichParagraphs from "@/components/shared/RichParagraphs";
import { getSupportMailto, SUPPORT_EMAIL } from "@/lib/legalContact";

export default async function ContactScreen() {
  const t = await getTranslations("legal.contact");
  const tHeader = await getTranslations("header");
  const includeItems = t.raw("includeItems") as string[];
  const mailto = getSupportMailto("GarIQ support");

  return (
    <>
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
            aria-label={tHeader("homeAria")}
          >
            <LogoIcon className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
            <GarIqWordmark size="sm" />
          </Link>
          <LocaleSwitcher />
        </div>
      </header>

      <main className="min-h-screen bg-white px-4 py-12 text-slate-900 sm:px-6 sm:py-16 md:py-20 dark:bg-slate-950 dark:text-slate-100">
        <div className="mx-auto w-full max-w-prose">
          <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-tight text-slate-950 dark:text-white">
            {t("title")}
          </h1>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300 [&_p]:whitespace-pre-line">
            <RichParagraphs text={t("lead", { email: SUPPORT_EMAIL })} />
          </div>

          <a
            href={mailto}
            className="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary-500 px-6 text-base font-semibold text-white transition hover:bg-primary-600 sm:w-auto dark:bg-brand-cyan-ink dark:hover:opacity-90"
          >
            {t("cta")}
          </a>

          <h2 className="mt-12 text-[clamp(1.125rem,3vw,1.375rem)] font-bold tracking-tight text-slate-950 dark:text-white">
            {t("includeTitle")}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
            {includeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-10 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300 [&_p]:whitespace-pre-line">
            <RichParagraphs text={t("billingNote")} />
          </div>

          <p className="mt-10 text-base text-slate-600 sm:text-lg dark:text-slate-400">
            {t("linksLead")}{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary-500 underline-offset-2 hover:underline dark:text-brand-cyan-ink"
            >
              {t("privacyLink")}
            </Link>
            {" · "}
            <Link
              href="/terms"
              className="font-medium text-primary-500 underline-offset-2 hover:underline dark:text-brand-cyan-ink"
            >
              {t("termsLink")}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
