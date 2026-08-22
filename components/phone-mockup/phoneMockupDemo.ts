export type MockupEventKind =
  | "refuel"
  | "maintenance"
  | "insurance"
  | "expense"
  | "tax"
  | "trip"
  | "note";

export type MockupActivity = {
  kind: MockupEventKind;
  title: string;
  date: string;
  cost?: number;
  fxFrom?: string;
  kmSince?: number;
  odometer?: number;
};

export type MockupVehicleCard = {
  id: string;
  skin: string;
  make: string;
  model: string;
  plate: string;
  odometer: number;
  selected?: boolean;
};

export const MOCKUP_VEHICLE = {
  make: "DUCATI",
  model: "Multistrada 1260 S",
  plate: "TG 21962",
  odometer: 54372,
  year: 2019,
  vin: "ZDM12BWW000123456",
  displacement: "1'262",
  power: "116",
  tank: "20",
  logs: 21,
  docsReady: 3,
  docsMax: 4,
  insurer: "Baloise Versicherung AG",
  policyNumber: "40/6.972.037",
  policyEnd: "2027-04-22",
  premium: 1341.3,
  manualName: "Manuale_Multistrada_1260",
  manualUpdated: "2026-06-02",
  manualPages: 357,
  manualSize: "9.2 MB",
  firstRegistration: "2019-03-14",
  spendTotal: 2954.98,
  spendEvents: 17,
  spendVsLast: 84,
  trackedKm: 2150,
  costPerKm: 1.37,
  tyresDays: 408,
  tyresKm: 8372,
  oilDays: 46,
  oilKm: 10058,
} as const;

export const MOCKUP_FOCUS_YEAR = 2026;
export const MOCKUP_SIDE_YEAR = 2025;

export const MOCKUP_HOME_ACTIVITIES: MockupActivity[] = [
  { kind: "refuel", title: "Egnach", date: "2026-07-11", cost: 35.25, kmSince: 341, odometer: 54372 },
  { kind: "maintenance", title: "Service, catena, freni, tes…", date: "2025-07-10", cost: 1235.95, odometer: 46000 },
  { kind: "insurance", title: "Baloise Versicherung AG", date: "2026-05-08", cost: 1286.5 },
  { kind: "expense", title: "highway vignette", date: "2026-05-05", cost: 40, odometer: 52222 },
  { kind: "trip", title: "Arbon → Zurigo", date: "2026-06-19", kmSince: 1800, odometer: 55944 },
  { kind: "tax", title: "Bollo / tassa di circolazione", date: "2026-04-10", cost: 43.75 },
];

export const MOCKUP_TIMELINE_MONTHS: {
  month: number;
  events: MockupActivity[];
}[] = [
  {
    month: 0,
    events: [{ kind: "insurance", title: "Baloise Versicherung AG", date: "2026-01-12", cost: 1276.9 }],
  },
  {
    month: 3,
    events: [{ kind: "tax", title: "Bollo / tassa di circolazione", date: "2026-04-10", cost: 43.75 }],
  },
  {
    month: 4,
    events: [
      { kind: "expense", title: "highway vignette", date: "2026-05-05", cost: 40, odometer: 52222 },
      { kind: "insurance", title: "Baloise Versicherung AG", date: "2026-05-08", cost: 1286.5 },
      { kind: "refuel", title: "Migrol, Salmsach", date: "2026-05-22", cost: 38.4, kmSince: 312, odometer: 52680 },
    ],
  },
  {
    month: 5,
    events: [
      { kind: "refuel", title: "Milano", date: "2026-06-15", cost: 34.55, fxFrom: "€37.49", kmSince: 319, odometer: 52688 },
      { kind: "refuel", title: "Varazze", date: "2026-06-16", cost: 41.2, fxFrom: "€44.80", kmSince: 286, odometer: 52974 },
      { kind: "refuel", title: "Nice", date: "2026-06-17", cost: 39.1, fxFrom: "€42.50", kmSince: 274, odometer: 53248 },
      { kind: "trip", title: "Valensole", date: "2026-06-18", kmSince: 412, odometer: 53660 },
      { kind: "refuel", title: "Embrun", date: "2026-06-18", cost: 36.8, fxFrom: "€40.00", kmSince: 198, odometer: 53858 },
      { kind: "refuel", title: "Chivasso", date: "2026-06-19", cost: 33.9, kmSince: 265, odometer: 54123 },
      { kind: "trip", title: "Arbon → Zurigo", date: "2026-06-19", kmSince: 1800, odometer: 55944 },
      { kind: "refuel", title: "San Bernardino", date: "2026-06-20", cost: 28.15, kmSince: 210, odometer: 54333 },
    ],
  },
  {
    month: 6,
    events: [{ kind: "refuel", title: "Egnach", date: "2026-07-11", cost: 35.25, kmSince: 341, odometer: 54372 }],
  },
];

export const MOCKUP_SPEND_BARS = [1277, 0, 0, 43.8, 1282, 217, 35.3, 0, 0, 0, 0, 0];
export const MOCKUP_FIXED_BARS = [0, 0, 0, 43.8, 0, 0, 0, 0, 0, 0, 0, 0];
export const MOCKUP_INSURANCE_BARS = [1277, 0, 0, 0, 1267, 0, 0, 0, 0, 0, 0, 0];
export const MOCKUP_HOME_SPEND_BARS = [1277, 12, 8, 43.8, 1282, 217, 35.3, 18, 22, 15, 11, 14];

export const MOCKUP_SPEND_CATEGORIES: {
  kind: MockupEventKind;
  total: number;
  events: number;
  avg: number;
  vsLast?: number;
  share: number;
}[] = [
  { kind: "insurance", total: 2563.4, events: 2, avg: 1281.7, share: 87 },
  { kind: "refuel", total: 307.83, events: 11, avg: 27.98, share: 10 },
  { kind: "tax", total: 43.75, events: 1, avg: 43.75, vsLast: 2, share: 2 },
  { kind: "expense", total: 40, events: 1, avg: 40, vsLast: -88, share: 1 },
  { kind: "note", total: 0, events: 1, avg: 0, share: 0 },
  { kind: "trip", total: 0, events: 1, avg: 0, share: 0 },
];

export const MOCKUP_FLEET: MockupVehicleCard[] = [
  { id: "vespa", skin: "vespa", make: "PIAGGIO", model: "Vespa GTS 300 HPE", plate: "TG 31099", odometer: 11202 },
  { id: "sf", skin: "streetfighter", make: "DUCATI", model: "Streetfighter 848", plate: "TG 21962", odometer: 24285 },
  { id: "fiat", skin: "fiat", make: "FIAT", model: "FIAT 500", plate: "B-659KE", odometer: 138025 },
  { id: "primavera", skin: "primavera", make: "PIAGGIO", model: "V. Primavera 125", plate: "TG 29275", odometer: 4557 },
  { id: "santafe", skin: "santafe", make: "HYUNDAI", model: "Santa Fe 2.2 CRDI", plate: "TG 108800", odometer: 151030 },
  {
    id: "multi",
    skin: "ducati",
    make: "DUCATI",
    model: "Multistrada 1260 S",
    plate: "TG 21962",
    odometer: 54372,
    selected: true,
  },
];
