import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PhotoSlot } from "@/components/PhotoSlot";
import { KeyDatesSlider } from "@/components/KeyDatesSlider";
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

/**
 * The school's history, told the way berkeleycarroll.org tells theirs: named
 * narrative chapters with period photographs, then key dates, then the
 * leadership line.
 *
 * Like theirs, the chapters sit in alternating full-bleed colour bands
 * (they alternate a warm off-white against their burgundy). Here the three
 * crimson bands are placed deliberately rather than mechanically — 2009, 2013
 * and 2026: the permission that made it possible, the first result, and the
 * finished campus — so the colour marks the turning points instead of just
 * striping the page.
 */

/** cream = page background · paper = warm tint · deep = crimson, inverted text */
type Tone = "cream" | "paper" | "deep";

interface Chapter {
  era: string;
  title: string;
  body: string[];
  tone: Tone;
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
  /** Flips the photo to the left on wide screens. */
  flip?: boolean;
}

const chapters: Chapter[] = [
  {
    era: "2009",
    title: "Before there was a school",
    tone: "deep",
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
    tone: "paper",
    body: [
      "Land was purchased on the hillside and the village built the school largely by hand. Neighbours turned the ground with hoes, quarried and laid the stone footings, and raised the block walls course by course.",
      "It is worth saying plainly: the first classrooms were not delivered to Kagina. They were built by the families whose children would sit in them.",
    ],
    photo: foundations,
    alt: "Villagers backfilling the completed stone footings of the first classroom block, with the Kagina hillside behind",
    brief: "Community clearing the site by hand, and the stone foundations going in",
    source: "CF Rwanda/CAR Land Purchase · CAR Construction/Primary 1-4",
    flip: true,
  },
  {
    era: "2011",
    title: "Four rooms and 181 children",
    tone: "cream",
    body: [
      "Crimson Academy opened its doors in 2011 with four classrooms and 181 students, under our first head teacher, Henry.",
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
    tone: "paper",
    body: [
      "Rather than turn students away at the top of the school, we added a classroom each year for the next two years — Primary 5, then Primary 6 — so that the first intake could finish a full primary education without leaving Kagina.",
      "By 2013 the school ran the complete national primary programme, Primary 1 through Primary 6.",
    ],
    photo: secondBlock,
    alt: "Two classroom blocks facing each other across a planted courtyard, with the valley beyond",
    brief: "The Primary 5 and Primary 6 classrooms under construction",
    source: "CF Rwanda/CAR Construction/Primary 5 · CAR Construction/Primary 6",
    flip: true,
  },
  {
    era: "2013",
    title: "First in the province",
    tone: "deep",
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
    tone: "cream",
    body: [
      "With Crimson Foundation and the Jenzabar Foundation, the campus expanded in a single push: six new classrooms, a library, and a teacher's house so that staff could live on site rather than commute from far away.",
      "Jean had become head teacher the year before, in 2015, and led the school through the expansion.",
    ],
    photo: expansion,
    alt: "The grown campus seen across the playing field: two further school buildings, a paved walkway and planted beds, with students in maroon uniform moving between them",
    brief: "The 2016 expansion — new classroom block, library, and teacher housing",
    source: "CF Rwanda/CAR Construction/School Expansion · CAR Construction/Teacher Housing",
    flip: true,
  },
  {
    era: "2019",
    title: "More than lessons",
    tone: "paper",
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
    tone: "deep",
    body: [
      "This year the campus received the work it had been growing into: two basketball and football courts, and a full renovation of every classroom and facility.",
      "The dirt paths between buildings were paved into proper walkways, and trees and flowers were planted across the grounds — the ordinary marks of a school that intends to be there for a long time.",
    ],
    photo: courts,
    alt: "Teams in kit lined up on the new courts at a schools tournament, with basketball hoops and goal nets behind them",
    brief: "The new courts, the paved walkways, and the planted grounds",
    source: "CF Rwanda/CAR Construction/Soccer Facility · CAR Construction/Campus",
    flip: true,
  },
];

const keyDates: { year: string; text: string }[] = [
  { year: "2009", text: "First visit to Kagina." },
  { year: "2010", text: "Land purchased; the village begins clearing the site." },
  { year: "2011", text: "School opens with four classrooms and 181 students. Henry is appointed the first head teacher." },
  { year: "2012", text: "Primary 5 added." },
  { year: "2013", text: "Primary 6 added, completing the full primary programme." },
  { year: "2013", text: "Ranked first in the Southern Province on the National Examinations for the first time." },
  { year: "2015", text: "Jean becomes the second head teacher." },
  { year: "2016", text: "Six new classrooms, a library, and a teacher's house are built." },
  { year: "2017", text: "MUKABIRINDA Marie Claire becomes the third head teacher, and leads the school today." },
  { year: "2019", text: "Transport and food programmes begin; karate, debate, gymnastics, football, and chorus are offered." },
  { year: "2024", text: "The Primary 6 class averages 90.4%, every graduate placing in Division A." },
  { year: "2026", text: "Two courts built, all classrooms and facilities renovated, grounds paved and planted." },
];

const heads: { name: string; years: string; note: string }[] = [
  { name: "Henry", years: "2011 – 2015", note: "Opened the school and took it from four classrooms to a full primary programme." },
  { name: "Jean", years: "2015 – 2017", note: "Led the school through the 2016 expansion." },
  { name: "MUKABIRINDA Marie Claire", years: "2017 – present", note: "Third head teacher, and the school's principal today." },
];

/** Band colours, plus the text colours each band needs to stay readable. */
const toneStyles: Record<Tone, { band: string; era: string; body: string; rule: string }> = {
  cream: {
    band: "bg-background",
    era: "text-primary",
    body: "text-muted-foreground",
    rule: "bg-border",
  },
  paper: {
    band: "bg-secondary/50",
    era: "text-primary",
    body: "text-muted-foreground",
    rule: "bg-border",
  },
  deep: {
    band: "bg-primary text-primary-foreground",
    // text-accent (bright gold), not text-eyebrow, because --eyebrow is
    // tuned for contrast against the cream page background — on this
    // crimson band it would read as dark-on-dark. See the matching note on
    // the Contact & Visit section in About.tsx.
    era: "text-accent",
    body: "text-primary-foreground/85",
    rule: "bg-primary-foreground/25",
  },
};

export const SchoolHistory = () => (
  // No heading here on purpose — this now renders directly under
  // AboutHistory.tsx's own PageHero, which already carries this exact title
  // and lede as the page's H1. A second "From one visit to a full campus."
  // heading right below it would just repeat the hero verbatim.
  <section id="history" className="scroll-mt-32">
    {/* ---------- narrative chapters, in alternating colour bands ---------- */}
    <div className="pt-8 sm:pt-12">
      {chapters.map((c) => {
        const t = toneStyles[c.tone];
        return (
          <article
            key={c.era + c.title}
            className={cn("transition-colors duration-500", t.band)}
          >
            <div className="container grid items-center gap-8 py-14 md:grid-cols-2 md:gap-12 md:py-20">
              <div className={c.flip ? "md:order-2" : undefined}>
                <div className="flex items-center gap-3">
                  <span className={cn("font-heading text-4xl font-semibold md:text-5xl", t.era)}>
                    {c.era}
                  </span>
                  <span className={cn("h-px flex-1", t.rule)} aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-2xl font-semibold md:text-3xl">{c.title}</h3>
                <div className={cn("mt-4 space-y-4 leading-relaxed", t.body)}>
                  {c.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {c.photo ? (
                <img
                  src={c.photo}
                  alt={c.alt ?? ""}
                  className={cn(
                    "aspect-[4/3] w-full rounded-lg object-cover shadow-sm",
                    c.flip && "md:order-1",
                  )}
                  loading="lazy"
                />
              ) : (
                <PhotoSlot
                  className={c.flip ? "md:order-1" : undefined}
                  ratio="landscape"
                  brief={c.brief}
                  source={c.source}
                />
              )}
            </div>
          </article>
        );
      })}
    </div>

    {/* ---------- key dates ---------- */}
    <div className="container pt-16">
      <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">Key dates</div>
      <h3 className="mt-2 font-heading text-2xl font-semibold md:text-3xl">
        Fifteen years, in short.
      </h3>
      <KeyDatesSlider dates={keyDates} />
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
          <div key={h.name} className="border-l-2 border-accent pl-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-eyebrow">
              {h.years}
            </div>
            <div className="mt-1 font-heading text-lg font-semibold">{h.name}</div>
            <p className="mt-2 text-sm text-muted-foreground">{h.note}</p>
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
