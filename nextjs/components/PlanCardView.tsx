import CallLink from "./CallLink";
import Check from "./Check";
import PriceLockup from "./PriceLockup";
import type { PlanCard } from "@/lib/content";

interface Props {
  plan: PlanCard & { hotspot?: string };
  /** Forwarded to call attribution so each card is distinguishable. */
  placement: string;
}

export default function PlanCardView({ plan, placement }: Props) {
  return (
    <article className={`card-v ${plan.featured ? "card-v--featured" : ""}`.trim()}>
      {plan.badge && (
        <span className="absolute -top-3 left-6 rounded-full bg-verizon-red px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white">
          {plan.badge}
        </span>
      )}

      <h3 className="text-[1.15rem] font-bold">{plan.name}</h3>
      {plan.speeds && (
        <p className="mt-1 text-[0.8125rem] font-semibold text-verizon-slate">{plan.speeds}</p>
      )}
      {plan.hotspot && (
        <p className="mt-1 text-[0.8125rem] font-semibold text-verizon-slate">{plan.hotspot}</p>
      )}

      <p className="mt-3 text-[0.875rem] leading-6 text-neutral-600">{plan.summary}</p>

      <div className="mt-5 border-t border-neutral-200 pt-5">
        <PriceLockup price={plan.price} altPrice={plan.altPrice} />
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-[0.85rem] leading-6 text-neutral-700">
            <Check />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <CallLink
          variant={plan.featured ? "primary" : "outline"}
          placement={`${placement}-${plan.id}`}
          className="w-full"
        >
          Call to order
        </CallLink>
      </div>
    </article>
  );
}
