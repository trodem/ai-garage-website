import { setRequestLocale } from "next-intl/server";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import StickyDownloadCta from "@/components/StickyDownloadCta";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import AskWalkthroughSection from "@/components/AskWalkthroughSection";
import PlansExplainer from "@/components/PlansExplainer";
import DownloadSection from "@/components/DownloadSection";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SkipLink />

      <ScrollProgress />

      <div className="fixed inset-x-0 top-0 -z-10 mx-auto max-w-6xl overflow-hidden">
        <div className="aurora" />
        <div className="aurora-pink" />
      </div>

      <div className="noise-overlay" aria-hidden="true" />

      <Header />
      <StickyDownloadCta />

      <main id="main-content">
        <Hero />
        <ProblemSection />
        <AskWalkthroughSection />
        <PlansExplainer />
        <DownloadSection />
        <Faq />
      </main>

      <Footer />
      <div className="h-20 md:hidden" aria-hidden="true" />
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
