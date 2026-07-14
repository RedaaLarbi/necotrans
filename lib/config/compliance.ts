import type { CargoType, ComplianceRule } from "./types";

// Algerian import formalities encoded as data — machine-validated rules, not
// hardcoded logic. New rules (or corridor-specific variants) are added here,
// not by touching lib/docengine.ts.
export const COMPLIANCE_RULES: ComplianceRule[] = [
  {
    id: "domiciliation-bancaire",
    category: "domiciliation_bancaire",
    title: "Domiciliation bancaire",
    description:
      "Every import operation must be domiciled with an Algerian bank before customs clearance. The domiciliation reference must match the one declared on the DUA.",
    requiredDocumentIds: ["dua"],
  },
  {
    id: "algex-registration",
    category: "algex_registration",
    cargoTypes: ["hazmat", "oversized"],
    title: "ALGEX registration",
    description:
      "Hazardous and oversized/out-of-gauge cargo categories require an ALGEX conformity registration reference prior to booking.",
    requiredDocumentIds: [],
  },
  {
    id: "eur1-legalization",
    category: "legalization",
    minValueEur: 2000,
    title: "Certificate of Origin legalization",
    description:
      "Shipments valued above €2,000 require a legalized EUR.1 Certificate of Origin to claim the preferential tariff rate.",
    requiredDocumentIds: ["eur1"],
  },
];

export function getApplicableRules(cargoType: CargoType, declaredValueEur: number): ComplianceRule[] {
  return COMPLIANCE_RULES.filter((rule) => {
    if (rule.cargoTypes && !rule.cargoTypes.includes(cargoType)) return false;
    if (rule.minValueEur !== undefined && declaredValueEur <= rule.minValueEur) return false;
    return true;
  });
}
