import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Horizontal card carousel, modelled on berkeleycarroll.org's
 * "Key Dates in Our History". Shared by the key dates, the leadership team,
 * and the staff directory so the interaction and its accessibility guarantees
 * are written once.
 *
 * Auto-advancing content has real accessibility obligations, so:
 *  - it never autoplays under `prefers-reduced-motion`
 *  - there is an explicit play/pause control (WCAG 2.2.2)
 *  - it pauses on hover, on keyboard focus inside the track, and when the
 *    track is scrolled off-screen
 *  - the track is a real <ol> that scrolls natively, so it still works on
 *    touch and with a keyboard
 */

const AUTOPLAY_MS = 4500;

interface CarouselProps {
  /** Describes the set for screen readers, e.g. "Key dates". */
  label: string;
  items: React.ReactNode[];
  /** Tailwind width classes for each item. */
  itemClassName?: string;
  /** Offer the play/pause control and auto-advance. */
  autoplay?: boolean;
  /** Optional horizontal rule behind the cards (the key-dates timeline). */
  railClassName?: string;
  className?: string;
}

export const Carousel = ({
  label,
  items,
  itemClassName = "w-[15rem] sm:w-[16.5rem]",
  autoplay = false,
  railClassName,
  className,
}: CarouselProps) => {
  const count = items.length;
  const trackRef = useRef<HTMLOListElement>(null);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const paused = useRef(false);

  const reduceMotion =
    typeof matchMedia === "function" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Width of one card plus the gap — the distance of a single step. */
  const step = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.querySelector("li");
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    return first.getBoundingClientRect().width + gap;
  };

  const scrollByCards = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollBy({
        left: dir * step(),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion],
  );

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = step();
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    if (s > 0) {
      const vis = Math.max(1, Math.floor(track.clientWidth / s));
      setVisible(vis);
      // The final scroll position is not a whole multiple of the card width, so
      // rounding leaves the counter one short. At the end, pin it to the last
      // full page instead.
      setActive(end ? Math.max(0, count - vis) : Math.round(track.scrollLeft / s));
    }
    setAtStart(track.scrollLeft < 4);
    setAtEnd(end);
  }, [count]);

  useEffect(() => {
    onScroll();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  /* Autoplay. Wraps back to the start at the end. */
  useEffect(() => {
    if (!playing || reduceMotion) return;
    const id = setInterval(() => {
      if (paused.current) return;
      const track = trackRef.current;
      if (!track) return;
      const done = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (done) track.scrollTo({ left: 0, behavior: "smooth" });
      else scrollByCards(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, reduceMotion, scrollByCards]);

  /* Stop advancing while the track is off-screen. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => { paused.current = !e.isIntersecting; },
      { threshold: 0.2 },
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

  const hold = (on: boolean) => () => { paused.current = on; };
  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-border text-primary " +
    "transition-colors hover:bg-secondary disabled:opacity-35 disabled:hover:bg-transparent";

  return (
    <div className={cn("mt-8", className)}>
      {/* controls */}
      <div className="mb-4 flex items-center gap-2">
        {autoplay && !reduceMotion && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? `Pause the ${label} slider` : `Play the ${label} slider`}
            className={btn}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        )}
        <button
          type="button"
          onClick={() => scrollByCards(-1)}
          disabled={atStart}
          aria-label={`Previous ${label}`}
          className={btn}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCards(1)}
          disabled={atEnd}
          aria-label={`More ${label}`}
          className={btn}
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* A single index would stall short of the total (you can never scroll
            the last card to first position), so show the visible range. */}
        <span className="ml-2 text-xs text-muted-foreground">
          {active + 1}&ndash;{Math.min(count, active + visible)} of {count}
        </span>
      </div>

      {/*
        Hold handlers live on the track, NOT on the wrapper. On the wrapper,
        clicking Play left focus on the Play button, which fired onFocusCapture
        and paused the slider immediately — so it never advanced.
      */}
      <div
        className="relative"
        onMouseEnter={hold(true)}
        onMouseLeave={hold(false)}
        onFocusCapture={hold(true)}
        onBlurCapture={hold(false)}
      >
        {railClassName && (
          <div
            className={cn("pointer-events-none absolute left-0 right-0 h-px bg-border", railClassName)}
            aria-hidden="true"
          />
        )}

        <ol
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label={`${label} — scroll horizontally`}
          className={cn(
            "flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4",
            // hide the scrollbar but keep the element scrollable
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
          )}
        >
          {items.map((item, i) => (
            <li
              key={i}
              className={cn("shrink-0 snap-start", itemClassName)}
              aria-current={i === active ? "true" : undefined}
            >
              {item}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
