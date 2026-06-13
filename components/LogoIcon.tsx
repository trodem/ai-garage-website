import Image from "next/image";

export default function LogoIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo_gariq.svg"
      alt=""
      width={96}
      height={96}
      className={className}
      aria-hidden="true"
      priority
      unoptimized
    />
  );
}
