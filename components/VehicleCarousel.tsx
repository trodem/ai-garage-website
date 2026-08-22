"use client";

import { useEffect, useState } from "react";
import type { Icon as TablerIcon } from "@tabler/icons-react";
import {
  IconBike,
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
  IconBike,
];

const INTERVAL_MS = 2400;
const COPIES = 3;

type Props = {
  label: string;
  vehicles: string[];
};

export default function VehicleCarousel({ label, vehicles }: Props) {
  const count = Math.min(vehicles.length, VEHICLE_ICONS.length);
  const items = vehicles.slice(0, count);
  const [offset, setOffset] = useState(count * 2);
  const [paused, setPaused] = useState(false);
  const [instant, setInstant] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || count < 2) return;
    const id = window.setInterval(() => {
      setOffset((current) => current - 1);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, count]);

  useEffect(() => {
    if (count < 2) return;
    if (offset >= count && offset <= count * 2) return;

    const id = window.setTimeout(() => {
      setInstant(true);
      setOffset((current) => {
        if (current < count) return current + count;
        if (current > count * 2) return current - count;
        return current;
      });
    }, 440);

    return () => window.clearTimeout(id);
  }, [offset, count]);

  useEffect(() => {
    if (!instant) return;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setInstant(false));
    });
    return () => window.cancelAnimationFrame(id);
  }, [instant]);

  return (
    <div className="mx-auto mt-16 w-full">
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
        <div
          className={instant ? "vehicle-orbit-stage is-instant" : "vehicle-orbit-stage"}
          aria-live="polite"
        >
          {Array.from({ length: count * COPIES }, (_, global) => {
            const index = global % count;
            const item = items[index];
            if (!item) return null;
            const Icon = VEHICLE_ICONS[index] ?? IconCar;
            const ring = global - offset;
            const abs = Math.abs(ring);
            const isFront = ring === 0;
            const offstage = abs > 5;

            return (
              <button
                key={`${global}-${item}`}
                type="button"
                className={["vehicle-orbit-card", isFront ? "is-front" : ""]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  ["--ring" as string]: ring,
                  ["--vehicle-i" as string]: index,
                }}
                tabIndex={offstage ? -1 : 0}
                aria-hidden={offstage ? true : undefined}
                aria-current={isFront ? "true" : undefined}
                aria-label={item}
                onClick={() => setOffset(global)}
              >
                <span className="vehicle-orbit-chip" aria-hidden>
                  <Icon
                    className="vehicle-orbit-icon"
                    size={isFront ? 36 : 26}
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
