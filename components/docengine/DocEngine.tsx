"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Info,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DESTINATION_PORTS } from "@/lib/pricing";
import type { DocEngineInput, DocEngineResult } from "@/lib/docengine";
import { getDocumentTemplates } from "@/lib/config/corridors";

type CargoType = "general" | "hazmat" | "refrigerated" | "oversized";

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

function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-transparent"
      />
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  unit,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={0}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 pr-14 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-transparent"
        />
        <span className="absolute right-4 top-3 text-sm text-slate-400">{unit}</span>
      </div>
    </div>
  );
}

const STATUS_STYLES: Record<DocEngineResult["overallStatus"], { bg: string; border: string; text: string; icon: typeof CheckCircle }> = {
  ready: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", icon: CheckCircle },
  needs_attention: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", icon: AlertTriangle },
  blocked: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", icon: XCircle },
};

const CHECK_ICON: Record<"pass" | "fail" | "warning", { icon: typeof CheckCircle; color: string }> = {
  pass: { icon: CheckCircle, color: "text-emerald-500" },
  warning: { icon: AlertTriangle, color: "text-amber-500" },
  fail: { icon: XCircle, color: "text-red-500" },
};

export default function DocEngine() {
  const dt = useTranslations("docengine");

  const [destination, setDestination] = useState("Algiers");
  const [cargoType, setCargoType] = useState<CargoType>("general");
  const [declaredValueEur, setDeclaredValueEur] = useState("4200");

  const [importerName, setImporterName] = useState("");
  const [importerNif, setImporterNif] = useState("");
  const [domiciliationRef, setDomiciliationRef] = useState("");
  const [domiciliationBank, setDomiciliationBank] = useState("");
  const [algexRef, setAlgexRef] = useState("");

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceValue, setInvoiceValue] = useState("4200");
  const [invoiceImporterName, setInvoiceImporterName] = useState("");
  const [packingListNumber, setPackingListNumber] = useState("");
  const [packingListValue, setPackingListValue] = useState("4200");
  const [certNumber, setCertNumber] = useState("");
  const [certLegalized, setCertLegalized] = useState(false);
  const [duaDomiciliationRef, setDuaDomiciliationRef] = useState("");
  const [duaImporterNif, setDuaImporterNif] = useState("");

  const [result, setResult] = useState<DocEngineResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    const input: DocEngineInput = {
      destinationPort: destination,
      cargoType,
      declaredValueEur: parseFloat(declaredValueEur) || 0,
      importer: { name: importerName, nif: importerNif },
      domiciliationBancaire: { reference: domiciliationRef, bank: domiciliationBank },
      algexRef: algexRef || undefined,
      documents: {
        commercialInvoice: {
          number: invoiceNumber,
          value: parseFloat(invoiceValue) || 0,
          importerName: invoiceImporterName,
        },
        packingList: { number: packingListNumber, value: parseFloat(packingListValue) || 0 },
        certificateOfOrigin: certNumber ? { number: certNumber, legalized: certLegalized } : undefined,
        dua: duaDomiciliationRef || duaImporterNif
          ? { domiciliationRef: duaDomiciliationRef, importerNif: duaImporterNif }
          : undefined,
      },
    };

    try {
      const res = await fetch("/api/docengine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Validation failed. Please try again.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const requiredDocs = result ? getDocumentTemplates(result.requiredDocumentIds) : [];

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">{dt("shipmentSection")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label={dt("destinationLabel")} value={destination} onChange={setDestination} options={DESTINATION_PORTS} />
            <Select
              label={dt("cargoLabel")}
              value={cargoType}
              onChange={(v) => setCargoType(v as CargoType)}
              options={[
                { value: "general", label: "General cargo" },
                { value: "hazmat", label: "Hazardous materials" },
                { value: "refrigerated", label: "Temperature-controlled" },
                { value: "oversized", label: "Oversized / out-of-gauge" },
              ]}
            />
          </div>
          <NumberField label={dt("declaredValueLabel")} value={declaredValueEur} onChange={setDeclaredValueEur} unit="EUR" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">{dt("importerSection")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField label={dt("importerNameLabel")} value={importerName} onChange={setImporterName} placeholder="Sarl Importation Est" />
            <TextField label={dt("importerNifLabel")} value={importerNif} onChange={setImporterNif} placeholder="000016123456789" />
            <TextField label={dt("domiciliationRefLabel")} value={domiciliationRef} onChange={setDomiciliationRef} placeholder="DOM-2026-000123" />
            <TextField label={dt("domiciliationBankLabel")} value={domiciliationBank} onChange={setDomiciliationBank} placeholder="BEA — Banque Extérieure d'Algérie" />
          </div>
          {(cargoType === "hazmat" || cargoType === "oversized") && (
            <TextField label={dt("algexRefLabel")} value={algexRef} onChange={setAlgexRef} placeholder="ALGEX-000456" hint={dt("algexRefHint")} />
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">{dt("documentsSection")}</h2>
          <p className="text-xs text-slate-500 -mt-2">{dt("documentsSub")}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <TextField label={dt("invoiceNumberLabel")} value={invoiceNumber} onChange={setInvoiceNumber} placeholder="INV-2026-0417" />
            <NumberField label={dt("invoiceValueLabel")} value={invoiceValue} onChange={setInvoiceValue} unit="EUR" />
            <TextField label={dt("invoiceImporterNameLabel")} value={invoiceImporterName} onChange={setInvoiceImporterName} placeholder="Sarl Importation Est" />
            <TextField label={dt("packingListNumberLabel")} value={packingListNumber} onChange={setPackingListNumber} placeholder="PL-2026-0417" />
            <NumberField label={dt("packingListValueLabel")} value={packingListValue} onChange={setPackingListValue} unit="EUR" />
            <TextField label={dt("certNumberLabel")} value={certNumber} onChange={setCertNumber} placeholder="EUR1-000789" />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={certLegalized}
              onChange={(e) => setCertLegalized(e.target.checked)}
              className="mt-0.5 rounded accent-[var(--orange)]"
            />
            <div className="text-sm font-semibold text-slate-900">{dt("certLegalizedCheckbox")}</div>
          </label>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3 mt-4">{dt("duaSectionLabel")}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <TextField label={dt("duaDomiciliationRefLabel")} value={duaDomiciliationRef} onChange={setDuaDomiciliationRef} placeholder="DOM-2026-000123" />
              <TextField label={dt("duaImporterNifLabel")} value={duaImporterNif} onChange={setDuaImporterNif} placeholder="000016123456789" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[var(--orange)] text-white font-bold py-4 rounded-xl hover:bg-[#1d4ed8] transition-colors disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {dt("validating")}
            </>
          ) : (
            <>
              {dt("submitButton")}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Results */}
      <div className="lg:col-span-2">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex gap-3">
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {!result && !error && !loading && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 h-full flex flex-col items-center justify-center text-center gap-3 min-h-48">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <Info className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm">
              {dt("emptyState")}{" "}
              <strong className="text-slate-700">{dt("emptyStateBold")}</strong>{" "}
              {dt("emptyStateSub")}
            </p>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-8 bg-slate-100 rounded-lg" />
            ))}
          </div>
        )}

        {result && !loading && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-20">
            {(() => {
              const s = STATUS_STYLES[result.overallStatus];
              const StatusIcon = s.icon;
              const label =
                result.overallStatus === "ready"
                  ? dt("statusReady")
                  : result.overallStatus === "needs_attention"
                    ? dt("statusNeedsAttention")
                    : dt("statusBlocked");
              return (
                <div className={cn("flex items-center gap-2 mb-5 p-3 rounded-xl border", s.bg, s.border, s.text)}>
                  <StatusIcon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-semibold text-sm">{label}</span>
                </div>
              );
            })()}

            <div className="space-y-2">
              {result.checks.map((check, i) => {
                const c = CHECK_ICON[check.status];
                const Icon = c.icon;
                return (
                  <div key={`${check.ruleId}-${i}`} className="flex gap-2.5 py-2 border-b border-slate-50 last:border-0">
                    <Icon className={cn("w-4 h-4 flex-shrink-0 mt-0.5", c.color)} />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{check.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{check.message}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {requiredDocs.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">{dt("requiredDocsHeading")}</p>
                <div className="space-y-2">
                  {requiredDocs.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2.5 text-sm">
                      <FileText className="w-4 h-4 text-[var(--orange)] flex-shrink-0" />
                      <span className="text-slate-700">{doc.name}</span>
                      <span className="text-xs text-slate-400 ml-auto uppercase">{doc.languages.join(" / ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
