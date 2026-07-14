import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";
import CorridorIntelligence from "@/components/intelligence/CorridorIntelligence";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corridor Intelligence – Necotrans",
};

export default function IntelligencePage() {
  const t = useTranslations("intelligence");

  return (
    <>
      <PageHeader label={t("label")} title={t("pageTitle")} subtitle={t("pageSub")} />
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CorridorIntelligence />
        </div>
      </section>
    </>
  );
}
