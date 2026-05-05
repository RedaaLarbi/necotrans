import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/Logo";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const services = [
    { label: "Sea Freight",       href: "/services#sea" },
    { label: "Air Freight",       href: "/services#air" },
    { label: "Road Transport",    href: "/services#road" },
    { label: "Customs Clearance", href: "/services#customs" },
    { label: "Warehousing",       href: "/services#warehousing" },
    { label: "Door-to-Door",      href: "/services#doorToDoor" },
  ];

  const company = [
    { label: nav("about"),   href: "/about" },
    { label: nav("news"),    href: "/news" },
    { label: nav("contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-[var(--brand-dark)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <Logo className="h-20 w-80" variant="dark" />
            </div>
            <p className="text-sm text-white/60 leading-relaxed mt-2">{t("tagline")}</p>
            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">{t("services")}</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-white/65 hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">{t("company")}</h3>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-white/65 hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-xs uppercase tracking-widest text-white/40 mb-5">{t("contact")}</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 text-[var(--orange)] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/65">
                  <p className="font-medium text-white">{t("hq")}</p>
                </div>
              </li>
              <li>
                <a href="tel:+213770905969"
                  className="flex gap-3 text-sm text-white/65 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-[var(--orange)] flex-shrink-0 mt-0.5" />
                  +213 77 090 59 69
                </a>
              </li>
              <li>
                <a href="mailto:info@necotrans.com"
                  className="flex gap-3 text-sm text-white/65 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 text-[var(--orange)] flex-shrink-0 mt-0.5" />
                  info@necotrans.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>© {new Date().getFullYear()} {t("copyright")}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">{t("privacy")}</Link>
            <Link href="/terms"   className="hover:text-white/60 transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
