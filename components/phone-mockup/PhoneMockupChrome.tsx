import {
  IconCar,
  IconChartBar,
  IconFileText,
  IconHistory,
  IconHome,
  IconMenu2,
} from "@tabler/icons-react";
import type { ReactNode } from "react";
import LogoIcon from "@/components/LogoIcon";

export type PhoneMockupTabId = "home" | "details" | "timeline" | "stats" | "garage";

export type PhoneMockupChatId = "ask-log" | "ask-docs" | "smart-log";

export type PhoneMockupFlowId = "smart-scan";

export type PhoneMockupTourId = PhoneMockupChatId | PhoneMockupFlowId;

export type PhoneMockupSceneId = PhoneMockupTabId | PhoneMockupTourId;

export type PhoneMockupTabLabels = Record<PhoneMockupTabId, string>;

export const PHONE_MOCKUP_TAB_TOUR: PhoneMockupTabId[] = [
  "home",
  "details",
  "timeline",
  "stats",
  "garage",
];

export const PHONE_MOCKUP_ASK_TOUR: PhoneMockupTourId[] = [
  "ask-log",
  "ask-docs",
  "smart-scan",
  "smart-log",
];

export function isPhoneMockupChatScene(scene: PhoneMockupSceneId): scene is PhoneMockupChatId {
  return scene === "ask-log" || scene === "ask-docs" || scene === "smart-log";
}

export function isPhoneMockupSmartScanScene(
  scene: PhoneMockupSceneId,
): scene is PhoneMockupFlowId {
  return scene === "smart-scan";
}

export function isPhoneMockupFlowScene(
  scene: PhoneMockupSceneId,
): scene is PhoneMockupTourId {
  return isPhoneMockupChatScene(scene) || isPhoneMockupSmartScanScene(scene);
}

const TABS: {
  id: PhoneMockupTabId;
  icon: (className: string) => ReactNode;
}[] = [
  { id: "home", icon: (c) => <IconHome className={c} /> },
  { id: "details", icon: (c) => <IconFileText className={c} /> },
  { id: "timeline", icon: (c) => <IconHistory className={c} /> },
  { id: "stats", icon: (c) => <IconChartBar className={c} /> },
  { id: "garage", icon: (c) => <IconCar className={c} /> },
];

export function PhoneMockupHeader() {
  return (
    <div className="phone-mockup-header" aria-hidden>
      <div className="phone-mockup-lockup">
        <LogoIcon className="phone-mockup-logo" />
        <span className="phone-mockup-wordmark">
          <span>Gar</span>
          <span>IQ</span>
        </span>
        <IconMenu2 className="phone-mockup-menu" />
      </div>
    </div>
  );
}

type PhoneMockupFooterProps = {
  activeTab: PhoneMockupTabId;
  labels: PhoneMockupTabLabels;
};

export function PhoneMockupFooter({ activeTab, labels }: PhoneMockupFooterProps) {
  return (
    <div className="phone-mockup-footer" aria-hidden>
      <div className="phone-mockup-tabs">
        {TABS.map((tab) => (
          <span
            key={tab.id}
            className={
              tab.id === activeTab ? "phone-mockup-tab is-active" : "phone-mockup-tab"
            }
          >
            {tab.icon("phone-mockup-tab-icon")}
            <span className="phone-mockup-tab-label">{labels[tab.id]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
