import { NextRequest, NextResponse } from "next/server";
import { calculateQuote, type QuoteInput } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  try {
    const body: QuoteInput = await req.json();

    if (!body.originPort || !body.destinationPort || !body.cbm || !body.weightKg) {
      return NextResponse.json(
        { error: "Missing required fields: originPort, destinationPort, cbm, weightKg" },
        { status: 400 }
      );
    }

    if (body.cbm <= 0 || body.cbm > 33) {
      return NextResponse.json(
        { error: "CBM must be between 0.1 and 33 (full container)" },
        { status: 400 }
      );
    }

    // Simulate slight latency of a real rate engine
    await new Promise((r) => setTimeout(r, 600));

    const quote = calculateQuote(body);
    return NextResponse.json(quote);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
