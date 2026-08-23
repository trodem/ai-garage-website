"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import PhoneMockup from "@/components/phone-mockup/PhoneMockup";
import {
  isPhoneMockupFlowScene,
  PHONE_MOCKUP_ASK_TOUR,
  type PhoneMockupSceneId,
  type PhoneMockupTourId,
} from "@/components/phone-mockup/PhoneMockupChrome";
import Reveal from "@/components/Reveal";

const SLIDE_KEY: Record<PhoneMockupTourId, "askLog" | "askDocs" | "smartScan" | "smartLog"> = {
  "ask-log": "askLog",
  "ask-docs": "askDocs",
  "smart-scan": "smartScan",
  "smart-log": "smartLog",
};

export default function AskWalkthroughSection() {
  const t = useTranslations("askWalkthrough");
  const [scene, setScene] = useState<PhoneMockupTourId>("ask-log");
  const [jumpTo, setJumpTo] = useState<PhoneMockupTourId>("ask-log");
  const [jumpNonce, setJumpNonce] = useState(0);

  const onSceneChange = useCallback((next: PhoneMockupSceneId) => {
    if (isPhoneMockupFlowScene(next)) setScene(next);
  }, []);

  const slide = SLIDE_KEY[scene];

  return (
    <section id="ask" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="ask-walk-grid">
          <Reveal className="ask-walk-copy">
            <span className="section-label">{t("label")}</span>
            <h2 className="section-title text-left">{t("title")}</h2>
            <p className="section-copy max-w-xl text-left">{t("lead")}</p>

            <ol className="ask-walk-steps" aria-label={t("label")}>
              {PHONE_MOCKUP_ASK_TOUR.map((id) => {
                const key = SLIDE_KEY[id];
                const current = id === scene;
                return (
                  <li key={id}>
                    <button
                      type="button"
                      data-pill={id}
                      className={current ? "is-current" : undefined}
                      aria-pressed={current}
                      onClick={() => {
                        setScene(id);
                        setJumpTo(id);
                        setJumpNonce((value) => value + 1);
                      }}
                    >
                      {t(`slides.${key}.kicker`)}
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="ask-walk-slide" key={scene} aria-live="polite">
              <p className="ask-walk-kicker">{t(`slides.${slide}.kicker`)}</p>
              <h3 className="ask-walk-heading">{t(`slides.${slide}.title`)}</h3>
              <p className="ask-walk-body">{t(`slides.${slide}.body`)}</p>
            </div>
          </Reveal>

          <div className="ask-walk-phone">
            <PhoneMockup
              tour="chat"
              label={t("imageAlt")}
              jumpTo={jumpTo}
              jumpNonce={jumpNonce}
              onSceneChange={onSceneChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
