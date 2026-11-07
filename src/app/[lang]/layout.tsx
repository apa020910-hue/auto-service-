import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "@fontsource-variable/space-grotesk";
import "@fontsource/jetbrains-mono/400.css";
import "../globals.css";
import { isLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "lv" }, { lang: "ru" }, { lang: "en" }];
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  return (
    <html lang={locale}>
      <body>
        <div className="site-locale" data-locale={locale}>{children}</div>
      </body>
    </html>
  );
}
