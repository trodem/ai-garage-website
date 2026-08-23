"use client";

import {
  IconBuildingBank,
  IconCalendarEvent,
  IconChartBar,
  IconChecklist,
  IconCircleCheck,
  IconDroplet,
  IconEye,
  IconFileText,
  IconGasStation,
  IconGauge,
  IconHistory,
  IconInfoCircle,
  IconLicense,
  IconMessageChatbot,
  IconMotorbike,
  IconNotes,
  IconPencil,
  IconPlus,
  IconQrcode,
  IconRoute,
  IconShield,
  IconShoppingBag,
  IconTool,
  IconTrash,
  IconWallet,
} from "@tabler/icons-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PhoneMockupChatScreen } from "@/components/phone-mockup/PhoneMockupChatScreens";
import {
  isPhoneMockupChatScene,
  isPhoneMockupSmartScanScene,
  type PhoneMockupSceneId,
  type PhoneMockupTourId,
} from "@/components/phone-mockup/PhoneMockupChrome";
import PhoneMockupSmartScanScreen from "@/components/phone-mockup/PhoneMockupSmartScanScreen";
import {
  prefersReducedMotion,
  useMockupDelayedFlag,
} from "@/components/phone-mockup/phoneMockupMotion";
import {
  MOCKUP_FIXED_BARS,
  MOCKUP_FIXED_EVENTS,
  MOCKUP_FIXED_TOTAL,
  MOCKUP_FIXED_VS_LAST,
  MOCKUP_FLEET,
  MOCKUP_FOCUS_YEAR,
  MOCKUP_HOME_ACTIVITIES,
  MOCKUP_HOME_SPEND_BARS,
  MOCKUP_INSURANCE_AVG,
  MOCKUP_INSURANCE_BARS,
  MOCKUP_INSURANCE_PAYMENTS,
  MOCKUP_INSURANCE_TOTAL,
  MOCKUP_NEXT_YEAR,
  MOCKUP_PREV_YEAR,
  MOCKUP_SPEND_BARS,
  MOCKUP_SPEND_CATEGORIES,
  MOCKUP_TIMELINE_MONTHS,
  MOCKUP_VEHICLE,
  type MockupActivity,
  type MockupEventKind,
} from "@/components/phone-mockup/phoneMockupDemo";

type ScreenCopy = ReturnType<typeof useTranslations>;

/** Bundled placeholders are 883×269 banners; letterbox like the app (`contain`). */
const PLACEHOLDER_PHOTO_STYLE = {
  objectFit: "contain",
  objectPosition: "center",
} as const;

