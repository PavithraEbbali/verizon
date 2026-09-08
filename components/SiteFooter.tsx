import CallLink from "./CallLink";
import Wordmark from "./Wordmark";
import { FOOTER_LEGAL_LINKS, NAV_LINKS } from "@/lib/content";
import { DISCLOSURE, OPERATOR, PHONE, formattedAddress } from "@/lib/site";

/** §2.9 / §7.5 — compliance footer. */
export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-800 bg-verizon-black text-neutral-300">
      <div className="container-v py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark tone="dark" />

            <p className="mt-5 max-w-md text-[0.8125rem] leading-6">{DISCLOSURE.reseller}</p>

            <div className="mt-6">
              <CallLink placement="footer" />
              <p className="mt-2 text-[0.75rem] text-verizon-slate">{PHONE.hours}</p>
              <p className="mt-1 text-[0.75rem] text-verizon-slate">{DISCLOSURE.newOrdersOnly}</p>
            </div>
          </div>

          <nav aria-label="Sections">
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white">Explore</h2>
            <ul className="mt-3 space-y-0.5 sm:mt-4 sm:space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="-mx-2 block rounded px-2 py-2 text-[0.8125rem] transition-colors hover:text-white sm:mx-0 sm:px-0 sm:py-0"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Policies">
            <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white">Policies</h2>
            <ul className="mt-3 space-y-0.5 sm:mt-4 sm:space-y-2.5">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="-mx-2 block rounded px-2 py-2 text-[0.8125rem] leading-snug transition-colors hover:text-white sm:mx-0 sm:px-0 sm:py-0"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 space-y-3 border-t border-neutral-800 pt-8 text-[0.75rem] leading-6 text-verizon-slate">
          <p>{DISCLOSURE.trademark}</p>
          <p>
            <span className="font-semibold text-neutral-300">{OPERATOR.legalName}</span> · {formattedAddress} ·{" "}
            <a
              href={`mailto:${OPERATOR.email}`}
              className="underline underline-offset-2 hover:text-white"
            >
              {OPERATOR.email}
            </a>
          </p>
          <p>
            © {OPERATOR.copyrightYear} {OPERATOR.legalName} — Not Verizon.
          </p>
        </div>
      </div>
    </footer>
  );
}
