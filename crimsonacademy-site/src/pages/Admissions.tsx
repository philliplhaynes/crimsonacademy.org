import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Check } from "lucide-react";
import { PosterHero, Band } from "@/components/PosterHero";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { findSection } from "@/nav";
import { PhotoSlot } from "@/components/PhotoSlot";
import { cn } from "@/lib/utils";

import heroPhoto from "@/assets/contact-students.jpg";
import whyPhoto from "@/assets/graduation-p6.jpg";
import marieClaire from "@/assets/staff-marie-claire.webp";
import martha from "@/assets/staff-martha.webp";
import damascene from "@/assets/staff-jean-damascene.webp";
import jeanClaude from "@/assets/staff-jean-claude.webp";
import crest from "@/assets/crimson_tree.png";

/**
 * /admissions — the merged direction from content/admissions-mockups/
 * (three compared, C chosen): the question-led order from "The Prospectus"
 * with the numbered step spine and circular team roster from "The Path".
 *
 * Section ids are load-bearing. #enroll, #fees and #visit are linked from
 * Navbar, Hero, Footer, About and Academics — the labels changed when this
 * page was rebuilt, the ids did not. See the note in nav.ts.
 */

/*
 ═══════════════════════════════════════════════════════════════════════════
 FEES ARE NOT CONFIRMED. Do not publish this page until they are.

 Two sources were supplied and they disagree:
   • A fee table (screenshot) showing General Tuition  40,000.00
   • A written brief             saying General Tuition 50,000.00
 The written brief is used below because it came later. That is a
 tie-break, not a confirmation.

 Two further gaps, both unresolved:
   • BILLING PERIOD is stated nowhere. Per term or per year? The school
     runs three terms and Rwandan primaries usually bill per term, but
     nothing supplied says so — so this page deliberately does NOT claim a
     period. It shows amounts only. Add the period here once confirmed;
     a fee table without one is confusing, a fee table with the wrong one
     is worse.
   • CURRENCY is not stated either. RWF is used as the obvious reading for
     a Rwandan school.

 Nursery Tuition appears in the screenshot but not the written brief, and
 is carried through unchanged at 40,000.00 — confirm it did not move when
 General Tuition did.
 ═══════════════════════════════════════════════════════════════════════════
*/
const feeGroups: { group: string; note?: string; rows: { item: string; sub: string; amount: string }[] }[] = [
  {
    group: "Tuition",
    rows: [
      { item: "Nursery Tuition", sub: "Nursery A, B, C and Nursery Top", amount: "40,000.00" },
      { item: "General Tuition", sub: "Primary 1 through Primary 6", amount: "50,000.00" },
    ],
  },
  {
    group: "Food",
    note: "optional",
    rows: [
      { item: "Breakfast", sub: "Served on campus each school day", amount: "15,000.00" },
      { item: "Lunch", sub: "Served on campus each school day", amount: "45,000.00" },
    ],
  },
];

const whyPoints = [
  {
    title: "Results that open doors",
    text: "A Primary 6 average of 90.4%, every graduate in Division A, and scholarships to Rwanda's leading secondary boarding schools for the strongest.",
  },
  {
    title: "Three languages from year one",
    text: "English, French and Kinyarwanda taught daily from a child's first year, not bolted on later.",
  },
  {
    title: "Nobody misses school over a meal or a walk",
    text: "Breakfast and lunch on campus, buses for children who live too far to walk, and sponsorship where fees are the barrier.",
  },
  {
    title: "Character taught out loud",
    text: "Truth, Discipline and Service are named and taught explicitly. Families of every background are welcome.",
  },
];

const stats = [
  { n: "90.4%", k: "P6 National Exam average" },
  { n: "#1", k: "Southern Province, nearly every year since 2013" },
  { n: "780", k: "Students, nursery to Primary 6" },
  { n: "32", k: "Staff who know them by name" },
];

