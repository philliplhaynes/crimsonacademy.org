/**
 * The school's history, in one place.
 *
 * Lives here rather than inside SchoolHistory.tsx because two different
 * surfaces render it now: the full chapter-by-chapter page at
 * /about/history (SchoolHistory.tsx, full-size photos) and the compact
 * milestone rail on /about (HistoryPanel.tsx, 440px thumbnails). An
 * earlier version duplicated the era strings into a HISTORY_ERAS array in
 * About.tsx with a "must match" comment — exactly the kind of thing that
 * drifts. One array, two consumers, no comment needed.
 *
 * TO ADD A PHOTO: import it below, set `photo`, and generate a matching
 * thumbnail (see scripts note in BUILD-BRIEF.md — 440px webp, ~25 KB).
 */

// ── full-size chapter photos (the /about/history page) ───────────────────
import firstVisit from "@/assets/history-2009-first-visit.jpg";
import foundations from "@/assets/history-2010-foundations.jpg";
import firstBlock from "@/assets/history-2011-first-block.jpg";
import secondBlock from "@/assets/history-2012-second-block.jpg";
import graduates from "@/assets/history-2013-graduates.jpg";
import expansion from "@/assets/history-2016-expansion.jpg";
import foodProgramme from "@/assets/history-2019-food-programme.jpg";
import courts from "@/assets/history-2026-courts.jpg";

// ── 440px thumbnails (the /about milestone rail) ─────────────────────────
// All eight together are ~213 KB, against ~1,648 KB for the full-size set.
// That 87% saving is what makes it affordable to put history back on the
// About page at all, which is why the rail uses these and never the originals.
import thumb2009 from "@/assets/history-thumb-2009.webp";
import thumb2010 from "@/assets/history-thumb-2010.webp";
import thumb2011 from "@/assets/history-thumb-2011.webp";
import thumb2012 from "@/assets/history-thumb-2012.webp";
import thumb2013 from "@/assets/history-thumb-2013.webp";
import thumb2016 from "@/assets/history-thumb-2016.webp";
import thumb2019 from "@/assets/history-thumb-2019.webp";
import thumb2026 from "@/assets/history-thumb-2026.webp";

// ── head teacher portraits ───────────────────────────────────────────────
import headHenry from "@/assets/head-henry.jpg";
import headJeanDeDieu from "@/assets/head-jean-de-dieu.jpg";
import headMarieClaire from "@/assets/head-marie-claire.jpg";

export type ChapterSize = "featured" | "standard";

export interface Chapter {
  era: string;
  title: string;
  /** Full narrative, shown on /about/history. */
  body: string[];
  /** One-line summary, shown on the /about milestone rail. */
  blurb: string;
  size: ChapterSize;
  /** Tailwind grid-column span for the /about/history magazine grid. */
  span: string;
  photo?: string;
  thumb?: string;
  alt?: string;
  /** Shown on the PhotoSlot placeholder while `photo` is empty. */
  brief: string;
  source?: string;
}

export const chapters: Chapter[] = [
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
    blurb: "A first visit. No classroom, because there was no school — only demand.",
    photo: firstVisit,
    thumb: thumb2009,
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
    blurb: "The village built the first classrooms largely by hand.",
    photo: foundations,
    thumb: thumb2010,
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
    blurb: "Doors open under our first head teacher, Henry Ngolobe.",
    photo: firstBlock,
    thumb: thumb2011,
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
    blurb: "A classroom added each year so the first intake could finish here.",
    photo: secondBlock,
    thumb: thumb2012,
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
    blurb: "The first cohort placed first in the Southern Province.",
    // NB: this is a recent graduation, not the 2013 cohort. Alt text avoids
    // dating it. Swap if a 2013-era photograph turns up.
    photo: graduates,
    thumb: thumb2013,
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
    blurb: "Six classrooms, a library, and a teacher's house.",
    photo: expansion,
    thumb: thumb2016,
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
    blurb: "Buses and a food programme removed reasons to stop attending.",
    photo: foodProgramme,
    thumb: thumb2019,
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
    blurb: "Two courts, every classroom renovated, grounds paved and planted.",
    photo: courts,
    thumb: thumb2026,
    alt: "Teams in kit lined up on the new courts at a schools tournament, with basketball hoops and goal nets behind them",
    brief: "The new courts, the paved walkways, and the planted grounds",
    source: "CF Rwanda/CAR Construction/Soccer Facility · CAR Construction/Campus",
  },
];

export const keyDates: { year: string; text: string }[] = [
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

export interface Head {
  name: string;
  years: string;
  note: string;
  photo?: string;
}

export const heads: Head[] = [
  { name: "Henry Ngolobe", years: "2011 – 2015", note: "Opened the school and took it from four classrooms to a full primary programme.", photo: headHenry },
  { name: "Jean De Dieu Nsabimana", years: "2015 – 2017", note: "Led the school through the 2016 expansion.", photo: headJeanDeDieu },
  { name: "Marie Claire Mukabirinda", years: "2017 – present", note: "Third head teacher, and the school's principal today.", photo: headMarieClaire },
];
