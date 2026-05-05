# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Necotrans.com — corporate website for a freight forwarding company based in Algiers, Algeria with a European office in Valencia, Spain.

## Commands

```bash
npm run dev      # development server on localhost:3000
npm run build    # production build (type-checks + static generation)
npm run lint     # ESLint
```

## Stack

- **Next.js 16** App Router — all routes are static server components; add `"use client"` only for interactivity
- **Tailwind CSS v4** — configured via `globals.css` using `@theme inline` blocks; no `tailwind.config.ts`
- **shadcn/ui** (Base UI variant, not Radix) — components live in `components/ui/`; `SheetTrigger` uses `render={}` prop, not `asChild`
- **lucide-react** — social icons (`Linkedin`, `Facebook`) do not exist in this version; use inline SVG for those

## Brand

Colors are defined as CSS custom properties in `app/globals.css`:
- `--brand` / `--brand-dark` — navy blue (primary)
- `--gold` / `--gold-foreground` — amber gold (accent, CTAs)

Reference these as `text-[var(--brand)]`, `bg-[var(--brand)]`, etc.

## Architecture

```
app/
  layout.tsx        # global layout: Navbar + Footer wrap all pages
  page.tsx          # home page (hero, stats, services, about preview, CTA)
  services/page.tsx # detailed service listings
  about/page.tsx    # company story, offices, values, timeline
  contact/page.tsx  # quote request form ("use client") + office info
  news/page.tsx     # news/press article listing

components/
  Navbar.tsx        # sticky header + mobile Sheet drawer ("use client")
  Footer.tsx        # dark footer with links and office info
  Logo.tsx          # inline SVG globe wordmark
  ui/               # shadcn components (button, card, badge, sheet, separator, navigation-menu)
```

## Key conventions

- Static data arrays (services, stats, etc.) are defined at module level outside the component — do not move them inside.
- Pages export `metadata` as a named export for SEO.
- The contact form (`/contact`) is client-side only (no backend yet); form submission sets `submitted` state.
- The dev server port is 3000; all routes are pre-rendered as static HTML.
