import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PosterHero, Band } from "@/components/PosterHero";
import { LeaderVoice } from "@/components/LeaderVoice";
import { findSection } from "@/nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import heroPhoto from "@/assets/class.jpeg";
import approachPhoto from "@/assets/crimson-sign-boy.webp";
import stripDancing from "@/assets/dancing.jpeg";
import stripCampus from "@/assets/history-2016-expansion.jpg";
import nurseryPhoto from "@/assets/nursery-graduation.jpg";
import lowerPhoto from "@/assets/contact-students.jpg";
import upperPhoto from "@/assets/graduation-p6.jpg";
import beyondPhoto from "@/assets/history-2013-graduates.jpg";
import foodPhoto from "@/assets/history-2019-food-programme.jpg";
import staffPhoto from "@/assets/staff-group.jpg";
import outreachPhoto from "@/assets/students-outreach.jpg";
import headMistress from "@/assets/staff-marie-claire.webp";
import nurseryLeader from "@/assets/staff-martha.webp";
import lowerLeader from "@/assets/staff-jean-damascene.webp";

/*
 ═══════════════════════════════════════════════════════════════════════════
 QUOTES TO CONFIRM — four of them, all drafts.

 The four LeaderVoice quotes below were written from the facts in the
 2024–2025 Annual School Report. Nobody said these sentences. The substance
 is checkable (learning areas, subject weightings, benchmark results); the
 wording is not yet theirs. Before this page is published, each leader needs
 to read their own quote and approve or replace it:

   1. Marie Claire Mukabirinda — Head Mistress          (page opening)
   2. Martha Niyotwagira       — Nursery School Leader  (#nursery)
   3. Damascene                — Lower School Leader    (#lower-primary)
   4. David                    — Upper School Leader    (#upper-primary)

 David also has no photograph on file, so his block renders a monogram.
 Same open item as the leadership grid in StaffDirectory.tsx.
 ═══════════════════════════════════════════════════════════════════════════
*/

/** The six required pre-primary learning areas, per the national framework. */
const learningAreas = [
  {
    title: "Discovery of the World",
    desc: "Plants, animals, weather, the village and the road to it — the beginnings of science and social studies, learned by looking.",
  },
  {
    title: "Numeracy",
    desc: "Counting, sorting, matching, pattern and quantity, always with objects in hand before numbers on a page.",
  },
  {
    title: "Language & Literacy",
    desc: "Story, song and conversation in Kinyarwanda, with English and French arriving through rhyme and repetition.",
  },
  {
    title: "Physical & Health Development",
    desc: "Running, climbing, balance and grip — plus handwashing, teeth, and the habits that keep a child in school.",
  },
  {
    title: "Creative Arts",
    desc: "Drawing, modelling, drumming, dance and dramatic play. Nothing here is a reward for finishing something else.",
  },
  {
    title: "Social & Emotional Development",
    desc: "Naming feelings, waiting a turn, resolving a dispute, belonging to a group. The foundation everything else stands on.",
  },
];

/**
 * Subject allocations exactly as set out in Rwanda's national framework:
 * `weight` is out of 100, `periods` is periods per week (one period = 40 min),
 * identical across the three grades of each division.
 */
const lowerSubjects = [
  { name: "Kinyarwanda", weight: 27, periods: 8 },
  { name: "English", weight: 23, periods: 7 },
  { name: "Mathematics", weight: 20, periods: 6 },
  { name: "Social Studies", weight: 13, periods: 4 },
  { name: "Science", weight: 7, periods: 2 },
  { name: "Creative Arts", weight: 7, periods: 2 },
  { name: "Physical Education", weight: 3, periods: 1 },
];

const upperSubjects = [
  { name: "English", weight: 23, periods: 7 },
  { name: "Mathematics", weight: 23, periods: 7 },
  { name: "Science", weight: 17, periods: 5 },
  { name: "Kinyarwanda", weight: 13, periods: 4 },
  { name: "Social Studies", weight: 13, periods: 4 },
  { name: "Creative Arts", weight: 3, periods: 1 },
  { name: "Physical Education", weight: 3, periods: 1 },
  { name: "French", weight: 3, periods: 1 },
];

