import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function StandalonePageShell({ children }: Props) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white px-4 py-12 text-slate-900 sm:px-6 sm:py-16 md:py-20 dark:bg-slate-950 dark:text-slate-100">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-50/90 via-white to-brand-pink/[0.07] dark:from-primary-500/15 dark:via-slate-950 dark:to-brand-pink/10"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-xl text-center sm:max-w-2xl">{children}</div>
    </main>
  );
}
