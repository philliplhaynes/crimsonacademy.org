import { SectionHead } from "./SectionHead";

interface Story {
  name: string;
  role: string;
  quote: string;
}

const stories: Story[] = [
  {
    name: "Mukarubayiza Jamila",
    role: "Parent · Kagina Village",
    quote:
      "Your visits, encouragement, and support have meant everything to me. You've strengthened my faith and reminded me that hope exists even amidst adversity.",
  },
  {
    name: "Mukandori Donatile",
    role: "Grandparent · Community Member",
    quote:
      "You have been a blessing to our lives — teaching God's Word and meeting both our physical and spiritual needs. I pray God keeps using you to bring hope to many more.",
  },
  {
    name: "Marthin Rurinda",
    role: "Community Elder",
    quote:
      "Your visits and prayers have lit a fire again in my life. Thank you for the kindness this school shows to the families all around us.",
  },
];

/**
 * Stories from Kagina. Quote-mark cards rather than the initials-avatar
 * cards used before: these are villagers rather than staff, and inventing
 * monogram avatars for people the school has no photographs of gave them a
 * directory-entry look they hadn't earned.
 */
export const Testimonials = () => {
  return (
    <section className="border-b py-16 sm:py-20">
      <div className="container">
        <SectionHead
          eyebrow="Our Community"
          title="Stories from"
          pop="Kagina."
          align="center"
          size="display"
          swash
          lede="Through our monthly outreach, Crimson Academy walks alongside the families of the village we call home."
        />

        <ul className="mt-11 grid gap-5 lg:grid-cols-3">
          {stories.map((s) => (
            <li key={s.name} className="rounded-2xl border bg-background p-6">
              <span aria-hidden="true" className="block font-heading text-4xl leading-[0.6] text-accent">
                &ldquo;
              </span>
              <blockquote className="mt-3 text-sm italic leading-relaxed text-muted-foreground">
                {s.quote}
              </blockquote>
              <div className="mt-5 border-t pt-4">
                <div className="font-heading text-sm font-semibold">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.role}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
