import type { FxRate } from "./types";

// Destination-side charges (Algerian customs/DGSN fees) are natively
// denominated in DZD, not EUR — this is what "destination charges in a
// different currency regime" means concretely. The quote engine prices them
// in DZD and converts using this rate, rather than hiding the conversion
// inside a single flat EUR number.
export const FX_RATES: FxRate[] = [
  { pair: "EUR_DZD", rate: 147.5, asOf: "2026-07-01", source: "Banque d'Algérie reference rate (indicative)" },
];

export function getFxRate(pair: string): FxRate {
  const found = FX_RATES.find((r) => r.pair === pair);
  if (!found) throw new Error(`No FX rate configured for pair: ${pair}`);
  return found;
}
