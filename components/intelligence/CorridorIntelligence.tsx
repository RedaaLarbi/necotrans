"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Clock, Package, FileWarning, Calendar, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DESTINATION_PORTS } from "@/lib/pricing";
import type { ClearanceStat, DocumentErrorStat, CongestionPoint } from "@/lib/intelligence";

const CHANNEL_COLOR: Record<string, string> = {
  green: "bg-emerald-100 text-emerald-700",
  orange: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
};

interface IntelligenceData {
  clearanceStats: ClearanceStat[];
  topDocumentErrors: DocumentErrorStat[];
  seasonalCongestion: CongestionPoint[];
}

export default function CorridorIntelligence() {
  const it = useTranslations("intelligence");
  const monthNames = it.raw("monthNames") as string[];

  const [destination, setDestination] = useState("Algiers");
  const [data, setData] = useState<IntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const res = await fetch(`/api/intelligence?destCode=${encodeURIComponent(destination)}`);
      const json = await res.json();
      if (!cancelled) {
        setData(json);
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [destination]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  const overallAvgDays =
    Math.round(
      (data.clearanceStats.reduce((sum, s) => sum + s.avgDays * s.sampleSize, 0) /
        data.clearanceStats.reduce((sum, s) => sum + s.sampleSize, 0)) *
        10
    ) / 10;
  const totalSample = data.clearanceStats.reduce((sum, s) => sum + s.sampleSize, 0);
  const maxCongestion = Math.max(...data.seasonalCongestion.map((c) => c.avgDwellDays));
  const maxErrorCount = Math.max(...data.topDocumentErrors.map((e) => e.count));

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--orange)]/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-[var(--orange)]" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wide">{it("avgClearanceLabel")}</div>
            <div className="text-2xl font-bold text-slate-900">{overallAvgDays} days</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6 text-[var(--brand)]" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase font-semibold tracking-wide">{it("sampleSizeLabel")}</div>
            <div className="text-2xl font-bold text-slate-900">{totalSample}</div>
          </div>
        </div>
      </div>

      {/* Clearance stats table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="font-semibold text-slate-900 mb-4">{it("clearanceTableHeading")}</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
              <th className="pb-2 font-semibold">{it("hsCodeColumn")}</th>
              <th className="pb-2 font-semibold">{it("channelColumn")}</th>
              <th className="pb-2 font-semibold text-right">{it("avgDaysColumn")}</th>
              <th className="pb-2 font-semibold text-right">{it("sampleColumn")}</th>
            </tr>
          </thead>
          <tbody>
            {data.clearanceStats.map((s, i) => (
              <tr key={i} className="border-b border-slate-50 last:border-0">
                <td className="py-2.5">
                  <div className="font-mono text-slate-900">{s.hsCode}</div>
                  <div className="text-xs text-slate-400">{s.hsDescription}</div>
                </td>
                <td className="py-2.5">
                  <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-semibold capitalize", CHANNEL_COLOR[s.channel])}>
                    {s.channel}
                  </span>
                </td>
                <td className="py-2.5 text-right font-semibold text-slate-900">{s.avgDays}</td>
                <td className="py-2.5 text-right text-slate-400">{s.sampleSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top document errors */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileWarning className="w-4 h-4 text-[var(--orange)]" />
            <h2 className="font-semibold text-slate-900">{it("errorRankHeading")}</h2>
          </div>
          <div className="space-y-3">
            {data.topDocumentErrors.map((e) => (
              <div key={e.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700">{e.label}</span>
                  <span className="text-slate-400">{e.count} ({e.pctOfTotal}%)</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--orange)] rounded-full"
                    style={{ width: `${(e.count / maxErrorCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal congestion */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--brand)]" />
              <h2 className="font-semibold text-slate-900">{it("congestionHeading")}</h2>
            </div>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700"
              aria-label={it("congestionDestLabel")}
            >
              {DESTINATION_PORTS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-1.5">
            {data.seasonalCongestion.map((c) => (
              <div key={c.month} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full h-28 flex items-end">
                  <div
                    className="w-full bg-[var(--brand)]/70 rounded-t-sm"
                    style={{ height: `${(c.avgDwellDays / maxCongestion) * 100}%` }}
                    title={`${c.avgDwellDays} days`}
                  />
                </div>
                <span className="text-[10px] text-slate-400">{monthNames[c.month - 1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-5 text-sm text-slate-500 leading-relaxed">{it("explanationNote")}</div>
    </div>
  );
}
