"use client";

import { useId } from "react";

type PhoneMockupGarIqLoaderProps = {
  size?: number;
  spinning?: boolean;
};

const OUTER = "#211EE5";
const INNER = "#08A7DE";
const ACCENT = "#ED177B";

export default function PhoneMockupGarIqLoader({
  size = 96,
  spinning = true,
}: PhoneMockupGarIqLoaderProps) {
  const idBase = useId().replace(/:/g, "");
  const outerMaskId = `pm-scan-loader-outer-${idBase}`;
  const innerMaskId = `pm-scan-loader-inner-${idBase}`;

  return (
    <div className="pm-scan-loader" style={{ width: size, height: size }} aria-hidden>
      <svg
        className="pm-scan-loader-mark"
        width={size}
        height={size}
        viewBox="-80 -80 660 660"
        aria-hidden
      >
        <defs>
          <mask id={outerMaskId}>
            <rect x="-80" y="-80" width="660" height="660" fill="white" />
            <rect
              x="380"
              y="226"
              width="120"
              height="45"
              fill="black"
              transform="rotate(45 250 250)"
            />
          </mask>
          <mask id={innerMaskId}>
            <rect x="-80" y="-80" width="660" height="660" fill="white" />
            <rect x="231" y="0" width="40" height="180" fill="black" />
            <rect
              x="200"
              y="130"
              width="40"
              height="180"
              fill="black"
              transform="rotate(90 250 250)"
            />
            <rect
              x="380"
              y="226"
              width="120"
              height="45"
              fill="black"
              transform="rotate(45 250 250)"
            />
          </mask>
        </defs>
        <circle
          cx="250"
          cy="250"
          r="165"
          fill="none"
          stroke={OUTER}
          strokeWidth="44"
          mask={`url(#${outerMaskId})`}
        />
        <circle
          cx="250"
          cy="250"
          r="105"
          fill="none"
          stroke={INNER}
          strokeWidth="32"
          mask={`url(#${innerMaskId})`}
        />
        <rect
          x="235"
          y="130"
          width="30"
          height="90"
          fill={INNER}
          transform="rotate(90 250 250)"
        />
        <rect
          x="392"
          y="231"
          width="44"
          height="35"
          fill={ACCENT}
          transform="rotate(45 250 250)"
        />
      </svg>
      <div className={spinning ? "pm-scan-loader-orbit is-spinning" : "pm-scan-loader-orbit"}>
        <svg width={size} height={size} viewBox="-80 -80 660 660" aria-hidden>
          <circle cx="250" cy="85" r="25" fill={ACCENT} />
        </svg>
      </div>
    </div>
  );
}
