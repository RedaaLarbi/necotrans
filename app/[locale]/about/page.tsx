import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MapPin, Target, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us – Necotrans" };

const values = [
  { icon: Target, title: "Excellence",  desc: "We set the highest standards in every shipment we handle, continuously improving to deliver superior service." },
  { icon: Heart,  title: "Integrity",   desc: "Transparent pricing, honest timelines, and clear communication form the foundation of every client relationship." },
  { icon: Users,  title: "Partnership", desc: "We see our clients as long-term partners. Your success in international trade is our success." },
];

const timeline = [
  { year: "2000s", title: "Founded in Algiers",    desc: "Necotrans was established with a focus on customs clearance and sea freight for Algerian importers and exporters." },
  { year: "2010s", title: "Full-Service Growth",   desc: "We expanded into air freight, road transport, and warehousing — becoming a complete one-stop logistics provider." },
  { year: "2020",  title: "Global Network",        desc: "Formalized agent partnerships across 50+ countries, enabling seamless worldwide coverage for all clients." },
  { year: "2023",  title: "Algeria–EU Corridor",   desc: "Launched dedicated weekly services on the Algeria–Spain & EU line, cementing our position as the reference partner for this trade route." },
];

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      {/* Header */}
      <section className="relative h-72 flex items-end overflow-hidden bg-[var(--brand-dark)]">
        <Image src="https://images.unsplash.com/photo-1706002027900-a1be40d0627e?w=1600&q=80"
          alt="Algiers" fill className="object-cover opacity-25" priority />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full pt-24">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--orange)] mb-3">{t("label")}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">{t("heading")}</h1>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">{t("body")}</p>
              <Link href="/contact">
                <Button className="bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white">
                  {t("cta")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <Card className="border-[var(--brand)]/20">
              <CardContent className="p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[var(--brand)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Head Office — Algiers, Algeria</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our main operations hub serving clients globally with customs clearance, sea freight, air freight, road transport, and comprehensive logistics support.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Algiers Port aerial ── */}
      <section className="relative h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1769144256227-5185141c3aca?w=1920&q=85"
          alt="Aerial view of container port"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Strong dark gradient — heavier at bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        {/* Caption block */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-10 pb-10 pt-16"
          style={{ background: "linear-gradient(to top, rgba(5,12,31,0.95) 0%, transparent 100%)" }}>
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-6">
            <div>
              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full bg-[var(--orange)]" />
                <p className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--orange)]">
                  Our Home Base
                </p>
              </div>
              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-3">
                Port of Algiers
              </h2>
              {/* Body */}
              <p className="text-white/90 text-base leading-relaxed max-w-xl font-medium drop-shadow">
                Algeria's largest and busiest commercial port — the gateway from which
                Necotrans connects North Africa to the world.
              </p>
            </div>
            {/* Coordinates badge */}
            <div className="hidden sm:flex flex-col items-end text-right flex-shrink-0">
              <span className="text-sm text-white/70 font-mono tracking-wider">36°45′N · 3°03′E</span>
              <span className="text-xs text-white/50 mt-1 uppercase tracking-widest">Algiers, Algeria</span>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--brand)] mb-3">Our Values</p>
            <h2 className="text-3xl font-bold text-foreground">What Drives Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-[var(--brand)]/10 flex items-center justify-center mx-auto mb-5">
                  <v.icon className="h-7 w-7 text-[var(--brand)]" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--brand)] mb-3">Our Journey</p>
            <h2 className="text-3xl font-bold text-foreground">Two Decades of Growth</h2>
          </div>
          <div className="relative">
            <div className="absolute start-6 top-0 bottom-0 w-px bg-[var(--brand)]/20" />
            <div className="space-y-10">
              {timeline.map((item) => (
                <div key={item.year} className="relative flex gap-8 ps-14">
                  <div className="absolute start-0 w-12 h-12 rounded-full bg-[var(--brand)] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{item.year.slice(-2)}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider mb-1">{item.year}</p>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--brand)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to work with us?</h2>
          <p className="text-white/70 mb-6">Let&apos;s build a logistics partnership that moves your business forward.</p>
          <Link href="/contact">
            <Button className="bg-white text-[var(--brand)] hover:bg-white/90 font-semibold">
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
