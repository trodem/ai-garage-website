import { setRequestLocale } from "next-intl/server";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehicleTypesBar from "@/components/VehicleTypesBar";
import ProblemSection from "@/components/ProblemSection";
import NotJustTracker from "@/components/NotJustTracker";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import WalkthroughSection from "@/components/WalkthroughSection";
import AiSection from "@/components/AiSection";
import StatsSection from "@/components/StatsSection";
import UseCases from "@/components/UseCases";
import ScenarioStories from "@/components/ScenarioStories";
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
        <VehicleTypesBar />
        <ProblemSection />
        <NotJustTracker />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorks />
        <WalkthroughSection />
        <AiSection />
        <StatsSection />
        <UseCases />
        <ScenarioStories />
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
