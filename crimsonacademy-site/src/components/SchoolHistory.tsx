import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { PhotoSlot } from "@/components/PhotoSlot";
import { cn } from "@/lib/utils";

// ── Photos: add imports here, then reference them in `chapters` below. ────────
import firstVisit from "@/assets/history-2009-first-visit.jpg";
import foundations from "@/assets/history-2010-foundations.jpg";
import firstBlock from "@/assets/history-2011-first-block.jpg";
import secondBlock from "@/assets/history-2012-second-block.jpg";
import graduates from "@/assets/history-2013-graduates.jpg";
import expansion from "@/assets/history-2016-expansion.jpg";
import foodProgramme from "@/assets/history-2019-food-programme.jpg";
import courts from "@/assets/history-2026-courts.jpg";

// Head teacher portraits. Small native source files (Henry's is 336x379,
// the other two only ~150x190) — kept at a modest on-screen avatar size in
// the markup below rather than blown up, so the limited resolution stays
// crisp instead of going soft.
import headHenry from "@/assets/head-henry.jpg";
import headJeanDeDieu from "@/assets/head-jean-de-dieu.jpg";
import headMarieClaire from "@/assets/head-marie-claire.jpg";

/**
 * The school's history as an editorial photo grid, not a scroll of full-bleed
 * bands — replaces the earlier alternating-colour-band layout with the
 * "Magazine" direction from the /about/history design exploration (two
 * mockups compared, this one chosen). 2009, 2013 and 2026 — the permission
 * that made the school possible, the first result, and the finished campus —
 * get large featured cards; the rest sit as smaller tiles. Every card is a
 * button that expands in place to the full chapter text, so the grid is
 * scannable at a glance but nothing is lost — same content depth as before,
 * just progressive rather than all visible at once.
 *
 * Comparison board + the runner-up ("The Rail", a compact vertical timeline)
 * live in content/history-mockups/ at the repo root, outside the app.
 */

type Size = "featured" | "standard";

interface Chapter {
  era: string;
  title: string;
  body: string[];
  size: Size;
  /**
   * TO ADD A PHOTO: import it at the top of this file, then set `photo` and
   * `alt` on the chapter below. The placeholder disappears on its own — you do
   * not need to touch any markup.
   */
  photo?: string;
  alt?: string;
  /** Shown on the placeholder while `photo` is empty. */
  brief: string;
  source?: string;
  /** Tailwind grid-column span, responsive. Only featured chapters need this. */
  span: string;
}

