import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";
import QuoteEngine from "@/components/quote/QuoteEngine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instant LCL Quote – Necotrans",
};

export default function QuotePage() {
  const t = useTranslations("quote");

  return (
    <>
      <PageHeader label={t("label")} title={t("pageTitle")} subtitle={t("pageSub")} />
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteEngine />
        </div>
      </section>
    </>
  );
}
