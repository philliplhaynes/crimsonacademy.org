import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Sparkles, HeartPulse, Languages, LineChart, Laptop } from "lucide-react";

const pillars = [
  {
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    title: "The S.M.A.R.T. Way to Grow",
    desc: "Service & continuous improvement, maximizing each developmental stage, artistic expression, reading/writing/arithmetic, and teacher development.",
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-primary" />,
    title: "Support Services",
    desc: "Medical and socio-emotional care for students and families — because children learn best when they are healthy and whole.",
  },
  {
    icon: <Languages className="h-6 w-6 text-primary" />,
    title: "Three Languages",
    desc: "Daily instruction in English, French, and Kinyarwanda — a foundation in world culture and global opportunity.",
  },
  {
    icon: <LineChart className="h-6 w-6 text-primary" />,
    title: "Measurable Benchmarks",
    desc: "Continuous, data-driven assessment aligned to national standards keeps every learner on a path to success.",
  },
  {
    icon: <Laptop className="h-6 w-6 text-primary" />,
    title: "Technology Innovation",
    desc: "A computer lab and hands-on learning — including programming — prepare students for a knowledge-based economy.",
  },
];

export const Features = () => {
  return (
    <section className="bg-secondary/40 py-20 sm:py-28">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-eyebrow">Our Model</span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mt-2">Five pillars of learner success</h2>
          <p className="text-muted-foreground mt-4">
            A holistic approach that helps learners navigate the challenges of the 21st century.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <Card key={p.title} className="h-full bg-background">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="rounded-lg bg-primary/10 w-11 h-11 flex items-center justify-center shrink-0">{p.icon}</div>
                <CardTitle className="font-heading text-lg leading-snug">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">{p.desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
