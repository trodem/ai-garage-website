import LogoIcon from "@/components/LogoIcon";
import GarIqWordmark from "@/components/GarIqWordmark";
import CelebrationBadge from "@/components/shared/CelebrationBadge";
import StandalonePageShell from "@/components/shared/StandalonePageShell";

export type WelcomeCelebrationCopy = {
  badge: string;
  title: string;
  lead: string;
  stepsTitle: string;
  step1: string;
  step2: string;
  step3: string;
  benefitsTitle: string;
  benefit1: string;
  benefit2: string;
  benefit3: string;
  footerHint: string;
};

type Props = {
  copy: WelcomeCelebrationCopy;
};

const steps = (copy: WelcomeCelebrationCopy) => [copy.step1, copy.step2, copy.step3];
const benefits = (copy: WelcomeCelebrationCopy) => [copy.benefit1, copy.benefit2, copy.benefit3];

export default function WelcomeCelebration({ copy }: Props) {
  return (
    <StandalonePageShell>
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <LogoIcon className="h-20 w-20 sm:h-24 sm:w-24" />
        <GarIqWordmark size="md" />
        <div className="section-label mt-2">{copy.badge}</div>
        <CelebrationBadge />
      </div>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950 sm:mt-8 sm:text-3xl md:text-4xl dark:text-white">
        {copy.title}
      </h1>
      <p className="mx-auto mt-4 max-w-prose text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">
        {copy.lead}
      </p>

      <section className="mt-8 text-left sm:mt-10">
        <h2 className="text-center text-sm font-bold uppercase tracking-wider text-primary-700 sm:text-base dark:text-primary-100">
          {copy.stepsTitle}
        </h2>
        <ol className="mt-4 flex flex-col gap-3 sm:gap-4">
          {steps(copy).map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-left backdrop-blur sm:gap-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white sm:h-9 sm:w-9">
                {index + 1}
              </span>
              <span className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-200">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 sm:mt-10">
        <h2 className="text-center text-lg font-semibold text-slate-950 sm:text-xl dark:text-white">
          {copy.benefitsTitle}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4">
          {benefits(copy).map((benefit) => (
            <li
              key={benefit}
              className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm leading-relaxed text-slate-600 backdrop-blur sm:p-5 sm:text-base dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
            >
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-sm text-slate-500 sm:mt-10 sm:text-base dark:text-slate-400">{copy.footerHint}</p>
    </StandalonePageShell>
  );
}
