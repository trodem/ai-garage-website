type GarIqWordmarkProps = {
  size?: "sm" | "md" | "lg";
  variant?: "brand" | "gradient";
  className?: string;
};

const sizeClasses: Record<NonNullable<GarIqWordmarkProps["size"]>, string> = {
  sm: "text-2xl sm:text-3xl",
  md: "text-[clamp(1.75rem,5vw,2.75rem)] sm:text-4xl md:text-5xl",
  lg: "text-4xl sm:text-5xl md:text-6xl",
};

export default function GarIqWordmark({
  size = "md",
  variant = "brand",
  className = "",
}: GarIqWordmarkProps) {
  const sizeClass = sizeClasses[size];

  if (variant === "gradient") {
    return (
      <span
        className={`inline-block font-semibold tracking-tight text-gradient ${sizeClass} ${className}`.trim()}
        aria-label="GarIQ"
      >
        GarIQ
      </span>
    );
  }

  return (
    <span
      className={`inline-block font-extrabold tracking-tight ${sizeClass} ${className}`.trim()}
      aria-label="GarIQ"
    >
      <span className="text-primary-500">Gar</span>
      <span className="text-brand-pink">IQ</span>
    </span>
  );
}
