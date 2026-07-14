import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Calculator,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Lock,
  Scale,
  MapPin,
  Ship,
  Receipt,
  FileText,
  Handshake,
  Radio,
  CalendarClock,
  Leaf,
  Wifi,
  Landmark,
  Truck,
  Banknote,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ROADMAP } from "@/lib/config/roadmap";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Technology – Necotrans" };

const pillars = [
  {
    icon: Calculator,
    title: "Corridor-Specific Pricing Engine",
    body: "An all-in groupage price composes carrier base rates, weight/measure rules, BAF/CAF surcharges, origin haulage matrices, terminal handling, customs fees, destination charges in a different currency regime, and commodity restrictions — Algeria maintains import restrictions on specific product categories that must be validated at quote time, not discovered at the port. Encoding this rule set as data is what makes new corridors cheap to add.",
    href: "/quote",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Automation — DocEngine",
    body: "DocEngine encodes Algerian import formalities — domiciliation bancaire alignment, certificate and legalization workflows — as machine-validated rules. EU-side logistics software ignores this regime; Algerian domestic software does not reach the EU origin side. Our bilingual FR/ES/EN document pipeline with cross-document field validation is built for this specific gap.",
    href: "/docengine",
  },
  {
    icon: TrendingUp,
    title: "Two-Sided Operational Data Loop",
    body: "Because the destination operation runs on the same system, the platform accumulates a structured dataset no competitor has: real clearance times by HS code and inspection channel, document-error root causes, seasonal congestion at Algerian ports. This compounds into better quotes, more reliable ETAs, and eventually a corridor intelligence product.",
    href: "/intelligence",
  },
];

const dataModel = [
  { icon: MapPin, title: "Origin & Destination", desc: "Ports on either side of the corridor — the anchor points every rate card, restriction, and document rule attaches to." },
  { icon: Ship, title: "Carrier", desc: "The ocean carrier operating a given leg — MSC, CNAN Nord, CMA CGM today, more as corridors expand." },
  { icon: Receipt, title: "Rate Card", desc: "Base rate, BAF/CAF, terminal handling, and transit days for one origin–destination–carrier combination." },
  { icon: FileText, title: "Document Template", desc: "DUA, CMR, Certificate of Origin, packing list — bilingual templates with the fields each destination requires." },
  { icon: Handshake, title: "Partner", desc: "The on-the-ground operator handling destination customs clearance — Transit Necotrans in Algeria today." },
  { icon: Receipt, title: "Restriction Rule", desc: "Commodity-level import restrictions checked at quote time, not discovered at the port." },
  { icon: Truck, title: "Haulage Zone", desc: "Pre-carriage pricing from the shipper's door to the origin port, tiered by distance from each port." },
  { icon: Banknote, title: "FX Rate", desc: "Destination-side charges are priced in their native currency — Algerian Dinar — and converted at quote time, not silently absorbed into one EUR figure." },
  { icon: ShieldCheck, title: "Compliance Rule", desc: "Domiciliation bancaire, ALGEX registration, and certificate legalization requirements, checked against shipment data before booking." },
];

const roadmapIcons: Record<string, typeof Radio> = {
  "valencia-pcs": Radio,
  "carrier-apis": CalendarClock,
  "emissions-methodology": Leaf,
  "iot-tracking": Wifi,
  "algerian-customs-interfaces": Landmark,
};

export default function TechnologyPage() {
  const t = useTranslations("technology");

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-[var(--brand-dark)] pt-40 pb-16">
        <Image
          src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1600&q=80"
          alt="Shipping containers"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--orange)] mb-3">{t("label")}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-3xl">{t("heading")}</h1>
          <p className="text-white/60 mt-4 max-w-2xl">{t("subtitle")}</p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--brand)] mb-3">{t("pillarsHeading")}</p>
            <h2 className="text-3xl font-bold text-foreground max-w-2xl mx-auto">{t("pillarsSub")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div key={p.title} className="p-6 rounded-2xl border border-border bg-card">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center mb-5">
                  <p.icon className="h-6 w-6 text-[var(--brand)]" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                <Link href={p.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--orange)] hover:underline mt-4">
                  See it live <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Data model */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--brand)] mb-3">{t("dataModelHeading")}</p>
            <h2 className="text-3xl font-bold text-foreground max-w-2xl mx-auto">{t("dataModelSub")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataModel.map((entity) => (
              <div key={entity.title} className="p-5 rounded-xl border border-border bg-card flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--orange)]/10 flex items-center justify-center flex-shrink-0">
                  <entity.icon className="h-5 w-5 text-[var(--orange)]" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm mb-1">{entity.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{entity.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Roadmap */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--brand)] mb-3">{t("roadmapHeading")}</p>
            <h2 className="text-3xl font-bold text-foreground">{t("roadmapSub")}</h2>
          </div>
          <div className="relative">
            <div className="absolute start-6 top-0 bottom-0 w-px bg-[var(--brand)]/20" />
            <div className="space-y-10">
              {ROADMAP.map((item) => {
                const Icon = roadmapIcons[item.id] ?? Radio;
                return (
                  <div key={item.id} className="relative flex gap-8 ps-14">
                    <div className="absolute start-0 w-12 h-12 rounded-full bg-[var(--brand)] flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <Badge
                          variant={item.status === "opportunistic" ? "secondary" : "default"}
                          className={item.status === "planned" ? "bg-[var(--orange)]/10 text-[var(--orange)] border-none" : ""}
                        >
                          {item.targetDate}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Data governance & security */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--brand)] mb-3">Data Governance</p>
            <h2 className="text-3xl font-bold text-foreground">Data Governance &amp; Security</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="w-11 h-11 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center mb-4">
                <Scale className="h-5 w-5 text-[var(--brand)]" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Two regimes, one platform</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                EU-side personal data is processed under GDPR. Algeria-side personal data is processed under Law 18-07,
                which requires an ANPDP declaration and restricts cross-border transfer of Algerian personal data.
                Transit Necotrans Algeria — the licensed local operator — acts as the data controller/processor for
                Algeria-origin personal data, rather than moving it across the Mediterranean by default.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="w-11 h-11 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center mb-4">
                <Lock className="h-5 w-5 text-[var(--brand)]" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">What actually crosses the border</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Only aggregated, statistical operational data — clearance durations by HS code, congestion patterns —
                feeds the corridor intelligence loop. Raw personal data stays minimized, encrypted in transit and at
                rest, and access-controlled by side of the corridor, with retention aligned to Algerian customs
                record-keeping requirements and GDPR&rsquo;s storage-limitation principle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing / defensibility */}
      <section className="py-16 bg-[var(--brand)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t("closingHeading")}</h2>
          <p className="text-white/70 leading-relaxed">
            Software alone would be imitable. The moat is the compound of the encoded corridor rule set, the two-sided
            operation — an EU competitor would need to build an Algerian clearance operation from zero, in a market
            where Transit Necotrans already has 19 years of licenses, relationships, and trust — and the proprietary
            corridor dataset that improves with every shipment.
          </p>
        </div>
      </section>
    </>
  );
}
