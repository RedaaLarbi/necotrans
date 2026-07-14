export type CargoType = "general" | "hazmat" | "refrigerated" | "oversized";
export type ServiceLevel = "standard" | "express";

export interface Port {
  code: string;
  city: string;
  country: string;
  unlocode: string;
}

export interface Carrier {
  id: string;
  name: string;
}

export interface RateCard {
  originCode: string;
  destCode: string;
  carrierId: string;
  baseRatePerCbm: number;
  bafPct: number;
  cafPct: number;
  terminalHandlingBase: number;
  terminalHandlingPerCbm: number;
  documentationFee: number;
  customsClearanceFeeDzd: number;
  expressMultiplier: number;
  transitDays: Record<ServiceLevel, number>;
}

export interface HaulageZone {
  id: string;
  originCode: string;
  label: string;
  flatFee: number;
  perCbmFee: number;
}

export interface FxRate {
  pair: string;
  rate: number;
  asOf: string;
  source: string;
}

export type RestrictionSeverity = "permit_required" | "prohibited" | "info";

export interface RestrictionRule {
  destCode: string;
  cargoType: CargoType;
  severity: RestrictionSeverity;
  note: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  code: string;
  languages: string[];
  legalizationRequired: boolean;
}

export interface Partner {
  id: string;
  name: string;
  role: "customs_broker" | "agent" | "carrier_agent";
  destCode: string;
  city: string;
  sinceYear: number;
}

export interface Corridor {
  originCode: string;
  destCode: string;
  carrierIds: string[];
  documentTemplateIds: string[];
  partnerIds: string[];
}

export type ComplianceCategory = "domiciliation_bancaire" | "algex_registration" | "legalization" | "commodity_restriction";
export type CheckStatus = "pass" | "fail" | "warning";

export interface ComplianceRule {
  id: string;
  category: ComplianceCategory;
  cargoTypes?: CargoType[];
  minValueEur?: number;
  title: string;
  description: string;
  requiredDocumentIds: string[];
}

export type RoadmapStatus = "planned" | "opportunistic";

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: RoadmapStatus;
}
