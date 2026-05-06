import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, FileCheck, Ship, Plane, Anchor, Truck, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services – Necotrans Transit Algeria",
};

const serviceList = [
  {
    id: "customs",
    icon: FileCheck,
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80",
    features: [
      "Import & Export declarations",
      "Warehousing & consolidation",
      "Local collections & deliveries",
      "Dangerous goods handling",
      "Heavy-lift transport solutions",
      "Customs consultancy",
      "Line item checking & packing",
    ],
  },
  {
    id: "maritime",
    icon: Ship,
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80",
    features: [
      "Port customs clearance coordination",
      "Dangerous & exceptional shipments",
      "Temporary importation / exportation",
      "Merchant marine authorizations",
      "Exportation & importation handling",
    ],
  },
  {
    id: "airport",
    icon: Plane,
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80",
    features: [
      "Airport meet & greet",
      "Customs clearance import / export",
      "Local transportation & transfers",
      "Temporary & permanent import/export studies",
      "Local purchasing & cash advances",
      "Husbandry services",
    ],
  },
  {
    id: "stevedoring",
    icon: Anchor,
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80",
    features: [
      "Loading & unloading operations",
      "Cargo handling at all Algerian ports",
      "Break-bulk cargo",
      "Container operations",
      "Coordination with port authorities",
    ],
  },
  {
    id: "trucking",
    icon: Truck,
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80",
    features: [
      "National coverage across Algeria",
      "Algiers, Oran, Skikda, Annaba & more",
      "Dangerous goods road transport",
      "Door-to-door delivery",
    ],
  },
  {
    id: "projectLogistics",
    icon: Package,
    img: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=900&q=80",
    features: [
      "Heavy lift cargo over 4,000 MT",
      "Out-of-gauge & oversized loads",
      "Specialized equipment & routing",
      "Multi-modal project coordination",
      "Air freight for urgent cargo",
    ],
  },
];

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      {/* Page header */}
      <section className="relative h-72 flex items-end overflow-hidden bg-[var(--brand-dark)]">
        <Image
          src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80"
          alt="Port of Algiers"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full pt-24">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--orange)] mb-3">
            {t("label")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{t("heading")}</h1>
          <p className="text-white/60 mt-2 max-w-xl">{t("subtitle")}</p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {serviceList.map(({ id, icon: Icon, img, features }, i) => (
            <div key={id}>
              <div
                id={id}
                className={`grid lg:grid-cols-2 gap-14 items-center py-16 ${
                  i % 2 !== 0 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative h-80 rounded-2xl overflow-hidden shadow-xl ${i % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                  <Image
                    src={img}
                    alt={t(`${id}.title`)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[var(--brand-dark)]/25" />
                  <div className="absolute bottom-5 left-5">
                    <div className="w-12 h-12 rounded-xl bg-[var(--orange)] flex items-center justify-center shadow-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 !== 0 ? "lg:col-start-1" : ""}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    {t(`${id}.title`)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t(`${id}.desc`)}
                  </p>

                  {/* Feature tags — no dots, clean grid */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {features.map((f) => (
                      <span
                        key={f}
                        className="text-xs font-medium bg-muted border border-border text-foreground px-3 py-1.5 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <Link href="/contact">
                    <Button className="bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white">
                      Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {i < serviceList.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--brand)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Not sure which service you need?
          </h2>
          <p className="text-white/70 mb-6">
            Our team will assess your shipment and recommend the right solution.
          </p>
          <Link href="/contact">
            <Button className="bg-white text-[var(--brand)] hover:bg-white/90 font-semibold">
              Talk to Our Team <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
