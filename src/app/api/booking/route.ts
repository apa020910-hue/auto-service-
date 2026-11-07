import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { addDaysToRigaDate, getOpenSlots, getRigaDateISO } from "@/lib/booking-utils";
import type { Locale } from "@/lib/types";

export const runtime = "nodejs";

const allowedServices = new Set([
  "oil", "brakes", "suspension", "diagnostics", "alignment", "ac", "battery", "inspection",
]);
const allowedLocales = new Set<Locale>(["lv", "ru", "en"]);
const memoryStore = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 6;

async function checkRateLimit(identifier: string): Promise<{ success: boolean; reset: number }> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    const redis = new Redis({ url: redisUrl, token: redisToken });
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "1 h"),
      prefix: "apex:auto-booking",
    });
    const result = await limiter.limit(identifier);
    return { success: result.success, reset: result.reset };
  }

  const now = Date.now();
  const current = memoryStore.get(identifier);
  if (!current || current.resetAt <= now) {
    const resetAt = now + WINDOW_MS;
    memoryStore.set(identifier, { count: 1, resetAt });
    return { success: true, reset: resetAt };
  }
  current.count += 1;
  memoryStore.set(identifier, current);
  if (memoryStore.size > 5000) {
    for (const [key, value] of memoryStore) if (value.resetAt <= now) memoryStore.delete(key);
  }
  return { success: current.count <= MAX_REQUESTS, reset: current.resetAt };
}

function isShortString(value: unknown, max: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max;
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Unsupported content type." }, { status: 415 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: return a normal-looking response without processing automated submissions.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, mode: "demo", bookingId: "APX-REQUEST" }, { status: 202 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown").split(",")[0].trim().slice(0, 80);
  let rate;
  try {
    rate = await checkRateLimit(ip);
  } catch (error) {
    console.error("APEX booking rate-limit service error", error);
    return NextResponse.json({ ok: false, error: "Booking service temporarily unavailable." }, { status: 503 });
  }
  if (!rate.success) {
    return NextResponse.json({ ok: false, error: "Too many booking requests. Please try again later." }, {
      status: 429,
      headers: { "Retry-After": String(Math.max(1, Math.ceil((rate.reset - Date.now()) / 1000))) },
    });
  }

  const service = body.service;
  const symptoms = typeof body.symptoms === "string" ? body.symptoms.trim() : "";
  const vehicle = body.vehicle;
  const plateOrVin = typeof body.plateOrVin === "string" ? body.plateOrVin.trim() : "";
  const date = body.date;
  const time = body.time;
  const name = body.name;
  const phone = body.phone;
  const email = body.email;
  const locale = body.locale;
  const consent = body.consent === true;
  const replacementCar = body.replacementCar === true;

  if (
    typeof service !== "string" || !allowedServices.has(service) ||
    !isShortString(vehicle, 140) || !isShortString(name, 100) ||
    !isShortString(phone, 40) || !isShortString(email, 160) ||
    typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    typeof time !== "string" || !/^\d{2}:00$/.test(time) ||
    !allowedLocales.has(locale as Locale) || !consent ||
    symptoms.length > 1200 || plateOrVin.length > 32 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json({ ok: false, error: "Please check the required booking fields." }, { status: 400 });
  }

  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));
  if (parsedDate.getUTCFullYear() !== year || parsedDate.getUTCMonth() !== month - 1 || parsedDate.getUTCDate() !== day) {
    return NextResponse.json({ ok: false, error: "Invalid booking date." }, { status: 400 });
  }
  if (date < getRigaDateISO() || date > addDaysToRigaDate(30)) {
    return NextResponse.json({ ok: false, error: "Booking date is outside the available window." }, { status: 400 });
  }
  if (!getOpenSlots(date).includes(time)) {
    return NextResponse.json({ ok: false, error: "This time slot is no longer available. Please choose another slot." }, { status: 409 });
  }

  const bookingId = `APX-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const booking = {
    bookingId,
    service,
    symptoms,
    vehicle,
    plateOrVin,
    replacementCar,
    date,
    time,
    name,
    phone,
    email,
    locale,
    submittedAt: new Date().toISOString(),
    source: "apex-auto-motors-website",
  };

  const webhookUrl = process.env.BOOKING_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (process.env.BOOKING_WEBHOOK_SECRET) headers.Authorization = `Bearer ${process.env.BOOKING_WEBHOOK_SECRET}`;
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(booking),
        signal: AbortSignal.timeout(8000),
      });
      if (!webhookResponse.ok) {
        console.error("APEX booking webhook returned a non-2xx response", webhookResponse.status);
        return NextResponse.json({ ok: false, error: "The workshop system did not accept the request. Please call the workshop." }, { status: 502 });
      }
      return NextResponse.json({ ok: true, mode: "webhook", bookingId }, { status: 201 });
    } catch (error) {
      console.error("APEX booking webhook delivery failed", error);
      return NextResponse.json({ ok: false, error: "Could not reach the workshop system. Please call the workshop." }, { status: 502 });
    }
  }

  // Demo mode deliberately does not retain personal data; connect a webhook/CRM for live bookings.
  console.info("APEX demo booking received", { bookingId, service, date, time, locale });
  return NextResponse.json({ ok: true, mode: "demo", bookingId }, { status: 202 });
}
