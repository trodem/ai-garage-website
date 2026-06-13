import AuthCallbackMessageView from "./AuthCallbackMessageView";
import en from "@/messages/en.json";

export default function AuthCallbackInviteView() {
  const copy = en.authCallback.invite;
  return (
    <AuthCallbackMessageView
      title={copy.title}
      body={copy.body}
      footerHint={copy.footerHint}
    />
  );
}
