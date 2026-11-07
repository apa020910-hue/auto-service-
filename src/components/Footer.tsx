import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { site } from "@/lib/site";
import { ApexMark, ArrowIcon } from "@/components/Graphics";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand"><a href={`/${lang}`}><ApexMark /></a><p>{dict.footer.statement}</p></div>
        <div className="footer-nav"><span className="mono">EXPLORE</span><a href={`/${lang}#services`}>{dict.nav.services}</a><a href={`/${lang}#estimator`}>{dict.nav.estimator}</a><a href={`/${lang}#precision`}>{dict.nav.process}</a><a href={`/${lang}#contact`}>{dict.nav.contact}</a></div>
        <div className="footer-contact"><span className="mono">CONTACT / RIGA</span><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phoneDisplay}</a><a href={`mailto:${site.email}`}>{site.email}</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`} target="_blank" rel="noreferrer">{site.address}<ArrowIcon diagonal /></a></div>
        <div className="footer-stamp"><span>APX</span><small>ENGINEERED<br />WITH CARE</small></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {site.name}. {dict.footer.rights}</span><span>{dict.footer.legal}</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  );
}
