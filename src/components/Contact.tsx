import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { site } from "@/lib/site";
import { EntrySchematic, ArrowIcon, PhoneIcon, PinIcon, ClockIcon } from "@/components/Graphics";

export function Contact({ dict }: { lang: Locale; dict: Dictionary }) {
  const t = dict.contact;
  const mapQuery = encodeURIComponent(site.address);
  const googleUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const wazeUrl = `https://www.waze.com/ul?q=${mapQuery}&navigate=yes`;
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-heading section-heading--split contact-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" />{t.eyebrow}</p><h2>{t.title}<br /><em>{t.accent}</em></h2></div>
          <p className="section-intro">{t.description}</p>
        </div>
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-info-block"><span className="contact-icon"><PinIcon /></span><div><small>{t.address}</small><strong>{site.address}</strong><span className="contact-meta">{t.gps}: {site.coordinates.lat.toFixed(4)}, {site.coordinates.lng.toFixed(4)}</span></div></div>
            <div className="contact-info-block"><span className="contact-icon"><PhoneIcon /></span><div><small>{t.phone}</small><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phoneDisplay}</a><span className="contact-meta">{site.email}</span></div></div>
            <div className="contact-info-block"><span className="contact-icon"><ClockIcon /></span><div><small>{t.hours}</small><strong>{t.weekdays} <span>{site.hours.weekdays}</span></strong><strong>{t.saturday} <span>{site.hours.saturday}</span></strong><strong>{t.sunday} <span>{dict.common.closed}</span></strong></div></div>
            <div className="contact-actions"><a href={googleUrl} className="button button--primary" target="_blank" rel="noreferrer">{t.directions}<ArrowIcon diagonal /></a><a href={wazeUrl} className="button button--line" target="_blank" rel="noreferrer">{t.waze}<ArrowIcon diagonal /></a></div>
            <p className="contact-parking-note">{t.parking}</p>
          </div>
          <div className="contact-map-panel">
            <div className="contact-map-top"><span className="eyebrow"><span className="eyebrow-line" />{t.entry}</span><span className="mono">APX / ARRIVAL 001</span></div>
            <EntrySchematic />
            <div className="contact-map-caption"><strong>{t.entryTitle}</strong><span>{t.entryNote}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
