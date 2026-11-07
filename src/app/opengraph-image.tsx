import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "APEX AUTO MOTORS — Precision Automotive Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#111713", color: "#e8eee7", padding: "58px 66px", position: "relative", fontFamily: "Arial, sans-serif" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18, zIndex: 1 }}>
          <svg width="58" height="58" viewBox="0 0 48 48"><path d="M5 37.5 20.5 8h7L43 37.5h-8L24 16.6 13 37.5H5Z" fill="#e8eee7" /><path d="M16.3 29.8h15.4l3.4 6.4H13l3.3-6.4Z" fill="#ff5a26" /></svg>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4 }}>APEX</span>
            <span style={{ marginTop: 6, fontSize: 11, letterSpacing: 3, color: "#8d998f" }}>AUTO MOTORS</span>
          </div>
          <div style={{ marginLeft: "auto", border: "1px solid #526056", padding: "9px 13px", color: "#ff7449", fontSize: 12, letterSpacing: 2 }}>RIGA / LV</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, zIndex: 1 }}>
          <div style={{ width: 60, height: 3, background: "#ff5a26" }} />
          <div style={{ fontSize: 69, fontWeight: 600, letterSpacing: -4, lineHeight: 1.02 }}>Precision service.<br /><span style={{ color: "#ff5a26" }}>No guesswork.</span></div>
          <div style={{ color: "#9da99f", fontSize: 20, letterSpacing: 1 }}>DIAGNOSTICS · REPAIR · 3D ALIGNMENT</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #344038", paddingTop: 17, zIndex: 1, color: "#77847a", fontSize: 12, letterSpacing: 2 }}>
          <span>ENGINEERED WITH CARE</span><span>APEXAUTOMOTORS.LV</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
