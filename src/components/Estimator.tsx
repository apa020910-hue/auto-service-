"use client";

import { useMemo, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { AddonKey, Locale, ServiceKey, VehicleClass } from "@/lib/types";
import { calculateEstimate } from "@/lib/estimator";
import { services } from "@/lib/data";
import { ArrowIcon, ServiceGlyph } from "@/components/Graphics";
import { useBooking } from "@/components/BookingContext";

const money = (amount: number) => new Intl.NumberFormat("lv-LV", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

export function Estimator({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.estimator;
  const [service, setService] = useState<ServiceKey>("oil");
  const [vehicle, setVehicle] = useState<VehicleClass>("sedan");
  const [addons, setAddons] = useState<AddonKey[]>([]);
  const estimate = useMemo(() => calculateEstimate(service, vehicle, addons), [service, vehicle, addons]);
  const { openBooking } = useBooking();
  const selectedService = services.find((item) => item.key === service)!;

  const toggleAddon = (key: AddonKey) => setAddons((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  const range = (value: { low: number; high: number }) => `${money(value.low)} – ${money(value.high)}`;

  return (
    <section className="section estimator-section" id="estimator">
      <div className="container estimator-container">
        <div className="estimator-intro">
          <p className="eyebrow"><span className="eyebrow-line" />{t.eyebrow}</p>
          <h2>{t.title}<br /><em>{t.accent}</em></h2>
          <p>{t.description}</p>
          <div className="estimator-serial"><span className="mono">APX / COST MATRIX</span><span className="serial-line" /><span className="mono">EUR · 2026</span></div>
        </div>
        <div className="estimator-panel">
          <div className="estimator-controls">
            <div className="estimator-control-heading"><span className="mono">01—03 / CONFIGURE</span><span className="estimator-live"><i /> LIVE ESTIMATE</span></div>
            <label className="field"><span>{t.service}</span><select value={service} onChange={(event) => setService(event.target.value as ServiceKey)}>{services.map((item) => <option key={item.key} value={item.key}>{item.title[lang]}</option>)}</select></label>
            <div className="field"><span>{t.vehicle}</span>
              <div className="vehicle-grid">
                {(["compact", "sedan", "suv", "van"] as VehicleClass[]).map((type) => <button key={type} className={`vehicle-option${vehicle === type ? " is-selected" : ""}`} type="button" onClick={() => setVehicle(type)}>
                  <svg viewBox="0 0 48 26" aria-hidden="true"><path d={type === "suv" || type === "van" ? "M5 17 8 8h28l6 9v5H5zM14 8l3-5h13l5 5" : "M5 17 10 9h26l6 8v5H5zM15 9l4-5h10l5 5"} /><circle cx="13" cy="22" r="2" /><circle cx="35" cy="22" r="2" /></svg>
                  <span>{t[type]}</span><i />
                </button>)}
              </div>
            </div>
            <div className="field addons-field"><span>{t.addons}</span>
              <label className="addon-option"><input type="checkbox" checked={addons.includes("csdd")} onChange={() => toggleAddon("csdd")} /><span className="addon-check" /><span>{t.csdd}</span><small>+€29</small></label>
              <label className="addon-option"><input type="checkbox" checked={addons.includes("acRefill")} onChange={() => toggleAddon("acRefill")} /><span className="addon-check" /><span>{t.acRefill}</span><small>+€59</small></label>
              <label className="addon-option"><input type="checkbox" checked={addons.includes("replacementCar")} onChange={() => toggleAddon("replacementCar")} /><span className="addon-check" /><span>{t.replacementCar}</span><small>+€25</small></label>
            </div>
          </div>
          <div className="estimator-result">
            <div className="result-heading"><div><span className="mono">02—03 / COST BREAKDOWN</span><h3>{t.estimate}</h3></div><div className="result-symbol"><ServiceGlyph service={service} /></div></div>
            <div className="result-selected"><span>{selectedService.title[lang]}</span><span>{vehicle.toUpperCase()}</span></div>
            <div className="result-lines">
              <div><span>{t.labor}</span><strong>{range(estimate.labor)}</strong></div>
              <div><span>{t.materials}</span><strong>{range(estimate.materials)}</strong></div>
              <div><span>{t.extras}</span><strong>{estimate.extras.high ? range(estimate.extras) : "—"}</strong></div>
            </div>
            <div className="result-total"><span>{t.total}</span><strong><small>{money(estimate.total.low)} –</small>{money(estimate.total.high)}</strong></div>
            <button className="button button--primary button--wide" type="button" onClick={() => openBooking({ service })}>{t.lock}<ArrowIcon /></button>
            <p className="result-fineprint">{t.fineprint}</p>
            <div className="result-footnote"><span className="mono">APX / ESTIMATOR v1.0</span><span>VAT INCLUDED</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
