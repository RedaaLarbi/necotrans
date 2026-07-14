import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";
import TrackingDashboard from "@/components/track/TrackingDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track a Shipment – Necotrans",
};

export default function TrackPage() {
  const t = useTranslations("track");

  return (
    <>
      <PageHeader label={t("label")} title={t("pageTitle")} subtitle={t("pageSub")} />
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrackingDashboard />
        </div>
      </section>
    </>
  );
}