/** Each step names the leader a family actually deals with at that stage. */
const steps: {
  n: number;
  title: string;
  text: string;
  people?: { name: string; role: string; photo?: string }[];
}[] = [
  {
    n: 1,
    title: "Get in touch",
    text: "Email us with your child's name, age, and the class you are applying for. We will tell you what places are available for the coming academic year.",
    people: [{ name: "Marie Claire Mukabirinda", role: "You'll hear from", photo: marieClaire }],
  },
  {
    n: 2,
    title: "Visit the school",
    text: "Come and see the campus, meet the teachers, and sit in on a class in session. We encourage every family to visit before enrolling — it is the fastest way to know whether this is the right school for your child.",
    people: [{ name: "Martha Niyotwagira", role: "Nursery families are shown round by", photo: martha }],
  },
  {
    n: 3,
    title: "Sit the entrance test",
    text: "Set at the level of the class your child is applying to enter, so it measures readiness for that year. A place is offered on passing. Bring a recent report card if your child is transferring from another school.",
    people: [
      { name: "Damascene", role: "Primary 1–3 testing sits with", photo: damascene },
      { name: "David", role: "Primary 4–6 testing sits with" },
    ],
  },
  {
    n: 4,
    title: "Confirm the place and settle fees",
    text: "Once your child has passed, we confirm the place in writing and set out the fees, including whether you want breakfast and lunch on the meal plan. If fees are a barrier, say so at this point — sponsorship exists precisely for that conversation.",
    people: [{ name: "Jean Claude Twizeyimana", role: "Fees and sponsorship:", photo: jeanClaude }],
  },
  {
    n: 5,
    title: "Start the term",
    text: "Arrive on the first day with the supply list above, and your child starts alongside everyone else. The academic year begins in September and runs in three terms through July, following the MINEDUC calendar.",
  },
];

const team = [
  { name: "Marie Claire Mukabirinda", role: "Head Mistress", for: "First contact and offers of a place", photo: marieClaire },
  { name: "David", role: "Upper School Leader", for: "Primary 4–6 entry and testing" },
  { name: "Damascene", role: "Lower School Leader", for: "Primary 1–3 entry and testing", photo: damascene },
  { name: "Martha Niyotwagira", role: "Nursery School Leader", for: "Nursery entry and first visits", photo: martha },
  { name: "Jean Claude Twizeyimana", role: "Accountant", for: "Fees, meal plans and sponsorship", photo: jeanClaude },
];

const supplies = ["Notebooks", "Pencils and erasers", "Paper", "Other basic classroom materials"];

const faqs = [
  {
    q: "Where is Crimson Academy located?",
    a: "We are in Kagina, Kamonyi District, in Rwanda's Southern Province. Contact us to arrange a visit or a campus tour.",
  },
  {
    q: "What grades do you offer?",
    a: "Nursery (ages 3–6) through Primary 6, following Rwanda's National Competence-Based Curriculum set by MINEDUC.",
  },
  {
    q: "What languages are used for instruction?",
    a: "Students receive daily instruction in English, French, and Kinyarwanda. English is the main language of instruction, with French and Kinyarwanda used as additional languages.",
  },
  {
    q: "How large are the classes?",
    // Previously read "23 qualified teachers and 34 staff in total". The staff
    // directory was corrected to 32 people, and the teacher figure could not be
    // reconciled against it (22 people hold a Teaching role, but whether the
    // report's 23 counts teaching assistants is unclear), so the unverifiable
    // number is left out rather than restated.
    a: "Enrollment in 2024–2025 was 780 students across nursery and six primary grades, taught and supported by 32 staff.",
  },
  {
    q: "Do you provide transport and meals?",
    a: "Yes. School buses serve students who live too far from Kagina to walk, and breakfast and lunch are served on campus each school day.",
  },
  {
    q: "Are scholarships or sponsorships available?",
    a: "Yes. In partnership with the Crimson Foundation, sponsorships support tuition, meals, and materials. Top Primary 6 graduates also receive scholarships to leading secondary boarding schools — we currently sponsor 22 secondary students.",
  },
  {
    q: "Is the school only for Christian families?",
    a: "No. Crimson Academy is a Christian school and our values are rooted in scripture, but families of all backgrounds are welcome and enrolled.",
  },
];

/** Section heading, matching the Academics page's band rhythm. */
const Head = ({ eyebrow, title, light }: { eyebrow: string; title: string; light?: boolean }) => (
  <>
    <div
      className={cn(
        "text-xs font-semibold uppercase tracking-wider",
        light ? "text-accent" : "text-eyebrow",
      )}
    >
      {eyebrow}
    </div>
    <h2 className="mt-2 max-w-[24ch] font-heading text-2xl font-semibold leading-tight md:text-3xl">
      {title}
    </h2>
  </>
);

/** A leader chip: small portrait, or the crest where no photo exists. */
const PersonChip = ({ name, role, photo }: { name: string; role: string; photo?: string }) => (
  <span className="mr-2 mt-3 inline-flex items-center gap-2.5 rounded-full bg-secondary/70 py-1.5 pl-1.5 pr-4 text-xs text-muted-foreground">
    {photo ? (
      <img src={photo} alt="" className="h-7 w-7 rounded-full object-cover" loading="lazy" />
    ) : (
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10"
        role="img"
        aria-label={`${name} — photograph to come`}
      >
        <img src={crest} alt="" aria-hidden="true" className="w-4 opacity-50" loading="lazy" />
      </span>
    )}
    {role} <b className="font-semibold text-foreground">{name}</b>
  </span>
);

