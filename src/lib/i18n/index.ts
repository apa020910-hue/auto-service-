import lv from "./lv";
import ru from "./ru";
import en from "./en";
import type { Locale } from "@/lib/types";

type DeepWiden<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly DeepWiden<U>[]
        : T extends object
          ? { readonly [K in keyof T]: DeepWiden<T[K]> }
          : T;

export type Dictionary = DeepWiden<typeof lv>;
export const dictionaries: Record<Locale, Dictionary> = { lv, ru, en };

export function isLocale(value: string): value is Locale {
  return value === "lv" || value === "ru" || value === "en";
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const localeLabels: Record<Locale, string> = {
  lv: "LV",
  ru: "RU",
  en: "EN",
};
