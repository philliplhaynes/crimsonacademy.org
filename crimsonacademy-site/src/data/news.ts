import gradPhoto from "@/assets/graduation-p6.jpg";
import nurseryPhoto from "@/assets/nursery-graduation.jpg";
import servicePhoto from "@/assets/community-service.jpg";

/**
 * School news, term dates and the dated calendar.
 *
 * Extracted out of News.tsx so the Admissions page can carry the same content
 * without a second copy drifting out of step — a prospective parent reading
 * about the school and a current parent checking the calendar should never see
 * two different sets of dates.
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
