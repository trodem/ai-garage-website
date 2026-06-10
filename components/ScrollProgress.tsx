"use client";

import { useEffect } from "react";

/**
 * Renders the top scroll-progress bar and drives the --scroll-progress / parallax
 * CSS variables, mirroring the scroll logic from the original main.js.
 */
export default function ScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const parallaxElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    let rafPending = false;

    const updateScrollEffects = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(window.scrollY / maxScroll, 1);
      root.style.setProperty("--scroll-progress", progress.toFixed(4));

      parallaxElements.forEach((element) => {
        const speed = Number(element.dataset.parallax || 0.06);
        const offset = window.scrollY * speed;
        element.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });

      rafPending = false;
    };

    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      window.requestAnimationFrame(updateScrollEffects);
    };

    updateScrollEffects();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollEffects);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollEffects);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
