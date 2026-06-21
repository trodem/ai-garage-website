"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Final numeric value to count to. */
  value: number;
  /** Text rendered before the number, e.g. "€ ". */
  prefix?: string;
  /** Text rendered after the number, e.g. " km". */
  suffix?: string;
  /** Decimal places to show. */
  decimals?: number;
  /** Animation duration in ms. */
  duration?: number;
  /** Locale used for thousands/decimal formatting. */
  locale?: string;
  className?: string;
};

/**
 * Counts from 0 up to `value` once it scrolls into view.
 * Respects prefers-reduced-motion (jumps straight to the final value).
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1400,
  locale = "en-US",
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let start = 0;

    const run = () => {
      const step = (now: number) => {
        if (!start) start = now;
        const progress = Math.min((now - start) / duration, 1);
        // easeOutExpo for a snappy finish
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(value * eased);
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      run();
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  const formatted = display.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
