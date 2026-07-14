import { NextRequest, NextResponse } from "next/server";
import { validateDocuments, type DocEngineInput } from "@/lib/docengine";

export async function POST(req: NextRequest) {
  try {
    const body: DocEngineInput = await req.json();

    if (!body.destinationPort || !body.cargoType || !body.declaredValueEur) {
      return NextResponse.json(
        { error: "Missing required fields: destinationPort, cargoType, declaredValueEur" },
        { status: 400 }
      );
    }

    if (!body.importer?.name || !body.documents?.commercialInvoice || !body.documents?.packingList) {
      return NextResponse.json(
        { error: "Missing required fields: importer.name, documents.commercialInvoice, documents.packingList" },
        { status: 400 }
      );
    }

    // Simulate slight latency of a real validation engine
    await new Promise((r) => setTimeout(r, 500));

    const result = validateDocuments(body);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
