import { Link, useLocation } from "react-router-dom";
import type { NavSection } from "@/nav";
import { cn } from "@/lib/utils";

/**
 * The Academics page's hero: a full-bleed photograph, the page name set at
 * poster scale in caps under a gold swash, and the section's sub-nav rendered
 * as a crimson slab that rides up over the bottom edge of the photo.
 *
 * Why this exists alongside PageHero rather than as a variant of it: PageHero
 * is shared by five pages and its sub-nav is a full-width tinted bar. This one
 * inverts both halves — the type is display-scale rather than editorial, and
 * the nav is an inset floating slab. Folding both into PageHero would mean
 * every style in it becoming conditional. If a second page adopts this
 * treatment, promote the shared parts then.
 *
 * The slab is `sticky top-16` *and* pulled up with a negative margin. Those
 * cooperate rather than conflict: the negative margin sets where it starts
 * (overlapping the photo), sticky decides where it stops (below the 4rem
 * navbar). Section links come from nav.ts, so this stays the single source of
 * truth for the family's sections.
 */
interface PosterHeroProps {
  section: NavSection;
  /** The poster word(s). Rendered uppercase — pass it in sentence case. */
  title: string;
  /**
   * Optional second clause of the title, rendered in gold — the two-tone
   * display treatment used across the site (see DisplayHeading.tsx).
   *
   * Optional because it only works where a title has a natural break.
   * "Academics" and "Portal" are single words with nowhere to split, so
   * they stay single-tone rather than being forced into a division that
   * reads as a mistake. Where the emphasis falls is an editorial call, so
   * there is no auto-splitting on the last word.
   */
  titleAccent?: string;
  lede: string;
  image: string;
  /** Alt text. Leave as "" when the photo is decorative, which it usually is here. */
  imageAlt?: string;
  /** CSS object-position for the crop. See the worked example in PageHero. */
  imagePosition?: string;
  /**
   * `ink` (default) is the plain dark scrim every page but About uses.
   * `crimson` blends the school's own red into the gradient instead of pure
   * ink — About asked for a "translucent red shade" rather than a generic
   * dark overlay, and this is the one-word way to get it without touching
   * the other six pages that already have a settled, approved look.
   */
  tint?: "ink" | "crimson";
  /**
   * Tailwind arbitrary-value filter classes applied to the photo itself, e.g.
   * "contrast-125 saturate-110". Off by default — every existing hero photo
   * was chosen and cropped against the plain image, so retroactively
   * filtering all of them was never asked for and isn't free (a filter
   * forces the browser off the fast compositor path for that layer). Use it
   * only where a specific photo is flat or hazy, as About's is.
   */
  imageFilter?: string;
  /**
   * A flat, neutral-grey wash over the whole photo, not just the gradient's
   * top/bottom stops. The gradient's middle band is deliberately near-clear
   * so the photo reads through — exactly the area a low-quality source image
   * shows its noise/softness the most. This sits between the image and the
   * gradient specifically to mute that middle band too, at the cost of the
   * photo overall reading a bit duller. Off by default; on for About's hero,
   * whose source photo has visible compression/quality issues.
   */
  grayVeil?: boolean;
}

