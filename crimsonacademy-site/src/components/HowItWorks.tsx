import { Link } from "react-router-dom";
import { ChevronsRight } from "lucide-react";
import { SectionHead } from "./SectionHead";
import divisionsPhoto from "@/assets/class.jpeg";

/**
 * What learning looks like here — one large photograph beside a list of the
 * three school divisions, then the five pillars as a supporting strip.
 *
 * The photo-left / list-right shape is how berkeleycarroll.org presents
 * Lower / Middle / Upper School, and it does something three equal cards
 * can't: the divisions read as one continuous pathway a child moves along,
 * rather than three parallel options to choose between.
 *
 * A side effect worth noting — this removes the two PhotoSlot placeholders
 * the card version carried (a P1–P3 class, and a P6 class or the computer
 * lab). Those shots are still wanted and still listed in PHOTOS-NEEDED.md;
 * this layout simply no longer has a hole shaped like them, since one
 * photograph now covers the whole section.
 */
const divisions = [
  {
    title: "Nursery",
    promise: "Be joyful and curious",
    ages: "Early years",
    href: "/academics#nursery",
    desc: "A joyful foundation where our youngest learners build language, curiosity, and character — celebrated each year with a school-wide graduation.",
  },
  {
    title: "Lower Primary",
    promise: "Be grounded and fluent",
    ages: "P1 – P3",
    href: "/academics#lower-primary",
    desc: "Core literacy and numeracy taught across three languages, with creative arts and sports woven through every week.",
  },
  {
    title: "Upper Primary",
    promise: "Be ready and proven",
    ages: "P4 – P6",
    href: "/academics#upper-primary",
    desc: "Rigorous preparation for the National Exam — our P6 class averaged 90.4% and every graduate earned a place in a top boarding secondary school.",
  },
];

const pillars = [
  { n: "01", title: "S.M.A.R.T. Growth", desc: "Service and continuous improvement at every developmental stage." },
  { n: "02", title: "Support Services", desc: "Medical and socio-emotional care for students and families." },
  { n: "03", title: "Three Languages", desc: "English, French, and Kinyarwanda from a child's first year." },
  { n: "04", title: "Measurable Benchmarks", desc: "Continuous assessment aligned to national standards." },
  { n: "05", title: "Technology Innovation", desc: "A computer lab and hands-on learning, including programming." },
];

export const HowItWorks = () => {
  return (
    <section className="border-b py-16 sm:py-20">
      <div className="container">
        <SectionHead
          eyebrow="Academics"
          title="What learning"
          pop="looks like here."
          align="center"
          size="display"
          swash
          lede="Aligned to Rwanda's National Competence-Based Curriculum (MINEDUC), from the first day of nursery to the National Exam."
        />

        <div className="mt-11 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <img
            src={divisionsPhoto}
            alt="Crimson Academy students gathered in front of the school crest painted on the classroom block"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
            loading="lazy"
          />

          <ul className="divide-y">
            {divisions.map((d) => (
              <li key={d.title} className="py-6 first:pt-0 last:pb-0">
                <h3 className="flex items-center gap-2.5 font-heading text-xl font-bold text-primary sm:text-2xl">
                  <ChevronsRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <Link to={d.href} className="transition-colors hover:text-foreground">
                    {d.title}
                  </Link>
                </h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="font-semibold text-primary">{d.promise}</span>
                  <span aria-hidden="true" className="h-3 w-px bg-border" />
                  <span className="font-semibold uppercase tracking-wide text-muted-foreground">
                    {d.ages}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <li key={p.title} className="text-center">
              <div className="font-heading text-xs font-bold tracking-[0.06em] text-accent">
                {p.n}
              </div>
              <h3 className="mt-1.5 font-heading text-sm font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
