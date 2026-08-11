import { Sparkles, HeartPulse, Languages, LineChart, Laptop, Trophy } from "lucide-react";
import { PageHero, Section } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { findSection } from "@/nav";
import { PhotoSlot } from "@/components/PhotoSlot";
import gradPhoto from "@/assets/graduation-p6.jpg";
import nurseryPhoto from "@/assets/nursery-graduation.jpg";

const pillars = [
  {
    icon: <Sparkles className="h-5 w-5 text-primary" />,
    title: "The S.M.A.R.T. Way to Grow",
    desc: "Service and continuous improvement; maximizing each developmental stage; artistic expression; reading, writing and arithmetic; and teacher and staff development.",
  },
  {
    icon: <HeartPulse className="h-5 w-5 text-primary" />,
    title: "Support Services",
    desc: "Access to medical and socio-emotional resources for students and their families, because children learn best when they are healthy and whole.",
  },
  {
    icon: <Languages className="h-5 w-5 text-primary" />,
    title: "Multiple Languages of Instruction",
    desc: "Daily lessons in English, French, and Kinyarwanda. English is the main language of instruction; fluency in others builds a foundation in world culture.",
  },
  {
    icon: <LineChart className="h-5 w-5 text-primary" />,
    title: "Measurable Benchmarks",
    desc: "Students are monitored and evaluated at regular intervals so staff can observe growth paths and adjust how they serve each learner.",
  },
  {
    icon: <Laptop className="h-5 w-5 text-primary" />,
    title: "Technology Innovation",
    desc: "A computer lab and hands-on learning, including programming, prepare students for a knowledge-based economy.",
  },
];

const enrollment = [
  { grade: "Nursery", n: 150 },
  { grade: "Primary 1", n: 131 },
  { grade: "Primary 2", n: 121 },
  { grade: "Primary 3", n: 116 },
  { grade: "Primary 4", n: 101 },
  { grade: "Primary 5", n: 117 },
  { grade: "Primary 6", n: 44 },
];

const lowerSubjects = [
  "Kinyarwanda",
  "English",
  "French",
  "Mathematics",
  "Social & Religious Studies",
  "Science & Elementary Technology",
  "Creative Arts & Physical Education",
];

