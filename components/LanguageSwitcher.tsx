"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const locales = [
  { code: "fr", label: "FR", full: "Français" },
  { code: "en", label: "EN", full: "English" },
  { code: "es", label: "ES", full: "Español" },
  { code: "ar", label: "AR", full: "العربية" },
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = locales.find((l) => l.code === currentLocale) ?? locales[0];

  const switchLocale = (code: string) => {
    router.replace(pathname, { locale: code });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/8"
      >
        <span className="font-medium">{current.label}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute end-0 mt-1 w-36 rounded-xl border border-white/10 bg-[oklch(0.12_0.08_258)] shadow-xl z-50 overflow-hidden">
            {locales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => switchLocale(locale.code)}
                className={`w-full text-start px-4 py-2.5 text-sm transition-colors flex items-center justify-between
                  ${locale.code === currentLocale
                    ? "text-white bg-white/10 font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
              >
                <span>{locale.full}</span>
                <span className="text-xs opacity-50">{locale.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
