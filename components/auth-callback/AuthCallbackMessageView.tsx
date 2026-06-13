import LogoIcon from "@/components/LogoIcon";
import GarIqWordmark from "@/components/GarIqWordmark";
import CelebrationBadge from "@/components/shared/CelebrationBadge";
import StandalonePageShell from "@/components/shared/StandalonePageShell";

type Props = {
  title: string;
  body: string;
  footerHint?: string;
  variant?: "success" | "error";
};

export default function AuthCallbackMessageView({
  title,
  body,
  footerHint = "You can close this page.",
  variant = "success",
}: Props) {
  return (
    <StandalonePageShell>
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <LogoIcon className="h-20 w-20 sm:h-24 sm:w-24" />
        <GarIqWordmark size="sm" />
        <CelebrationBadge variant={variant} />
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950 sm:mt-8 sm:text-3xl md:text-4xl dark:text-white">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-prose text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">
        {body}
      </p>
      <p className="mt-8 text-sm text-slate-500 sm:mt-10 sm:text-base dark:text-slate-400">{footerHint}</p>
    </StandalonePageShell>
  );
}
