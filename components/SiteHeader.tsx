"use client";

import { useEffect, useState } from "react";
import CallLink from "./CallLink";
import { NAV_LINKS } from "@/lib/content";
import Wordmark from "./Wordmark";
import { BRAND } from "@/lib/site";

/**
 * §2.1 — sticky header.
 *
 * The wordmark is the Verizon lockup locked to "Authorized Retailer" — never
 * the Verizon logo standing alone. See `BRAND` in lib/site.ts.
 */
export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close the drawer on Escape, and lock body scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-v">
        <nav className="flex h-[68px] items-center justify-between gap-4" aria-label="Primary">
          <a
            href="#top"
            aria-label={`${BRAND.wordmark} ${BRAND.tag}, back to top`}
          >
            <Wordmark tone="light" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-2 text-[0.875rem] font-semibold text-neutral-700 transition-colors hover:bg-verizon-mist hover:text-verizon-black"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <CallLink placement="header" className="hidden sm:inline-flex" />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-verizon-black lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-neutral-200 bg-white lg:hidden">
          <ul className="container-v flex flex-col py-2">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-neutral-100 py-3 text-[0.95rem] font-semibold text-verizon-black"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <CallLink placement="header-mobile-drawer" className="w-full" />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
