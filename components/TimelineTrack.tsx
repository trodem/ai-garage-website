"use client";

import { useEffect, useRef, type ReactNode } from "react";

type TimelineTrackProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Wraps a grid of steps and "draws" the connecting line once the row
 * scrolls into view (adds `.is-drawn`). Pure CSS transition does the rest.
 */
export default function TimelineTrack({ className = "", children }: TimelineTrackProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-drawn");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-drawn");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`timeline-track ${className}`}>
      {children}
    </div>
  );
}
