export type AuthCallbackSearchParams = {
  type?: string;
  token_hash?: string;
  code?: string;
  error?: string;
  error_description?: string;
};

/** Query params Supabase may send on the server-visible URL. */
export function isServerAuthCallbackAllowed(
  searchParams: AuthCallbackSearchParams,
): boolean {
  if (searchParams.error || searchParams.error_description) {
    return true;
  }
  if (searchParams.token_hash?.trim()) {
    return true;
  }
  if (searchParams.code?.trim()) {
    return true;
  }
  return false;
}

/** Hash fragment after Supabase redirect (not visible to SSR). */
export function isHashAuthCallbackAllowed(hash: string): boolean {
  const trimmed = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!trimmed) {
    return false;
  }
  const params = new URLSearchParams(trimmed);
  if (params.get("error") || params.get("error_description")) {
    return true;
  }
  if (params.get("access_token")?.trim()) {
    return true;
  }
  if (params.get("token_hash")?.trim()) {
    return true;
  }
  if (params.get("code")?.trim()) {
    return true;
  }
  return false;
}

export function mergeAuthCallbackParams(
  searchParams: AuthCallbackSearchParams,
  hash: string,
): AuthCallbackSearchParams {
  const hashParams = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash);
  return {
    type: searchParams.type ?? hashParams.get("type") ?? undefined,
    token_hash: searchParams.token_hash ?? hashParams.get("token_hash") ?? undefined,
    code: searchParams.code ?? hashParams.get("code") ?? undefined,
    error: searchParams.error ?? hashParams.get("error") ?? undefined,
    error_description:
      searchParams.error_description ?? hashParams.get("error_description") ?? undefined,
  };
}

/** True when the merged callback params (or URL hash) justify showing auth landing UI. */
export function isAuthCallbackSessionAllowed(
  merged: AuthCallbackSearchParams,
  hash = "",
): boolean {
  if (isServerAuthCallbackAllowed(merged)) {
    return true;
  }
  return isHashAuthCallbackAllowed(hash);
}
