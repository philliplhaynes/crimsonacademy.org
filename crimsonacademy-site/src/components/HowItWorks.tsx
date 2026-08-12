import { Link } from "react-router-dom";
import { SectionHead } from "./SectionHead";
import { PhotoSlot } from "./PhotoSlot";
import nurseryPhoto from "@/assets/nursery-graduation.jpg";

/**
 * How We Teach — the three school divisions and the five pillars, in one
 * section.
 *
 * These were two consecutive sections ("A pathway for every age" and "Five
 * pillars of learner success") that both answered the same visitor
 * question, one immediately after the other, each with its own centred
 * header and its own card grid. Merging them is the single biggest length
 * saving in mockup B. The pillars drop to a compact five-across strip since
 * they are supporting detail under the divisions, not a peer claim.
 *
 * Cards use the plain bordered card the rest of the site uses. The previous
 * version used shadcn <Card> with a rounded icon tile floating over the
 * photograph — a construction that appears on no other page.
 */
const divisions = [
  {
    title: "Nursery",
    ages: "Early Years",
    href: "/academics#nursery",
    photo: nurseryPhoto,
    photoAlt: "Nursery students in caps and gowns at their graduation ceremony",
    desc: "A joyful foundation where our youngest learners build language, curiosity, and character — celebrated each year with a school-wide graduation.",
  },
  {
    title: "Lower Primary",
    ages: "P1 – P3",
    href: "/academics#lower-primary",
    photoBrief: "A P1–P3 class at work",
    desc: "Core literacy and numeracy taught across three languages, with creative arts and sports woven through every week.",
  },
  {
    title: "Upper Primary",
    ages: "P4 – P6",
    href: "/academics#upper-primary",
    photoBrief: "P6 students studying, or the computer lab",
    desc: "Rigorous preparation for the National Exam — our P6 class averaged 90.4% and every graduate earned a place in a top boarding secondary school.",
  },
];

const pillars = [
  {
    title: "S.M.A.R.T. Growth",
    desc: "Service and continuous improvement at every developmental stage — artistic, academic, and personal.",
  },
  {
    title: "Support Services",
    desc: "Medical and socio-emotional care for students and families, because children learn best when whole.",
  },
  {
    title: "Three Languages",
    desc: "Daily instruction in English, French, and Kinyarwanda from a child's first year.",
  },
  {
    title: "Measurable Benchmarks",
    desc: "Continuous, data-driven assessment aligned to national standards keeps every learner on track.",
  },
  {
    title: "Technology Innovation",
    desc: "A computer lab and hands-on learning, including programming, for a knowledge-based economy.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="border-b bg-secondary/40 py-14 sm:py-16">
      <div className="container">
        <SectionHead
          eyebrow="How We Teach"
          title="A pathway for every age, built on five pillars."
          lede="Aligned to Rwanda's National Competence-Based Curriculum (MINEDUC), from the first day of nursery to the National Exam."
        />

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {divisions.map((d) => (
            <li key={d.title} className="overflow-hidden rounded-xl border bg-background">
              {d.photo ? (
                <img
                  src={d.photo}
                  alt={d.photoAlt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              ) : (
                // ratio="landscape" is already exactly aspect-[4/3], matching
                // the real photo beside it — rather than "fill" (h-full),
                // which needs a parent with a fixed height to resolve.
                <PhotoSlot
                  ratio="landscape"
                  brief={d.photoBrief!}
                  compact
                  className="rounded-none border-0 border-b border-dashed"
                />
              )}
              <div className="p-4">
                <div className="text-[0.65rem] font-bold uppercase tracking-wide text-eyebrow">
                  {d.ages}
                </div>
                <h3 className="mt-1 font-heading text-base font-semibold">
                  <Link to={d.href} className="transition-colors hover:text-primary">
                    {d.title}
                  </Link>
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <li key={p.title} className="border-t-[3px] border-primary pt-3.5">
              <h3 className="font-heading text-sm font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