const examPapers = [
  { abbr: "SRS", full: "Social & Religious Studies" },
  { abbr: "KINY", full: "Kinyarwanda" },
  { abbr: "SCI", full: "Science & Elementary Technology" },
  { abbr: "ENG", full: "English" },
  { abbr: "MTC", full: "Mathematics" },
];

const syllabusComponents = [
  "Rationale & relevance",
  "Broad competences",
  "Pedagogy & assessment",
  "Specific objectives",
  "Competences per unit",
  "Learning outcomes per unit",
  "Content, activities & materials",
  "Cross-cutting issues",
];

const rankings = [
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
];

// ── small presentational pieces, local to this page ────────────────────────

const Eyebrow = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <span
    className={cn(
      "text-[0.7rem] font-bold uppercase tracking-[0.12em]",
      dark ? "text-accent" : "text-eyebrow",
    )}
  >
    {children}
  </span>
);

const Poster = ({
  children,
  dark,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) => (
  <h2
    className={cn(
      "mt-2 font-heading text-[clamp(1.875rem,4.4vw,3.375rem)] font-black uppercase leading-[0.95] tracking-[-0.015em]",
      /* text-foreground, not text-ink. --ink is a *band* colour: in dark mode
         it sits at 13% lightness against a 7% background, so setting type in
         it made these headings all but invisible with the dark theme on. */
      dark ? "text-primary-foreground" : "text-foreground",
      className,
    )}
  >
    {children}
  </h2>
);

const Stats = ({
  items,
  dark,
}: {
  items: { n: string; k: string }[];
  dark?: boolean;
}) => (
  <dl
    className={cn(
      "mt-7 flex flex-wrap gap-x-8 gap-y-5 border-t pt-5",
      dark ? "border-primary-foreground/25" : "border-border",
    )}
  >
    {items.map((s) => (
      <div key={s.k}>
        <dd
          className={cn(
            "font-heading text-3xl font-bold leading-none",
            dark ? "text-accent" : "text-primary",
          )}
        >
          {s.n}
        </dd>
        <dt
          className={cn(
            "mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.07em]",
            dark ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {s.k}
        </dt>
      </div>
    ))}
  </dl>
);

/** The 40-minute-period arithmetic, as a divided strip. */
const Rhythm = ({
  items,
  dark,
}: {
  items: { n: string; k: string }[];
  dark?: boolean;
}) => (
  <div
    className={cn(
      "mt-8 flex flex-wrap overflow-hidden rounded-xl border",
      dark ? "border-primary-foreground/25" : "border-border",
    )}
  >
    {items.map((r, i) => (
      <div
        key={r.k}
        className={cn(
          "flex min-w-[8rem] flex-1 flex-col px-5 py-4",
          i < items.length - 1 && "border-r",
          dark ? "border-primary-foreground/20" : "border-border",
        )}
      >
        <span
          className={cn(
            "font-heading text-2xl font-bold leading-none",
            dark ? "text-accent" : "text-primary",
          )}
        >
          {r.n}
        </span>
        {/* mt-auto pins the labels to a common baseline even when one wraps. */}
        <span
          className={cn(
            "mt-auto pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.06em]",
            dark ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {r.k}
        </span>
      </div>
    ))}
  </div>
);

/** Subject table: name, a bar for the national weighting, periods per grade. */
const SubjectTable = ({
  subjects,
  grades,
  dark,
}: {
  subjects: { name: string; weight: number; periods: number }[];
  grades: [string, string, string];
  dark?: boolean;
}) => {
  const max = Math.max(...subjects.map((s) => s.weight));
  return (
    <table className="mt-8 w-full max-w-[59rem] border-collapse">
      <thead>
        <tr>
          <th
            className={cn(
              "border-b pb-2.5 pr-3 text-left text-[0.65rem] font-bold uppercase tracking-[0.09em]",
              dark
                ? "border-primary-foreground/25 text-primary-foreground/65"
                : "border-border text-muted-foreground",
            )}
          >
            Subject
          </th>
          <th
            className={cn(
              "hidden w-[46%] border-b pb-2.5 pr-3 text-left text-[0.65rem] font-bold uppercase tracking-[0.09em] sm:table-cell",
              dark
                ? "border-primary-foreground/25 text-primary-foreground/65"
                : "border-border text-muted-foreground",
            )}
          >
            Curriculum weighting
          </th>
          {grades.map((g) => (
            <th
              key={g}
              className={cn(
                "w-14 border-b pb-2.5 text-center text-[0.65rem] font-bold uppercase tracking-[0.09em]",
                dark
                  ? "border-primary-foreground/25 text-primary-foreground/65"
                  : "border-border text-muted-foreground",
              )}
            >
              {g}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {subjects.map((s) => (
          <tr key={s.name}>
            <td
              className={cn(
                "whitespace-nowrap border-b py-3 pr-3 text-sm font-semibold",
                dark ? "border-primary-foreground/15" : "border-border",
              )}
            >
              {s.name}
            </td>
            <td
              className={cn(
                "hidden border-b py-3 pr-3 sm:table-cell",
                dark ? "border-primary-foreground/15" : "border-border",
              )}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={cn("h-2.5 min-w-[6px] rounded-full", dark ? "bg-accent" : "bg-primary")}
                  style={{ width: `${(s.weight / max) * 100}%` }}
                />
                <span className="w-7 shrink-0 text-right font-heading text-[0.8rem] font-bold">
                  {s.weight}
                </span>
              </div>
            </td>
            {grades.map((g) => (
              <td
                key={g}
                className={cn(
                  "border-b py-3 text-center text-sm tabular-nums",
                  dark
                    ? "border-primary-foreground/15 text-primary-foreground/80"
                    : "border-border text-muted-foreground",
                )}
              >
                {s.periods}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="pt-3.5 text-[0.8rem] font-bold">Periods per week</td>
          <td className="hidden sm:table-cell" />
          {grades.map((g) => (
            <td key={g} className="pt-3.5 text-center text-[0.8rem] font-bold tabular-nums">
              30
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  );
};

const Shot = ({ src, alt, position }: { src: string; alt: string; position?: string }) => (
  <div className="overflow-hidden rounded-2xl">
    <img
      src={src}
      alt={alt}
      className="aspect-[4/3] w-full object-cover"
      style={position ? { objectPosition: position } : undefined}
      loading="lazy"
    />
  </div>
);

/** Full-bleed photo strip with a caption, used between divisions. */
const Strip = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
  <div className="relative h-[clamp(13.75rem,32vw,25rem)] overflow-hidden">
    <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,hsl(var(--ink)/0.8),transparent)] px-6 pb-4 pt-12">
      <p className="container text-xs font-semibold uppercase tracking-[0.05em] text-primary-foreground">
        {caption}
      </p>
    </div>
  </div>
);

const Chips = ({ items, dark }: { items: string[]; dark?: boolean }) => (
  <ul className="mt-6 flex flex-wrap gap-2">
    {items.map((c) => (
      <li
        key={c}
        className={cn(
          "rounded-full border px-3.5 py-1.5 text-sm",
          dark
            ? "border-primary-foreground/25 bg-primary-foreground/10"
            : "border-border bg-card",
        )}
      >
        {c}
      </li>
    ))}
  </ul>
);

// ── the page ───────────────────────────────────────────────────────────────

const Academics = () => {
  const section = findSection("/academics")!;

  return (
    <>
      <PosterHero
        section={section}
        title="Academics"
        lede="Three schools under one roof, from a child's first day at age three to the morning they sit Rwanda's National Examination."
        image={heroPhoto}
      />

      {/* ── the statement ─────────────────────────────────────────────── */}
      <section className="container pt-16 sm:pt-20">
        <h2 className="max-w-[30ch] font-heading text-[clamp(1.7rem,3.6vw,2.75rem)] font-bold leading-[1.1] text-primary">
          Children learn holistically — and in three languages from the very first year.
        </h2>
        <div className="mt-7 grid gap-x-10 gap-y-5 text-base leading-relaxed text-muted-foreground md:grid-cols-2">
          <p>
            Crimson Academy follows Rwanda&apos;s{" "}
            <strong className="text-foreground">National Competence-Based Curriculum</strong>,
            adopted by the Ministry of Education in 2015. It is not a syllabus of facts to be
            recited. Each subject is built around competences a child can demonstrate — and around
            learning that is practical, hands-on, and connected across subjects.
          </p>
          <p>
            What that looks like in a Kagina classroom: nursery children discovering the world
            through play, Primary&nbsp;1 learners building literacy in Kinyarwanda before English
            becomes the language of instruction, and Primary&nbsp;6 students sitting five national
            papers — and{" "}
            <strong className="text-foreground">placing first in the Southern Province</strong> in
            twelve of the last thirteen years.
          </p>
        </div>
      </section>

      {/* ── the Head Mistress ─────────────────────────────────────────── */}
      <section className="container py-16 sm:py-20">
        <LeaderVoice
          name="Marie Claire Mukabirinda"
          role="Head Mistress"
          signature="Marie Claire"
          quote="We do not simply move children through grades. We watch each one — three times a term, in every subject — so we know exactly where a child is growing and where a child needs us."
          aside="Every syllabus we teach is built the same way: a rationale, broad competences, specific objectives, the competences and learning outcomes expected per unit, the content and materials required, the pedagogy and assessment that go with it, and the cross-cutting issues a child should carry out of the room. Eight components, every subject, every grade."
          photo={headMistress}
        />
      </section>

      {/* ── our approach ──────────────────────────────────────────────── */}
      <Band id="approach" ground="tint">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:order-2">
            <Eyebrow>Our Approach</Eyebrow>
            <Poster>
              The S.M.A.R.T.
              <br />
              Way to Grow
            </Poster>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Five pillars carry every classroom in the school:{" "}
                <strong className="text-foreground">S</strong>ervice and continuous improvement,{" "}
                <strong className="text-foreground">M</strong>aximising each developmental stage,{" "}
                <strong className="text-foreground">A</strong>rtistic expression,{" "}
                <strong className="text-foreground">R</strong>eading, writing and arithmetic, and{" "}
                <strong className="text-foreground">T</strong>eacher and staff development.
              </p>
              <p>
                Around them sit the things a competence-based curriculum needs in order to actually
                work in a rural district: daily instruction in three languages, socio-emotional and
                health support so children arrive ready to learn, a computer lab, and benchmarks
                agreed with MINEDUC that we measure ourselves against every term.
              </p>
            </div>
            <Chips items={syllabusComponents} />
            <p className="mt-3.5 text-[0.8rem] text-muted-foreground">
              The eight components behind every subject syllabus.
            </p>
          </div>
          <div className="lg:order-1">
            {/*
              793x1053 portrait in a 4/3 box, so cover crops a lot of height and
              the Y position matters: centred shows only the carved crest and
              cuts the child's head off the bottom. 70% keeps the bottom of the
              crest and his face both in frame.
            */}
            <Shot
              src={approachPhoto}
              alt="A pupil holding up the carved Crimson Academy crest"
              position="50% 70%"
            />
          </div>
        </div>
      </Band>

      <Strip
        src={stripDancing}
        alt=""
        caption="780 learners · Nursery through Primary 6 · Kagina, Southern Province"
      />

      {/* ── nursery ───────────────────────────────────────────────────── */}
      <Band id="nursery" ground="crimson">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow dark>Nursery School · Pre-Primary</Eyebrow>
            <Poster dark>
              A world worth
              <br />
              discovering
            </Poster>
            <div className="mt-4 space-y-4 leading-relaxed text-primary-foreground/90">
              <p>
                Our youngest children arrive at three and leave at six, and in between they do not
                sit still. Rwanda&apos;s pre-primary framework sets out{" "}
                <strong className="text-primary-foreground">
                  six integrated, thematic learning areas
                </strong>{" "}
                rather than separate subjects, so that a morning spent counting seeds is also a
                morning of language, of fine motor skill, of taking turns.
              </p>
              <p>
                Nursery is our largest division and our strongest performing one: class averages
                between 75% and 88%, and{" "}
                <strong className="text-primary-foreground">zero repetition</strong> across all
                three classes. Children are fed here — the school food programme runs through the
                nursery day — and the year ends with a school-wide graduation in caps and gowns,
                with grandparents in the crowd.
              </p>
            </div>
            <Stats
              dark
              items={[
                { n: "3–6", k: "Years old" },
                { n: "150", k: "Children" },
                { n: "3", k: "Classes" },
                { n: "0%", k: "Repetition" },
              ]}
            />
          </div>
          <Shot
            src={nurseryPhoto}
            alt="Nursery students in caps and gowns holding their certificates at the annual graduation"
          />
        </div>

        <ul className="mt-9 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {learningAreas.map((a, i) => (
            <li
              key={a.title}
              className="rounded-xl border border-accent/45 bg-primary-foreground/[0.07] px-5 pb-5 pt-4"
            >
              <span className="font-heading text-[0.8rem] font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-heading text-[1.05rem] font-semibold leading-tight">
                {a.title}
              </h3>
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-primary-foreground/85">
                {a.desc}
              </p>
            </li>
          ))}
        </ul>

        <Rhythm
          dark
          items={[
            { n: "3–4", k: "Nursery A" },
            { n: "4–5", k: "Nursery B" },
            { n: "5–6", k: "Nursery C" },
            { n: "3 + 3", k: "Teachers & assistants" },
            { n: "Daily", k: "Food programme" },
          ]}
        />

        <LeaderVoice
          className="mt-14 border-t border-primary-foreground/20 pt-14"
          tone="dark"
          side="left"
          name="Martha Niyotwagira"
          role="Nursery School Leader"
          signature="Martha"
          quote="A three-year-old does not learn in subjects, so we do not teach in subjects. We count seeds, we sing, we wash hands, we settle an argument over a drum — and all six learning areas are in that one morning. No child repeated a year with us, and that is the number I am proudest of."
          photo={nurseryLeader}
        />
      </Band>

      {/* ── lower school ──────────────────────────────────────────────── */}
      <Band id="lower-primary" ground="cream">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:order-2">
            <Eyebrow>Lower School · Primary 1 – Primary 3</Eyebrow>
            <Poster>
              First words,
              <br />
              first numbers
            </Poster>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Lower School is where literacy and numeracy are built, and the national curriculum
                is deliberate about the order.{" "}
                <strong className="text-foreground">
                  Kinyarwanda carries the heaviest weighting
                </strong>{" "}
                in these three years — a child reads and writes confidently in their own language
                first. English is taught alongside it from day one and takes over as the language of
                instruction in Upper School.
              </p>
              <p>
                Seven subjects, thirty periods a week, forty minutes to a period. Creative Arts and
                Physical Education are timetabled, not squeezed in — and across P1 to P3 they are
                frequently where our children score highest, which is the confidence we work to
                carry back into the core subjects.
              </p>
            </div>
            <Stats
              items={[
                { n: "368", k: "Learners in P1–P3" },
                { n: "7", k: "Subjects" },
                { n: "6", k: "Classes" },
                { n: "6", k: "Class teachers" },
              ]}
            />
          </div>
          <div className="lg:order-1">
            {/* 1800x1200 is wider than 4/3, so cover crops width, not height —
                an object-position Y would do nothing here. */}
            <Shot src={lowerPhoto} alt="Lower primary learners outside the classroom block" />
          </div>
        </div>

        <SubjectTable subjects={lowerSubjects} grades={["P1", "P2", "P3"]} />
        <p className="mt-3 max-w-[62ch] text-[0.8rem] leading-relaxed text-muted-foreground">
          One period is 40 minutes. Thirty periods make 20 contact hours a week and 780 contact
          hours a year — the allocation set by Rwanda&apos;s national framework, which we follow
          exactly.
        </p>

        <Rhythm
          items={[
            { n: "40", k: "Minutes per period" },
            { n: "30", k: "Periods per week" },
            { n: "20", k: "Contact hours per week" },
            { n: "780", k: "Contact hours per year" },
            { n: "3", k: "Tests per term" },
          ]}
        />

        <LeaderVoice
          className="mt-14 border-t pt-14"
          name="Damascene"
          role="Lower School Leader"
          signature="Damascene"
          quote="Eight periods of Kinyarwanda a week is not sentiment, it is sequence. A child who can read in their own language will read in English; a child who cannot will spend six years guessing. Our job in these three years is to make sure nobody is guessing."
          photo={lowerLeader}
        />
      </Band>

      <Strip
        src={stripCampus}
        alt=""
        caption="English · Kinyarwanda · French — taught daily, every year of the school"
      />

      {/* ── upper school ──────────────────────────────────────────────── */}
      <Band id="upper-primary" ground="ink">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow dark>Upper School · Primary 4 – Primary 6</Eyebrow>
            <Poster dark>
              Eight subjects,
              <br />
              one exam
            </Poster>
            <div className="mt-4 space-y-4 leading-relaxed text-primary-foreground/90">
              <p>
                In Upper School the balance shifts. English and Mathematics move to the front of the
                timetable,{" "}
                <strong className="text-primary-foreground">Science more than doubles</strong>, and{" "}
                <strong className="text-primary-foreground">French joins as a formal subject</strong>{" "}
                — eight subjects in place of seven, still inside thirty periods a week. English is
                now the language of instruction; Kinyarwanda and French continue daily.
              </p>
              <p>
                Everything here points at one morning. Students are assessed three times a term
                against benchmarks agreed with MINEDUC, and by Primary&nbsp;6 the class is preparing
                for five national papers. Alongside it, P6 students lead the school&apos;s monthly
                community service — walking out into the village with teaching, encouragement, and
                sacks of rice and beans.
              </p>
            </div>
            <Stats
              dark
              items={[
                { n: "262", k: "Learners in P4–P6" },
                { n: "8", k: "Subjects" },
                { n: "6+4", k: "Class & language teachers" },
                { n: "Monthly", k: "P6 community service" },
              ]}
            />
          </div>
          <Shot src={upperPhoto} alt="Primary 6 graduates at the leaving ceremony" />
        </div>

        <SubjectTable subjects={upperSubjects} grades={["P4", "P5", "P6"]} dark />
        <p className="mt-3 max-w-[62ch] text-[0.8rem] leading-relaxed text-primary-foreground/80">
          Compared with Lower School: Kinyarwanda halves from 27 to 13, Science rises from 7 to 17,
          Mathematics from 20 to 23, and French enters the timetable. The week stays the same length
          — the priorities inside it change.
        </p>

        <Chips
          dark
          items={[
            "Choir · P6",
            "Karate · P2, P4, P5",
            "Soccer · P3–P6",
            "Acrobatics · P3–P6",
            "Computer lab",
            "Monthly community service · P6",
          ]}
        />

        <LeaderVoice
          className="mt-14 border-t border-primary-foreground/20 pt-14"
          tone="dark"
          side="left"
          name="David"
          role="Upper School Leader"
          signature="David"
          quote="From Primary 4 the whole room changes language, and Science goes from two periods to five. That is a lot to ask of a ten-year-old. So we test three times a term, not to rank them, but to find out in October who will struggle in June while there is still time to do something about it."
        />
      </Band>

      {/* ── the national exam ─────────────────────────────────────────── */}
      <Band id="results" ground="tint">
        <Eyebrow>The National Examination</Eyebrow>
        <Poster>
          Five papers.
          <br />
          One morning.
        </Poster>
        <p className="mt-4 max-w-[56ch] leading-relaxed text-muted-foreground">
          At the end of Primary 6 every child in Rwanda sits the National Examination. Five papers,
          marked centrally, graded in divisions. It is the same paper in Kagina as in Kigali — which
          is exactly why our results matter.
        </p>

        <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {examPapers.map((p) => (
            <li key={p.abbr} className="rounded-xl border bg-card px-5 py-4">
              <div className="font-heading text-xl font-black text-primary">{p.abbr}</div>
              <div className="mt-1 text-[0.8rem] leading-snug text-muted-foreground">{p.full}</div>
            </li>
          ))}
        </ul>

        <dl className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "90.4%", k: "Primary 6 class average, 2024–2025" },
            { n: "100%", k: "of the 44 graduates earned Division A" },
            { n: "96.2%", k: "Top mark in the class" },
            { n: "#1", k: "in the Southern Province" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-primary px-6 py-6 text-primary-foreground">
              <dd className="font-heading text-[clamp(1.875rem,3.4vw,2.6rem)] font-black leading-none text-accent">
                {s.n}
              </dd>
              <dt className="mt-2.5 text-[0.85rem] leading-snug text-primary-foreground/90">
                {s.k}
              </dt>
            </div>
          ))}
        </dl>

        <p className="mt-9 font-semibold text-foreground">
          Ranked first in the province in twelve of the last thirteen years.
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {rankings.map((y) => {
            const second = y === 2015;
            return (
              <li
                key={y}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-bold",
                  second ? "bg-secondary text-muted-foreground" : "bg-primary/10 text-primary",
                )}
              >
                {y} {second ? "#2" : "#1"}
              </li>
            );
          })}
        </ul>
      </Band>

      {/* ── beyond crimson ────────────────────────────────────────────── */}
      <Band id="beyond" ground="cream">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow>Beyond Crimson</Eyebrow>
            <Poster>All 44 placed</Poster>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              In 2024–2025 every one of our 44 Primary 6 graduates earned a place at a top secondary
              boarding school in Rwanda. Top performers are awarded scholarships and we go on
              sponsoring them —{" "}
              <strong className="text-foreground">22 secondary students</strong> are on our books
              today. In 2016 one of our graduates posted the second-highest mark on the National
              Examination in the entire country.
            </p>
            <Link
              to="/support#sponsor"
              className={cn(buttonVariants({ size: "lg" }), "mt-6 rounded-full")}
            >
              Sponsor a student
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <Shot src={beyondPhoto} alt="A Crimson Academy graduating class in cap and gown" />
        </div>

        <h3 className="mt-16 font-heading text-2xl font-semibold">More on how we teach</h3>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            {
              img: foodPhoto,
              alt: "Children eating a meal from the school food programme",
              eb: "Support Services",
              t: "A child who is hungry cannot learn",
              p: "Three cooks, a daily food programme through the nursery day, and access to medical and socio-emotional support for students and their families. This is curriculum infrastructure, not charity.",
              href: "/student-life#wellbeing",
              cta: "Health & wellbeing",
            },
            {
              img: staffPhoto,
              alt: "Crimson Academy teaching staff",
              eb: "Our Teachers",
              t: "Twenty-three teachers, four of them language specialists",
              p: "Thirty-four staff in all: 2 administrators, 1 pastor, 3 nursery teachers with 3 assistants, 6 lower and 6 upper school class teachers, 4 language teachers, and instructors in karate and football.",
              href: "/about#leadership",
              cta: "Meet the staff",
            },
            {
              img: outreachPhoto,
              alt: "Primary 6 students on community service in the village",
              eb: "Cross-Cutting Issues",
              t: "What we ask of Primary 6",
              p: "Once a month the oldest class walks into the village with their teachers to teach, to encourage, and to deliver rice and beans to the families who host them. It is written into the year, not added to it.",
              href: "/student-life#chapel",
              cta: "Faith & service",
            },
          ].map((c) => (
            <article
              key={c.t}
              className="flex flex-col overflow-hidden rounded-2xl border bg-card"
            >
              <img
                src={c.img}
                alt={c.alt}
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
              <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                <Eyebrow>{c.eb}</Eyebrow>
                <h4 className="mt-2 font-heading text-lg font-semibold leading-tight">{c.t}</h4>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{c.p}</p>
                <Link
                  to={c.href}
                  className="mt-auto pt-4 text-xs font-bold uppercase tracking-[0.05em] text-primary hover:underline"
                >
                  {c.cta} &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Band>

      {/* ── closing CTA ───────────────────────────────────────────────── */}
      <section className="bg-accent py-14">
        <div className="container flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="max-w-[24ch] font-heading text-[clamp(1.5rem,3vw,2.125rem)] font-bold text-accent-foreground">
              Come and see a lesson.
            </h2>
            <p className="mt-2.5 max-w-[46ch] text-accent-foreground/85">
              Visits are welcome during term. We will walk you through all three schools.
            </p>
          </div>
          <Link
            to="/admissions#visit"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
          >
            Arrange a visit
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Academics;
