import { ORIGINS, DESTINATIONS, getRateCard, getRestrictions } from "@/lib/config/corridors";
import { getHaulageZone } from "@/lib/config/haulage";
import { getFxRate } from "@/lib/config/fx";
import type { CargoType, ServiceLevel, RestrictionSeverity } from "@/lib/config/types";

export type { CargoType, ServiceLevel };

export interface QuoteInput {
  originPort: string;
  destinationPort: string;
  cbm: number;           // cubic metres
  weightKg: number;
  cargoType: CargoType;
  serviceLevel: ServiceLevel;
  customsHandling: boolean;
  hazmatClass?: string;
  pickupZoneId?: string;
}

export interface QuoteBreakdown {
  originHaulage: number;
  oceanFreight: number;
  bunkerAdjustment: number;   // BAF
  currencyAdjustment: number; // CAF
  portHandling: number;
  documentation: number;
  customsClearance: number;
  customsClearanceDzd: number;
  fxRateUsed: number;
  totalEur: number;
  estimatedTransitDays: number;
  validUntil: string;
  quoteRef: string;
  restrictions?: { severity: RestrictionSeverity; note: string }[];
}

const CARGO_MULTIPLIERS: Record<CargoType, number> = {
  general: 1.0,
  hazmat: 1.55,
  refrigerated: 1.80,
  oversized: 1.35,
};

export function calculateQuote(input: QuoteInput): QuoteBreakdown {
  const rateCard = getRateCard(input.originPort, input.destinationPort);

  // LCL pricing: charge on greater of volumetric vs actual weight (1 CBM = 1000 kg)
  const chargeableCbm = Math.max(input.cbm, input.weightKg / 1000);

  const haulageZone = getHaulageZone(input.pickupZoneId, input.originPort);
  const originHaulage = Math.round(haulageZone.flatFee + chargeableCbm * haulageZone.perCbmFee);

  const oceanFreight = Math.round(
    rateCard.baseRatePerCbm *
      chargeableCbm *
      CARGO_MULTIPLIERS[input.cargoType] *
      (input.serviceLevel === "express" ? rateCard.expressMultiplier : 1.0)
  );

  const bunkerAdjustment = Math.round(oceanFreight * rateCard.bafPct);
  const currencyAdjustment = Math.round(oceanFreight * rateCard.cafPct);
  const portHandling = Math.round(rateCard.terminalHandlingBase + chargeableCbm * rateCard.terminalHandlingPerCbm);
  const documentation = rateCard.documentationFee;

  // Algerian customs/DGSN fees are natively denominated in DZD, converted to
  // EUR at quote time — a different currency regime on the destination side.
  const fx = getFxRate("EUR_DZD");
  const customsClearanceDzd = input.customsHandling ? rateCard.customsClearanceFeeDzd : 0;
  const customsClearance = Math.round(customsClearanceDzd / fx.rate);

  const total =
    originHaulage +
    oceanFreight +
    bunkerAdjustment +
    currencyAdjustment +
    portHandling +
    documentation +
    customsClearance;

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 7);

  const restrictionMatches = getRestrictions(input.destinationPort, input.cargoType);

  return {
    originHaulage,
    oceanFreight,
    bunkerAdjustment,
    currencyAdjustment,
    portHandling,
    documentation,
    customsClearance,
    customsClearanceDzd,
    fxRateUsed: fx.rate,
    totalEur: total,
    estimatedTransitDays: rateCard.transitDays[input.serviceLevel],
    validUntil: validUntil.toISOString(),
    quoteRef: `NCT-${Date.now().toString(36).toUpperCase()}`,
    restrictions: restrictionMatches.length
      ? restrictionMatches.map((r) => ({ severity: r.severity, note: r.note }))
      : undefined,
  };
}

export const ORIGIN_PORTS = ORIGINS.map((o) => ({ value: o.code, label: `${o.city} (${o.unlocode})` }));

export const DESTINATION_PORTS = DESTINATIONS.map((d) => ({ value: d.code, label: `${d.city} (${d.unlocode})` }));
