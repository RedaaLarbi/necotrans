import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MapPin, Target, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us – necotrans Transit" };

const values = [
  { icon: Target, title: "Commitment",  desc: "Our commitment makes the difference. We treat your logistics problems as our own and deliver solutions tailored to your needs." },
  { icon: Heart,  title: "Integrity",   desc: "Transparent communication and honest service are at the heart of every client relationship we build." },
  { icon: Users,  title: "Expertise",   desc: "19 multilingual professionals with deep knowledge of Algerian customs regulations and international logistics." },
];

const branches = [
  { name: "Algiers", role: "Head Office", address: "03 Cité Sonelgaz, Gué de Constantine — Alger", phone: "+213 (0)7 70 90 59 69" },
  { name: "Oran",       role: "Branch", address: "Cité Khmisti Bt A1B N° 1, ORAN bp 31023", phone: "" },
  { name: "Skikda",     role: "Branch", address: "Rue brahim maiza, Bt B N° 01, Skikda 21000", phone: "" },
  { name: "Mostaganem", role: "Branch", address: "Mostaganem, Algeria", phone: "" },
  { name: "Arzew",      role: "Branch", address: "Arzew, Algeria", phone: "" },
  { name: "Djendjen",   role: "Branch", address: "Djendjen, Algeria", phone: "" },
  { name: "Annaba",     role: "Branch", address: "Annaba, Algeria", phone: "" },
];

const timeline = [
  { year: "2006",  title: "Founded in Algiers", desc: "necotrans Transit Algeria was established by Managing Director Mr. Said Amine LARBI, with a focus on customs brokerage and freight forwarding for Algerian importers and exporters." },
  { year: "2010s", title: "National Expansion",  desc: "Opened branches in Oran, Skikda, Mostaganem, Arzew, Djendjen and Annaba — creating full national coverage across all major Algerian ports." },
  { year: "2020+", title: "Growing Operations", desc: "Grew to a 19-strong multilingual team with 10 service vehicles, handling containers, break-bulk, air freight, heavy-lift cargo, and project logistics." },
  { year: "2024",  title: "Present Day",         desc: "One of Algeria's leading customs brokers and logistic providers — committed to simplifying logistics for local and international clients." },
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

      {/* Mission & Director */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">{t("body")}</p>
              <blockquote className="border-l-4 border-[var(--red-accent)] pl-5 mb-8">
                <p className="text-[var(--brand)] font-semibold italic text-lg">&ldquo;{t("mission")}&rdquo;</p>
              </blockquote>
              {/* Key facts */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Founded", value: "2006" },
                  { label: "Managing Director", value: "Mr. Said Amine LARBI" },
                  { label: "Total Staff", value: "19 professionals" },
                  { label: "Service Vehicles", value: "10 vehicles" },
                ].map((fact) => (
                  <div key={fact.label} className="p-4 rounded-xl bg-muted/50 border border-border">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{fact.label}</p>
                    <p className="font-bold text-foreground text-sm">{fact.value}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <Button className="bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white">
                  {t("cta")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Head office card */}
            <Card className="border-[var(--brand)]/20">
              <CardContent className="p-6 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[var(--brand)]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--orange)] mb-1">Head Office</p>
                  <h3 className="font-bold text-foreground mb-1">Algiers, Algeria</h3>
                  <p className="text-sm text-muted-foreground">03 Cité Sonelgaz, Gué de Constantine — Alger</p>
                  <p className="text-sm text-muted-foreground mt-1">Tel: +213 (0)7 70 90 59 69</p>
                  <p className="text-sm text-muted-foreground mt-1">Sun–Thu: 8:30–12:00 / 13:00–17:00</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Port of Algiers photo ── */}
      <section className="relative h-[520px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1769144256227-5185141c3aca?w=1920&q=85"
          alt="Aerial view of container port"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-10 pb-10 pt-16"
          style={{ background: "linear-gradient(to top, rgba(5,12,31,0.95) 0%, transparent 100%)" }}>
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full bg-[var(--orange)]" />
                <p className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--orange)]">Our Home Base</p>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-3">Port of Algiers</h2>
              <p className="text-white/90 text-base leading-relaxed max-w-xl font-medium drop-shadow">
                Algeria&apos;s largest commercial port — the gateway from which necotrans Transit connects the country to the world.
              </p>
            </div>
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

      {/* Branches */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--brand)] mb-3">Our Network</p>
            <h2 className="text-3xl font-bold text-foreground">7 Branches Across Algeria</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {branches.map((branch) => (
              <div key={branch.name}
                className={`p-5 rounded-xl border ${branch.role === "Head Office" ? "border-[var(--brand)] bg-[var(--brand)]/5" : "border-border bg-card"}`}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className={`h-4 w-4 flex-shrink-0 ${branch.role === "Head Office" ? "text-[var(--orange)]" : "text-[var(--brand)]"}`} />
                  <h4 className="font-bold text-foreground">{branch.name}</h4>
                </div>
                <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${branch.role === "Head Office" ? "text-[var(--orange)]" : "text-muted-foreground"}`}>
                  {branch.role}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{branch.address}</p>
                {branch.phone && <p className="text-xs text-[var(--brand)] mt-1 font-medium">{branch.phone}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--brand)] mb-3">Our Journey</p>
            <h2 className="text-3xl font-bold text-foreground">Since 2006</h2>
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
          <p className="text-white/70 mb-6">Your logistics, our commitment. Let&apos;s simplify it together.</p>
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
