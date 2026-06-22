import AuthCallbackMessageView from "./AuthCallbackMessageView";
import {
  getAuthCallbackCopy,
  type AuthCallbackLocale,
} from "@/lib/authCallbackMessages";

type Props = {
  locale?: AuthCallbackLocale;
};

export default function AuthCallbackInviteView({ locale = "en" }: Props) {
  const copy = getAuthCallbackCopy(locale).invite;
  return (
    <AuthCallbackMessageView
      title={copy.title}
      body={copy.body}
      footerHint={copy.footerHint}
    />
  );
}
