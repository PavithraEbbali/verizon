import CallLink from "./CallLink";
import { DISCLOSURE, PHONE } from "@/lib/site";

/**
 * §2.0 — persistent, non-dismissable disclosure. There is deliberately no
 * close button: this bar must remain visible on every page view.
 */
export default function TopDisclosureBar() {
  return (
    <div className="bg-verizon-black text-white" role="note">
      <div className="container-v flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-2 text-center text-[0.78rem] leading-snug sm:text-[0.8125rem]">
        <span className="font-semibold">{DISCLOSURE.bar}</span>
        <span className="text-neutral-300">
          Call to order:{" "}
          <CallLink
            variant="bare"
            placement="top-disclosure-bar"
            icon={false}
            className="font-bold text-white underline underline-offset-2 hover:text-verizon-mist"
          >
            {PHONE.display}
          </CallLink>
        </span>
      </div>
    </div>
  );
}
