"use client";

import { useEffect, useRef, useState } from "react";
import {
  IconCheck,
  IconMessageCircle,
  IconScan,
  IconShieldCheck,
} from "@tabler/icons-react";

type Verb = { kicker: string; title: string; copy: string };

type ReceiptCopy = {
  title: string;
  merchant: string;
  fuel: string;
  total: string;
  scanning: string;
};

type DraftCopy = {
  title: string;
  badge: string;
  type: string;
  amount: string;
  liters: string;
  odometer: string;
  confirm: string;
};

type ChatCopy = {
  title: string;
  badge: string;
  user: string;
  assistant: string;
  typing: string;
};

type Props = {
  verbs: Verb[];
  receipt: ReceiptCopy;
  draft: DraftCopy;
  chat: ChatCopy;
};

function useTypewriter(text: string, active: boolean, ms = 28) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setOut("");
      setDone(false);
      return;
    }

    setOut("");
    setDone(false);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, ms);

    return () => window.clearInterval(id);
  }, [text, active, ms]);

  return { out, done };
}

export default function SolutionVerbCards({ verbs, receipt, draft, chat }: Props) {
  const [scan, confirm, ask] = verbs;
  const rootRef = useRef<HTMLUListElement>(null);
  const [inCenter, setInCenter] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [scanFlipped, setScanFlipped] = useState(false);
  const [confirmFlipped, setConfirmFlipped] = useState(false);
  const [draftChecked, setDraftChecked] = useState(false);
  const [askFlipped, setAskFlipped] = useState(false);
  const [assistantActive, setAssistantActive] = useState(false);

  const userTw = useTypewriter(chat.user, askFlipped && inCenter, 26);
  const assistantTw = useTypewriter(chat.assistant, assistantActive && inCenter, 22);

  // Start flaps only when the card row is in the vertical center band of the screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInCenter(Boolean(entry?.isIntersecting));
      },
      {
        threshold: 0.55,
        // Middle band of the viewport — not top/bottom while scrolling past
        rootMargin: "-32% 0px -32% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reset = () => {
      setScanFlipped(false);
      setConfirmFlipped(false);
      setDraftChecked(false);
      setAskFlipped(false);
      setAssistantActive(false);
    };

    if (!inCenter) {
      reset();
      return;
    }

    reset();

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setScanFlipped(true), 900));
    timers.push(window.setTimeout(() => setConfirmFlipped(true), 3200));
    timers.push(window.setTimeout(() => setDraftChecked(true), 4400));
    timers.push(window.setTimeout(() => setAskFlipped(true), 5800));
    timers.push(
      window.setTimeout(() => {
        reset();
      }, 11800)
    );
    timers.push(window.setTimeout(() => setCycle((c) => c + 1), 13400));

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [cycle, inCenter]);

  useEffect(() => {
    if (!askFlipped || !inCenter) {
      setAssistantActive(false);
      return;
    }
    if (!userTw.done) return;
    const id = window.setTimeout(() => setAssistantActive(true), 650);
    return () => window.clearTimeout(id);
  }, [askFlipped, inCenter, userTw.done]);

  return (
    <ul ref={rootRef} className="soft-card-grid soft-card-grid--3 mt-12">
      {scan ? (
        <li className="scan-flap">
          <button
            type="button"
            className={`scan-flap-inner${scanFlipped ? " is-flipped" : ""}`}
            aria-label={`${scan.kicker}: ${scanFlipped ? receipt.title : scan.title}`}
            onClick={() => setScanFlipped((v) => !v)}
          >
            <div className="scan-flap-face scan-flap-front soft-card">
              <span className="soft-card-chip" aria-hidden>
                <IconScan size={24} stroke={1.6} />
              </span>
              <p className="soft-card-kicker">{scan.kicker}</p>
              <h3 className="soft-card-title">{scan.title}</h3>
              <p className="soft-card-copy">{scan.copy}</p>
            </div>

            <div className="scan-flap-face scan-flap-back" aria-hidden={!scanFlipped}>
              <div className="scan-receipt">
                <div className="scan-receipt-beam" />
                <p className="scan-receipt-badge">{receipt.scanning}</p>
                <p className="scan-receipt-heading">{receipt.title}</p>
                <div className="scan-receipt-paper">
                  <div className="scan-receipt-line is-highlight">
                    <span>{receipt.merchant}</span>
                    <span>…</span>
                  </div>
                  <div className="scan-receipt-line">
                    <span>{receipt.fuel}</span>
                    <span className="is-ocr">45,20 L</span>
                  </div>
                  <div className="scan-receipt-line">
                    <span>Diesel</span>
                    <span className="is-ocr">CHF 1,87</span>
                  </div>
                  <div className="scan-receipt-divider" />
                  <div className="scan-receipt-line is-total">
                    <span>{receipt.total}</span>
                    <span className="is-ocr">CHF 84,50</span>
                  </div>
                  <div className="scan-receipt-line is-muted">
                    <span>Km</span>
                    <span className="is-ocr">128.450</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </li>
      ) : null}

      {confirm ? (
        <li className="scan-flap">
          <button
            type="button"
            className={`scan-flap-inner${confirmFlipped ? " is-flipped" : ""}`}
            aria-label={`${confirm.kicker}: ${confirmFlipped ? draft.title : confirm.title}`}
            onClick={() => {
              setConfirmFlipped((v) => {
                const next = !v;
                if (!next) setDraftChecked(false);
                else window.setTimeout(() => setDraftChecked(true), 1100);
                return next;
              });
            }}
          >
            <div className="scan-flap-face scan-flap-front soft-card">
              <span className="soft-card-chip" aria-hidden>
                <IconShieldCheck size={24} stroke={1.6} />
              </span>
              <p className="soft-card-kicker">{confirm.kicker}</p>
              <h3 className="soft-card-title">{confirm.title}</h3>
              <p className="soft-card-copy">{confirm.copy}</p>
            </div>

            <div className="scan-flap-face scan-flap-back" aria-hidden={!confirmFlipped}>
              <div className="draft-form">
                <p className="draft-form-badge">{draft.badge}</p>
                <p className="draft-form-heading">{draft.title}</p>
                <div className="draft-form-fields">
                  <label className="draft-form-field">
                    <span>{draft.type}</span>
                    <span className="draft-form-value">Fuel</span>
                  </label>
                  <label className="draft-form-field">
                    <span>{draft.liters}</span>
                    <span className="draft-form-value is-edit">45,20</span>
                  </label>
                  <label className="draft-form-field">
                    <span>{draft.amount}</span>
                    <span className="draft-form-value is-edit">CHF 84,50</span>
                  </label>
                </div>
                <div
                  className={`draft-form-check${draftChecked ? " is-checked" : ""}`}
                  aria-hidden
                >
                  <span className="draft-form-checkbox">
                    {draftChecked ? (
                      <IconCheck
                        key="check-burst"
                        size={26}
                        stroke={2.75}
                        className="draft-form-check-icon"
                      />
                    ) : null}
                  </span>
                  <span className="draft-form-check-label">{draft.confirm}</span>
                </div>
              </div>
            </div>
          </button>
        </li>
      ) : null}

      {ask ? (
        <li className="scan-flap">
          <button
            type="button"
            className={`scan-flap-inner${askFlipped ? " is-flipped" : ""}`}
            aria-label={`${ask.kicker}: ${askFlipped ? chat.title : ask.title}`}
            onClick={() => {
              setAskFlipped((v) => {
                const next = !v;
                if (!next) setAssistantActive(false);
                return next;
              });
            }}
          >
            <div className="scan-flap-face scan-flap-front soft-card">
              <span className="soft-card-chip" aria-hidden>
                <IconMessageCircle size={24} stroke={1.6} />
              </span>
              <p className="soft-card-kicker">{ask.kicker}</p>
              <h3 className="soft-card-title">{ask.title}</h3>
              <p className="soft-card-copy">{ask.copy}</p>
            </div>

            <div className="scan-flap-face scan-flap-back" aria-hidden={!askFlipped}>
              <div className="ask-chat">
                <p className="ask-chat-badge">{chat.badge}</p>
                <p className="ask-chat-heading">{chat.title}</p>
                <div className={`ask-chat-thread${askFlipped ? " is-live" : ""}`}>
                  <div className="ask-chat-bubble is-user">
                    <span className="ask-chat-role">You</span>
                    <p>
                      {userTw.out}
                      {askFlipped && !userTw.done ? (
                        <span className="ask-chat-caret" aria-hidden />
                      ) : null}
                    </p>
                  </div>
                  <div className="ask-chat-bubble is-assistant">
                    <span className="ask-chat-role">GarIQ</span>
                    {userTw.done && !assistantActive ? (
                      <p className="ask-chat-typing">
                        <span />
                        <span />
                        <span />
                        <em>{chat.typing}</em>
                      </p>
                    ) : assistantActive ? (
                      <p>
                        {assistantTw.out}
                        {!assistantTw.done ? (
                          <span className="ask-chat-caret" aria-hidden />
                        ) : null}
                      </p>
                    ) : (
                      <p className="ask-chat-placeholder">&nbsp;</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </button>
        </li>
      ) : null}
    </ul>
  );
}
