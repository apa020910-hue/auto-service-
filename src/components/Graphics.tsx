import type { ReactNode } from "react";
import type { ServiceKey } from "@/lib/types";

export function ApexMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark${compact ? " brand-mark--compact" : ""}`} aria-label="APEX Auto Motors">
      <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
        <path d="M5 37.5 20.5 8h7L43 37.5h-8L24 16.6 13 37.5H5Z" fill="currentColor" />
        <path d="M16.3 29.8h15.4l3.4 6.4H13l3.3-6.4Z" fill="#ff5a26" />
        <path d="M21.1 23.1h5.8l3.4 6.7h-12.5l3.3-6.7Z" fill="#111513" />
      </svg>
      {!compact && <span className="brand-wordmark"><strong>APEX</strong><small>AUTO MOTORS</small></span>}
    </span>
  );
}

export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 16 16 4M6 4h10v10" /></svg>
  ) : (
    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M10 4l6 6-6 6" /></svg>
  );
}

export function ChevronIcon({ direction = "right" }: { direction?: "left" | "right" | "down" }) {
  const transform = direction === "left" ? "rotate(180 10 10)" : direction === "down" ? "rotate(90 10 10)" : undefined;
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path transform={transform} d="m7 4 6 6-6 6" /></svg>;
}

export function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.8 9.5 3l2 4.7-2.1 1.7a15 15 0 0 0 5.2 5.2l1.7-2.1 4.7 2-.8 2.9a2.5 2.5 0 0 1-2.7 1.8C10 18.3 5.7 14 4.8 6.5a2.5 2.5 0 0 1 1.8-2.7Z" /></svg>;
}

export function PinIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></svg>;
}

export function ClockIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.2 2" /></svg>;
}

export function HeroSchematic() {
  return (
    <svg className="hero-schematic" viewBox="0 0 720 640" fill="none" aria-label="Technical top view drawing of a performance vehicle">
      <defs>
        <pattern id="hero-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" stroke="currentColor" strokeOpacity=".11" strokeWidth="1" /></pattern>
        <linearGradient id="car-shell" x1="250" y1="110" x2="470" y2="530" gradientUnits="userSpaceOnUse"><stop stopColor="#e2e5df" stopOpacity=".15" /><stop offset="1" stopColor="#e2e5df" stopOpacity=".015" /></linearGradient>
      </defs>
      <rect width="720" height="640" fill="url(#hero-grid)" />
      <g stroke="currentColor" strokeOpacity=".28" strokeWidth="1.2">
        <path d="M42 70h94M42 70v94M678 70h-94M678 70v94M42 570h94M42 570v-94M678 570h-94M678 570v-94" />
        <circle cx="360" cy="320" r="246" strokeDasharray="3 8" />
        <circle cx="360" cy="320" r="190" strokeDasharray="1 7" />
        <path d="M360 24v76M360 540v76M64 320h76M580 320h76" />
      </g>
      <g stroke="#ff5a26" strokeOpacity=".75" strokeWidth="1.3">
        <path d="M360 70v62M360 508v62M90 320h64M566 320h64" strokeDasharray="4 5" />
        <path d="M118 154 208 210M602 154l-90 56M118 486l90-56M602 486l-90-56" />
      </g>
      <g>
        <path d="M295 82c-18 0-34 12-40 29l-29 83-42 76c-9 17-14 36-14 56v90c0 19 6 37 17 52l41 57c10 14 27 22 44 22h176c17 0 34-8 44-22l41-57c11-15 17-33 17-52v-90c0-20-5-39-14-56l-42-76-29-83c-6-17-22-29-40-29H295Z" fill="url(#car-shell)" stroke="#d8ddd7" strokeOpacity=".52" strokeWidth="1.5" />
        <path d="M285 123h150l29 79H256l29-79Z" fill="#9da69e" fillOpacity=".08" stroke="#d8ddd7" strokeOpacity=".45" />
        <path d="m246 220-28 61v114l29 53h226l29-53V281l-28-61H246Z" stroke="#d8ddd7" strokeOpacity=".42" />
        <path d="M256 228h208v42H256zM256 397h208v42H256z" stroke="#d8ddd7" strokeOpacity=".36" />
        <path d="M282 279h156v111H282z" stroke="#d8ddd7" strokeOpacity=".42" />
        <path d="M282 279 360 304l78-25M282 390l78-27 78 27" stroke="#d8ddd7" strokeOpacity=".32" />
        <path d="M248 205h-50v22h50M472 205h50v22h-50M228 439h-30v22h30M492 439h30v22h-30" stroke="#d8ddd7" strokeOpacity=".48" />
        <path d="M239 166h-20v40h20M481 166h20v40h-20M238 434h-20v40h20M482 434h20v40h-20" fill="#202622" stroke="#d8ddd7" strokeOpacity=".5" />
        <path d="M304 99h112M280 480h160" stroke="#ff5a26" strokeWidth="2" />
        <path d="M322 147h76M301 459h118" stroke="#d8ddd7" strokeOpacity=".25" />
        <circle cx="360" cy="320" r="8" fill="#ff5a26" />
        <circle cx="360" cy="320" r="20" stroke="#ff5a26" strokeOpacity=".8" strokeDasharray="2 4" />
      </g>
      <g fill="#ff5a26" fontFamily="monospace" fontSize="10" letterSpacing="2">
        <text x="56" y="54">APX / CHASSIS SCAN</text><text x="560" y="54">TOP VIEW · 01</text><text x="56" y="606">DATUM 00.00</text><text x="556" y="606">RIGA / LV</text>
      </g>
      <g stroke="#ff5a26" strokeOpacity=".7"><path d="M150 98h70M150 98v24M570 518h-70M570 518v-24" /></g>
    </svg>
  );
}

const servicePaths: Record<ServiceKey, ReactNode> = {
  oil: <><path d="M7 5h7v4l3 3v7H6v-7l3-3V5Z" /><path d="M9 5V3h3v2M9 14h5" /></>,
  brakes: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3" /><path d="M16 4.8 18 3l2 2-1.8 2M4.5 16.5l-2 2" /></>,
  suspension: <><path d="M5 3v4l3 2-3 2 3 2-3 2v6M19 3v4l-3 2 3 2-3 2 3 2v6M8 12h8" /><path d="M10 9v6M14 9v6" /></>,
  diagnostics: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 9h8M8 13h4M8 17h2M16 13v4" /></>,
  alignment: <><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5v17M3.5 12h17M6 6l12 12M18 6 6 18" /></>,
  ac: <><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9 5l3 2 3-2M9 19l3-2 3 2" /></>,
  battery: <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M8 7V5h8v2M12 10v6M9 13h6" /></>,
  inspection: <><path d="m5 12 4 4L19 6" /><circle cx="12" cy="12" r="9" /></>,
};

export function ServiceGlyph({ service, className = "" }: { service: ServiceKey; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {servicePaths[service]}
    </svg>
  );
}

export function AlignmentReport({ after = false }: { after?: boolean }) {
  const lineColor = after ? "#9ed0a5" : "#ff6840";
  return (
    <svg viewBox="0 0 560 310" className="alignment-report" fill="none" aria-hidden="true">
      <defs><pattern id={after ? "report-grid-after" : "report-grid-before"} width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" stroke="#fff" strokeOpacity=".07" /></pattern></defs>
      <rect width="560" height="310" fill="#151b18" />
      <rect width="560" height="310" fill={`url(#${after ? "report-grid-after" : "report-grid-before"})`} />
      <path d="M50 50h460M50 260h460M90 35v240M470 35v240" stroke="#aab5ad" strokeOpacity=".16" />
      <g stroke="#e7ece6" strokeOpacity=".55" strokeWidth="8" strokeLinecap="round">
        <path d="M180 69v172M380 69v172" />
      </g>
      <g stroke={lineColor} strokeWidth="2.4" strokeLinecap="round">
        <path d={after ? "M180 69v172M380 69v172" : "M161 69l19 172M399 69l-19 172"} />
        <path d={after ? "M160 154h240" : "M160 154l240-16"} strokeDasharray="6 5" />
      </g>
      <g fill="#e7ece6" fontFamily="monospace" fontSize="11">
        <text x="50" y="25">FRONT AXLE / 3D MEASUREMENT</text>
        <text x="50" y="291">TOE</text><text x="270" y="291">CAMBER</text><text x="470" y="291">DEG</text>
      </g>
      <g fill={lineColor} fontFamily="monospace" fontSize="13" fontWeight="bold">
        <text x="405" y="96">{after ? "+0° 04′" : "+0° 24′"}</text>
        <text x="405" y="218">{after ? "−0° 31′" : "−1° 08′"}</text>
      </g>
      <g stroke={lineColor} strokeWidth="1.4"><path d={after ? "M390 92h10M390 214h10" : "M390 92h10M390 214h10"} /></g>
    </svg>
  );
}

