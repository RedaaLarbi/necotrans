"use client";

import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import Logo from "@/components/Logo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

const LANGS = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "ar", label: "AR" },
];

export default function Navbar({ locale }: { locale: string }) {
  const t        = useTranslations("nav");
  const pathname = usePathname();
  const router   = useRouter();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const switchLocale = (code: string) => router.replace(pathname, { locale: code });

  const navLinks = [
    { href: "/",         label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/about",    label: t("about") },
    { href: "/news",     label: t("news") },
    { href: "/contact",  label: t("contact") },
  ];

  return (
    <header className="w-full fixed top-0 z-50">

      {/* ── Top bar: phone left · language pills right ── */}
      <div className={cn(
        "bg-[oklch(0.10_0.08_258)] text-white text-sm px-4 transition-all duration-300 overflow-hidden",
        scrolled ? "max-h-0 opacity-0 py-0" : "max-h-12 opacity-100 py-3"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="tel:+213770905969"
            className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity font-medium">
            <Phone className="h-4 w-4" />
            +213 77 090 59 69
          </a>

          {/* Language pills */}
          <div className="flex items-center gap-1">
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => switchLocale(code)}
                className={cn(
                  "px-3 py-1 rounded text-sm font-bold transition-colors",
                  code === locale
                    ? "bg-white text-[#0a1e54]"
                    : "text-white/55 hover:text-white hover:bg-white/10"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <nav className={cn(
        "transition-all duration-300",
        scrolled
          ? "bg-[oklch(0.08_0.07_258)]/92 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">

            <Link href="/" className="flex-shrink-0">
              <Logo className="h-20 w-80" variant="dark" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                    pathname === link.href
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/8"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="ml-2">
                <Button size="sm" className="bg-[var(--orange)] hover:bg-[#1d4ed8] text-white font-semibold">
                  {t("getQuote")}
                </Button>
              </Link>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher currentLocale={locale} />
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger render={
                  <Button variant="ghost" size="icon" aria-label="Open menu"
                    className="text-white hover:bg-white/10 hover:text-white" />
                }>
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-[oklch(0.10_0.08_258)] border-white/10">
                  <div className="mt-8 flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                        className={cn(
                          "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                          pathname === link.href ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/8"
                        )}>
                        {link.label}
                      </Link>
                    ))}
                    <div className="pt-4 border-t border-white/10 mt-4">
                      <Link href="/contact" onClick={() => setOpen(false)}>
                        <Button className="w-full bg-[var(--orange)] hover:bg-[#1d4ed8] text-white font-semibold">
                          {t("getQuote")}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
