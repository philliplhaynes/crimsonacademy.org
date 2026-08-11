import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Baby, BookOpen, GraduationCap } from "lucide-react";
import { PhotoSlot } from "./PhotoSlot";
import nurseryPhoto from "@/assets/nursery-graduation.jpg";

const divisions = [
  {
    icon: <Baby className="h-8 w-8 text-primary" />,
    title: "Nursery",
    ages: "Early Years",
    href: "/academics#nursery",
    photo: nurseryPhoto,
    photoAlt: "Nursery students in caps and gowns at their graduation ceremony",
    desc: "A joyful foundation where our youngest learners build language, curiosity, and character — celebrated each year with a school-wide graduation.",
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: "Lower Primary",
    ages: "P1 – P3",
    href: "/academics#lower-primary",
    photoBrief: "A P1–P3 class at work",
    desc: "Core literacy and numeracy taught across three languages, with creative arts and sports woven through every week.",
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Upper Primary",
    ages: "P4 – P6",
    href: "/academics#upper-primary",
    photoBrief: "P6 students studying, or the computer lab",
    desc: "Rigorous preparation for the National Exam — our P6 class averaged 90.4% and every graduate earned a place in a top boarding secondary school.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="container py-20 sm:py-28">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-sm font-semibold uppercase tracking-wider text-eyebrow">Academics</span>
        <h2 className="font-heading text-3xl md:text-4xl font-semibold mt-2">
          A pathway for every age
        </h2>
        <p className="text-muted-foreground mt-4">
          Aligned to Rwanda&apos;s National Competence-Based Curriculum (MINEDUC),
          from the first day of nursery to the National Exam.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {divisions.map((d) => (
          <Card key={d.title} className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
            {d.photo ? (
              <img src={d.photo} alt={d.photoAlt} className="h-40 w-full object-cover" loading="lazy" />
            ) : (
              <PhotoSlot
                ratio="fill"
                brief={d.photoBrief!}
                compact
                className="h-40 shrink-0 rounded-none border-0 border-b border-dashed"
              />
            )}
            <CardHeader className="space-y-3">
              <div className="rounded-xl bg-primary/10 w-14 h-14 flex items-center justify-center">{d.icon}</div>
              <div>
                <CardTitle className="font-heading text-xl">
                  <Link to={d.href} className="hover:text-primary">{d.title}</Link>
                </CardTitle>
                <span className="text-xs font-medium uppercase tracking-wide text-eyebrow">{d.ages}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 text-muted-foreground">{d.desc}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
