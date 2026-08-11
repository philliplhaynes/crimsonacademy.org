import { Card, CardContent } from "./ui/card";

const values = [
  { name: "Truth", verse: "John 3:21" },
  { name: "Faith", verse: "Hebrews 11:1" },
  { name: "Discipline", verse: "1 Cor. 9:27" },
  { name: "Hope", verse: "Psalm 31:24" },
  { name: "Service", verse: "Mark 10:45" },
  { name: "Love", verse: "1 Cor. 13" },
];

export const About = () => {
  return (
    // Tinted, matching Features/Testimonials below it — previously this and
    // the two sections before it (Statistics, HowItWorks) were all plain,
    // breaking the alternating tint rhythm every other page on the site
    // follows. The card goes from bg-secondary/40 to bg-background so it
    // still pops against the now-tinted section, same as Testimonials' cards.
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="container">
        <Card className="bg-background border-none shadow-none">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="text-sm font-semibold uppercase tracking-wider text-eyebrow">Our Mission</span>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold">
                  Emboldening children to reach beyond impossibilities.
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Children carry the hopes of the future. We are committed to learning
                  experiences that help each student reach their greatest potential —
                  developing the whole child: spiritual, moral, intellectual, social,
                  emotional, and physical — with the understanding, compassion, and
                  courage to act on their beliefs.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2011 with four classrooms and 181 students, Crimson Academy
                  now serves a thriving community in the heart of Kamonyi District,
                  shaped by an environment that mirrors the character of Christ.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {values.map((v) => (
                  <div key={v.name} className="rounded-lg bg-secondary/40 border p-4 text-center">
                    <div className="font-heading text-lg font-semibold text-primary">{v.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{v.verse}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
