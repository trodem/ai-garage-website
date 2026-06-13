"use client";

import { useEffect, useState } from "react";
import AuthCallbackRouter from "@/components/auth-callback/AuthCallbackRouter";
import {
  isAuthCallbackSessionAllowed,
  mergeAuthCallbackParams,
  type AuthCallbackSearchParams,
} from "@/lib/authCallbackAccess";

const MARKETING_HOME = "/en";

type Props = {
  initialSearchParams: AuthCallbackSearchParams;
};

export default function AuthCallbackPageClient({ initialSearchParams }: Props) {
  const [resolved, setResolved] = useState(false);
  const [merged, setMerged] = useState<AuthCallbackSearchParams>(initialSearchParams);

  useEffect(() => {
    const hash = window.location.hash;
    const combined = mergeAuthCallbackParams(initialSearchParams, hash);

    if (isAuthCallbackSessionAllowed(combined, hash)) {
      setMerged(combined);
      setResolved(true);
      return;
    }

    window.location.replace(MARKETING_HOME);
  }, [initialSearchParams]);

  if (!resolved || !isAuthCallbackSessionAllowed(merged, typeof window !== "undefined" ? window.location.hash : "")) {
    return null;
  }

  return <AuthCallbackRouter {...merged} />;
}
