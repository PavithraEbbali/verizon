# Verizon Authorized Retailer — one-page site

A Next.js 14 (App Router) + TypeScript + Tailwind landing site for an
**independent authorized retailer of Verizon® services**, plus nine legal pages.

The deployable application lives in [`nextjs/`](nextjs). The files at the repo
root (`index.html`, `assets/`, `legal/`) are the original static build that this
project replaced; they are kept for reference and are not deployed.

---

## Run locally

```bash
cd nextjs
npm install
npm run dev
```

Then open <http://localhost:4322>.

> On a OneDrive-synced path, alternating `npm run build` and `npm run dev`
> against the same `.next` directory can fail with `EINVAL: readlink`. Delete
> `.next` between the two if that happens.

## Deploy to Vercel

The Next app is in a subdirectory, so Vercel needs to be told where it is:

1. Import this repository at <https://vercel.com/new>.
2. **Set _Root Directory_ to `nextjs`.** This is the only required setting —
   Vercel then auto-detects Next.js and the default build and output settings
   are correct.
3. Framework preset: **Next.js**. Build command, install command and output
   directory can all be left on their defaults.
4. No environment variables are needed. The site has no backend, no database
   and no API routes.

Deploy. Nothing else is required.

---

## Before this takes live traffic

These are the launch blockers. All of them live in one file,
[`nextjs/lib/site.ts`](nextjs/lib/site.ts):

| Constant | Currently | Needs to be |
|---|---|---|
| `PHONE.display` / `PHONE.href` | `(833) 490-1105` | Your real order line |
| `OPERATOR.legalName` | `Signal Wireless LLC` | Your registered entity |
| `OPERATOR.address` | Austin placeholder | Your registered business address |
| `OPERATOR.email` and the three other inboxes | `…@signalwireless-example.com` | Your real addresses |
| `OPERATOR.siteUrl` | `signalwireless-example.com` | Your production domain |

Changing them there propagates everywhere, including all nine legal pages,
which are token-driven.

**Also re-verify every price** in [`nextjs/lib/content.ts`](nextjs/lib/content.ts)
against Verizon's current rate card. Verizon sets all pricing and terms, and
several figures in there are plausible placeholders rather than sourced rates.

## Compliance notes

This site is built to be a transparent authorized-retailer site. Do not remove:

- the persistent top disclosure bar (`Independent Authorized Retailer of
  Verizon® — Not Verizon`),
- the trademark attribution in the footer,
- the "new orders only" routing language, or
- the `data-call-cta` attribute on tap-to-call links, which is applied
  automatically by [`CallLink`](nextjs/components/CallLink.tsx) — never
  hand-write a `tel:` link.

The operating entity is named in the footer, the Organization schema, the author
meta tag and the identity FAQ answer. Those must name the real company; the
Verizon wordmark is display branding only and is always locked to
"Authorized Retailer".
