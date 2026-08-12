import { Link } from "react-router-dom";
import { DisplayHeading } from "./DisplayHeading";
import heroPhoto from "@/assets/home-hero-dancing.jpg";

/**
 * The home page hero: a full-bleed photograph running edge to edge with the
 * type centred on top of it (mockup C from content/home-redesign-mockups/).
 *
 * This is deliberately unlike PosterHero, which every interior page uses.
 * berkeleycarroll.org draws the same distinction on its own site — its home
 * page is centred and full-bleed, its interior pages are left-aligned and
 * container-bound — and the reason holds here: an interior hero has to make
 * room for a breadcrumb and a sub-nav slab, and a home page has neither.
 *
 * min-height is a min() of viewport and a pixel cap: a pure vh value makes
 * the hero swallow the entire screen on a short laptop window with nothing
 * below the fold to suggest the page continues.
 */
export const Hero = () => {
  return (
    <section className="relative isolate flex min-h-[min(86vh,740px)] items-center justify-center overflow-hidden text-center text-primary-foreground">
      <img
        src={heroPhoto}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: "50% 40%" }}
      />
      {/*
        Vertical, not the left-to-right wash this hero used to have: the old
        gradient hid most of the photograph to make room for left-aligned
        text. Centred type only needs the top and bottom darkened.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,hsl(var(--ink)/0.55)_0%,hsl(var(--ink)/0.28)_40%,hsl(var(--ink)/0.72)_100%)]"
      />

      <div className="container relative max-w-5xl py-24">
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-primary-foreground/85">
          Kagina · Kamonyi District, Rwanda
        </div>

        <DisplayHeading
          as="h1"
          lead="Reaching beyond"
          pop="impossibility."
          size="statement"
          align="center"
          light
          swash
          className="mt-4"
        />

        <p className="mx-auto mt-7 max-w-[52ch] text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
          A Christian primary school educating 780 children in rural Rwanda — and, year after year,
          the #1 school in the Southern Province on the National Exams.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/admissions#enroll"
            className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Enroll Your Child
          </Link>
          <Link
            to="/crimson-for-life#sponsor"
            className="rounded-md border border-primary-foreground/40 px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            Sponsor a Student
          </Link>
        </div>
      </div>
    </section>
  );
};
