import {
  CLEARANCE_RECORDS,
  DOCUMENT_ERROR_RECORDS,
  PORT_CONGESTION_RECORDS,
  type InspectionChannel,
} from "@/lib/data/corridor-intelligence";

export interface ClearanceStat {
  hsCode: string;
  hsDescription: string;
  channel: InspectionChannel;
  avgDays: number;
  sampleSize: number;
}

export interface DocumentErrorStat {
  category: string;
  label: string;
  count: number;
  pctOfTotal: number;
}

export interface CongestionPoint {
  month: number;
  avgDwellDays: number;
}

export function getClearanceStatsByHsCode(): ClearanceStat[] {
  const groups = new Map<string, { hsCode: string; hsDescription: string; channel: InspectionChannel; days: number[] }>();

  for (const r of CLEARANCE_RECORDS) {
    const key = `${r.hsCode}-${r.inspectionChannel}`;
    if (!groups.has(key)) {
      groups.set(key, { hsCode: r.hsCode, hsDescription: r.hsDescription, channel: r.inspectionChannel, days: [] });
    }
    groups.get(key)!.days.push(r.clearanceDays);
  }

  return Array.from(groups.values())
    .map((g) => ({
      hsCode: g.hsCode,
      hsDescription: g.hsDescription,
      channel: g.channel,
      avgDays: Math.round((g.days.reduce((a, b) => a + b, 0) / g.days.length) * 10) / 10,
      sampleSize: g.days.length,
    }))
    .sort((a, b) => a.hsCode.localeCompare(b.hsCode) || a.channel.localeCompare(b.channel));
}

export function getTopDocumentErrors(limit = 5): DocumentErrorStat[] {
  const totals = new Map<string, { label: string; count: number }>();
  let grandTotal = 0;

  for (const r of DOCUMENT_ERROR_RECORDS) {
    grandTotal += r.count;
    if (!totals.has(r.category)) totals.set(r.category, { label: r.label, count: 0 });
    totals.get(r.category)!.count += r.count;
  }

  return Array.from(totals.entries())
    .map(([category, { label, count }]) => ({
      category,
      label,
      count,
      pctOfTotal: Math.round((count / grandTotal) * 1000) / 10,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getSeasonalCongestion(destCode: string): CongestionPoint[] {
  return PORT_CONGESTION_RECORDS
    .filter((r) => r.destCode === destCode)
    .sort((a, b) => a.month - b.month)
    .map((r) => ({ month: r.month, avgDwellDays: r.avgDwellDays }));
}

export function getClearanceEstimate(hsCode: string): { avgDays: number; channel: InspectionChannel; sampleSize: number } | undefined {
  const records = CLEARANCE_RECORDS.filter((r) => r.hsCode === hsCode);
  if (records.length === 0) return undefined;

  // Most representative channel for this HS code = the one with the most samples.
  const byChannel = new Map<InspectionChannel, number[]>();
  for (const r of records) {
    if (!byChannel.has(r.inspectionChannel)) byChannel.set(r.inspectionChannel, []);
    byChannel.get(r.inspectionChannel)!.push(r.clearanceDays);
  }
  const [channel, days] = Array.from(byChannel.entries()).sort((a, b) => b[1].length - a[1].length)[0];

  return {
    avgDays: Math.round((days.reduce((a, b) => a + b, 0) / days.length) * 10) / 10,
    channel,
    sampleSize: records.length,
  };
}

// Representative HS code per cargo-type bucket, for the quote engine's
// informational "typical clearance time" line — the four buckets used across
// the quote form and DocEngine are coarser than real HS codes, so this picks
// one illustrative code per bucket.
export const CARGO_TYPE_HS_CODE: Record<string, string> = {
  general: "8431.49",
  hazmat: "2811.19",
  refrigerated: "0402.10",
  oversized: "8429.51",
};
