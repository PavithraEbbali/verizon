import type { Media } from "@/lib/content";

interface Props {
  media: Media;
  /** Aspect the slot crops to. The sources are all roughly 16:9. */
  ratio?: "16/9" | "4/3" | "21/9";
  /** Tells the browser how wide this will actually render, so it can pick well. */
  sizes?: string;
  className?: string;
  /** Hero art only — everything else stays lazy. */
  priority?: boolean;
}

const RATIO: Record<NonNullable<Props["ratio"]>, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "21/9": "aspect-[21/9]",
};

/**
 * The single wrapper every non-hero image on the site renders through.
 *
 * Carries explicit `width`/`height` from the real file so the browser reserves
 * the box before the bytes arrive (no layout shift), and `loading="lazy"` on
 * everything below the fold.
 */
export default function SectionMedia({
  media,
  ratio = "16/9",
  sizes,
  className = "",
  priority = false,
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-neutral-200 bg-verizon-mist ${RATIO[ratio]} ${className}`.trim()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
