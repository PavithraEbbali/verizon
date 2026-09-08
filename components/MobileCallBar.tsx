import CallLink from "./CallLink";
import { PHONE } from "@/lib/site";

/**
 * §2.10 — fixed bottom call bar under 760px. Height stays within 64px plus the
 * iOS safe-area inset; the page wrapper carries matching bottom padding so no
 * footer copy is ever hidden behind it.
 */
export default function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-800 bg-verizon-black/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* 48px button + 12px padding + 1px border = 61px, inside the 64px cap. */}
      <div className="px-3 py-1.5">
        <CallLink
          variant="primary"
          placement="sticky-mobile-bar"
          icon={false}
          className="flex h-12 w-full text-[0.95rem]"
        >
          <span aria-hidden="true" className="mr-2 text-base">
            📞
          </span>
          Call {PHONE.display}
        </CallLink>
      </div>
    </div>
  );
}
