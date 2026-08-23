"use client";

import { IconChevronDown, IconChevronLeft, IconGasStation } from "@tabler/icons-react";
import { useFormatter, useTranslations } from "next-intl";
import { MOCKUP_VEHICLE } from "@/components/phone-mockup/phoneMockupDemo";

export type PhoneMockupRefuelDraft = {
  date: string;
  total: number;
  liters: number;
  pricePerLiter: number;
  odometer: number | null;
  location: string | null;
  fullTank: boolean;
};

export default function PhoneMockupInsertDraftForm({
  draft,
}: {
  draft: PhoneMockupRefuelDraft;
}) {
  const t = useTranslations("hero.mockup");
  const formatter = useFormatter();
  const qty = (value: number) =>
    formatter.number(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const eventDate = formatter.dateTime(new Date(`${draft.date}T12:00:00`), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const vehicleHeader = `${MOCKUP_VEHICLE.make} ${MOCKUP_VEHICLE.model} (${MOCKUP_VEHICLE.year})`;
  const odometerValue =
    draft.odometer == null
      ? undefined
      : formatter.number(draft.odometer, { maximumFractionDigits: 0, useGrouping: false });

  return (
    <>
      <div className="pm-scan-draft-head">
        <IconChevronLeft className="pm-scan-draft-back" aria-hidden />
        <div className="pm-scan-draft-title-block">
          <div className="pm-scan-draft-type-row">
            <span className="pm-scan-draft-icon-wrap" aria-hidden>
              <IconGasStation className="pm-scan-draft-icon" />
            </span>
            <p className="pm-scan-draft-title">{t("types.refuel")}</p>
          </div>
          <p className="pm-scan-draft-sub">{vehicleHeader}</p>
        </div>
      </div>
      <div className="pm-scan-draft-fields">
        <DraftField
          label={t("scan.fields.paymentCurrency")}
          value={t("scan.fields.currencyChf")}
          chevron
        />
        <div className="pm-scan-field-row">
          <DraftField label={t("scan.fields.date")} value={eventDate} required />
          <DraftField
            label={t("scan.fields.total")}
            value={qty(draft.total)}
            suffix={t("scan.fields.suffixChf")}
            required
          />
        </div>
        <div className="pm-scan-field-row">
          <DraftField
            label={t("scan.fields.liters")}
            value={qty(draft.liters)}
            suffix={t("scan.fields.suffixL")}
            required
          />
          <DraftField
            label={t("scan.fields.odometer")}
            value={odometerValue}
            placeholder={t("scan.fields.odometerPlaceholder")}
            suffix={t("scan.fields.suffixKm")}
          />
        </div>
        <div className="pm-scan-field-row">
          <DraftField
            label={t("scan.fields.pricePerLiter")}
            value={qty(draft.pricePerLiter)}
            suffix={t("scan.fields.suffixChfL")}
            locked
          />
          <label className="pm-scan-field">
            <span className="pm-scan-field-label">{t("scan.fields.fullTank")}</span>
            <span className="pm-scan-toggle">
              <span className={draft.fullTank ? undefined : "is-on"}>{t("scan.fields.fullTankNo")}</span>
              <span className={draft.fullTank ? "is-on" : undefined}>{t("scan.fields.fullTankYes")}</span>
            </span>
          </label>
        </div>
        <div className="pm-scan-field-row">
          <DraftField
            label={t("scan.fields.fuelGrade")}
            value={t("scan.fields.notSet")}
            muted
            chevron
          />
          <DraftField
            label={t("scan.fields.location")}
            value={draft.location ?? undefined}
            placeholder={t("scan.fields.locationPlaceholder")}
          />
        </div>
        <DraftField
          label={t("scan.fields.notes")}
          placeholder={t("scan.fields.notesPlaceholder")}
          multiline
        />
      </div>
      <div className="pm-scan-draft-footer">
        <span className="pm-scan-btn-cancel">{t("scan.cancel")}</span>
        <span className="pm-scan-btn-save">{t("scan.save")}</span>
      </div>
    </>
  );
}

function DraftField({
  label,
  value,
  placeholder,
  suffix,
  required,
  chevron,
  locked,
  muted,
  multiline,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  suffix?: string;
  required?: boolean;
  chevron?: boolean;
  locked?: boolean;
  muted?: boolean;
  multiline?: boolean;
}) {
  return (
    <label className={multiline ? "pm-scan-field is-full" : "pm-scan-field"}>
      <span className="pm-scan-field-label">
        {label}
        {required ? <span className="pm-scan-req"> *</span> : null}
      </span>
      <span
        className={[
          "pm-scan-input",
          locked ? "is-locked" : "",
          multiline ? "is-multiline" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {value ? (
          <span className={muted ? "pm-scan-input-value is-muted" : "pm-scan-input-value"}>
            {value}
          </span>
        ) : (
          <span className="pm-scan-input-placeholder">{placeholder}</span>
        )}
        {suffix ? <span className="pm-scan-input-suffix">{suffix}</span> : null}
        {chevron ? <IconChevronDown className="pm-scan-input-chevron" aria-hidden /> : null}
      </span>
    </label>
  );
}
