import type { ReactNode } from "react";
import { PHONE } from "@/lib/site";

interface CallLinkProps {
  /** Visual treatment. `bare` inherits its surroundings. */
  variant?: "primary" | "dark" | "outline" | "bare";
  size?: "md" | "lg";
  className?: string;
  /** Where on the page this CTA sits — forwarded for call attribution. */
  placement: string;
  /** Defaults to the phone number itself so the number is always visible. */
  children?: ReactNode;
  /** Renders the handset glyph before the label. */
  icon?: boolean;
  "aria-label"?: string;
}

const VARIANTS: Record<NonNullable<CallLinkProps["variant"]>, string> = {
  primary: "btn-primary",
  dark: "btn-dark",
  outline: "btn-outline",
  bare: "",
};

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The only sanctioned way to render a `tel:` link.
 *
 * Every tap-to-call element on the site — top bar, nav, hero, cards, steps,
 * FAQ, footer, mobile bar — goes through here, which guarantees the
 * `data-call-cta` attribute required by §2 call tracking is never missed.
 */
export default function CallLink({
  variant = "primary",
  size = "md",
  className = "",
  placement,
  children,
  icon = true,
  "aria-label": ariaLabel,
}: CallLinkProps) {
  const classes = [VARIANTS[variant], size === "lg" ? "btn-lg" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={`tel:${PHONE.href}`}
      data-call-cta=""
      data-call-placement={placement}
      className={classes || undefined}
      aria-label={ariaLabel ?? `Call the order line at ${PHONE.display}`}
    >
      {icon && <PhoneIcon />}
      {children ?? `Call ${PHONE.display}`}
    </a>
  );
}
