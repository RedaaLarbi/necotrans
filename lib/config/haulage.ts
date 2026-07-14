import type { HaulageZone } from "./types";

// Origin haulage matrix: pre-carriage cost from the shipper's door to the
// origin port, tiered by distance zone. The "port area" tier is zero-cost —
// it's also the quote form's default, so a shipper self-delivering to the
// port pays no extra haulage.
export const HAULAGE_ZONES: HaulageZone[] = [
  { id: "vlc-port", originCode: "Valencia", label: "Port area (self-delivery, no haulage)", flatFee: 0, perCbmFee: 0 },
  { id: "vlc-local", originCode: "Valencia", label: "Local pickup — Valencia province (<50 km)", flatFee: 45, perCbmFee: 3 },
  { id: "vlc-regional", originCode: "Valencia", label: "Regional pickup — Comunidad Valenciana (50–150 km)", flatFee: 95, perCbmFee: 5 },
  { id: "vlc-national", originCode: "Valencia", label: "National pickup — mainland Spain (150+ km)", flatFee: 180, perCbmFee: 8 },

  { id: "bcn-port", originCode: "Barcelona", label: "Port area (self-delivery, no haulage)", flatFee: 0, perCbmFee: 0 },
  { id: "bcn-local", originCode: "Barcelona", label: "Local pickup — Barcelona province (<50 km)", flatFee: 48, perCbmFee: 3 },
  { id: "bcn-regional", originCode: "Barcelona", label: "Regional pickup — Catalunya (50–150 km)", flatFee: 98, perCbmFee: 5 },
  { id: "bcn-national", originCode: "Barcelona", label: "National pickup — mainland Spain (150+ km)", flatFee: 185, perCbmFee: 8 },
];

export function getHaulageZonesForOrigin(originCode: string): HaulageZone[] {
  return HAULAGE_ZONES.filter((z) => z.originCode === originCode);
}

export function getHaulageZone(id: string | undefined, originCode: string): HaulageZone {
  const zones = getHaulageZonesForOrigin(originCode);
  const found = id ? zones.find((z) => z.id === id) : undefined;
  return found ?? zones.find((z) => z.id.endsWith("-port")) ?? { id: "default-port", originCode, label: "Port area (self-delivery, no haulage)", flatFee: 0, perCbmFee: 0 };
}
