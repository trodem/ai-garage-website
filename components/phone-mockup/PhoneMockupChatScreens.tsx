"use client";

import {
  IconAlertTriangle,
  IconArrowLeft,
  IconCamera,
  IconCopy,
  IconMessagePlus,
  IconMicrophone,
} from "@tabler/icons-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import LogoIcon from "@/components/LogoIcon";
import type { PhoneMockupChatId } from "@/components/phone-mockup/PhoneMockupChrome";
import { MOCKUP_VEHICLE } from "@/components/phone-mockup/phoneMockupDemo";
import {
  renderMarkedPartial,
  useMockupTypewriter,
} from "@/components/phone-mockup/useMockupTypewriter";

type ScreenCopy = ReturnType<typeof useTranslations>;

type ChatTurn = {
  role: "user" | "ai";
  text: string;
  photo?: boolean;
  calloutTitle?: string;
  calloutBody?: string;
  sources?: string[];
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useMockupDelayedFlag(delayMs: number, paused: boolean, enabled: boolean): boolean {
  const [ready, setReady] = useState(!enabled || delayMs <= 0);
  const remainingRef = useRef(delayMs);

  useEffect(() => {
    remainingRef.current = delayMs;
    setReady(!enabled || delayMs <= 0);
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

function GarIqMark() {
  return (
    <span className="pm-chat-iq">
      <span>Gar</span>
      <span>IQ</span>
    </span>
  );
}

function ChatHeader({
  titlePrefix,
  titleSuffix,
  vehicleLine,
}: {
  titlePrefix: string;
  titleSuffix: string;
  vehicleLine: string;
}) {
  return (
    <div className="pm-chat-head">
      <span className="pm-chat-head-btn">
        <IconArrowLeft className="pm-chat-head-icon pm-chat-head-icon--back" />
      </span>
      <div className="pm-chat-head-copy">
        <p className="pm-chat-title">
          {titlePrefix ? <span>{titlePrefix}</span> : null}
          <GarIqMark />
          {titleSuffix ? <span>{titleSuffix}</span> : null}
        </p>
        <em>{vehicleLine}</em>
      </div>
      <span className="pm-chat-head-btn">
        <IconMessagePlus className="pm-chat-head-icon pm-chat-head-icon--new" />
      </span>
    </div>
  );
}

function ChatComposer({
  placeholder,
  camera,
}: {
  placeholder: string;
  camera?: boolean;
}) {
  return (
    <div className="pm-chat-composer">
      {camera ? <IconCamera className="pm-chat-composer-icon" /> : null}
      <span>{placeholder}</span>
      <IconMicrophone className="pm-chat-composer-icon" />
    </div>
  );
}

function MockupMilPhoto() {
  return (
    <span className="pm-chat-photo">
      <Image
        src="/images/mockups/check-engine.png"
        alt=""
        width={338}
        height={220}
        className="pm-chat-photo-img"
      />
    </span>
  );
}

function AiExtras({
  copyLabel,
  calloutTitle,
  calloutBody,
  sources,
  visible,
}: {
  copyLabel: string;
  calloutTitle?: string;
  calloutBody?: string;
  sources?: string[];
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <div className="pm-chat-extras">
      {calloutTitle && calloutBody ? (
        <div className="pm-chat-callout">
          <strong>
            <IconAlertTriangle className="pm-chat-callout-icon" />
            {calloutTitle}
          </strong>
          <p>{calloutBody}</p>
        </div>
      ) : null}
      {sources && sources.length > 0 ? (
        <div className="pm-chat-sources">
          {sources.map((source) => (
            <span key={source}>{source}</span>
          ))}
        </div>
      ) : null}
      <span className="pm-chat-copy">
        <IconCopy className="pm-chat-copy-icon" />
        {copyLabel}
      </span>
    </div>
  );
}

function TypewriterBubble({
  text,
  enabled,
  paused,
  instant,
  onDone,
  extras,
}: {
  text: string;
  enabled: boolean;
  paused: boolean;
  instant: boolean;
  onDone: () => void;
  extras: ReactNode;
}) {
  const visible = useMockupTypewriter(text, { enabled, paused, instant, onDone });
  const done = visible.length >= text.length;
  return (
    <div className="pm-bubble pm-bubble-ai">
      <span className="pm-bubble-logo">
        <LogoIcon className="pm-bubble-logo-img" />
      </span>
      <div className="pm-bubble-ai-body">
        <p className={done ? "pm-bubble-text" : "pm-bubble-text is-typing"}>
          {renderMarkedPartial(visible)}
        </p>
        {extras}
      </div>
    </div>
  );
}

function UserBubble({ text, photo }: { text: string; photo?: boolean }) {
  return (
    <div className="pm-bubble pm-bubble-user">
      {photo ? <MockupMilPhoto /> : null}
      <p>{text}</p>
    </div>
  );
}

function EmptyAskLog({
  t,
  tapping,
  leaving,
  onTapFinished,
  onLeaveFinished,
}: {
  t: ScreenCopy;
  tapping: boolean;
  leaving: boolean;
  onTapFinished: () => void;
  onLeaveFinished: () => void;
}) {
  const pills = [
    t("chat.pills.kmLastMonth"),
    t("chat.pills.litersPer100Km"),
    t("chat.pills.lastInspection"),
    t("chat.pills.lastOil"),
    t("chat.pills.lastWorkshop"),
  ];
  const targetIndex = 1;
  return (
    <div
      className={[
        "pm-chat-empty",
        tapping ? "is-tapping" : "",
        leaving ? "is-leaving" : "",
      ].filter(Boolean).join(" ")}
      onTransitionEnd={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.propertyName === "opacity" && leaving) onLeaveFinished();
      }}
    >
      <LogoIcon className="pm-chat-empty-logo" />
      <h3>{t("chat.askLogEmptyTitle")}</h3>
      <p>{t("chat.askLogEmptyBody")}</p>
      <div className="pm-chat-pills">
        {pills.map((pill, index) => {
          const isTarget = index === targetIndex;
          return (
            <span
              key={pill}
              className={[
                "pm-chat-pill",
                isTarget ? "is-target" : "",
                isTarget && tapping ? "is-tapping" : "",
                isTarget && (tapping || leaving) ? "is-picked" : "",
              ].filter(Boolean).join(" ")}
            >
              {isTarget && tapping && !leaving ? (
                <span
                  className="pm-chat-tap"
                  aria-hidden
                  onAnimationEnd={(event) => {
                    if (event.animationName === "pmChatTap") onTapFinished();
                  }}
                />
              ) : null}
              {pill}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ChatTurns({
  turns,
  paused,
  instant,
  copyLabel,
  onDone,
}: {
  turns: ChatTurn[];
  paused: boolean;
  instant: boolean;
  copyLabel: string;
  onDone: () => void;
}) {
  const [revealed, setRevealed] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (finishedRef.current || revealed < turns.length) return;
    finishedRef.current = true;
    onDone();
  }, [onDone, revealed, turns.length]);

  const current = turns[revealed];
  const waitingOnUser = current?.role === "user";

  useEffect(() => {
    if (!waitingOnUser) return;
    if (paused && !instant) return;
    const id = window.setTimeout(() => setRevealed((value) => value + 1), instant ? 0 : 380);
    return () => window.clearTimeout(id);
  }, [waitingOnUser, paused, instant, revealed]);

  return (
    <div className="pm-chat-thread is-enter">
      {turns.slice(0, Math.min(revealed + 1, turns.length)).map((turn, index) => {
        if (turn.role === "user") {
          return <UserBubble key={`u-${index}`} text={turn.text} photo={turn.photo} />;
        }
        return (
          <TypewriterBubble
            key={`a-${index}`}
            text={turn.text}
            enabled
            paused={paused}
            instant={instant || index < revealed}
            onDone={() => {
              if (index === revealed) setRevealed((value) => value + 1);
            }}
            extras={
              <AiExtras
                copyLabel={copyLabel}
                calloutTitle={turn.calloutTitle}
                calloutBody={turn.calloutBody}
                sources={turn.sources}
                visible={index < revealed || instant}
              />
            }
          />
        );
      })}
    </div>
  );
}

function buildTurns(scene: PhoneMockupChatId, t: ScreenCopy): ChatTurn[] {
  if (scene === "ask-log") {
    return [
      { role: "user", text: t("chat.askLogUser") },
      { role: "ai", text: t("chat.askLogAnswer") },
    ];
  }
  if (scene === "ask-docs") {
    return [
      { role: "user", text: t("chat.askDocsUser"), photo: true },
      {
        role: "ai",
        text: t("chat.askDocsAnswer"),
        calloutTitle: t("chat.askDocsCalloutTitle"),
        calloutBody: t("chat.askDocsCallout"),
        sources: [
          t("chat.askDocsSource1"),
          t("chat.askDocsSource2"),
          t("chat.askDocsSource3"),
        ],
      },
    ];
  }
  return [
    { role: "user", text: t("chat.smartLogUser1") },
    { role: "ai", text: t("chat.smartLogAnswer1") },
    { role: "user", text: t("chat.smartLogUser2") },
    { role: "ai", text: t("chat.smartLogAnswer2") },
  ];
}

export function PhoneMockupChatScreen({
  scene,
  motionPaused,
  onComplete,
}: {
  scene: PhoneMockupChatId;
  motionPaused: boolean;
  onComplete: () => void;
}) {
  const t = useTranslations("hero.mockup");
  const [instant, setInstant] = useState(false);
  useEffect(() => {
    setInstant(prefersReducedMotion());
  }, []);
  const paused = motionPaused && !instant;
  const showEmpty = scene === "ask-log" && !instant;
  const holdDone = useMockupDelayedFlag(showEmpty ? 1500 : 0, paused, showEmpty);
  const [leaving, setLeaving] = useState(false);
  const [chatReady, setChatReady] = useState(!showEmpty);

  useEffect(() => {
    setLeaving(false);
    setChatReady(!showEmpty);
  }, [scene, showEmpty]);
  const vehicleLine = t("chat.vehicleLine", {
    make: MOCKUP_VEHICLE.make,
    model: MOCKUP_VEHICLE.model,
    year: MOCKUP_VEHICLE.year,
  });
  const turns = useMemo(() => buildTurns(scene, t), [scene, t]);
  const isLog = scene === "smart-log";

  return (
    <div className="pm-screen pm-screen-chat">
      <div className="pm-chat">
        <ChatHeader
          titlePrefix={isLog ? t("chat.logTitlePrefix") : t("chat.askTitlePrefix")}
          titleSuffix={isLog ? t("chat.logTitleSuffix") : t("chat.askTitleSuffix")}
          vehicleLine={vehicleLine}
        />
        {chatReady ? (
          <ChatTurns
            key={scene}
            turns={turns}
            paused={paused}
            instant={instant}
            copyLabel={t("chat.copy")}
            onDone={onComplete}
          />
        ) : (
          <EmptyAskLog
            t={t}
            tapping={holdDone}
            leaving={leaving}
            onTapFinished={() => setLeaving(true)}
            onLeaveFinished={() => setChatReady(true)}
          />
        )}
        <ChatComposer
          placeholder={
            scene === "ask-docs"
              ? t("chat.composerAskDocs")
              : scene === "smart-log"
                ? t("chat.composerSmartLog")
                : t("chat.composerAskLog")
          }
          camera={scene === "ask-docs"}
        />
      </div>
    </div>
  );
}
