import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Ship, Plane, Truck, FileCheck, Warehouse, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services – Necotrans Freight Forwarding",
};

const serviceList = [
  { key: "sea",         icon: Ship,      img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80",
    features: ["Full Container Load (FCL)", "Less than Container Load (LCL)", "Mediterranean & deep-sea routes", "Real-time cargo tracking", "Cargo insurance", "Port handling & documentation"] },
  { key: "air",         icon: Plane,     img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80",
    features: ["Express next-flight-out", "Economy air cargo", "Charter solutions", "Hazardous goods handling", "Perishable cargo", "Airway bill management"] },
  { key: "road",        icon: Truck,     img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80",
    features: ["Full Truck Load (FTL)", "Groupage / LTL", "Algeria–Spain & EU corridor", "Temperature-controlled transport", "GPS tracking", "Driver & customs documentation"] },
  { key: "customs",     icon: FileCheck, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80",
    features: ["Algerian import/export declarations", "EU customs coordination", "HS classification guidance", "Duty & tax management", "ATA Carnet processing", "Temporary import/export"] },
  { key: "warehousing", icon: Warehouse, img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80",
    features: ["Bonded warehouse", "General cargo storage", "Pick & pack services", "Inventory management", "Cross-docking", "Last-mile distribution"] },
  { key: "doorToDoor",  icon: Package,   img: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=900&q=80",
    features: ["Single point of contact", "Multi-modal transport", "Customs included", "Last-mile delivery", "Dedicated account manager", "Full shipment visibility"] },
];

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      {/* Header */}
      <section className="relative h-72 flex items-end overflow-hidden bg-[var(--brand-dark)]">
        <Image
          src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80"
          alt="Port"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full pt-24">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--orange)] mb-3">{t("label")}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{t("heading")}</h1>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {serviceList.map(({ key, icon: Icon, img, features }, i) => (
            <div key={key} id={key} className={`grid lg:grid-cols-2 gap-14 items-center ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
              <div className={`relative h-80 rounded-2xl overflow-hidden shadow-xl ${i % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                <Image src={img} alt={t(`${key}.title`)} fill className="object-cover" />
                <div className="absolute inset-0 bg-[var(--brand-dark)]/30" />
                <div className="absolute bottom-5 left-5">
                  <div className="w-12 h-12 rounded-xl bg-[var(--orange)] flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <div className={i % 2 !== 0 ? "lg:col-start-1" : ""}>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--orange)] mb-3">{t("label")}</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{t(`${key}.title`)}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{t(`${key}.desc`)}</p>
                <ul className="grid grid-cols-2 gap-2 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--orange)] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white">
                    {t("learnMore")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
