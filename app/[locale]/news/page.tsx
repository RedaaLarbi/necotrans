import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "News – Necotrans" };

const news = [
  { slug: "weekly-algiers-valencia", date: "March 2024", category: "Company News",
    title: "Dedicated Weekly Service: Algiers ↔ Valencia Launched",
    excerpt: "Necotrans launches a dedicated weekly service on the Algeria–Spain corridor, offering reliable transit times and competitive rates for importers and exporters on both sides of the Mediterranean.",
    img: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=800&q=80" },
  { slug: "algeria-eu-trade-2024", date: "January 2024", category: "Industry",
    title: "Algeria–EU Trade: Opportunities and Trends in 2024",
    excerpt: "Algeria's trade relationship with the EU continues to grow. We look at key sectors, shipping volumes, and what businesses need to know about customs regulations this year.",
    img: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80" },
  { slug: "air-freight-capacity", date: "November 2023", category: "Services",
    title: "Expanded Air Freight Capacity from Algiers",
    excerpt: "New carrier agreements enable faster transit times and improved rates on key air freight routes between Algiers and major European and international hubs.",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" },
  { slug: "customs-changes-2023", date: "September 2023", category: "Regulatory",
    title: "Key Changes to Algerian Import Regulations in 2023",
    excerpt: "Algerian customs authorities have introduced several updates to import procedures. Our compliance team breaks down what's changed and how to prepare your shipment documentation.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  { slug: "port-congestion-advisory", date: "July 2023", category: "Advisory",
    title: "Mediterranean Port Congestion: What Shippers Need to Know",
    excerpt: "Summer congestion at major Mediterranean ports is affecting transit times. Necotrans advises clients on how to plan shipments and avoid costly delays.",
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80" },
  { slug: "iso-certification", date: "April 2023", category: "Company News",
    title: "Necotrans Achieves ISO 9001 Quality Certification",
    excerpt: "We are proud to announce ISO 9001:2015 certification, reflecting our commitment to quality management and continuous improvement in freight forwarding services.",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80" },
];

const categoryColors: Record<string, string> = {
  "Company News": "bg-[var(--brand)] text-white",
  Industry:       "bg-amber-500 text-white",
  Services:       "bg-emerald-600 text-white",
  Regulatory:     "bg-orange-500 text-white",
  Advisory:       "bg-red-500 text-white",
};

export default function NewsPage() {
  const t = useTranslations("news");

  return (
    <>
      {/* Header */}
      <section className="relative h-72 flex items-end overflow-hidden bg-[var(--brand-dark)]">
        <Image src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80"
          alt="News" fill className="object-cover opacity-25" priority />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full pt-24">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--orange)] mb-3">{t("label")}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{t("heading")}</h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          <Link href={`/news/${news[0].slug}`} className="group block mb-14">
            <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-border hover:border-[var(--brand)]/30 hover:shadow-lg transition-all duration-300">
              <div className="relative h-72 md:h-auto">
                <Image src={news[0].img} alt={news[0].title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[var(--brand-dark)]/30" />
              </div>
              <div className="p-8 flex flex-col justify-center bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[news[0].category]}`}>{news[0].category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar className="h-3 w-3" />{news[0].date}</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-[var(--brand)] transition-colors">{news[0].title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{news[0].excerpt}</p>
                <span className="flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                  {t("readMore")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(1).map((article) => (
              <Link href={`/news/${article.slug}`} key={article.slug} className="group block">
                <Card className="border-border hover:border-[var(--brand)]/30 hover:shadow-md transition-all duration-300 overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={article.img} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className={`absolute top-3 start-3 text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category] ?? "bg-muted text-foreground"}`}>
                      {article.category}
                    </span>
                  </div>
                  <CardContent className="p-5">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3" />{article.date}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-[var(--brand)] transition-colors leading-snug mb-2">{article.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{article.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
