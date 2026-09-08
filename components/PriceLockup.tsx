import type { PriceLockup as PriceLockupData } from "@/lib/content";

interface Props {
  price: PriceLockupData;
  /** Optional secondary rate, e.g. the mobile-bundle price. */
  altPrice?: string;
  className?: string;
}

/**
 * §3 canonical price lockup — the single component every price on the site
 * renders through.
 *
 * The visual row is `aria-hidden` because a screen reader reading
 * "$ 49 .99 /mo" as separate nodes is noise; an `sr-only` sentence carries the
 * real value. Baseline alignment is done with flex, not superscripts.
 */
export default function PriceLockup({ price, altPrice, className = "" }: Props) {
  const { integer, cents, per, qualifier, step } = price;
  const spoken = `$${integer}${cents ?? ""} per month`;

  return (
    <div className={`lockup ${className}`.trim()}>
      <p className="lockup__row" aria-hidden="true">
        <span className="lockup__cur">$</span>
        <span className="lockup__int">{integer}</span>
        {cents && <span className="lockup__cents">{cents}</span>}
        <span className="lockup__per">{per}</span>
      </p>
      <p className="sr-only">{spoken}</p>
      <p className="lockup__qual">{qualifier}</p>
      <p className="lockup__step">{step}</p>
      {altPrice && <p className="lockup__alt">{altPrice}</p>}
      <p className="lockup__fine">
        <a href="#fine-print">Pricing details below</a>
      </p>
    </div>
  );
}
