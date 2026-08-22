"use client";

import { useTranslations } from "next-intl";
import { useCallback, useState, type AnimationEvent, type TransitionEvent } from "react";
import {
  PhoneMockupFooter,
  PhoneMockupHeader,
  type PhoneMockupTabId,
} from "@/components/phone-mockup/PhoneMockupChrome";
import { PhoneMockupScreen } from "@/components/phone-mockup/PhoneMockupScreens";

const SCENES: PhoneMockupTabId[] = ["home", "details", "timeline", "stats", "garage"];

type PhoneMockupProps = {
  className?: string;
};

export default function PhoneMockup({ className }: PhoneMockupProps) {
  const t = useTranslations("hero");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const scene = SCENES[sceneIndex] ?? SCENES[0];

  const onScrollEnd = useCallback((event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName !== "phoneAutoScroll") return;
    setFading(true);
  }, []);

  const onFadeEnd = useCallback((event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "opacity" || !fading) return;
    setSceneIndex((current) => (current + 1) % SCENES.length);
    setFading(false);
  }, [fading]);

  return (
    <div
      className={["phone-mockup", className].filter(Boolean).join(" ")}
      tabIndex={0}
      role="img"
      aria-label={t("imageAlt")}
    >
      <div className="phone-mockup-scene">
        <div className="phone-mockup-floater">
          <div className="phone-mockup-glow" aria-hidden />
          <div className="phone-mockup-frame">
            <span className="phone-mockup-btn phone-mockup-btn-action" aria-hidden />
            <span className="phone-mockup-btn phone-mockup-btn-vol-up" aria-hidden />
            <span className="phone-mockup-btn phone-mockup-btn-vol-down" aria-hidden />
            <span className="phone-mockup-btn phone-mockup-btn-power" aria-hidden />
            <div className="phone-mockup-bezel">
              <div className="phone-mockup-island" aria-hidden>
                <span className="phone-mockup-lens" />
              </div>
              <div className="phone-mockup-glass" aria-hidden />
              <PhoneMockupHeader />
              <div
                className={
                  fading
                    ? "phone-mockup-body is-fading"
                    : "phone-mockup-body"
                }
                onTransitionEnd={onFadeEnd}
              >
                <div
                  key={scene}
                  className="phone-mockup-scroll"
                  onAnimationEnd={onScrollEnd}
                >
                  <PhoneMockupScreen scene={scene} />
                </div>
              </div>
              <PhoneMockupFooter
                activeTab={scene}
                labels={{
                  home: t("tabs.home"),
                  details: t("tabs.details"),
                  timeline: t("tabs.timeline"),
                  stats: t("tabs.stats"),
                  garage: t("tabs.garage"),
                }}
              />
              <div className="phone-mockup-home-bar" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