const chapters: Chapter[] = [
  {
    era: "2009",
    title: "Before there was a school",
    size: "featured",
    span: "sm:col-span-2 lg:col-span-4",
    body: [
      "It began with a visit. In 2009 our founder travelled to Kagina for the first time and met the children of the village — most of them out of school, many of them without shoes, all of them curious about the stranger with the camera.",
      "Standing with them are the elders who made everything after this possible. Among them is the village leader who welcomed that first visit and, in time, agreed to the sale of the land the school now stands on. Nothing was built here without permission being given first.",
      "There was no classroom to visit, because there was no school. What there was, plainly, was demand: parents asking for an education their children could not otherwise reach. That visit is the reason everything that follows exists.",
    ],
    photo: firstVisit,
    alt: "The village of Kagina gathered on open ground under a mango tree in 2009 — elders and parents standing behind, dozens of children in front — on the land where the school would be built",
    brief: "The children of Kagina, 2009 — the first visit",
    source: "CF Rwanda/CAR Land Purchase",
  },
  {
    era: "2010–2011",
    title: "Breaking ground",
    size: "standard",
    span: "sm:col-span-1 lg:col-span-2",
    body: [
      "Land was purchased on the hillside and the village built the school largely by hand. Neighbours turned the ground with hoes, quarried and laid the stone footings, and raised the block walls course by course.",
      "It is worth saying plainly: the first classrooms were not delivered to Kagina. They were built by the families whose children would sit in them.",
    ],
    photo: foundations,
    alt: "Villagers backfilling the completed stone footings of the first classroom block, with the Kagina hillside behind",
    brief: "Community clearing the site by hand, and the stone foundations going in",
    source: "CF Rwanda/CAR Land Purchase · CAR Construction/Primary 1-4",
  },
  {
    era: "2011",
    title: "Four rooms and 181 children",
    size: "standard",
    span: "sm:col-span-1 lg:col-span-2",
    body: [
      "Crimson Academy opened its doors in 2011 with four classrooms and 181 students, under our first head teacher, Henry Ngolobe.",
      "Four rooms meant four grades. Everything above Primary 4 was still an intention rather than a building.",
    ],
    photo: firstBlock,
    alt: "The finished four-classroom block on its stone plinth, with a covered walkway running the length of the building",
    brief: "The first four-classroom block, newly roofed",
    source: "CF Rwanda/CAR Construction/Primary 1-4",
  },
  {
    era: "2012–2013",
    title: "A grade a year",
    size: "standard",
    span: "sm:col-span-1 lg:col-span-2",
    body: [
      "Rather than turn students away at the top of the school, we added a classroom each year for the next two years — Primary 5, then Primary 6 — so that the first intake could finish a full primary education without leaving Kagina.",
      "By 2013 the school ran the complete national primary programme, Primary 1 through Primary 6.",
    ],
    photo: secondBlock,
    alt: "Two classroom blocks facing each other across a planted courtyard, with the valley beyond",
    brief: "The Primary 5 and Primary 6 classrooms under construction",
    source: "CF Rwanda/CAR Construction/Primary 5 · CAR Construction/Primary 6",
  },
  {
    era: "2013",
    title: "First in the province",
    size: "featured",
    span: "sm:col-span-2 lg:col-span-4",
    body: [
      "The first cohort to sit the National Examination placed the school first in the Southern Province. It has held at or near the top in nearly every year since.",
      "For a rural school two years out from its founding, competing against long-established institutions, this was the moment the model stopped being a hope and became a record.",
    ],
    // NB: this is a recent graduation, not the 2013 cohort. Alt text avoids
    // dating it. Swap if a 2013-era photograph turns up.
    photo: graduates,
    alt: "A Primary 6 graduating class seated in red caps and gowns at the graduation ceremony",
    brief: "The first Primary 6 graduating class",
    source: "CF Rwanda/CAR Students",
  },
  {
    era: "2016",
    title: "Room to grow",
    size: "standard",
    span: "sm:col-span-1 lg:col-span-3",
    body: [
      "With Crimson Foundation, the campus expanded in a single push: six new classrooms, a library, and a teacher's house so that staff could live on site rather than commute from far away.",
      "Jean De Dieu Nsabimana had become head teacher the year before, in 2015, and led the school through the expansion.",
    ],
    photo: expansion,
    alt: "The grown campus seen across the playing field: two further school buildings, a paved walkway and planted beds, with students in maroon uniform moving between them",
    brief: "The 2016 expansion — new classroom block, library, and teacher housing",
    source: "CF Rwanda/CAR Construction/School Expansion · CAR Construction/Teacher Housing",
  },
  {
    era: "2019",
    title: "More than lessons",
    size: "standard",
    span: "sm:col-span-1 lg:col-span-3",
    body: [
      "School buses began bringing in students who lived too far to walk, and a food programme started serving children through the school day. Both removed reasons a child might simply stop attending.",
      "Alongside them came the activities the school is now known for: karate, debate, gymnastics, football, and the chorus.",
    ],
    photo: foodProgramme,
    alt: "Three students smiling over plates of rice, beans and plantain at their classroom desks during the school meal",
    brief: "A school bus arriving, mealtime, or an activity session",
    source: "CF Rwanda/CAR Karate · CAR Soccer · CAR Students",
  },
  {
    era: "2026",
    title: "A campus, finished",
    size: "featured",
    span: "sm:col-span-2 lg:col-span-6",
    body: [
      "This year the campus received the work it had been growing into: two basketball and football courts, and a full renovation of every classroom and facility.",
      "The dirt paths between buildings were paved into proper walkways, and trees and flowers were planted across the grounds — the ordinary marks of a school that intends to be there for a long time.",
    ],
    photo: courts,
    alt: "Teams in kit lined up on the new courts at a schools tournament, with basketball hoops and goal nets behind them",
    brief: "The new courts, the paved walkways, and the planted grounds",
    source: "CF Rwanda/CAR Construction/Soccer Facility · CAR Construction/Campus",
  },
];

const keyDates: { year: string; text: string }[] = [
  { year: "2009", text: "First visit to Kagina." },
  { year: "2010", text: "Land purchased; the village begins clearing the site." },
  { year: "2011", text: "School opens with four classrooms and 181 students. Henry Ngolobe is appointed the first head teacher." },
  { year: "2012", text: "Primary 5 added." },
  { year: "2013", text: "Primary 6 added, completing the full primary programme." },
  { year: "2013", text: "Ranked first in the Southern Province on the National Examinations for the first time." },
  { year: "2015", text: "Jean De Dieu Nsabimana becomes the second head teacher." },
  { year: "2016", text: "Six new classrooms, a library, and a teacher's house are built." },
  { year: "2017", text: "Marie Claire Mukabirinda becomes the third head teacher, and leads the school today." },
  { year: "2019", text: "Transport and food programmes begin; karate, debate, gymnastics, football, and chorus are offered." },
  { year: "2024", text: "The Primary 6 class averages 90.4%, every graduate placing in Division A." },
  { year: "2026", text: "Two courts built, all classrooms and facilities renovated, grounds paved and planted." },
];

interface Head {
  name: string;
  years: string;
  note: string;
  photo?: string;
}

const heads: Head[] = [
  { name: "Henry Ngolobe", years: "2011 – 2015", note: "Opened the school and took it from four classrooms to a full primary programme.", photo: headHenry },
  { name: "Jean De Dieu Nsabimana", years: "2015 – 2017", note: "Led the school through the 2016 expansion.", photo: headJeanDeDieu },
  { name: "Marie Claire Mukabirinda", years: "2017 – present", note: "Third head teacher, and the school's principal today.", photo: headMarieClaire },
];

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
