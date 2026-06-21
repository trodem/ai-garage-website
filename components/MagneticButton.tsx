"use client";

import { useRef, type ReactNode } from "react";

type MagneticButtonProps = {
  href: string;
  className?: string;
  strength?: number;
  children: ReactNode;
};

/**
 * Anchor that gently follows the cursor while hovered (magnetic effect),
 * snapping back on leave. Disabled automatically for reduced-motion users.
 */
export default function MagneticButton({
  href,
  className = "",
  strength = 0.35,
  children,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ transition: "transform 220ms cubic-bezier(.34,1.56,.64,1)" }}
    >
      {children}
    </a>
  );
}
