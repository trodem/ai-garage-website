"use client";

import { useEffect, useState } from "react";
import type { Icon as TablerIcon } from "@tabler/icons-react";
import {
  IconCamper,
  IconCar,
  IconCaravan,
  IconMoped,
  IconMotorbike,
  IconTractor,
  IconTruck,
  IconTruckDelivery,
} from "@tabler/icons-react";

const VEHICLE_ICONS: TablerIcon[] = [
  IconCar,
  IconTractor,
  IconMotorbike,
  IconMoped,
  IconTruckDelivery,
  IconTruck,
  IconCamper,
  IconCaravan,
];

const INTERVAL_MS = 2400;

type Props = {
  label: string;
  vehicles: string[];
};

export default function VehicleCarousel({ label, vehicles }: Props) {
  const count = Math.min(vehicles.length, VEHICLE_ICONS.length);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  return (
    <div className="mx-auto mt-16 max-w-5xl">
      <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
        {label}
      </p>

      <div
        className="vehicle-orbit"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="vehicle-orbit-stage" aria-live="polite">
          {vehicles.slice(0, count).map((item, index) => {
            const Icon = VEHICLE_ICONS[index] ?? IconCar;
            const offset = ((index - active + count) % count);
            // Map ring index so 0 = front, then left/right pairs
            const ring = offset > count / 2 ? offset - count : offset;
            const abs = Math.abs(ring);
            const isFront = ring === 0;
            const isSide = abs === 1;
            const isBack = abs > 1;

            return (
              <button
                key={item}
                type="button"
                className={`vehicle-orbit-card${isFront ? " is-front" : ""}${isSide ? " is-side" : ""}${isBack ? " is-back" : ""}`}
                style={{
                  ["--ring" as string]: ring,
                  ["--abs" as string]: abs,
                  ["--vehicle-i" as string]: index,
                }}
                aria-current={isFront ? "true" : undefined}
                aria-label={item}
                tabIndex={isFront || isSide ? 0 : -1}
                onClick={() => setActive(index)}
              >
                <span className="vehicle-orbit-chip" aria-hidden>
                  <Icon
                    className="vehicle-orbit-icon"
                    size={isFront ? 36 : isSide ? 30 : 24}
                    stroke={1.6}
                  />
                </span>
                <span className="vehicle-orbit-label">{item}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
