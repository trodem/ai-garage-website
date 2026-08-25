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
  photo: string;
  make: string;
  model: string;
  plate: string;
  odometer: number;
  selected?: boolean;
};

export const MOCKUP_VEHICLE = {
  make: "DUCATI",
  model: "Panigale 1299s",
  plate: "ZH 48291",
  photo: "/images/placeholders/motorcycle.png",
  odometer: 28460,
  year: 2022,
  vin: "ZDM12BKW0NB129918",
  displacement: "1'285",
  power: "205",
  tank: "17",
  logs: 28,
  docsReady: 3,
  docsMax: 4,
  insurer: "Alpenblick Versicherung AG",
  policyNumber: "18/4.220.661",
  policyEnd: "2027-06-30",
  premium: 890,
  manualName: "Panigale1299S_Owners_Manual",
  manualUpdated: "2026-03-18",
  manualPages: 412,
  manualSize: "11.4 MB",
  firstRegistration: "2022-04-08",
  spendTotal: 4510.4,
  spendEvents: 24,
  spendVsLast: 31,
  trackedKm: 4820,
  costPerKm: 0.94,
  tyresDays: 94,
  tyresKm: 4120,
  oilDays: 21,
  oilKm: 1860,
} as const;

export const MOCKUP_SCAN_RECEIPT = {
  station: "Avia Chur",
  date: "2026-08-18",
  liters: 30.28,
  pricePerLiter: 1.79,
  recentAvgPricePerLiter: 1.84,
  total: 54.2,
  odometer: 28460,
  kmSincePrevious: 312,
  location: "Chur",
  fullTank: true,
} as const;

/** Smart Log chat: "oggi" + CHF 25 for 7 L — date matches the demo calendar day. */
export const MOCKUP_SMART_LOG_REFUEL = {
  date: "2026-08-23",
  total: 25,
  liters: 7,
  pricePerLiter: 3.57,
  odometer: null,
  location: null,
  fullTank: false,
} as const;

export const MOCKUP_FOCUS_YEAR = 2026;
export const MOCKUP_PREV_YEAR = 2025;
export const MOCKUP_NEXT_YEAR = 2027;

export const MOCKUP_FIXED_TOTAL = 572;
export const MOCKUP_FIXED_EVENTS = 8;
export const MOCKUP_FIXED_VS_LAST = 4;
export const MOCKUP_INSURANCE_TOTAL = 3140;
export const MOCKUP_INSURANCE_PAYMENTS = 2;
export const MOCKUP_INSURANCE_AVG = 730;

export const MOCKUP_HOME_ACTIVITIES: MockupActivity[] = [
  { kind: "refuel", title: "Avia Chur", date: "2026-08-18", cost: 54.2, kmSince: 312, odometer: 28460 },
  { kind: "expense", title: "Parkhaus Interlaken", date: "2026-08-02", cost: 18 },
  { kind: "trip", title: "Luzern → Interlaken", date: "2026-07-28", kmSince: 186, odometer: 28148 },
  { kind: "refuel", title: "Gotthard Nord", date: "2026-07-11", cost: 61.4, kmSince: 298, odometer: 27962 },
  { kind: "insurance", title: "Alpenblick Versicherung AG", date: "2026-05-15", cost: 890 },
  { kind: "maintenance", title: "Annual service, oil, pads", date: "2026-03-12", cost: 420, odometer: 24610 },
];

