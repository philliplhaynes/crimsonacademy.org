import { Card, CardContent } from "./ui/card";
import { Music, Trophy, HandHeart, Award } from "lucide-react";

const programs = [
  { icon: <Music className="h-6 w-6 text-primary" />, title: "Arts & Athletics", desc: "Choir, karate, gymnastics, football, and acrobatics build confidence beyond the classroom." },
  { icon: <HandHeart className="h-6 w-6 text-primary" />, title: "Community Service", desc: "Each month, our P6 students serve neighboring families — sharing encouragement and essential provisions." },
  { icon: <Award className="h-6 w-6 text-primary" />, title: "Scholarships", desc: "Top graduates earn sponsorships to the nation's leading secondary boarding schools; we currently sponsor 22 students." },
  { icon: <Trophy className="h-6 w-6 text-primary" />, title: "A Legacy of Excellence", desc: "Ranked #1 in the Southern Province on the National Exams in nearly every year since 2013." },
];

export const Services = () => {
  return (
    <section className="container py-20 sm:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-eyebrow">Student Life</span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold">
            More than a school — a community
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            At Crimson Academy, character is formed in worship, in service, on the
            field, and on the stage. Our students learn what it means to lead with
            humility and to give back to the village that surrounds them.
          </p>
          <div className="rounded-lg border-l-4 border-accent bg-secondary/50 p-4 italic text-muted-foreground">
            &ldquo;For even the Son of Man did not come to be served, but to serve.&rdquo; — Mark 10:45
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {programs.map((p) => (
            <Card key={p.title} className="h-full">
              <CardContent className="p-6 space-y-3">
                <div className="rounded-lg bg-primary/10 w-11 h-11 flex items-center justify-center">{p.icon}</div>
                <h3 className="font-heading font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
