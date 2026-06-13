import AuthCallbackMessageView from "./AuthCallbackMessageView";
import en from "@/messages/en.json";

type Props = {
  body: string;
};

export default function AuthCallbackErrorView({ body }: Props) {
  const copy = en.authCallback.error;
  return (
    <AuthCallbackMessageView
      variant="error"
      title={copy.title}
      body={body}
      footerHint={copy.footerHint}
    />
  );
}
