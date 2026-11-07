# APEX AUTO MOTORS — website demo

A premium, multilingual automotive workshop website for Riga, built with **Next.js 16 App Router**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Turbopack**. The visual language is an industrial engineering studio: graphite surfaces, warm paper sections, restrained safety-orange accents, bespoke line diagrams and self-hosted typography.

## Included

- `/lv`, `/ru`, `/en` language routes with separate Latvian, Russian and English dictionaries.
- `src/proxy.ts` redirects `/` using the browser's `Accept-Language` header and falls back to Latvian.
- Responsive navigation, a Riga-time workshop status indicator and a mobile conversion bar.
- Quick hero booking, four-step booking modal, live slot calculation, and `.ics` calendar invitation download.
- Interactive estimator with vehicle-class multipliers, add-ons and a labour / parts / extras breakdown.
- Eight expandable service descriptions, a before/after 3D alignment viewer, review examples and an illustrated arrival plan.
- Booking API with validation, honeypot protection and rate limiting (Upstash Redis when configured; in-memory fallback for local/demo use).
- Optional webhook delivery to a CRM, automation endpoint or booking backend.
- Metadata, Open Graph image, JSON-LD `AutoRepair`, `manifest.webmanifest`, sitemap and robots routes.
- Self-hosted Space Grotesk Variable and JetBrains Mono font packages. No Google Fonts runtime dependency or external icon library.

## Run locally

Use Node.js 20.9 or newer.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. The root route redirects to the best supported language in the browser's `Accept-Language` header. You can also open `/lv`, `/ru` or `/en` directly.

## Production build

```bash
npm run typecheck
npm run lint
npm run build
```

Deploy the repository to Vercel with the Node.js runtime. Next.js 16 uses the `src/proxy.ts` convention (not the deprecated middleware filename); Tailwind 4 is compiled through `@tailwindcss/postcss`.

## Before publishing — replace demo data

This project is intentionally populated with realistic *demo* values so that the preview is complete. Do not publish the current placeholder contact details as real business facts.

1. Update `src/lib/site.ts`: `phone`, `email`, `address`, `postalCode`, opening hours, and the coordinates. The current address combines the two area names supplied in the brief; the GPS point is explicitly a placeholder, not a verified workshop entrance. Update the Google Maps / Waze arrival links if the real entrance differs.
2. Replace the four sample reviews in `src/lib/data.ts` with real, permissioned customer reviews. The displayed 4.9/5 figure is a demo rating and must be replaced with a verified review score (or removed).
3. Confirm the workshop's actual 12-year experience claim, Bosch equipment wording, warranty terms, prices, and service durations. The displayed prices and estimate ranges are illustrative starting values, not a binding quote.
4. Set `NEXT_PUBLIC_SITE_URL` to the final production origin. It is used for canonical URLs, Open Graph metadata and the sitemap.
5. Add real entrance photography if desired. The current arrival card is a bespoke schematic drawing, not a photograph of an actual gate or premises.

## Booking delivery

The four-step form posts to `POST /api/booking`.

- Without `BOOKING_WEBHOOK_URL`, the endpoint runs in **demo mode**: it validates the request, returns a reference and logs only the reference plus non-personal routing fields. It does **not** save contact details or notify the workshop. The success state says so and still offers an `.ics` calendar file.
- Set `BOOKING_WEBHOOK_URL` to an HTTPS endpoint that accepts JSON to deliver live requests. The payload includes `bookingId`, vehicle/service details, appointment date/time, customer contact data, locale and a timestamp.
- Set `BOOKING_WEBHOOK_SECRET` to add an `Authorization: Bearer ...` header to the webhook request.
- For shared rate limits across Vercel serverless instances, configure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Without these, the route uses an in-memory limiter suitable for local preview only; it is not a globally shared production limit.

The API validates the submitted date and time against Riga workshop hours (Mon–Fri 08:00–19:00, Sat 09:00–16:00, Sun closed), and rejects past dates or dates more than 30 days ahead. It uses a one-hour slot interval for this demo. These slots are derived from opening hours only; they are not a live inventory of already-booked appointments. Your webhook/CRM must re-check capacity and prevent double booking before confirming a slot. Adjust `src/lib/booking-utils.ts` to match the workshop's actual capacity and job durations.

## Project structure

```text
src/
  app/
    [lang]/
      layout.tsx
      page.tsx
    api/booking/route.ts
    globals.css
    manifest.ts
    opengraph-image.tsx
    robots.ts
    sitemap.ts
  components/
    Booking.tsx
    BookingContext.tsx
    Comparison.tsx
    Contact.tsx
    Estimator.tsx
    Footer.tsx
    Graphics.tsx
    Header.tsx
    Hero.tsx
    MobileBar.tsx
    Reviews.tsx
    Services.tsx
  lib/
    booking-utils.ts
    data.ts
    estimator.ts
    site.ts
    types.ts
    i18n/{lv,ru,en}.ts
  proxy.ts
```

## Useful scripts

- `npm run dev` — local development with Turbopack.
- `npm run build` — production build.
- `npm run start` — run the production server.
- `npm run lint` — ESLint.
- `npm run typecheck` — strict TypeScript check.
