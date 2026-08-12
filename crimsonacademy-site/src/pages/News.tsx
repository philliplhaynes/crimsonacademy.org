import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PosterHero, Band } from "@/components/PosterHero";
import { NewsGrid, DatedEvents, TermList } from "@/components/NewsEventsBand";
import { findSection } from "@/nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import heroPhoto from "@/assets/news-hero-assembly.webp";

/*
  This page and the News & Events band at the foot of /admissions render the
  same pieces from src/components/NewsEventsBand.tsx, over the same data in
  src/data/news.ts. Admissions gets the compact arrangement (stories with the
  calendar as a sidebar); here the calendar is the point of its own section, so
  it spreads across the page and the terms carry their detail text.

  #news and #calendar are load-bearing anchors — Footer, About and StudentLife
  all link straight to them. Keep the ids.

  The dated events are still the 2024–2025 calendar. The warning lives on the
  data itself in src/data/news.ts.
*/

const News = () => {
  const section = findSection("/news")!;

  return (
    <>
      <PosterHero
        section={section}
        title="News & Events"
        lede="What is happening at Crimson Academy, and the dates that matter for the school year."
        image={heroPhoto}
        imagePosition="50% 46%"
      />

      {/* ── school news ───────────────────────────────────────────────── */}
      <Band id="news">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-eyebrow">
              School News
            </span>
            <h2 className="mt-2 font-heading text-[clamp(1.7rem,4vw,2.875rem)] font-black uppercase leading-[0.95] tracking-[-0.015em] text-foreground">
              What&apos;s happening right now
            </h2>
          </div>
          <Link
            to="/admissions#visit"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
          >
            Arrange a visit
          </Link>
        </div>
        <p className="mt-3.5 max-w-[60ch] leading-relaxed text-muted-foreground">
          Term by term, this is what the school actually looked like — the exam results, the
          graduations, and the month-by-month work our oldest class does in the village.
        </p>

        <NewsGrid className="mt-9" />

        <p className="mt-8 max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
          Full results, class-by-class performance and the school budget are published each year in
          our{" "}
          <Link
            to="/crimson-for-life#annual-report"
            className="font-medium text-primary underline underline-offset-4"
          >
            Annual School Report
          </Link>
          .
        </p>
      </Band>

      {/* ── calendar & term dates ─────────────────────────────────────── */}
      <Band id="calendar" ground="tint">
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-eyebrow">
          Calendar &amp; Term Dates
        </span>
        <h2 className="mt-2 font-heading text-[clamp(1.7rem,4vw,2.875rem)] font-black uppercase leading-[0.95] tracking-[-0.015em] text-foreground">
          The school year at a glance
        </h2>
        <p className="mt-4 max-w-[64ch] leading-relaxed text-muted-foreground">
          Crimson Academy follows the MINEDUC academic calendar, running in three terms from
          September through July. Students are assessed three times per term, with examinations at
          the end of each term.
        </p>

        <div className="mt-9">
          <div className="mb-3.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-eyebrow">
            Dates for families
          </div>
          <DatedEvents layout="row" />
        </div>

        <div className="mt-10">
          <div className="mb-3.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-eyebrow">
            The three terms
          </div>
          <TermList withDetail />
        </div>

        <div className="mt-8 rounded-r-2xl border-l-4 border-accent bg-accent/12 px-6 py-5 text-sm leading-relaxed text-eyebrow">
          Dates shown follow the <strong>2024–2025</strong> school calendar. Contact the school
          office to confirm exact dates for the current academic year before making travel or
          holiday plans.
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/admissions#enroll" className={cn(buttonVariants({ size: "lg" }), "rounded-full")}>
            How to enroll
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/about#contact"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
          >
            Contact the school office
          </Link>
        </div>
      </Band>
    </>
  );
};

export default News;
