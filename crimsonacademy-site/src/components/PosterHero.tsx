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
  lede: string;
  image: string;
  /** Alt text. Leave as "" when the photo is decorative, which it usually is here. */
  imageAlt?: string;
  /** CSS object-position for the crop. See the worked example in PageHero. */
  imagePosition?: string;
}

export const PosterHero = ({
  section,
  title,
  lede,
  image,
  imageAlt = "",
  imagePosition = "50% 42%",
}: PosterHeroProps) => {
  const location = useLocation();

  return (
    <>
      <div className="relative isolate text-primary-foreground">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: imagePosition }}
        />
        {/*
          A gradient, not a flat scrim: the top needs to stay dark enough for
          the breadcrumb, the middle light enough that the photograph is
          actually visible, and the bottom dark again so the poster type and
          the lede hold contrast over whatever is in frame.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(178deg,hsl(var(--ink)/0.62)_0%,hsl(var(--ink)/0.30)_42%,hsl(var(--ink)/0.80)_100%)]"
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

          <h1 className="mt-3 font-heading text-[clamp(2.875rem,9.5vw,7.5rem)] font-black uppercase leading-[0.92] tracking-[-0.015em]">
            {title}
          </h1>
          <svg
            aria-hidden="true"
            viewBox="0 0 400 20"
            fill="none"
            className="mt-1 block h-5 w-[clamp(11rem,34vw,25rem)] overflow-visible"
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
