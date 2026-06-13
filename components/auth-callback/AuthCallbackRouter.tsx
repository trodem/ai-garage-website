import AuthCallbackSignupView from "@/components/auth-callback/AuthCallbackSignupView";
import AuthCallbackRecoveryView from "@/components/auth-callback/AuthCallbackRecoveryView";
import AuthCallbackInviteView from "@/components/auth-callback/AuthCallbackInviteView";
import AuthCallbackGenericView from "@/components/auth-callback/AuthCallbackGenericView";
import AuthCallbackErrorView from "@/components/auth-callback/AuthCallbackErrorView";
import en from "@/messages/en.json";
import type { AuthCallbackSearchParams } from "@/lib/authCallbackAccess";

type AuthType = "signup" | "recovery" | "email_change" | "invite" | "error" | "unknown";

export default function AuthCallbackRouter({
  type,
  error,
  error_description: errorDescription,
}: AuthCallbackSearchParams) {
  const actualType: AuthType = error ? "error" : ((type as AuthType) ?? "signup");

  if (actualType === "error") {
    return (
      <AuthCallbackErrorView
        body={errorDescription ?? en.authCallback.error.bodyFallback}
      />
    );
  }

  if (actualType === "signup" || actualType === "unknown") {
    return <AuthCallbackSignupView />;
  }

  if (actualType === "recovery") {
    return <AuthCallbackRecoveryView />;
  }

  if (actualType === "invite") {
    return <AuthCallbackInviteView />;
  }

  if (actualType === "email_change") {
    const copy = en.authCallback.emailChange;
    return (
      <AuthCallbackGenericView
        title={copy.title}
        body={copy.body}
        footerHint={copy.footerHint}
      />
    );
  }

  return <AuthCallbackSignupView />;
}
