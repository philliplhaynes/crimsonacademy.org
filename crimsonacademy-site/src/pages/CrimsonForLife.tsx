import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { PosterHero, Band } from "@/components/PosterHero";
import { findSection } from "@/nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import heroPhoto from "@/assets/cfl-hero-students.webp";
import then2009 from "@/assets/cfl-then-2009.webp";
import shoesPhoto from "@/assets/cfl-shoes.webp";
import teachersPhoto from "@/assets/cfl-teachers.webp";
import mealsPhoto from "@/assets/cfl-meals.webp";
import schoolPhoto from "@/assets/cfl-whole-school.webp";
import graduatesPhoto from "@/assets/cfl-graduates.webp";
import livestockPhoto from "@/assets/cfl-livestock.webp";
import pottersPhoto from "@/assets/cfl-potters.webp";
import buildStrip from "@/assets/cfl-strip-build.webp";
import celebrateStrip from "@/assets/cfl-strip-celebrate.webp";

/** The Zeffy campaign, run by Crimson Foundation Inc. */
const DONATE_URL = "https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-17087";

/*
 ═══════════════════════════════════════════════════════════════════════════
 EVERY NUMBER ON THIS PAGE COMES FROM THE ANNUAL SCHOOL REPORT 2024–2025.

 Converted at 1,350 RWF to the dollar, which is the rate the report itself
 uses — 68,816,810 ÷ 1,350 = 50,975.41, matching its own USD total.

 One inconsistency worth fixing in the report, not here: its salary line
 reads $19,292.91 against 25,080,786 RWF, which implies about 1,300. This
 page uses 1,350 throughout for internal consistency and says so in print.

 TWO ITEMS STILL OUTSTANDING:
   1. The Zeffy form's own description is Zeffy's stock placeholder copy and
      says nothing about Kagina or what a gift buys. It is the last thing a
      donor reads before deciding. Worth replacing with the narrative here.
   2. The annual report PDF is not yet hosted; the download button points at
      the report section rather than a file.
 ═══════════════════════════════════════════════════════════════════════════
*/

interface BudgetLine {
  name: string;
  detail?: string;
  rwf: number;
  usd: number;
  accent?: boolean;
}

const budget: BudgetLine[] = [
  { name: "Staff salaries", rwf: 25_080_786, usd: 18_578 },
  { name: "Transport", detail: "fuel, maintenance, insurance", rwf: 15_398_894, usd: 11_410 },
  { name: "Operational", detail: "water, power, repairs, materials", rwf: 13_008_000, usd: 9_636 },
  { name: "Food programme", rwf: 10_407_180, usd: 7_709, accent: true },
  { name: "Staff taxes & bonuses", rwf: 4_921_950, usd: 3_646 },
];

const BUDGET_TOTAL_RWF = 68_816_810;
const BUDGET_TOTAL_USD = 50_975;

/**
 * Gift ladder. Berkeley Carroll names their levels after circles — Lion's
 * Circle, Sterling Circle. That reads as fantasy on a page about a village
 * school in Kamonyi, so these name things instead, and every one is a real
 * budget line so a donor can check the arithmetic.
 */
const gifts = [
  { usd: "$17", what: "A term of school meals for one child", rwf: "23,127" },
  { usd: "$51", what: "A full year of school meals for one child", rwf: "69,381" },
  { usd: "$65", what: "One child's entire share of a school year", rwf: "88,226" },
  { usd: "$333", what: "A year's insurance for one of the school buses", rwf: "450,000" },
  { usd: "$519", what: "A month of diesel for the school coaster", rwf: "700,000" },
  { usd: "$889", what: "The year's beans for all 780 children", rwf: "1,200,000" },
  { usd: "$5,478", what: "The year's rice — the single largest food line in the school", rwf: "7,395,180" },
  { usd: "$7,709", what: "The entire food programme for a year", rwf: "10,407,180" },
  { usd: "$11,410", what: "The entire transport operation for a year", rwf: "15,398,894" },
];

