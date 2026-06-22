import AuthCallbackSignupView from "@/components/auth-callback/AuthCallbackSignupView";
import AuthCallbackRecoveryView from "@/components/auth-callback/AuthCallbackRecoveryView";
import AuthCallbackInviteView from "@/components/auth-callback/AuthCallbackInviteView";
import AuthCallbackGenericView from "@/components/auth-callback/AuthCallbackGenericView";
import AuthCallbackErrorView from "@/components/auth-callback/AuthCallbackErrorView";
import {
  getAuthCallbackCopy,
  type AuthCallbackLocale,
} from "@/lib/authCallbackMessages";
import type { AuthCallbackSearchParams } from "@/lib/authCallbackAccess";

type AuthType = "signup" | "recovery" | "email_change" | "invite" | "error" | "unknown";

type Props = AuthCallbackSearchParams & {
  locale?: AuthCallbackLocale;
};

export default function AuthCallbackRouter({
  type,
  error,
  error_description: errorDescription,
  locale = "en",
}: Props) {
  const actualType: AuthType = error ? "error" : ((type as AuthType) ?? "signup");
  const copy = getAuthCallbackCopy(locale);

  if (actualType === "error") {
    return (
      <AuthCallbackErrorView
        locale={locale}
        body={errorDescription ?? copy.error.bodyFallback}
      />
    );
  }

  if (actualType === "signup" || actualType === "unknown") {
    return <AuthCallbackSignupView locale={locale} />;
  }

  if (actualType === "recovery") {
    return <AuthCallbackRecoveryView locale={locale} />;
  }

  if (actualType === "invite") {
    return <AuthCallbackInviteView locale={locale} />;
  }

  if (actualType === "email_change") {
    return (
      <AuthCallbackGenericView
        title={copy.emailChange.title}
        body={copy.emailChange.body}
        footerHint={copy.emailChange.footerHint}
      />
    );
  }

  return <AuthCallbackSignupView locale={locale} />;
}
