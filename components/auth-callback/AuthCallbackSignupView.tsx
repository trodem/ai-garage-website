import type { WelcomeCelebrationCopy } from "@/components/welcome/WelcomeCelebration";
import {
  getAuthCallbackCopy,
  type AuthCallbackLocale,
} from "@/lib/authCallbackMessages";
import WelcomeCelebration from "@/components/welcome/WelcomeCelebration";

export function getAuthCallbackSignupCopy(
  locale: AuthCallbackLocale = "en",
): WelcomeCelebrationCopy {
  const s = getAuthCallbackCopy(locale).signup;
  return {
    badge: s.badge,
    title: s.title,
    lead: s.lead,
    stepsTitle: s.stepsTitle,
    step1: s.step1,
    step2: s.step2,
    step3: s.step3,
    benefitsTitle: s.benefitsTitle,
    benefit1: s.benefit1,
    benefit2: s.benefit2,
    benefit3: s.benefit3,
    footerHint: s.footerHint,
  };
}

type Props = {
  locale?: AuthCallbackLocale;
};

export default function AuthCallbackSignupView({ locale = "en" }: Props) {
  return <WelcomeCelebration copy={getAuthCallbackSignupCopy(locale)} />;
}
