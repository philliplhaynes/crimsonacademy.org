import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { PhotoSlot } from "@/components/PhotoSlot";
import { cn } from "@/lib/utils";
import { chapters, keyDates, heads, type Chapter } from "@/data/history";

/**
 * The school's history as an editorial photo grid, not a scroll of full-bleed
 * bands — the "Magazine" direction from the /about/history design exploration
 * (two mockups compared, this one chosen). 2009, 2013 and 2026 — the permission
 * that made the school possible, the first result, and the finished campus —
 * get large featured cards; the rest sit as smaller tiles. Every card is a
 * button that expands in place to the full chapter text, so the grid is
 * scannable at a glance but nothing is lost.
 *
 * The chapter/keyDates/heads data moved to src/data/history.ts, because the
 * About page's milestone rail renders the same chapters from thumbnails. One
 * array, two consumers.
 *
 * Comparison board + the runner-up ("The Rail", a compact vertical timeline)
 * live in content/history-mockups/ at the repo root, outside the app.
 */

/**
 * A single grid card. Always shows era + title; featured cards additionally
 * show their first paragraph as a teaser (they're already big enough to
 * carry it). Clicking any card expands it in place to the remaining
 * paragraphs — real content, not a link to nowhere, which is why this is a
 * <button> rather than an <a> like the exploration mockup used.
 *
 * Motion is deliberately minimal: a hover/focus image zoom (transform only,
 * ~300ms) and the expand panel's height transition, both skipped entirely
 * under prefers-reduced-motion via Tailwind's motion-reduce: variant. No
 * scroll-triggered reveal-on-load — the rural-mobile audience this site is
 * built for was the reason that was left out sitewide during an earlier
 * design pass, and this redesign doesn't reopen that decision.
 */
const ChapterCard = ({ chapter: c }: { chapter: Chapter }) => {
  const [open, setOpen] = useState(false);
  const teaserCount = c.size === "featured" ? 1 : 0;
  const hiddenParagraphs = c.body.slice(teaserCount);
  const hasMore = hiddenParagraphs.length > 0;

  return (
    <button
      type="button"
      onClick={() => hasMore && setOpen((v) => !v)}
      aria-expanded={hasMore ? open : undefined}
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-lg text-left text-primary-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        c.size === "featured" ? "min-h-[22rem] sm:min-h-[26rem]" : "min-h-[15rem]",
        c.span,
        !hasMore && "cursor-default",
      )}
    >
      {c.photo ? (
        <img
          src={c.photo}
          alt={c.alt ?? ""}
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <PhotoSlot
          ratio="fill"
          brief={c.brief}
          source={c.source}
          compact
          className="absolute inset-0 -z-20"
        />
      )}
      {/* Ink gradient (the site's warm near-black, not raw #000) so overlaid
          text stays readable regardless of the photo underneath. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground/90 via-foreground/15 to-transparent"
      />

      <div className={cn("relative p-5", c.size === "featured" && "sm:max-w-xl")}>
        <div className="text-xs font-bold uppercase tracking-widest text-accent">
          {c.era}
          {c.size === "featured" && " — Milestone"}
        </div>
        <h3 className={cn("mt-1.5 font-heading font-semibold", c.size === "featured" ? "text-2xl sm:text-3xl" : "text-lg")}>
          {c.title}
        </h3>

        {teaserCount > 0 && (
          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">{c.body[0]}</p>
        )}

        {hasMore && (
          <>
            {/* grid-template-rows 0fr→1fr: an auto-height-friendly expand,
                unlike max-height it doesn't need a guessed cap. */}
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="space-y-3 pt-3 text-sm leading-relaxed text-primary-foreground/85">
                  {hiddenParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-accent">
              {open ? "Read less" : "Read more"}
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform duration-300 motion-reduce:transition-none", open && "rotate-180")}
                aria-hidden="true"
              />
            </div>
          </>
        )}
      </div>
    </button>
  );
};

export const SchoolHistory = () => (
  // No heading here on purpose — this now renders directly under
  // AboutHistory.tsx's own PageHero, which already carries this exact title
  // and lede as the page's H1. A second "From one visit to a full campus."
  // heading right below it would just repeat the hero verbatim.
  <section id="history" className="scroll-mt-32">
    {/* ---------- narrative chapters, as an editorial photo grid ---------- */}
    <div className="container pt-8 sm:pt-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {chapters.map((c) => (
          <ChapterCard key={c.era + c.title} chapter={c} />
        ))}
      </div>
    </div>

    {/* ---------- key dates, as a scannable index rather than a carousel --------- */}
    <div className="container pt-16">
      <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">Key dates</div>
      <h3 className="mt-2 font-heading text-2xl font-semibold md:text-3xl">
        Fifteen years, in short.
      </h3>
      {/*
        Per-cell right/bottom borders, not the mockup's container-background-
        through-gaps trick — that broke when a non-round column count (5)
        left the last row partly empty, showing a solid grey block through
        the gaps where no cell existed. 12 key dates divides evenly at every
        breakpoint used here (1, 2, 4 columns), so every row always fills and
        the simpler border approach can't hit that failure mode.
      */}
      <div className="mt-6 overflow-hidden rounded-lg border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {keyDates.map((d, i) => (
            <div key={i} className="border-b border-r p-4 [&:nth-child(4n)]:border-r-0 last:border-b-0">
              <div className="font-heading text-xl font-bold text-primary">{d.year}</div>
              <div className="mt-1 text-sm text-muted-foreground">{d.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ---------- the leadership line ---------- */}
    <div className="container mt-16 border-t pt-12">
      <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">
        Head teachers
      </div>
      <h3 className="mt-2 font-heading text-2xl font-semibold md:text-3xl">
        Three head teachers in fifteen years.
      </h3>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {heads.map((h) => (
          <div key={h.name} className="flex gap-4 border-l-2 border-accent pl-5">
            {h.photo ? (
              <img
                src={h.photo}
                alt={`Portrait of ${h.name}`}
                className="h-16 w-16 shrink-0 rounded-full object-cover"
                loading="lazy"
                width={64}
                height={64}
              />
            ) : (
              // Wrapped in a fixed-size box rather than sizing PhotoSlot
              // itself: PhotoSlot's own ratio classes (w-full etc.) and a
              // fixed h-16 w-16 override would fight for specificity since
              // they're equal-specificity utility classes — ratio="fill"
              // sizes to the wrapper instead, sidestepping that.
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
                <PhotoSlot ratio="fill" brief={`Portrait of ${h.name}`} compact />
              </div>
            )}
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">
                {h.years}
              </div>
              <div className="mt-1 font-heading text-lg font-semibold">{h.name}</div>
              <p className="mt-2 text-sm text-muted-foreground">{h.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ---------- close ---------- */}
    <div className="container mt-16 border-t py-12">
      <p className="max-w-3xl leading-relaxed text-muted-foreground">
        Since our founding we have sought to provide quality education for marginalized
        school-aged children in the Kamonyi District. Alongside the classroom, the school runs
        transportation for students who live far away, a food programme for nursery students, and
        micro-loan and livestock programmes for families in the village.
      </p>
      <Link
        to="/academics"
        className="mt-6 inline-flex items-center gap-2 font-medium text-primary underline underline-offset-4"
      >
        See what learning at Crimson looks like today
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  </section>
);
