"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Loader2, AlertCircle, Package, Ship, CheckCircle2, Clock } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import type { Shipment } from "@/lib/shipments";
import { DEMO_SHIPMENTS, STATUS_LABELS } from "@/lib/shipments";

const STATUS_COLORS: Record<string, string> = {
  booked: "bg-slate-100 text-slate-600",
  docs_pending: "bg-amber-100 text-amber-700",
  customs_export: "bg-amber-100 text-amber-700",
  at_port: "bg-blue-100 text-blue-700",
  on_vessel: "bg-blue-100 text-blue-700",
  customs_import: "bg-purple-100 text-purple-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-emerald-100 text-emerald-700",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        STATUS_COLORS[status] ?? "bg-slate-100 text-slate-600"
      )}
    >
      {STATUS_LABELS[status as keyof typeof STATUS_LABELS] ?? status}
    </span>
  );
}

type TrackT = ReturnType<typeof useTranslations>;

function ShipmentTimeline({ shipment, tt }: { shipment: Shipment; tt: TrackT }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-sm text-slate-400 mb-1">{shipment.ref}</div>
          <h3 className="text-xl font-bold text-slate-900">{shipment.cargoDescription}</h3>
          <div className="text-sm text-slate-500 mt-1">
            {shipment.origin} → {shipment.destination}
          </div>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 pb-6 border-b border-slate-100">
        <div>
          <div className="text-xs text-slate-400 uppercase font-semibold tracking-wide">{tt("volume")}</div>
          <div className="text-sm font-semibold text-slate-900 mt-1">{shipment.cbm} CBM</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 uppercase font-semibold tracking-wide">{tt("weight")}</div>
          <div className="text-sm font-semibold text-slate-900 mt-1">
            {shipment.weightKg.toLocaleString()} kg
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 uppercase font-semibold tracking-wide">{tt("vessel")}</div>
          <div className="text-sm font-semibold text-slate-900 mt-1">
            {shipment.vessel ?? "—"} {shipment.voyageNo ? `/ ${shipment.voyageNo}` : ""}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 uppercase font-semibold tracking-wide">{tt("eta")}</div>
          <div className="text-sm font-semibold text-slate-900 mt-1">{formatDate(shipment.eta)}</div>
        </div>
      </div>

      <div className="space-y-0">
        {shipment.events.map((event, i) => (
          <div key={event.status} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10",
                  event.completed
                    ? "bg-[var(--orange)] text-white"
                    : event.active
                    ? "bg-[var(--orange)] text-white ring-4 ring-blue-100"
                    : "bg-slate-100 text-slate-400"
                )}
              >
                {event.completed ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : event.active ? (
                  <Clock className="w-4 h-4 animate-pulse" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                )}
              </div>
              {i < shipment.events.length - 1 && (
                <div
                  className={cn(
                    "w-0.5 flex-1 my-1",
                    event.completed ? "bg-[var(--orange)]" : "bg-slate-200"
                  )}
                  style={{ minHeight: "32px" }}
                />
              )}
            </div>
            <div className={cn("pb-6", i === shipment.events.length - 1 && "pb-0")}>
              <div
                className={cn(
                  "text-sm font-semibold",
                  event.active ? "text-[var(--orange)]" : event.completed ? "text-slate-900" : "text-slate-400"
                )}
              >
                {event.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{event.location}</div>
              {event.timestamp && (
                <div className="text-xs text-slate-400 mt-0.5">
                  {new Date(event.timestamp).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShipmentCard({
  shipment,
  onSelect,
  tt,
}: {
  shipment: Shipment;
  onSelect: (s: Shipment) => void;
  tt: TrackT;
}) {
  return (
    <button
      onClick={() => onSelect(shipment)}
      className="w-full text-left bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:border-[var(--orange)] hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="font-mono text-xs text-slate-400">{shipment.ref}</div>
        <StatusBadge status={shipment.status} />
      </div>
      <div className="font-semibold text-slate-900 text-sm mb-1">{shipment.cargoDescription}</div>
      <div className="text-xs text-slate-500">
        {shipment.origin} → {shipment.destination}
      </div>
      <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Package className="w-3 h-3" />
          {shipment.cbm} CBM
        </span>
        {shipment.vessel && (
          <span className="flex items-center gap-1">
            <Ship className="w-3 h-3" />
            {shipment.vessel}
          </span>
        )}
        <span>{tt("eta")} {formatDate(shipment.eta)}</span>
      </div>
    </button>
  );
}

export default function TrackingDashboard() {
  const tt = useTranslations("track");

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<Shipment | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<Shipment | null>(null);

  const activeShipment = searched ?? selectedDemo;

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setError(null);
    setSearched(null);
    setSelectedDemo(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/track?ref=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(`${tt("notFound")} ${query.trim()}`);
      } else {
        setSearched(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tt("searchPlaceholder")}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-[var(--orange)] text-white font-semibold px-5 py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {tt("trackButton")}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {activeShipment && <ShipmentTimeline shipment={activeShipment} tt={tt} />}

      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
          {activeShipment ? tt("otherShipments") : tt("activeShipments")}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_SHIPMENTS.filter((s) => s.id !== activeShipment?.id).map((s) => (
            <ShipmentCard key={s.id} shipment={s} onSelect={setSelectedDemo} tt={tt} />
          ))}
        </div>
      </div>
    </div>
  );
}
