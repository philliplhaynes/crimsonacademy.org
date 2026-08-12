import { DisplayHeading } from "./DisplayHeading";
import { cn } from "@/lib/utils";

/**
 * Eyebrow + heading + optional lede — the section header used across the
 * site.
 *
 * Built on DisplayHeading so the two-tone treatment and the type scale live
 * in one place. `pop` is optional throughout: a heading with no natural
 * emphasis renders single-tone rather than being forced into a split.
 *
 * `align` exists because the home page centres its headers (following
 * berkeleycarroll.org's home page) while the interior pages left-align
 * theirs (following its interior pages). That difference is deliberate, not
 * drift — see the note in Home.tsx.
 */
export const SectionHead = ({
  eyebrow,
  title,
  pop,
  lede,
  align = "left",
  light = false,
  swash = false,
  size = "section",
  className,
}: {
  eyebrow: string;
  title: string;
  /** Emphasised clause of the heading, in the accent colour. */
  pop?: string;
  lede?: string;
  align?: "left" | "center";
  /** For crimson/ink grounds, where the muted foreground colours invert. */
  light?: boolean;
  swash?: boolean;
  /**
   * `section` (sentence case) is the default and what every interior page
   * uses. The home page passes `display` for its centred uppercase heads.
   */
  size?: "display" | "section";
  className?: string;
}) => (
  <div className={cn(align === "center" && "text-center", className)}>
    <div
      className={cn(
        "text-xs font-semibold uppercase tracking-wider",
        light ? "text-accent" : "text-eyebrow",
      )}
    >
      {eyebrow}
    </div>
    <DisplayHeading
      lead={title}
      pop={pop}
      align={align}
      light={light}
      swash={swash}
      size={size}
      className="mt-3"
    />
    {lede && (
      <p
        className={cn(
          "mt-5 max-w-[62ch] leading-relaxed",
          align === "center" && "mx-auto",
          light ? "text-primary-foreground/85" : "text-muted-foreground",
        )}
      >
        {lede}
      </p>
    )}
  </div>
);
