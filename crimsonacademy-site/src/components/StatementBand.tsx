import { DisplayHeading } from "./DisplayHeading";
import { cn } from "@/lib/utils";

/**
 * A full-bleed band carrying one idea at poster scale, with nothing else
 * competing for attention — the pacing device berkeleycarroll.org uses
 * between content sections.
 *
 * This is NOT a replacement for `Band` in PosterHero.tsx. Band is a
 * container for a full content section that happens to sit on a colour;
 * this is a punctuation mark between sections. If it grows cards, columns
 * or a photo grid, it has stopped being a statement and should be a Band.
 *
 * `ink` exists so consecutive statements on one page don't repeat the same
 * crimson — the Home page alternates crimson for the school's identity and
 * keeps ink available for a second, quieter moment.
 */
export const StatementBand = ({
  id,
  eyebrow,
  lead,
  pop,
  body,
  ground = "crimson",
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  lead: string;
  pop?: string;
  body?: string;
  ground?: "crimson" | "ink";
  /** Actions, rendered under the body. */
  children?: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={cn(
      "relative scroll-mt-32 overflow-hidden py-16 text-center text-primary-foreground sm:py-20",
      ground === "crimson" ? "bg-primary" : "bg-ink",
      className,
    )}
  >
    {/* The paper-dot texture, matched to Band's so a statement and a
        coloured Band read as the same material. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:15px_15px]"
    />
    <div className="container relative z-[1]">
      {eyebrow && (
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{eyebrow}</div>
      )}
      <DisplayHeading
        lead={lead}
        pop={pop}
        size="statement"
        align="center"
        light
        className={eyebrow ? "mt-4" : undefined}
      />
      {body && (
        <p className="mx-auto mt-5 max-w-[54ch] leading-relaxed text-primary-foreground/85">
          {body}
        </p>
      )}
      {children && <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  </section>
);
