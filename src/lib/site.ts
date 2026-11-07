export const site = {
  name: "APEX AUTO MOTORS",
  shortName: "APEX Serviss",
  description:
    "Precīza auto diagnostika un remonts Rīgā. Skaidras tāmes, profesionāla pieeja un garantija remontam.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.lv",
  phone: "+371 20 000 000",
  phoneDisplay: "+371 20 000 000",
  email: "serviss@apexautomotors.lv",
  // Demo-only contact location. Replace with the real workshop address and entrance pin before launch.
  address: "Ganību dambis / Lubānas iela, Rīga",
  addressLocality: "Rīga",
  postalCode: "LV-1005",
  country: "LV",
  coordinates: { lat: 56.9616, lng: 24.145 },
  coordinatesAreDemo: true,
  hours: {
    weekdays: "08:00–19:00",
    saturday: "09:00–16:00",
    sunday: "Slēgts",
  },
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
} as const;
