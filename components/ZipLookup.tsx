"use client";

import { useState, type FormEvent } from "react";
import CallLink from "./CallLink";
import { HERO } from "@/lib/content";

/**
 * ZIP availability lookup with a call-routing fallback.
 *
 * There is no backend and no serviceability API here by design. A ZIP code
 * cannot answer the availability question anyway — Fios is built out street by
 * street — so a valid ZIP routes the visitor to the order line, where an agent
 * confirms the exact address on the call.
 */
export default function ZipLookup() {
  const [zip, setZip] = useState("");
  const [state, setState] = useState<"idle" | "invalid" | "routed">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState(/^\d{5}$/.test(zip.trim()) ? "routed" : "invalid");
  }

  return (
    <div className="rounded-2xl border border-white/15 bg-black/45 p-5 backdrop-blur-sm">
      <form onSubmit={onSubmit} noValidate>
        <label htmlFor="zip" className="block text-sm font-bold text-white">
          {HERO.zip.label}
        </label>
        <p className="mt-1 text-[0.78rem] leading-5 text-neutral-300">{HERO.zip.help}</p>

        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            id="zip"
            name="zip"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="ZIP code"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
              if (state !== "idle") setState("idle");
            }}
            aria-invalid={state === "invalid"}
            aria-describedby={state === "invalid" ? "zip-error" : undefined}
            className="h-12 w-full rounded-full border border-white/25 bg-white px-5 text-[0.95rem] font-semibold text-verizon-black placeholder:font-normal placeholder:text-neutral-500 sm:w-40"
          />
          <button type="submit" className="btn-dark h-12 whitespace-nowrap border border-white/20">
            Check availability
          </button>
        </div>
      </form>

      <div aria-live="polite" className="empty:hidden">
        {state === "invalid" && (
          <p id="zip-error" className="mt-3 text-[0.8125rem] font-semibold text-verizon-red">
            {HERO.zip.invalid}
          </p>
        )}

        {state === "routed" && (
          <div className="mt-4 rounded-xl border border-white/15 bg-white/10 p-4">
            <p className="text-[0.875rem] font-bold text-white">{HERO.zip.resultTitle}</p>
            <p className="mt-1 text-[0.8125rem] leading-5 text-neutral-200">{HERO.zip.resultBody}</p>
            <CallLink placement="hero-zip-result" className="mt-3 w-full sm:w-auto">
              Call to order
            </CallLink>
          </div>
        )}
      </div>
    </div>
  );
}
