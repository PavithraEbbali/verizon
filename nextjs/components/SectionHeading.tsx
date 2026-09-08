import Reveal from "./Reveal";

interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Id for the `aria-labelledby` on the owning section. */
  titleId: string;
  align?: "left" | "center";
  /**
   * `dark` inverts the type for sections that sit on a dark ground. The base
   * stylesheet colours every h2 near-black, so a dark section must opt out
   * explicitly or the heading disappears into its own background.
   */
  tone?: "light" | "dark";
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  titleId,
  align = "left",
  tone = "light",
}: Props) {
  const dark = tone === "dark";

  return (
    <Reveal className={align === "center" ? "mx-auto max-w-3xl text-center" : ""}>
      <p className={`eyebrow ${dark ? "text-verizon-red" : ""}`.trim()}>{eyebrow}</p>
      <h2 id={titleId} className={`section-title ${dark ? "text-white" : ""}`.trim()}>
        {title}
      </h2>
      {intro && (
        <p
          className={`section-intro ${align === "center" ? "mx-auto" : ""} ${
            dark ? "text-neutral-300" : ""
          }`.trim()}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
