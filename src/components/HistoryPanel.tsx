import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { chapters, heads } from "@/data/history";
import { cn } from "@/lib/utils";

/**
 * The compact history summary for /about — a crimson panel carrying all eight
 * chapters as a horizontally scrolling milestone rail, then the three head
 * teachers, then a link through to the full page.
 *
 * Why this shape:
 *  - History used to live entirely on /about, was split out to /about/history
 *    for weight (eight full-size photos, ~1.6 MB), and left behind a text-only
 *    teaser that read as an unfinished stub. This puts the story back at ~213 KB
 *    by rendering 440px thumbnails instead of the originals. The full-size
 *    photos stay on /about/history, which the CTA links to.
 *  - It's a contained panel, not a full-bleed band. The About page's content
 *    sits in an editorial column beside a sticky rail; a band breaking out of
 *    that column would collide with the rail.
 *
 * Every card links to /about/history rather than to a per-chapter route,
 * because there are no per-chapter routes — the full page is the destination.
 */
export const HistoryPanel = () => (
  <div className="mt-6 rounded-xl bg-primary p-6 text-primary-foreground sm:p-7">
    <div className="text-xs font-semibold uppercase tracking-wider text-accent">Fifteen years</div>
    <h3 className="mt-1.5 font-heading text-xl font-semibold sm:text-2xl">
      Eight chapters, 2009 to today.
    </h3>
    <p className="mt-2.5 max-w-prose text-sm text-primary-foreground/85">
      The land was bought with permission given first, and the first classrooms were built by the
      families whose children would sit in them.
    </p>

    {/* Horizontal rail. min-w-0 on the ancestors (the doc column) is what keeps
        this scrolling inside its own box instead of widening the page. */}
    <ul className="mt-5 grid auto-cols-[minmax(10.5rem,1fr)] grid-flow-col gap-3.5 overflow-x-auto pb-3">
      {chapters.map((c) => (
        <li key={c.era + c.title}>
          <Link to="/about/history" className="group block focus-visible:outline-none">
            <div className="overflow-hidden rounded-lg">
              {c.thumb ? (
                <img
                  src={c.thumb}
                  alt={c.alt ?? ""}
                  loading="lazy"
                  width={440}
                  height={330}
                  className={cn(
                    "aspect-[4/3] w-full object-cover transition-transform duration-300 ease-out",
                    "group-hover:scale-105 group-focus-visible:scale-105",
                    "motion-reduce:transition-none motion-reduce:group-hover:scale-100",
                  )}
                />
              ) : (
                <div className="aspect-[4/3] w-full bg-primary-foreground/10" />
              )}
            </div>
            <div className="mt-2.5 font-heading text-base font-bold text-accent">{c.era}</div>
            <div className="mt-0.5 font-heading text-sm font-semibold leading-snug group-hover:underline">
              {c.title}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-primary-foreground/75">{c.blurb}</p>
          </Link>
        </li>
      ))}
    </ul>
    <p className="text-xs text-primary-foreground/60">Scroll for all eight chapters →</p>

    <div className="mt-6 border-t border-primary-foreground/20 pt-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-accent">
        Three head teachers in fifteen years
      </div>
      <ul className="mt-3 grid gap-3.5 sm:grid-cols-3">
        {heads.map((h) => (
          <li key={h.name} className="flex items-center gap-2.5">
            {h.photo && (
              <img
                src={h.photo}
                alt={`Portrait of ${h.name}`}
                loading="lazy"
                width={42}
                height={42}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            )}
            <div className="min-w-0">
              <div className="text-[0.65rem] font-bold uppercase tracking-wide text-accent">
                {h.years}
              </div>
              <div className="font-heading text-sm font-semibold leading-tight">{h.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>

    <Link
      to="/about/history"
      className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
    >
      Read the full history, chapter by chapter
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  </div>
);
