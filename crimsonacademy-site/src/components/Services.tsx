import { SectionHead } from "./SectionHead";
import footballPhoto from "@/assets/sl-football.webp";
import karatePhoto from "@/assets/sl-karate.webp";
import outreachPhoto from "@/assets/students-outreach.webp";
import graduationPhoto from "@/assets/graduation-p6.jpg";

/**
 * Student Life — a photo collage instead of four icon-and-text cards.
 *
 * The four cards this replaces said "arts, athletics, service, scholarships"
 * in words on a page that already had two other card grids, while the school
 * has actual photographs of all four. The captions carry the same facts the
 * card copy did; the full detail lives on /student-life, which is where the
 * section links.
 */
const frames = [
  {
    photo: footballPhoto,
    alt: "Crimson Academy students playing football on the school pitch",
    caption: "Arts & Athletics",
  },
  {
    photo: karatePhoto,
    alt: "A Crimson Academy student practising karate",
    caption: "Confidence beyond the classroom",
  },
  {
    photo: outreachPhoto,
    alt: "Crimson Academy students visiting a family in the village",
    caption: "Monthly community service",
  },
  {
    photo: graduationPhoto,
    alt: "Primary 6 graduates in caps and gowns at their graduation ceremony",
    caption: "22 sponsored to secondary school",
  },
];

export const Services = () => {
  return (
    <section className="border-b py-14 sm:py-16">
      <div className="container">
        <SectionHead
          eyebrow="Student Life"
          title="More than a school — a community."
          lede="At Crimson Academy, character is formed in worship, in service, on the field, and on the stage. Our students learn what it means to lead with humility and to give back to the village that surrounds them."
        />

        <blockquote className="mt-6 max-w-[65ch] rounded-lg border-l-4 border-accent bg-secondary/50 p-4 text-sm italic text-muted-foreground">
          &ldquo;For even the Son of Man did not come to be served, but to serve.&rdquo;
          <span className="mt-1 block text-xs font-semibold uppercase not-italic tracking-wide text-eyebrow">
            Mark 10:45
          </span>
        </blockquote>

        <ul className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {frames.map((f) => (
            <li key={f.caption} className="relative isolate overflow-hidden rounded-xl">
              <img
                src={f.photo}
                alt={f.alt}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
              {/* Warm near-black rather than raw black, the same gradient the
                  history chapter cards and staff portraits use, so overlaid
                  captions stay readable on any of these photographs. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/15 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 p-3 text-xs font-semibold leading-snug text-primary-foreground">
                {f.caption}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