const Admissions = () => {
  const section = findSection("/admissions")!;

  return (
    <>
      <PosterHero
        section={section}
        title="Join us"
        lede="The answers to what it costs, what your child needs, and who to ask — before you pick up the phone."
        image={heroPhoto}
        // Biased toward the crest on their shirts, same crop reasoning as the
        // About page's contact photo.
        imagePosition="50% 60%"
      />

      {/* ---------- why crimson ---------- */}
      <Band id="why">
        <Head eyebrow="Why Crimson Academy" title="The question behind every other question on this page." />
        <div className="mt-8 grid items-center gap-11 lg:grid-cols-2">
          <div>
            <p className="leading-relaxed text-muted-foreground">
              Crimson Academy opened in 2011 with four classrooms and 181 children, on a hillside the
              village cleared by hand. It was built because parents in Kagina were asking for an
              education their children could not otherwise reach.
            </p>
            <blockquote className="mt-5 border-l-4 border-accent pl-5 font-heading text-lg italic leading-snug">
              “The first classrooms were not delivered to Kagina. They were built by the families
              whose children would sit in them.”
            </blockquote>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Fourteen years on, the school runs the full national primary programme in three
              languages and places at or near the top of the Southern Province — while still
              admitting the children of the families who built it.
            </p>
          </div>
          <img
            src={whyPhoto}
            alt="A Primary 6 graduating class in red caps and gowns at the graduation ceremony"
            className="aspect-[4/3] w-full rounded-xl object-cover"
            loading="lazy"
          />
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-x-9">
          {whyPoints.map((p) => (
            <li key={p.title} className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <span className="h-2 w-2 rounded-full bg-primary" />
              </span>
              <div>
                <div className="font-heading font-semibold">{p.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Band>

      <Band ground="crimson" className="py-10 sm:py-12">
        <dl className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.k}>
              <dt className="sr-only">{s.k}</dt>
              <dd>
                <span className="block font-heading text-3xl font-bold leading-none text-accent">
                  {s.n}
                </span>
                <span className="mt-2 block text-xs text-primary-foreground/80">{s.k}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Band>

      {/* ---------- fees ---------- */}
      <Band id="fees" ground="tint">
        <Head eyebrow="What It Costs" title="Fees, in full, with nothing hidden." />
        <p className="mt-4 max-w-[65ch] text-muted-foreground">
          Tuition and meals are billed separately, so you can take the meal plan or not. If fees are
          the thing standing in the way, tell us — sponsorship through the Crimson Foundation exists
          for exactly that.
        </p>

        <div className="mt-7 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
          <div className="overflow-hidden rounded-xl border bg-background">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/60 text-left">
                  <th className="px-4 py-3 text-[0.7rem] font-bold uppercase tracking-wide text-muted-foreground">
                    Item
                  </th>
                  <th className="px-4 py-3 text-right text-[0.7rem] font-bold uppercase tracking-wide text-muted-foreground">
                    Amount (RWF)
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Fragment, not <>, because a keyed list item needs a key on
                    the wrapper itself and the shorthand cannot take one. */}
                {feeGroups.map((g) => (
                  <Fragment key={g.group}>
                    <tr className="bg-secondary/35">
                      <td colSpan={2} className="px-4 py-2.5 font-heading font-bold text-primary">
                        {g.group}
                        {g.note && (
                          <span className="ml-2 text-xs font-normal text-muted-foreground">
                            — {g.note}
                          </span>
                        )}
                      </td>
                    </tr>
                    {g.rows.map((r) => (
                      <tr key={r.item} className="border-t">
                        <td className="px-4 py-3 text-sm">
                          {r.item}
                          <span className="mt-0.5 block text-xs text-muted-foreground">{r.sub}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-heading font-bold tabular-nums">
                          {r.amount}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl bg-primary p-6 text-primary-foreground">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">
              Worked example
            </div>
            <h3 className="mt-2 font-heading text-lg font-semibold">A Primary 3 child, both meals</h3>
            <dl className="mt-4">
              {[
                ["General Tuition", "50,000.00"],
                ["Breakfast", "15,000.00"],
                ["Lunch", "45,000.00"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between gap-4 border-b border-primary-foreground/20 py-2.5 text-sm last:border-b-0"
                >
                  <dt>{k}</dt>
                  <dd className="font-heading font-bold tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex justify-between gap-4 border-t-2 border-accent pt-3">
              <span className="font-heading">Total</span>
              <span className="font-heading text-2xl font-bold tabular-nums text-accent">
                110,000.00
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-primary-foreground/70">
              Tuition only, without the meal plan:{" "}
              <b className="text-accent">50,000.00</b>. A nursery child with both meals:{" "}
              <b className="text-accent">100,000.00</b>.
            </p>
          </div>
        </div>
      </Band>

      {/* ---------- getting in ---------- */}
      <Band id="entry">
        <Head eyebrow="Getting In" title="Will my child get a place?" />
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border bg-background p-6">
            <h3 className="font-heading text-lg font-semibold text-primary">
              Every applicant sits an entrance test.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A place is offered on passing it. The test is set at the level of the class your child
              is applying to enter, so it measures readiness for that year rather than general
              ability — a child joining Primary 3 is tested on Primary 2 ground.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              If your child is transferring from another school, bring their{" "}
              <b className="text-foreground">most recent report card</b> as well. It is required, not
              optional.
            </p>
          </div>
          <div className="rounded-xl border bg-background p-6">
            <h3 className="font-heading text-lg font-semibold text-primary">
              What to bring on the first day.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Students are asked to come to school prepared with basic school supplies:
            </p>
            <ul className="mt-3 space-y-2">
              {supplies.map((s) => (
                <li key={s} className="flex gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      {/* ---------- the process ---------- */}
      <Band id="enroll" ground="tint">
        <Head eyebrow="The Process" title="Five steps to a place at Crimson." />
        <p className="mt-4 max-w-[65ch] text-muted-foreground">
          The whole process usually takes a couple of weeks, and you deal with the same small group
          of people from start to finish. Crimson Academy has no separate admissions department.
        </p>

        <ol className="mt-8">
          {steps.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-dashed py-6 last:border-b-0 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground sm:h-14 sm:w-14 sm:text-xl">
                {s.n}
              </span>
              <div className="min-w-0">
                <h3 className="font-heading text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.text}</p>
                {s.people && (
                  <div className="-mr-2 flex flex-wrap">
                    {s.people.map((p) => (
                      <PersonChip key={p.name} {...p} />
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Band>

      {/* ---------- admissions team ---------- */}
      <Band id="team">
        <Head eyebrow="Who To Ask" title="You will be talking to the people who run the school." />
        <p className="mt-4 max-w-[65ch] text-muted-foreground">
          Applications are handled by the school's own leaders — the same people who will teach, lead
          and know your child once they are here. Here is who to ask for what.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {team.map((p) => (
            <li key={p.role} className="text-center">
              {p.photo ? (
                <img
                  src={p.photo}
                  alt={`Portrait of ${p.name}, ${p.role}`}
                  className="mx-auto h-20 w-20 rounded-full object-cover"
                  loading="lazy"
                  width={976}
                  height={976}
                />
              ) : (
                <span
                  role="img"
                  aria-label={`${p.name} — photograph to come`}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
                >
                  <img src={crest} alt="" aria-hidden="true" className="w-10 opacity-45" loading="lazy" />
                </span>
              )}
              <div className="mt-3 text-[0.65rem] font-bold uppercase tracking-wide text-eyebrow">
                {p.role}
              </div>
              <div className="mt-1 font-heading text-sm font-semibold leading-tight text-primary">
                {p.name}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.for}</p>
            </li>
          ))}
        </ul>
      </Band>

      {/* ---------- visit ---------- */}
      <Band id="visit" ground="tint">
        <Head eyebrow="Visit Us" title="Come and see the school for yourself." />
        <div className="mt-7 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Prospective families are welcome to tour the campus, meet teachers, and see classrooms
              in session. Visits are the best way to understand what the school is like day to day.
            </p>
            <p>
              Our campus includes classrooms built between 2011 and 2016, a library, a computer lab,
              and teacher housing — built with the support of the Crimson Foundation.
            </p>
            <Card className="border-none bg-background">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground">Campus</div>
                    <div className="text-sm text-muted-foreground">
                      Kagina, Kamonyi District, Southern Province, Rwanda
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground">Arrange a visit</div>
                    <a
                      href="mailto:info@crimsonacademy.org"
                      className="text-sm text-primary underline underline-offset-4"
                    >
                      info@crimsonacademy.org
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <PhotoSlot
            ratio="landscape"
            brief="Wide shot of the campus: the classroom block with the crest on the wall"
            size="1600px wide"
          />
        </div>
      </Band>

      {/* ---------- faq ---------- */}
      <Band id="faq">
        <Head eyebrow="Frequently Asked Questions" title="Questions families ask us" />
        <div className="mt-7 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-8 text-muted-foreground">
            Still have a question?{" "}
            <Link
              to="/about#contact"
              className="font-medium text-primary underline underline-offset-4"
            >
              Contact us
            </Link>
            .
          </p>
        </div>
      </Band>
    </>
  );
};

export default Admissions;
