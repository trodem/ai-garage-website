"use client";

import { useEffect, useState } from "react";
import AuthCallbackRouter from "@/components/auth-callback/AuthCallbackRouter";
import {
  isAuthCallbackSessionAllowed,
  mergeAuthCallbackParams,
  type AuthCallbackSearchParams,
} from "@/lib/authCallbackAccess";
import {
  resolveAuthCallbackLocale,
  type AuthCallbackLocale,
} from "@/lib/authCallbackMessages";

const MARKETING_HOME = "/en";

type Props = {
  initialSearchParams: AuthCallbackSearchParams;
};

export default function AuthCallbackPageClient({ initialSearchParams }: Props) {
  const [resolved, setResolved] = useState(false);
  const [merged, setMerged] = useState<AuthCallbackSearchParams>(initialSearchParams);
  const [locale, setLocale] = useState<AuthCallbackLocale>("en");

  useEffect(() => {
    const hash = window.location.hash;
    const combined = mergeAuthCallbackParams(initialSearchParams, hash);

    if (isAuthCallbackSessionAllowed(combined, hash)) {
      setMerged(combined);
      setLocale(resolveAuthCallbackLocale(navigator.languages ?? navigator.language));
      setResolved(true);
      return;
    }

    window.location.replace(MARKETING_HOME);
  }, [initialSearchParams]);

  if (!resolved || !isAuthCallbackSessionAllowed(merged, typeof window !== "undefined" ? window.location.hash : "")) {
    return null;
  }

  return <AuthCallbackRouter {...merged} locale={locale} />;
}
