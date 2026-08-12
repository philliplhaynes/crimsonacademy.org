import { Link } from "react-router-dom";
import heroPhoto from "@/assets/home-hero-dancing.jpg";

/**
 * The home page's hero, rebuilt on PosterHero's visual language (mockup B
 * from content/home-redesign-mockups/): poster-scale uppercase type over a
 * gold swash, and a near-vertical gradient that keeps the photograph
 * readable rather than washing it out left-to-right.
 *
 * Why this isn't literally <PosterHero>: that component takes a NavSection
 * and renders a breadcrumb plus the crimson slab of sub-nav links from its
 * `children`. Home has no entry in nav.ts `sections` — it isn't a section,
 * it's the root — so there is nothing to put in a breadcrumb or a slab, and
 * mockup B deliberately has neither. Rather than make `section` optional on
 * a component five pages depend on, the shared *language* is reproduced
 * here. The gradient stops, type scale, and swash path are copied verbatim
 * from PosterHero.tsx so the two can't drift apart by accident.
 *
 * The fact strip lives inside the hero rather than in a band below it, the
 * way About's dossier cover works — a visitor sees the proof points before
 * scrolling at all. This replaced the old standalone Statistics.tsx.
 */
const facts = [
  { n: "#1", k: "Southern Province, National Exams" },
  { n: "90.4%", k: "P6 National Exam average" },
  { n: "780+", k: "Students, Nursery–P6" },
  { n: "3", k: "Languages of instruction" },
];

export const Hero = () => {
  return (
    <section className="relative isolate text-primary-foreground">
      <img
        src={heroPhoto}
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: "50% 38%" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(178deg,hsl(var(--ink)/0.65)_0%,hsl(var(--ink)/0.35)_46%,hsl(var(--ink)/0.88)_100%)]"
      />

      <div className="container relative pt-20 sm:pt-24">
        <div className="text-[0.7rem] font-bold uppercase tracking-[0.1em] opacity-80">
          Kagina · Kamonyi District, Rwanda
        </div>

        {/*
          The clamp FLOOR is 1.9rem here, not PosterHero's 2.875rem, and that
          difference is deliberate. PosterHero's poster words are all short
          — ACADEMICS (9), ABOUT US (8), PORTAL (6) — so its floor never has
          to accommodate anything long. "IMPOSSIBILITY." is 14 characters,
          and at 390px the 2.875rem floor renders it 389px wide inside a
          342px column (measured, not estimated), overflowing the page.

          Lowering the floor lets the 9.5vw term win at phone widths, which
          is what keeps the word on one line: 9.5vw is ~37px at 390px, where
          the word measures ~313px. The floor only takes over below ~320px
          viewport, where it still fits.

          break-words stays as a genuine last resort for viewports narrower
          than anything tested — with the floor fixed it should never fire,
          but a broken word is a better failure than a horizontally
          scrolling page.
        */}
        <h1 className="mt-3 break-words font-heading text-[clamp(1.9rem,9.5vw,7.5rem)] font-black uppercase leading-[0.92] tracking-[-0.015em]">
          Reaching Beyond
          <br />
          Impossibility.
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

        <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
          Where faith and academic excellence grow together. Crimson Academy of Kagina is a
          Christian primary school educating 780 children — and, year after year, the #1 school in
          Rwanda&apos;s Southern Province on the National Exams.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
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

        <dl className="mt-11 grid grid-cols-2 gap-5 border-t border-primary-foreground/20 pb-9 pt-6 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="sr-only">{f.k}</dt>
              <dd>
                <span className="block font-heading text-2xl font-bold leading-none text-accent sm:text-3xl">
                  {f.n}
                </span>
                <span className="mt-1.5 block text-xs text-primary-foreground/80">{f.k}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
