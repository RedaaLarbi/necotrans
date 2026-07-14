import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";
import DocEngine from "@/components/docengine/DocEngine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DocEngine – Algerian Import Compliance Check – Necotrans",
};

export default function DocEnginePage() {
  const t = useTranslations("docengine");

  return (
    <>
      <PageHeader label={t("label")} title={t("pageTitle")} subtitle={t("pageSub")} />
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <DocEngine />
        </div>
      </section>
    </>
  );
}
