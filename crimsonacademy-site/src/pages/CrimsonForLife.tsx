import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { PosterHero, Band } from "@/components/PosterHero";
import { findSection } from "@/nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ZEFFY_DONATE_URL } from "@/lib/links";

import heroPhoto from "@/assets/cfl-hero-class.jpg";
import then2009 from "@/assets/cfl-then-2009.webp";
import shoesPhoto from "@/assets/cfl-shoes.webp";
import teachersPhoto from "@/assets/cfl-teachers.webp";
import mealsPhoto from "@/assets/cfl-meals.webp";
import graduatesPhoto from "@/assets/cfl-graduates.webp";
import livestockPhoto from "@/assets/cfl-livestock.webp";
import buildStrip from "@/assets/cfl-strip-build.webp";
import celebrateStrip from "@/assets/cfl-strip-celebrate.webp";

/*
 ═══════════════════════════════════════════════════════════════════════════
 EVERY NUMBER ON THIS PAGE COMES FROM THE ANNUAL SCHOOL REPORT 2024–2025,
 EXCEPT THE GIFT TIERS BELOW.

 The "Where It Goes" full budget breakdown (five lines, RWF/USD, the $65
 per-child callout) has been removed on request. What's left in "Why Give"
 still quotes the report directly (71.2M RWF fees against a 68.8M RWF
 budget, both as plain prose, not pulled from any of the removed consts).

 The five `gifts` tiers below are NOT budget lines — they're the amounts
 supplied directly, not derived from the report the way the old $17/$51/$65
 ladder was. RWF figures are a straight ×1,350 conversion (the report's own
 rate) so the table isn't dollars-only, not a claim that 1,350 RWF is what
 each of these specifically costs in Rwanda.

 TWO ITEMS STILL OUTSTANDING:
   1. The Zeffy form's own description is Zeffy's stock placeholder copy and
      says nothing about Kagina or what a gift buys. It is the last thing a
      donor reads before deciding. Worth replacing with the narrative here.
   2. The annual report PDF is not yet hosted; the download button points at
      the report section rather than a file.
 ═══════════════════════════════════════════════════════════════════════════
*/

/** Round tiers as supplied, not derived from a specific budget line — see the note above. */
const gifts = [
  { usd: "$10", what: "A year of student insurance", rwf: "13,500" },
  { usd: "$50", what: "A year of school supplies for one child", rwf: "67,500" },
  { usd: "$150", what: "A year of breakfast and lunch for one child", rwf: "202,500" },
  { usd: "$150", what: "A year of sponsorship for one student", rwf: "202,500" },
  { usd: "$300", what: "A year of sponsorship for one secondary student", rwf: "405,000" },
];

/*
 The "Buses" pillar (transport, RWF/USD) has been removed on request, and
 every pillar's cost badge — the RWF/USD or headcount line each used to
 carry — has been removed too. Three pillars now, not four; the grid below
 switches from a 2x2 to a single row of three to match.
*/
const pillars = [
  {
    tone: "crimson" as const,
    image: teachersPhoto,
    alt: "A Crimson Academy teacher at the blackboard with young pupils",
    title: "Our teachers",
    body: "Twenty-three qualified teachers, all holding the A2 qualification, plus three teaching assistants and four language specialists who work across every division. Salaries are the largest single cost in the school, and keeping good teachers in a rural district is the hardest thing we do.",
  },
  {
    tone: "gold" as const,
    image: mealsPhoto,
    alt: "Three Crimson Academy pupils eating plates of rice and beans",
    title: "The food programme",
    body: "Rice, beans, firewood and three cooks. It runs through the nursery day, and it is the most direct thing we do to keep a child in a classroom — a hungry five-year-old does not learn to read. Rice alone is 7.4M RWF of it.",
  },
  {
    tone: "ink" as const,
    image: graduatesPhoto,
    alt: "A Crimson Academy graduating class in caps and gowns",
    title: "Beyond Primary 6",
    body: "All 44 of our 2024–2025 graduates earned Division A and a place at a top secondary boarding school. We go on sponsoring our top performers through secondary — because getting a child to the end of Primary 6 and then letting go is not finishing the job.",
  },
];

