"use client";

import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
    { href: "/",             label: t("home") },
    { href: "/services",     label: t("services") },
    { href: "/track",        label: t("track") },
    { href: "/docengine",    label: t("docCheck") },
    { href: "/intelligence", label: t("intelligence") },
    { href: "/technology",   label: t("technology") },
    { href: "/about",        label: t("about") },
    { href: "/news",         label: t("news") },
    { href: "/contact",      label: t("contact") },
  ];

  return (
    <header className="w-full fixed top-0 z-50">

      {/* ── Top bar: language pills ── */}
      <div className={cn(
        "bg-[oklch(0.10_0.08_258)] text-white text-sm px-4 transition-all duration-300 overflow-hidden",
        scrolled ? "max-h-0 opacity-0 py-0" : "max-h-12 opacity-100 py-3"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-end">
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
              <Logo className="h-20 w-80 xl:h-14 xl:w-56" variant="dark" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-1.5 py-2 rounded-md text-base font-semibold transition-colors whitespace-nowrap",
                    pathname === link.href
                      ? "text-white bg-white/10"
                      : "text-white/85 hover:text-white hover:bg-white/8"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/quote" className="ml-1">
                <Button size="lg" className="bg-[var(--orange)] hover:bg-[#1d4ed8] text-white font-semibold text-base px-4">
                  {t("getQuote")}
                </Button>
              </Link>
            </div>

            {/* Mobile */}
            <div className="xl:hidden flex items-center gap-2">
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
                          "px-4 py-3 rounded-md text-base font-semibold transition-colors",
                          pathname === link.href ? "text-white bg-white/10" : "text-white/85 hover:text-white hover:bg-white/8"
                        )}>
                        {link.label}
                      </Link>
                    ))}
                    <div className="pt-4 border-t border-white/10 mt-4">
                      <Link href="/quote" onClick={() => setOpen(false)}>
                        <Button size="lg" className="w-full bg-[var(--orange)] hover:bg-[#1d4ed8] text-white font-semibold text-base">
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
