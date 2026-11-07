import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ["lv", "ru", "en"];
  return languages.map((lang) => ({
    url: `${site.url}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "lv" ? 1 : 0.8,
    alternates: { languages: { lv: `${site.url}/lv`, ru: `${site.url}/ru`, en: `${site.url}/en` } },
  }));
}
