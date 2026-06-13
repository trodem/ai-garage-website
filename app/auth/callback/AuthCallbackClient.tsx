"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type AuthType = "signup" | "recovery" | "email_change" | "invite" | "error" | "unknown";

const CONTENT: Record<AuthType, { title: string; body: string; buttonLabel: string }> = {
  signup: {
    title: "Email confirmed",
    body: "Your GarIQ account is verified. Open the app and sign in.",
    buttonLabel: "Open GarIQ",
  },
  recovery: {
    title: "Reset your password",
    body: "Open GarIQ to set your new password.",
    buttonLabel: "Open GarIQ",
  },
  email_change: {
    title: "Email updated",
    body: "Your email address has been changed. Open the app to continue.",
    buttonLabel: "Open GarIQ",
  },
  invite: {
    title: "You've been invited",
    body: "Someone shared a GarIQ garage with you. Open the app to accept.",
    buttonLabel: "Open GarIQ",
  },
  error: {
    title: "Something went wrong",
    body: "",
    buttonLabel: "Back to GarIQ",
  },
  unknown: {
    title: "GarIQ",
    body: "Open the app to continue.",
    buttonLabel: "Open GarIQ",
  },
};

type Props = {
  type?: string;
  tokenHash?: string;
  error?: string;
  errorDescription?: string;
};

export default function AuthCallbackClient({ type, tokenHash, error, errorDescription }: Props) {
  const [showDownloadHint, setShowDownloadHint] = useState(false);

  const actualType: AuthType = error ? "error" : ((type as AuthType) ?? "unknown");
  const content = CONTENT[actualType] ?? CONTENT.unknown;
  const isError = actualType === "error";
  const bodyText = isError ? (errorDescription ?? "An unexpected error occurred.") : content.body;

  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (tokenHash) params.set("token_hash", tokenHash);
  const deepLinkUrl = `ai-garage://auth/callback?${params.toString()}`;

  useEffect(() => {
    if (isError) return;
    window.location.href = deepLinkUrl;
    const timer = setTimeout(() => setShowDownloadHint(true), 3000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playStoreUrl = process.env.NEXT_PUBLIC_PLAY_STORE_URL;
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL;

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <Image
        src="/images/garageapp-icon.png"
        alt="GarIQ"
        width={72}
        height={72}
        className="rounded-2xl shadow-lg"
        priority
      />

      <div
        className={`mt-6 flex h-12 w-12 items-center justify-center rounded-full ${
          isError ? "bg-red-100 dark:bg-red-900/30" : "bg-green-100 dark:bg-green-900/30"
        }`}
      >
        {isError ? (
          <svg
            className="h-6 w-6 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-green-600 dark:text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {content.title}
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{bodyText}</p>

      {!isError ? (
        <>
          <button
            onClick={() => {
              window.location.href = deepLinkUrl;
            }}
            className="mt-10 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            {content.buttonLabel}
          </button>

          {showDownloadHint && (appStoreUrl || playStoreUrl) && (
            <div className="mt-8">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                GarIQ not installed? Download it:
              </p>
              <div className="mt-3 flex justify-center gap-4">
                {appStoreUrl && (
                  <a
                    href={appStoreUrl}
                    className="text-sm font-medium text-slate-700 underline hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  >
                    App Store
                  </a>
                )}
                {playStoreUrl && (
                  <a
                    href={playStoreUrl}
                    className="text-sm font-medium text-slate-700 underline hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  >
                    Google Play
                  </a>
                )}
              </div>
            </div>
          )}

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            You can close this page after opening the app.
          </p>
        </>
      ) : (
        <a
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          {content.buttonLabel}
        </a>
      )}
    </main>
  );
}
