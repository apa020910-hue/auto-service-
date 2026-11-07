"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { AlignmentReport } from "@/components/Graphics";

export function Comparison({ dict }: { dict: Dictionary }) {
  const t = dict.comparison;
  const [split, setSplit] = useState(52);
  return (
    <section className="section comparison-section" id="precision">
      <div className="container comparison-container">
        <div className="comparison-copy">
          <p className="eyebrow"><span className="eyebrow-line" />{t.eyebrow}</p>
          <h2>{t.title}<br /><em>{t.accent}</em></h2>
          <p>{t.description}</p>
          <div className="comparison-key">
            <div><span className="key-line key-line--bad" /><span>{t.statusBad}</span><strong>+0° 24′</strong></div>
            <div><span className="key-line key-line--good" /><span>{t.statusGood}</span><strong>+0° 04′</strong></div>
          </div>
          <div className="comparison-foot"><span className="mono">3D / ALIGNMENT REPORT</span><span>PASS / FAIL</span></div>
        </div>
        <div className="comparison-visual">
          <div className="comparison-labels"><span>{t.before}</span><span>{t.after}</span></div>
          <div className="comparison-stage">
            <AlignmentReport />
            <div className="comparison-after" style={{ clipPath: `inset(0 0 0 ${split}%)` }}><AlignmentReport after /></div>
            <div className="comparison-divider" style={{ left: `${split}%` }}><span><i /><i /></span></div>
          </div>
          <div className="comparison-slider-row"><span>{t.drag}</span><input aria-label={t.drag} type="range" min="8" max="92" value={split} onChange={(event) => setSplit(Number(event.target.value))} /></div>
          <div className="comparison-measures">
            <div><span>{t.toe}</span><strong><b>+0° 24′</b><i>→</i><b className="good-number">+0° 04′</b></strong></div>
            <div><span>{t.camber}</span><strong><b>−1° 08′</b><i>→</i><b className="good-number">−0° 31′</b></strong></div>
          </div>
          <p className="comparison-note">{t.note}</p>
        </div>
      </div>
    </section>
  );
}
