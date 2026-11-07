"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { brands, problems } from "@/lib/data";
import { getNextAvailableSlots } from "@/lib/booking-utils";
import { ArrowIcon, HeroSchematic } from "@/components/Graphics";
import { useBooking } from "@/components/BookingContext";

const modelsByBrand: Record<string, string[]> = {
  Audi: ["A3", "A4", "A6", "Q5"], BMW: ["3 Series", "5 Series", "X3", "X5"], "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE"], Volkswagen: ["Golf", "Passat", "Tiguan", "Touareg"], Toyota: ["Corolla", "Camry", "RAV4", "Avensis"], Škoda: ["Octavia", "Superb", "Kodiaq"], Volvo: ["V60", "V90", "XC60", "XC90"], Ford: ["Focus", "Mondeo", "Kuga"], Opel: ["Astra", "Insignia", "Grandland"], Other: ["Other model"],
};

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.hero;
  const [brand, setBrand] = useState("BMW");
  const [model, setModel] = useState("5 Series");
  const [problem, setProblem] = useState("diagnostics");
  const [slot, setSlot] = useState("");
  const [slotOptions, setSlotOptions] = useState<{ date: string; time: string }[]>([]);
  const { openBooking } = useBooking();
  const models = modelsByBrand[brand] ?? ["Other model"];

  useEffect(() => {
    const options = getNextAvailableSlots(4);
    setSlotOptions(options);
    if (options.length) setSlot(`${options[0].date}|${options[0].time}`);
  }, []);

  useEffect(() => {
    if (!models.includes(model)) setModel(models[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  const submit = () => {
    const [date, time] = slot.split("|");
    openBooking({ brand, model, service: problem, problem: problems[lang].find((item) => item.value === problem)?.label ?? "", date, time });
  };

  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" />{t.eyebrow}</div>
          <h1>{t.title}<br /><em>{t.accent}</em></h1>
          <p className="hero-description">{t.description}</p>
          <div className="hero-ctas">
            <button className="button button--primary button--large" type="button" onClick={() => openBooking()}>{t.primary}<ArrowIcon /></button>
            <a className="button button--line button--large" href={`/${lang}#estimator`}>{t.secondary}<ArrowIcon diagonal /></a>
          </div>
          <div className="hero-trust">
            <div><strong>12<span>+</span></strong><span>{t.trustOne}</span></div>
            <div><strong>24<span>MO</span></strong><span>{t.trustTwo}</span></div>
            <div><strong className="trust-bosch">BOSCH</strong><span>{t.trustThree}</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-meta"><span>APX / VEHICLE SYSTEMS</span><span>RIGA / LATVIA · LV-01</span></div>
          <HeroSchematic />
          <div className="hero-visual-tag"><span className="tag-square" /><div><strong>PRECISION FIRST</strong><small>DIAGNOSE · VERIFY · REPAIR</small></div></div>
          <span className="hero-visual-index">FIG. 01 — CHASSIS LAYOUT</span>
        </div>
        <div className="hero-booking-card">
          <div className="quick-card-heading"><div><span className="eyebrow"><span className="eyebrow-line" />{t.widgetLabel}</span><h2>{t.widgetTitle}</h2></div><span className="quick-card-step">01—04</span></div>
          <div className="quick-fields">
            <label className="field field--dark"><span>{t.brand}</span><select value={brand} onChange={(event) => setBrand(event.target.value)}>{brands.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="field field--dark"><span>{t.model}</span><select value={model} onChange={(event) => setModel(event.target.value)}>{models.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="field field--dark"><span>{t.problem}</span><select value={problem} onChange={(event) => setProblem(event.target.value)}>{problems[lang].map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <label className="field field--dark"><span>{t.slot}</span><select value={slot} onChange={(event) => setSlot(event.target.value)}>{slotOptions.map((item) => <option key={`${item.date}|${item.time}`} value={`${item.date}|${item.time}`}>{new Intl.DateTimeFormat(lang === "en" ? "en-GB" : lang === "ru" ? "ru-RU" : "lv-LV", { day: "2-digit", month: "short", timeZone: "Europe/Riga" }).format(new Date(`${item.date}T12:00:00`))} · {item.time}</option>)}</select></label>
          </div>
          <div className="quick-card-footer"><button className="button button--primary" type="button" onClick={submit} disabled={!slot}>{t.widgetCta}<ArrowIcon /></button><span>{t.widgetNote}</span></div>
        </div>
        <div className="hero-bottomline"><span>{dict.common.demo}</span><a href={`/${lang}#services`}>{t.scroll}<span>↓</span></a><span className="mono">{t.index}</span></div>
      </div>
    </section>
  );
}
