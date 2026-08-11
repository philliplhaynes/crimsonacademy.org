import { Link } from "react-router-dom";
import { Heart, GraduationCap, Building2, FileText, ArrowRight } from "lucide-react";
import { PageHero, Section } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { findSection } from "@/nav";
import gradPhoto from "@/assets/graduation-p6.jpg";

const covers = [
  { title: "Tuition", text: "A full academic year at Crimson Academy, nursery through Primary 6." },
  { title: "Daily meals", text: "The nursery food program, so our youngest learners eat during the school day." },
  { title: "Materials", text: "Books, exercise books, and classroom learning materials." },
  { title: "Secondary scholarships", text: "Places at leading boarding schools for top Primary 6 graduates." },
];

const partners = [
  {
    name: "Crimson Foundation",
    text: "Our founding partner. The Foundation supports the school's operations, sponsorship program, and capital projects, and has been part of Crimson Academy since its establishment in 2011.",
  },
  {
    name: "Jenzabar Foundation",
    text: "Partnered with the school on the 2016 expansion, which added six classrooms, a library, a computer lab, and teacher and missionary housing to the Kagina campus.",
  },
];

const Support = () => {
  const section = findSection("/support")!;
  return (
    <>
      <PageHero
        section={section}
        title="Plant a seed. Change a life."
        lede="Sponsorship gives a child in Kagina access to a world-class education, daily meals, and a future full of opportunity — and it is the reason many of our students are in a classroom at all."
        image={gradPhoto}
        imageAlt=""
      />

      <Section id="sponsor" eyebrow="Sponsor a Student" title="What sponsorship does">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Crimson Academy was founded to serve marginalized school-aged children in Kamonyi
              District. For many families in Kagina, sponsorship is the difference between a child
              attending school and not.
            </p>
            <p>
              In partnership with the Crimson Foundation, sponsorship covers tuition, meals, and
              materials for a student through the academic year. Beyond Primary 6, we currently
              sponsor <strong className="text-foreground">22 secondary students</strong> at leading
              boarding schools across Rwanda.
            </p>
            <p>
              The results are measurable: every one of our 2024–2025 Primary 6 graduates earned
              Division A on the National Examination and placed in a top secondary school.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a href="mailto:info@crimsonacademy.org" className={buttonVariants({ variant: "default" })}>
                Sponsor a student <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link to="/academics#results" className={buttonVariants({ variant: "outline" })}>
                See our results
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {covers.map((c) => (
              <Card key={c.title} className="bg-secondary/40 border-none">
                <CardContent className="p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="mt-3 font-heading font-semibold">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section id="give" eyebrow="Make a Gift" title="Other ways to support the school" tinted>
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="border-none bg-background">
            <CardContent className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-3 font-heading font-semibold">General giving</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Gifts to the school support day-to-day operations: teacher salaries, transport, the
                nursery food program, and classroom materials.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none bg-background">
            <CardContent className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-3 font-heading font-semibold">Capital projects</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Classrooms, the library, the computer lab, and teacher housing were all built through
                partner-funded capital projects.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none bg-background">
            <CardContent className="p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-3 font-heading font-semibold">Secondary scholarships</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fund a place at a leading boarding secondary school for one of our top Primary 6
                graduates.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 rounded-lg border border-dashed bg-background p-5 text-sm text-muted-foreground">
          <strong className="text-foreground">Giving is currently handled through the Crimson
          Foundation.</strong>{" "}
          Email{" "}
          <a href="mailto:info@crimsonacademy.org" className="font-medium text-primary underline underline-offset-4">
            info@crimsonacademy.org
          </a>{" "}
          and we will put you in touch with the right person.
        </div>
      </Section>

      <Section id="partners" eyebrow="Our Partners" title="Who we build this with">
        <div className="grid gap-6 md:grid-cols-2">
          {partners.map((p) => (
            <Card key={p.name}>
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold text-primary">{p.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="annual-report" eyebrow="Annual Report" title="See exactly how the school is doing" tinted>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Each year Crimson Academy publishes an Annual School Report covering mission and
              values, the educational model, enrollment, staff qualifications, class-by-class
              performance, National Examination results, extracurricular programs, and the school
              budget.
            </p>
            <p>
              It is a candid document — it reports where the school is falling short of its own
              benchmarks as well as where it is excelling. If you are considering supporting Crimson
              Academy, it is the most complete picture available.
            </p>
          </div>
          <Card className="border-none bg-background">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-eyebrow" />
                <h3 className="font-heading font-semibold">Annual School Report 2024–2025</h3>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {[
                  "Enrollment: 780 students across nursery and P1–P6",
                  "Staff: 34 total, 23 qualified teachers",
                  "P6 National Exam average: 90.4%, all Division A",
                  "13th consecutive year at or near the top of the province",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">
                Request a copy by email — a downloadable version will be published here.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default Support;