const covers = [
  "Tuition for a full academic year, nursery through Primary 6",
  "Daily meals through the school food programme",
  "Books, exercise books and classroom materials",
  "A secondary boarding place for top Primary 6 graduates",
];

// ── local presentational pieces ────────────────────────────────────────────

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

const Poster = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <h2
    className={cn(
      "mt-2 font-heading text-[clamp(1.7rem,4vw,2.875rem)] font-black uppercase leading-[0.95] tracking-[-0.015em]",
      dark ? "text-primary-foreground" : "text-foreground",
    )}
  >
    {children}
  </h2>
);

const Shot = ({ src, alt }: { src: string; alt: string }) => (
  <div className="overflow-hidden rounded-2xl">
    <img src={src} alt={alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
  </div>
);

const Strip = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
  <div className="relative h-[clamp(13.75rem,32vw,25rem)] overflow-hidden">
    <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,hsl(var(--ink)/0.82),transparent)] px-6 pb-4 pt-12">
      <p className="container text-xs font-semibold uppercase tracking-[0.05em] text-primary-foreground">
        {caption}
      </p>
    </div>
  </div>
);

const DonateButton = ({
  children,
  variant = "solid",
  className,
}: {
  children: React.ReactNode;
  variant?: "solid" | "gold";
  className?: string;
}) => (
  <a
    href={ZEFFY_DONATE_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      buttonVariants({ size: "lg" }),
      "rounded-full",
      variant === "gold" && "bg-accent text-accent-foreground hover:bg-accent/90",
      className,
    )}
  >
    {children}
    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
  </a>
);

/** The crest glyph on a rule — the reference uses their arch the same way. */
const DecRule = () => (
  <div className="flex items-center gap-6">
    <span className="h-px flex-1 bg-border" />
    <svg viewBox="0 0 34 40" fill="none" aria-hidden="true" className="h-10 w-8 shrink-0">
      <path d="M17 38V22" stroke="hsl(var(--primary))" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M17 23c-7 0-12-5-12-11 0-4 2-7 5-9 1 4 4 6 7 6s6-2 7-6c3 2 5 5 5 9 0 6-5 11-12 11z"
        fill="hsl(var(--primary))"
      />
    </svg>
    <span className="h-px flex-1 bg-border" />
  </div>
);

// ── the page ───────────────────────────────────────────────────────────────

