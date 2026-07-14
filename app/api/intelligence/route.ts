import { NextRequest, NextResponse } from "next/server";
import { getClearanceStatsByHsCode, getTopDocumentErrors, getSeasonalCongestion } from "@/lib/intelligence";

export async function GET(req: NextRequest) {
  const destCode = req.nextUrl.searchParams.get("destCode") ?? "Algiers";

  return NextResponse.json({
    clearanceStats: getClearanceStatsByHsCode(),
    topDocumentErrors: getTopDocumentErrors(),
    seasonalCongestion: getSeasonalCongestion(destCode),
  });
}