function chf(value: number): string {
  return `CHF ${value.toLocaleString("de-CH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function km(value: number): string {
  return `${value.toLocaleString("de-CH")} km`;
}

function isoDate(value: string): Date {
  return new Date(`${value}T12:00:00`);
}

function eventIcon(kind: MockupEventKind): ReactNode {
  const className = `pm-kind-icon pm-kind-${kind}`;
  switch (kind) {
    case "refuel":
      return <IconGasStation className={className} />;
    case "maintenance":
      return <IconTool className={className} />;
    case "insurance":
      return <IconShield className={className} />;
    case "expense":
      return <IconShoppingBag className={className} />;
    case "tax":
      return <IconBuildingBank className={className} />;
    case "trip":
      return <IconRoute className={className} />;
    case "note":
      return <IconNotes className={className} />;
  }
}

function typeLabel(t: ScreenCopy, kind: MockupEventKind): string {
  return t(`types.${kind}`);
}

function activityMeta(
  formatter: ReturnType<typeof useFormatter>,
  item: MockupActivity,
): string {
  const when = formatter.dateTime(isoDate(item.date), {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  if (item.kmSince) return `${when} · ${km(item.kmSince)}`;
  return when;
}

function isVisibleInPhone(el: HTMLElement, phone: DOMRect): boolean {
  const box = el.getBoundingClientRect();
  const visible = Math.min(box.bottom, phone.bottom) - Math.max(box.top, phone.top);
  if (visible <= 0) return false;
  const need = Math.min(box.height * 0.35, phone.height * 0.16);
  return visible >= Math.max(need, 16);
}

function useWhenVisibleInPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setActive(true);
      return;
    }
    const phone = el.closest(".phone-mockup-body");
    if (!(phone instanceof HTMLElement)) return;

    let frame = 0;
    const tick = () => {
      if (isVisibleInPhone(el, phone.getBoundingClientRect())) {
        setActive(true);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { ref, active };
}

function InPhoneView({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const { ref, active } = useWhenVisibleInPhone();
  return (
    <div ref={ref} className={active ? `${className} is-inview` : className}>
      {children}
    </div>
  );
}

function MonthChart({
  values,
  highlight,
  labels,
}: {
  values: number[];
  highlight?: number;
  labels: string[];
}) {
  const peak = Math.max(...values, 1);
  const { ref, active } = useWhenVisibleInPhone();
  return (
    <div ref={ref} className={active ? "pm-chart is-inview" : "pm-chart"}>
      {values.map((value, index) => (
        <div
          key={labels[index]}
          className={index === highlight ? "pm-chart-col is-active" : "pm-chart-col"}
        >
          {value > 0 ? (
            <span className="pm-chart-value" style={{ ["--bar-i" as string]: index }}>
              {Math.round(value)}
            </span>
          ) : (
            <span className="pm-chart-value pm-chart-value--empty" />
          )}
          <span
            className={value <= 0 ? "pm-chart-bar is-empty" : "pm-chart-bar"}
            style={{
              height: value <= 0 ? "4px" : `${Math.max(16, Math.sqrt(value / peak) * 100)}%`,
              ["--bar-i" as string]: index,
            }}
          />
          <span className="pm-chart-label">{labels[index]}</span>
        </div>
      ))}
    </div>
  );
}

function YearPager() {
  return (
    <div className="pm-year-pager">
      <span>{MOCKUP_PREV_YEAR}</span>
      <strong>{MOCKUP_FOCUS_YEAR}</strong>
      <span>{MOCKUP_NEXT_YEAR}</span>
    </div>
  );
}

function VehicleTitle() {
  return (
    <p className="pm-vehicle-title">
      {MOCKUP_VEHICLE.make} {MOCKUP_VEHICLE.model}
    </p>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <span className="pm-field">
      <span className="pm-field-label">{label}</span>
      <span className="pm-field-value">{value}</span>
    </span>
  );
}

function DocActions({
  labels,
}: {
  labels: string[];
}) {
  return (
    <div className="pm-doc-actions">
      {labels.map((label) => (
        <span key={label} className="pm-doc-btn">
          {label === labels[0] ? <IconFileText className="pm-doc-btn-icon" /> : null}
          {label}
        </span>
      ))}
    </div>
  );
}

function ActivityRow({
  formatter,
  item,
}: {
  formatter: ReturnType<typeof useFormatter>;
  item: MockupActivity;
}) {
  return (
    <div className="pm-activity">
      <span className={`pm-kind-wrap pm-kind-${item.kind}`}>{eventIcon(item.kind)}</span>
      <span className="pm-activity-copy">
        <strong>{item.title}</strong>
        <em>{activityMeta(formatter, item)}</em>
      </span>
      <span className="pm-activity-meta">
        {item.fxFrom && item.cost != null ? (
          <strong>{item.fxFrom} → {chf(item.cost)}</strong>
        ) : item.cost != null ? (
          <strong>{chf(item.cost)}</strong>
        ) : null}
        {item.odometer != null ? <em>@ {km(item.odometer)}</em> : null}
      </span>
    </div>
  );
}

function HomeScreen({
  t,
  formatter,
  monthLabels,
  hubTapTarget,
  motionPaused,
  onHubTapComplete,
  onHubPillSelect,
}: {
  t: ScreenCopy;
  formatter: ReturnType<typeof useFormatter>;
  monthLabels: string[];
  hubTapTarget?: PhoneMockupTourId;
  motionPaused?: boolean;
  onHubTapComplete?: () => void;
  onHubPillSelect?: (id: PhoneMockupTourId) => void;
}) {
  const tiles: { kind: MockupEventKind | "inspection"; icon: ReactNode }[] = [
    { kind: "refuel", icon: <IconGasStation className="pm-tile-icon" /> },
    { kind: "maintenance", icon: <IconTool className="pm-tile-icon" /> },
    { kind: "insurance", icon: <IconShield className="pm-tile-icon" /> },
    { kind: "expense", icon: <IconShoppingBag className="pm-tile-icon" /> },
    { kind: "inspection", icon: <IconChecklist className="pm-tile-icon" /> },
    { kind: "tax", icon: <IconBuildingBank className="pm-tile-icon" /> },
    { kind: "note", icon: <IconNotes className="pm-tile-icon" /> },
    { kind: "trip", icon: <IconRoute className="pm-tile-icon" /> },
  ];
  const paused = Boolean(motionPaused);
  const holdDone = useMockupDelayedFlag(hubTapTarget ? 1100 : 0, paused, Boolean(hubTapTarget));
  const pills: {
    id: PhoneMockupTourId;
    tone: "pink" | "cyan";
    icon: ReactNode;
    label: string;
  }[] = [
    { id: "smart-scan", tone: "pink", icon: <IconQrcode className="pm-pill-icon" />, label: t("smartScan") },
    { id: "smart-log", tone: "pink", icon: <IconPencil className="pm-pill-icon" />, label: t("smartLog") },
    { id: "ask-log", tone: "cyan", icon: <IconMessageChatbot className="pm-pill-icon" />, label: t("askLogbook") },
    { id: "ask-docs", tone: "cyan", icon: <IconFileText className="pm-pill-icon" />, label: t("askDocs") },
  ];

  return (
    <>
      <div className="pm-hero">
        <Image
          src={MOCKUP_VEHICLE.photo}
          alt=""
          fill
          sizes="324px"
          style={PLACEHOLDER_PHOTO_STYLE}
          className="pm-hero-photo"
        />
        <p className="pm-hero-name">
          {MOCKUP_VEHICLE.make} {MOCKUP_VEHICLE.model}
        </p>
        <div className="pm-hero-meta">
          <span><IconLicense className="pm-mini-icon" />{MOCKUP_VEHICLE.plate}</span>
          <span><IconGauge className="pm-mini-icon" />{km(MOCKUP_VEHICLE.odometer)}</span>
          <span><IconEye className="pm-mini-icon" />{MOCKUP_VEHICLE.logs}</span>
          <span><IconFileText className="pm-mini-icon" />{MOCKUP_VEHICLE.docsReady}/{MOCKUP_VEHICLE.docsMax}</span>
        </div>
      </div>

      <div className="pm-pad">
        <div className={holdDone ? "pm-pills is-tapping" : "pm-pills"}>
          {pills.map((pill) => {
            const isTarget = hubTapTarget != null && pill.id === hubTapTarget;
            return (
              <span
                key={pill.id}
                className={[
                  "pm-pill",
                  pill.tone === "pink" ? "pm-pill-pink" : "pm-pill-cyan",
                  isTarget ? "is-target" : "",
                  isTarget && holdDone ? "is-tapping is-picked" : "",
                  onHubPillSelect ? "is-selectable" : "",
                ].filter(Boolean).join(" ")}
                onClick={() => {
                  onHubPillSelect?.(pill.id);
                }}
              >
                {isTarget && holdDone ? (
                  <span
                    className="pm-chat-tap"
                    aria-hidden
                    onAnimationEnd={(event) => {
                      if (event.animationName === "pmChatTap") onHubTapComplete?.();
                    }}
                  />
                ) : null}
                {pill.icon}
                {pill.label}
              </span>
            );
          })}
        </div>

        <p className="pm-section">{t("insertEvent")}</p>
        <div className="pm-tiles">
          {tiles.map((tile) => (
            <span key={tile.kind} className={`pm-tile pm-kind-${tile.kind}`}>
              {tile.icon}
              <em>{t(`tiles.${tile.kind}`)}</em>
            </span>
          ))}
        </div>

        <div className="pm-split">
          <div className="pm-status">
            <p className="pm-section">{t("activeTyres")}</p>
            <strong><IconCircleCheck className="pm-status-icon pm-kind-icon pm-kind-refuel" />{t("tyresAllSeason")}</strong>
            <em>{t("daysKm", { days: MOCKUP_VEHICLE.tyresDays, km: km(MOCKUP_VEHICLE.tyresKm) })}</em>
          </div>
          <div className="pm-status">
            <p className="pm-section">{t("oilCheck")}</p>
            <strong><IconDroplet className="pm-status-icon pm-kind-icon pm-kind-maintenance" />{t("oilOk")}</strong>
            <em>{t("daysKm", { days: MOCKUP_VEHICLE.oilDays, km: km(MOCKUP_VEHICLE.oilKm) })}</em>
          </div>
        </div>

        <p className="pm-section">{t("policy")}</p>
        <div className="pm-policy">
          <span className="pm-kind-wrap pm-kind-insurance"><IconShield className="pm-kind-icon pm-kind-insurance" /></span>
          <span>
            <strong>{MOCKUP_VEHICLE.insurer}</strong>
            <em>
              {t("untilDate", {
                date: formatter.dateTime(isoDate(MOCKUP_VEHICLE.policyEnd), {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
              })}
            </em>
          </span>
        </div>

        <p className="pm-section">{t("latest")}</p>
        <div className="pm-list">
          {MOCKUP_HOME_ACTIVITIES.map((item) => (
            <ActivityRow key={`${item.title}-${item.date}`} formatter={formatter} item={item} />
          ))}
        </div>

        <p className="pm-section">{t("spendingYear", { year: MOCKUP_FOCUS_YEAR })}</p>
        <div className="pm-spend-card">
          <div className="pm-spend-head">
            <strong>{chf(MOCKUP_VEHICLE.spendTotal)}</strong>
            <em>{t("eventCount", { count: MOCKUP_VEHICLE.spendEvents })}</em>
            <span>{t("vsLastYear", { percent: MOCKUP_VEHICLE.spendVsLast })}</span>
          </div>
          <MonthChart values={[...MOCKUP_HOME_SPEND_BARS]} labels={monthLabels} />
        </div>

        <span className="pm-switch">
          <IconMotorbike className="pm-switch-icon" />
          {t("switchVehicle")}
        </span>
      </div>
    </>
  );
}

function DetailsScreen({
  t,
  formatter,
}: {
  t: ScreenCopy;
  formatter: ReturnType<typeof useFormatter>;
}) {
  const dash = "—";
  return (
    <div className="pm-pad">
      <VehicleTitle />
      <div className="pm-doc-card">
        <p className="pm-doc-title"><IconFileText className="pm-doc-title-icon" />{t("registration")}</p>
        <div className="pm-fields">
          <Field label={t("vehicleType")} value={t("motorcycle")} />
          <Field label={t("year")} value={String(MOCKUP_VEHICLE.year)} />
          <Field label={t("plate")} value={MOCKUP_VEHICLE.plate} />
          <Field label={t("vin")} value={MOCKUP_VEHICLE.vin} />
          <Field label={t("color")} value={t("colorRed")} />
          <Field label={t("firstRegistration")} value={formatter.dateTime(isoDate(MOCKUP_VEHICLE.firstRegistration), { dateStyle: "medium" })} />
          <Field label={t("fuel")} value={t("petrol")} />
          <Field label={t("odometer")} value={km(MOCKUP_VEHICLE.odometer)} />
          <Field label={t("odometerUnit")} value={t("unitKm")} />
          <Field label={t("displacement")} value={MOCKUP_VEHICLE.displacement} />
          <Field label={t("power")} value={MOCKUP_VEHICLE.power} />
          <Field label={t("tank")} value={MOCKUP_VEHICLE.tank} />
          <Field label={t("remarks")} value={dash} />
          <Field label={t("notes")} value={dash} />
        </div>
        <DocActions labels={[t("open"), t("rescan"), t("edit")]} />
      </div>

      <div className="pm-doc-card">
        <p className="pm-doc-title"><IconShield className="pm-doc-title-icon" />{t("policy")}</p>
        <div className="pm-fields">
          <Field label={t("insurer")} value={MOCKUP_VEHICLE.insurer} />
          <Field label={t("policyNumber")} value={MOCKUP_VEHICLE.policyNumber} />
          <Field label={t("coverageEnd")} value={formatter.dateTime(isoDate(MOCKUP_VEHICLE.policyEnd), { month: "short", day: "numeric", year: "numeric" })} />
          <Field label={t("premium")} value={`${MOCKUP_VEHICLE.premium} CHF`} />
        </div>
        <DocActions labels={[t("open"), t("rescan"), t("edit")]} />
      </div>

      <div className="pm-doc-card">
        <p className="pm-doc-title"><IconFileText className="pm-doc-title-icon" />{t("manual")}</p>
        <div className="pm-fields">
          <Field label={t("documentName")} value={MOCKUP_VEHICLE.manualName} />
          <Field label={t("updated")} value={formatter.dateTime(isoDate(MOCKUP_VEHICLE.manualUpdated), { month: "short", day: "numeric", year: "numeric" })} />
          <Field label={t("pages")} value={t("pageCount", { count: MOCKUP_VEHICLE.manualPages })} />
          <Field label={t("size")} value={MOCKUP_VEHICLE.manualSize} />
        </div>
        <DocActions labels={[t("open"), t("rescan")]} />
      </div>

      <div className="pm-doc-card">
        <p className="pm-doc-title"><IconFileText className="pm-doc-title-icon" />{t("contract")}</p>
        <p className="pm-empty-hint">{t("contractEmpty")}</p>
        <DocActions labels={[t("scan"), t("fill")]} />
      </div>

      <p className="pm-doc-title">{t("soldTitle")}</p>
      <p className="pm-empty-hint">{t("soldBody")}</p>
      <span className="pm-outline-btn">{t("soldCta")}</span>
    </div>
  );
}

function TimelineScreen({
  t,
  formatter,
}: {
  t: ScreenCopy;
  formatter: ReturnType<typeof useFormatter>;
}) {
  const totalEvents = MOCKUP_TIMELINE_MONTHS.reduce((sum, month) => sum + month.events.length, 0);
  return (
    <div className="pm-pad">
      <VehicleTitle />
      <YearPager />
      <div className="pm-year-card">
        <div className="pm-year-card-top">
          <strong>{MOCKUP_FOCUS_YEAR}</strong>
          <span>{chf(MOCKUP_VEHICLE.spendTotal)}</span>
        </div>
        <div className="pm-year-card-bottom">
          <span className="pm-year-tools">
            <IconChartBar className="pm-mini-icon" />
            <IconHistory className="pm-mini-icon" />
          </span>
          <span className="pm-event-chip">{t("eventCount", { count: totalEvents })}</span>
        </div>
      </div>
      <div className="pm-timeline">
        {MOCKUP_TIMELINE_MONTHS.map((group) => (
          <div key={group.month} className="pm-month">
            <div className="pm-month-head">
              <span>
                {formatter.dateTime(new Date(MOCKUP_FOCUS_YEAR, group.month, 1), { month: "long" }).toUpperCase()}
              </span>
              <em>{t("eventCount", { count: group.events.length })}</em>
            </div>
            {group.events.map((item) => (
              <ActivityRow key={`${item.title}-${item.date}`} formatter={formatter} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsScreen({
  t,
  monthLabels,
}: {
  t: ScreenCopy;
  monthLabels: string[];
}) {
  return (
    <div className="pm-pad">
      <VehicleTitle />
      <YearPager />
      <p className="pm-section">{t("spending")}</p>
      <div className="pm-spend-card">
        <div className="pm-spend-head">
          <strong>{chf(MOCKUP_VEHICLE.spendTotal)}</strong>
          <span>{t("vsLastYear", { percent: MOCKUP_VEHICLE.spendVsLast })}</span>
        </div>
        <div className="pm-metrics">
          <span><IconCalendarEvent className="pm-mini-icon" />{t("eventCount", { count: MOCKUP_VEHICLE.spendEvents })}</span>
          <span><IconGauge className="pm-mini-icon" />{km(MOCKUP_VEHICLE.trackedKm)}</span>
          <span><IconWallet className="pm-mini-icon" />{t("perKm", { amount: chf(MOCKUP_VEHICLE.costPerKm) })}</span>
        </div>
        <InPhoneView className="pm-cats">
        {MOCKUP_SPEND_CATEGORIES.map((row, index) => (
          <div key={row.kind} className="pm-cat" style={{ ["--cat-i" as string]: index }}>
            <div className="pm-cat-row">
              <span className={`pm-cat-badge pm-kind-${row.kind}`}>{typeLabel(t, row.kind)}</span>
              <strong>
                {chf(row.total)}
                {row.vsLast != null ? (
                  <em> {t("vsLastYearSigned", { sign: row.vsLast > 0 ? "+" : "-", percent: Math.abs(row.vsLast) })}</em>
                ) : null}
              </strong>
            </div>
            <p className="pm-cat-meta">
              {row.total > 0
                ? t("rowMetaAvg", { countLabel: t("eventCount", { count: row.events }), avg: chf(row.avg) })
                : t("eventCount", { count: row.events })}
            </p>
            <span className={`pm-cat-bar pm-kind-${row.kind}`} style={{ width: `${Math.max(8, row.share)}%` }} />
          </div>
        ))}
        </InPhoneView>
        <p className="pm-chart-caption">{t("monthlyTrend")}</p>
        <MonthChart values={[...MOCKUP_SPEND_BARS]} highlight={7} labels={monthLabels} />
      </div>

      <p className="pm-section">{t("fixedCosts")}</p>
      <div className="pm-spend-card">
        <div className="pm-spend-head">
          <strong>{chf(MOCKUP_FIXED_TOTAL)}</strong>
          <span>{t("vsLastYear", { percent: MOCKUP_FIXED_VS_LAST })}</span>
        </div>
        <p className="pm-cat-meta">{t("eventsInPeriod", { count: MOCKUP_FIXED_EVENTS })}</p>
        <p className="pm-chart-caption">{t("fixedTrend")}</p>
        <MonthChart values={[...MOCKUP_FIXED_BARS]} labels={monthLabels} />
      </div>

      <p className="pm-section">{t("premiumSection")}</p>
      <div className="pm-spend-card">
        <strong className="pm-block-total">{chf(MOCKUP_INSURANCE_TOTAL)}</strong>
        <div className="pm-kv">
          <span>{t("paymentsTotal")}</span><strong>{chf(MOCKUP_INSURANCE_TOTAL)}</strong>
          <span>{t("payments")}</span><strong>{t("eventCount", { count: MOCKUP_INSURANCE_PAYMENTS })}</strong>
          <span>{t("avgPayment")}</span><strong>{chf(MOCKUP_INSURANCE_AVG)}</strong>
        </div>
        <p className="pm-chart-caption">{t("byInsurer")}</p>
        <p className="pm-insurer-row">
          <strong>{MOCKUP_VEHICLE.insurer}</strong>
          <em>{chf(MOCKUP_INSURANCE_TOTAL)} · {t("eventCount", { count: MOCKUP_INSURANCE_PAYMENTS })}</em>
        </p>
        <p className="pm-chart-caption">{t("insuranceTrend")}</p>
        <MonthChart values={[...MOCKUP_INSURANCE_BARS]} labels={monthLabels} />
      </div>

      <p className="pm-section">{t("trips")}</p>
    </div>
  );
}

function GarageScreen({ t }: { t: ScreenCopy }) {
  return (
    <div className="pm-pad pm-pad-garage">
      <div className="pm-segment">
        <span className="is-active">{t("active")}</span>
        <span>{t("inactive")}</span>
      </div>
      <div className="pm-fleet">
        {MOCKUP_FLEET.map((vehicle) => (
          <div
            key={vehicle.id}
            className={vehicle.selected ? "pm-fleet-card is-selected" : "pm-fleet-card"}
          >
            <Image
              src={vehicle.photo}
              alt=""
              fill
              sizes="324px"
              style={PLACEHOLDER_PHOTO_STYLE}
              className="pm-fleet-photo"
            />
            <div className="pm-fleet-top">
              <span className="pm-fleet-trash"><IconTrash className="pm-mini-icon" /></span>
              <em>{t("tapToSelect")}</em>
              <span className="pm-fleet-info"><IconInfoCircle className="pm-mini-icon" /></span>
            </div>
            <div className="pm-fleet-bottom">
              <strong>{vehicle.make}</strong>
              <b>{vehicle.model}</b>
              <span>
                <IconLicense className="pm-mini-icon" />{vehicle.plate}
                <IconGauge className="pm-mini-icon" />{km(vehicle.odometer)}
              </span>
            </div>
            {vehicle.selected ? (
              <span className="pm-fleet-check"><IconCircleCheck className="pm-check-icon" /></span>
            ) : null}
          </div>
        ))}
      </div>
      <span className="pm-fab"><IconPlus className="pm-fab-icon" /></span>
    </div>
  );
}

export function PhoneMockupScreen({
  scene,
  motionPaused = false,
  hubTapTarget,
  onHubTapComplete,
  onHubPillSelect,
  onSceneTourComplete,
}: {
  scene: PhoneMockupSceneId;
  motionPaused?: boolean;
  hubTapTarget?: PhoneMockupTourId;
  onHubTapComplete?: () => void;
  onHubPillSelect?: (id: PhoneMockupTourId) => void;
  onSceneTourComplete?: () => void;
}) {
  const t = useTranslations("hero.mockup");
  const formatter = useFormatter();
  const monthLabels = Array.from({ length: 12 }, (_, index) =>
    formatter.dateTime(new Date(MOCKUP_FOCUS_YEAR, index, 1), { month: "short" }),
  );

  if (isPhoneMockupSmartScanScene(scene)) {
    return (
      <PhoneMockupSmartScanScreen
        motionPaused={motionPaused}
        onComplete={onSceneTourComplete ?? (() => undefined)}
      />
    );
  }

  if (isPhoneMockupChatScene(scene)) {
    return (
      <PhoneMockupChatScreen
        scene={scene}
        motionPaused={motionPaused}
        onComplete={onSceneTourComplete ?? (() => undefined)}
      />
    );
  }

  return (
    <div className={`pm-screen pm-screen-${scene}`}>
      {scene === "home" ? (
        <HomeScreen
          t={t}
          formatter={formatter}
          monthLabels={monthLabels}
          hubTapTarget={hubTapTarget}
          motionPaused={motionPaused}
          onHubTapComplete={onHubTapComplete}
          onHubPillSelect={onHubPillSelect}
        />
      ) : null}
      {scene === "details" ? <DetailsScreen t={t} formatter={formatter} /> : null}
      {scene === "timeline" ? <TimelineScreen t={t} formatter={formatter} /> : null}
      {scene === "stats" ? <StatsScreen t={t} monthLabels={monthLabels} /> : null}
      {scene === "garage" ? <GarageScreen t={t} /> : null}
    </div>
  );
}
