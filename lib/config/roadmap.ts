import type { RoadmapItem } from "./types";

export const ROADMAP: RoadmapItem[] = [
  {
    id: "valencia-pcs",
    title: "Valenciaport PCS event feeds",
    description:
      "Direct integration with the Port of Valencia's Port Community System for real-time container and vessel status events, replacing manual status polling.",
    targetDate: "2027",
    status: "planned",
  },
  {
    id: "carrier-apis",
    title: "Carrier schedule & booking APIs",
    description:
      "Live sailing schedules and direct e-booking with corridor carriers, removing the manual booking step between quote and confirmed space.",
    targetDate: "2027",
    status: "planned",
  },
  {
    id: "emissions-methodology",
    title: "Emissions calculation methodology",
    description:
      "Standard emission-factor methodology applied per shipment, producing an auditable CO2e figure as a published, contractual KPI.",
    targetDate: "2027–28",
    status: "planned",
  },
  {
    id: "iot-tracking",
    title: "IoT tracker ingestion",
    description:
      "Off-the-shelf IoT container/pallet trackers ingested into the platform as a premium visibility tier — not a built-in-house hardware product.",
    targetDate: "2028",
    status: "planned",
  },
  {
    id: "algerian-customs-interfaces",
    title: "Algerian customs system interfaces",
    description:
      "Direct system-to-system interfaces with Algerian customs, integrated as they become available to operators.",
    targetDate: "Opportunistic",
    status: "opportunistic",
  },
];
