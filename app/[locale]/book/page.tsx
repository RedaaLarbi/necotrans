import { useTranslations } from "next-intl";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/book/BookingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Shipment – Necotrans",
};

export default function BookPage() {
  const t = useTranslations("book");

  return (
    <>
      <PageHeader label={t("label")} title={t("pageTitle")} subtitle={t("pageSub")} />
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