const Academics = () => {
  const section = findSection("/academics")!;
  return (
    <>
      <PageHero
        section={section}
        title="An education that grows with the child."
        lede="Aligned to Rwanda's National Competence-Based Curriculum, from the first day of nursery to the National Exam — and, year after year, the top results in the Southern Province."
        image={gradPhoto}
        imageAlt=""
      />

      <Section id="approach" eyebrow="Our Approach" title="Five pillars of learner success">
        <p className="max-w-3xl text-muted-foreground leading-relaxed">
          Crimson Academy provides a holistic approach to helping learners navigate the global
          challenges of the 21st century. We integrate foundational pillars that help students think
          critically, maximize their developmental stage, broaden language proficiency, measure
          progress against national benchmarks, and use technology as a genuine aid to learning.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className="h-full">
              <CardContent className="space-y-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  {p.icon}
                </div>
                <h3 className="font-heading font-semibold leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 rounded-lg border bg-secondary/40 p-6">
          <h3 className="font-heading font-semibold">Curriculum &amp; standards</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            In accordance with the policies of Rwanda&apos;s Ministry of Education (MINEDUC), the
            school has adopted the National Competence-Based Curriculum established in 2015. Every
            grade follows national standards for content, timelines, reporting, and District
            examination schedules. School hours and the school calendar are aligned to the same
            framework.
          </p>
        </div>
      </Section>

      <Section id="nursery" eyebrow="Nursery" title="A joyful foundation" tinted>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Our youngest learners, ages three to six, begin with six integrated and thematic
              learning areas so that children learn holistically through practical activity:
              discovery of the world, numeracy, physical and health development, creative arts,
              language and literacy, and social and emotional development.
            </p>
            <p>
              Nursery is our largest division, with <strong className="text-foreground">150
              children</strong> enrolled. A food program supports nursery students through the school
              day, and the year is celebrated with a school-wide graduation ceremony.
            </p>
            <p className="text-sm">
              Nursery classes were our strongest performing group in 2024–2025, averaging between 75%
              and 88% with zero repetition.
            </p>
          </div>
          <img
            src={nurseryPhoto}
            alt="Nursery students in caps and gowns holding their certificates at the annual graduation"
            className="w-full rounded-lg object-cover"
            loading="lazy"
          />
        </div>
      </Section>

      <Section id="lower-primary" eyebrow="Lower Primary" title="Primary 1 – Primary 3">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Lower primary is where core literacy and numeracy are built, taught across three
              languages, with creative arts and physical education woven through every week. Learners
              study seven subjects, with Kinyarwanda carrying the heaviest weighting in the earliest
              grades as students build a first-language foundation before English takes over as the
              main language of instruction.
            </p>
            <p>
              A single period is 40 minutes. Subject syllabi are built around broad competences,
              specific objectives, learning outcomes per unit, and cross-cutting issues — an approach
              designed to lead to deep understanding that students can apply with confidence.
            </p>
          </div>
          <PhotoSlot
            ratio="landscape"
            brief="A P1–P3 classroom mid-lesson: children at desks, teacher at the board"
            size="1200px wide"
          />
        </div>
        <div className="mt-6 max-w-md">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold">Subjects in Lower Primary</h3>
              <ul className="mt-4 space-y-2">
                {lowerSubjects.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="upper-primary" eyebrow="Upper Primary" title="Primary 4 – Primary 6" tinted>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Upper primary is rigorous preparation for the Rwandan National Examination, which
              students sit at the end of Primary 6. Instruction is in English, with continued daily
              French and Kinyarwanda. Students are assessed three times per term, and results are
              reviewed against benchmarks agreed with MINEDUC.
            </p>
            <p>
              Alongside examination preparation, Primary 6 students lead the school&apos;s monthly
              community service, visiting neighbouring families with encouragement and essential
              provisions — the point at which academic work and character formation meet.
            </p>
          </div>
          <PhotoSlot
            ratio="landscape"
            brief="The computer lab in use, or a P6 class sitting an exam"
            size="1200px wide"
          />
        </div>
        <div className="mt-8">
          <h3 className="font-heading font-semibold">Enrollment by grade, 2024–2025</h3>
          <div className="mt-4 max-w-2xl space-y-2">
            {enrollment.map((e) => (
              <div key={e.grade} className="flex items-center gap-3">
                <div className="w-24 shrink-0 text-sm text-muted-foreground">{e.grade}</div>
                <div className="h-6 flex-1 overflow-hidden rounded bg-background">
                  <div
                    className="h-full rounded bg-primary/80"
                    style={{ width: `${(e.n / 150) * 100}%` }}
                  />
                </div>
                <div className="w-10 shrink-0 text-right text-sm font-medium tabular-nums">{e.n}</div>
              </div>
            ))}
            <div className="flex items-center gap-3 border-t pt-2">
              <div className="w-24 shrink-0 text-sm font-semibold">Total</div>
              <div className="flex-1" />
              <div className="w-10 shrink-0 text-right text-sm font-bold tabular-nums">780</div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="results" eyebrow="Exam Results & Placement" title="#1 in the Southern Province">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "#1", label: "in the Southern Province on the National Exams" },
            { n: "90.4%", label: "P6 class average, 2024–2025" },
            { n: "100%", label: "of P6 graduates earned Division A" },
            { n: "12 of 13", label: "years ranked #1 since 2013" },
          ].map((s) => (
            <Card key={s.label} className="bg-secondary/40 border-none">
              <CardContent className="p-6">
                <div className="font-heading text-3xl font-bold text-primary">{s.n}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Crimson Academy graduating students are consistently the top students in the entire
              Southern Province. The school has been ranked #1 on the Rwandan National Examinations
              in every year since 2013 with a single exception — 2015, when it placed second.
            </p>
            <p>
              In 2024–2025 our Primary 6 class averaged <strong className="text-foreground">90.4%</strong>,
              with every student earning Division A, the highest classification. Top scorers reached
              96.2%.
            </p>
            <p>
              Once students leave us, top performers are awarded scholarships to attend secondary
              school. We currently sponsor{" "}
              <strong className="text-foreground">22 secondary students</strong>, placed in some of
              the leading boarding schools in the country. In 2016 one of our graduates earned the
              second-highest marks on the National Exam in all of Rwanda.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-eyebrow" />
                <h3 className="font-heading font-semibold">Provincial ranking by year</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {[
                  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
                ].map((y) => {
                  const second = y === 2015;
                  return (
                    <div
                      key={y}
                      className={`rounded-md px-2.5 py-1.5 text-xs font-semibold ${
                        second
                          ? "bg-secondary text-muted-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                      title={second ? `${y}: ranked #2` : `${y}: ranked #1`}
                    >
                      {y} <span className="font-bold">{second ? "#2" : "#1"}</span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Ranking among schools in Rwanda&apos;s Southern Province on the National
                Examinations.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default Academics;
