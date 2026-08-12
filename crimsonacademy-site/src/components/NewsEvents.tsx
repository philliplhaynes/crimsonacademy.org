import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { stories, terms, upcomingDates, gallery, videos } from "@/data/news";

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
 *   PhotoGallery  the captioned photograph grid
 *   VideoGallery  the clips, poster-first and preload="none"
 *
 * These were briefly combined into a single band at the foot of /admissions.
 * That band is gone — the content has its own page now — but the pieces stay
 * split, because the rail/row and compact/detailed variants are what let the
 * calendar work both as a sidebar and as a section in its own right.
 *
 * Content comes from src/data/news.ts. The dated events are still the
 * 2024–2025 calendar; see the warning block in that file.
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

// ── the library ───────────────────────────────────────────────────────────

/**
 * The photograph gallery.
 *
 * No lightbox, deliberately. A lightbox is a modal, and a modal has to trap
 * focus, restore it on close, handle Escape, and stop the page behind it
 * scrolling — a real amount of behaviour for the sole benefit of seeing a
 * 900px image at 1200px. These are captioned records of school life, not
 * prints for sale. If a visitor wants one larger, the browser's own
 * open-image-in-new-tab already does it, and works without JavaScript.
 */
export const PhotoGallery = ({ className }: { className?: string }) => (
  <ul
    className={cn(
      "grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4",
      className,
    )}
  >
    {gallery.map((g) => (
      <li key={g.src} className="overflow-hidden rounded-xl border bg-card">
        <img
          src={g.src}
          alt={g.alt}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
        />
        <p className="px-3 py-2.5 text-[0.78rem] leading-snug text-muted-foreground">{g.caption}</p>
      </li>
    ))}
  </ul>
);

/**
 * The video gallery.
 *
 * `preload="none"` is the whole reason this is affordable: five clips is about
 * 7.6 MB, and none of it moves until a visitor presses play. The poster is a
 * still from the clip itself, so the grid looks complete while weighing what a
 * few photographs weigh. Native controls rather than a custom player — they are
 * keyboard accessible and understood on every phone in the country.
 */
export const VideoGallery = ({ className }: { className?: string }) => (
  <ul className={cn("grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3", className)}>
    {videos.map((v) => (
      <li key={v.src} className="overflow-hidden rounded-2xl border bg-card">
        <video
          className="aspect-video w-full bg-secondary object-cover"
          src={v.src}
          poster={v.poster}
          controls
          preload="none"
          playsInline
        >
          {/* Reached only if the browser cannot play H.264 at all. */}
          <a href={v.src}>Download this clip</a>
        </video>
        <div className="p-4">
          {/* text-foreground explicitly: this card sits inside an ink Band, which
              sets text-primary-foreground on the section, and a near-white
              heading on a near-white card is invisible. */}
          <h3 className="font-heading text-[0.98rem] font-semibold leading-snug text-foreground">
            {v.title}
          </h3>
          <p className="mt-1 text-[0.8rem] leading-relaxed text-muted-foreground">{v.detail}</p>
        </div>
      </li>
    ))}
  </ul>
);
