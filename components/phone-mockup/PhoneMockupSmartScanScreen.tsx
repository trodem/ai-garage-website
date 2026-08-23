"use client";

import { useFormatter, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import PhoneMockupGarIqLoader from "@/components/phone-mockup/PhoneMockupGarIqLoader";
import PhoneMockupInsertDraftForm from "@/components/phone-mockup/PhoneMockupInsertDraftForm";
import { MOCKUP_SCAN_RECEIPT } from "@/components/phone-mockup/phoneMockupDemo";
import {
  prefersReducedMotion,
  useMockupDelayedFlag,
} from "@/components/phone-mockup/phoneMockupMotion";

type ScanBeat = "photo" | "uploading" | "analyzing" | "draft";
type StepVisual = "pending" | "active" | "done";

export default function PhoneMockupSmartScanScreen({
  motionPaused,
  onComplete,
}: {
  motionPaused: boolean;
  onComplete: () => void;
}) {
  const t = useTranslations("hero.mockup");
  const formatter = useFormatter();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  const motion = !reduced;
  const paused = motionPaused && motion;
  const photoHold = useMockupDelayedFlag(2400, paused, motion);
  const uploadHold = useMockupDelayedFlag(1100, paused, motion && photoHold);
  const hintTwoHold = useMockupDelayedFlag(800, paused, motion && uploadHold);
  const analyzeHold = useMockupDelayedFlag(1800, paused, motion && uploadHold);
  const draftHold = useMockupDelayedFlag(3200, paused, motion && analyzeHold);

  const beat: ScanBeat = reduced
    ? "draft"
    : !photoHold
      ? "photo"
      : !uploadHold
        ? "uploading"
        : !analyzeHold
          ? "analyzing"
          : "draft";

  useEffect(() => {
    if (reduced) return;
    if (!(photoHold && uploadHold && analyzeHold && draftHold)) return;
    onComplete();
  }, [reduced, photoHold, uploadHold, analyzeHold, draftHold, onComplete]);

  const eventDate = formatter.dateTime(new Date(`${MOCKUP_SCAN_RECEIPT.date}T12:00:00`), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const overlayOn = beat === "uploading" || beat === "analyzing";
  const hintIndex = beat === "analyzing" ? (hintTwoHold ? 2 : 1) : 0;
  const uploadStep: StepVisual = !photoHold ? "pending" : !uploadHold ? "active" : "done";
  const analyzeStep: StepVisual = !uploadHold ? "pending" : !analyzeHold ? "active" : "done";

  return (
    <div className="pm-screen pm-screen-chat pm-scan">
      <div className={beat === "draft" ? "pm-scan-camera is-faded" : "pm-scan-camera"}>
        <div className="pm-scan-viewfinder">
          <ScanReceiptTicket t={t} formatter={formatter} eventDate={eventDate} />
          <span className="pm-scan-reticle" aria-hidden />
        </div>
        <div className="pm-scan-shutter-row" aria-hidden>
          <span className="pm-scan-shutter" />
        </div>
      </div>

      <div className={overlayOn ? "pm-scan-overlay is-visible" : "pm-scan-overlay"}>
        <PhoneMockupGarIqLoader size={96} spinning={overlayOn} />
        <p className="pm-scan-hint">{t(`scan.hints.${hintIndex}`)}</p>
        <ol className="pm-scan-steps">
          <ProgressRow visual={uploadStep} label={t("scan.stepUpload")} />
          <ProgressRow visual={analyzeStep} label={t("scan.stepAnalyze")} />
        </ol>
      </div>

      <div className={beat === "draft" ? "pm-scan-draft is-visible" : "pm-scan-draft"}>
        <PhoneMockupInsertDraftForm
          draft={{
            date: MOCKUP_SCAN_RECEIPT.date,
            total: MOCKUP_SCAN_RECEIPT.total,
            liters: MOCKUP_SCAN_RECEIPT.liters,
            pricePerLiter: MOCKUP_SCAN_RECEIPT.pricePerLiter,
            odometer: MOCKUP_SCAN_RECEIPT.odometer,
            location: MOCKUP_SCAN_RECEIPT.location,
            fullTank: MOCKUP_SCAN_RECEIPT.fullTank,
          }}
        />
      </div>
    </div>
  );
}

function ScanReceiptTicket({
  t,
  formatter,
  eventDate,
}: {
  t: ReturnType<typeof useTranslations>;
  formatter: ReturnType<typeof useFormatter>;
  eventDate: string;
}) {
  const qty = (value: number) =>
    formatter.number(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="pm-scan-ticket">
      <p className="pm-scan-ticket-kicker">{t("scan.receipt.kicker")}</p>
      <p className="pm-scan-ticket-station">{MOCKUP_SCAN_RECEIPT.station}</p>
      <p className="pm-scan-ticket-place">{MOCKUP_SCAN_RECEIPT.location}</p>
      <span className="pm-scan-ticket-rule" aria-hidden />
      <div className="pm-scan-ticket-row">
        <span>{t("scan.fields.date")}</span>
        <strong>{eventDate}</strong>
      </div>
      <div className="pm-scan-ticket-row">
        <span>{t("scan.fields.liters")}</span>
        <strong>
          {qty(MOCKUP_SCAN_RECEIPT.liters)} {t("scan.fields.suffixL")}
        </strong>
      </div>
      <div className="pm-scan-ticket-row">
        <span>{t("scan.fields.pricePerLiter")}</span>
        <strong>
          {qty(MOCKUP_SCAN_RECEIPT.pricePerLiter)} {t("scan.fields.suffixChfL")}
        </strong>
      </div>
      <span className="pm-scan-ticket-rule" aria-hidden />
      <div className="pm-scan-ticket-row is-total">
        <span>{t("scan.fields.total")}</span>
        <strong>
          {t("scan.fields.suffixChf")} {qty(MOCKUP_SCAN_RECEIPT.total)}
        </strong>
      </div>
      <p className="pm-scan-ticket-thanks">{t("scan.receipt.thanks")}</p>
    </div>
  );
}

function ProgressRow({ visual, label }: { visual: StepVisual; label: string }) {
  return (
    <li className={`pm-scan-step is-${visual}`}>
      <span className="pm-scan-step-icon" aria-hidden>
        {visual === "done" ? "✓" : visual === "active" ? "●" : ""}
      </span>
      <span>{label}</span>
    </li>
  );
}
