import { SectionHead } from "./SectionHead";

interface Story {
  name: string;
  role: string;
  initials: string;
  quote: string;
}

const stories: Story[] = [
  {
    name: "Mukarubayiza Jamila",
    role: "Parent · Kagina Village",
    initials: "MJ",
    quote:
      "Your visits, encouragement, and support have meant everything to me. You've strengthened my faith and reminded me that hope exists even amidst adversity.",
  },
  {
    name: "Mukandori Donatile",
    role: "Grandparent · Community Member",
    initials: "MD",
    quote:
      "You have been a blessing to our lives — teaching God's Word and meeting both our physical and spiritual needs. I pray God keeps using you to bring hope to many more.",
  },
  {
    name: "Marthin Rurinda",
    role: "Community Elder",
    initials: "MR",
    quote:
      "Your visits and prayers have lit a fire again in my life. Thank you for the kindness this school shows to the families all around us.",
  },
];

/**
 * Stories from Kagina — a horizontal rail, the same device HistoryPanel.tsx
 * uses for the eight history chapters, rather than a three-up grid.
 *
 * min-w-0 on the rail is load-bearing: a grid child defaults to min-width
 * auto, so a grid-flow-col row of fixed-width cards inside a container will
 * widen the whole page instead of scrolling inside its own box. That exact
 * bug turned up in the About mockups and again in the admissions comparison
 * table; this is the same fix, applied up front.
 */
export const Testimonials = () => {
  return (
    <section className="border-b bg-secondary/40 py-14 sm:py-16">
      <div className="container">
        <SectionHead
          eyebrow="Our Community"
          title="Stories from Kagina."
          lede="Through our monthly outreach, Crimson Academy walks alongside the families of the village we call home."
        />

        <div className="mt-7 min-w-0 overflow-x-auto pb-2">
          <ul className="grid min-w-0 grid-flow-col auto-cols-[minmax(17rem,1fr)] gap-4 lg:auto-cols-fr">
            {stories.map((s) => (
              <li key={s.name} className="rounded-xl border bg-background p-5">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary"
                  >
                    {s.initials}
                  </span>
                  <div className="min-w-0">
                    <div className="font-heading text-sm font-semibold leading-tight">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.role}</div>
                  </div>
                </div>
                <blockquote className="mt-3 text-sm italic leading-relaxed text-muted-foreground">
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
