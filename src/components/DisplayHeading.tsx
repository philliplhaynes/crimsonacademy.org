import { cn } from "@/lib/utils";

/**
 * A two-tone display heading: the first clause in the body colour, the
 * second in the accent colour, optionally underlined with the gold swash.
 *
 * This is berkeleycarroll.org's most recognisable typographic move, adopted
 * here as a site-wide device rather than a home-page one. Pass the emphasis
 * explicitly via `pop` — there is deliberately no auto-splitting on the last
 * word, because where the emphasis falls is an editorial decision ("What
 * learning / looks like here." reads very differently from "What learning
 * looks like / here.").
 *
 * `pop` is optional. Single-word titles — Academics, Portal — have nowhere
 * natural to break, so they render single-tone rather than being forced into
 * a split that reads as a mistake.
 *
 * THREE SIZES, and the distinction matters more than it looks:
 *
 *   statement — uppercase, black weight, poster scale. Full-bleed bands.
 *   display   — uppercase, black weight, section scale. The home page's
 *               centred section heads.
 *   section   — SENTENCE CASE, semibold, section scale. Everything on the
 *               interior pages.
 *
 * `section` is not just a smaller `display`, and conflating them was a real
 * mistake caught by looking at the built page: rendering interior section
 * headings as uppercase black display type turned a heading like "The
 * question behind every other question on this page." into two lines of
 * enormous caps that dominated the page it was supposed to introduce.
 *
 * The device being pushed across the site is the TWO-TONE COLOUR SPLIT. The
 * uppercase poster styling belongs to heroes and statement bands only.
 */
const swashStroke = (light: boolean) => (light ? "hsl(var(--accent))" : "hsl(var(--primary))");

export const DisplayHeading = ({
  lead,
  pop,
  as: Tag = "h2",
  align = "left",
  light = false,
  swash = false,
  size = "section",
  className,
}: {
  lead: string;
  /** The emphasised clause, rendered in the accent colour. */
  pop?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  /** For crimson/ink grounds: body text goes cream, the accent goes gold. */
  light?: boolean;
  swash?: boolean;
  /** See the note above — `section` is sentence case, not a smaller `display`. */
  size?: "statement" | "display" | "section";
  className?: string;
}) => (
  <Tag
    className={cn(
      // w-fit + max-w-full is what makes the swash track the text width
      // rather than the column width — the same trick PosterHero uses.
      "w-fit max-w-full font-heading",
      // break-words because display type runs long and has no natural break
      // points; a wrapped word beats a horizontally scrolling page. See the
      // Home hero for the case that proved it.
      "break-words",
      size === "statement" &&
        "text-[clamp(1.9rem,7vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.015em]",
      size === "display" &&
        "text-[clamp(1.6rem,4.5vw,3.375rem)] font-black uppercase leading-[0.95] tracking-[-0.015em]",
      size === "section" && "text-2xl font-semibold leading-tight md:text-3xl",
      align === "center" && "mx-auto text-center",
      light ? "text-primary-foreground" : "text-foreground",
      className,
    )}
  >
    {lead}
    {pop && (
      <>
        {" "}
        <span className={light ? "text-accent" : "text-primary"}>{pop}</span>
      </>
    )}
    {swash && (
      /* Inside the heading, not beside it, so `em` resolves against the
         clamped size and the rule thickness tracks the type automatically. */
      <svg
        aria-hidden="true"
        viewBox="0 0 400 20"
        fill="none"
        preserveAspectRatio="none"
        className="mt-[0.1em] block h-[0.13em] w-full overflow-visible"
      >
        <path
          d="M4 13C60 5 128 4 196 8c62 4 126 6 200 1"
          stroke={swashStroke(light)}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    )}
  </Tag>
);
