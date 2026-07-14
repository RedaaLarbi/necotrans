"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const offices = [
  {
    city: "Algiers",
    role: "Head Office",
    address: "03 Cité Sonelgaz, Gué de Constantine — Alger",
    phone: "+213 (0)7 70 90 59 69",
    email: "info@necotrans.com",
    hours: "Sun–Thu: 8:30–12:00 / 13:00–17:00",
    primary: true,
  },
  {
    city: "Oran",
    role: "Branch",
    address: "Cité Khmisti Bt A1B N° 1, ORAN bp 31023",
    phone: "",
    email: "",
    hours: "Sun–Thu: 8:30–17:00",
    primary: false,
  },
  {
    city: "Skikda",
    role: "Branch",
    address: "Rue brahim maiza, Bt B N° 01, Skikda 21000",
    phone: "",
    email: "",
    hours: "Sun–Thu: 8:30–17:00",
    primary: false,
  },
  {
    city: "Valencia, Spain",
    role: "Coming Soon",
    address: "Opening Nov/Dec 2026",
    phone: "",
    email: "",
    hours: "",
    primary: false,
  },
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition";

  return (
    <>
      {/* Header */}
      <section className="relative h-72 flex items-end overflow-hidden bg-[var(--brand-dark)]">
        <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80"
          alt="Contact" fill className="object-cover opacity-20" priority />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full pt-24">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[var(--orange)] mb-3">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Get in Touch</h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t("formHeading")}</h2>
              {submitted ? (
                <Card className="border-[var(--brand)]/30">
                  <CardContent className="p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--brand)]/10 flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-[var(--brand)]" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{t("success")}</h3>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">{t("name")} *</label>
                      <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1.5">{t("company")}</label>
                      <input id="company" name="company" type="text" value={form.company} onChange={handleChange} className={inputCls} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">{t("email")} *</label>
                      <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">{t("phone")}</label>
                      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground mb-1.5">{t("service")}</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange} className={inputCls}>
                      <option value="">{t("selectService")}</option>
                      <option value="customs">Customs Clearance</option>
                      <option value="maritime">Maritime Services</option>
                      <option value="airport">Airport Support</option>
                      <option value="stevedoring">Stevedoring</option>
                      <option value="trucking">Trucking / Road Haulage</option>
                      <option value="projectLogistics">Project Logistics</option>
                      <option value="husbandry">Husbandry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">{t("message")} *</label>
                    <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange}
                      placeholder={t("messagePlaceholder")} className={`${inputCls} resize-none`} />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white">
                    <Send className="me-2 h-4 w-4" /> {t("submit")}
                  </Button>
                </form>
              )}
            </div>

            {/* Office info */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">{t("officesHeading")}</h2>

              {/* Offices */}
              {offices.map((office) => (
                <Card
                  key={office.city}
                  className={cn(
                    office.primary && "border border-[var(--brand)]/30",
                    office.role === "Coming Soon" && "border border-dashed border-[var(--orange)]/40"
                  )}
                >
                  <CardContent className="p-5 space-y-3">
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-wider ${office.role === "Coming Soon" ? "text-[var(--orange)]" : "text-[var(--brand)]"}`}>{office.role}</p>
                      <h3 className="font-bold text-foreground mt-0.5">{office.city}</h3>
                    </div>
                    <Separator />
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 text-[var(--brand)] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{office.address}</span>
                      </li>
                      {office.phone && (
                        <li>
                          <a href={`tel:${office.phone.replace(/\s|\(0\)/g, "")}`}
                            className="flex items-center gap-2 text-xs text-foreground hover:text-[var(--brand)] transition-colors">
                            <Phone className="h-3.5 w-3.5 text-[var(--brand)] flex-shrink-0" />
                            {office.phone}
                          </a>
                        </li>
                      )}
                      {office.email && (
                        <li>
                          <a href={`mailto:${office.email}`}
                            className="flex items-center gap-2 text-xs text-foreground hover:text-[var(--brand)] transition-colors">
                            <Mail className="h-3.5 w-3.5 text-[var(--brand)] flex-shrink-0" />
                            {office.email}
                          </a>
                        </li>
                      )}
                      {office.hours && (
                        <li className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-[var(--brand)] flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{office.hours}</span>
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              ))}

              {/* Other branches */}
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Also present in</p>
                <p className="text-sm text-foreground font-medium">Mostaganem · Arzew · Djendjen · Annaba</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
