"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ApexMark, PhoneIcon, PinIcon } from "@/components/Graphics";
import { useBooking } from "@/components/BookingContext";

function getWorkshopStatus() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Riga", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const data = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const day = data.weekday;
  const minutes = Number(data.hour) * 60 + Number(data.minute);
  if (day === "Sun") return { open: false, until: "" };
  if (day === "Sat") return { open: minutes >= 9 * 60 && minutes < 16 * 60, until: "16:00" };
  return { open: minutes >= 8 * 60 && minutes < 19 * 60, until: "19:00" };
}

const languages: { key: Locale; label: string }[] = [
  { key: "lv", label: "LV" }, { key: "ru", label: "RU" }, { key: "en", label: "EN" },
];

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [status, setStatus] = useState<{ open: boolean; until: string } | null>(null);
  const { openBooking } = useBooking();

  useEffect(() => {
    const update = () => setStatus(getWorkshopStatus());
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const navItems = [
    ["services", `/${lang}#services`], ["estimator", `/${lang}#estimator`], ["process", `/${lang}#precision`], ["reviews", `/${lang}#reviews`], ["contact", `/${lang}#contact`],
  ] as const;

  const changeLanguage = (nextLang: Locale) => {
    const currentPath = window.location.pathname.replace(/^\/(lv|ru|en)(?=\/|$)/, "");
    window.location.href = `/${nextLang}${currentPath || ""}${window.location.hash}`;
  };

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-status"><i className={`status-dot${status?.open ? " is-open" : ""}`} />{status ? status.open ? `${dict.common.openNow} · ${dict.common.openUntil} ${status.until}` : dict.common.closed : dict.common.today}</span>
          <div className="topbar-links">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}><PhoneIcon />{site.phoneDisplay}</a>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`} target="_blank" rel="noreferrer"><PinIcon />{dict.common.address}</a>
          </div>
          <div className="topbar-languages" aria-label="Language">
            {languages.map((item) => <button key={item.key} type="button" className={lang === item.key ? "is-active" : ""} onClick={() => changeLanguage(item.key)} aria-pressed={lang === item.key}>{item.label}</button>)}
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <a href={`/${lang}`} className="brand-link" aria-label="APEX AUTO MOTORS home"><ApexMark /></a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([key, href]) => <a href={href} key={key}>{dict.nav[key]}</a>)}
          </nav>
          <div className="header-actions">
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="header-phone" aria-label={dict.common.call}><PhoneIcon /></a>
            <button className="button button--primary header-book" type="button" onClick={() => openBooking()}>{dict.common.book}<span className="button-arrow">↗</span></button>
            <button className={`menu-toggle${mobileOpen ? " is-open" : ""}`} type="button" aria-label={mobileOpen ? dict.common.close : "Open menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}><span /><span /></button>
          </div>
        </div>
      </header>
      {mobileOpen && <div className="mobile-drawer">
        <div className="mobile-drawer-head"><ApexMark /><button className="icon-button" onClick={() => setMobileOpen(false)} type="button" aria-label={dict.common.close}>×</button></div>
        <nav>{navItems.map(([key, href], index) => <a key={key} href={href} onClick={() => setMobileOpen(false)}><span>0{index + 1}</span>{dict.nav[key]}</a>)}</nav>
        <div className="mobile-language">{languages.map((item) => <button key={item.key} type="button" className={lang === item.key ? "is-active" : ""} onClick={() => changeLanguage(item.key)}>{item.label}</button>)}</div>
        <button className="button button--primary button--wide" type="button" onClick={() => { setMobileOpen(false); openBooking(); }}>{dict.common.book}<span className="button-arrow">↗</span></button>
        <a className="mobile-drawer-phone" href={`tel:${site.phone.replace(/\s/g, "")}`}><PhoneIcon />{site.phoneDisplay}</a>
      </div>}
    </>
  );
}
