import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, FileCheck, Ship, Plane, Anchor, Truck, Package, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceImages = [
  { key: "customs",         icon: FileCheck, img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  { key: "maritime",        icon: Ship,      img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80" },
  { key: "airport",         icon: Plane,     img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80" },
  { key: "stevedoring",     icon: Anchor,    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80" },
  { key: "trucking",        icon: Truck,     img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80" },
  { key: "projectLogistics",icon: Package,   img: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=800&q=80" },
];

const industryItems = [
  { key: "oilGas",       img: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80" },
  { key: "automotive",   img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80" },
  { key: "pharma",       img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80" },
  { key: "food",         img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80" },
  { key: "construction", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" },
  { key: "mining",       img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80" },
  { key: "retail",       img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80" },
  { key: "projectCargo", img: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=600&q=80" },
];

const newsItems = [
  {
    category: "Company News",
    date: "2024",
    title: "Necotrans Transit — 18 Years Serving Algerian Trade",
    img: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=700&q=80",
  },
  {
    category: "Industry",
    date: "2024",
    title: "Algeria Customs Clearance: Air Freight Reaches 47% of Operations",
    img: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=700&q=80",
  },
  {
    category: "Regulatory",
    date: "2023",
    title: "Key Updates to Algerian Import & Export Procedures",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80",
  },
];

// Real stats from company presentation
const stats = [
  { value: "2006", key: "years" },
  { value: "7",    key: "branches" },
  { value: "19",   key: "staff" },

];

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1606765962248-7ff407b51667?w=1920&q=80"
          alt="Container port"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1e54]/90 via-[#0a1e54]/75 to-[#0a1e54]/50" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)", filter: "blur(60px)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--orange)] mb-5">
              {t("hero.badge")}
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg text-white/65 max-w-xl mb-10 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-[var(--orange)] hover:bg-[#1d4ed8] text-white font-semibold px-8 w-full sm:w-auto shadow-lg shadow-[#2563eb]/30">
                  {t("hero.cta1")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="ghost" className="border border-white/25 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto">
                  {t("hero.cta2")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-10 bg-white animate-pulse" />
        </div>
      </section>

      {/* ── SERVICE THUMBNAILS ── */}
      <section className="bg-[#050c1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--orange)] mb-3">{t("services.label")}</p>
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-lg">{t("services.heading")}</h2>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              {t("services.learnMore")} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {serviceImages.map(({ key, icon: Icon, img }) => (
            <Link href={`/services#${key}`} key={key} className="group relative block h-[380px] overflow-hidden">
              <Image src={img} alt={t(`services.${key}.title`)} fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 translate-y-0 group-hover:translate-y-full transition-transform duration-400 ease-in-out">
                <Icon className="h-7 w-7 text-[var(--orange)] mb-3" />
                <h3 className="text-white font-bold text-lg">{t(`services.${key}.title`)}</h3>
              </div>
              <div className="absolute inset-0 bg-[#0a1e54]/92 flex flex-col justify-center p-7 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <Icon className="h-10 w-10 text-[var(--orange)] mb-5" />
                <h3 className="text-white font-bold text-xl mb-3">{t(`services.${key}.title`)}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{t(`services.${key}.desc`)}</p>
                <span className="flex items-center gap-2 text-[var(--orange)] text-sm font-semibold">
                  {t("services.learnMore")} <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── COVERAGE SPOTLIGHT ── */}
      <section className="relative overflow-hidden bg-[var(--brand)]">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(45deg, white 1px, transparent 1px), linear-gradient(-45deg, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--orange)] mb-4">{t("corridor.label")}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">{t("corridor.heading")}</h2>
              <p className="text-white/70 leading-relaxed mb-8 max-w-lg">{t("corridor.subtitle")}</p>
              <Link href="/contact">
                <Button className="bg-white text-[var(--brand)] hover:bg-white/90 font-semibold">
                  {t("corridor.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "7",   key: "stat1" },
                { value: "19",  key: "stat2" },
                { value: "18+", key: "stat3" },
              ].map(({ value, key }) => (
                <div key={key} className="text-center bg-white/10 rounded-2xl p-6 border border-white/15">
                  <p className="text-4xl font-bold text-white mb-2">{value}</p>
                  <p className="text-xs text-white/60 uppercase tracking-wider">{t(`corridor.${key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRY GRID ── */}
      <section className="py-20 bg-[#050c1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--orange)] mb-3">{t("industries.label")}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t("industries.heading")}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-3">
          {industryItems.map(({ key, img }) => (
            <div key={key} className="group relative h-52 overflow-hidden rounded-xl cursor-pointer">
              <Image src={img} alt={t(`industries.${key}`)} fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/55 group-hover:bg-[var(--brand)]/80 transition-colors duration-300 rounded-xl" />
              <div className="absolute inset-0 flex items-end p-4">
                <h4 className="text-white font-semibold text-sm leading-tight">{t(`industries.${key}`)}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-[var(--brand-dark)] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, key }) => (
              <div key={key} className="text-center">
                <p className="text-5xl font-bold text-white mb-2">{value}</p>
                <p className="text-sm text-white/45 uppercase tracking-widest">{t(`stats.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--brand)] mb-4">{t("about.label")}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-snug">{t("about.heading")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t("about.body")}</p>
              <p className="text-[var(--brand)] font-semibold italic mb-8">&ldquo;{t("about.mission")}&rdquo;</p>
              <Link href="/about">
                <Button className="bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white">
                  {t("about.cta")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1642215104060-86e252b2cb69?w=900&q=80"
                alt="Algiers city and bay at sunset"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--brand)] mb-3">{t("news.label")}</p>
              <h2 className="text-3xl font-bold text-foreground">{t("news.heading")}</h2>
            </div>
            <Link href="/news" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t("news.readMore")} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <Link href="/news" key={item.title} className="group block">
                <div className="relative h-52 rounded-xl overflow-hidden mb-4">
                  <Image src={item.img} alt={item.title} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <span className="absolute top-4 left-4 text-xs font-semibold bg-[var(--brand)] text-white px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{item.date}</p>
                <h3 className="font-semibold text-foreground group-hover:text-[var(--brand)] transition-colors leading-snug">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="relative py-24 overflow-hidden bg-[#050c1f]">
        <Image src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920&q=80"
          alt="Port at night" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050c1f] via-[#050c1f]/90 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">{t("cta.heading")}</h2>
            <p className="text-white/55 text-lg mb-10">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-[var(--orange)] hover:bg-[#1d4ed8] text-white font-semibold px-8 w-full sm:w-auto">
                  {t("cta.cta1")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="tel:+213770905969">
                <Button size="lg" variant="ghost" className="border border-white/20 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto">
                  {t("cta.cta2")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
