import AuthCallbackPageClient from "./AuthCallbackPageClient";
import type { AuthCallbackSearchParams } from "@/lib/authCallbackAccess";

type Props = {
  searchParams: Promise<{
    type?: string;
    token_hash?: string;
    code?: string;
    error?: string;
    error_description?: string;
  }>;
};

export default async function AuthCallbackPage({ searchParams }: Props) {
  const raw = await searchParams;
  const initialSearchParams: AuthCallbackSearchParams = {
    type: raw.type,
    token_hash: raw.token_hash,
    code: raw.code,
    error: raw.error,
    error_description: raw.error_description,
  };

  return <AuthCallbackPageClient initialSearchParams={initialSearchParams} />;
}
