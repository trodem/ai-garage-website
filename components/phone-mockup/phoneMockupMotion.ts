"use client";

import { useEffect, useRef, useState } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useMockupDelayedFlag(delayMs: number, paused: boolean, enabled: boolean): boolean {
  const [ready, setReady] = useState(enabled && delayMs <= 0);
  const remainingRef = useRef(delayMs);

  useEffect(() => {
    remainingRef.current = delayMs;
    setReady(enabled && delayMs <= 0);
  }, [delayMs, enabled]);

  useEffect(() => {
    if (!enabled || ready || paused) return;
    const started = Date.now();
    const id = window.setTimeout(() => setReady(true), remainingRef.current);
    return () => {
      remainingRef.current -= Date.now() - started;
      window.clearTimeout(id);
    };
  }, [enabled, paused, ready]);

  return ready;
}
