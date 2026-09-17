import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LogoIcon from "@/components/LogoIcon";
import GarIqWordmark from "@/components/GarIqWordmark";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Footer from "@/components/Footer";
import RichParagraphs from "@/components/shared/RichParagraphs";

export type LegalSection = {
  title: string;
  body: string;
};

type Props = {
  title: string;
  updatedIso: string;
  intro: string;
  sections: LegalSection[];
};

export default async function LegalArticleScreen({
  title,
  updatedIso,
  intro,
  sections,
}: Props) {
  const format = await getFormatter();
  const tHeader = await getTranslations("header");
  const updatedLabel = format.dateTime(new Date(`${updatedIso}T12:00:00Z`), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

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
        <article className="mx-auto w-full max-w-prose">
          <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-tight text-slate-950 dark:text-white">
            {title}
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            <time dateTime={updatedIso}>{updatedLabel}</time>
          </p>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300 [&_p]:whitespace-pre-line">
            <RichParagraphs text={intro} />
          </div>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-[clamp(1.125rem,3vw,1.375rem)] font-bold tracking-tight text-slate-950 dark:text-white">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300 [&_p]:whitespace-pre-line">
                  <RichParagraphs text={section.body} />
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
