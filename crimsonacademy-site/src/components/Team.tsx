import { Link } from "react-router-dom";
import { SectionHead } from "./SectionHead";
import headMistress from "@/assets/staff-marie-claire.webp";

/*
  "32 staff" is the corrected figure, NOT the 34 this component showed
  before. The staff directory was rebuilt person-first earlier in this
  project and the real count came out at 32; the Admissions FAQ was updated
  to match at the time and this component was missed. Do not restore 34.

  The teacher count stays "22 teachers & assistants" because that is what
  the directory supports: 22 people hold a Teaching-group role. An older
  figure of 23 "qualified teachers" from the annual report could not be
  reconciled against it (whether it counts teaching assistants is unclear),
  so the unverifiable number is not used.
*/
const facts = [
  { n: "32", label: "Staff" },
  { n: "22", label: "Teachers & assistants" },
  { n: "2011", label: "Founded" },
  { n: "780", label: "Students, nursery–P6" },
];

/**
 * Our People — centred, with the head mistress as a circular portrait above
 * the school's numbers.
 *
 * The portrait is a circle on purpose: these staff photographs are circular
 * vignettes on white backgrounds, so cropping one to fill a rectangle puts
 * white corners against whatever is behind it. Same reason the leadership
 * grid in StaffDirectory.tsx uses circular avatars.
 */
export const Team = () => {
  return (
    <section className="border-b bg-secondary/40 py-16 sm:py-20">
      <div className="container">
        <SectionHead
          eyebrow="Our People"
          title="A team devoted to"
          pop="every child."
          align="center"
          size="display"
          swash
        />

        <div className="mt-11 text-center">
          <img
            src={headMistress}
            alt="Portrait of Marie Claire Mukabirinda, Head Mistress"
            className="mx-auto h-28 w-28 rounded-full object-cover"
            loading="lazy"
            width={976}
            height={976}
          />
          <div className="mt-4 text-xs font-bold uppercase tracking-widest text-eyebrow">
            Head Mistress
          </div>
          <h3 className="mt-1.5 font-heading text-xl font-semibold text-primary">
            Marie Claire Mukabirinda
          </h3>
          <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-relaxed text-muted-foreground">
            Leading Crimson Academy&apos;s mission of faith, character, and academic excellence in
            the Kamonyi District.{" "}
            <Link
              to="/about#leadership"
              className="font-medium text-primary underline underline-offset-4"
            >
              Meet the whole team
            </Link>
            .
          </p>
        </div>

        <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-7 border-t pt-8 text-center sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-heading text-2xl font-bold leading-none text-primary">
                  {f.n}
                </span>
                <span className="mt-2 block text-xs text-muted-foreground">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