export const MOCKUP_TIMELINE_MONTHS: {
  month: number;
  events: MockupActivity[];
}[] = [
  {
    month: 0,
    events: [
      { kind: "insurance", title: "Alpenblick Versicherung AG", date: "2026-01-14", cost: 890 },
      { kind: "refuel", title: "Shell Luzern", date: "2026-01-22", cost: 41, kmSince: 240, odometer: 23880 },
    ],
  },
  {
    month: 1,
    events: [
      { kind: "refuel", title: "Coop Pronto Emmen", date: "2026-02-09", cost: 48, kmSince: 255, odometer: 24135 },
      { kind: "expense", title: "Parkhaus KKL", date: "2026-02-16", cost: 22 },
    ],
  },
  {
    month: 2,
    events: [
      { kind: "maintenance", title: "Annual service, oil, pads", date: "2026-03-12", cost: 420, odometer: 24610 },
      { kind: "refuel", title: "Agrola Sursee", date: "2026-03-21", cost: 51, kmSince: 268, odometer: 24878 },
    ],
  },
  {
    month: 3,
    events: [
      { kind: "tax", title: "Road tax 2026", date: "2026-04-08", cost: 186 },
      { kind: "refuel", title: "Avia Sarnen", date: "2026-04-19", cost: 44, kmSince: 230, odometer: 25108 },
    ],
  },
  {
    month: 4,
    events: [
      { kind: "insurance", title: "Alpenblick Versicherung AG", date: "2026-05-15", cost: 890 },
      { kind: "expense", title: "Alpine vignette", date: "2026-05-16", cost: 40, odometer: 25440 },
      { kind: "refuel", title: "Gotthard Nord", date: "2026-05-24", cost: 58, kmSince: 290, odometer: 25730 },
    ],
  },
  {
    month: 5,
    events: [
      { kind: "refuel", title: "Como", date: "2026-06-12", cost: 44.15, fxFrom: "€48.00", kmSince: 274, odometer: 26004 },
      { kind: "refuel", title: "Eni Bellinzona", date: "2026-06-13", cost: 52, kmSince: 188, odometer: 26192 },
      { kind: "trip", title: "Airolo → Andermatt", date: "2026-06-14", kmSince: 42, odometer: 26234 },
      { kind: "refuel", title: "Tankstelle Andermatt", date: "2026-06-14", cost: 47, kmSince: 156, odometer: 26390 },
      { kind: "refuel", title: "Agip Lugano", date: "2026-06-20", cost: 71, kmSince: 310, odometer: 26700 },
    ],
  },
  {
    month: 6,
    events: [
      { kind: "refuel", title: "Gotthard Nord", date: "2026-07-11", cost: 61.4, kmSince: 298, odometer: 27962 },
      { kind: "trip", title: "Luzern → Interlaken", date: "2026-07-28", kmSince: 186, odometer: 28148 },
      { kind: "expense", title: "Parkhaus Interlaken", date: "2026-07-28", cost: 19 },
    ],
  },
  {
    month: 7,
    events: [
      { kind: "expense", title: "Parkhaus Interlaken", date: "2026-08-02", cost: 18 },
      { kind: "refuel", title: "Avia Chur", date: "2026-08-18", cost: 54.2, kmSince: 312, odometer: 28460 },
    ],
  },
  {
    month: 8,
    events: [{ kind: "refuel", title: "Shell Luzern", date: "2026-09-09", cost: 49, kmSince: 248, odometer: 28708 }],
  },
  {
    month: 9,
    events: [
      { kind: "expense", title: "Winter kit", date: "2026-10-06", cost: 55, odometer: 28940 },
      { kind: "tax", title: "Parking permit", date: "2026-10-07", cost: 55 },
      { kind: "refuel", title: "Coop Pronto Emmen", date: "2026-10-22", cost: 52, kmSince: 261, odometer: 29201 },
    ],
  },
  {
    month: 10,
    events: [{ kind: "refuel", title: "Avia Sarnen", date: "2026-11-14", cost: 46, kmSince: 238, odometer: 29439 }],
  },
  {
    month: 11,
    events: [
      { kind: "refuel", title: "Shell Luzern", date: "2026-12-08", cost: 88, kmSince: 305, odometer: 29744 },
      { kind: "expense", title: "Car wash & wax", date: "2026-12-09", cost: 25 },
    ],
  },
];

export const MOCKUP_SPEND_BARS = [640, 210, 420, 310, 780, 520, 340, 290, 230, 320, 190, 260];
export const MOCKUP_FIXED_BARS = [28, 32, 30, 186, 28, 34, 28, 30, 28, 78, 28, 42];
export const MOCKUP_INSURANCE_BARS = [720, 180, 150, 165, 740, 190, 140, 155, 170, 185, 145, 200];

export const MOCKUP_SPEND_CATEGORIES: {
  kind: MockupEventKind;
  total: number;
  events: number;
  avg: number;
  vsLast?: number;
  share: number;
}[] = [
  { kind: "insurance", total: 1780, events: 2, avg: 890, vsLast: 6, share: 48 },
  { kind: "refuel", total: 1124, events: 14, avg: 80.29, vsLast: 12, share: 26 },
  { kind: "maintenance", total: 420, events: 1, avg: 420, vsLast: -8, share: 12 },
  { kind: "tax", total: 241, events: 2, avg: 120.5, vsLast: 4, share: 8 },
  { kind: "expense", total: 268, events: 5, avg: 53.6, vsLast: 18, share: 7 },
  { kind: "trip", total: 96, events: 2, avg: 48, share: 5 },
];

export const MOCKUP_FLEET: MockupVehicleCard[] = [
  { id: "pcx", photo: "/images/placeholders/scooter.png", make: "HONDA", model: "PCX 125", plate: "BE 11034", odometer: 6840 },
  { id: "rs", photo: "/images/placeholders/motorcycle.png", make: "APRILIA", model: "RS 660", plate: "LU 77320", odometer: 15420 },
  { id: "captur", photo: "/images/placeholders/car.png", make: "RENAULT", model: "Captur", plate: "VS 55108", odometer: 41200 },
  { id: "transit", photo: "/images/placeholders/van.png", make: "FORD", model: "Transit", plate: "SG 44120", odometer: 87340 },
  { id: "hymer", photo: "/images/placeholders/camper.png", make: "HYMER", model: "Free 600", plate: "GR 66401", odometer: 22180 },
  {
    id: "panigale",
    photo: "/images/placeholders/motorcycle.png",
    make: "DUCATI",
    model: "Panigale 1299s",
    plate: "ZH 48291",
    odometer: 28460,
    selected: true,
  },
];