const pillars = [
  {
    tone: "crimson" as const,
    image: teachersPhoto,
    alt: "A Crimson Academy teacher at the blackboard with young pupils",
    title: "Our teachers",
    body: "Twenty-three qualified teachers, all holding the A2 qualification, plus three teaching assistants and four language specialists who work across every division. Salaries are the largest single cost in the school, and keeping good teachers in a rural district is the hardest thing we do.",
    cost: "25,080,786 RWF · $18,578 a year",
  },
  {
    tone: "gold" as const,
    image: mealsPhoto,
    alt: "Three Crimson Academy pupils eating plates of rice and beans",
    title: "The food programme",
    body: "Rice, beans, firewood and three cooks. It runs through the nursery day, and it is the most direct thing we do to keep a child in a classroom — a hungry five-year-old does not learn to read. Rice alone is 7.4M RWF of it.",
    cost: "10,407,180 RWF · $7,709 a year",
  },
  {
    tone: "ink" as const,
    image: schoolPhoto,
    alt: "The whole of Crimson Academy gathered outdoors with hands raised",
    title: "The buses",
    body: "Five routes — Ruyenzi, Gihara, Bishenyi, Kamuhanda and Kamiranzovu — bring in the children who live too far from Kagina to walk. It is the second largest cost in the school, and it is also what makes staying behind for choir or coaching possible at all.",
    cost: "15,398,894 RWF · $11,410 a year",
  },
  {
    tone: "cream" as const,
    image: graduatesPhoto,
    alt: "A Crimson Academy graduating class in caps and gowns",
    title: "Beyond Primary 6",
    body: "All 44 of our 2024–2025 graduates earned Division A and a place at a top secondary boarding school. We currently sponsor 22 of them through secondary — because getting a child to the end of Primary 6 and then letting go is not finishing the job.",
    cost: "22 students sponsored today",
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
    href={DONATE_URL}
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
  const maxRwf = budget[0].rwf;

  return (
    <>
      <PosterHero
        section={section}
        title="Crimson for Life"
        lede="A school year at Crimson costs about $65 a child. This page shows you exactly where that goes — and what your gift changes."
        image={heroPhoto}
        imagePosition="50% 32%"
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
            <strong className="text-foreground">780 students</strong>, thirty-four staff, a library, a
            computer lab, a pitch and a hard court — and a Primary 6 class that has finished first in
            the Southern Province in twelve of the last thirteen years.
          </p>
          <p>
            None of that was inherited. Every classroom was built, every bus bought, every scholarship
            funded by somebody who decided a child in Kagina deserved the same shot as a child in
            Kigali. We publish our whole budget below, down to the line for rice, because if we are
            going to ask you for money we should be able to show you where the last lot went.
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

      {/* ── where it goes ─────────────────────────────────────────────── */}
      <Band id="where">
        <Eyebrow>Where It Goes</Eyebrow>
        <Poster>The whole budget, on one page</Poster>
        <p className="mt-4 max-w-[62ch] leading-relaxed text-muted-foreground">
          This is the complete 2024–2025 school budget as published in our Annual School Report. Not a
          summary, not a pie chart with an &ldquo;other&rdquo; slice — the five lines the money
          actually goes to. The surprise for most people is that{" "}
          <strong className="text-foreground">transport is the second largest cost in the school</strong>
          , ahead of food and every operational line combined.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border bg-card">
          <table className="w-full border-collapse text-[0.95rem]">
            <thead>
              <tr className="bg-secondary/70">
                <th className="px-5 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-[0.09em] text-muted-foreground">
                  Budget line
                </th>
                <th className="hidden w-[30%] px-5 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-[0.09em] text-muted-foreground sm:table-cell">
                  Share
                </th>
                <th className="px-5 py-3.5 text-right text-[0.65rem] font-bold uppercase tracking-[0.09em] text-muted-foreground">
                  RWF
                </th>
                <th className="px-5 py-3.5 text-right text-[0.65rem] font-bold uppercase tracking-[0.09em] text-muted-foreground">
                  USD
                </th>
              </tr>
            </thead>
            <tbody>
              {budget.map((b) => (
                <tr key={b.name} className="border-t even:bg-secondary/35">
                  <td className="px-5 py-3 font-semibold">
                    {b.name}
                    {b.detail && (
                      <span className="font-normal text-muted-foreground"> — {b.detail}</span>
                    )}
                  </td>
                  <td className="hidden px-5 py-3 sm:table-cell">
                    <div
                      className={cn(
                        "h-2.5 min-w-[4px] rounded-full",
                        b.accent ? "bg-accent" : "bg-primary",
                      )}
                      style={{ width: `${(b.rwf / maxRwf) * 100}%` }}
                    />
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right tabular-nums">
                    {b.rwf.toLocaleString("en-US")}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right font-heading font-bold tabular-nums">
                    ${b.usd.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t bg-secondary/70 font-bold">
                <td className="px-5 py-3.5">Total for the year</td>
                <td className="hidden sm:table-cell" />
                <td className="whitespace-nowrap px-5 py-3.5 text-right tabular-nums">
                  {BUDGET_TOTAL_RWF.toLocaleString("en-US")}
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-right font-heading tabular-nums">
                  ${BUDGET_TOTAL_USD.toLocaleString("en-US")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-3 max-w-[70ch] text-[0.8rem] leading-relaxed text-muted-foreground">
          Converted at 1,350 RWF to the dollar, the rate used in the report itself. Income for the
          same year was 71,164,200 RWF ($52,714) from school fees, leaving a net of 2,347,390 RWF
          ($1,739). Capital projects, sponsorships and secondary scholarships sit outside this
          operating budget.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-7 rounded-r-2xl border-l-4 border-accent bg-accent/12 px-7 py-6">
          <div className="font-heading text-[clamp(2.375rem,5vw,3.75rem)] font-black leading-none text-primary">
            $65
          </div>
          <p className="max-w-[46ch] text-[0.95rem] text-eyebrow">
            <strong>One child, one year.</strong> The entire budget divided by all 780 students —
            88,226&nbsp;RWF each. Salaries, buses, meals, electricity, chalk, everything.
          </p>
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
          Every figure below is a real line from the 2024–2025 budget, converted at the report&apos;s
          own exchange rate — so you can check our arithmetic.
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
                <tr key={g.usd} className="bg-card odd:bg-secondary/55">
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
          Per-child meal figures are the food programme divided by the 150 nursery children it serves;
          the per-child year is the whole budget divided by all 780 students. Gifts of any size are
          welcome and none of these are minimums.
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
          <Poster>Four things a gift keeps running</Poster>
        </div>

        <div className="mt-9 grid gap-6 sm:grid-cols-2">
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
                  p.tone === "cream" && "bg-secondary text-foreground",
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
                      p.tone === "cream" && "text-muted-foreground",
                    )}
                  >
                    {p.body}
                  </p>
                  <span
                    className={cn(
                      "mt-4 inline-block rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.04em]",
                      p.tone === "crimson" && "bg-primary-foreground/16 text-accent",
                      p.tone === "gold" && "bg-accent-foreground/14 text-accent-foreground",
                      p.tone === "ink" && "bg-primary-foreground/14 text-accent",
                      p.tone === "cream" && "bg-primary/12 text-primary",
                    )}
                  >
                    {p.cost}
                  </span>
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
                The school is also the largest employer in the villages around it — thirty-four staff,
                from teachers to cooks to bus drivers, all local. A gift to Crimson Academy does not
                land in Kagina. It circulates there.
              </p>
            </div>
          </div>
          <div className="grid gap-5">
            <Shot src={livestockPhoto} alt="Goats from the school livestock programme with children looking on" />
            <Shot src={pottersPhoto} alt="Hands shaping wet clay, the traditional trade of the Potters community" />
          </div>
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

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
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
              $65 a year covers a child
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
            href={DONATE_URL}
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
