import gradPhoto from "@/assets/graduation-p6.jpg";
import nurseryPhoto from "@/assets/nursery-graduation.jpg";
import servicePhoto from "@/assets/community-service.jpg";

/* Library — the gallery deliberately reuses photographs already optimised for
   other pages rather than adding a second copy of each. They are the same files
   the browser has usually cached by the time a visitor reaches /news. */
import galStudents from "@/assets/cfl-hero-students.webp";
import galKarate from "@/assets/sl-karate.webp";
import galFootball from "@/assets/sl-football.webp";
import galBasketball from "@/assets/sl-basketball.webp";
import galDance from "@/assets/sl-dance.webp";
import galMusic from "@/assets/sl-music.webp";
import galMeals from "@/assets/cfl-meals.webp";
import galDebate from "@/assets/sl-debate.webp";
import galGraduates from "@/assets/cfl-graduates.webp";
import galCoaching from "@/assets/sl-coaching.webp";
import galLivestock from "@/assets/cfl-livestock.webp";
import galTournament from "@/assets/sl-tournament.webp";
import galSchool from "@/assets/cfl-whole-school.webp";
import galPotters from "@/assets/cfl-potters.webp";
import gal2009 from "@/assets/cfl-then-2009.webp";
import galChess from "@/assets/sl-chess.webp";

import posterVisit from "@/assets/news-clip-visit.webp";
import posterMeal from "@/assets/news-clip-meal.webp";
import posterClassroom from "@/assets/news-clip-classroom.webp";
import posterArt from "@/assets/news-clip-art.webp";
import posterPath from "@/assets/news-clip-path.webp";

/**
 * Everything /news renders: stories, term dates, the dated calendar, and the
 * photo and video library.
 *
 * This started life inline in News.tsx and was pulled out when /admissions
 * briefly carried the same news band. That band is gone, but the data stays
 * here — it is referenced from more than one component now, and a single copy
 * of the term dates is worth keeping on principle.
 */

export interface Story {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
}

export const stories: Story[] = [
  {
    image: gradPhoto,
    alt: "Primary 6 graduates in caps and gowns outside the school",
    eyebrow: "National Exams",
    title: "Every P6 graduate earns Division A",
    text: "Our 2024–2025 Primary 6 class averaged 90.4% on the National Examination, with all 44 students earning Division A and every graduate placed in a top boarding secondary school.",
  },
  {
    image: nurseryPhoto,
    alt: "Nursery students holding certificates at their graduation ceremony",
    eyebrow: "Nursery",
    title: "Nursery graduation celebrates 150 learners",
    text: "The school-wide nursery graduation closed a year in which our youngest classes were the strongest performing in the school, averaging between 75% and 88%.",
  },
  {
    image: servicePhoto,
    alt: "Students in school uniform visiting an elderly neighbour during the monthly outreach",
    eyebrow: "Community",
    title: "Primary 6 leads monthly village outreach",
    text: "Each month our Primary 6 students visit neighbouring families across Kagina, bringing encouragement and essential provisions — the point where academic work and character formation meet.",
  },
];

export interface Term {
  term: string;
  dates: string;
  detail: string;
}

export const terms: Term[] = [
  {
    term: "Term 1",
    dates: "September – 20 December",
    detail: "Three assessments and end-of-term examinations in December.",
  },
  {
    term: "Term 2",
    dates: "6 January – 29 March",
    detail: "Three assessments and end-of-term examinations in March.",
  },
  {
    term: "Term 3",
    dates: "21 April – 27 July",
    detail: "Three assessments, National Examinations for P6, and term closure in July.",
  },
];

