import AuthCallbackMessageView from "./AuthCallbackMessageView";
import en from "@/messages/en.json";

export default function AuthCallbackRecoveryView() {
  const copy = en.authCallback.recovery;
  return (
    <AuthCallbackMessageView
      title={copy.title}
      body={copy.body}
      footerHint={copy.footerHint}
    />
  );
}
