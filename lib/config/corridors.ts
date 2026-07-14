import type {
  Port,
  Carrier,
  RateCard,
  RestrictionRule,
  DocumentTemplate,
  Partner,
  Corridor,
} from "./types";

export const ORIGINS: Port[] = [
  { code: "Valencia", city: "Valencia", country: "Spain", unlocode: "VLC" },
  { code: "Barcelona", city: "Barcelona", country: "Spain", unlocode: "BCN" },
];

export const DESTINATIONS: Port[] = [
  { code: "Algiers", city: "Algiers", country: "Algeria", unlocode: "ALG" },
  { code: "Oran", city: "Oran", country: "Algeria", unlocode: "ORN" },
  { code: "Annaba", city: "Annaba", country: "Algeria", unlocode: "AAE" },
];

export const CARRIERS: Carrier[] = [
  { id: "msc", name: "MSC" },
  { id: "cnan-nord", name: "CNAN Nord" },
  { id: "cma-cgm", name: "CMA CGM" },
];

// Base surcharge/fee structure shared across today's corridors; corridor-specific
// overrides (base rate, transit days, carrier) live per RateCard below. New
// corridors are added here — not by touching lib/pricing.ts.
const SHARED_RATE_TERMS = {
  bafPct: 0.18,
  cafPct: 0.04,
  terminalHandlingBase: 42,
  terminalHandlingPerCbm: 8.5,
  documentationFee: 65,
  // 56,050 DZD at the configured EUR_DZD rate (147.5) converts to exactly
  // €380 — the same figure this used to be hardcoded as in EUR.
  customsClearanceFeeDzd: 56050,
  expressMultiplier: 1.45,
};

export const RATE_CARDS: RateCard[] = [
  {
    originCode: "Valencia",
    destCode: "Algiers",
    carrierId: "msc",
    baseRatePerCbm: 87,
    transitDays: { standard: 7, express: 4 },
    ...SHARED_RATE_TERMS,
  },
  {
    originCode: "Valencia",
    destCode: "Oran",
    carrierId: "cnan-nord",
    baseRatePerCbm: 74,
    transitDays: { standard: 6, express: 3 },
    ...SHARED_RATE_TERMS,
  },
  {
    originCode: "Valencia",
    destCode: "Annaba",
    carrierId: "cma-cgm",
    baseRatePerCbm: 102,
    transitDays: { standard: 9, express: 6 },
    ...SHARED_RATE_TERMS,
  },
  {
    originCode: "Barcelona",
    destCode: "Algiers",
    carrierId: "cnan-nord",
    baseRatePerCbm: 91,
    transitDays: { standard: 8, express: 5 },
    ...SHARED_RATE_TERMS,
  },
];

// Used when a queried origin–destination pair has no dedicated RateCard yet
// (i.e. a corridor not formally launched) — keeps the engine usable while new
// corridors are being configured.
export const DEFAULT_RATE_CARD: Omit<RateCard, "originCode" | "destCode"> = {
  carrierId: "msc",
  baseRatePerCbm: 95,
  transitDays: { standard: 8, express: 5 },
  ...SHARED_RATE_TERMS,
};

// Algeria maintains import restrictions on specific cargo categories that must
// be validated at quote time, not discovered at the port.
export const RESTRICTIONS: RestrictionRule[] = [
  {
    destCode: "Algiers",
    cargoType: "hazmat",
    severity: "permit_required",
    note: "Requires a DGSN hazardous goods import permit prior to booking.",
  },
  {
    destCode: "Oran",
    cargoType: "hazmat",
    severity: "permit_required",
    note: "Requires a DGSN hazardous goods import permit prior to booking.",
  },
  {
    destCode: "Annaba",
    cargoType: "hazmat",
    severity: "permit_required",
    note: "Requires a DGSN hazardous goods import permit prior to booking.",
  },
  {
    destCode: "Algiers",
    cargoType: "refrigerated",
    severity: "info",
    note: "Health certificate required for temperature-controlled cargo on arrival.",
  },
];

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: "dua",
    name: "DUA — Déclaration Unique en Douane",
    code: "DUA",
    languages: ["fr", "ar"],
    legalizationRequired: false,
  },
  {
    id: "cmr",
    name: "CMR Consignment Note",
    code: "CMR",
    languages: ["fr", "en", "es"],
    legalizationRequired: false,
  },
  {
    id: "eur1",
    name: "Certificate of Origin (EUR.1)",
    code: "EUR1",
    languages: ["en", "fr"],
    legalizationRequired: true,
  },
  {
    id: "packing-list",
    name: "Packing List",
    code: "PL",
    languages: ["en", "fr", "es"],
    legalizationRequired: false,
  },
];

// The Algiers-side customs clearance operation is Transit Necotrans itself —
// the platform doesn't need to build Algerian clearance from zero.
export const PARTNERS: Partner[] = [
  { id: "necotrans-transit-algiers", name: "Transit Necotrans — Algiers", role: "customs_broker", destCode: "Algiers", city: "Algiers", sinceYear: 2006 },
  { id: "necotrans-transit-oran", name: "Transit Necotrans — Oran", role: "customs_broker", destCode: "Oran", city: "Oran", sinceYear: 2006 },
  { id: "necotrans-transit-annaba", name: "Transit Necotrans — Annaba", role: "customs_broker", destCode: "Annaba", city: "Annaba", sinceYear: 2006 },
];

export const CORRIDORS: Corridor[] = RATE_CARDS.map((rc) => ({
  originCode: rc.originCode,
  destCode: rc.destCode,
  carrierIds: [rc.carrierId],
  documentTemplateIds: DOCUMENT_TEMPLATES.map((d) => d.id),
  partnerIds: PARTNERS.filter((p) => p.destCode === rc.destCode).map((p) => p.id),
}));

export function getRateCard(originCode: string, destCode: string): RateCard {
  const found = RATE_CARDS.find((rc) => rc.originCode === originCode && rc.destCode === destCode);
  if (found) return found;
  return { originCode, destCode, ...DEFAULT_RATE_CARD };
}

export function getRestrictions(destCode: string, cargoType: string): RestrictionRule[] {
  return RESTRICTIONS.filter((r) => r.destCode === destCode && r.cargoType === cargoType);
}

export function getPartner(destCode: string): Partner | undefined {
  return PARTNERS.find((p) => p.destCode === destCode);
}

export function getCarrier(carrierId: string): Carrier | undefined {
  return CARRIERS.find((c) => c.id === carrierId);
}

export function getDocumentTemplates(ids: string[]): DocumentTemplate[] {
  return DOCUMENT_TEMPLATES.filter((d) => ids.includes(d.id));
}
