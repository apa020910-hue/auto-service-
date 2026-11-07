"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { services } from "@/lib/data";
import { ServiceGlyph, ArrowIcon, ChevronIcon } from "@/components/Graphics";
import { useBooking } from "@/components/BookingContext";

export function Services({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.services;
  const [expanded, setExpanded] = useState<string | null>("diagnostics");
  const { openBooking } = useBooking();

  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div><p className="eyebrow"><span className="eyebrow-line" />{t.eyebrow}</p><h2>{t.title}<br /><em>{t.accent}</em></h2></div>
          <p className="section-intro">{t.description}</p>
        </div>
        <div className="services-directory">
          {services.map((service) => {
            const isExpanded = expanded === service.key;
            return (
              <article className={`service-row${isExpanded ? " is-expanded" : ""}`} key={service.key}>
                <button className="service-row-main" type="button" aria-expanded={isExpanded} onClick={() => setExpanded(isExpanded ? null : service.key)}>
                  <span className="service-number mono">{service.number}</span>
                  <span className="service-symbol"><ServiceGlyph service={service.key} /></span>
                  <span className="service-name-block"><strong>{service.title[lang]}</strong><small>{service.short[lang]}</small></span>
                  <span className="service-price"><small>{dict.common.from}</small><strong>€{service.price}</strong></span>
                  <span className="service-duration mono">{service.duration[lang]}</span>
                  <span className="service-expand"><ChevronIcon direction={isExpanded ? "down" : "right"} /></span>
                </button>
                {isExpanded && <div className="service-detail">
                  <div><span className="detail-label">{t.included}</span><ul>{service.included[lang].map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div className="service-detail-meta"><div><span className="detail-label">{t.duration}</span><strong>{service.duration[lang]}</strong></div><div><span className="detail-label">{t.warranty}</span><strong>{service.warranty[lang]}</strong></div><button type="button" className="button button--line" onClick={() => openBooking({ service: service.key })}>{dict.common.book}<ArrowIcon /></button></div>
                </div>}
              </article>
            );
          })}
        </div>
        <div className="service-directory-footer"><span className="mono">08 / SERVICE CATEGORIES</span><span>APEX AUTO MOTORS <i>—</i> RIGA</span></div>
      </div>
    </section>
  );
}
