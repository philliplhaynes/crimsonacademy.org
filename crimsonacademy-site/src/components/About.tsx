import { SectionHead } from "./SectionHead";

const values = [
  { name: "Truth", verse: "John 3:21" },
  { name: "Faith", verse: "Hebrews 11:1" },
  { name: "Discipline", verse: "1 Cor. 9:27" },
  { name: "Hope", verse: "Psalm 31:24" },
  { name: "Service", verse: "Mark 10:45" },
  { name: "Love", verse: "1 Cor. 13" },
];

/**
 * Mission and the six values.
 *
 * Mockup C as drawn had no separate mission section — its founding story
 * lived inside the first statement band and the six values weren't shown at
 * all. That was a gap in the mockup rather than a decision: the values are
 * scriptural and central to a Christian school's front page, so the section
 * is kept and restyled to C's language (centred head, two-tone) instead of
 * being dropped. The founding story does now live in the statement band
 * above, so it is not repeated here.
 */
export const About = () => {
  return (
    <section className="border-b py-16 sm:py-20">
      <div className="container">
        <SectionHead
          eyebrow="Our Mission"
          title="Emboldening children to"
          pop="reach beyond impossibilities."
          align="center"
          size="display"
          swash
          lede="Children carry the hopes of the future. We are committed to learning experiences that help each student reach their greatest potential — developing the whole child: spiritual, moral, intellectual, social, emotional, and physical — with the understanding, compassion, and courage to act on their beliefs."
        />

        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {values.map((v) => (
            <li
              key={v.name}
              className="rounded-full border bg-background px-4 py-2 text-xs text-muted-foreground"
            >
              <span className="font-heading text-sm font-semibold text-primary">{v.name}</span>
              <span aria-hidden="true"> · </span>
              {v.verse}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
