"use client";

import { useEffect, useMemo, useState } from "react";
import type { BookingPrefill, BookingPayload, Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { services } from "@/lib/data";
import { addDaysToRigaDate, createCalendarFile, getFirstOpenDate, getOpenSlots, getRigaDateISO } from "@/lib/booking-utils";
import { ApexMark, ChevronIcon } from "@/components/Graphics";

const stepKeys = ["step1", "step2", "step3", "step4"] as const;

type BookingProps = {
  lang: Locale;
  dict: Dictionary;
  prefill: BookingPrefill;
  onClose: () => void;
};

export function Booking({ lang, dict, prefill, onClose }: BookingProps) {
  const t = dict.booking;
  const [step, setStep] = useState(0);
  const [service, setService] = useState(prefill.service ?? "diagnostics");
  const [symptoms, setSymptoms] = useState(prefill.problem ?? "");
  const [vehicle, setVehicle] = useState([prefill.brand, prefill.model].filter(Boolean).join(" "));
  const [plateOrVin, setPlateOrVin] = useState("");
  const [replacementCar, setReplacementCar] = useState(false);
  const [date, setDate] = useState(prefill.date ?? getFirstOpenDate());
  const [time, setTime] = useState(prefill.time ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<"demo" | "live" | null>(null);
  const [bookingId, setBookingId] = useState("");

  const slots = useMemo(() => getOpenSlots(date), [date]);
  const selectedService = services.find((item) => item.key === service) ?? services[3];
  const minDate = getRigaDateISO();
  const maxDate = addDaysToRigaDate(30);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSending) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isSending, onClose]);

  useEffect(() => {
    if (prefill.date) setDate(prefill.date);
    if (prefill.time) setTime(prefill.time);
    if (prefill.service) setService(prefill.service);
    if (prefill.problem) setSymptoms(prefill.problem);
    if (prefill.brand || prefill.model) setVehicle([prefill.brand, prefill.model].filter(Boolean).join(" "));
  }, [prefill]);

  useEffect(() => {
    if (time && !slots.includes(time)) setTime("");
  }, [date, slots, time]);

  const next = () => {
    setError("");
    if (step === 0 && (!service || !vehicle.trim())) {
      setError(dict.common.required);
      return;
    }
    if (step === 2 && (!date || !time || !slots.includes(time))) {
      setError(dict.common.required);
      return;
    }
    setStep((current) => Math.min(3, current + 1));
  };

  const submit = async () => {
    setError("");
    if (!name.trim() || !phone.trim() || !email.trim() || !consent) {
      setError(dict.common.required);
      return;
    }
    setIsSending(true);
    const payload: BookingPayload = {
      service,
      symptoms: symptoms.trim(),
      vehicle: vehicle.trim(),
      plateOrVin: plateOrVin.trim(),
      replacementCar,
      date,
      time,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      consent,
      website,
      locale: lang,
    };
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; mode?: "demo" | "webhook"; bookingId?: string; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error ?? t.submitError);
      setBookingId(result.bookingId ?? "");
      setSuccess(result.mode === "webhook" ? "live" : "demo");
    } catch (submitError) {
      setError(t.submitError);
    } finally {
      setIsSending(false);
    }
  };

  const downloadICS = () => {
    const content = createCalendarFile({ name, service: selectedService.title[lang], vehicle, date, time });
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `apex-serviss-${date}-${time.replace(":", "")}.ics`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="booking-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !isSending) onClose(); }}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <div className="booking-topline"><ApexMark /><span className="mono">{t.eyebrow}</span><button className="icon-button" type="button" onClick={onClose} aria-label={dict.common.close}>×</button></div>
        {success ? (
          <div className="booking-success">
            <div className="success-mark"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="m10 25 9 9L38 14" /></svg></div>
            <p className="eyebrow">{t.eyebrow} / {bookingId || "APX-REQUEST"}</p>
            <h2 id="booking-title">{t.successTitle}</h2>
            <p className="booking-success-copy">{success === "live" ? t.successLive : t.successText}</p>
            <div className="booking-summary">
              <div><span>{t.service}</span><strong>{selectedService.title[lang]}</strong></div>
              <div><span>{dict.contact.hours}</span><strong>{date} · {time}</strong></div>
              <div><span>{t.vehicle}</span><strong>{vehicle}</strong></div>
            </div>
            <button className="button button--primary button--wide" type="button" onClick={downloadICS}>{t.download}<ChevronIcon /></button>
            <button className="button button--text button--wide" type="button" onClick={onClose}>{t.done}</button>
          </div>
        ) : (
          <>
            <div className="booking-heading">
              <p className="eyebrow">{t.eyebrow}</p>
              <h2 id="booking-title">{t.title}</h2>
              <p>{t.subtitle}</p>
            </div>
            <div className="booking-progress" aria-label={`${dict.common.step} ${step + 1} / 4`}>
              {stepKeys.map((key, index) => (
                <div className={`booking-progress-item${index <= step ? " is-active" : ""}`} key={key}>
                  <span>{String(index + 1).padStart(2, "0")}</span><small>{t[key]}</small>
                </div>
              ))}
            </div>
            <div className="booking-content">
              {step === 0 && <div className="booking-fields">
                <label className="field"><span>{t.service} *</span><select value={service} onChange={(event) => setService(event.target.value)}>{services.map((item) => <option value={item.key} key={item.key}>{item.title[lang]}</option>)}</select></label>
                <label className="field"><span>{t.vehicle} *</span><input value={vehicle} onChange={(event) => setVehicle(event.target.value)} placeholder="BMW 530d, 2019" /></label>
                <label className="field"><span>{t.symptoms}</span><textarea value={symptoms} onChange={(event) => setSymptoms(event.target.value)} placeholder={t.symptomsPlaceholder} rows={3} maxLength={1200} /></label>
                <label className="field"><span>{t.plate}</span><input value={plateOrVin} onChange={(event) => setPlateOrVin(event.target.value)} placeholder={t.platePlaceholder} maxLength={32} /></label>
              </div>}
              {step === 1 && <div className="replacement-choice">
                <div className="choice-icon"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M5 24h30l-3-9a4 4 0 0 0-4-3H12a4 4 0 0 0-4 3l-3 9ZM8 24v7h24v-7M11 31v3M29 31v3M8 24l3-5h18l3 5" /><circle cx="11" cy="26" r="1.5" /><circle cx="29" cy="26" r="1.5" /></svg></div>
                <div><h3>{t.replacementTitle}</h3><p>{t.replacementText}</p></div>
                <div className="choice-buttons">
                  <button type="button" className={`choice-button${replacementCar ? " is-selected" : ""}`} onClick={() => setReplacementCar(true)}><span className="choice-dot" />{t.yes}</button>
                  <button type="button" className={`choice-button${!replacementCar ? " is-selected" : ""}`} onClick={() => setReplacementCar(false)}><span className="choice-dot" />{t.no}</button>
                </div>
              </div>}
              {step === 2 && <div className="booking-fields">
                <label className="field"><span>{t.date} *</span><input type="date" value={date} min={minDate} max={maxDate} onChange={(event) => { setDate(event.target.value); setTime(""); }} /></label>
                <div className="field"><span>{t.time} *</span>
                  {slots.length ? <div className="time-slots">{slots.map((slot) => <button type="button" key={slot} className={`time-slot${time === slot ? " is-selected" : ""}`} onClick={() => setTime(slot)}>{slot}</button>)}</div> : <p className="field-hint">{t.noSlots}</p>}
                </div>
                <div className="booking-hours-note"><span className="status-dot" />{dict.contact.weekdays}: 08:00–19:00 <i /> {dict.contact.saturday}: 09:00–16:00</div>
              </div>}
              {step === 3 && <div className="booking-fields">
                <label className="field"><span>{t.name} *</span><input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} /></label>
                <label className="field"><span>{t.phone} *</span><input autoComplete="tel" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={40} placeholder="+371 …" /></label>
                <label className="field"><span>{t.email} *</span><input autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={160} placeholder="name@example.com" /></label>
                <label className="consent-line"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>{t.consent}</span></label>
                <p className="field-hint">{t.privacy}</p>
                <label className="honeypot" aria-hidden="true">Company website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
              </div>}
              {error && <p className="form-error" role="alert">{error}</p>}
            </div>
            <div className="booking-footer">
              {step > 0 ? <button className="button button--ghost" type="button" onClick={() => { setError(""); setStep((current) => current - 1); }}><ChevronIcon direction="left" />{dict.common.back}</button> : <span className="booking-privacy-mark">APEX / RIGA</span>}
              {step < 3 ? <button className="button button--primary" type="button" onClick={next}>{dict.common.next}<ChevronIcon /></button> : <button className="button button--primary" type="button" onClick={submit} disabled={isSending}>{isSending ? "…" : dict.common.send}<ChevronIcon /></button>}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
