export type InspectionChannel = "green" | "orange" | "red";

export interface ClearanceRecord {
  hsCode: string;
  hsDescription: string;
  destCode: string;
  inspectionChannel: InspectionChannel;
  clearanceDays: number;
  month: number; // 1-12
}

export interface DocumentErrorRecord {
  category: string;
  label: string;
  count: number;
  month: number;
}

export interface PortCongestionRecord {
  destCode: string;
  month: number;
  avgDwellDays: number;
}

// Illustrative operational dataset — the kind of thing that only exists
// because destination clearance (Transit Necotrans Algeria) runs on the same
// platform as origin quoting (Necotrans Valencia). Algeria's customs risk
// management genuinely uses green/orange/red inspection channels; the HS
// codes below map to the app's four cargo-type buckets used in the quote
// engine and DocEngine.
export const CLEARANCE_RECORDS: ClearanceRecord[] = [
  // General cargo — 8431.49 (machinery parts)
  { hsCode: "8431.49", hsDescription: "Machinery parts", destCode: "Algiers", inspectionChannel: "green", clearanceDays: 1, month: 1 },
  { hsCode: "8431.49", hsDescription: "Machinery parts", destCode: "Algiers", inspectionChannel: "green", clearanceDays: 2, month: 3 },
  { hsCode: "8431.49", hsDescription: "Machinery parts", destCode: "Algiers", inspectionChannel: "orange", clearanceDays: 4, month: 2 },
  { hsCode: "8431.49", hsDescription: "Machinery parts", destCode: "Algiers", inspectionChannel: "orange", clearanceDays: 5, month: 6 },
  { hsCode: "8431.49", hsDescription: "Machinery parts", destCode: "Oran", inspectionChannel: "green", clearanceDays: 2, month: 4 },
  { hsCode: "8431.49", hsDescription: "Machinery parts", destCode: "Oran", inspectionChannel: "red", clearanceDays: 9, month: 7 },

  // General cargo — 6403.99 (footwear)
  { hsCode: "6403.99", hsDescription: "Footwear", destCode: "Algiers", inspectionChannel: "green", clearanceDays: 1, month: 5 },
  { hsCode: "6403.99", hsDescription: "Footwear", destCode: "Algiers", inspectionChannel: "green", clearanceDays: 2, month: 9 },
  { hsCode: "6403.99", hsDescription: "Footwear", destCode: "Annaba", inspectionChannel: "orange", clearanceDays: 4, month: 8 },

  // Hazardous materials — 2811.19 (inorganic acids, ADR class)
  { hsCode: "2811.19", hsDescription: "Inorganic acids (ADR)", destCode: "Algiers", inspectionChannel: "orange", clearanceDays: 6, month: 2 },
  { hsCode: "2811.19", hsDescription: "Inorganic acids (ADR)", destCode: "Algiers", inspectionChannel: "red", clearanceDays: 11, month: 5 },
  { hsCode: "2811.19", hsDescription: "Inorganic acids (ADR)", destCode: "Algiers", inspectionChannel: "red", clearanceDays: 13, month: 10 },
  { hsCode: "2811.19", hsDescription: "Inorganic acids (ADR)", destCode: "Oran", inspectionChannel: "red", clearanceDays: 10, month: 8 },

  // Temperature-controlled — 0402.10 (milk powder)
  { hsCode: "0402.10", hsDescription: "Milk powder", destCode: "Algiers", inspectionChannel: "orange", clearanceDays: 3, month: 3 },
  { hsCode: "0402.10", hsDescription: "Milk powder", destCode: "Algiers", inspectionChannel: "orange", clearanceDays: 4, month: 11 },
  { hsCode: "0402.10", hsDescription: "Milk powder", destCode: "Annaba", inspectionChannel: "green", clearanceDays: 2, month: 6 },

  // Oversized / out-of-gauge — 8429.51 (front-end shovel loaders)
  { hsCode: "8429.51", hsDescription: "Front-end shovel loaders", destCode: "Algiers", inspectionChannel: "orange", clearanceDays: 7, month: 4 },
  { hsCode: "8429.51", hsDescription: "Front-end shovel loaders", destCode: "Algiers", inspectionChannel: "red", clearanceDays: 12, month: 9 },
  { hsCode: "8429.51", hsDescription: "Front-end shovel loaders", destCode: "Oran", inspectionChannel: "orange", clearanceDays: 8, month: 12 },
];

