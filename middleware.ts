import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import {
  isServerAuthCallbackAllowed,
  type AuthCallbackSearchParams,
} from "./lib/authCallbackAccess";

const intlMiddleware = createMiddleware(routing);

const WELCOME_PATH = /^\/(en|de|it)\/welcome\/?$/;

function searchParamsToAuthCallback(sp: URLSearchParams): AuthCallbackSearchParams {
  return {
    type: sp.get("type") ?? undefined,
    token_hash: sp.get("token_hash") ?? undefined,
    code: sp.get("code") ?? undefined,
    error: sp.get("error") ?? undefined,
    error_description: sp.get("error_description") ?? undefined,
  };
}

/**
 * Block probe URLs like `/auth/callback?type=signup` without a real Supabase payload.
 * Empty query is allowed through so the client can read `#access_token=…` in the hash.
 */
export function shouldMiddlewareRedirectAuthCallback(searchParams: URLSearchParams): boolean {
  if (searchParams.toString() === "") {
    return false;
  }
  return !isServerAuthCallbackAllowed(searchParamsToAuthCallback(searchParams));
}

export default function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/auth/callback" && shouldMiddlewareRedirectAuthCallback(searchParams)) {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  const welcomeMatch = pathname.match(WELCOME_PATH);
  if (welcomeMatch) {
    return NextResponse.redirect(new URL(`/${welcomeMatch[1]}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(de|en|it)/:path*", "/auth/callback"],
};
