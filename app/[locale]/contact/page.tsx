import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactScreen from "@/components/legal/ContactScreen";
import { routing } from "@/i18n/routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://gariq.app";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${siteUrl}/${locale}/contact`,
      languages: {
        en: `${siteUrl}/en/contact`,
        de: `${siteUrl}/de/contact`,
        it: `${siteUrl}/it/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactScreen />;
}
