import { setRequestLocale } from "next-intl/server";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyGarIqSection from "@/components/WhyGarIqSection";
import ProductStorySection from "@/components/ProductStorySection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import AiSection from "@/components/AiSection";
import AudiencesSection from "@/components/AudiencesSection";
import PlansExplainer from "@/components/PlansExplainer";
import DownloadSection from "@/components/DownloadSection";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
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

      <main id="main-content">
        <Hero />
        <WhyGarIqSection />
        <ProductStorySection />
        <CapabilitiesSection />
        <AiSection />
        <AudiencesSection />
        <PlansExplainer />
        <DownloadSection />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
