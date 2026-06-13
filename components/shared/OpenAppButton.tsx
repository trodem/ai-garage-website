"use client";

type Props = {
  label: string;
  deepLinkUrl: string;
  className?: string;
};

export default function OpenAppButton({ label, deepLinkUrl, className = "" }: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = deepLinkUrl;
      }}
      className={`btn-soft inline-flex min-h-11 w-full items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto sm:text-base dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 ${className}`.trim()}
    >
      {label}
    </button>
  );
}
