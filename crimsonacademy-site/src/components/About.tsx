import { SectionHead } from "./SectionHead";
import missionPhoto from "@/assets/crimson-sign-boy.webp";

const values = [
  { name: "Truth", verse: "John 3:21" },
  { name: "Faith", verse: "Hebrews 11:1" },
  { name: "Discipline", verse: "1 Cor. 9:27" },
  { name: "Hope", verse: "Psalm 31:24" },
  { name: "Service", verse: "Mark 10:45" },
  { name: "Love", verse: "1 Cor. 13" },
];

/**
 * Mission — an editorial spread (copy beside a photograph), matching the
 * shape About.tsx's own Mission section uses on /about, rather than the
 * card-inside-a-tinted-section it was before.
 *
 * The six values were a 6-tile grid competing with the copy for attention.
 * They're inline chips now: the page already has three card grids after
 * this point, and a fourth immediately under the mission statement made the
 * whole top of the page read as tiles.
 */
export const About = () => {
  return (
    <section className="border-b py-14 sm:py-16">
      <div className="container">
        <SectionHead
          eyebrow="Our Mission"
          title="Emboldening children to reach beyond impossibilities."
        />

        <div className="mt-7 grid gap-10 sm:grid-cols-[1fr_15rem] sm:items-start">
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Children carry the hopes of the future. We are committed to learning experiences that
              help each student reach their greatest potential — developing the whole child:
              spiritual, moral, intellectual, social, emotional, and physical — with the
              understanding, compassion, and courage to act on their beliefs.
            </p>
            <p>
              Founded in 2011 with four classrooms and 181 students, Crimson Academy now serves a
              thriving community in the heart of Kamonyi District, shaped by an environment that
              mirrors the character of Christ.
            </p>
            <ul className="flex flex-wrap gap-2 pt-1">
              {values.map((v) => (
                <li
                  key={v.name}
                  className="rounded-full border bg-background px-3.5 py-1.5 text-xs text-muted-foreground"
                >
                  <span className="font-heading font-semibold text-primary">{v.name}</span>
                  <span aria-hidden="true"> · </span>
                  {v.verse}
                </li>
              ))}
            </ul>
          </div>

          <img
            src={missionPhoto}
            alt="A Crimson Academy student joyfully holding a carved wooden school crest above his head"
            className="mx-auto w-44 drop-shadow-xl sm:w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
