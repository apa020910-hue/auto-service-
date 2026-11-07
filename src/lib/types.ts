export type Locale = "lv" | "ru" | "en";
export type ServiceKey =
  | "oil"
  | "brakes"
  | "suspension"
  | "diagnostics"
  | "alignment"
  | "ac"
  | "battery"
  | "inspection";
export type VehicleClass = "compact" | "sedan" | "suv" | "van";
export type AddonKey = "csdd" | "acRefill" | "replacementCar";

export type BookingPrefill = {
  service?: string;
  brand?: string;
  model?: string;
  problem?: string;
  date?: string;
  time?: string;
};

export type BookingPayload = {
  service: string;
  symptoms: string;
  vehicle: string;
  plateOrVin: string;
  replacementCar: boolean;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  website?: string;
  locale: Locale;
};
