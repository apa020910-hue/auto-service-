"use client";

import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { site } from "@/lib/site";
import { PhoneIcon, ArrowIcon } from "@/components/Graphics";
import { useBooking } from "@/components/BookingContext";

export function MobileBar({ dict }: { lang: Locale; dict: Dictionary }) {
  const { openBooking } = useBooking();
  return (
    <div className="mobile-conversion-bar">
      <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mobile-call"><PhoneIcon /><span>{dict.common.call}</span></a>
      <button type="button" className="mobile-book" onClick={() => openBooking()}>{dict.common.book}<ArrowIcon /></button>
    </div>
  );
}
