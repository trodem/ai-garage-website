import type { WelcomeCelebrationCopy } from "@/components/welcome/WelcomeCelebration";
import en from "@/messages/en.json";
import WelcomeCelebration from "@/components/welcome/WelcomeCelebration";

export function getAuthCallbackSignupCopy(): WelcomeCelebrationCopy {
  const s = en.authCallback.signup;
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

export default function AuthCallbackSignupView() {
  return <WelcomeCelebration copy={getAuthCallbackSignupCopy()} />;
}
