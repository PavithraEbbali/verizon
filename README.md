# Verizon Authorized Retailer — one-page site

A Next.js 14 (App Router) + TypeScript + Tailwind landing site for an
**independent authorized retailer of Verizon® services**, plus nine legal pages.

## Run locally

```bash
npm install
npm run dev
```

Then open <http://localhost:4322>.

> On a OneDrive-synced path, alternating `npm run build` and `npm run dev`
> against the same `.next` directory can fail with `EINVAL: readlink`. Delete
> `.next` between the two if that happens.

## Deploy to Vercel

The app is at the repository root, so no configuration is needed:

1. Import this repository at <https://vercel.com/new>.
2. Leave every setting on its default — Vercel auto-detects Next.js, and the
   default build command, install command, output directory and root directory
   are all correct.
3. Deploy.

No environment variables are required. The site has no backend, no database and
no API routes.

## Structure

```
app/                    App Router — layout, home page, 9 legal routes,
                        robots.ts, sitemap.ts, manifest.ts
components/             All UI. CallLink and PriceLockup are the only ways to
                        render a tel: link or a price.
lib/site.ts             Every operator constant (entity, phone, address, email)
lib/content.ts          Every plan name, rate, speed, qualifier and disclaimer
content/legal.ts        The nine policy documents, token-driven
public/img/             Optimised WebP art (~683 KB total)
convert-images.js       One-shot pipeline that produced public/img from
                        image-originals/ (resize, strip watermark, WebP)
fix-hero-seam.js        Feathers the hard seam in the generated hero art
```

## Before this takes live traffic

These are the launch blockers. All of them live in one file, [`lib/site.ts`](lib/site.ts):

| Constant | Currently | Needs to be |
|---|---|---|
| `PHONE.display` / `PHONE.href` | `(833) 490-1105` | Your real order line |
| `OPERATOR.legalName` | `Signal Wireless LLC` | Your registered entity |
| `OPERATOR.address` | Austin placeholder | Your registered business address |
| `OPERATOR.email` and the three other inboxes | `…@signalwireless-example.com` | Your real addresses |
| `OPERATOR.siteUrl` | `signalwireless-example.com` | Your production domain |

Changing them there propagates everywhere, including all nine legal pages,
which are token-driven.

**Also re-verify every price** in [`lib/content.ts`](lib/content.ts) against
Verizon's current rate card. Verizon sets all pricing and terms, and several
figures in there are plausible placeholders rather than sourced rates.

## Compliance notes

This site is built to be a transparent authorized-retailer site. Do not remove:

- the persistent top disclosure bar (`Independent Authorized Retailer of
  Verizon® — Not Verizon`),
- the trademark attribution in the footer,
- the "new orders only" routing language, or
- the `data-call-cta` attribute on tap-to-call links, applied automatically by
  [`CallLink`](components/CallLink.tsx) — never hand-write a `tel:` link.

The operating entity is named in the footer, the Organization schema, the author
meta tag and the identity FAQ answer. Those must name the real company; the
Verizon wordmark is display branding only and is always locked to
"Authorized Retailer".
