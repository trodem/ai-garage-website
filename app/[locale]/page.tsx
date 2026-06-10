import { setRequestLocale } from "next-intl/server";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehicleTypesBar from "@/components/VehicleTypesBar";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import AiSection from "@/components/AiSection";
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

      <div className="fixed inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-[28rem] max-w-6xl bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_56%),radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_34%)] blur-3xl dark:bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.22),transparent_56%),radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_34%)]" />
      </div>

      <Header />

      <main id="main-content">
        <Hero />
        <VehicleTypesBar />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorks />
        <AiSection />
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
