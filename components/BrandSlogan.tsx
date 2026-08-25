type BrandSloganProps = {
  slogan: string;
};

export function splitSloganBeats(slogan: string): string[] {
  const beats = slogan
    .split(/\.\s+/)
    .map((part) => part.replace(/\.$/, "").trim())
    .filter(Boolean);
  return beats.length > 0 ? beats : [slogan];
}

export default function BrandSlogan({ slogan }: BrandSloganProps) {
  const beats = splitSloganBeats(slogan);
  return (
    <p className="header-slogan" aria-label={slogan}>
      {beats.map((beat) => (
        <span key={beat} className="hero-slogan-beat">
          {beat}.
        </span>
      ))}
    </p>
  );
}
