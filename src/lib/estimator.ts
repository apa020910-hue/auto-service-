import { getService } from "@/lib/data";
import type { AddonKey, ServiceKey, VehicleClass } from "@/lib/types";

const vehicleMultipliers: Record<VehicleClass, number> = {
  compact: 1,
  sedan: 1.08,
  suv: 1.2,
  van: 1.28,
};

const addonPrices: Record<AddonKey, { low: number; high: number }> = {
  csdd: { low: 29, high: 39 },
  acRefill: { low: 59, high: 85 },
  replacementCar: { low: 25, high: 40 },
};

export type Estimate = {
  labor: { low: number; high: number };
  materials: { low: number; high: number };
  extras: { low: number; high: number };
  total: { low: number; high: number };
};

export function calculateEstimate(
  serviceKey: ServiceKey,
  vehicle: VehicleClass,
  addons: AddonKey[],
): Estimate {
  const service = getService(serviceKey);
  if (!service) throw new Error(`Unknown service: ${serviceKey}`);
  const multiplier = vehicleMultipliers[vehicle];
  const labor = {
    low: Math.round(service.laborLow * multiplier),
    high: Math.round(service.laborHigh * multiplier),
  };
  const materials = {
    low: Math.round(service.partsLow * multiplier),
    high: Math.round(service.partsHigh * multiplier),
  };
  const extras = addons.reduce(
    (sum, addon) => ({
      low: sum.low + addonPrices[addon].low,
      high: sum.high + addonPrices[addon].high,
    }),
    { low: 0, high: 0 },
  );
  return {
    labor,
    materials,
    extras,
    total: {
      low: labor.low + materials.low + extras.low,
      high: labor.high + materials.high + extras.high,
    },
  };
}

export const addonKeys: AddonKey[] = ["csdd", "acRefill", "replacementCar"];
