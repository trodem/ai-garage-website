// Root layout required by Next.js; `<html>` lives in `app/[locale]/layout.tsx`.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
