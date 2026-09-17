import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import LegalArticleScreen from "@/components/legal/LegalArticleScreen";
import { SUPPORT_EMAIL } from "@/lib/legalContact";
import { routing } from "@/i18n/routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://gariq.app";

type PageProps = {
  params: Promise<{ locale: string }>;
};

function withEmail(text: string): string {
  return text.replaceAll("{email}", SUPPORT_EMAIL);
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${siteUrl}/${locale}/privacy`,
      languages: {
        en: `${siteUrl}/en/privacy`,
        de: `${siteUrl}/de/privacy`,
        it: `${siteUrl}/it/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("legal.privacy");
  const sections = (
    t.raw("sections") as { title: string; body: string }[]
  ).map((section) => ({
    title: section.title,
    body: withEmail(section.body),
  }));

  return (
    <LegalArticleScreen
      title={t("title")}
      updatedIso={t("updated")}
      intro={t("intro", { email: SUPPORT_EMAIL })}
      sections={sections}
    />
  );
}
