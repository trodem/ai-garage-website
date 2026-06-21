"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

let revealIndex = 0;

type RevealProps = {
  as?: ElementType;
  className?: string;
  variant?: "up" | "left" | "right" | "scale";
  children: ReactNode;
  [key: `data-${string}`]: unknown;
};

const VARIANT_CLASS = {
  up: "",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
} as const;

/**
 * Wraps content with the `.reveal` animation, mirroring the IntersectionObserver
 * behaviour from the original main.js (staggered transition delay + is-visible).
 */
export default function Reveal({
  as: Tag = "div",
  className = "",
  variant = "up",
  children,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const stagger = Math.min((revealIndex++ % 8) * 22, 160);
    element.style.transitionDelay = `${stagger}ms`;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${VARIANT_CLASS[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