const CrimsonForLife = () => {
  const section = findSection("/crimson-for-life")!;

  return (
    <>
      <PosterHero
        section={section}
        title="Crimson for"
        titleAccent="Life"
        lede="A school year at Crimson costs about $65 a child. Here is what a gift buys, and what it changes."
        image={heroPhoto}
        imagePosition="50% 48%"
      />

      {/* ── the statement ─────────────────────────────────────────────── */}
      <section className="container pt-16 sm:pt-20">
        <h2 className="max-w-[32ch] font-heading text-[clamp(1.65rem,3.5vw,2.625rem)] font-bold leading-[1.12] text-primary">
          Generosity is not a department here. It is the reason there is a school at all.
        </h2>
        <div className="mt-7 grid gap-x-10 gap-y-5 text-base leading-relaxed text-muted-foreground md:grid-cols-2">
          <p>
            Crimson Academy began in 2011 with four classrooms and 181 children in a village where
            most families could not pay for school. Fourteen years later there are{" "}
            <strong className="text-foreground">780 students</strong>, thirty-two staff, a library, a
            computer lab, a pitch and a hard court — and a Primary 6 class that has finished first in
            the Southern Province in twelve of the last thirteen years.
          </p>
          <p>
            None of that was inherited. Every classroom was built, every teacher paid, every
            scholarship funded by somebody who decided a child in Kagina deserved the same shot as a
            child in Kigali. Below is what a gift actually buys, so you can see exactly what you are
            part of.
          </p>
        </div>
        <p className="mt-7 max-w-[34ch] font-heading text-[clamp(1.2rem,2.2vw,1.625rem)] font-semibold leading-tight text-ink">
          Everything this school becomes, it becomes because of you.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <DonateButton>Make a gift</DonateButton>
          <a
            href="#annual-report"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
          >
            Read the 2024–2025 report
          </a>
        </div>
      </section>

      {/* ── why give ──────────────────────────────────────────────────── */}
      <Band id="why" ground="tint">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow>Why Give</Eyebrow>
            <Poster>Who this school was built for</Poster>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Kagina sits in Kamonyi District, in Rwanda&apos;s Southern Province. Crimson Academy
                was founded to serve the children here who were least likely to be in a classroom —
                including the families known locally as the{" "}
                <strong className="text-foreground">Potters</strong>, who make their living from clay
                and who make up <strong className="text-foreground">13% of our enrolment</strong>, 104
                children in the 2024–2025 year.
              </p>
              <p>
                For a lot of these households, school fees are the difference between a child at a desk
                and a child at the clay pit. Sponsorship closes that gap. It is not an abstraction —
                this photograph was taken in Kagina in 2009, before there was a school here at all.
              </p>
            </div>
          </div>
          <Shot src={then2009} alt="Children gathered in a field in Kagina in 2009, before the school was built" />
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="lg:order-2">
            <h3 className="font-heading text-[1.35rem] font-bold">The gap a gift actually closes</h3>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                School fees very nearly cover what it costs to run the school day to day — in
                2024–2025 fees brought in 71.2M RWF against a 68.8M RWF budget. What fees do{" "}
                <em>not</em> cover is the part that makes Crimson different: the children whose
                families cannot pay at all, the{" "}
                <strong className="text-foreground">22 secondary scholarships</strong> we currently
                fund, and every building on the campus.
              </p>
              <p>
                That is what giving is for here. Not the gap in the operating budget — the gap between
                a school that breaks even and a school that reaches the children who need it most.
              </p>
            </div>
          </div>
          <div className="lg:order-1">
            <Shot src={shoesPhoto} alt="A pair of worn-through shoes beside a child's bare foot" />
          </div>
        </div>
      </Band>

      <Strip
        src={buildStrip}
        alt="Newly finished classroom blocks on the Crimson Academy campus"
        caption="Every classroom on this campus was funded by a gift · Kagina, Southern Province"
      />

      {/* ── what a gift buys ──────────────────────────────────────────── */}
      <Band id="buys" ground="tint">
        <Eyebrow>What a Gift Buys</Eyebrow>
        <Poster>Gifts of any size, and what each one covers</Poster>
        <p className="mt-4 max-w-[62ch] leading-relaxed text-muted-foreground">
          A few ways to give, and what each one puts toward a child&apos;s year at Crimson.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-secondary/80">
                <th className="px-5 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-[0.09em] text-muted-foreground">
                  Gift
                </th>
                <th className="px-5 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-[0.09em] text-muted-foreground">
                  What it covers
                </th>
                <th className="hidden px-5 py-3.5 text-right text-[0.65rem] font-bold uppercase tracking-[0.09em] text-muted-foreground sm:table-cell">
                  RWF equivalent
                </th>
              </tr>
            </thead>
            <tbody>
              {gifts.map((g) => (
                <tr key={g.what} className="bg-card odd:bg-secondary/55">
                  <td className="w-[26%] whitespace-nowrap px-5 py-4 font-heading text-[clamp(1.05rem,2vw,1.4rem)] font-black text-primary">
                    {g.usd}
                  </td>
                  <td className="px-5 py-4">{g.what}</td>
                  <td className="hidden whitespace-nowrap px-5 py-4 text-right text-[0.8rem] tabular-nums text-muted-foreground sm:table-cell">
                    {g.rwf}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 max-w-[70ch] text-[0.8rem] leading-relaxed text-muted-foreground">
          RWF figures are converted at 1,350 to the dollar. Gifts of any size are welcome and none of
          these are minimums.
        </p>
        <div className="mt-6">
          <DonateButton>Give any amount</DonateButton>
        </div>
      </Band>

      {/* ── what your support makes possible ──────────────────────────── */}
      <Band id="possible">
        <DecRule />
        <div className="mt-7">
          <Eyebrow>What Your Support Makes Possible</Eyebrow>
          <Poster>Three things a gift keeps running</Poster>
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.title} className="flex flex-col overflow-hidden rounded-2xl">
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.alt}
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                className={cn(
                  "relative flex-1 px-7 pb-7 pt-6",
                  p.tone === "crimson" && "bg-primary text-primary-foreground",
                  p.tone === "gold" && "bg-accent text-accent-foreground",
                  p.tone === "ink" && "bg-ink text-primary-foreground",
                )}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:radial-gradient(currentColor_0.6px,transparent_0.6px)] [background-size:14px_14px]"
                />
                <div className="relative">
                  <h3 className="font-heading text-[clamp(1.2rem,2.1vw,1.55rem)] font-black uppercase leading-none tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-[0.92rem] leading-relaxed",
                      p.tone === "crimson" && "text-primary-foreground/88",
                      p.tone === "gold" && "text-accent-foreground/85",
                      p.tone === "ink" && "text-primary-foreground/85",
                    )}
                  >
                    {p.body}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Band>

      {/* ── beyond the gate ───────────────────────────────────────────── */}
      <Band ground="ink">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow dark>Beyond the school gate</Eyebrow>
            <Poster dark>We do not only teach the children</Poster>
            <div className="mt-4 space-y-4 leading-relaxed text-primary-foreground/88">
              <p>
                A school cannot educate its way around a household that has nothing. Alongside the
                classrooms, Crimson runs{" "}
                <strong className="text-primary-foreground">
                  micro-loan and livestock programmes
                </strong>{" "}
                for families in Kagina — a goat, a small loan, a way to earn — and our Primary 6 class
                carries rice and beans into the village every month.
              </p>
              <p>
                Many of those families are Potters, working clay by hand the way their parents did.
                The point of the loans and the livestock is that the next generation gets a choice
                about it.
              </p>
              <p>
                The school is also the largest employer in the villages around it — thirty-two staff,
                from teachers to cooks to bus drivers, all local. A gift to Crimson Academy does not
                land in Kagina. It circulates there.
              </p>
            </div>
          </div>
          <Shot src={livestockPhoto} alt="Goats from the school livestock programme with children looking on" />
        </div>
      </Band>

      {/* ── ways to give ──────────────────────────────────────────────── */}
      <Band id="give" ground="tint">
        <Eyebrow>Ways to Give</Eyebrow>
        <Poster>Three ways in</Poster>
        <p className="mt-4 max-w-[62ch] leading-relaxed text-muted-foreground">
          All giving is handled by <strong className="text-foreground">Crimson Foundation Inc</strong>,
          the school&apos;s founding partner since 2011. Card and bank payments run through Zeffy,
          which passes on 100% of your gift — there is no platform fee taken out of it.
        </p>

        {/* [min-w-0] on the grid: a grid item's default min-width is auto,
            i.e. its min-content width, so the "Donate to change lives"
            button (240px of unbreakable label + padding) held these cards
            at 300px inside a 272px column at 320px viewport and pushed the
            whole page into a horizontal scroll. Pre-existing; found by the
            responsive sweep for this change. */}
        <div className="mt-8 grid gap-5 [&>*]:min-w-0 lg:grid-cols-3">
          <div className="flex flex-col rounded-2xl border bg-card p-6">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-eyebrow">
              One-off or monthly
            </span>
            <h3 className="mt-1 font-heading text-lg font-semibold">Give online</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              The fastest way in. Any amount, one time or every month, by card or bank transfer
              through our Zeffy form.
            </p>
            <div className="mt-auto pt-5">
              <DonateButton>Donate to change lives</DonateButton>
            </div>
          </div>

          <div id="sponsor" className="flex scroll-mt-32 flex-col rounded-2xl border bg-card p-6">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-eyebrow">
              Ongoing sponsorship
            </span>
            <h3 className="mt-1 font-heading text-lg font-semibold">Sponsor a student</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Sponsorship covers a child through the academic year, and for our top graduates it
              continues into secondary school. It covers:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              {covers.map((c) => (
                <li key={c} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-5">
              <a
                href="mailto:info@crimsonacademy.org?subject=Sponsoring%20a%20student"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
              >
                Email us about sponsorship
              </a>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border bg-card p-6">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.06em] text-eyebrow">
              Buildings &amp; equipment
            </span>
            <h3 className="mt-1 font-heading text-lg font-semibold">Capital projects</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Classrooms, the library, the computer lab, teacher housing, the hard court — all of it
              was built by partner-funded projects. There is a list of what is next.
            </p>
            <div className="mt-auto pt-5">
              <a
                href="mailto:info@crimsonacademy.org?subject=Capital%20projects"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
              >
                Ask what&apos;s next
              </a>
            </div>
          </div>
        </div>

        {/* Carried over from the Support page this replaces. */}
        <div id="partners" className="mt-12 scroll-mt-32">
          <h3 className="font-heading text-[1.35rem] font-bold">Who we build this with</h3>
          <div className="mt-4 max-w-[70ch] rounded-2xl border bg-card p-6">
            <h4 className="font-heading text-lg font-semibold text-primary">Crimson Foundation</h4>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              Our founding partner. The Foundation supports the school&apos;s operations, sponsorship
              programme and capital projects, and has been part of Crimson Academy since its
              establishment in 2011. All giving on this page is administered by Crimson Foundation
              Inc.
            </p>
          </div>
        </div>
      </Band>

      {/* ── annual report ─────────────────────────────────────────────── */}
      <Band id="annual-report">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow>Annual Report</Eyebrow>
            <Poster>Read it before you give</Poster>
            <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Every year the school publishes an Annual School Report: mission and values, the
                educational model, enrolment, staff qualifications, class-by-class performance,
                National Examination results, the extracurricular programme, and the full budget.
              </p>
              <p>
                It is a candid document. It reports the benchmarks we <em>missed</em> as plainly as
                the ones we cleared — the 66.5% school average against a 70% target, the 23%
                repetition rate, the 78% transition rate. If you are deciding whether to trust us
                with money, that is the document to read, not this page.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-7">
            <h3 className="font-heading text-lg font-semibold">Annual School Report 2024–2025</h3>
            <ul className="mt-4">
              {[
                "780 students across nursery and Primary 1–6",
                "34 staff, 23 qualified teachers, all A2",
                "P6 National Exam average 90.4% — all 44 Division A",
                "#1 in the Southern Province, 12 of the last 13 years",
                "Full budget: 68,816,810 RWF against 71,164,200 RWF of fees",
                "Benchmarks met, and the three that were not",
              ].map((t) => (
                <li
                  key={t}
                  className="flex gap-2.5 border-b border-dashed py-2 text-sm text-muted-foreground last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {t}
                </li>
              ))}
            </ul>
            {/*
              The PDF is not hosted yet, so this points at the school's contact
              details rather than a dead file. Swap for the asset when it exists.
            */}
            <Link
              to="/about#contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-5 rounded-full")}
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Request the report
            </Link>
          </div>
        </div>
      </Band>

      <Strip
        src={celebrateStrip}
        alt="A celebration in front of the assembled school"
        caption="Reaching beyond impossibility · since 2011"
      />

      {/* ── closing CTA ───────────────────────────────────────────────── */}
      <section className="bg-accent py-16">
        <div className="container flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="max-w-[26ch] font-heading text-[clamp(1.55rem,3.2vw,2.3rem)] font-bold text-accent-foreground">
              $65 puts a child through a year of school.
            </h2>
            <p className="mt-2.5 max-w-[48ch] text-accent-foreground/85">
              Any amount, one time or monthly, and Zeffy passes on all of it.
            </p>
          </div>
          <a
            href={ZEFFY_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full")}
          >
            Give now
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
};

export default CrimsonForLife;
