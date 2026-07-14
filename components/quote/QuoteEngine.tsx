"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Info,
} from "lucide-react";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { ORIGIN_PORTS, DESTINATION_PORTS, type QuoteInput } from "@/lib/pricing";
import type { QuoteBreakdown } from "@/lib/pricing";
import { getHaulageZonesForOrigin } from "@/lib/config/haulage";
import { getClearanceEstimate, CARGO_TYPE_HS_CODE } from "@/lib/intelligence";

type CargoType = "general" | "hazmat" | "refrigerated" | "oversized";
type ServiceLevel = "standard" | "express";

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-transparent"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: number;
  max?: number;
  step?: number;
  unit: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step ?? 0.1}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-16 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-transparent"
        />
        <span className="absolute right-4 top-3 text-sm text-slate-400">{unit}</span>
      </div>
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function BreakdownRow({
  label,
  amount,
  highlight,
}: {
  label: string;
  amount: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex justify-between items-center py-2.5",
        highlight ? "font-bold text-slate-900" : "text-slate-600"
      )}
    >
      <span className="text-sm">{label}</span>
      <span className={cn("font-mono text-sm", highlight && "text-lg text-[var(--orange)]")}>
        {formatCurrency(amount)}
      </span>
    </div>
  );
}

export default function QuoteEngine() {
  const qt = useTranslations("quote");
  const cargoTypes = qt.raw("cargoTypes") as { value: string; label: string; note: string }[];
  const serviceLevels = qt.raw("serviceLevels") as { value: string; label: string; sub: string }[];

  const [origin, setOrigin] = useState("Valencia");
  const [destination, setDestination] = useState("Algiers");
  const [cbm, setCbm] = useState("5");
  const [weightKg, setWeightKg] = useState("1500");
  const [cargoType, setCargoType] = useState<CargoType>("general");
  const [serviceLevel, setServiceLevel] = useState<ServiceLevel>("standard");
  const [customsHandling, setCustomsHandling] = useState(true);

  const haulageZones = getHaulageZonesForOrigin(origin);
  const [pickupZoneId, setPickupZoneId] = useState(haulageZones[0]?.id ?? "");

  function handleOriginChange(value: string) {
    setOrigin(value);
    const zones = getHaulageZonesForOrigin(value);
    setPickupZoneId(zones[0]?.id ?? "");
  }

  const [quote, setQuote] = useState<QuoteBreakdown | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setQuote(null);
    setLoading(true);

    const input: QuoteInput = {
      originPort: origin,
      destinationPort: destination,
      cbm: parseFloat(cbm),
      weightKg: parseFloat(weightKg),
      cargoType,
      serviceLevel,
      customsHandling,
      pickupZoneId,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Quote failed. Please try again.");
      } else {
        setQuote(data);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">{qt("routeSection")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label={qt("originLabel")} value={origin} onChange={handleOriginChange} options={ORIGIN_PORTS} />
            <Select label={qt("destinationLabel")} value={destination} onChange={setDestination} options={DESTINATION_PORTS} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">{qt("haulageSection")}</h2>
          <Select
            label={qt("pickupZoneLabel")}
            value={pickupZoneId}
            onChange={setPickupZoneId}
            options={haulageZones.map((z) => ({ value: z.id, label: z.label }))}
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">{qt("dimensionsSection")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <NumberInput
              label={qt("volumeLabel")}
              value={cbm}
              onChange={setCbm}
              min={0.1}
              max={33}
              step={0.1}
              unit="CBM"
              hint={qt("volumeHint")}
            />
            <NumberInput
              label={qt("weightLabel")}
              value={weightKg}
              onChange={setWeightKg}
              min={0}
              max={28000}
              step={10}
              unit="kg"
              hint={qt("weightHint")}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">{qt("cargoSection")}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {cargoTypes.map((ct) => (
              <label
                key={ct.value}
                className={cn(
                  "flex flex-col gap-0.5 p-4 rounded-xl border cursor-pointer transition-colors",
                  cargoType === ct.value
                    ? "border-[var(--orange)] bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <input
                  type="radio"
                  name="cargoType"
                  value={ct.value}
                  checked={cargoType === ct.value}
                  onChange={() => setCargoType(ct.value as CargoType)}
                  className="sr-only"
                />
                <span className="text-sm font-semibold text-slate-900">{ct.label}</span>
                <span className="text-xs text-slate-500">{ct.note}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">{qt("serviceLevelSection")}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {serviceLevels.map((sl) => (
              <label
                key={sl.value}
                className={cn(
                  "flex flex-col gap-0.5 p-4 rounded-xl border cursor-pointer transition-colors",
                  serviceLevel === sl.value
                    ? "border-[var(--orange)] bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <input
                  type="radio"
                  name="serviceLevel"
                  value={sl.value}
                  checked={serviceLevel === sl.value}
                  onChange={() => setServiceLevel(sl.value as ServiceLevel)}
                  className="sr-only"
                />
                <span className="text-sm font-semibold text-slate-900">{sl.label}</span>
                <span className="text-xs text-slate-500">{sl.sub}</span>
              </label>
            ))}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={customsHandling}
              onChange={(e) => setCustomsHandling(e.target.checked)}
              className="mt-0.5 rounded accent-[var(--orange)]"
            />
            <div>
              <div className="text-sm font-semibold text-slate-900">{qt("customsCheckbox")}</div>
              <div className="text-xs text-slate-500 mt-0.5">{qt("customsCheckboxSub")}</div>
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[var(--orange)] text-white font-bold py-4 rounded-xl hover:bg-[#1d4ed8] transition-colors disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {qt("calculating")}
            </>
          ) : (
            <>
              {qt("submitButton")}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Quote result */}
      <div className="lg:col-span-2">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {!quote && !error && !loading && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full flex flex-col items-center justify-center text-center gap-3 min-h-48">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <Info className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm">
              {qt("emptyState")}{" "}
              <strong className="text-slate-700">{qt("emptyStateBold")}</strong>{" "}
              {qt("emptyStateSub")}
            </p>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3 animate-pulse">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-8 bg-slate-100 rounded-lg" />
            ))}
          </div>
        )}

        {quote && !loading && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-20">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-slate-900">{qt("quoteReady")}</span>
            </div>
            <div className="text-xs text-slate-400 font-mono mb-5">
              {quote.quoteRef} · {qt("validUntil")} {formatDate(quote.validUntil)}
            </div>

            {quote.restrictions && quote.restrictions.length > 0 && (
              <div className="mb-5 space-y-2">
                {quote.restrictions.map((r, i) => (
                  <div
                    key={i}
                    className="flex gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">{r.note}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="divide-y divide-slate-100">
              {quote.originHaulage > 0 && (
                <BreakdownRow label={qt("breakdown.haulage")} amount={quote.originHaulage} />
              )}
              <BreakdownRow label={qt("breakdown.ocean")} amount={quote.oceanFreight} />
              <BreakdownRow label={qt("breakdown.baf")} amount={quote.bunkerAdjustment} />
              <BreakdownRow label={qt("breakdown.caf")} amount={quote.currencyAdjustment} />
              <BreakdownRow label={qt("breakdown.port")} amount={quote.portHandling} />
              <BreakdownRow label={qt("breakdown.docs")} amount={quote.documentation} />
              {quote.customsClearance > 0 && (
                <div>
                  <BreakdownRow label={qt("breakdown.customs")} amount={quote.customsClearance} />
                  <p className="text-xs text-slate-400 -mt-2 pb-2">
                    {quote.customsClearanceDzd.toLocaleString()} DZD {qt("fxNote")} · 1 EUR ≈ {quote.fxRateUsed} DZD
                  </p>
                </div>
              )}
              <div className="pt-2">
                <BreakdownRow label={qt("breakdown.total")} amount={quote.totalEur} highlight />
              </div>
            </div>

            <div className="mt-4 bg-slate-50 rounded-xl p-3 text-xs text-slate-500">
              {qt("transitDays")}:{" "}
              <strong className="text-slate-700">{quote.estimatedTransitDays} {qt("transitSub")}</strong>
            </div>

            {(() => {
              const estimate = getClearanceEstimate(CARGO_TYPE_HS_CODE[cargoType]);
              if (!estimate) return null;
              return (
                <div className="mt-2 bg-slate-50 rounded-xl p-3 text-xs text-slate-500">
                  {qt("clearanceEstimate")}:{" "}
                  <strong className="text-slate-700">
                    {estimate.avgDays} {qt("daysUnit")} ({estimate.channel})
                  </strong>{" "}
                  <span className="text-slate-400">
                    — {qt("clearanceEstimateBasis", { n: estimate.sampleSize })}
                  </span>
                </div>
              );
            })()}

            <Link
              href={`/book?quote=${quote.quoteRef}&total=${quote.totalEur}&origin=${origin}&destination=${destination}`}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-[var(--orange)] text-white font-bold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm"
            >
              {qt("bookButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
