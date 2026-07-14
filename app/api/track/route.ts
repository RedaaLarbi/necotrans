import { NextRequest, NextResponse } from "next/server";
import { getShipmentByRef, DEMO_SHIPMENTS } from "@/lib/shipments";

export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");

  if (!ref) {
    return NextResponse.json(
      { error: "ref query parameter required" },
      { status: 400 }
    );
  }

  const shipment = getShipmentByRef(ref);

  if (!shipment) {
    return NextResponse.json(
      { error: `No shipment found for reference: ${ref}` },
      { status: 404 }
    );
  }

  return NextResponse.json(shipment);
}

export async function POST() {
  // Returns all demo shipments for the dashboard view
  return NextResponse.json(DEMO_SHIPMENTS);
}