export interface DatedEvent {
  month: string;
  day: string;
  title: string;
  detail: string;
  /** Highlights the chip in gold rather than crimson. */
  accent?: boolean;
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 * THESE ARE THE 2024–2025 DATES AND MUST BE REFRESHED BEFORE ENROLMENT.
 *
 * Taken from the school calendar in the Annual School Report 2024–2025:
 * Term 1 opens 9 September, Test 1 on 27 September, Test 2 on 18 October,
 * term closes 20 December. The 2025–2026 calendar has not been supplied.
 *
 * A wrong start-of-term date on the Admissions page is the single worst
 * factual error this site could publish — a family turns up on the wrong
 * morning with a child in uniform. Confirm with the school, then update.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const upcomingDates: DatedEvent[] = [
  {
    month: "Sep",
    day: "9",
    title: "Term 1 begins",
    detail: "First day for every division, nursery through Primary 6.",
  },
  {
    month: "Sep",
    day: "27",
    title: "First assessment, Term 1",
    detail: "The first of three tests each term.",
  },
  {
    month: "Oct",
    day: "18",
    title: "Second assessment, Term 1",
    detail: "Reports follow to families.",
    accent: true,
  },
  {
    month: "Dec",
    day: "20",
    title: "Term 1 ends",
    detail: "End-of-term examinations in December.",
  },
];

// ── the photo & video library ─────────────────────────────────────────────

export interface GalleryItem {
  src: string;
  alt: string;
  /** Shown under the image. Keep it factual — this is a record, not a caption contest. */
  caption: string;
}

export const gallery: GalleryItem[] = [
  { src: galStudents, alt: "Three pupils in school jumpers smiling at the camera", caption: "Primary pupils on the school path" },
  { src: galSchool, alt: "The whole school gathered outdoors with hands raised", caption: "All 780, one assembly" },
  { src: galKarate, alt: "Four pupils in karate gi with yellow belts", caption: "Karate, graded by belt" },
  { src: galFootball, alt: "A goalkeeper spread across the goalmouth on the school pitch", caption: "In goal on the school pitch" },
  { src: galBasketball, alt: "Pupils in team kit on the school basketball court", caption: "On the hard court" },
  { src: galTournament, alt: "Squads lined up on the court before a tournament", caption: "Tournament day at Kagina" },
  { src: galDance, alt: "Children clapping and dancing in the school yard", caption: "Dance in the yard" },
  { src: galMusic, alt: "Pupils singing and clapping together", caption: "The choir rehearsing" },
  { src: galDebate, alt: "A pupil speaking into a microphone in front of the school", caption: "Finding a voice in English" },
  { src: galChess, alt: "Children and adults around a strategy board game played on a mat", caption: "Strategy games at Kagina" },
  { src: galCoaching, alt: "A teacher at the blackboard with young pupils raising their hands", caption: "After-school lesson review" },
  { src: galMeals, alt: "Three pupils eating plates of rice and beans", caption: "The food programme at lunch" },
  { src: galGraduates, alt: "A graduating class in caps and gowns", caption: "Primary 6 graduation" },
  { src: galLivestock, alt: "Goats from the school livestock programme with children looking on", caption: "The livestock programme" },
  { src: galPotters, alt: "Hands shaping wet clay", caption: "The Potters' trade" },
  { src: gal2009, alt: "Children gathered in a field in Kagina in 2009", caption: "Kagina, 2009 — before the school" },
];

export interface VideoItem {
  /** Served from public/media, so the path is absolute and not bundled. */
  src: string;
  poster: string;
  title: string;
  detail: string;
}

/**
 * ─────────────────────────────────────────────────────────────────────────
 * THESE FIVE CLIPS ARE RE-LABELLED, NOT RE-ENCODED.
 *
 * The originals are iPhone Live Photos: H.264 video and AAC audio (verified
 * by reading their stsd atoms) inside a QuickTime container. Only the ftyp
 * brand said `qt  `, which is what makes Firefox refuse to play an otherwise
 * perfectly ordinary file, so the brand was rewritten to `mp42` in place —
 * no transcode, no quality loss, not a byte of media data touched.
 *
 * That is sound in principle and verified in Chromium. If any clip ever
 * misbehaves in another browser, the real fix is one command:
 *   ffmpeg -i input.MOV -c copy output.mp4
 *
 * Each poster is the clip's own paired still — a Live Photo's JPEG *is* a
 * frame of its video — so no frame extraction was needed.
 *
 * WHAT THESE ACTUALLY ARE: 960x720 clips of 2.3 to 2.9 seconds each — the
 * motion attached to a Live Photo, not filmed footage. Measured in the
 * browser, not assumed. The page copy says so plainly rather than billing
 * them as a video library, and points at the YouTube channel for real video.
 * If the school has longer films, they belong here and these can go.
 *
 * Every clip carries preload="none", so none of these ~7.6 MB downloads
 * until a visitor presses play. That is a poor ratio for 13 seconds of
 * footage — a re-encode would cut it hard — but it costs nothing unwatched.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const videos: VideoItem[] = [
  {
    src: "/media/img_4960.mp4",
    poster: posterClassroom,
    title: "A full classroom",
    detail: "Primary pupils at their desks, mid-lesson, turning to the camera.",
  },
  {
    src: "/media/img_4966.mp4",
    poster: posterArt,
    title: "Creative arts",
    detail: "Children holding up the painted plates they have just finished.",
  },
  {
    src: "/media/img_4950.mp4",
    poster: posterMeal,
    title: "Mealtime",
    detail: "The food programme being served in a classroom at midday.",
  },
  {
    src: "/media/img_5004.mp4",
    poster: posterPath,
    title: "On the path",
    detail: "Pupils walking up through the campus between lessons.",
  },
  {
    src: "/media/img_4937.mp4",
    poster: posterVisit,
    title: "A visit",
    detail: "Partners in Reaching Beyond Impossibility shirts among the children.",
  },
];
