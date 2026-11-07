import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingProvider } from "@/components/BookingContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Estimator } from "@/components/Estimator";
import { Comparison } from "@/components/Comparison";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { MobileBar } from "@/components/MobileBar";
import { Footer } from "@/components/Footer";
import { dictionaries, isLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = dictionaries[lang];
  const canonical = `${site.url}/${lang}`;
  return {
    title: dict.metaTitle,
    description: dict.metaDescription,
    metadataBase: new URL(site.url),
    alternates: {
      canonical,
      languages: { lv: "/lv", ru: "/ru", en: "/en", "x-default": "/lv" },
    },
    openGraph: {
      title: dict.metaTitle,
      description: dict.metaDescription,
      url: canonical,
      siteName: site.name,
      locale: lang === "lv" ? "lv_LV" : lang === "ru" ? "ru_RU" : "en_GB",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "APEX AUTO MOTORS — Precision Automotive Service" }],
    },
    twitter: { card: "summary_large_image", title: dict.metaTitle, description: dict.metaDescription },
  };
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;
  const dict = dictionaries[lang];
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: site.name,
    alternateName: site.shortName,
    description: dict.metaDescription,
    url: `${site.url}/${lang}`,
    telephone: site.phone,
    email: site.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.addressLocality,
      postalCode: site.postalCode,
      addressCountry: site.country,
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "16:00" },
    ],
  };

  return (
    <BookingProvider lang={lang} dict={dict}>
      <div id="top" />
      <Header lang={lang} dict={dict} />
      <main>
        <Hero lang={lang} dict={dict} />
        <div className="signal-strip"><div className="container signal-strip-inner"><span>DIAGNOSE WITH DATA</span><i /> <span>REPAIR WITH PURPOSE</span><i /> <span>VERIFY THE RESULT</span><b>APEX / RIGA</b></div></div>
        <Services lang={lang} dict={dict} />
        <Estimator lang={lang} dict={dict} />
        <Comparison dict={dict} />
        <Reviews lang={lang} dict={dict} />
        <Contact lang={lang} dict={dict} />
      </main>
      <Footer lang={lang} dict={dict} />
      <MobileBar lang={lang} dict={dict} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    </BookingProvider>
  );
}
