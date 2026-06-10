"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

let revealIndex = 0;

type RevealProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Wraps content with the `.reveal` animation, mirroring the IntersectionObserver
 * behaviour from the original main.js (staggered transition delay + is-visible).
 */
export default function Reveal({ as: Tag = "div", className = "", children }: RevealProps) {
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
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
