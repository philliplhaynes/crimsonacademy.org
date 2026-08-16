import { cn } from "@/lib/utils";

/**
 * A school leader speaking about their own division: pull quote, circular
 * portrait, handwritten first name with an arrow pointing at the photo.
 *
 * Used four times on /academics — once for the Head Mistress at the top of the
 * page, then once inside each of the three division bands (Nursery, Lower,
 * Upper). Because those bands alternate between cream, crimson and ink, the
 * component has to work on both light and dark grounds, hence `tone`.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THE QUOTES ARE DRAFTS AND MUST BE SIGNED OFF BEFORE THIS GOES LIVE.
 *
 * Every quote passed in from Academics.tsx was written from the facts in the
 * 2024–2025 Annual School Report, not transcribed from the person named. The
 * substance is accurate; the words are not theirs yet. Putting invented
 * sentences in a real member of staff's mouth on a public page is
 * misattribution, so each of the four leaders needs to read their own quote
 * and either approve it or replace it. See the QUOTES-TO-CONFIRM block in
 * Academics.tsx for the list.
 * ─────────────────────────────────────────────────────────────────────────
 */
export interface LeaderVoiceProps {
  name: string;
  /** Shown above the name, e.g. "Nursery School Leader". */
  role: string;
  /** First name (or the name they go by) for the handwritten annotation. */
  signature: string;
  /** Their words. Quote marks are added by the component — don't include them. */
  quote: string;
  /**
   * Imported portrait. Omit when the school has no photograph on file and the
   * component will fall back to a monogram disc — currently the case for
   * David, the Upper School Leader. See the leadership note in
   * StaffDirectory.tsx.
   */
  photo?: string;
  /**
   * An optional second passage, set as a card below the quote rather than as
   * more quotation. Used for the Head Mistress's note on syllabus structure,
   * which is explanatory rather than personal.
   */
  aside?: string;
  /** Which ground this sits on. `cream` for background/secondary bands, `dark` for primary/ink bands. */
  tone?: "cream" | "dark";
  /** Portrait on the right (default) or the left, so consecutive blocks can alternate. */
  side?: "right" | "left";
  className?: string;
}

export const LeaderVoice = ({
  name,
  role,
  signature,
  quote,
  photo,
  aside,
  tone = "cream",
  side = "right",
  className,
}: LeaderVoiceProps) => {
  const dark = tone === "dark";

  return (
    <figure
      className={cn(
        "m-0 grid items-center gap-10 sm:gap-14",
        /*
          The column template has to flip with `side`, not just the order
          classes. `order` moves an item into a different grid cell but the
          cells keep the widths the template gave them — so ordering the
          portrait first while leaving the template as [1fr 300px] put the
          portrait in the 1fr column and blew it up to ~1000px wide.
        */
        side === "right"
          ? "lg:grid-cols-[minmax(0,1fr)_300px]"
          : "lg:grid-cols-[300px_minmax(0,1fr)]",
        className,
      )}
    >
      <blockquote
        className={cn(
          "order-2 border-l-[3px] border-accent pl-6",
          side === "right" ? "lg:order-1" : "lg:order-2",
        )}
      >
        <p
          className={cn(
            "font-heading text-xl leading-snug sm:text-2xl",
            dark ? "text-primary-foreground" : "text-primary",
          )}
        >
          &ldquo;{quote}&rdquo;
        </p>

        {aside && (
          <div
            className={cn(
              "relative mt-7 rounded-xl px-7 pb-6 pt-7",
              dark ? "bg-primary-foreground/10" : "bg-secondary",
            )}
          >
            <span
              aria-hidden="true"
              className="absolute -top-4 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-accent font-heading text-3xl font-bold leading-none text-accent-foreground"
            >
              <span className="translate-y-1.5">&rdquo;</span>
            </span>
            <p
              className={cn(
                "mt-1 font-heading text-base leading-relaxed",
                dark ? "text-primary-foreground/85" : "text-eyebrow",
              )}
            >
              {aside}
            </p>
          </div>
        )}
      </blockquote>

      <figcaption
        className={cn(
          /* pt-7 buys clear space above the disc for the handwritten name, so
             the annotation sits beside the portrait rather than on top of it. */
          "relative order-1 mx-auto w-full max-w-[260px] pt-7 lg:max-w-none",
          side === "right" ? "lg:order-2" : "lg:order-1",
        )}
      >
        <div
          className={cn(
            "aspect-square overflow-hidden rounded-full",
            dark
              ? "bg-primary-foreground/10 ring-[3px] ring-accent ring-offset-[9px]"
              : "bg-primary ring-[3px] ring-primary ring-offset-[9px]",
            dark ? "ring-offset-transparent" : "ring-offset-background",
          )}
        >
          {photo ? (
            <img
              src={photo}
              alt={`${name}, ${role}`}
              className="h-full w-full object-cover object-[50%_22%]"
              loading="lazy"
            />
          ) : (
            /* No photograph on file — a monogram beats a broken avatar. */
            <div
              aria-hidden="true"
              className={cn(
                "flex h-full w-full items-center justify-center font-heading text-6xl font-bold",
                dark ? "text-accent" : "text-primary-foreground",
              )}
            >
              {name.charAt(0)}
            </div>
          )}
        </div>

        {/* Handwritten first name with an arrow back to the face — the one
            informal mark on an otherwise formal page. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute -top-1 right-0 font-hand text-2xl leading-none",
            dark ? "text-accent" : "text-primary",
          )}
        >
          {signature}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 62 54"
          fill="none"
          className="absolute right-10 top-4 h-9 w-11"
        >
          <path
            d="M58 4C52 22 42 34 24 40"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={dark ? "text-accent" : "text-primary"}
          />
          <path
            d="M24 40l11-2M24 40l6 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className={dark ? "text-accent" : "text-primary"}
          />
        </svg>

        <div
          className={cn(
            "mt-5 text-center text-[0.68rem] font-bold uppercase tracking-[0.11em]",
            dark ? "text-accent" : "text-eyebrow",
          )}
        >
          {role}
        </div>
        <div
          className={cn(
            "text-center font-heading text-lg font-bold leading-tight",
            dark ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {name}
        </div>
      </figcaption>
    </figure>
  );
};
