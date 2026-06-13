import AuthCallbackMessageView from "./AuthCallbackMessageView";

type Props = {
  title: string;
  body: string;
  footerHint?: string;
};

export default function AuthCallbackGenericView({ title, body, footerHint }: Props) {
  return (
    <AuthCallbackMessageView
      title={title}
      body={body}
      footerHint={footerHint ?? "You can close this page."}
    />
  );
}