export const PosterHero = ({
  section,
  title,
  titleAccent,
  lede,
  image,
  imageAlt = "",
  imagePosition = "50% 42%",
  tint = "ink",
  imageFilter,
  grayVeil = false,
}: PosterHeroProps) => {
  const location = useLocation();

  return (
    <>
      <div className="relative isolate text-primary-foreground">
        <img
          src={image}
          alt={imageAlt}
          className={cn("absolute inset-0 -z-20 h-full w-full object-cover", imageFilter)}
          style={{ objectPosition: imagePosition }}
        />
        {grayVeil && (
          <div aria-hidden="true" className="absolute inset-0 -z-[15] bg-[hsl(0_0%_34%/0.58)]" />
        )}
        {/*
          A gradient, not a flat scrim: the top needs to stay dark enough for
          the breadcrumb, the middle light enough that the photograph is
          actually visible, and the bottom dark again so the poster type and
          the lede hold contrast over whatever is in frame.

          The crimson tint keeps the exact same three-stop shape — same
          breadcrumb-safe top, same clear middle, same type-safe bottom — and
          only swaps which colour those stops are cut from. Middle stop drops
          from .30 to .24 opacity: on About's photo specifically, .30 of pure
          ink over an already-warm yellow wall was reading as a flat muddy
          brown rather than a legible photo, which is the "bad gradient"
          being fixed. A hair less opacity in the one crimson-tinted user of
          this prop lets the actual photograph read through more clearly;
          the ink variant everywhere else is untouched.
        */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10",
            tint === "crimson"
              ? "bg-[linear-gradient(178deg,hsl(var(--ink)/0.58)_0%,hsl(var(--primary)/0.24)_42%,hsl(var(--ink)/0.82)_100%)]"
              : "bg-[linear-gradient(178deg,hsl(var(--ink)/0.62)_0%,hsl(var(--ink)/0.30)_42%,hsl(var(--ink)/0.80)_100%)]",
          )}
        />

        <div className="container relative pb-24 pt-20 sm:pt-24">
          <nav aria-label="Breadcrumb" className="text-[0.7rem] font-bold uppercase tracking-[0.1em] opacity-80">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&rsaquo;</li>
              <li aria-current="page">{section.label}</li>
            </ol>
          </nav>

          {/*
            The type scale is deliberately shared by every page that uses this
            hero, and deliberately smaller than it was. It used to top out at
            7.5rem (120px at desktop), which on the longer titles — CRIMSON FOR
            LIFE, NEWS & EVENTS — spanned almost the full 1400px column and
            buried the photograph behind it. 4.75rem still reads as a poster and
            still clears the section headings below it (those cap at 3.375rem),
            but it sits ON the picture instead of covering it.

            The clamp floor also matters: at 2.25rem every title in the nav,
            including the sixteen-character one, fits on a single line at 390px.
            The old 2.875rem floor wrapped three of the seven.

            w-fit + max-w-full is what makes the swash below work. The h1 shrinks
            to the width of its own text rather than filling the column, so the
            SVG at w-full is exactly as wide as the word above it. Before this,
            the swash was a viewport-derived clamp(11rem,34vw,25rem) — a fixed
            400px at desktop — which sat almost flush under a short title like
            PORTAL and stopped a third of the way under CRIMSON FOR LIFE. Same
            font size on both pages, wildly different presence: that mismatch,
            more than the size, is what made these heroes look unrelated.

            KNOWN LIMIT: this holds only while the title stays on one line, and
            at 390px "Crimson for Life" is the one title that still wraps. Then
            fit-content resolves to the available width rather than the widest
            line, so the swash runs about 70px past the shorter second line.
            There is no CSS for "width of the widest wrapped line" — min-content
            breaks every word, balance makes the overhang worse — and measuring
            it needs a ResizeObserver on every hero, which is not worth it for
            one page at one width. Left as a rule under a two-line title.
          */}
          <h1 className="mt-3 w-fit max-w-full font-heading text-[clamp(2.25rem,6.4vw,4.75rem)] font-black uppercase leading-[0.95] tracking-[-0.015em]">
            {title}
            {titleAccent && (
              <>
                {" "}
                <span className="text-accent">{titleAccent}</span>
              </>
            )}
            {/*
              Inside the h1, not beside it, so `em` resolves against the clamped
              title size — the rule thickness tracks the type automatically and
              there is only one number to change. aria-hidden keeps it out of the
              accessible name.
            */}
            <svg
              aria-hidden="true"
              viewBox="0 0 400 20"
              fill="none"
              preserveAspectRatio="none"
              className="mt-[0.1em] block h-[0.14em] w-full overflow-visible"
            >
              <path
                d="M4 13C60 5 128 4 196 8c62 4 126 6 200 1"
                stroke="hsl(var(--accent))"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M18 18c58-6 124-7 190-3 60 3 122 5 178 0"
                stroke="hsl(var(--accent)/0.5)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </h1>

          <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
            {lede}
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-30 -mt-14">
        <div className="container">
          <nav
            aria-label={`${section.label} sections`}
            /*
              min-w-0 + overflow-x-auto so the slab scrolls internally on a
              narrow viewport instead of pushing the page into a horizontal
              scroll — the same trap the About dossier mockup hit.
            */
            className="flex min-w-0 items-center justify-start gap-1 overflow-x-auto rounded-2xl bg-primary p-3 shadow-[0_18px_44px_hsl(var(--ink)/0.28)] sm:justify-center sm:p-4"
          >
            {section.children.map((child) => {
              const isActive = child.href.includes("#")
                ? location.pathname + location.hash === child.href
                : location.pathname === child.href;
              return (
                <Link
                  key={child.href}
                  to={child.href}
                  className={cn(
                    "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
                    isActive
                      ? "bg-accent font-bold text-accent-foreground"
                      : "text-primary-foreground/90 hover:bg-primary-foreground/15",
                  )}
                >
                  {child.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

/**
 * A full-width band. Four grounds, matching the Academics page's rhythm:
 * cream → crimson → cream → ink, with the paper-dot texture on the coloured
 * ones so a flat fill doesn't read as a slab.
 */
export const Band = ({
  id,
  ground = "cream",
  children,
  className,
}: {
  id?: string;
  ground?: "cream" | "tint" | "crimson" | "ink";
  children: React.ReactNode;
  className?: string;
}) => {
  const coloured = ground === "crimson" || ground === "ink";
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-32 py-16 sm:py-20",
        ground === "cream" && "bg-background",
        ground === "tint" && "bg-secondary/50",
        ground === "crimson" && "bg-primary text-primary-foreground",
        ground === "ink" && "bg-ink text-primary-foreground",
        className,
      )}
    >
      {coloured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:15px_15px]"
        />
      )}
      <div className="container relative z-[1]">{children}</div>
    </section>
  );
};
