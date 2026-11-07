"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { BookingPrefill, Locale } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n";
import { Booking } from "@/components/Booking";

type BookingContextValue = {
  openBooking: (prefill?: BookingPrefill) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside BookingProvider");
  return context;
}

export function BookingProvider({ children, lang, dict }: { children: ReactNode; lang: Locale; dict: Dictionary }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingPrefill>({});
  const openBooking = useCallback((nextPrefill: BookingPrefill = {}) => {
    setPrefill(nextPrefill);
    setIsOpen(true);
  }, []);
  const closeBooking = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      {isOpen && <Booking lang={lang} dict={dict} prefill={prefill} onClose={closeBooking} />}
    </BookingContext.Provider>
  );
}
