export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <mask id="logo-cuts">
          <rect x="0" y="0" width="500" height="500" fill="white" />
          <rect x="231" y="0" width="40" height="180" fill="black" />
          <rect x="200" y="130" width="40" height="180" fill="black" transform="rotate(90 250 250)" />
          <rect x="380" y="226" width="120" height="45" fill="black" transform="rotate(45 250 250)" />
          <circle cx="250" cy="85" r="30" fill="black" />
        </mask>
      </defs>

      <circle
        cx="250" cy="250" r="165"
        strokeWidth="44" fill="none"
        mask="url(#logo-cuts)"
        className="stroke-[#1F1BE8] dark:stroke-[#4A47FF]"
      />
      <circle
        cx="250" cy="250" r="105"
        stroke="#00A7E5" strokeWidth="32" fill="none"
        mask="url(#logo-cuts)"
      />
      <circle cx="250" cy="85" r="25" fill="#F2137B" />
      <rect x="392" y="231" width="44" height="35" fill="#F2137B" transform="rotate(45 250 250)" />
      <rect x="235" y="130" width="30" height="90" fill="#00A7E5" transform="rotate(90 250 250)" />
    </svg>
  );
}
