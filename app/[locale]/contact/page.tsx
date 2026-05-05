"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
                      <option value="sea">Sea Freight</option>
                      <option value="air">Air Freight</option>
                      <option value="road">Road Transport</option>
                      <option value="customs">Customs Clearance</option>
                      <option value="warehousing">Warehousing</option>
                      <option value="doorToDoor">Door-to-Door</option>
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
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">{t("officesHeading")}</h2>
              <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[var(--brand)] uppercase tracking-wider">Head Office</p>
                    <h3 className="font-semibold text-foreground mt-1">Algiers, Algeria</h3>
                  </div>
                  <Separator />
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-[var(--brand)] mt-0.5 flex-shrink-0" />
                      <a href="tel:+213770905969" className="text-sm text-foreground hover:text-[var(--brand)] transition-colors">+213 77 090 59 69</a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-[var(--brand)] mt-0.5 flex-shrink-0" />
                      <a href="mailto:info@necotrans.com" className="text-sm text-foreground hover:text-[var(--brand)] transition-colors">info@necotrans.com</a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-[var(--brand)] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Sun–Thu: 8:00 – 17:00</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-[var(--brand)] text-white border-0">
                <CardContent className="p-6">
                  <MapPin className="h-6 w-6 mb-3 opacity-80" />
                  <h3 className="font-semibold mb-2">Algeria–EU Corridor</h3>
                  <p className="text-sm text-white/75">Specialists on the Algeria–Spain & EU trade route. Weekly departures, competitive transit times.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
