import { SectionHead } from "./SectionHead";
import footballPhoto from "@/assets/sl-football.webp";
import karatePhoto from "@/assets/sl-karate.webp";
import outreachPhoto from "@/assets/family-outreach-visit.jpg";
import graduationPhoto from "@/assets/graduation-p6.jpg";

/**
 * Student Life — a tall photo collage under a centred two-tone head.
 *
 * Portrait frames rather than the squares mockup B used: at four across
 * they give the section vertical presence between two dense text sections,
 * which is the job this section is doing on the page.
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
    <section className="border-b bg-secondary/40 py-16 sm:py-20">
      <div className="container">
        <SectionHead
          eyebrow="Student Life"
          title="More than a school —"
          pop="a community."
          align="center"
          size="display"
          swash
          lede="Character is formed in worship, in service, on the field, and on the stage. “For even the Son of Man did not come to be served, but to serve.” — Mark 10:45"
        />

        <ul className="mt-11 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {frames.map((f) => (
            <li key={f.caption} className="relative isolate overflow-hidden rounded-2xl">
              <img
                src={f.photo}
                alt={f.alt}
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
              />
              {/* Warm near-black, the same gradient the history chapter cards
                  and staff portraits use, so overlaid captions stay readable
                  on any of these photographs. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/10 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 p-3.5 text-xs font-bold leading-snug text-primary-foreground">
                {f.caption}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
