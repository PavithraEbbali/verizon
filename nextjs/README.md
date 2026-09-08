# Signal Wireless — Next.js + TypeScript

The Signal Wireless authorized-Verizon-retailer site, converted from the static build to
**Next.js 14 (App Router) + TypeScript**. Same design, animations, content, SEO and legal
pages — now componentized, server-rendered, and deployable to Vercel.

## Run it

```bash
cd nextjs
npm install
npm run dev          # http://localhost:4322
```

Build for production:

```bash
npm run build
npm start
```

> Requires Node 18.17+ (Node 24 works). The install pulls in `next`, `react`, `react-dom`,
> `gsap`, and the TypeScript toolchain. This project was scaffolded from the static source; run
> `npm run build` once to confirm your environment compiles it.

## Structure

```
app/
  layout.tsx            Root layout — metadata, Inter (next/font), shared chrome
                        (announcement bar, header, footer, cursor, scroll bar), <SiteEffects/>
  page.tsx              Home — renders the section markup + JSON-LD (Organization / WebSite / FAQ)
  globals.css           The full design system + all section styles (ported 1:1)
  legal/[slug]/page.tsx Dynamic legal route — 8 statically-generated policy pages
  robots.ts             → /robots.txt
  sitemap.ts            → /sitemap.xml
  manifest.ts           → /manifest.webmanifest
components/
  Header.tsx            Nav + brand + call button (real TSX, Next cross-page links)
  Footer.tsx            Brand + Explore + Policies + disclaimer (real TSX)
  SiteEffects.tsx       'use client' — runs the motion layer once on mount
content/
  home.ts              Home section markup (extracted from the static build)
  legal.ts             All 8 legal docs (title, date, description, prose) + slugs
lib/
  effects.ts           Ported interaction/motion layer (scroll reveal, 3D tilt, canvas,
                        count-up, cursor, magnetic buttons, GSAP scroll parallax…)
public/
  hero-bg.jpeg, favicon.svg, og-cover.svg
```

## How the conversion works

- **Styling** — `assets/css/styles.css` moved verbatim to `app/globals.css` (imported in the
  root layout). Fonts use `next/font/google` (Inter) wired to the `--font-inter` CSS variable.
- **Interactivity** — `assets/js/main.js` was ported to `lib/effects.ts` (typed loosely with
  `@ts-nocheck` since it's a large imperative DOM/canvas module) and invoked from a client
  component in `useEffect`. GSAP now comes from the `gsap` npm package instead of a CDN tag.
- **Content** — the section/prose markup is server-rendered via `dangerouslySetInnerHTML` from
  the `content/*` modules, so the animated inline SVGs render byte-for-byte identically and the
  page is fully SSR'd for SEO. The header and footer are real TSX components.
- **SEO** — page titles/descriptions/OG/Twitter via the Metadata API; `robots.ts`, `sitemap.ts`
  and `manifest.ts` replace the static files; JSON-LD is injected on the home page.

## Notes / next steps

- Replace the placeholder business details (name, `signalwireless-example.com`, phone
  `(512) 555-0147`, address) before launch.
- The original static site is untouched in the parent folder; delete it once you're happy here.
- To fully componentize each section into standalone TSX (instead of the injected markup),
  split `content/home.ts` into per-section components — the CSS and effects already key off the
  same class/id names, so it's a mechanical refactor.
