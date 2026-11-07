import { NextResponse, type NextRequest } from "next/server";

const supportedLocales = ["lv", "ru", "en"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

function getPreferredLocale(acceptLanguage: string | null): SupportedLocale {
  if (!acceptLanguage) return "lv";
  const preferences = acceptLanguage
    .split(",")
    .map((entry) => {
      const [tag, quality] = entry.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: quality ? Number(quality) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const preference of preferences) {
    const base = preference.tag.split("-")[0];
    if (supportedLocales.includes(base as SupportedLocale)) return base as SupportedLocale;
  }
  return "lv";
}

export function proxy(request: NextRequest) {
  const locale = getPreferredLocale(request.headers.get("accept-language"));
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url));
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: ["/"],
};
