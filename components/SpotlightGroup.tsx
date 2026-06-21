"use client";

import { useRef, type ReactNode } from "react";

type SpotlightGroupProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Tracks the mouse over its area and exposes --mx / --my custom properties
 * on each child marked with [data-spotlight], so a radial glow can follow
 * the cursor. Pure CSS handles the rendering (see .spotlight-card).
 */
export default function SpotlightGroup({ className = "", children }: SpotlightGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const root = ref.current;
    if (!root) return;
    const cards = root.querySelectorAll<HTMLElement>("[data-spotlight]");
    cards.forEach((card) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  };

  return (
    <div ref={ref} className={className} onMouseMove={handleMove}>
      {children}
    </div>
  );
}