export function EntrySchematic() {
  return (
    <svg viewBox="0 0 640 360" className="entry-schematic" fill="none" role="img" aria-label="Illustrative workshop entrance and parking plan">
      <defs><pattern id="entry-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#87948b" fillOpacity=".3" /></pattern></defs>
      <rect width="640" height="360" fill="#171d19" /><rect width="640" height="360" fill="url(#entry-dots)" />
      <path d="M0 270h640" stroke="#859188" strokeOpacity=".35" strokeDasharray="4 7" />
      <path d="M0 296h640M0 318h640" stroke="#859188" strokeOpacity=".2" />
      <rect x="48" y="48" width="250" height="172" rx="3" stroke="#aab6ad" strokeOpacity=".55" strokeWidth="1.5" />
      <path d="M48 85h250M90 48v172M260 48v172" stroke="#aab6ad" strokeOpacity=".24" />
      <text x="68" y="74" fill="#dce4dc" fontSize="11" fontFamily="monospace" letterSpacing="2">APEX / WORKSHOP</text>
      <path d="M118 151h110M173 99v104" stroke="#ff5a26" strokeWidth="2" />
      <path d="M164 194 173 204l9-10" stroke="#ff5a26" strokeWidth="2" />
      <rect x="357" y="62" width="220" height="120" rx="2" stroke="#aab6ad" strokeOpacity=".4" />
      <path d="M375 80h184M375 164h184M405 62v120M529 62v120" stroke="#aab6ad" strokeOpacity=".2" />
      <g stroke="#dce4dc" strokeOpacity=".65" fill="#252e28">
        <rect x="385" y="92" width="48" height="60" rx="5" /><rect x="450" y="92" width="48" height="60" rx="5" /><rect x="515" y="92" width="48" height="60" rx="5" />
      </g>
      <path d="M325 182v64" stroke="#ff5a26" strokeWidth="2" strokeDasharray="5 5" />
      <path d="m317 236 8 10 8-10" stroke="#ff5a26" strokeWidth="2" />
      <path d="M298 248h67" stroke="#ff5a26" strokeWidth="3" />
      <g fill="#e8eee8" fontFamily="monospace" fontSize="10" letterSpacing="1.3">
        <text x="48" y="32">01 / RECEPTION</text><text x="357" y="44">02 / CUSTOMER PARKING</text><text x="48" y="342">ENTRY ROAD</text>
      </g>
      <g fill="#ff5a26" fontFamily="monospace" fontSize="10"><text x="302" y="282">GATE</text><text x="302" y="296">↓</text></g>
      <path d="M270 246h110" stroke="#ff5a26" strokeWidth="1.5" />
    </svg>
  );
}
