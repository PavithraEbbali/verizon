import { BRAND } from "@/lib/site";

interface Props {
  /** `dark` for the black footer, `light` for the white header. */
  tone?: "light" | "dark";
  className?: string;
}

/**
 * The site's brand lockup: the Verizon wordmark with its check, always locked
 * to the "Authorized Retailer" line beneath it.
 *
 * The tag is part of the mark and is never rendered without it — the wordmark
 * must not appear as a standalone Verizon logo (§2.1).
 */
export default function Wordmark({ tone = "light", className = "" }: Props) {
  return (
    <span className={`flex flex-col leading-none ${className}`.trim()}>
      <span className="flex items-start gap-0.5">
        <span
          className={`text-[1.5rem] font-bold lowercase tracking-[-0.045em] ${
            tone === "dark" ? "text-white" : "text-verizon-black"
          }`}
        >
          {BRAND.wordmark}
        </span>
        <span aria-hidden="true" className="mt-0.5 text-verizon-red">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12.5 9.5 19 21 4"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      <span
        className={`mt-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] sm:text-[0.6rem] sm:tracking-[0.16em] ${
          tone === "dark" ? "text-verizon-slate" : "text-verizon-red"
        }`}
      >
        {BRAND.tag}
      </span>
    </span>
  );
}
