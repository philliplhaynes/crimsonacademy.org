import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Band } from "@/components/PosterHero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { stories, terms, upcomingDates } from "@/data/news";

/**
 * News and dates, in pieces so /news and /admissions can share them.
 *
 * Berkeley Carroll runs a post slideshow on their Admissions page for a
 * specific reason: a family choosing a school wants to see it in motion, and
 * wants the dates. This is that, minus the carousel.
 *
 *   NewsGrid      a lead story with the rest beside it
 *   DatedEvents   the calendar, as a narrow rail or a full-width row
 *   TermList      the three terms
 *   NewsEventsBand  all of it as one band — used at the foot of /admissions
 *
 * Content comes from src/data/news.ts, shared by both pages, so the dates can
 * never disagree between them. The dated events are still the 2024–2025
 * calendar; see the warning block in that file.
 */

/** A lead story with the remaining ones beside it. */
export const NewsGrid = ({ className }: { className?: string }) => (
  <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
    {stories.map((s, i) => {
      /* The first story spans the row and turns side-by-side, so the grid opens
         on a lead story the way the reference slideshow does. */
      const lead = i === 0;
      return (
        <Link
          key={s.title}
          to="/news#news"
          className={cn(
            "group flex flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-[0_10px_26px_hsl(var(--ink)/0.12)]",
            lead && "sm:col-span-2 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]",
          )}
        >
          <div className={cn("overflow-hidden bg-secondary", lead && "sm:h-full")}>
            <img
              src={s.image}
              alt={s.alt}
              className={cn("w-full object-cover", lead ? "aspect-[16/10] sm:h-full" : "aspect-[16/10]")}
              loading="lazy"
            />
          </div>
          <div className={cn("flex flex-1 flex-col p-5", lead && "sm:p-6")}>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.09em] text-eyebrow">
              {s.eyebrow}
            </span>
            <h3
              className={cn(
                "mt-1.5 font-heading font-semibold leading-snug",
                lead ? "text-xl" : "text-base",
              )}
            >
              {s.title}
            </h3>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-muted-foreground">{s.text}</p>
            <span className="mt-auto pt-3 text-[0.7rem] font-bold uppercase tracking-[0.05em] text-primary group-hover:underline">
              Read more &rarr;
            </span>
          </div>
        </Link>
      );
    })}
  </div>
);

/**
 * The dated calendar. `rail` stacks them for a sidebar; `row` spreads them
 * across the page, which is what /news uses now that the calendar is the whole
 * point of that section rather than a sidebar to it.
 */
export const DatedEvents = ({ layout = "rail" }: { layout?: "rail" | "row" }) => (
  <div
    className={cn(
      layout === "row" && "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
    )}
  >
    {upcomingDates.map((e) => (
      <div
        key={e.title}
        className={cn(
          "grid grid-cols-[3.375rem_minmax(0,1fr)] items-start gap-3.5",
          layout === "rail" && "border-b border-dashed py-3.5 last:border-b-0",
          layout === "row" && "rounded-2xl border bg-card p-5",
        )}
      >
        <div
          className={cn(
            "rounded-lg py-1.5 text-center",
            e.accent ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground",
          )}
        >
          <span className="block text-[0.6rem] font-extrabold uppercase tracking-[0.08em] opacity-85">
            {e.month}
          </span>
          <span className="block font-heading text-lg font-bold leading-none">{e.day}</span>
        </div>
        <div>
          <div className="font-heading text-[0.95rem] font-semibold leading-snug">{e.title}</div>
          <div className="mt-0.5 text-[0.8rem] text-muted-foreground">{e.detail}</div>
        </div>
      </div>
    ))}
  </div>
);

/** The three terms. `detail` is only worth the room on the full calendar page. */
export const TermList = ({ withDetail = false }: { withDetail?: boolean }) =>
  withDetail ? (
    <div className="grid gap-4 sm:grid-cols-3">
      {terms.map((t) => (
        <div key={t.term} className="rounded-2xl border bg-card p-6">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.09em] text-eyebrow">
            {t.term}
          </span>
          <div className="mt-1.5 font-heading text-lg font-semibold">{t.dates}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
        </div>
      ))}
    </div>
  ) : (
    <div>
      {terms.map((t) => (
        <div
          key={t.term}
          className="flex justify-between gap-3 border-b border-dashed py-1.5 text-[0.85rem] last:border-b-0"
        >
          <span className="whitespace-nowrap font-semibold">{t.term}</span>
          <span className="text-right text-muted-foreground">{t.dates}</span>
        </div>
      ))}
    </div>
  );

/** All of it as one band, for the foot of a page that is about something else. */
export const NewsEventsBand = ({ id = "news-events" }: { id?: string }) => (
  <Band id={id} ground="tint">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-eyebrow">
          News &amp; Events
        </span>
        <h2 className="mt-2 font-heading text-[clamp(1.7rem,4vw,2.875rem)] font-black uppercase leading-[0.95] tracking-[-0.015em] text-foreground">
          What&apos;s happening right now
        </h2>
      </div>
      <Link to="/news" className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
        All news &amp; dates
      </Link>
    </div>
    <p className="mt-3.5 max-w-[60ch] leading-relaxed text-muted-foreground">
      Deciding on a school is easier when you can see it in motion. Here is what the last few months
      actually looked like, and the dates you will need if you are enrolling for the coming year.
    </p>

    <div className="mt-9 grid items-start gap-8 lg:grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)]">
      <div>
        <div className="mb-3.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-eyebrow">
          Latest from campus
        </div>
        <NewsGrid />
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <h3 className="font-heading text-lg font-semibold">Dates for enrolling families</h3>
        <DatedEvents layout="rail" />
        <div className="mt-5 border-t pt-4">
          <div className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-eyebrow">
            The year at a glance
          </div>
          <TermList />
        </div>
        <Link
          to="/admissions#visit"
          className={cn(
            buttonVariants(),
            "mt-5 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90",
          )}
        >
          Arrange a visit
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </Band>
);
