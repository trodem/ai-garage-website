import AuthCallbackClient from "./AuthCallbackClient";

type Props = {
  searchParams: Promise<{
    type?: string;
    token_hash?: string;
    error?: string;
    error_description?: string;
  }>;
};

export default async function AuthCallbackPage({ searchParams }: Props) {
  const { type, token_hash, error, error_description } = await searchParams;

  return (
    <AuthCallbackClient
      type={type}
      tokenHash={token_hash}
      error={error}
      errorDescription={error_description}
    />
  );
}
