import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";

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

export const Testimonials = () => {
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-eyebrow">Our Community</span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mt-2">Stories from Kagina</h2>
          <p className="text-muted-foreground mt-4">
            Through our monthly outreach, Crimson Academy walks alongside the families of the village we call home.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((s) => (
            <Card key={s.name} className="h-full bg-background">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">{s.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold leading-tight">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.role}</div>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground italic">&ldquo;{s.quote}&rdquo;</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
