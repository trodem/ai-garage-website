import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

export function AppleIcon({ className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d="M17.05 12.54c-.02-2.07 1.69-3.06 1.77-3.11-.97-1.41-2.47-1.61-3-1.63-1.28-.13-2.5.75-3.14.75-.65 0-1.65-.73-2.71-.71-1.39.02-2.68.81-3.4 2.05-1.45 2.52-.37 6.25 1.04 8.3.69 1 1.51 2.13 2.58 2.09 1.04-.04 1.43-.67 2.69-.67 1.25 0 1.6.67 2.7.65 1.11-.02 1.82-1.02 2.5-2.03.79-1.16 1.11-2.29 1.13-2.35-.02-.01-2.17-.83-2.2-3.29zM15.0 6.0c.57-.69.96-1.65.85-2.61-.83.03-1.83.55-2.42 1.24-.53.61-.99 1.59-.87 2.53.92.07 1.87-.47 2.44-1.16z" />
    </svg>
  );
}

export function GooglePlayIcon({ className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d="M3.6 2.3c-.2.22-.32.55-.32.98v17.44c0 .43.12.76.33.97l.06.06 9.77-9.77v-.23L3.66 2.24l-.06.06z" fill="#00A0FF" />
      <path d="M16.74 15.32l-3.26-3.26v-.23l3.26-3.26.07.04 3.86 2.2c1.1.62 1.1 1.65 0 2.28l-3.86 2.2-.07.03z" fill="#FFBC00" />
      <path d="M16.81 15.28l-3.33-3.33-9.88 9.88c.36.39.96.43 1.64.05l11.57-6.6z" fill="#FF3A44" />
      <path d="M16.81 8.62L5.24 2.04c-.68-.39-1.28-.34-1.64.05l9.88 9.86 3.33-3.33z" fill="#00D76F" />
    </svg>
  );
}
