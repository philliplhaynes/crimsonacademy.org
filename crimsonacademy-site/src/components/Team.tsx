import { Link } from "react-router-dom";
import { SectionHead } from "./SectionHead";
import headMistress from "@/assets/staff-marie-claire.webp";

/*
  "32 staff" is the corrected figure, NOT the 34 this component used to
  show. The staff directory was rebuilt person-first earlier in this project
  and the real count came out at 32; the Admissions FAQ was updated to match
  at the time, and this component was missed. Do not restore 34.

  The teacher count is left as "22 teachers & assistants" because that is
  what the directory actually supports: 22 people hold a Teaching-group
  role. An older figure of 23 "qualified teachers" from the annual report
  could not be reconciled against the directory (whether it counts teaching
  assistants is unclear), so the unverifiable number is not used here.
*/
const facts = [
  { n: "32", label: "Staff" },
  { n: "22", label: "Teachers & assistants" },
  { n: "2011", label: "Founded" },
  { n: "780", label: "Students, nursery–P6" },
];

/**
 * Our People — one featured crimson panel carrying the head mistress and
 * the school's numbers together, matching the featured-principal treatment
 * on /admissions, rather than a cream card sitting beside four separate
 * white fact tiles.
 */
export const Team = () => {
  return (
    <section className="border-b py-14 sm:py-16">
      <div className="container">
        <SectionHead eyebrow="Our People" title="A team devoted to every child." />

        {/*
          The portrait is a circle, not a full-bleed panel image. These staff
          photographs are circular vignettes sitting on white backgrounds, so
          cropping one to fill a rectangle puts white corners against the
          crimson and it reads as a white box with a photo in it. Same reason
          the leadership grid in StaffDirectory.tsx uses circular avatars —
          verified visually here after the rectangular version shipped that
          exact artefact.
        */}
        <div className="mt-7 flex flex-col items-center gap-6 rounded-xl bg-primary p-6 text-center text-primary-foreground sm:flex-row sm:items-start sm:gap-7 sm:p-7 sm:text-left">
          <img
            src={headMistress}
            alt="Portrait of Marie Claire Mukabirinda, Head Mistress"
            className="h-28 w-28 shrink-0 rounded-full object-cover"
            loading="lazy"
            width={976}
            height={976}
          />
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold uppercase tracking-widest text-accent">
              Head Mistress
            </div>
            <h3 className="mt-1.5 font-heading text-xl font-semibold leading-tight sm:text-2xl">
              Marie Claire Mukabirinda
            </h3>
            <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-primary-foreground/85">
              Leading Crimson Academy&apos;s mission of faith, character, and academic excellence in
              the Kamonyi District.{" "}
              <Link
                to="/about#leadership"
                className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-primary-foreground"
              >
                Meet the whole team
              </Link>
              .
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-5 border-t border-primary-foreground/20 pt-5 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-heading text-xl font-bold leading-none text-accent">
                      {f.n}
                    </span>
                    <span className="mt-1.5 block text-xs text-primary-foreground/75">
                      {f.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
