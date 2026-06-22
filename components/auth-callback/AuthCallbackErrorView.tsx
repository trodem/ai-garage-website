import AuthCallbackMessageView from "./AuthCallbackMessageView";
import {
  getAuthCallbackCopy,
  type AuthCallbackLocale,
} from "@/lib/authCallbackMessages";

type Props = {
  body: string;
  locale?: AuthCallbackLocale;
};

export default function AuthCallbackErrorView({ body, locale = "en" }: Props) {
  const copy = getAuthCallbackCopy(locale).error;
  return (
    <AuthCallbackMessageView
      variant="error"
      title={copy.title}
      body={body}
      footerHint={copy.footerHint}
    />
  );
}
