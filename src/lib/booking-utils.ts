const TIME_ZONE = "Europe/Riga";

function rigaParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

export function getRigaDateISO(date = new Date()): string {
  const p = rigaParts(date);
  return `${p.year}-${p.month}-${p.day}`;
}

export function getRigaMinutes(date = new Date()): number {
  const p = rigaParts(date);
  return Number(p.hour) * 60 + Number(p.minute);
}

export function getOpenSlots(dateISO: string, now = new Date()): string[] {
  const day = new Date(`${dateISO}T12:00:00Z`).getUTCDay();
  if (day === 0) return [];
  const startHour = day === 6 ? 9 : 8;
  const endHour = day === 6 ? 16 : 19;
  const sameDay = dateISO === getRigaDateISO(now);
  const currentMinutes = sameDay ? getRigaMinutes(now) : -1;
  const slots: string[] = [];
  for (let minutes = startHour * 60; minutes < endHour * 60; minutes += 60) {
    if (sameDay && minutes <= currentMinutes + 20) continue;
    const hour = String(Math.floor(minutes / 60)).padStart(2, "0");
    const minute = String(minutes % 60).padStart(2, "0");
    slots.push(`${hour}:${minute}`);
  }
  return slots;
}

export function getNextAvailableSlots(count = 4, now = new Date()): { date: string; time: string }[] {
  const result: { date: string; time: string }[] = [];
  const today = getRigaDateISO(now);
  const [year, month, day] = today.split("-").map(Number);
  const start = new Date(Date.UTC(year, month - 1, day, 12));
  for (let offset = 0; offset < 21 && result.length < count; offset += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + offset);
    const dateISO = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
    const slots = getOpenSlots(dateISO, now);
    for (const time of slots) {
      result.push({ date: dateISO, time });
      if (result.length >= count) break;
    }
  }
  return result;
}

export function addDaysToRigaDate(days: number, now = new Date()): string {
  const today = getRigaDateISO(now);
  const [year, month, day] = today.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + days, 12));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

export function getFirstOpenDate(now = new Date()): string {
  for (let index = 0; index < 8; index += 1) {
    const date = addDaysToRigaDate(index, now);
    if (getOpenSlots(date, now).length > 0) return date;
  }
  return addDaysToRigaDate(1, now);
}

function rigaOffsetMinutes(date: Date): number {
  const p = rigaParts(date);
  const asUTC = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute));
  return (asUTC - date.getTime()) / 60000;
}

export function rigaLocalToUtc(dateISO: string, time: string): Date {
  const [year, month, day] = dateISO.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const provisional = new Date(Date.UTC(year, month - 1, day, hour, minute));
  let utc = new Date(provisional.getTime() - rigaOffsetMinutes(provisional) * 60000);
  utc = new Date(provisional.getTime() - rigaOffsetMinutes(utc) * 60000);
  return utc;
}

export function createCalendarFile(input: {
  name: string;
  service: string;
  vehicle: string;
  date: string;
  time: string;
}): string {
  const start = rigaLocalToUtc(input.date, input.time);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const escapeICS = (value: string) => value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const uid = `apex-${crypto.randomUUID()}@apexautomotors.lv`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//APEX AUTO MOTORS//Service Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${escapeICS(`APEX AUTO MOTORS — ${input.service}`)}`,
    `DESCRIPTION:${escapeICS(`Vehicle: ${input.vehicle}. Contact: ${input.name}. Please wait for workshop confirmation.`)}`,
    `LOCATION:${escapeICS("APEX AUTO MOTORS, Riga, Latvia")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
