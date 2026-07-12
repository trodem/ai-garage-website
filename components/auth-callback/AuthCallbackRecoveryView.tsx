"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { EmailOtpType } from "@supabase/supabase-js";
import AuthCallbackMessageView from "./AuthCallbackMessageView";
import StandalonePageShell from "@/components/shared/StandalonePageShell";
import LogoIcon from "@/components/LogoIcon";
import GarIqWordmark from "@/components/GarIqWordmark";
import {
  getAuthCallbackCopy,
  type AuthCallbackLocale,
} from "@/lib/authCallbackMessages";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowserClient";

type Props = {
  locale?: AuthCallbackLocale;
};

type Phase = "booting" | "form" | "success" | "error";

function readAuthParamsFromLocation(): Record<string, string> {
  const out: Record<string, string> = {};
  const search = new URLSearchParams(window.location.search);
  search.forEach((value, key) => {
    out[key] = value;
  });
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  if (hash) {
    const hashParams = new URLSearchParams(hash);
    hashParams.forEach((value, key) => {
      out[key] = value;
    });
  }
  return out;
}

export default function AuthCallbackRecoveryView({ locale = "en" }: Props) {
  const copy = getAuthCallbackCopy(locale).recovery;
  const [phase, setPhase] = useState<Phase>("booting");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const supabase = getSupabaseBrowserClient();
        const params = readAuthParamsFromLocation();
        const tokenHash = params.token_hash;
        const type = (params.type ?? "recovery") as EmailOtpType;
        const accessToken = params.access_token;
        const refreshToken = params.refresh_token;
        const code = params.code;

        if (tokenHash) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type,
          });
          if (error) {
            throw error;
          }
        } else if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) {
            throw error;
          }
        } else if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            throw error;
          }
        } else {
          throw new Error(copy.sessionMissing);
        }

        if (!cancelled) {
          setPhase("form");
        }
      } catch (err) {
        if (cancelled) {
          return;
        }
        const message =
          err instanceof Error && err.message.trim()
            ? err.message
            : copy.sessionFailed;
        setErrorMessage(message);
        setPhase("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [copy.sessionFailed, copy.sessionMissing]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFieldError(null);

    if (password.length < 8) {
      setFieldError(copy.passwordTooShort);
      return;
    }
    if (password !== confirmPassword) {
      setFieldError(copy.passwordMismatch);
      return;
    }

    setSubmitting(true);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setFieldError(error.message);
        return;
      }
      await supabase.auth.signOut();
      setPhase("success");
    } catch (err) {
      setFieldError(
        err instanceof Error && err.message.trim()
          ? err.message
          : copy.updateFailed,
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (phase === "booting") {
    return (
      <AuthCallbackMessageView
        title={copy.loadingTitle}
        body={copy.loadingBody}
        footerHint={copy.footerHint}
      />
    );
  }

  if (phase === "error") {
    return (
      <AuthCallbackMessageView
        title={copy.errorTitle}
        body={errorMessage ?? copy.sessionFailed}
        footerHint={copy.footerHint}
        variant="error"
      />
    );
  }

  if (phase === "success") {
    return (
      <AuthCallbackMessageView
        title={copy.successTitle}
        body={copy.successBody}
        footerHint={copy.footerHint}
      />
    );
  }

  return (
    <StandalonePageShell>
      <div className="flex flex-col items-center gap-4 sm:gap-5">
        <LogoIcon className="h-20 w-20 sm:h-24 sm:w-24" />
        <GarIqWordmark size="sm" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950 sm:mt-8 sm:text-3xl dark:text-white">
        {copy.formTitle}
      </h1>
      <p className="mx-auto mt-4 max-w-prose text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
        {copy.formSubtitle}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-4 text-left"
        noValidate
      >
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800 dark:text-slate-200">
          {copy.newPassword}
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none focus:border-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            disabled={submitting}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-800 dark:text-slate-200">
          {copy.confirmPassword}
          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-950 outline-none focus:border-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            disabled={submitting}
          />
        </label>

        {fieldError ? (
          <p className="text-center text-sm text-red-600 dark:text-red-400">
            {fieldError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="min-h-11 rounded-full bg-sky-600 px-4 text-base font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? copy.updating : copy.updatePassword}
        </button>
      </form>

      <p className="mt-8 text-sm text-slate-500 sm:mt-10 dark:text-slate-400">
        {copy.footerHint}
      </p>
    </StandalonePageShell>
  );
}
