type Props = {
  variant?: "success" | "error";
};

export default function CelebrationBadge({ variant = "success" }: Props) {
  const isError = variant === "error";

  return (
    <div
      className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14 ${
        isError
          ? "bg-red-100 dark:bg-red-900/30"
          : "bg-gradient-to-br from-primary-50 to-brand-pink/20 ring-2 ring-primary-500/25 dark:from-primary-500/20 dark:to-brand-pink/20 dark:ring-brand-pink/30"
      }`}
    >
      {isError ? (
        <svg
          className="h-6 w-6 text-red-600 dark:text-red-400 sm:h-7 sm:w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-100 sm:h-7 sm:w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
}
