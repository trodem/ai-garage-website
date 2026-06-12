import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://gariq.app";

const themeScript = `
  const theme = localStorage.getItem('gariq-theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
`;

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const ogLocale =
    locale === "de" ? "de_DE" : locale === "it" ? "it_IT" : "en_US";

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [{ name: "GarIQ" }],
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        en: `${siteUrl}/en`,
        de: `${siteUrl}/de`,
        it: `${siteUrl}/it`,
      },
    },
    icons: {
      icon: [
        { url: "/images/favicon.ico" },
        { url: "/images/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/images/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: { url: "/images/apple-touch-icon.png" },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      title: t("title"),
      description: t("description"),
      url: `${siteUrl}/${locale}`,
      images: [{ url: "/images/og-gariq.svg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/og-gariq.svg"],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const metaT = await getTranslations({ locale, namespace: "metadata" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GarIQ",
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    description: metaT("description"),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
  };

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0b1020" />
        <meta name="color-scheme" content="dark light" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white font-sans text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
