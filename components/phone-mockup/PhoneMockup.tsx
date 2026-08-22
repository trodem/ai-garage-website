"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState, type AnimationEvent, type TransitionEvent } from "react";
import {
  isPhoneMockupChatScene,
  PhoneMockupFooter,
  PhoneMockupHeader,
  PHONE_MOCKUP_CHAT_TOUR,
  PHONE_MOCKUP_TAB_TOUR,
  type PhoneMockupSceneId,
} from "@/components/phone-mockup/PhoneMockupChrome";
import { PhoneMockupScreen } from "@/components/phone-mockup/PhoneMockupScreens";

const CHAT_DWELL_MS = 1400;

type PhoneMockupProps = {
  className?: string;
  /** Tab hub screens (Hero) or Ask / Smart Log conversation screens. */
  tour?: "tabs" | "chat";
  label?: string;
  onSceneChange?: (scene: PhoneMockupSceneId) => void;
};

export default function PhoneMockup({
  className,
  tour = "tabs",
  label,
  onSceneChange,
}: PhoneMockupProps) {
  const t = useTranslations("hero");
  const scenes: PhoneMockupSceneId[] =
    tour === "chat" ? PHONE_MOCKUP_CHAT_TOUR : PHONE_MOCKUP_TAB_TOUR;
  const [sceneIndex, setSceneIndex] = useState(0);
  const [fromHome, setFromHome] = useState(tour === "chat");
  const [fading, setFading] = useState(false);
  const [chatScrolling, setChatScrolling] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatAdvanceRef = useRef(false);
  const dwellTimerRef = useRef<number>(0);
  const fadeKindRef = useRef<"tab" | "to-chat" | "to-next">("tab");
  const hubTapLockRef = useRef(false);
  const dest = scenes[sceneIndex] ?? scenes[0];
  const showingChat = tour === "chat" && !fromHome;
  const scene: PhoneMockupSceneId = showingChat ? dest : tour === "chat" ? "home" : dest;
  const chatScene = showingChat;
  const tourLength = scenes.length;

  useEffect(() => {
    setSceneIndex(0);
    setFromHome(tour === "chat");
    setFading(false);
    setChatScrolling(false);
    chatAdvanceRef.current = false;
    fadeKindRef.current = "tab";
    hubTapLockRef.current = false;
  }, [tour]);

  useEffect(() => {
    onSceneChange?.(tour === "chat" ? dest : scene);
  }, [tour, dest, scene, onSceneChange]);

  const beginFade = useCallback((kind: "tab" | "to-chat" | "to-next") => {
    fadeKindRef.current = kind;
    setChatScrolling(false);
    setFading(true);
  }, []);

  const onScrollEnd = useCallback((event: AnimationEvent<HTMLDivElement>) => {
    if (event.animationName !== "phoneAutoScroll" && event.animationName !== "phoneChatScroll") {
      return;
    }
    if (event.animationName === "phoneChatScroll") {
      beginFade("to-next");
      return;
    }
    beginFade("tab");
  }, [beginFade]);

  const onFadeEnd = useCallback((event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== "opacity" || !fading) return;
    chatAdvanceRef.current = false;
    setChatScrolling(false);
    window.clearTimeout(dwellTimerRef.current);
    if (fadeKindRef.current === "to-chat") {
      setFromHome(false);
      setFading(false);
      return;
    }
    if (fadeKindRef.current === "to-next") {
      hubTapLockRef.current = false;
      setSceneIndex((current) => (current + 1) % tourLength);
      setFromHome(true);
      setFading(false);
      return;
    }
    setSceneIndex((current) => (current + 1) % tourLength);
    setFading(false);
  }, [fading, tourLength]);

  const onHubTapComplete = useCallback(() => {
    if (hubTapLockRef.current) return;
    hubTapLockRef.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFromHome(false);
      return;
    }
    beginFade("to-chat");
  }, [beginFade]);

  const onChatTourComplete = useCallback(() => {
    if (chatAdvanceRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chatAdvanceRef.current = true;
      return;
    }
    chatAdvanceRef.current = true;
    const body = bodyRef.current;
    const scroll = scrollRef.current;
    if (body && scroll && scroll.scrollHeight > body.clientHeight + 12) {
      setChatScrolling(true);
      return;
    }
    dwellTimerRef.current = window.setTimeout(() => beginFade("to-next"), CHAT_DWELL_MS);
  }, [beginFade]);

  return (
    <div
      className={["phone-mockup", className].filter(Boolean).join(" ")}
      tabIndex={0}
      role="img"
      aria-label={label ?? t("imageAlt")}
      onMouseEnter={() => setMotionPaused(true)}
      onMouseLeave={() => setMotionPaused(false)}
      onFocus={() => setMotionPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setMotionPaused(false);
        }
      }}
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
              {chatScene ? null : <PhoneMockupHeader />}
              <div
                ref={bodyRef}
                className={[
                  "phone-mockup-body",
                  fading ? "is-fading" : "",
                  chatScene ? "is-chat" : "",
                ].filter(Boolean).join(" ")}
                onTransitionEnd={onFadeEnd}
              >
                <div
                  ref={scrollRef}
                  key={tour === "chat" ? `${dest}-${fromHome ? "home" : "open"}` : scene}
                  className={[
                    "phone-mockup-scroll",
                    chatScene ? "is-chat" : "",
                    fromHome ? "is-frozen" : "",
                    chatScrolling ? "is-chat-scrolling" : "",
                  ].filter(Boolean).join(" ")}
                  onAnimationEnd={onScrollEnd}
                >
                  <PhoneMockupScreen
                    scene={scene}
                    motionPaused={motionPaused}
                    hubTapTarget={fromHome && isPhoneMockupChatScene(dest) ? dest : undefined}
                    onHubTapComplete={onHubTapComplete}
                    onChatTourComplete={onChatTourComplete}
                  />
                </div>
              </div>
              {isPhoneMockupChatScene(scene) ? null : (
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
              )}
              <div className="phone-mockup-home-bar" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}