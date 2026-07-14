import { getApplicableRules } from "@/lib/config/compliance";
import { getRestrictions } from "@/lib/config/corridors";
import type { CargoType, CheckStatus, ComplianceCategory } from "@/lib/config/types";

export interface DocEngineInput {
  destinationPort: string;
  cargoType: CargoType;
  declaredValueEur: number;
  importer: { name: string; nif: string };
  domiciliationBancaire: { reference: string; bank: string };
  algexRef?: string;
  documents: {
    commercialInvoice: { number: string; value: number; importerName: string };
    packingList: { number: string; value: number };
    certificateOfOrigin?: { number: string; legalized: boolean };
    dua?: { domiciliationRef: string; importerNif: string };
  };
}

export interface ComplianceCheck {
  ruleId: string;
  category: ComplianceCategory;
  status: CheckStatus;
  title: string;
  message: string;
}

export interface DocEngineResult {
  overallStatus: "ready" | "needs_attention" | "blocked";
  checks: ComplianceCheck[];
  requiredDocumentIds: string[];
}

export function validateDocuments(input: DocEngineInput): DocEngineResult {
  const checks: ComplianceCheck[] = [];
  const rules = getApplicableRules(input.cargoType, input.declaredValueEur);
  const requiredDocumentIds = new Set<string>();

  for (const rule of rules) {
    rule.requiredDocumentIds.forEach((id) => requiredDocumentIds.add(id));

    if (rule.category === "domiciliation_bancaire") {
      if (!input.domiciliationBancaire.reference.trim()) {
        checks.push({
          ruleId: rule.id,
          category: rule.category,
          status: "fail",
          title: rule.title,
          message: "Domiciliation bancaire reference is missing.",
        });
      } else if (
        input.documents.dua?.domiciliationRef &&
        input.documents.dua.domiciliationRef.trim() !== input.domiciliationBancaire.reference.trim()
      ) {
        checks.push({
          ruleId: rule.id,
          category: rule.category,
          status: "fail",
          title: rule.title,
          message: `Domiciliation reference mismatch: "${input.domiciliationBancaire.reference}" (bank) vs "${input.documents.dua.domiciliationRef}" (DUA).`,
        });
      } else {
        checks.push({
          ruleId: rule.id,
          category: rule.category,
          status: "pass",
          title: rule.title,
          message: "Domiciliation bancaire reference present and consistent.",
        });
      }
    }

    if (rule.category === "algex_registration") {
      if (!input.algexRef?.trim()) {
        checks.push({
          ruleId: rule.id,
          category: rule.category,
          status: "fail",
          title: rule.title,
          message: `${input.cargoType} cargo requires an ALGEX registration reference.`,
        });
      } else {
        checks.push({
          ruleId: rule.id,
          category: rule.category,
          status: "pass",
          title: rule.title,
          message: "ALGEX registration reference present.",
        });
      }
    }

    if (rule.category === "legalization") {
      const cert = input.documents.certificateOfOrigin;
      if (!cert?.number.trim()) {
        checks.push({
          ruleId: rule.id,
          category: rule.category,
          status: "fail",
          title: rule.title,
          message: `Declared value €${input.declaredValueEur.toLocaleString()} exceeds the preferential-tariff threshold — a Certificate of Origin (EUR.1) is required.`,
        });
      } else if (!cert.legalized) {
        checks.push({
          ruleId: rule.id,
          category: rule.category,
          status: "warning",
          title: rule.title,
          message: `Certificate of Origin ${cert.number} is on file but not yet legalized.`,
        });
      } else {
        checks.push({
          ruleId: rule.id,
          category: rule.category,
          status: "pass",
          title: rule.title,
          message: `Certificate of Origin ${cert.number} legalized.`,
        });
      }
    }
  }

  // Cross-document field validation
  const { commercialInvoice, packingList, dua } = input.documents;

  if (commercialInvoice.value !== packingList.value) {
    checks.push({
      ruleId: "cross-doc-value",
      category: "commodity_restriction",
      status: "fail",
      title: "Invoice / packing list value mismatch",
      message: `Commercial invoice value (€${commercialInvoice.value.toLocaleString()}) does not match packing list value (€${packingList.value.toLocaleString()}).`,
    });
  } else {
    checks.push({
      ruleId: "cross-doc-value",
      category: "commodity_restriction",
      status: "pass",
      title: "Invoice / packing list value match",
      message: "Commercial invoice and packing list values match.",
    });
  }

  if (commercialInvoice.importerName.trim() !== input.importer.name.trim()) {
    checks.push({
      ruleId: "cross-doc-importer-name",
      category: "commodity_restriction",
      status: "fail",
      title: "Importer name mismatch",
      message: `Commercial invoice importer name ("${commercialInvoice.importerName}") does not match the declared importer ("${input.importer.name}").`,
    });
  } else {
    checks.push({
      ruleId: "cross-doc-importer-name",
      category: "commodity_restriction",
      status: "pass",
      title: "Importer name match",
      message: "Importer name consistent across documents.",
    });
  }

  if (dua?.importerNif && dua.importerNif.trim() !== input.importer.nif.trim()) {
    checks.push({
      ruleId: "cross-doc-nif",
      category: "commodity_restriction",
      status: "fail",
      title: "Importer NIF mismatch",
      message: `DUA importer NIF ("${dua.importerNif}") does not match the declared importer NIF ("${input.importer.nif}").`,
    });
  }

  // Reuse the existing commodity restriction table rather than duplicating it.
  const restrictions = getRestrictions(input.destinationPort, input.cargoType);
  for (const r of restrictions) {
    checks.push({
      ruleId: `restriction-${r.destCode}-${r.cargoType}`,
      category: "commodity_restriction",
      status: r.severity === "permit_required" ? "fail" : r.severity === "prohibited" ? "fail" : "warning",
      title: "Commodity restriction",
      message: r.note,
    });
  }

  const overallStatus: DocEngineResult["overallStatus"] = checks.some((c) => c.status === "fail")
    ? "blocked"
    : checks.some((c) => c.status === "warning")
      ? "needs_attention"
      : "ready";

  return {
    overallStatus,
    checks,
    requiredDocumentIds: Array.from(requiredDocumentIds),
  };
}
