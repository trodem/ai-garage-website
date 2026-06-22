import AuthCallbackMessageView from "./AuthCallbackMessageView";
import {
  getAuthCallbackCopy,
  type AuthCallbackLocale,
} from "@/lib/authCallbackMessages";

type Props = {
  locale?: AuthCallbackLocale;
};

export default function AuthCallbackRecoveryView({ locale = "en" }: Props) {
  const copy = getAuthCallbackCopy(locale).recovery;
  return (
    <AuthCallbackMessageView
      title={copy.title}
      body={copy.body}
      footerHint={copy.footerHint}
    />
  );
}