// Categories mirror exactly what lib/docengine.ts validates in real time —
// this table is the aggregate of the same checks, not a separate taxonomy.
export const DOCUMENT_ERROR_RECORDS: DocumentErrorRecord[] = [
  { category: "domiciliation_mismatch", label: "Domiciliation bancaire mismatch", count: 4, month: 2 },
  { category: "domiciliation_mismatch", label: "Domiciliation bancaire mismatch", count: 3, month: 7 },
  { category: "invoice_value_mismatch", label: "Invoice / packing list value mismatch", count: 6, month: 1 },
  { category: "invoice_value_mismatch", label: "Invoice / packing list value mismatch", count: 5, month: 5 },
  { category: "invoice_value_mismatch", label: "Invoice / packing list value mismatch", count: 7, month: 9 },
  { category: "missing_certificate", label: "Missing / unlegalized Certificate of Origin", count: 8, month: 3 },
  { category: "missing_certificate", label: "Missing / unlegalized Certificate of Origin", count: 6, month: 10 },
  { category: "missing_algex", label: "Missing ALGEX registration", count: 3, month: 4 },
  { category: "missing_algex", label: "Missing ALGEX registration", count: 2, month: 8 },
  { category: "importer_name_mismatch", label: "Importer name mismatch across documents", count: 2, month: 6 },
];

export const PORT_CONGESTION_RECORDS: PortCongestionRecord[] = [
  { destCode: "Algiers", month: 1, avgDwellDays: 2.1 },
  { destCode: "Algiers", month: 2, avgDwellDays: 2.3 },
  { destCode: "Algiers", month: 3, avgDwellDays: 2.6 },
  { destCode: "Algiers", month: 4, avgDwellDays: 2.8 },
  { destCode: "Algiers", month: 5, avgDwellDays: 3.4 },
  { destCode: "Algiers", month: 6, avgDwellDays: 4.1 },
  { destCode: "Algiers", month: 7, avgDwellDays: 4.8 },
  { destCode: "Algiers", month: 8, avgDwellDays: 4.6 },
  { destCode: "Algiers", month: 9, avgDwellDays: 3.7 },
  { destCode: "Algiers", month: 10, avgDwellDays: 2.9 },
  { destCode: "Algiers", month: 11, avgDwellDays: 2.4 },
  { destCode: "Algiers", month: 12, avgDwellDays: 3.0 },

  { destCode: "Oran", month: 1, avgDwellDays: 1.8 },
  { destCode: "Oran", month: 2, avgDwellDays: 1.9 },
  { destCode: "Oran", month: 3, avgDwellDays: 2.2 },
  { destCode: "Oran", month: 4, avgDwellDays: 2.4 },
  { destCode: "Oran", month: 5, avgDwellDays: 2.9 },
  { destCode: "Oran", month: 6, avgDwellDays: 3.5 },
  { destCode: "Oran", month: 7, avgDwellDays: 4.0 },
  { destCode: "Oran", month: 8, avgDwellDays: 3.9 },
  { destCode: "Oran", month: 9, avgDwellDays: 3.1 },
  { destCode: "Oran", month: 10, avgDwellDays: 2.5 },
  { destCode: "Oran", month: 11, avgDwellDays: 2.0 },
  { destCode: "Oran", month: 12, avgDwellDays: 2.5 },

  { destCode: "Annaba", month: 1, avgDwellDays: 2.4 },
  { destCode: "Annaba", month: 2, avgDwellDays: 2.5 },
  { destCode: "Annaba", month: 3, avgDwellDays: 2.9 },
  { destCode: "Annaba", month: 4, avgDwellDays: 3.1 },
  { destCode: "Annaba", month: 5, avgDwellDays: 3.7 },
  { destCode: "Annaba", month: 6, avgDwellDays: 4.4 },
  { destCode: "Annaba", month: 7, avgDwellDays: 5.1 },
  { destCode: "Annaba", month: 8, avgDwellDays: 4.9 },
  { destCode: "Annaba", month: 9, avgDwellDays: 4.0 },
  { destCode: "Annaba", month: 10, avgDwellDays: 3.2 },
  { destCode: "Annaba", month: 11, avgDwellDays: 2.7 },
  { destCode: "Annaba", month: 12, avgDwellDays: 3.3 },
];
