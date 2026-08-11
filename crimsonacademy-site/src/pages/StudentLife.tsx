import { Link } from "react-router-dom";
import { Music, HandHeart, HeartPulse, Bus, Utensils, Sunrise } from "lucide-react";
import { PageHero, Section } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { findSection } from "@/nav";
import { PhotoSlot } from "@/components/PhotoSlot";
import outreachPhoto from "@/assets/students-outreach.jpg";
import servicePhoto from "@/assets/community-service.jpg";
import nurseryPhoto from "@/assets/nursery-graduation.jpg";

const activities = [
  { name: "Choir", grades: "P6", count: 12, note: "Our largest activity, and the one that leads worship at school gatherings." },
  { name: "Karate", grades: "P2, P4–P5", count: 14, note: "The most evenly balanced activity between girls and boys." },
  { name: "Acrobatics", grades: "P3–P6", count: 15, note: "Performance gymnastics, strongest in Primary 5." },
  { name: "Football", grades: "P3–P6", count: 12, note: "Inter-class matches and district tournaments." },
];

const day = [
  { icon: <Bus className="h-5 w-5 text-primary" />, title: "Getting to school", text: "School buses bring in students who live too far from Kagina to walk, driven by three staff drivers." },
  { icon: <Sunrise className="h-5 w-5 text-primary" />, title: "Morning devotions", text: "The day opens together in prayer and song before classes begin." },
  { icon: <Utensils className="h-5 w-5 text-primary" />, title: "Meals", text: "A food program supports nursery students through the school day." },
  { icon: <Music className="h-5 w-5 text-primary" />, title: "After lessons", text: "Choir, karate, acrobatics, and football run for students from Primary 2 upward." },
];

const StudentLife = () => {
  const section = findSection("/student-life")!;
  return (
    <>
      <PageHero
        section={section}
        title="More than a school — a community."
        lede="At Crimson Academy, character is formed in worship, in service, on the field, and on the stage. Students learn what it means to lead with humility and to give back to the village around them."
        image={outreachPhoto}
        imageAlt=""
      />

      <Section id="day" eyebrow="A Day at Crimson" title="From the morning bus to the final bell">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {day.map((d) => (
            <Card key={d.title} className="h-full">
              <CardContent className="space-y-3 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  {d.icon}
                </div>
                <h3 className="font-heading font-semibold">{d.title}</h3>
                <p className="text-sm text-muted-foreground">{d.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:items-center">
          <p className="text-muted-foreground leading-relaxed lg:col-span-1">
            The school year runs in three terms, from September through July, following the MINEDUC
            calendar. Students are assessed three times each term. Exact dates are published under{" "}
            <Link to="/news#calendar" className="font-medium text-primary underline underline-offset-4">
              Calendar &amp; Term Dates
            </Link>
            .
          </p>
          <PhotoSlot
            className="lg:col-span-2"
            ratio="wide"
            brief="Students arriving at school in the morning, or a classroom mid-lesson"
            size="1600px wide"
          />
        </div>
      </Section>

      <Section id="sports" eyebrow="Sports & Activities" title="Confidence built beyond the classroom" tinted>
        <p className="max-w-3xl text-muted-foreground leading-relaxed">
          Extracurricular activities are open to students from Primary 2 through Primary 6. Roughly
          fifty students take part across four programs, and we are working to widen participation —
          particularly to open acrobatics and football to girls, which are currently boys-only.
        </p>
        <PhotoSlot
          className="mt-8"
          ratio="wide"
          brief="Karate or acrobatics practice, or a football match on the school pitch"
          size="1600px wide"
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {activities.map((a) => (
            <Card key={a.name} className="border-none bg-background">
              <CardContent className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-heading text-lg font-semibold">{a.name}</h3>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {a.count} students
                  </span>
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-eyebrow">
                  {a.grades}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{a.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="arts" eyebrow="Arts & Music" title="Artistic expression is a pillar, not an extra">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Artistic expression is one of the five pillars of our educational model — the
              &ldquo;A&rdquo; in the S.M.A.R.T. curriculum — not an optional add-on. Creative arts
              are timetabled from nursery upward alongside literacy and numeracy.
            </p>
            <p>
              Our choir is the most-subscribed activity in the school and leads worship at assemblies
              and at the annual graduation ceremonies. Acrobatics combines physical training with
              performance, and both groups perform for the school and for visiting partners.
            </p>
          </div>
          <img
            src={nurseryPhoto}
            alt="Nursery students in caps and gowns holding certificates at the annual graduation ceremony"
            className="w-full rounded-lg object-cover"
            loading="lazy"
          />
        </div>
      </Section>

      <Section id="chapel" eyebrow="Chapel & Devotions" title="Faith practiced daily" tinted>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Each school day opens with devotions — prayer, song, and a short reading. Our six core
              values are each anchored in scripture, and they are taught and referred to explicitly
              rather than left implicit.
            </p>
            <p>
              Every month, Primary 6 students lead the school&apos;s outreach into the surrounding
              village, visiting neighbouring families to offer encouragement and essential
              provisions. For many students this is the most formative part of their year at Crimson.
            </p>
            <p>
              Families of all backgrounds are welcome here. What we believe is described under{" "}
              <Link to="/about#faith" className="font-medium text-primary underline underline-offset-4">
                Our Christian Faith
              </Link>
              .
            </p>
          </div>
          <Card className="overflow-hidden border-none bg-background">
            <img
              src={servicePhoto}
              alt="Crimson Academy students in school uniform visiting an elderly neighbour during the monthly community outreach"
              className="h-56 w-full object-cover"
              loading="lazy"
            />
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <HandHeart className="h-5 w-5 text-eyebrow" />
                <h3 className="font-heading font-semibold">Community service</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Monthly outreach led by Primary 6, supporting families across Kagina village.
              </p>
              <div className="mt-4 rounded-lg border-l-4 border-accent bg-secondary/50 p-4 text-sm italic text-muted-foreground">
                &ldquo;For even the Son of Man did not come to be served, but to serve.&rdquo; — Mark
                10:45
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="wellbeing" eyebrow="Health & Wellbeing" title="Children learn best when they are healthy and whole">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Support Services is one of our five pillars. Students and their families have access to
              medical and socio-emotional care, because a child who is unwell, hungry, or carrying
              something heavy at home cannot learn well.
            </p>
            <p>
              Beyond the school gates, Crimson Academy runs micro-loan and livestock programs for
              community members, and transportation and a nursery food program for students. These
              are part of how the school supports the households its students come from.
            </p>
          </div>
          <Card className="overflow-hidden">
            <PhotoSlot
              ratio="fill"
              brief="The nursery food program at mealtime, or the school nurse with a student"
              compact
              className="h-44 shrink-0 rounded-none border-0 border-b border-dashed"
            />
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold">What we provide</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Medical and mental healthcare access for students and families",
                  "Food program for nursery students",
                  "School transportation for students living far from Kagina",
                  "Micro-loan and livestock programs for community households",
                ].map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
};

export default StudentLife;
