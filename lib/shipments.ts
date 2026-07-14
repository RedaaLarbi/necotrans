export type ShipmentStatus =
  | "booked"
  | "docs_pending"
  | "customs_export"
  | "at_port"
  | "on_vessel"
  | "customs_import"
  | "out_for_delivery"
  | "delivered";

export interface ShipmentEvent {
  status: ShipmentStatus;
  label: string;
  location: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
}

export interface Shipment {
  id: string;
  ref: string;
  origin: string;
  destination: string;
  cbm: number;
  weightKg: number;
  cargoDescription: string;
  status: ShipmentStatus;
  vessel?: string;
  voyageNo?: string;
  eta: string;
  etd: string;
  events: ShipmentEvent[];
}

const STATUS_SEQUENCE: ShipmentStatus[] = [
  "booked",
  "docs_pending",
  "customs_export",
  "at_port",
  "on_vessel",
  "customs_import",
  "out_for_delivery",
  "delivered",
];

const STATUS_LABELS: Record<ShipmentStatus, string> = {
  booked: "Booking Confirmed",
  docs_pending: "Documentation Processing",
  customs_export: "Spanish Customs Clearance",
  at_port: "At Valencia Port",
  on_vessel: "On Vessel",
  customs_import: "Algerian Customs Clearance",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

// Demo shipments for the tracking page
export const DEMO_SHIPMENTS: Shipment[] = [
  {
    id: "1",
    ref: "NCT-2024-VLC-0047",
    origin: "Valencia, Spain",
    destination: "Algiers, Algeria",
    cbm: 8.4,
    weightKg: 2100,
    cargoDescription: "Industrial machinery parts",
    status: "on_vessel",
    vessel: "MSC RANIA",
    voyageNo: "AX241W",
    etd: "2024-12-10T06:00:00Z",
    eta: "2024-12-17T14:00:00Z",
    events: buildEvents("on_vessel", "2024-12-08"),
  },
  {
    id: "2",
    ref: "NCT-2024-VLC-0051",
    origin: "Valencia, Spain",
    destination: "Oran, Algeria",
    cbm: 3.2,
    weightKg: 950,
    cargoDescription: "Ceramic tiles",
    status: "customs_import",
    vessel: "BOUZAREAH",
    voyageNo: "OA244E",
    etd: "2024-12-05T09:00:00Z",
    eta: "2024-12-14T10:00:00Z",
    events: buildEvents("customs_import", "2024-12-03"),
  },
  {
    id: "3",
    ref: "NCT-2024-BCN-0022",
    origin: "Barcelona, Spain",
    destination: "Algiers, Algeria",
    cbm: 12.6,
    weightKg: 4800,
    cargoDescription: "Automotive components",
    status: "delivered",
    vessel: "EL DJAZAIR II",
    voyageNo: "BC239W",
    etd: "2024-11-28T07:00:00Z",
    eta: "2024-12-06T09:00:00Z",
    events: buildEvents("delivered", "2024-11-25"),
  },
];

function buildEvents(currentStatus: ShipmentStatus, startDate: string): ShipmentEvent[] {
  const currentIndex = STATUS_SEQUENCE.indexOf(currentStatus);
  const start = new Date(startDate);

  return STATUS_SEQUENCE.map((status, i) => {
    const eventDate = new Date(start);
    eventDate.setDate(start.getDate() + i);

    return {
      status,
      label: STATUS_LABELS[status],
      location: getLocationForStatus(status),
      timestamp: i <= currentIndex ? eventDate.toISOString() : "",
      completed: i < currentIndex,
      active: i === currentIndex,
    };
  });
}

function getLocationForStatus(status: ShipmentStatus): string {
  const locations: Record<ShipmentStatus, string> = {
    booked: "Necotrans Platform",
    docs_pending: "Necotrans Document Hub",
    customs_export: "Valencia Port — AEAT",
    at_port: "Valencia Container Terminal",
    on_vessel: "Mediterranean Sea",
    customs_import: "Algiers Port — DGSN",
    out_for_delivery: "Algiers",
    delivered: "Final Destination",
  };
  return locations[status];
}

export function getShipmentByRef(ref: string): Shipment | undefined {
  return DEMO_SHIPMENTS.find(
    (s) => s.ref.toLowerCase() === ref.toLowerCase()
  );
}

export { STATUS_LABELS };
