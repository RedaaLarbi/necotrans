"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  CheckCircle2,
  Upload,
  FileText,
  Building2,
  User,
  Mail,
  Phone,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPartner } from "@/lib/config/corridors";

function TextInput({
  label,
  name,
  type = "text",
  placeholder,
  required,
  icon: Icon,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ElementType;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className={cn(
            "w-full bg-white border border-slate-200 rounded-xl py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-transparent",
            Icon ? "pl-10 pr-4" : "px-4"
          )}
        />
      </div>
    </div>
  );
}

function StepIndicator({ current, steps }: { current: number; steps: readonly string[] }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => {
        const id = i + 1;
        return (
          <div key={id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                  id < current
                    ? "bg-[var(--orange)] text-white"
                    : id === current
                    ? "bg-[var(--orange)] text-white ring-4 ring-blue-100"
                    : "bg-slate-100 text-slate-400"
                )}
              >
                {id < current ? <CheckCircle2 className="w-4 h-4" /> : id}
              </div>
              <span
                className={cn(
                  "text-xs mt-1 hidden sm:block",
                  id === current ? "text-[var(--orange)] font-semibold" : "text-slate-400"
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-1 mb-4",
                  id < current ? "bg-[var(--orange)]" : "bg-slate-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BookingFormInner() {
  const bt = useTranslations("book");
  const steps = bt.raw("steps") as string[];
  const docItems = bt.raw("docItems") as { title: string; sub: string; required: boolean }[];
  const docStatuses = bt.raw("docStatuses") as { title: string; body: string; status: string }[];

  const params = useSearchParams();
  const quoteRef = params.get("quote");
  const total = params.get("total");
  const origin = params.get("origin") ?? "Valencia";
  const destination = params.get("destination") ?? "Algiers";

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef] = useState(() => `NCT-BK-${Date.now().toString(36).toUpperCase()}`);

  async function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 1800));
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{bt("successTitle")}</h2>
        <p className="text-slate-500 mb-2">{bt("successSub")}</p>
        <div className="inline-block bg-slate-50 border border-slate-200 rounded-xl px-6 py-3 font-mono text-sm font-semibold text-slate-700 my-6">
          {bookingRef}
        </div>
        <div className="text-sm text-slate-500 mb-8">{bt("successEmailNote")}</div>

        <div className="grid sm:grid-cols-3 gap-4 text-left mb-8">
          {docStatuses.map(({ title, body, status }) => (
            <div key={title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <FileText className="w-4 h-4 text-[var(--orange)]" />
                <span
                  className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full",
                    status === "Ready"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  )}
                >
                  {status}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-900 mb-1">{title}</div>
              <div className="text-xs text-slate-500">{body}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/track"
            className="flex items-center justify-center gap-2 bg-[var(--orange)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1d4ed8] transition-colors text-sm"
          >
            {bt("trackButton")}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/quote"
            className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors text-sm"
          >
            {bt("anotherQuote")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator current={step} steps={steps} />

      {quoteRef && (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[var(--orange)] mb-0.5">
              {bt("fromQuote")} {quoteRef}
            </div>
            <div className="text-sm text-slate-600">
              {origin} → {destination} · {bt("totalRate")}{" "}
              <strong className="text-slate-900">€{Number(total).toLocaleString()}</strong>
            </div>
          </div>
          <Link href="/quote" className="text-xs text-[var(--orange)] hover:underline whitespace-nowrap">
            {bt("editQuote")}
          </Link>
        </div>
      )}

      <form onSubmit={handleNext}>
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-slate-900 text-lg">{bt("shipperSection")}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput label={bt("fields.company")} name="company" icon={Building2} required placeholder="Exportaciones García S.L." />
              <TextInput label={bt("fields.contact")} name="contact" icon={User} required placeholder="María García" />
              <TextInput label={bt("fields.email")} name="email" type="email" icon={Mail} required placeholder="maria@garcia.es" />
              <TextInput label={bt("fields.phone")} name="phone" type="tel" icon={Phone} placeholder="+34 96 123 4567" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{bt("fields.address")}</label>
              <textarea
                name="address"
                rows={3}
                required
                placeholder="Calle Mayor 12, 46001 Valencia, Spain"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-transparent resize-none"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-slate-900 text-lg">{bt("cargoSection")}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput label={bt("fields.description")} name="description" required placeholder="Industrial machinery parts" />
              <TextInput label={bt("fields.hsCode")} name="hsCode" placeholder="8431.49" />
              <TextInput label={bt("fields.packages")} name="packages" type="number" required placeholder="12" />
              <TextInput label={bt("fields.packaging")} name="packaging" placeholder="Pallets / Crates / Boxes" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{bt("fields.consignee")}</label>
              <textarea
                name="consignee"
                rows={3}
                required
                placeholder="Sarl Importation Est, 10 Rue des Aurès, Algiers 16000, Algeria · RC: 123456"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-transparent resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{bt("fields.collectionDate")}</label>
              <input
                type="date"
                name="collectionDate"
                className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[var(--orange)] focus:border-transparent"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-slate-900 text-lg">{bt("docsSection")}</h2>
            <p className="text-sm text-slate-500">{bt("docSub")}</p>

            {docItems.map(({ title, sub, required }) => (
              <label
                key={title}
                className="flex items-center gap-4 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-[var(--orange)] transition-colors"
              >
                <input type="file" className="sr-only" accept=".pdf,.xlsx,.xls,.csv" />
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Upload className="w-4 h-4 text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-900">
                    {title}
                    {required && <span className="text-red-500 ml-1">*</span>}
                  </div>
                  <div className="text-xs text-slate-500">{sub}</div>
                </div>
                <span className="text-xs text-[var(--orange)] font-semibold">{bt("upload")}</span>
              </label>
            ))}

            <div className="bg-[var(--orange)]/5 border border-[var(--orange)]/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-[var(--orange)] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-800">{bt("docAutoNote")}</strong>{" "}
                  {bt("docAutoBody")}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
            <h2 className="font-semibold text-slate-900 text-lg">{bt("confirmSection")}</h2>

            <div className="space-y-3">
              {[
                { label: bt("summaryLabels.route"), value: `${origin} → ${destination}` },
                { label: bt("summaryLabels.service"), value: bt("serviceValue") },
                { label: bt("summaryLabels.customs"), value: bt("customsValue") },
                ...(getPartner(destination)
                  ? [{ label: bt("summaryLabels.clearedBy"), value: getPartner(destination)!.name }]
                  : []),
                ...(total ? [{ label: bt("summaryLabels.totalRate"), value: `€${Number(total).toLocaleString()}` }] : []),
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-sm font-semibold text-slate-900">{value}</span>
                </div>
              ))}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 rounded accent-[var(--orange)]" />
              <span className="text-sm text-slate-600">
                {bt("terms")}{" "}
                <span className="text-[var(--orange)] underline cursor-pointer">{bt("termsLink1")}</span>{" "}
                {bt("termsAnd")}{" "}
                <span className="text-[var(--orange)] underline cursor-pointer">{bt("termsLink2")}</span>
                {bt("termsDot")}
              </span>
            </label>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              {bt("back")}
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 bg-[var(--orange)] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-colors disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {bt("confirming")}
              </>
            ) : step < 4 ? (
              <>
                {bt("continue")}
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                {bt("confirm")}
                <CheckCircle2 className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function BookingForm() {
  return (
    <Suspense fallback={<div className="animate-pulse bg-white rounded-2xl h-96 border border-slate-100" />}>
      <BookingFormInner />
    </Suspense>
  );
}
