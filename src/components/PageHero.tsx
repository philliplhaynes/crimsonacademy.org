import { Link, useLocation } from "react-router-dom";
import { Camera, ChevronRight } from "lucide-react";
import type { NavSection } from "@/nav";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  section: NavSection;
  title: string;
  lede: string;
  image?: string;
  imageAlt?: string;
  /**
   * Which part of the image to keep in frame under the crimson overlay and
   * the fixed-height band. Most hero photos are fine centered; group shots
   * where the subject's faces sit above centre (a lineup, a crowd) need
   * something other than "center" or faces get cropped out entirely.
   *
   * Accepts the three named presets, or a raw CSS `object-position` value
   * (e.g. "50% 30%") for the common case where "top" crops too tight —
   * "top" pins the image's top edge to the crop, which on a group photo
   * often shows the wall/sky above people's heads rather than their faces.
   * Default: "center".
   *
   * WORKED EXAMPLE — deriving a custom Y%:
   *   1. containerHeight = the hero band's rendered height in px (check devtools).
   *   2. scaledHeight = bandWidth * (imageNaturalHeight / imageNaturalWidth).
   *   3. overflow = scaledHeight - containerHeight  (the part object-cover crops away).
   *   4. Find the subject's top edge in the ORIGINAL image, in px (e.g. where
   *      foreheads start), call it subjectTop.
   *   5. subjectTopScaled = subjectTop * (scaledHeight / imageNaturalHeight).
   *   6. Y% = (subjectTopScaled / overflow) * 100.
   *   This places the subject's top edge at the top of the visible crop.
   *   Nudge Y% down a few points to leave a little headroom above it.
   */
  imagePosition?: "center" | "top" | "bottom" | string;
  /**
   * Brief for the hero photo this page still needs. Ignored once `image` is set.
   * See PHOTOS-NEEDED.md.
   */
  photoBrief?: string;
}

const namedPositions: Record<string, string> = {
  center: "50% 50%",
  top: "50% 0%",
  bottom: "50% 100%",
};

export const PageHero = ({
  section,
  title,
  lede,
  image,
  imageAlt,
  imagePosition = "center",
  photoBrief,
}: PageHeroProps) => {
  const location = useLocation();

  return (
    <>
      <div className="relative border-b bg-primary text-primary-foreground">
        {image ? (
          <>
            <img
              src={image}
              alt={imageAlt ?? ""}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: namedPositions[imagePosition] ?? imagePosition }}
            />
            <div className="absolute inset-0 bg-primary/75" aria-hidden="true" />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, hsl(var(--primary-foreground)) 0 1px, transparent 1px 10px)",
            }}
          />
        )}
        {!image && photoBrief && (
          <div className="absolute bottom-3 right-3 z-10 hidden max-w-xs items-start gap-2 rounded-md border border-dashed border-primary-foreground/40 bg-primary/60 px-3 py-2 text-left sm:flex">
            <Camera className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden="true" />
            <span className="text-[0.7rem] leading-snug opacity-90">
              <strong className="font-bold uppercase tracking-widest">Hero photo needed</strong>
              <br />
              {photoBrief}
            </span>
          </div>
        )}
        <div className="container relative py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs font-semibold uppercase tracking-wider">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 hover:underline">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-3 w-3 opacity-60" aria-hidden="true" />
              <li aria-current="page" className="opacity-100">
                {section.label}
              </li>
            </ol>
          </nav>

          <h1 className="font-heading text-3xl font-semibold leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/90 md:text-lg">
            {lede}
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-30 border-b bg-secondary/95 backdrop-blur">
        <div className="container">
          {/*
            <Link>, not a raw <a href="#hash">: children used to always be a
            hash on the CURRENT page, so slicing the href down to its fragment
            worked. That broke once a child (Our History) became its own
            route — <Link> lets react-router handle both cases correctly,
            including navigating here from a different page in the family
            (RouteEffects in App.tsx does the scroll-to-hash once the target
            page mounts).
          */}
          <nav aria-label={`${section.label} sections`} className="-mx-2 flex gap-1 overflow-x-auto py-2">
            {section.children.map((child) => {
              const isActive = child.href.includes("#")
                ? location.pathname + location.hash === child.href
                : location.pathname === child.href;
              return (
                <Link
                  key={child.href}
                  to={child.href}
                  className={cn(
                    "shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "bg-background text-primary"
                      : "text-muted-foreground hover:bg-background hover:text-primary",
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

export const Section = ({
  id,
  eyebrow,
  title,
  children,
  tinted = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  tinted?: boolean;
}) => (
  <section id={id} className={`scroll-mt-32 ${tinted ? "bg-secondary/40" : ""}`}>
    <div className="container py-16 sm:py-20">
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-eyebrow">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-2 font-heading text-2xl font-semibold md:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </div>
  </section>
);
